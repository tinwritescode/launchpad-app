import { z } from "zod";
import { idoContractDto } from "../../../services/ido-contract/ido-contract.dto";

export const createIdoProjectInputSchema = z
  .object({
    // prisma required fields
    name: z.string(),
    comparisionContent: z.string(),
    image: z.string().url(),
    roadmapContent: z.string(),
    summaryContent: z.string(),
    videoURL: z.string().url(),
  })
  .merge(
    idoContractDto.pick({
      startTime: true,
      endTime: true,
      idoPrice: true,
      idoTokenAddress: true,
      purchaseCap: true,
      // TODO: add custom payment token, for example: pay with USDC
      // paymentTokenAddress: true,
    })
  );
