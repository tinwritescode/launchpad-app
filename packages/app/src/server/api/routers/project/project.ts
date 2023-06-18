import { NonceManager } from "@ethersproject/experimental";
import { Prisma, PrismaClient, Status } from "@prisma/client";
import {
  Dividend__factory,
  ERC20__factory,
  IDOContract__factory,
} from "@strawberry/contracts";
import { TRPCError } from "@trpc/server";
import BNjs from "bignumber.js";
import { BigNumber, ethers } from "ethers";
import PQueue from "p-queue";
import { z } from "zod";
import { env } from "../../../../env.mjs";
import {
  getErc20Contract,
  getIdoContract,
  getRpcProvider,
  getStakingContract,
} from "../../../../libs/blockchain/index";
import { adminProcedure, createTRPCRouter } from "../../../../server/api/trpc";
import {
  WhitelistData,
  WhitelistDataProof,
  WhitelistMerkleTree,
} from "../../../../utils/whitelist_tree";
import { IDOContract } from "../../../services/ido-contract";
import { protectedProcedure, publicProcedure } from "../../trpc";
import {
  NUMBER_OF_PEOPLE,
  TierKeys,
  buildContracts as buildContractPayloads,
  getContractDividendInPercent,
  getContractNameFromIndex,
} from "./project.constant";
import { createIdoProjectInputSchema } from "./project.schema";
import { calculateDividendPercent } from "./project.util";

const defaultProjectSelector: Prisma.ProjectSelect = {
  id: true,
  name: true,
  image: true,
  videoURL: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  websiteURL: true,
  facebookURL: true,
  telegramURL: true,
  twitterURL: true,
  token: {
    select: {
      id: true,
      address: true,
    },
  },
  IDOContract: true,
  aboutContent: true,
  descriptionContent: true,
  tokenDetailsContent: true,
  roadmapContent: true,
  backerContent: true,
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
            select: {
              ...defaultProjectSelector,
              targettedRaise: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          }),

          prisma.project.count(),
        ]);

        const fullData = await Promise.all(
          data.map(async (project) => {
            let saleStatus: "UNKNOWN" | "UPCOMING" | "OPEN" | "CLOSED" =
              "UNKNOWN";
            if (!project.IDOContract || project.status !== Status.ACTIVE) {
              return {
                ...project,
                sale: {
                  status: saleStatus,
                },
              };
            }
            let totalRaised = BigNumber.from(0);
            let totalParticipants = 0;
            let eligibleStakers = 0;
            let whitelistedUsers = 0;
            let name = null;
            let symbol = null;
            let decimals = null;
            let totalSupply = null;
            let startTime = null;
            let endTime = null;

            {
              const contract = getIdoContract(project.IDOContract[0].address);
              if (!project.token) {
                throw new TRPCError({
                  code: "INTERNAL_SERVER_ERROR",
                  message: "Project token not found",
                });
              }
              const erc20TokenContract = getErc20Contract(
                project.token.address
              );

              if (saleStatus === "UNKNOWN") {
                const now = new Date().getTime();
                startTime = (await contract.startTime()).toNumber() * 1000;
                endTime = (await contract.endTime()).toNumber() * 1000;

                [name, symbol, decimals, totalSupply] = await Promise.all([
                  erc20TokenContract?.name(),
                  erc20TokenContract?.symbol(),
                  erc20TokenContract?.decimals(),
                  erc20TokenContract?.totalSupply(),
                ]);

                if (startTime > now) {
                  saleStatus = "UPCOMING";
                } else if (now < endTime) {
                  saleStatus = "OPEN";
                } else {
                  saleStatus = "CLOSED";
                }
              }
            }

            if (saleStatus === "OPEN") {
              let minStakedAmount = BigNumber.from(2).pow(256).sub(1);
              for (const idoContract of project.IDOContract) {
                const contractMinStaked = await getIdoContract(
                  idoContract.address
                ).minStakingRequired();
                if (contractMinStaked.lt(minStakedAmount)) {
                  minStakedAmount = contractMinStaked;
                }
              }
              const stakingContract = getStakingContract();
              const stakersLength = await stakingContract.getStakersLength();
              for (let i = 0; i < stakersLength.toNumber(); i++) {
                const staker = await stakingContract.getStakerAtIndex(i);
                const [amount, reward] = await stakingContract.getStakeInfo(
                  staker
                );
                const [stakingTokenAddr, rewardTokenAddr] = await Promise.all([
                  stakingContract.stakingToken(),
                  stakingContract.rewardToken(),
                ]);
                const total = amount;

                if (stakingTokenAddr === rewardTokenAddr) {
                  total.add(reward);
                }

                if (total.gte(minStakedAmount)) {
                  eligibleStakers++;
                }
              }
            } else if (saleStatus === "CLOSED") {
              for (const idoContract of project.IDOContract) {
                whitelistedUsers += (
                  JSON.parse(idoContract.whitelistDump ?? "{}")?.values ?? []
                ).length;

                const contract = getIdoContract(idoContract.address);
                const purchaseHistory = await contract.purchaseHistory();
                totalParticipants += purchaseHistory.length;
                totalRaised = purchaseHistory.reduce(
                  (acc, curr) => acc.add(curr.amount),
                  totalRaised
                );
              }
            }

            return {
              ...project,
              token: {
                ...project.token,
                name,
                symbol,
                decimals,
                totalSupply,
              },
              sale: {
                status: saleStatus,
                eligibleStakers,
                whitelistedUsers,
                startTime,
                endTime,
                totalRaised,
                totalParticipants,
              },
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
        // block chain timestamp is second-based
        startTime: +(startTime / 1000).toFixed(0),
        endTime: +(endTime / 1000).toFixed(0),
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

          const targettedRaiseInIdoToken = BigNumber.from(targettedRaise)
            .div(idoPrice.toFixed(0))
            .mul(BigNumber.from(10).pow(18));

          const deployedContracts = await queue
            .addAll(
              contracts.map((contract) => {
                return () => {
                  // TODO: Change this later
                  const numberOfPeople = NUMBER_OF_PEOPLE[contract.name];
                  const dividendPercent = getContractDividendInPercent(
                    contract.name as TierKeys
                  );
                  const purchaseCapInIdoToken = new BNjs(
                    calculateDividendPercent(
                      BigNumber.from(targettedRaiseInIdoToken.toBigInt()),
                      dividendPercent
                    )
                  )
                    .dividedBy(new BNjs(numberOfPeople))
                    .toFixed();

                  return instance.deployIDOContract(
                    {
                      ...contract,
                      purchaseCap: ethers.utils.parseEther(
                        purchaseCapInIdoToken.toString()
                      ),
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
        id: z.string(),
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

      if (!data?.token?.address)
        throw new TRPCError({ code: "NOT_FOUND", message: "Token not found" });

      const erc20 = getErc20Contract(data?.token?.address);

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
            const purchaseTokenSymbol = await new ERC20__factory(signer)
              .attach(await idoContract.purchaseToken())
              .symbol();

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
                .dividedBy((await idoContract.idoPrice()).toString())
                .dividedBy(100)
                // .dividedBy(new BNjs(10 ** 18))
                .toString(),
              fulfilledAmount: fulfilledAmount.dividedBy(new BNjs(10 ** 18)),
              minStakedAmount: (
                await idoContract.minStakingRequired()
              ).toString(),
              maxStakedAmount: (
                await idoContract.maxStakingRequired()
              ).toString(),
              purchaseCap: (await idoContract.purchaseCap()).toString(),
              idoPrice: (await idoContract.idoPrice()).toString(),
              purchaseTokenSymbol,
            };
          }) || []
        ),
        token: {
          ...data?.token,
          decimals: await erc20.decimals(),
          symbol: await erc20.symbol(),
          totalSupply: await erc20.totalSupply(),
          totalRaised: await data?.IDOContract.reduce(async (acc, contract) => {
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

            return (await acc).plus(fulfilledAmount);
          }, Promise.resolve(new BNjs(0))).then((res) => res.toString()),
        },
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
        websiteURL: z.string().optional(),
        facebookURL: z.string().optional(),
        twitterURL: z.string().optional(),
        telegramURL: z.string().optional(),
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

      const { isDividendFulfilled, requiredBalance, isDistributed } =
        await getDividendContractInfo(
          ctx.prisma,
          {
            id: input.projectId,
          },
          ctx.signer
        );

      if (isDistributed) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Dividend is already distributed",
        });
      }

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

      const { isDistributed } = await getDividendContractInfo(
        prisma,
        {
          id: input.projectId,
        },
        signer
      );

      if (!isDistributed) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Dividend is not distributed yet",
        });
      }

      if (idoContracts.some((contract) => contract.whitelistDump !== null)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Whitelist is already started",
        });
      }

      const idosData = await Promise.all(
        idoContracts.map(async (contract) => {
          const idoContract = new IDOContract__factory(signer).attach(
            contract.address
          );
          const [minStaking, maxStaking] = await Promise.all([
            idoContract.minStakingRequired(),
            idoContract.maxStakingRequired(),
          ]);
          const whitelist: WhitelistData[] = [];

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
        const total = amount;

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

      const successWhilelists: { address: string; totalWhitelisted: number }[] =
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

  getUserWhiteListInfo: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/projects/whitelist/{id}",
        summary: "Get all whitelist address for an ido project id",
        protect: true,
      },
    })
    .input(
      z.object({
        id: z.string().uuid(),
        walletAddress: z.string(),
      })
    )
    .output(z.any())
    .query(async ({ input, ctx: { prisma, signer } }) => {
      // open prisma and get the table ido contract
      const project = await prisma.project.findUnique({
        where: {
          id: input.id,
        },
        include: {
          IDOContract: true,
        },
      });

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      for (const idoContract of project.IDOContract) {
        const { whitelistDump } = idoContract;
        const rankName = idoContract.name;

        if (!whitelistDump) continue;

        const merkle = WhitelistMerkleTree.fromJSON(whitelistDump);
        const _idoContract = new IDOContract__factory(signer).attach(
          idoContract.address
        );

        const proof = merkle.getWhitelistDataWithProof(input.walletAddress);
        const provider = signer.provider;

        const [
          isIdoStarted,
          isIdoEnded,
          isClaimed,
          purchasedAmount,
          purchaseCap,
          claimedAmounts,
          purchaseHistory,
        ] = await Promise.all([
          _idoContract
            .startTime()
            .then((time) => time?.toNumber() < Date.now() / 1000),
          _idoContract
            .endTime()
            .then((time) => time?.toNumber() < Date.now() / 1000),
          _idoContract
            .claimedAmounts(input.walletAddress)
            .then((amount) => amount.gt(0)),
          _idoContract.purchasedAmounts(input.walletAddress),
          _idoContract.purchaseCap(),
          _idoContract.claimedAmounts(input.walletAddress),
          provider.getLogs({
            fromBlock: 0,
            toBlock: "latest",
            address: _idoContract.address,
            topics: [_idoContract.interface.getEventTopic("Claimed")],
          }),
        ]);

        return {
          proof,
          rank: rankName,
          idoContractAddress: idoContract.address,
          purchaseCap: purchaseCap.toString(),
          isWhiteListed: !!proof,
          isIdoStarted,
          isIdoEnded,
          isClaimed: isClaimed,
          purchasedAmount: purchasedAmount.toString(),
          claimedAmounts: claimedAmounts.toString(),
          purchaseHistory: purchaseHistory.map((log) => {
            const parsedLog = _idoContract.interface.parseLog(log);
            return {
              amount: parsedLog.args.amount.toString(),
              timestamp: parsedLog.args.timestamp?.toNumber(),
            };
          }),
          idoEndTime: await _idoContract
            .endTime()
            .then((time) => time?.toNumber() * 1000),
          idoStartTime: await _idoContract
            .startTime()
            .then((time) => time?.toNumber() * 1000),
          claimableAmount: await _idoContract
            .purchasedAmounts(input.walletAddress)
            .then(async (amount) =>
              Promise.resolve(
                amount
                  .sub(await _idoContract.claimedAmounts(input.walletAddress))
                  .toString()
              )
            ),
        };
      }

      return {
        proof: null,
        rank: null,
        idoContractAddress: null,
        purchaseCap: null,
        isWhiteListed: false,
        isIdoStarted: null,
        isIdoEnded: null,
        isClaimed: null,
        purchasedAmount: null,
        claimedAmounts: null,
        purchaseHistory: null,
        // idoEndTime: null,
        // idoStartTime: null,
        // claimableAmount: null,
      };
    }),

  // Get all whitelist address for an ido project id
  getWhitelistInfo: adminProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/projects/{id}/whitelist",
        summary: "Get all whitelist address for an ido project id",
        protect: true,
      },
    })
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .output(z.any())
    .query(async ({ input, ctx: { prisma, signer } }) => {
      // get all and use reducer to merge whitelist array from all ido contract
      const project = await prisma.project.findUnique({
        where: {
          id: input.id,
        },
        include: {
          IDOContract: true,
        },
      });

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      return project.IDOContract.map((idoContract) => {
        return JSON.parse(idoContract.whitelistDump ?? "{}")?.values ?? [];
      })
        .flat()
        .map((item) => {
          return {
            address: item.value[0],
            amount: item.value[1],
          };
        });
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

  const requiredBalance = new BNjs(data.targettedRaise);
  // .dividedBy(avgRate)
  // .multipliedBy(new BNjs(10).pow(18));

  const requiredBalanceInIDOToken = requiredBalance
    .dividedBy(avgRate)
    .multipliedBy(new BNjs(10).pow(18));

  const isDividendFulfilled = BNjs(dividendBalance.toFixed(0)).gte(
    BNjs(requiredBalanceInIDOToken.toFixed(0))
  );

  const dividendContract = new Dividend__factory(signer).attach(
    env.NEXT_PUBLIC_DIVIDEND_CONTRACT_ADDRESS
  );

  const distributeLogs = await dividendContract.queryFilter(
    dividendContract.filters.Received(null, data.token.address),
    0,
    "latest"
    // calculate sum
  );

  // if exist a filter ethers for distribute
  const isDistributed = distributeLogs
    .reduce(
      (acc, cur) => acc.plus(cur.args?.amount.toString() || 0),
      new BNjs(0)
    )
    .gte(requiredBalanceInIDOToken.toFixed(0));

  console.log(
    "isDistributed",
    distributeLogs.reduce(
      (acc, cur) => acc.plus(cur.args?.amount.toString() || 0),
      new BNjs(0)
    )
  );

  const firstIdoContract = new IDOContract__factory(signer).attach(
    data.IDOContract[0].address
  );
  const isReady = await firstIdoContract
    .startTime()
    .then((res) => res.lt((Date.now() / 1000).toFixed(0)));
  const isEnd = await firstIdoContract
    .endTime()
    .then((res) => res.lt((Date.now() / 1000).toFixed(0)));

  return {
    isDividendFulfilled,
    avgRate: avgRate.toString(),
    requiredBalance: requiredBalanceInIDOToken,
    dividendBalance: dividendBalance,
    contractAddress: env.NEXT_PUBLIC_DIVIDEND_CONTRACT_ADDRESS,
    tokenAddress: data.token.address,
    isDistributed,
    isReady,
    isEnd,
    distributeLogs,
    idoStartIn: await firstIdoContract
      .startTime()
      .then((res) => res.toString()),
    idoEndIn: await firstIdoContract.endTime().then((res) => res.toString()),
    tokenName: await erc20.name(),
  };
}
