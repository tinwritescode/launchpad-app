import { ethers } from "ethers";
import { z } from "zod";

const ethereumAddress = z.string().regex(/^0x[a-fA-F0-9]{40}$/);
const parseToEthers = z.coerce.number().superRefine((val, ctx) => {
  try {
    ethers.utils.parseEther(`${val}`);
    return true;
  } catch (e) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Must be a valid number",
    });
    return false;
  }
});

const parseFromDateToNumber = z.coerce.date().transform((val) => val.getTime());

// TODO: validate all fields
export const idoContractDto = z.object({
  idoTokenAddress: ethereumAddress,
  stakingTokenAddress: ethereumAddress,
  stakingContractAddress: ethereumAddress,
  idoPrice: parseToEthers,
  purchaseCap: parseToEthers,
  startTime: parseFromDateToNumber,
  endTime: parseFromDateToNumber,
  minStakingRequired: parseToEthers,
  maxStakingRequired: parseToEthers,

  // prisma fields
  name: z.string(),
});

export type IdoContractDto = z.infer<typeof idoContractDto>;
