import { BigNumber, ethers } from "ethers";
import React, { HtmlHTMLAttributes, useMemo } from "react";
import { useStakingHook } from "~/components/containers/staking/useStaking";
import { env } from "~/env.mjs";

type Props = {};

const index = (props: Props) => {
  const {
    amountStaked,
    stakingTokenName,
    approve,
    stake,
    stakingTokenBalance,
    claimReward,
    unclaimedRewards,
    approveAmount,
    withdraw,
    unlockTime,
  } = useStakingHook();

  const balanceInEther = useMemo(() => {
    return ethers.utils.formatEther(stakingTokenBalance || "0");
  }, [stakingTokenBalance]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <>
      <div className="flex flex-row gap-4 p-4 bg-gray-100">
        <input
          className=" p-2 border border-gray-300 rounded-md"
          max={Number(balanceInEther)}
          type="number"
          ref={inputRef}
          step={1}
          min={0}
        />
        <button
          className=" p-2 border border-gray-300 rounded-md"
          onClick={() => {
            if (inputRef.current) inputRef.current.value = balanceInEther;
          }}
        >
          MAX
        </button>
        {approveAmount?.gt(BigNumber.from(0)) ? (
          <button
            className=" p-2 border border-gray-300 rounded-md"
            onClick={() => {
              console.log(
                "stake",
                ethers.utils.parseEther(inputRef.current?.value || "0"),
                inputRef.current?.value
              );
              //   return stake({
              //     amount: ethers.utils.parseEther(inputRef.current?.value || "0"),
              //   });
            }}
          >
            STAKE
          </button>
        ) : (
          <button
            className=" p-2 border border-gray-300 rounded-md"
            disabled={balanceInEther === "0"}
            onClick={() =>
              approve({
                amount: ethers.constants.MaxUint256,
                stakingAddress: env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
              })
            }
          >
            APRROVE
          </button>
        )}
      </div>
      <div>Amount Staked: {ethers.utils.formatEther(amountStaked || "0")} </div>
    </>
  );
};

export default index;
