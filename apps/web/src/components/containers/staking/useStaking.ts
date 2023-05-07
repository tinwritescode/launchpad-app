import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "ethers";
import { create } from "zustand";
import { env } from "../../../env.mjs";
import { getErc20Contract, getStakingContract } from "../../../libs/blockchain";
import { getSigner } from "../../../utils/ethereum";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

export class StakingHelper {
  static instance: StakingHelper;

  static getInstance() {
    if (!StakingHelper.instance) {
      StakingHelper.instance = new StakingHelper();
    }
    return StakingHelper.instance;
  }

  async getRewardRatio() {
    const rewardRatio = await getStakingContract().getRewardRatio();

    return rewardRatio;
  }

  async getAmountStaked(address?: string) {
    if (!address) {
      return null;
    }
    return getStakingContract().stakers(address);
  }

  async getStakingTokenAddress() {
    const stakingTokenAddress = await getStakingContract().stakingToken();

    return stakingTokenAddress;
  }
}

export const useStakingHook = () => {
  const { address } = useAccount();
  const { data: stakeInfo, isLoading: isLoadingStakeInfo } = useQuery(
    ["stakeInfo"],
    () => StakingHelper.getInstance().getAmountStaked(address),
    {
      enabled: !!address,
    }
  );
  const { data: stakingTokenName } = useQuery(["stakingTokenName"], () =>
    getErc20Contract(env.NEXT_PUBLIC_STAKING_TOKEN_ADDRESS).symbol()
  );
  const { data: stakingTokenBalance } = useQuery(
    ["stakingTokenBalance", address],
    ({ queryKey }) =>
      getErc20Contract(env.NEXT_PUBLIC_STAKING_TOKEN_ADDRESS).balanceOf(
        queryKey?.[1] as string
      ),
    {
      enabled: !!address,
    }
  );
  const approve = useCallback(
    async (payload: { amount: BigNumber; stakingAddress: string }) => {
      const signer = getSigner();
      try {
        return await getErc20Contract(env.NEXT_PUBLIC_STAKING_TOKEN_ADDRESS)
          .connect(signer)
          .approve(payload.stakingAddress, BigNumber.from(payload.amount));
      } catch (e: any) {
        const msg = e?.message?.split(` (`)[0];

        toast.error(`Approve failed: ${msg}`);
      }
    },
    []
  );
  const approveAmount = useQuery(
    ["approveAmount", address],
    ({ queryKey }) =>
      getErc20Contract(env.NEXT_PUBLIC_STAKING_TOKEN_ADDRESS).allowance(
        queryKey?.[1] as string,
        env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS
      ),
    {
      enabled: !!address,
    }
  );
  const stake = useCallback(async (payload: { amount: BigNumber }) => {
    const signer = getSigner();
    try {
      return await getStakingContract().connect(signer).stake(payload.amount);
    } catch (e: any) {
      const msg = e?.message?.split(` (`)[0];

      toast.error(`Stake failed: ${msg}`);
    }
  }, []);
  const claimReward = useCallback(async () => {
    const signer = getSigner();
    try {
      return await getStakingContract().connect(signer).claimRewards();
    } catch (e: any) {
      const msg = e?.message?.split(` (`)[0];

      toast.error(`Claim reward failed: ${msg}`);
    }
  }, []);
  const withdraw = useCallback(async (payload: { amount: BigNumber }) => {
    const signer = getSigner();
    try {
      return await getStakingContract()
        .connect(signer)
        .withdraw(payload.amount);
    } catch (e: any) {
      const msg = e?.message?.split(` (`)[0];
      const text = e?.reason || msg;

      toast.error(`Withdraw failed: ${text}`);
    }
  }, []);

  const unlockTime = useQuery(
    ["unlockTime", address],
    ({ queryKey }) => getStakingContract().lockTimeOf(queryKey?.[1] as string),
    {
      enabled: !!address,
    }
  );

  const decimals = useQuery(
    ["decimals", address],
    ({ queryKey }) =>
      getErc20Contract(env.NEXT_PUBLIC_STAKING_TOKEN_ADDRESS).decimals(),
    {
      enabled: !!address,
    }
  );

  return {
    amountStaked: stakeInfo?.amountStaked,
    unclaimedRewards: stakeInfo?.unclaimedRewards,
    stakingTokenBalance,
    stakingTokenName,
    isLoadingStakeInfo,
    approve,
    approveAmount: approveAmount.data,
    stake,
    claimReward,
    withdraw,
    unlockTime: unlockTime.data,
    decimals: decimals.data,
  };
};
