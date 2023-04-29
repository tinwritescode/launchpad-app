import { NonceManager } from "@ethersproject/experimental";
import { TRPCError } from "@trpc/server";
import { Prisma, PrismaClient, Status } from "database";
import { BigNumber, ethers } from "ethers";
import {
  Dividend__factory,
  ERC20__factory,
  IDOContract__factory,
} from "ido-contracts/typechain-types";
import PQueue from "p-queue";
import { z } from "zod";
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
import { calculateDividendPercent } from "./project.util";
import BNjs from "bignumber.js";

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
      address: true,
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

  createIdoProject: adminProcedure
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
        targettedRaise,
        ...rest
      } = input;

      if (!ctx.session?.user?.isLoggedIn)
        throw new TRPCError({ code: "UNAUTHORIZED" });

      const contracts: IdoContractDto[] = buildContractPayloads({
        startTime,
        endTime,
        idoPrice,
        idoTokenAddress,
      });

      const instance = IDOContract.getInstance();
      const signer = new NonceManager(ctx.signer);
      const queue = new PQueue({ concurrency: 1 });

      const project = await ctx.prisma.$transaction(async (tx) => {
        // Create project
        const project = await ctx.prisma.project.create({
          data: {
            ...rest,
            targettedRaise: new BNjs(targettedRaise.toString())
              .multipliedBy(10 ** 18)
              .toFixed(),
            ownerId: ctx.session?.user?.id,
            token: {
              create: {
                address: idoTokenAddress,
              },
            },
          },
          include: {
            IDOContract: true,
          },
        });

        const deployedContracts = await queue
          .addAll(
            contracts.map((contract) => {
              return () => {
                // TODO: Change this later
                const numberOfPeople = 200;
                const dividendPercent = getContractDividendInPercent(
                  contract.name
                );
                const purchaseCap = new BNjs(
                  calculateDividendPercent(
                    BigNumber.from(targettedRaise),
                    dividendPercent
                  )
                ).dividedBy(new BNjs(numberOfPeople));

                // all variables
                console.group("Variables");
                console.log("numberOfPeople", numberOfPeople);
                console.log("dividendPercent", dividendPercent);
                console.log("purchaseCap", purchaseCap.toString());
                console.groupEnd();

                return instance.deployIDOContract(
                  {
                    ...contract,
                    purchaseCap: BigNumber.from(purchaseCap.toString()),
                  },
                  signer
                );
              };
            })
          )
          .catch((err) => {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: err.message,
            });
          });

        const dividendContract = await Dividend__factory.connect(
          env.NEXT_PUBLIC_DIVIDEND_CONTRACT_ADDRESS,
          signer
        );

        // add operator
        await Promise.all(
          deployedContracts.map(async (contract) => {
            const idoContract = IDOContract__factory.connect(
              contract.address,
              signer
            );

            const tx = await idoContract.addOperator(dividendContract.address);
            return await tx.wait();
          })
        );

        return await ctx.prisma.project.update({
          where: { id: project.id },
          data: {
            IDOContract: {
              createMany: {
                data: deployedContracts.map((contract, i) => ({
                  address: contract.address,
                  name: getContractNameFromIndex(i) as string,
                })),
              },
            },
          },
        });
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
    .query(async ({ input, ctx: { prisma, signer } }) => {
      const data = await prisma.project.findUnique({
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

      return {
        ...data,
        IDOContract: await Promise.all(
          data?.IDOContract.map(async (contract) => {
            const idoContract = new IDOContract__factory(signer).attach(
              contract.address
            );
            const erc20 = new ERC20__factory(signer).attach(
              await idoContract.ido()
            );
            const fulfilledAmount = new BNjs(
              await erc20
                .balanceOf(contract.address)
                .then((res) => res.toString())
            );

            return {
              ...contract,
              dividendAmount: new BNjs(
                getContractDividendInPercent(contract.name)
              )
                .multipliedBy(data.targettedRaise)
                .dividedBy(100)
                .dividedBy(new BNjs(10 ** 18))
                .toString(),
              fulfilledAmount: fulfilledAmount.toFormat(),
            };
          }) || []
        ),
      };
    }),

  getDividendContractInfo: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/projects/{id}/dividend",
        tags: ["project"],
      },
    })
    .output(z.any())
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ input, ctx: { prisma, signer } }) => {
      return await getDividendContractInfo(prisma, input, signer);
    }),

  editIdoProject: adminProcedure
    .meta({
      openapi: { method: "PUT", path: "/projects/{id}", tags: ["project"] },
    })
    .input(
      z.object({
        id: z.string().uuid(),
        name: z.string().optional(),
        comparisionContent: z.string().optional(),
        image: z.string().optional(),
        roadmapContent: z.string().optional(),
        summaryContent: z.string().optional(),
        videoURL: z.string().optional(),
        status: z.nativeEnum(Status).optional(),
      })
    )
    .output(z.any())
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input;
      const project = await ctx.prisma.project.update({
        where: {
          id,
        },
        data: {
          ...rest,
        },
        include: {
          IDOContract: true,
        },
      });

      return project;
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

      const { isDividendFulfilled, requiredBalance } =
        await getDividendContractInfo(
          ctx.prisma,
          {
            id: input.projectId,
          },
          ctx.signer
        );

      if (!isDividendFulfilled) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message:
            "Dividend is not fulfill, please ask IDO token owner to fulfill the dividend contract",
        });
      }

      const data = await ctx.prisma.project
        .findUniqueOrThrow({
          where: {
            id: input.projectId,
          },
          select: {
            IDOContract: true,
            token: true,
            targettedRaise: true,
          },
        })
        .catch((err) => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Project id you provided is not found",
          });
        });

      const tokenAddress = data.token?.address as string;

      const tx = await dividendContract
        .connect(ctx.signer)
        .distribute(
          tokenAddress,
          data.IDOContract.map((contract) => ({
            to: contract.address,
            amount: calculateDividendPercent(
              BigNumber.from(requiredBalance.toFixed(0)),
              getContractDividendInPercent(contract.name)
            ),
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

  getAllOwners: adminProcedure
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
        // projects: { some: {} },
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

async function getDividendContractInfo(
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
  input: { id: string },
  signer: ethers.Wallet
) {
  const data = await prisma.project.findUnique({
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

  if (!data?.token?.address) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Token address not found",
    });
  }
  if (!data?.IDOContract?.[0]?.address) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "IDO contract address not found",
    });
  }

  const erc20 = new ERC20__factory(signer).attach(data.token.address);
  const dividendBalance = new BNjs(
    (
      await erc20.balanceOf(env.NEXT_PUBLIC_DIVIDEND_CONTRACT_ADDRESS)
    ).toString()
  );

  let avgRate: BNjs | null = null;

  for (const contract of data.IDOContract) {
    const idoContract = new IDOContract__factory(signer).attach(
      contract.address
    );
    const rate = await idoContract.idoPrice().then((res) => res.toString());
    if (!avgRate) {
      avgRate = new BNjs(rate);
    } else {
      avgRate = avgRate.plus(rate);
    }
  }

  if (!avgRate) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Avg rate not found",
    });
  }

  avgRate = avgRate.dividedBy(data.IDOContract.length);

  const requiredBalance = new BNjs(data.targettedRaise).dividedBy(avgRate);
  const isDividendFulfilled = dividendBalance.gte(requiredBalance);

  return {
    isDividendFulfilled,
    avgRate: avgRate.toString(),
    requiredBalance: requiredBalance,
    dividendBalance: dividendBalance,
    contractAddress: env.NEXT_PUBLIC_DIVIDEND_CONTRACT_ADDRESS,
  };
}
