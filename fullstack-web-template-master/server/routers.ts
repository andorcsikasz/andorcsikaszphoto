import { systemRouter } from "./systemRouter";
import { publicProcedure, router } from "./lib/trpc";
import { decrementCounter, getCounter, incrementCounter, getProperties, getPropertyById, getFeaturedProperties } from "./db";
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
});

export type AppRouter = typeof appRouter;
