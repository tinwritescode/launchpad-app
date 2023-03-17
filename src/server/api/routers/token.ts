import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const tokenRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await prisma.token.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  getAll: publicProcedure.query(async () => {
    return await prisma.token.findMany();
  }),

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
