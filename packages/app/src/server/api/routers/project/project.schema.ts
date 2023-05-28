import { z } from 'zod';
import {
  idoContractDto,
  parseStringToEthers,
} from '../../../services/ido-contract/ido-contract.dto';

export const createIdoProjectInputSchema = z
  .object({
    // prisma required fields
    name: z.string(),
    image: z.string().url(),
    videoURL: z.string().url(),
    targettedRaise: parseStringToEthers,
    // optional fields
    facebookURL: z.string().url().optional(),
    telegramURL: z.string().url().optional(),
    twitterURL: z.string().url().optional(),
    websiteURL: z.string().url().optional(),

    descriptionContent: z.string().optional(),
    backerContent: z.string().optional(),
    tokenDetailsContent: z.string().optional(),
    aboutContent: z.string().optional(),
  })
  .merge(
    idoContractDto.pick({
      startTime: true,
      endTime: true,
      idoPrice: true,
      idoTokenAddress: true,
      // purchaseCap: true,
      // TODO: add custom payment token, for example: pay with USDC
      // paymentTokenAddress: true,
    })
  );
