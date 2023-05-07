import React, { useRef } from "react";
import StakingTabs from "./components/stakingtabs/StakingTabs";
import { useStakingHook } from "./useStaking";
import { ethers } from "ethers";
import { env } from "../../../env.mjs";
import { toast } from "react-hot-toast";

type Props = {};

const Staking = (props: Props) => {
  const { approve, approveAmount, stake, decimals } = useStakingHook();
  const stakeInputRef = useRef<HTMLInputElement>(null);

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
          console.error(err.message);

          return "Failed to approve";
        },
      }
    );
  };

  const onStakeButtonClick = () => {
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

  return (
    <>
      <div className="flex my-0 mx-auto gap-4  text-white ">
        <div className="flex flex-col h-fit w-full px-8 py-8 bg-slate-900 gap-3 min-w-max">
          <div className="text-2xl font-bold">Participate IDO Stake</div>
          <div className="text-lg font-bold">
            <span className="text-3xl font-bold"> 256.50 </span> BUSD
          </div>
          <div className="text-xl font-bold text-gray-500">Total Stake</div>
          <hr className="border-gray-500" />
          <div className="h-1"></div>
          <StakingTabs />
          <div className="h-1"></div>
          <div className="text-lg text-gray-500 font-semibold">
            Balance: 2889.00 BUSD
          </div>
          <div className="flex flex-row gap-4 h-16">
            <div className="flex flex-row w-3/5 border border-gray-500 p-2 focus-within:border-purple-500">
              <input
                type="text"
                className=" bg-slate-900 border-none focus:outline-none grow-[2]"
                ref={stakeInputRef}
              />
              <button className="px-4">MAX</button>
            </div>
            {approveAmount?.gt(0) ? (
              <button
                className="bg-gray-600 w-2/5 p-1"
                onClick={onStakeButtonClick}
              >
                STAKE
              </button>
            ) : (
              <button
                className="bg-purple-400 w-2/5 p-1"
                onClick={onStakingApprove}
              >
                APPROVE
              </button>
            )}
          </div>
          <div className="text-lg text-gray-500 font-semibold">
            Staked: 256.50 BUSD
          </div>
          <div className="flex flex-row gap-4 h-16">
            <div className="flex flex-row w-3/5 border border-gray-500 p-2 focus-within:border-purple-500">
              <input
                type="text"
                className=" bg-slate-900 border-none focus:outline-none grow-[2]"
              />
              <button className="px-4">MAX</button>
            </div>
            <button className="bg-gray-600 w-2/5 p-1">WITHDRAW</button>
          </div>
        </div>

        <div className="flex flex-col h-fit w-full justify-start min-w-max gap-4">
          <div className="flex flex-col px-8 py-8 gap-4 bg-slate-900">
            <div className="text-3xl font-bold">$7,868,163.54</div>
            <div className="text-xl font-bold text-gray-500">
              Total Value Locked
            </div>
          </div>
          <div className="flex flex-col px-8 py-8 gap-4 bg-slate-900">
            <div className="text-3xl font-bold">$7,868,163.54</div>
            <div className="text-xl font-bold text-gray-500">APY</div>
          </div>
          <div className="flex flex-col px-8 py-8 gap-4 bg-slate-900">
            <div className="text-3xl font-bold">$7,868,163.54</div>
            <div className="text-xl font-bold text-gray-500">
              Number of Statkers
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Staking;
