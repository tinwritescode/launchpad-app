// import { useQuery } from '@tanstack/react-query';
import { ethers } from "ethers";
import dynamic from "next/dynamic";
import { useAccount } from "wagmi";
import { useStakingHook } from "../components/containers/staking/useStaking";
import {
  IDO_CONTRACT_DIVIDEND_PERCENTAGE,
  IDO_CONTRACT_ICON_PATHS,
  IDO_CONTRACT_STAKING_REQUIRED,
  IDO_CONTRACT_TAILWIND_COLORS,
  TierKeys,
} from "../server/api/routers/project/project.constant";

import { Counter } from "@strawberry/ui";
import {
  Benefits,
  Completed,
  Hero,
  Opening,
  Team,
  Tier,
  Upcoming,
  Work,
} from "packages/ui/src/lib/components/modules/index/index.js";
import { api } from "../utils/api";

function Home() {
  const { amountStaked } = useStakingHook();
  const { address: walletAddress, isConnected } = useAccount();

  const { data, isLoading, error, refetch } = api.project.getAll.useQuery({
    offset: 0,
    limit: 100,
  });

  const userTierIndex =
    isConnected &&
    amountStaked &&
    Object.values(IDO_CONTRACT_STAKING_REQUIRED).findIndex((value, index) => {
      return (
        amountStaked.gte(ethers.utils.parseEther(value.toString())) &&
        amountStaked.lt(
          ethers.utils.parseEther(
            IDO_CONTRACT_STAKING_REQUIRED[
              Object.keys(IDO_CONTRACT_STAKING_REQUIRED)[index + 1] as TierKeys
            ]?.toString() ?? "0"
          )
        )
      );
    });

  const tierList = Object.keys(TierKeys).map((key) => {
    return {
      name: key.replace("_", " "),
      stakingRequired: IDO_CONTRACT_STAKING_REQUIRED[key as TierKeys],
      color: IDO_CONTRACT_TAILWIND_COLORS[key as TierKeys],
      img: IDO_CONTRACT_ICON_PATHS[key as TierKeys],
      percentage: IDO_CONTRACT_DIVIDEND_PERCENTAGE[key as TierKeys],
    };
  });

  return (
    <>
      <Hero />
      <Counter />
      <Work stepNum={isConnected ? (userTierIndex ? 2 : 1) : 0} />
      <Upcoming
        data={data?.data?.filter((item) => item.sale.status === "UPCOMING")}
        isLoading={isLoading}
      />
      <Opening
        data={data?.data?.filter((item) => item.sale.status === "OPEN")}
        isLoading={isLoading}
      />
      <Completed
        data={data?.data?.filter((item) => item.sale.status === "CLOSED")}
        isLoading={isLoading}
      />
      <Benefits />
      <Tier tierList={tierList} currentTier={userTierIndex} />
      <Team />
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
