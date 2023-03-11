import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // TODO: should be protectedProcedure
  createOne: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx: { prisma } }) => {
      const project = await prisma.project.create({
        // TODO: Change this
        data: {
          name: input.name,
        } as any,
      });

      return project;
    }),
});
