import { boolean, integer, json, numeric, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = pgTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: serial("id").primaryKey(),
  /** Supabase user ID from auth.users. Unique per user. */
  supabaseId: text("supabase_id").notNull().unique(),
  name: text("name"),
  email: text("email"),
  loginMethod: text("login_method"),
  role: text("role", { enum: ["user", "admin"] }).default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastSignedIn: timestamp("last_signed_in").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Global counter for demonstrating persisted server state.
 * Single row table pattern - always use id=1.
 */
export const globalCounter = pgTable("global_counter", {
  id: serial("id").primaryKey(),
  value: integer("value").default(0).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type GlobalCounter = typeof globalCounter.$inferSelect;

/**
 * Properties table for housing rental platform
 */
export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  latitude: numeric("latitude", { precision: 10, scale: 7 }),
  longitude: numeric("longitude", { precision: 10, scale: 7 }),

  // Property details
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  squareFeet: integer("square_feet"),
  maxGuests: integer("max_guests").notNull(),

  // Pricing
  pricePerMonth: integer("price_per_month").notNull(),
  pricePerDay: integer("price_per_day"),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),

  // Amenities and features (stored as JSON array)
  amenities: json("amenities").$type<string[]>().default([]).notNull(),
  images: json("images").$type<string[]>().default([]).notNull(),

  // Rental type and availability
  rentalType: text("rental_type", {
    enum: ["mid-term", "long-term", "both"]
  }).default("both").notNull(),
  minStayDays: integer("min_stay_days").default(30).notNull(),
  maxStayDays: integer("max_stay_days"),
  available: boolean("available").default(true).notNull(),

  // Lifestyle category
  lifestyleCategory: text("lifestyle_category", {
    enum: ["live", "business", "student", "general"]
  }).default("general"),

  // Featured properties
  featured: boolean("featured").default(false).notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Property = typeof properties.$inferSelect;
export type InsertProperty = typeof properties.$inferInsert;

/**
 * Property bookings table
 */
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull().references(() => properties.id),
  userId: integer("user_id").notNull().references(() => users.id),

  // Booking details
  checkIn: timestamp("check_in").notNull(),
  checkOut: timestamp("check_out").notNull(),
  totalPrice: integer("total_price").notNull(),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),

  // Status
  status: text("status", {
    enum: ["pending", "confirmed", "cancelled", "completed"]
  }).default("pending").notNull(),

  // Guest information
  guestCount: integer("guest_count").notNull(),
  specialRequests: text("special_requests"),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;
