import { z } from "zod";
import { contractInfo } from "@strawberry/contracts";

const envSchema = z.object({
  NEXT_PUBLIC_BASE_API_URL: z.string().url(),
  NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS: z.string(),
  NEXT_PUBLIC_STAKING_TOKEN_ADDRESS: z.string(),
  NEXT_PUBLIC_REWARD_TOKEN_ADDRESS: z.string(),
  NEXT_PUBLIC_IDO_TOKEN_ADDRESS: z.string(),
  NEXT_PUBLIC_DIVIDEND_CONTRACT_ADDRESS: z.string(),
});

export const env = envSchema.parse({
  ...import.meta.env,
  // TODO: make it work with VITE_ prefix
  NEXT_PUBLIC_BASE_API_URL: import.meta.env.NEXT_PUBLIC_BASE_API_URL,
  NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS:
    contractInfo.default.contracts.Staking.address,
  NEXT_PUBLIC_STAKING_TOKEN_ADDRESS:
    contractInfo.default.contracts.StakingToken.address,
  NEXT_PUBLIC_REWARD_TOKEN_ADDRESS:
    contractInfo.default.contracts.RewardToken.address,
  NEXT_PUBLIC_IDO_TOKEN_ADDRESS:
    contractInfo.default.contracts.IDO_MTDU.address,
  NEXT_PUBLIC_DIVIDEND_CONTRACT_ADDRESS:
    contractInfo.default.contracts.Dividend.address,
});
