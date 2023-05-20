import { ethers } from 'ethers';
import { z } from 'zod';

const parseEther = <T>(val: T, ctx: z.RefinementCtx) => {
  try {
    ethers.utils.parseEther(`${val}`);
    return true;
  } catch (e) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Must be a valid number',
    });
    return false;
  }
};
const ethereumAddress = z.string().regex(/^0x[a-fA-F0-9]{40}$/);
export const parseToEthers = z.coerce.number().superRefine(parseEther);
export const parseStringToEthers = z.coerce.string().superRefine(parseEther);

const parseFromDateToNumber = z.coerce.date().transform((val) => val.getTime());

// TODO: validate all fields
export const idoContractDto = z.object({
  idoTokenAddress: ethereumAddress,
  stakingTokenAddress: ethereumAddress,
  stakingContractAddress: ethereumAddress,
  idoPrice: parseToEthers,
  startTime: parseFromDateToNumber.superRefine((val, ctx) => {
    if (val < Date.now()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must be a valid date',
      });
      return false;
    }
  }),
  endTime: parseFromDateToNumber.superRefine((val, ctx) => {
    if (val < Date.now()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must be a valid date',
      });
      return false;
    }
  }),
  minStakingRequired: parseStringToEthers,
  maxStakingRequired: parseStringToEthers,

  // prisma fields
  name: z.string(),
});

export type IdoContractDto = z.infer<typeof idoContractDto>;
