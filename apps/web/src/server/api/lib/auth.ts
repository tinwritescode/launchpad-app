import { ethers } from "ethers";

export const safeVerifyMessage = async ({
  message,
  signature,
  walletAddress,
}: {
  message: string;
  signature: string;
  walletAddress: string;
}) => {
  const test = ethers.utils.verifyMessage(message, signature);
  if (test !== walletAddress) {
    return false;
  }
  return true;
};
