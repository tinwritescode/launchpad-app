import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const idoRouter = createTRPCRouter({
  getIdo: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findUnique({
        where: {
          id: input.id,
        },
        include: {
          ScheduleRound: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    }),
});
