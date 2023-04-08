import { TRPCError } from "@trpc/server";
import { ethers } from "ethers";
import { z } from "zod";
import { Dividend__factory } from "ido-contracts/typechain-types";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { IDOContract } from "~/server/services/ido-contract";
import { env } from "../../../../env.mjs";
import { getErc20Contract } from "../../../../libs/blockchain";
import { IdoContractDto } from "./../../../services/ido-contract/ido-contract.dto";
import { protectedProcedure } from "./../../trpc";
import {
  buildContracts as buildContractPayloads,
  getContractDividendInPercent,
  getContractNameFromIndex,
} from "./project.constant";
import { createIdoProjectInputSchema } from "./project.schema";
import { Prisma } from "database";

const defaultProjectSelector: Prisma.ProjectSelect = {
  id: true,
  name: true,
  comparisionContent: true,
  image: true,
  roadmapContent: true,
  summaryContent: true,
  videoURL: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  token: {
    select: {
      id: true,
      name: true,
      symbol: true,
    },
  },
};

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/projects",
        tags: ["project"],
      },
    })
    .input(
      z.object({
        offset: z.number().min(0).default(0),
        limit: z.number().positive().max(100).default(10),
      })
    )
    .output(z.any())
    .query(async ({ input, ctx: { prisma } }) => {
      const [data, count] = await Promise.all([
        prisma.project.findMany({
          skip: input.offset,
          take: input.limit,
          select: defaultProjectSelector,
        }),

        prisma.project.count(),
      ]);

      return {
        data,
        meta: {
          total: count,
        },
      };
    }),

  createIdoProject: protectedProcedure
    .meta({ openapi: { method: "POST", path: "/projects", tags: ["project"] } })
    .input(createIdoProjectInputSchema)
    .output(z.any())
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
    .meta({
      openapi: { method: "GET", path: "/projects/{id}", tags: ["project"] },
    })
    .output(z.any())
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
    .meta({
      openapi: { method: "GET", path: "/projects/me", tags: ["project"] },
    })
    .output(z.any())
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

  divideTokenForProjectContracts: adminProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/projects/divide",
        summary: "Divide token for project contracts",
        protect: true,
      },
    })
    .output(z.any())
    .input(
      z.object({
        projectId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const dividendContract = Dividend__factory.connect(
        env.NEXT_PUBLIC_DIVIDEND_CONTRACT_ADDRESS,
        new ethers.providers.JsonRpcProvider(env.NEXT_PUBLIC_BLOCKCHAIN_RPC)
      );

      const data = await ctx.prisma.project
        .findUniqueOrThrow({
          where: {
            id: input.projectId,
          },
          select: {
            IDOContract: true,
            token: true,
          },
        })
        .catch((err) => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Project id you provided is not found",
          });
        });

      const tokenAddress = data.token?.address as string;
      const tokenBalance = await getErc20Contract(tokenAddress).balanceOf(
        dividendContract.address
      );

      const tx = await dividendContract
        .connect(ctx.signer)
        .distribute(
          tokenAddress,
          data.IDOContract.map((contract) => ({
            to: contract.address,
            amount: tokenBalance
              .mul(getContractDividendInPercent(contract.name))
              .div(100),
          }))
        )
        .then((res) => res.wait());

      return tx;
    }),

  getProjectOwner: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/owners/{id}",
        tags: ["project"],
      },
    })
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .output(z.any())
    .query(async ({ input, ctx: { prisma } }) => {
      const owner = await prisma.user.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          walletAddress: true,
          roles: true,
        },
      });

      return owner;
    }),

  getAllOwners: publicProcedure
    .meta({ openapi: { method: "GET", path: "/owners", tags: ["project"] } })
    .input(
      z.object({
        offset: z.number().min(0).default(0),
        limit: z.number().positive().max(100).default(10),
        ids: z
          .preprocess((ids: any) => ids.split(","), z.array(z.string().uuid()))
          .optional(),
      })
    )
    .output(z.any())
    .query(async ({ input, ctx: { prisma } }) => {
      const whereClause: Prisma.UserWhereInput = {
        projects: { some: {} },
        id: { in: input.ids },
      };
      const [data, total] = await Promise.all([
        await prisma.user.findMany({
          where: whereClause,
          select: { id: true, walletAddress: true, roles: true },
        }),
        await prisma.user.count({
          where: whereClause,
        }),
      ]);

      return { data, meta: { total } };
    }),
});
