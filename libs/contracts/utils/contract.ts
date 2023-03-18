import { z } from "zod";

const ethereumAddress = z.string().regex(/^0x[a-fA-F0-9]{40}$/);
export const envSchema = z.object({
  STAKING_CONTRACT_ADDRESS: ethereumAddress,
  STAKING_TOKEN_ADDRESS: ethereumAddress,
  REWARD_TOKEN_ADDRESS: ethereumAddress,
});

export const env = envSchema.parse(process.env);
