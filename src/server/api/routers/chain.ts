import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const chainRouter = createTRPCRouter({
  /*
    query
  */
  count: publicProcedure.query(async () => {
    return await prisma.chain.count();
  }),

  getOne: publicProcedure
    .input(
      z
        .object({
          id: z.string().uuid(),
          name: z.string(),
        })
        .partial()
        .refine((input) => input.id || input.name, {
          message: "Must provide either id or name",
        })
    )
    .query(async ({ input }) => {
      return await prisma.chain.findUnique({
        where: {
          ...(input.id ? { id: input.id } : { name: input.name }),
        },
      });
    }),

  getAll: publicProcedure.query(async () => {
    return await prisma.chain.findMany();
  }),

  /*
    mutation
  */
  createOne: publicProcedure
    .input(
      z.object({
        name: z.string(),
        image: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.chain.create({
        data: {
          name: input.name,
          image: input.image || null,
        },
      });
    }),
});
