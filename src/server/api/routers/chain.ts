import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const chainRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await prisma.chain.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  getAll: publicProcedure.query(async () => {
    return await prisma.chain.findMany();
  }),

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
          image: input.image || "",
        },
      });
    }),
});
