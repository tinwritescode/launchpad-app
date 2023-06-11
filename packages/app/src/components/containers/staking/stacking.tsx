import { ApplyToLaunch } from "@strawberry/ui";
import { PageHeader } from "@strawberry/ui";
import CountUp from "react-countup";
import { useStakingHook } from "./useStaking";
import { env } from "../../../env.mjs";
import { ethers } from "ethers";
import { Button } from "../../common/index";

import {
  getStakeValidationSchema,
  getWithdrawValidationSchema,
} from "./validationSchema";
import { BarLoader } from "react-spinners";

import { useAccount } from "wagmi";
import { useRef } from "react";
import toast from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

const Stacking = () => {
  const { isConnected } = useAccount();
  const {
    withdraw,
    approve,
    approveAmount,
    stake,
    decimals,
    amountStaked,
    stakingTokenBalance,
    totalStaked,
    numberOfStakers,
    APY,
    unclaimedRewards,
    unlockTime,
    claimReward,
  } = useStakingHook();

  const isLocked = Number(unlockTime || 0) > Date.now() / 1000;

  const stakeInputRef = useRef<HTMLInputElement>(null);
  const withdrawInputRef = useRef<HTMLInputElement>(null);

  const stakeSchema = getStakeValidationSchema(
    +ethers.utils.formatEther(stakingTokenBalance || "0")
  );
  const withdrawSchema = getWithdrawValidationSchema(
    +ethers.utils.formatEther(amountStaked || "0")
  );

  const onWithdrawButtonClick = () => {
    const withdrawInput = withdrawSchema.safeParse(
      +(withdrawInputRef.current?.value || "0")
    );
    if (withdrawInput.success === false) {
      toast.error(withdrawInput.error?.errors[0]?.message || "Invalid amount");
      return;
    }
    toast.promise(
      withdraw({
        amount: ethers.utils.parseUnits(
          withdrawInputRef.current?.value || "0",
          decimals
        ),
      }).then((tx) => tx?.wait()),
      {
        loading: "Withdrawing...",
        success: "Withdrawn!",
        error: (err) => {
          console.error(err.message);

          return "Failed to withdraw";
        },
      }
    );
  };

  const onStakingApprove = () => {
    toast.promise(
      approve({
        amount: ethers.constants.MaxUint256,
        stakingAddress: env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
      }).then((tx) => tx?.wait()),
      {
        loading: "Approving...",
        success: "Approved!",
        error: (err) => {
          return "Failed to approve";
        },
      }
    );
  };

  const onStakeButtonClick = () => {
    const stakeInput = stakeSchema.safeParse(
      +(stakeInputRef.current?.value || "0")
    );
    if (stakeInput.success === false) {
      toast.error(stakeInput.error?.errors[0]?.message || "Invalid amount");
      return;
    }
    toast.promise(
      stake({
        amount: ethers.utils.parseUnits(
          stakeInputRef.current?.value || "0",
          decimals
        ),
      }).then((tx) => tx?.wait()),
      {
        loading: "Staking...",
        success: "Staked!",
        error: (err) => {
          console.error(err.message);

          return "Failed to stake";
        },
      }
    );
  };

  const onClaimButtonClick = () => {
    toast.promise(
      claimReward().then((tx) => tx?.wait()),
      {
        loading: "Claiming...",
        success: "Claimed!",
        error: (err) => {
          console.error(err.message);

          return "Failed to claim";
        },
      }
    );
  };

  return (
    <>
      <PageHeader title="Staking" text="staking" />
      {/* ================> stacking start here <================== */}
      <div className="stacking padding-top padding-bottom">
        <div className="container">
          <div className="stacking__wrapper">
            <div className="stacking__project">
              <div className="row g-4">
                <div className="col-lg-4 col-sm-6">
                  <div className="stacking__project-item">
                    <div className="stacking__project-itemInner">
                      <h3>
                        <>
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger>
                                <div className="text-3xl font-bold flex items-center gap-1 tracking-wider">
                                  <span className="inline-block truncate md:max-w-[300px] max-w-xs">
                                    {"$ " +
                                      ethers.utils.commify(
                                        ethers.utils.formatEther(
                                          totalStaked || "0"
                                        )
                                      )}
                                  </span>{" "}
                                  STRAW
                                </div>
                              </TooltipTrigger>

                              <TooltipContent>
                                <div className="text-lg font-semibold items-center gap-1">
                                  <span className="inline-block">
                                    {ethers.utils.commify(
                                      ethers.utils.formatEther(
                                        totalStaked || "0"
                                      )
                                    )}
                                  </span>{" "}
                                  STRAW
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </>{" "}
                      </h3>
                      <p>Total Value Locked</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="stacking__project-item">
                    <div className="stacking__project-itemInner">
                      <h3>
                        {APY && (
                          <>
                            <TooltipProvider delayDuration={0}>
                              <Tooltip>
                                <TooltipTrigger>
                                  <div className="text-3xl font-bold flex items-center gap-1 tracking-wider">
                                    <span className="inline-block truncate md:max-w-[300px] max-w-xs">
                                      {ethers.utils.commify(APY?.toString())}
                                    </span>
                                    %
                                  </div>
                                </TooltipTrigger>

                                <TooltipContent>
                                  <div className="text-lg font-semibold items-center gap-1">
                                    <span className="inline-block">
                                      {ethers.utils.commify(APY?.toString())}
                                    </span>
                                    %
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </>
                        )}
                      </h3>
                      <p>Apy</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="stacking__project-item">
                    <div className="stacking__project-itemInner">
                      <h3>
                        <span
                          className="purecounter"
                          data-purecounter-start={0}
                          data-purecounter-end={
                            numberOfStakers?.toNumber() || 0
                          }
                        >
                          <CountUp
                            end={numberOfStakers?.toNumber() || 0}
                            duration={5}
                          />
                        </span>{" "}
                      </h3>
                      <p>Number of Stakers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="stacking__details">
              <div className="stacking__title">
                <h3>Participate IDO Stake</h3>
              </div>
              <div className="stacking__content">
                <div className="row align-items-center g-5">
                  <div className="col-lg-7">
                    <div className="stacking__ammount text-2xl">
                      <p>Total Stake</p>
                      <h4 className="mt-4">
                        <>
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger>
                                <div className="text-3xl font-bold flex items-center gap-1 tracking-wider">
                                  <span className="inline-block truncate md:max-w-[300px] max-w-xs">
                                    {ethers.utils.commify(
                                      ethers.utils.formatEther(
                                        amountStaked || "0"
                                      )
                                    )}
                                  </span>{" "}
                                  STRAW
                                </div>
                              </TooltipTrigger>

                              <TooltipContent>
                                <div className="text-lg font-semibold items-center gap-1">
                                  <span className="inline-block">
                                    {ethers.utils.commify(
                                      ethers.utils.formatEther(
                                        amountStaked || "0"
                                      )
                                    )}
                                  </span>{" "}
                                  STRAW
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </>
                      </h4>
                    </div>

                    <div className="stacking__info text-xl">
                      <div className="row align-items-center g-5">
                        <div className="col-sm-8">
                          <ul className="stacking__info-list">
                            <li className="stacking__info-item">
                              <p className="stacking__info-name">
                                Lock Period:{" "}
                                <span className="stacking__info-value">
                                  30 Days
                                </span>
                              </p>
                            </li>
                            <li className="stacking__info-item">
                              <p className="stacking__info-name">
                                Re-locks on registration:{" "}
                                <span className="stacking__info-value">No</span>
                              </p>
                            </li>
                            {/* <li className="stacking__info-item">
                              <p className="stacking__info-name">
                                Early unstake fee:
                                <span className="stacking__info-value">
                                  23%
                                </span>
                              </p>
                            </li> */}
                            <li className="stacking__info-item">
                              <p className="stacking__info-name">
                                Status:{" "}
                                <span className="stacking__info-value">
                                  {isLocked ? "Locked" : "Unlocked"}
                                </span>
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div className="col-sm-4">
                          {/* <div className="stacking__apy">
                            <p className="mb-4">APY Rate </p>
                            {APY && (
                              <>
                                <TooltipProvider delayDuration={0}>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <div className="text-3xl font-bold flex items-center gap-1 tracking-wider">
                                        <span className="inline-block truncate md:max-w-[100px] text-cyan-500 max-w-xs">
                                          {ethers.utils.commify(
                                            APY?.toString()
                                          )}
                                        </span>
                                        %
                                      </div>
                                    </TooltipTrigger>

                                    <TooltipContent>
                                      <div className="text-lg font-semibold items-center gap-1">
                                        <span className="inline-block">
                                          {ethers.utils.commify(
                                            APY?.toString()
                                          )}
                                        </span>
                                        %
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </>
                            )}
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-8">
                    <div className="stacking__approve">
                      <div className="stacking__approve-field mb-5">
                        <label htmlFor="approve-stack" className="form-label">
                          {stakingTokenBalance ? (
                            <div className="flex text-gray-500 font-semibold">
                              <span
                                className="truncate h-full inline-block max-w-[300px]"
                                title={
                                  ethers.utils.commify(
                                    ethers.utils.formatEther(
                                      stakingTokenBalance || "0"
                                    )
                                  ).length > 20
                                    ? ethers.utils.commify(
                                        ethers.utils.formatEther(
                                          stakingTokenBalance || "0"
                                        )
                                      ) + " STRAW"
                                    : ""
                                }
                              >
                                <span className="text-white">Balance</span>:{" "}
                                {ethers.utils.commify(
                                  ethers.utils.formatEther(
                                    stakingTokenBalance || "0"
                                  )
                                ) + " STRAW" || <BarLoader />}
                              </span>
                            </div>
                          ) : (
                            <div className="text-lg text-gray-500 font-semibold">
                              <BarLoader />
                            </div>
                          )}
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Approve Stack"
                            id="approve-stack"
                            step="0.01"
                            ref={stakeInputRef}
                            placeholder="0.00"
                          />
                          <span
                            className="input-group-text cursor-pointer"
                            onClick={() => {
                              if (
                                !stakeInputRef?.current ||
                                !stakingTokenBalance
                              )
                                return;

                              stakeInputRef.current.value =
                                ethers.utils.formatEther(stakingTokenBalance);
                            }}
                          >
                            Max
                          </span>
                          <button
                            className="input-group-btn withdraw-btn min-w-[144px]"
                            onClick={onStakeButtonClick}
                          >
                            Stake
                          </button>
                        </div>
                      </div>
                      <div className="stacking__approve-withdraw mb-5">
                        <label htmlFor="withdraw-stack" className="form-label">
                          <span
                            className="truncate h-full inline-block max-w-[300px]"
                            title={
                              ethers.utils.commify(
                                ethers.utils.formatEther(amountStaked || "0")
                              ).length > 20
                                ? ethers.utils.commify(
                                    ethers.utils.formatEther(
                                      amountStaked || "0"
                                    )
                                  ) + " STRAW"
                                : ""
                            }
                          >
                            <span className="text-white">Staked: </span>:{" "}
                            {ethers.utils.commify(
                              ethers.utils.formatEther(amountStaked || "0")
                            ) + " STRAW" || <BarLoader />}
                          </span>{" "}
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Withdraw Stack"
                            id="withdraw-stack"
                            ref={withdrawInputRef}
                            placeholder="0.00"
                          />
                          <span
                            className="input-group-text cursor-pointer"
                            onClick={() => {
                              if (!withdrawInputRef?.current || !amountStaked)
                                return;

                              withdrawInputRef.current.value =
                                ethers.utils.formatEther(amountStaked);
                            }}
                          >
                            Max
                          </span>
                          <button
                            className="input-group-btn withdraw-btn min-w-[144px]"
                            onClick={onWithdrawButtonClick}
                          >
                            Withdraw
                          </button>
                        </div>
                      </div>
                      <div className="text-lg text-gray-500 font-semibold">
                        {unclaimedRewards ? (
                          <div className="flex flex-row gap-4 justify-between items-center">
                            <div className="flex flex-col">
                              <div className="text-lg text-gray-500 font-semibold">
                                <span>Unclaimed Rewards</span>
                                <div className="text-3xl flex font-bold">
                                  <span
                                    className="truncate h-full inline-block max-w-[300px]"
                                    title={
                                      ethers.utils.commify(
                                        ethers.utils.formatEther(
                                          unclaimedRewards || "0"
                                        )
                                      ).length > 10
                                        ? ethers.utils.commify(
                                            ethers.utils.formatEther(
                                              unclaimedRewards || "0"
                                            )
                                          )
                                        : ""
                                    }
                                  >
                                    {ethers.utils.commify(
                                      ethers.utils.formatEther(
                                        unclaimedRewards || "0"
                                      )
                                    ) + " STRAW" || <BarLoader />}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="subtle"
                              onClick={onClaimButtonClick}
                            >
                              CLAIM
                            </Button>
                          </div>
                        ) : (
                          <BarLoader />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="note-text">
                  <strong>Note:</strong> Unstaking will take 30 days to process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ================> stacking end here <================== */}
      <ApplyToLaunch />
    </>
  );
};
export default Stacking;
