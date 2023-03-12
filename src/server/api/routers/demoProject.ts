import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const demoProjectRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ input, ctx }) => {
    return ctx.prisma.demoProject.findMany();
  }),
  createOne: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.demoProject.create({
        data: {
          name: input.name,
        },
      });
    }),
});
