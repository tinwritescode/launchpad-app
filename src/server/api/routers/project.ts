import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const projectRouter = createTRPCRouter({
  /*
    query
  */
  count: publicProcedure.query(async () => {
    return await prisma.project.count();
  }),

  getOne: publicProcedure
    .input(
      z
        .object({
          id: z.string().uuid().optional(),
          name: z.string().optional(),
          tokenId: z.string().uuid().optional(),
          allData: z.boolean().default(false),
        })
        .refine((input) => input.id || input.name || input.tokenId, {
          message: "Must provide either id, name, or tokenId",
        })
    )
    .query(async ({ input }) => {
      return await prisma.project.findUnique({
        where: {
          ...(input.id
            ? { id: input.id }
            : input.name
            ? { name: input.name }
            : { tokenId: input.tokenId }),
        },
        include: {
          Token: true,
          Chain: input.allData,
          scheduleRounds: input.allData,
          tokenomicsItems: input.allData,
        },
      });
    }),

  getAll: publicProcedure
    .input(
      z
        .object({
          offset: z.number().default(0),
          limit: z.number().default(10),
        })
        .refine((input) => input.offset >= 0 && input.limit > 0, {
          message:
            "Offset must be greater than or equal to 0 and limit must be greater than 0",
        })
        .refine((input) => input.limit <= 100, {
          message: "Limit must be less than or equal to 100",
        })
    )
    .query(async ({ input }) => {
      return await prisma.project.findMany({
        skip: input.offset,
        take: input.limit,
      });
    }),

  /*
    mutation
  */
  createOne: publicProcedure
    .input(
      z.object({
        chainId: z.string().uuid(),
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
              pricePerToken: z.number().optional(),
            })
          )
          .default([]),
        name: z.string(),
        image: z.string().optional(),
        startTime: z.number(),
        endTime: z.number(),
        scheduleOpenDate: z.number().optional(),
        scheduleCloseDate: z.number().optional(),
        targetRaise: z.number(),
        allocation: z.number(),
        summaryContent: z.string().optional(),
        videoURL: z.string().optional(),
        comparisonContent: z.string().optional(),
        roadmapContent: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.project.create({
        data: {
          name: input.name,
          image: input.image || null,
          startTime: new Date(input.startTime),
          endTime: new Date(input.endTime),
          scheduleOpenDate: input.scheduleOpenDate
            ? new Date(input.scheduleOpenDate)
            : null,
          scheduleCloseDate: input.scheduleCloseDate
            ? new Date(input.scheduleCloseDate)
            : null,
          targetRaise: input.targetRaise,
          allocation: input.allocation,
          summaryContent: input.summaryContent || null,
          videoURL: input.videoURL || null,
          comparisonContent: input.comparisonContent || null,
          roadmapContent: input.roadmapContent || null,
          Chain: {
            connect: {
              id: input.chainId,
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
            create: input.scheduleRounds.map((round) => ({
              name: round.name,
              startTime: new Date(round.startTime),
              endTime: new Date(round.endTime),
              pricePerToken: round.pricePerToken || null,
            })),
          },
        },
      });
    }),
});
