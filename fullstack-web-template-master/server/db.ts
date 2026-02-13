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

// ============================================================================
// LANDLORD DASHBOARD FUNCTIONS
// ============================================================================

export interface LandlordDashboardMetrics {
  // Overview metrics
  totalProperties: number;
  activeListings: number;
  totalBookings: number;
  occupancyRate: number;

  // Financial metrics
  totalRevenue: number;
  monthlyRevenue: number;
  pendingPayments: number;
  averageBookingValue: number;

  // Performance metrics
  totalViews: number;
  totalInquiries: number;
  conversionRate: number;
  averageRating: number;
  totalReviews: number;

  // Time-based metrics
  newInquiriesThisWeek: number;
  bookingsThisMonth: number;
  revenueGrowth: number;

  // Property-level insights
  topPerformingProperty?: {
    id: number;
    title: string;
    bookings: number;
    revenue: number;
  };
}

/**
 * Get comprehensive dashboard metrics for a landlord
 */
export async function getLandlordDashboardMetrics(landlordId: number): Promise<LandlordDashboardMetrics> {
  const db = await getDb();
  if (!db) {
    log.warn("Cannot get landlord metrics: database not available");
    return getDefaultLandlordMetrics();
  }

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Get landlord's properties
    const landlordProperties = await db
      .select()
      .from(properties)
      .where(eq(properties.landlordId, landlordId));

    const propertyIds = landlordProperties.map(p => p.id);

    // Total and active properties
    const totalProperties = landlordProperties.length;
    const activeListings = landlordProperties.filter(p => p.available).length;

    // Bookings metrics
    const allBookings = propertyIds.length > 0
      ? await db
          .select()
          .from(bookings)
          .where(inArray(bookings.propertyId, propertyIds))
      : [];

    const totalBookings = allBookings.length;
    const confirmedBookings = allBookings.filter(b => b.status === 'confirmed' || b.status === 'completed');

    // Occupancy rate calculation
    const occupancyRate = totalProperties > 0
      ? (confirmedBookings.length / totalProperties) * 100
      : 0;

    // Revenue metrics
    const allTransactions = propertyIds.length > 0
      ? await db
          .select()
          .from(transactions)
          .innerJoin(bookings, eq(transactions.bookingId, bookings.id))
          .where(
            and(
              inArray(bookings.propertyId, propertyIds),
              eq(transactions.status, 'completed'),
              eq(transactions.type, 'payment')
            )
          )
      : [];

    const totalRevenue = allTransactions.reduce((sum, t) => sum + (t.transactions.amount || 0), 0);

    const monthlyTransactions = allTransactions.filter(
      t => new Date(t.transactions.createdAt) >= startOfMonth
    );
    const monthlyRevenue = monthlyTransactions.reduce((sum, t) => sum + (t.transactions.amount || 0), 0);

    const lastMonthTransactions = allTransactions.filter(
      t => new Date(t.transactions.createdAt) >= startOfLastMonth &&
           new Date(t.transactions.createdAt) <= endOfLastMonth
    );
    const lastMonthRevenue = lastMonthTransactions.reduce((sum, t) => sum + (t.transactions.amount || 0), 0);

    const revenueGrowth = lastMonthRevenue > 0
      ? ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
      : 0;

    const pendingPayments = propertyIds.length > 0
      ? await db
          .select({ total: sum(transactions.amount) })
          .from(transactions)
          .innerJoin(bookings, eq(transactions.bookingId, bookings.id))
          .where(
            and(
              inArray(bookings.propertyId, propertyIds),
              eq(transactions.status, 'pending'),
              eq(transactions.type, 'payment')
            )
          )
          .then(result => Number(result[0]?.total || 0))
      : 0;

    const averageBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;

    // Performance metrics
    const totalViews = landlordProperties.reduce((sum, p) => sum + (p.viewCount || 0), 0);
    const totalInquiries = landlordProperties.reduce((sum, p) => sum + (p.inquiryCount || 0), 0);

    const conversionRate = totalInquiries > 0
      ? (totalBookings / totalInquiries) * 100
      : 0;

    // Reviews and ratings
    const allReviews = propertyIds.length > 0
      ? await db
          .select()
          .from(reviews)
          .where(inArray(reviews.propertyId, propertyIds))
      : [];

    const totalReviews = allReviews.length;
    const averageRating = totalReviews > 0
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

    // Time-based metrics
    const newInquiriesThisWeek = propertyIds.length > 0
      ? await db
          .select({ count: count() })
          .from(inquiries)
          .where(
            and(
              inArray(inquiries.propertyId, propertyIds),
              gte(inquiries.createdAt, startOfWeek)
            )
          )
          .then(result => result[0]?.count || 0)
      : 0;

    const bookingsThisMonth = allBookings.filter(
      b => new Date(b.createdAt) >= startOfMonth
    ).length;

    // Top performing property
    let topPerformingProperty = undefined;
    if (propertyIds.length > 0) {
      const propertyPerformance = await Promise.all(
        landlordProperties.map(async (property) => {
          const propertyBookings = allBookings.filter(b => b.propertyId === property.id);
          const propertyTransactions = allTransactions.filter(
            t => propertyBookings.some(b => b.id === t.transactions.bookingId)
          );
          const revenue = propertyTransactions.reduce((sum, t) => sum + (t.transactions.amount || 0), 0);

          return {
            id: property.id,
            title: property.title,
            bookings: propertyBookings.length,
            revenue,
          };
        })
      );

      const top = propertyPerformance.sort((a, b) => b.revenue - a.revenue)[0];
      if (top && top.revenue > 0) {
        topPerformingProperty = top;
      }
    }

    return {
      totalProperties,
      activeListings,
      totalBookings,
      occupancyRate: Math.round(occupancyRate * 10) / 10,
      totalRevenue,
      monthlyRevenue,
      pendingPayments,
      averageBookingValue: Math.round(averageBookingValue),
      totalViews,
      totalInquiries,
      conversionRate: Math.round(conversionRate * 10) / 10,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      newInquiriesThisWeek,
      bookingsThisMonth,
      revenueGrowth: Math.round(revenueGrowth * 10) / 10,
      topPerformingProperty,
    };
  } catch (error) {
    log.error("Failed to get landlord dashboard metrics", error);
    return getDefaultLandlordMetrics();
  }
}

function getDefaultLandlordMetrics(): LandlordDashboardMetrics {
  return {
    totalProperties: 0,
    activeListings: 0,
    totalBookings: 0,
    occupancyRate: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    pendingPayments: 0,
    averageBookingValue: 0,
    totalViews: 0,
    totalInquiries: 0,
    conversionRate: 0,
    averageRating: 0,
    totalReviews: 0,
    newInquiriesThisWeek: 0,
    bookingsThisMonth: 0,
    revenueGrowth: 0,
  };
}

/**
 * Get recent inquiries for landlord
 */
export async function getLandlordInquiries(landlordId: number, limit: number = 10) {
  const db = await getDb();
  if (!db) {
    log.warn("Cannot get landlord inquiries: database not available");
    return [];
  }

  try {
    const landlordProperties = await db
      .select({ id: properties.id })
      .from(properties)
      .where(eq(properties.landlordId, landlordId));

    const propertyIds = landlordProperties.map(p => p.id);

    if (propertyIds.length === 0) return [];

    const result = await db
      .select({
        inquiry: inquiries,
        property: properties,
      })
      .from(inquiries)
      .innerJoin(properties, eq(inquiries.propertyId, properties.id))
      .where(inArray(inquiries.propertyId, propertyIds))
      .orderBy(desc(inquiries.createdAt))
      .limit(limit);

    return result;
  } catch (error) {
    log.error("Failed to get landlord inquiries", error);
    return [];
  }
}

/**
 * Get property performance breakdown for landlord
 */
export async function getLandlordPropertyPerformance(landlordId: number) {
  const db = await getDb();
  if (!db) {
    log.warn("Cannot get property performance: database not available");
    return [];
  }

  try {
    const landlordProperties = await db
      .select()
      .from(properties)
      .where(eq(properties.landlordId, landlordId));

    const performance = await Promise.all(
      landlordProperties.map(async (property) => {
        // Get bookings for this property
        const propertyBookings = await db
          .select()
          .from(bookings)
          .where(eq(bookings.propertyId, property.id));

        const totalBookings = propertyBookings.length;
        const confirmedBookings = propertyBookings.filter(
          b => b.status === 'confirmed' || b.status === 'completed'
        ).length;

        // Get revenue
        const revenue = await db
          .select({ total: sum(transactions.amount) })
          .from(transactions)
          .innerJoin(bookings, eq(transactions.bookingId, bookings.id))
          .where(
            and(
              eq(bookings.propertyId, property.id),
              eq(transactions.status, 'completed'),
              eq(transactions.type, 'payment')
            )
          )
          .then(result => Number(result[0]?.total || 0));

        // Get reviews
        const propertyReviews = await db
          .select()
          .from(reviews)
          .where(eq(reviews.propertyId, property.id));

        const averageRating = propertyReviews.length > 0
          ? propertyReviews.reduce((sum, r) => sum + r.rating, 0) / propertyReviews.length
          : 0;

        return {
          id: property.id,
          title: property.title,
          city: property.city,
          pricePerMonth: property.pricePerMonth,
          available: property.available,
          views: property.viewCount,
          inquiries: property.inquiryCount,
          bookings: totalBookings,
          confirmedBookings,
          revenue,
          averageRating: Math.round(averageRating * 10) / 10,
          reviewCount: propertyReviews.length,
          occupancyRate: confirmedBookings > 0 ? 100 : 0, // Simplified - could be more sophisticated
        };
      })
    );

    return performance.sort((a, b) => b.revenue - a.revenue);
  } catch (error) {
    log.error("Failed to get property performance", error);
    return [];
  }
}

// ============================================================================
// TENANT DASHBOARD FUNCTIONS
// ============================================================================

export interface TenantDashboardMetrics {
  // Bookings
  activeBookings: number;
  upcomingBookings: number;
  pastBookings: number;
  totalBookings: number;

  // Favorites
  savedProperties: number;

  // Financials
  totalSpent: number;
  upcomingPayments: number;
  pendingRefunds: number;

  // Activity
  propertiesViewed: number;
  inquiriesSent: number;
  reviewsWritten: number;

  // Current status
  currentProperty?: {
    id: number;
    title: string;
    checkIn: Date;
    checkOut: Date;
    address: string;
  };

  // Recommendations
  matchScore?: number;
}

/**
 * Get comprehensive dashboard metrics for a tenant
 */
export async function getTenantDashboardMetrics(userId: number): Promise<TenantDashboardMetrics> {
  const db = await getDb();
  if (!db) {
    log.warn("Cannot get tenant metrics: database not available");
    return getDefaultTenantMetrics();
  }

  try {
    const now = new Date();

    // Get all user bookings
    const allBookings = await db
      .select({
        booking: bookings,
        property: properties,
      })
      .from(bookings)
      .innerJoin(properties, eq(bookings.propertyId, properties.id))
      .where(eq(bookings.userId, userId));

    const totalBookings = allBookings.length;

    // Categorize bookings by status
    const activeBookings = allBookings.filter(
      b => b.booking.status === 'confirmed' &&
           new Date(b.booking.checkIn) <= now &&
           new Date(b.booking.checkOut) >= now
    );

    const upcomingBookings = allBookings.filter(
      b => b.booking.status === 'confirmed' &&
           new Date(b.booking.checkIn) > now
    );

    const pastBookings = allBookings.filter(
      b => (b.booking.status === 'completed' || new Date(b.booking.checkOut) < now)
    );

    // Favorites
    const savedProperties = await db
      .select({ count: count() })
      .from(favorites)
      .where(eq(favorites.userId, userId))
      .then(result => result[0]?.count || 0);

    // Financial metrics
    const userTransactions = await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId));

    const completedPayments = userTransactions.filter(
      t => t.status === 'completed' && t.type === 'payment'
    );
    const totalSpent = completedPayments.reduce((sum, t) => sum + t.amount, 0);

    const upcomingPayments = userTransactions
      .filter(t => t.status === 'pending' && t.type === 'payment')
      .reduce((sum, t) => sum + t.amount, 0);

    const pendingRefunds = userTransactions
      .filter(t => t.status === 'pending' && t.type === 'refund')
      .reduce((sum, t) => sum + t.amount, 0);

    // Activity metrics
    const propertiesViewed = await db
      .select({ count: count() })
      .from(propertyViews)
      .where(eq(propertyViews.userId, userId))
      .then(result => result[0]?.count || 0);

    const inquiriesSent = await db
      .select({ count: count() })
      .from(inquiries)
      .where(eq(inquiries.userId, userId))
      .then(result => result[0]?.count || 0);

    const reviewsWritten = await db
      .select({ count: count() })
      .from(reviews)
      .where(eq(reviews.userId, userId))
      .then(result => result[0]?.count || 0);

    // Current property
    let currentProperty = undefined;
    if (activeBookings.length > 0) {
      const active = activeBookings[0];
      currentProperty = {
        id: active.property.id,
        title: active.property.title,
        checkIn: active.booking.checkIn,
        checkOut: active.booking.checkOut,
        address: `${active.property.address}, ${active.property.city}`,
      };
    }

    return {
      activeBookings: activeBookings.length,
      upcomingBookings: upcomingBookings.length,
      pastBookings: pastBookings.length,
      totalBookings,
      savedProperties,
      totalSpent,
      upcomingPayments,
      pendingRefunds,
      propertiesViewed,
      inquiriesSent,
      reviewsWritten,
      currentProperty,
      matchScore: 95, // Placeholder - would be calculated by AI matching engine
    };
  } catch (error) {
    log.error("Failed to get tenant dashboard metrics", error);
    return getDefaultTenantMetrics();
  }
}

function getDefaultTenantMetrics(): TenantDashboardMetrics {
  return {
    activeBookings: 0,
    upcomingBookings: 0,
    pastBookings: 0,
    totalBookings: 0,
    savedProperties: 0,
    totalSpent: 0,
    upcomingPayments: 0,
    pendingRefunds: 0,
    propertiesViewed: 0,
    inquiriesSent: 0,
    reviewsWritten: 0,
  };
}

/**
 * Get tenant's booking history with details
 */
export async function getTenantBookingHistory(userId: number, limit: number = 10) {
  const db = await getDb();
  if (!db) {
    log.warn("Cannot get booking history: database not available");
    return [];
  }

  try {
    const result = await db
      .select({
        booking: bookings,
        property: properties,
      })
      .from(bookings)
      .innerJoin(properties, eq(bookings.propertyId, properties.id))
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.createdAt))
      .limit(limit);

    return result;
  } catch (error) {
    log.error("Failed to get booking history", error);
    return [];
  }
}

/**
 * Get tenant's saved/favorite properties
 */
export async function getTenantFavorites(userId: number) {
  const db = await getDb();
  if (!db) {
    log.warn("Cannot get favorites: database not available");
    return [];
  }

  try {
    const result = await db
      .select({
        favorite: favorites,
        property: properties,
      })
      .from(favorites)
      .innerJoin(properties, eq(favorites.propertyId, properties.id))
      .where(eq(favorites.userId, userId))
      .orderBy(desc(favorites.createdAt));

    return result;
  } catch (error) {
    log.error("Failed to get favorites", error);
    return [];
  }
}
