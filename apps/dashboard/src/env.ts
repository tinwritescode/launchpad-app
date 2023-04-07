import { z } from "zod";

const envSchema = z.object({
  VITE_BASE_API_URL: z.string().url(),
  VITE_NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS: z.string(),
  VITE_NEXT_PUBLIC_STAKING_TOKEN_ADDRESS: z.string(),
  VITE_NEXT_PUBLIC_REWARD_TOKEN_ADDRESS: z.string(),
  VITE_NEXT_PUBLIC_USDC_TOKEN_ADDRESS: z.string(),
  VITE_NEXT_PUBLIC_IDO_CONTRACT_ADDRESS: z.string(),
  VITE_NEXT_PUBLIC_IDO_TOKEN_ADDRESS: z.string(),
  VITE_NEXT_PUBLIC_DIVIDEND_CONTRACT_ADDRESS: z.string(),
});

export const env = envSchema.parse(import.meta.env);
