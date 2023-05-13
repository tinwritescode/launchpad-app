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
import {
  getIdoContract,
  getRpcProvider,
  getStakingContract,
} from "../../../../libs/blockchain";
import { IdoContractDto } from "./../../../services/ido-contract/ido-contract.dto";
import { protectedProcedure } from "./../../trpc";
import {
  NUMBER_OF_PEOPLE,
  TierKeys,
  buildContracts as buildContractPayloads,
  getContractDividendInPercent,
  getContractNameFromIndex,
} from "./project.constant";
import { createIdoProjectInputSchema } from "./project.schema";
import { calculateDividendPercent } from "./project.util";
import BNjs from "bignumber.js";
import {
  WhitelistData,
  WhitelistDataProof,
  WhitelistMerkleTree,
} from "~/utils/whitelist_tree";

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
  IDOContract: true,
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
      try {
        const [data, count] = await Promise.all([
          prisma.project.findMany({
            skip: input.offset,
            take: input.limit,
            select: defaultProjectSelector,
            orderBy: {
              createdAt: "desc",
            },
          }),

          prisma.project.count(),
        ]);

        const fullData = await Promise.all(
          data.map(async (project: any) => {
            let status: "UNKNOWN" | "UPCOMING" | "OPEN" | "CLOSED" = "UNKNOWN";
            if (project.IDOContract.length === 0) {
              return {
                ...project,
                status,
              };
            }
            let totalRaised = BigNumber.from(0);
            let totalParticipants = 0;

            project.IDOContract.map(async (ido: any) => {
              const contract = getIdoContract(ido.address);
              const now = new Date().getTime();
              const startTime = (await contract.startTime()).toNumber();
              const endTime = (await contract.endTime()).toNumber();

              if (status === "UNKNOWN") {
                if (startTime > now) {
                  status = "UPCOMING";
                } else if (endTime < now) {
                  status = "CLOSED";
                } else {
                  status = "OPEN";
                }
              }

              const purchaseHistory = await contract.purchaseHistory();
              totalParticipants = purchaseHistory.length;
              totalRaised = purchaseHistory.reduce(
                (acc, curr) => acc.add(curr.amount),
                totalRaised
              );
            });

            return {
              ...project,
              status,
              totalRaised,
              totalParticipants,
            };
          })
        );

        return {
          data: fullData,
          meta: {
            total: count,
          },
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error?.message,
        });
      }
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

      const contracts = buildContractPayloads({
        startTime,
        endTime,
        idoPrice,
        idoTokenAddress,
      });

      const instance = IDOContract.getInstance();
      const signer = new NonceManager(ctx.signer);
      const queue = new PQueue({ concurrency: 1 });

      const project = await ctx.prisma.$transaction(
        async (tx) => {
          // Create project
          const project = await tx.project.create({
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
                  const numberOfPeople = NUMBER_OF_PEOPLE[contract.name];
                  const dividendPercent = getContractDividendInPercent(
                    contract.name as TierKeys
                  );
                  const purchaseCap = new BNjs(
                    calculateDividendPercent(
                      BigNumber.from(targettedRaise),
                      dividendPercent
                    )
                  ).dividedBy(new BNjs(numberOfPeople));

                  return instance.deployIDOContract(
                    {
                      ...contract,
                      purchaseCap: BigNumber.from(purchaseCap.toString()),
                      idoPrice: ethers.utils.parseEther(idoPrice.toString()),
                      minStakingRequired:
                        contract.minStakingRequired.toString(),
                      maxStakingRequired:
                        contract.maxStakingRequired.toString(),
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

          const dividendContract = Dividend__factory.connect(
            env.NEXT_PUBLIC_DIVIDEND_CONTRACT_ADDRESS,
            signer
          );
          // add operator
          await queue.addAll(
            deployedContracts.map((contract) => {
              return async () => {
                const idoContract = IDOContract__factory.connect(
                  contract.address,
                  signer
                );

                const gasLimit = await idoContract.estimateGas
                  .addOperator(dividendContract.address)
                  .then((gasLimit) => gasLimit.mul(2));

                return idoContract.addOperator(dividendContract.address, {
                  gasLimit,
                });
              };
            })
          );

          return await tx.project.update({
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
        },
        {
          timeout: 120000,
        }
      );

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
    .query(async ({ input, ctx: { prisma, signer, session } }) => {
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
          data?.IDOContract.map(async ({ whitelistDump, ...contract }) => {
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

            let whitelistData: WhitelistDataProof | null = null;

            if (session?.user?.isLoggedIn && whitelistDump) {
              const whitelistTree = WhitelistMerkleTree.fromJSON(whitelistDump);
              whitelistData = whitelistTree.getWhitelistDataWithProof(
                session.user.address
              );
            }

            return {
              ...contract,
              ...(whitelistData && { whitelistData }),
              dividendAmount: new BNjs(
                getContractDividendInPercent(contract.name as TierKeys)
              )
                .multipliedBy(data.targettedRaise)
                .dividedBy(100)
                .dividedBy(new BNjs(10 ** 18))
                .toString(),
              fulfilledAmount: fulfilledAmount.toFormat(),
              minStakedAmount: (
                await idoContract.minStakingRequired()
              ).toString(),
              maxStakedAmount: (
                await idoContract.maxStakingRequired()
              ).toString(),
              purchaseCap: (await idoContract.purchaseCap()).toString(),
              idoPrice: (await idoContract.idoPrice()).toString(),
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
        getRpcProvider()
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
              getContractDividendInPercent(contract.name as TierKeys)
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

  startWhitelisting: adminProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/projects/startWhitelisting",
        summary: "Start IDOs whitelisting",
        protect: true,
      },
    })
    .output(z.any())
    .input(
      z.object({
        projectId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx: { prisma, signer } }) => {
      const idoContracts = await prisma.iDOContract.findMany({
        where: {
          projectId: input.projectId,
        },
      });

      if (idoContracts.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No IDO contract found for this project",
        });
      }

      const idosData = await Promise.all(
        idoContracts.map(async (contract) => {
          const idoContract = new IDOContract__factory(signer).attach(
            contract.address
          );
          const minStaking = await idoContract.minStakingRequired();
          const maxStaking = await idoContract.maxStakingRequired();
          let whitelist: WhitelistData[] = [];

          return {
            id: contract.id,
            idoContract,
            minStaking,
            maxStaking,
            whitelist,
          };
        })
      );

      const stakingContract = getStakingContract();
      const stakersLength = await stakingContract.getStakersLength();
      let index = BigNumber.from(0);

      while (index.lt(stakersLength)) {
        const staker = await stakingContract.getStakerAtIndex(index);
        const [amount, reward] = await stakingContract.getStakeInfo(staker);
        const [stakingTokenAddr, rewardTokenAddr] = await Promise.all([
          stakingContract.stakingToken(),
          stakingContract.rewardToken(),
        ]);
        let total = amount;

        if (stakingTokenAddr === rewardTokenAddr) {
          total.add(reward);
        }

        const ido = idosData.find(
          (ido) => ido.minStaking.lte(total) && ido.maxStaking.gte(total)
        );
        if (ido) {
          ido.whitelist.push(new WhitelistData(staker, total.toString()));
        }

        index = index.add(1);
      }

      let successWhilelists: { address: string; totalWhitelisted: number }[] =
        [];
      for (const ido of idosData) {
        if (ido.whitelist.length === 0) {
          continue;
        }

        const tree = new WhitelistMerkleTree(ido.whitelist);

        try {
          await ido.idoContract.setWhitelistMerkleRoot(tree.getRoot());
        } catch (error) {
          console.log(error);
          continue;
        }

        await prisma.iDOContract.update({
          where: {
            id: ido.id,
          },
          data: {
            whitelistDump: tree.toJSON(),
          },
        });

        successWhilelists.push({
          address: ido.idoContract.address,
          totalWhitelisted: ido.whitelist.length,
        });
      }

      return successWhilelists;
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

  const requiredBalance = new BNjs(data.targettedRaise)
    .dividedBy(avgRate)
    .multipliedBy(new BNjs(10).pow(18));
  const isDividendFulfilled = dividendBalance.gte(requiredBalance);

  return {
    isDividendFulfilled,
    avgRate: avgRate.toString(),
    requiredBalance: requiredBalance,
    dividendBalance: dividendBalance,
    contractAddress: env.NEXT_PUBLIC_DIVIDEND_CONTRACT_ADDRESS,
    tokenAddress: data.token.address,
  };
}
