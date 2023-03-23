import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "ethers";
import { create } from "zustand";
import { env } from "../../../env.mjs";
import { getErc20Contract, getStakingContract } from "../../../libs/blockchain";
import { useWeb3Hooks } from "../../common/ConnectWalletButton/store";
import { getSigner } from "../../../utils/ethereum";
import { message } from "antd";

export class FarmingHelper {
  static instance: FarmingHelper;

  static getInstance() {
    if (!FarmingHelper.instance) {
      FarmingHelper.instance = new FarmingHelper();
    }
    return FarmingHelper.instance;
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

export const useFarmingHook = () => {
  const { useAccount } = useWeb3Hooks();
  const address = useAccount();
  const { data: stakeInfo, isLoading: isLoadingStakeInfo } = useQuery(
    ["stakeInfo"],
    () => FarmingHelper.getInstance().getAmountStaked(address),
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
        return await getErc20Contract()
          .connect(signer)
          .approve(payload.stakingAddress, BigNumber.from(payload.amount));
      } catch (e: any) {
        const msg = e?.message?.split(` (`)[0];

        message.error(`Approve failed: ${msg}`);
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

      message.error(`Stake failed: ${msg}`);
    }
  }, []);
  const claimReward = useCallback(async () => {
    const signer = getSigner();
    try {
      return await getStakingContract().connect(signer).claimRewards();
    } catch (e: any) {
      const msg = e?.message?.split(` (`)[0];

      message.error(`Claim reward failed: ${msg}`);
    }
  }, []);

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
  };
};
