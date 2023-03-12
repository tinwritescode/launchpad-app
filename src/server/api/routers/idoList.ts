import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const idoListRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({ offset: z.number().default(0), limit: z.number().default(10) })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findMany({
        skip: input.offset,
        take: input.limit,
      });
    }),
});
