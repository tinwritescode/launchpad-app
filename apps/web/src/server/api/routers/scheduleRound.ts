import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const scheduleRoundRouter = createTRPCRouter({
  /*
    query
  */
  getAllOfProject: publicProcedure
    .input(
      z.object({
        projectId: z.string().uuid(),
      })
    )
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.scheduleRound.findMany({
        where: {
          projectId: input.projectId,
        },
      });
    }),

  /*
    mutation
  */
  createOne: publicProcedure
    .input(
      z.object({
        projectId: z.string().uuid(),
        name: z.string(),
        startTime: z.number(),
        endTime: z.number(),
        pricePerToken: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.scheduleRound.create({
        data: {
          projectId: input.projectId,
          name: input.name,
          startTime: new Date(input.startTime),
          endTime: new Date(input.endTime),
          pricePerToken: input.pricePerToken || null,
        },
      });
    }),
});
