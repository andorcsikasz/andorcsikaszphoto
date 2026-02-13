import { eq, sql, and, gte, lte, inArray, like, or, count, sum, avg, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { globalCounter, InsertUser, users, properties, InsertProperty, Property, bookings, inquiries, reviews, propertyViews, transactions, favorites } from "../drizzle/schema";
import { ENV } from "./lib/env";
import { logger } from "./lib/logSession";

const log = logger.child("Database");

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance.
export async function getDb() {
  if (!_db) {
    try {
      const client = postgres(ENV.databaseUrl);
      _db = drizzle(client);
    } catch (error) {
      log.warn("Failed to connect", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.supabaseId) {
    throw new Error("User supabaseId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    log.warn("Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      supabaseId: user.supabaseId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.supabaseId,
      set: updateSet,
    });
  } catch (error) {
    log.error("Failed to upsert user", error);
    throw error;
  }
}

export async function getUserBySupabaseId(supabaseId: string) {
  const db = await getDb();
  if (!db) {
    log.warn("Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.supabaseId, supabaseId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================================================
// Global Counter (Server State Demo)
// ============================================================================

const COUNTER_ID = 1;

/**
 * Get the current counter value. Creates the row if it doesn't exist.
 */
export async function getCounter(): Promise<number> {
  const db = await getDb();
  if (!db) {
    log.warn("Cannot get counter: database not available");
    return 0;
  }

  // Try to get existing counter
  const result = await db
    .select()
    .from(globalCounter)
    .where(eq(globalCounter.id, COUNTER_ID))
    .limit(1);

  if (result.length > 0) {
    return result[0].value;
  }

  // Create counter if it doesn't exist
  await db.insert(globalCounter).values({ id: COUNTER_ID, value: 0 });
  return 0;
}

/**
 * Increment the counter and return the new value.
 */
export async function incrementCounter(): Promise<number> {
  const db = await getDb();
  if (!db) {
    log.warn("Cannot increment counter: database not available");
    return 0;
  }

  // Ensure counter exists
  await getCounter();

  // Increment atomically
  const result = await db
    .update(globalCounter)
    .set({
      value: sql`${globalCounter.value} + 1`,
      updatedAt: new Date(),
    })
    .where(eq(globalCounter.id, COUNTER_ID))
    .returning({ value: globalCounter.value });

  return result[0]?.value ?? 0;
}

/**
 * Decrement the counter and return the new value.
 */
export async function decrementCounter(): Promise<number> {
  const db = await getDb();
  if (!db) {
    log.warn("Cannot decrement counter: database not available");
    return 0;
  }

  // Ensure counter exists
  await getCounter();

  // Decrement atomically
  const result = await db
    .update(globalCounter)
    .set({
      value: sql`${globalCounter.value} - 1`,
      updatedAt: new Date(),
    })
    .where(eq(globalCounter.id, COUNTER_ID))
    .returning({ value: globalCounter.value });

  return result[0]?.value ?? 0;
}

// ============================================================================
// Properties (Housing Rental Platform)
// ============================================================================

export interface PropertyFilters {
  city?: string;
  country?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  minBedrooms?: number;
  lifestyleCategory?: string;
  amenities?: string[];
  search?: string;
}

/**
 * Get all properties with optional filtering
 */
export async function getProperties(filters?: PropertyFilters): Promise<Property[]> {
  const db = await getDb();
  if (!db) {
    log.warn("Cannot get properties: database not available");
    return [];
  }

  try {
    let query = db.select().from(properties);

    // Build WHERE conditions
    const conditions = [];

    if (filters?.city) {
      conditions.push(eq(properties.city, filters.city));
    }

    if (filters?.country) {
      conditions.push(eq(properties.country, filters.country));
    }

    if (filters?.minPrice !== undefined) {
      conditions.push(gte(properties.pricePerMonth, filters.minPrice));
    }

    if (filters?.maxPrice !== undefined) {
      conditions.push(lte(properties.pricePerMonth, filters.maxPrice));
    }

    if (filters?.bedrooms !== undefined) {
      conditions.push(eq(properties.bedrooms, filters.bedrooms));
    }

    if (filters?.minBedrooms !== undefined) {
      conditions.push(gte(properties.bedrooms, filters.minBedrooms));
    }

    if (filters?.lifestyleCategory) {
      conditions.push(eq(properties.lifestyleCategory, filters.lifestyleCategory as any));
    }

    if (filters?.search) {
      conditions.push(
        or(
          like(properties.title, `%${filters.search}%`),
          like(properties.description, `%${filters.search}%`),
          like(properties.city, `%${filters.search}%`)
        )
      );
    }

    // Always show only available properties
    conditions.push(eq(properties.available, true));

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    const result = await query;
    return result;
  } catch (error) {
    log.error("Failed to get properties", error);
    return [];
  }
}

/**
 * Get a single property by ID
 */
export async function getPropertyById(id: number): Promise<Property | undefined> {
  const db = await getDb();
  if (!db) {
    log.warn("Cannot get property: database not available");
    return undefined;
  }

  try {
    const result = await db
      .select()
      .from(properties)
      .where(eq(properties.id, id))
      .limit(1);

    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    log.error("Failed to get property by ID", error);
    return undefined;
  }
}

/**
 * Get featured properties
 */
export async function getFeaturedProperties(limit: number = 6): Promise<Property[]> {
  const db = await getDb();
  if (!db) {
    log.warn("Cannot get featured properties: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(properties)
      .where(and(eq(properties.featured, true), eq(properties.available, true)))
      .limit(limit);

    return result;
  } catch (error) {
    log.error("Failed to get featured properties", error);
    return [];
  }
}

/**
 * Create a new property
 */
export async function createProperty(property: InsertProperty): Promise<Property | undefined> {
  const db = await getDb();
  if (!db) {
    log.warn("Cannot create property: database not available");
    return undefined;
  }

  try {
    const result = await db.insert(properties).values(property).returning();
    return result[0];
  } catch (error) {
    log.error("Failed to create property", error);
    return undefined;
  }
}

/**
 * Update a property
 */
export async function updateProperty(
  id: number,
  updates: Partial<InsertProperty>
): Promise<Property | undefined> {
  const db = await getDb();
  if (!db) {
    log.warn("Cannot update property: database not available");
    return undefined;
  }

  try {
    const result = await db
      .update(properties)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(properties.id, id))
      .returning();

    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    log.error("Failed to update property", error);
    return undefined;
  }
}
