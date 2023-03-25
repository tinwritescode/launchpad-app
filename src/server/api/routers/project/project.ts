import { protectedProcedure } from "./../../trpc";
import { TRPCError } from "@trpc/server";
import { TRPCClientError } from "@trpc/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { IDOContract } from "~/server/services/ido-contract";
import { IdoContractDto } from "./../../../services/ido-contract/ido-contract.dto";
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
                name: getContractNameFromIndex(i),
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
        },
      });
    }),
});
