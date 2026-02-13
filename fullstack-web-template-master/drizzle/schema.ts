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
  userType: text("user_type", { enum: ["tenant", "landlord", "both"] }).default("tenant").notNull(),

  // Profile information
  phone: text("phone"),
  bio: text("bio"),
  avatar: text("avatar"),

  // Verification
  verified: boolean("verified").default(false).notNull(),
  verificationDate: timestamp("verification_date"),

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
  landlordId: integer("landlord_id").notNull().references(() => users.id),
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

  // Performance metrics
  viewCount: integer("view_count").default(0).notNull(),
  favoriteCount: integer("favorite_count").default(0).notNull(),
  inquiryCount: integer("inquiry_count").default(0).notNull(),

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

/**
 * Property views tracking for analytics
 */
export const propertyViews = pgTable("property_views", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull().references(() => properties.id),
  userId: integer("user_id").references(() => users.id),
  sessionId: text("session_id"),
  viewedAt: timestamp("viewed_at").defaultNow().notNull(),
});

export type PropertyView = typeof propertyViews.$inferSelect;

/**
 * Inquiries/leads for CRM
 */
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull().references(() => properties.id),
  userId: integer("user_id").references(() => users.id),

  // Inquiry details
  message: text("message").notNull(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),

  // Status tracking
  status: text("status", {
    enum: ["new", "contacted", "viewing-scheduled", "offer-made", "converted", "declined"]
  }).default("new").notNull(),
  priority: text("priority", {
    enum: ["low", "medium", "high"]
  }).default("medium").notNull(),

  // Follow-up tracking
  lastContactedAt: timestamp("last_contacted_at"),
  nextFollowUpAt: timestamp("next_follow_up_at"),
  notes: text("notes"),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = typeof inquiries.$inferInsert;

/**
 * Reviews and ratings
 */
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull().references(() => properties.id),
  userId: integer("user_id").notNull().references(() => users.id),
  bookingId: integer("booking_id").references(() => bookings.id),

  // Rating (1-5)
  rating: integer("rating").notNull(),

  // Review content
  title: text("title"),
  comment: text("comment"),

  // Categories (1-5 each)
  cleanliness: integer("cleanliness"),
  accuracy: integer("accuracy"),
  communication: integer("communication"),
  location: integer("location"),
  value: integer("value"),

  // Landlord response
  landlordResponse: text("landlord_response"),
  landlordRespondedAt: timestamp("landlord_responded_at"),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Favorites/saved properties
 */
export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  propertyId: integer("property_id").notNull().references(() => properties.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Favorite = typeof favorites.$inferSelect;

/**
 * Payment transactions
 */
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").notNull().references(() => bookings.id),
  userId: integer("user_id").notNull().references(() => users.id),

  // Transaction details
  amount: integer("amount").notNull(),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  type: text("type", {
    enum: ["payment", "refund", "security-deposit", "deposit-return"]
  }).notNull(),

  // Payment status
  status: text("status", {
    enum: ["pending", "processing", "completed", "failed", "refunded"]
  }).default("pending").notNull(),

  // Payment method
  paymentMethod: text("payment_method"),
  paymentProvider: text("payment_provider"),
  transactionId: text("transaction_id"),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  processedAt: timestamp("processed_at"),
});

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;
