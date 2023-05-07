import { BigNumber } from "ethers";
import { env } from "../../../../env.mjs";
import { IdoContractDto } from "./../../../services/ido-contract/ido-contract.dto";
// - Tiers: Bronze: 1000, Silver: 2500, Gold:  5000, Platinum: 10000, Diamond: 250000, Blue Diamond: 750000

export enum TierKeys {
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM",
  DIAMOND = "DIAMOND",
  BLUE_DIAMOND = "BLUE_DIAMOND",
}

export const IDO_CONTRACT_STAKING_REQUIRED: Record<TierKeys, number> = {
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
}: Pick<
  IdoContractDto,
  "startTime" | "endTime" | "idoPrice" | "idoTokenAddress"
>): IdoContractDto[] => {
  return Object.keys(IDO_CONTRACT_STAKING_REQUIRED).map((_key, index) => {
    const key = _key as TierKeys;
    const nextKey = getContractNameFromIndex(index + 1);

    const maxStakingRequired = nextKey
      ? IDO_CONTRACT_STAKING_REQUIRED[nextKey]
      : BigNumber.from(2).pow(256).sub(1);

    // next key or max number
    return {
      minStakingRequired: IDO_CONTRACT_STAKING_REQUIRED[key],
      maxStakingRequired: maxStakingRequired as number,
      startTime,
      endTime,
      idoPrice,
      idoTokenAddress,
      // purchaseCap,
      stakingContractAddress: env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
      stakingTokenAddress: env.NEXT_PUBLIC_STAKING_TOKEN_ADDRESS,
      name: key,
    };
  });
};

export const IDO_CONTRACT_TAILWIND_COLORS: Record<TierKeys, string> = {
  BRONZE: "bg-yellow-100",
  SILVER: "bg-gray-100",
  GOLD: "bg-yellow-100",
  PLATINUM: "bg-gray-100",
  DIAMOND: "bg-blue-100",
  BLUE_DIAMOND: "bg-blue-100",
} as const;

/** Specs: 
- Bronze tier: 5% (500 tokens)
- Silver tier: 10% (1000 tokens)
- Gold tier: 20% (2000 tokens)
- Platinum tier: 25% (2500 tokens)
- Diamond tier: 30% (3000 tokens)
- Blue Diamond tier: 10% (1000 tokens)
   */
export const getContractDividendInPercent = (
  contractName: keyof typeof IDO_CONTRACT_STAKING_REQUIRED
): number => {
  const dividend: Record<keyof typeof IDO_CONTRACT_STAKING_REQUIRED, number> = {
    BRONZE: 5,
    SILVER: 10,
    GOLD: 20,
    PLATINUM: 25,
    DIAMOND: 30,
    BLUE_DIAMOND: 10,
  };

  // fast test: sum all and check if it's 1
  const sum = Object.values(dividend).reduce((acc, cur) => acc + cur, 0);
  if (sum.toString().slice(0, 3) !== "100") {
    throw new Error("Dividend sum is not 100%");
  }

  return dividend[contractName] as number;
};
