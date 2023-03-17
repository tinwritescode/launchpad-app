import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const projectRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
        allData: z.boolean().default(false),
      })
    )
    .query(async ({ input }) => {
      return await prisma.project.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Token: true,
          Chain: input.allData,
          scheduleRounds: input.allData,
          tokenomicsItems: input.allData,
        },
      });
    }),

  getAll: publicProcedure.query(async () => {
    return await prisma.project.findMany();
  }),

  createOne: publicProcedure
    .input(
      z.object({
        Chain: z.object({
          chainId: z.string().uuid(),
        }),
        Token: z.object({
          name: z.string(),
          symbol: z.string(),
          decimals: z.number().min(1).max(100),
          totalSupply: z.number(),
          address: z.string(),
        }),
        scheduleRounds: z
          .array(
            z.object({
              name: z.string(),
              startTime: z.number(),
              endTime: z.number(),
            })
          )
          .optional(),
        name: z.string(),
        startTime: z.number(),
        endTime: z.number(),
        targetRaise: z.number(),
        allocation: z.number(),
        summaryContent: z.string(),
        videoURL: z.string(),
        comparisonContent: z.string(),
        roadmapContent: z.string(),
        pricePerToken: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.project.create({
        data: {
          name: input.name,
          startTime: new Date(input.startTime),
          endTime: new Date(input.endTime),
          targetRaise: input.targetRaise,
          allocation: input.allocation,
          summaryContent: input.summaryContent,
          videoURL: input.videoURL,
          comparisonContent: input.comparisonContent,
          roadmapContent: input.roadmapContent,
          pricePerToken: input.pricePerToken,
          Chain: {
            connect: {
              id: input.Chain.chainId,
            },
          },
          Token: {
            create: {
              name: input.Token.name,
              symbol: input.Token.symbol,
              decimals: input.Token.decimals,
              totalSupply: input.Token.totalSupply,
              address: input.Token.address,
            },
          },
          scheduleRounds: {
            create: (input.scheduleRounds ?? []).map((round) => ({
              name: round.name,
              startTime: new Date(round.startTime),
              endTime: new Date(round.endTime),
            })),
          },
        },
      });
    }),
});
