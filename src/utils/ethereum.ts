import { ethers } from "ethers";

export const isWalletInstalled = () => {
  return (
    typeof window !== "undefined" && typeof window.ethereum !== "undefined"
  );
};
export const getSigner = () => {
  if (!isWalletInstalled()) {
    throw new Error("Wallet not installed");
  }
  const signer = new ethers.providers.Web3Provider(
    window.ethereum as any
  ).getSigner();

  return signer;
};
export const formatWalletAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
