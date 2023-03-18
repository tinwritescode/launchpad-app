import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const tokenRouter = createTRPCRouter({
  /*
   query
  */
  count: publicProcedure.query(async () => {
    return await prisma.token.count();
  }),

  getOne: publicProcedure
    .input(
      z
        .object({
          id: z.string().uuid(),
          name: z.string(),
          symbol: z.string(),
        })
        .partial()
        .refine((input) => input.id || input.name || input.symbol, {
          message: "Must provide either id, name, or symbol",
        })
    )
    .query(async ({ input }) => {
      return await prisma.token.findUnique({
        where: {
          ...(input.id
            ? { id: input.id }
            : input.name
            ? { name: input.name }
            : { symbol: input.symbol }),
        },
      });
    }),

  getAll: publicProcedure.query(async () => {
    return await prisma.token.findMany();
  }),

  /*
    mutation
  */
  createOne: publicProcedure
    .input(
      z.object({
        name: z.string(),
        symbol: z.string(),
        decimals: z.number().min(1).max(100),
        totalSupply: z.number().optional(),
        address: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.token.create({
        data: {
          name: input.name,
          symbol: input.symbol,
          decimals: input.decimals,
          totalSupply: input.totalSupply || 0,
          address: input.address || "",
        },
      });
    }),
});
