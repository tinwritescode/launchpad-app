import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_BASE_API_URL: z.string().url(),
  NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS: z.string(),
  NEXT_PUBLIC_STAKING_TOKEN_ADDRESS: z.string(),
  NEXT_PUBLIC_REWARD_TOKEN_ADDRESS: z.string(),
  NEXT_PUBLIC_IDO_TOKEN_ADDRESS: z.string(),
  NEXT_PUBLIC_DIVIDEND_CONTRACT_ADDRESS: z.string(),
});

export const env = envSchema.parse(import.meta.env);
