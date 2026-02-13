import { systemRouter } from "./systemRouter";
import { publicProcedure, router } from "./lib/trpc";
import {
  decrementCounter,
  getCounter,
  incrementCounter,
  getProperties,
  getPropertyById,
  getFeaturedProperties,
  getLandlordDashboardMetrics,
  getLandlordInquiries,
  getLandlordPropertyPerformance,
  getTenantDashboardMetrics,
  getTenantBookingHistory,
  getTenantFavorites
} from "./db";
import { z } from "zod";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
  }),

  // Global counter demo - persisted server state
  counter: router({
    get: publicProcedure.query(() => getCounter()),
    increment: publicProcedure.mutation(() => incrementCounter()),
    decrement: publicProcedure.mutation(() => decrementCounter()),
  }),

  // Properties for housing rental platform
  properties: router({
    list: publicProcedure
      .input(
        z.object({
          city: z.string().optional(),
          country: z.string().optional(),
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          bedrooms: z.number().optional(),
          minBedrooms: z.number().optional(),
          lifestyleCategory: z.string().optional(),
          amenities: z.array(z.string()).optional(),
          search: z.string().optional(),
        }).optional()
      )
      .query(({ input }) => getProperties(input)),

    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getPropertyById(input.id)),

    featured: publicProcedure
      .input(z.object({ limit: z.number().default(6) }).optional())
      .query(({ input }) => getFeaturedProperties(input?.limit)),
  }),

  // Landlord Dashboard
  landlord: router({
    // Get comprehensive dashboard metrics
    metrics: publicProcedure
      .input(z.object({ landlordId: z.number() }))
      .query(({ input }) => getLandlordDashboardMetrics(input.landlordId)),

    // Get recent inquiries
    inquiries: publicProcedure
      .input(z.object({
        landlordId: z.number(),
        limit: z.number().default(10).optional(),
      }))
      .query(({ input }) => getLandlordInquiries(input.landlordId, input.limit)),

    // Get property performance breakdown
    propertyPerformance: publicProcedure
      .input(z.object({ landlordId: z.number() }))
      .query(({ input }) => getLandlordPropertyPerformance(input.landlordId)),
  }),

  // Tenant Dashboard
  tenant: router({
    // Get comprehensive dashboard metrics
    metrics: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(({ input }) => getTenantDashboardMetrics(input.userId)),

    // Get booking history
    bookings: publicProcedure
      .input(z.object({
        userId: z.number(),
        limit: z.number().default(10).optional(),
      }))
      .query(({ input }) => getTenantBookingHistory(input.userId, input.limit)),

    // Get saved properties
    favorites: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(({ input }) => getTenantFavorites(input.userId)),
  }),
});

export type AppRouter = typeof appRouter;
