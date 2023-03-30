import { BigNumber, ethers } from "ethers";
import { env } from "../../../../env.mjs";
import { IdoContractDto } from "./../../../services/ido-contract/ido-contract.dto";
// - Tiers: Bronze: 1000, Silver: 2500, Gold:  5000, Platinum: 10000, Diamond: 250000, Blue Diamond: 750000

export const IDO_CONTRACT_STAKING_REQUIRED: Record<string, number> = {
  BRONZE: 1000,
  SILVER: 2500,
  GOLD: 5000,
  PLATINUM: 10000,
  DIAMOND: 250000,
  BLUE_DIAMOND: 750000,
} as const;
export const getContractNameFromIndex = (
  index: number
): keyof typeof IDO_CONTRACT_STAKING_REQUIRED | null => {
  const key = Object.keys(IDO_CONTRACT_STAKING_REQUIRED)[index];
  if (!key) {
    return null;
  }
  return key as keyof typeof IDO_CONTRACT_STAKING_REQUIRED;
};

export const buildContracts = ({
  startTime,
  endTime,
  idoPrice,
  idoTokenAddress,
  purchaseCap,
}: Pick<
  IdoContractDto,
  "startTime" | "endTime" | "idoPrice" | "idoTokenAddress" | "purchaseCap"
>): IdoContractDto[] => {
  return Object.keys(IDO_CONTRACT_STAKING_REQUIRED).map((key, index) => {
    const nextKey = getContractNameFromIndex(index + 1);

    const maxStakingRequired = nextKey
      ? IDO_CONTRACT_STAKING_REQUIRED[nextKey]
      : Number.MAX_VALUE;

    // next key or max number
    return {
      minStakingRequired: IDO_CONTRACT_STAKING_REQUIRED[key] as number,
      maxStakingRequired: maxStakingRequired as number,
      startTime,
      endTime,
      idoPrice,
      idoTokenAddress,
      purchaseCap,
      stakingContractAddress: env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
      stakingTokenAddress: env.NEXT_PUBLIC_STAKING_TOKEN_ADDRESS,
      name: key,
    };
  });
};
