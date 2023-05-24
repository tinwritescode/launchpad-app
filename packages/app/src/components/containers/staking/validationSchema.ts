import { z } from 'zod';

export const getStakeValidationSchema = (maxStake: number) =>
  z
    .number()
    .gt(0, { message: 'Amount must be greater than 0' })
    .max(maxStake, { message: `Amount must be less than ${maxStake}` });

export const getWithdrawValidationSchema = (maxWithdraw: number) =>
  z
    .number()
    .gt(0, { message: 'Amount must be greater than 0' })
    .max(maxWithdraw, { message: `Amount must be less than ${maxWithdraw}` });
