import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { IDOContract } from "~/server/services/ido-contract";
import { IdoContractDto } from "./../../../services/ido-contract/ido-contract.dto";
import { protectedProcedure } from "./../../trpc";
import {
  buildContracts as buildContractPayloads,
  getContractNameFromIndex,
} from "./project.constant";
import { createIdoProjectInputSchema } from "./project.schema";

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        offset: z.number().min(0).default(0),
        limit: z.number().positive().max(100).default(10),
      })
    )
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.project.findMany({
        skip: input.offset,
        take: input.limit,
      });
    }),

  createIdoProject: protectedProcedure
    .input(createIdoProjectInputSchema)
    .mutation(async ({ ctx, input }) => {
      // Initialize variables
      const {
        startTime,
        endTime,
        idoPrice,
        idoTokenAddress,
        purchaseCap,
        ...rest
      } = input;

      const contracts: IdoContractDto[] = buildContractPayloads({
        startTime,
        endTime,
        idoPrice,
        idoTokenAddress,
        purchaseCap,
      });

      const instance = IDOContract.getInstance();

      // Deploy contract
      const deployedContracts = await Promise.all(
        contracts
          .map(async (contract) => {
            return instance.deployIDOContract(contract);
          })
          .map((p) => p.then((res) => res.deployed()))
      ).catch((err) => {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: err.message,
        });
      });

      if (!ctx.session?.user?.isLoggedIn)
        throw new TRPCError({ code: "UNAUTHORIZED" });

      // Create project
      const project = await ctx.prisma.project.create({
        data: {
          ...rest,
          ownerId: ctx.session?.user?.id,
          IDOContract: {
            createMany: {
              data: deployedContracts.map((contract, i) => ({
                address: contract.address,
                name: getContractNameFromIndex(i) as string,
              })),
            },
          },
        },
        include: {
          IDOContract: true,
        },
      });

      return project;
    }),

  getOne: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.project.findUnique({
        where: {
          id: input.id,
        },
        include: {
          IDOContract: true,
          ScheduleRound: true,
          TokenomicsItem: true,
          token: true,
        },
      });
    }),

  getMyProject: protectedProcedure
    .input(
      z.object({
        offset: z.number().min(0).default(0),
        limit: z.number().positive().max(100).default(10),
      })
    )
    .query(async ({ input, ctx: { prisma, session } }) => {
      if (!session?.user?.isLoggedIn)
        throw new TRPCError({ code: "UNAUTHORIZED" });

      return await prisma.project.findMany({
        skip: input.offset,
        take: input.limit,
        where: {
          ownerId: session?.user?.id,
        },
        include: {
          IDOContract: true,
        },
      });
    }),

  divideTokenForProjectContracts: adminProcedure.mutation(
    async ({ ctx, input }) => {}
  ),
});
