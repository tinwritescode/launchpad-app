import { ethers } from "ethers";
import { env } from "../../env.mjs";
import {
  Erc20__factory,
  Staking__factory,
} from "ido-contracts/typechain-types";

export const getRpcProvider = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    env.NEXT_PUBLIC_BLOCKCHAIN_RPC
  );

  return provider;
};

export const getStakingContract = () => {
  return Staking__factory.connect(
    env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
    getRpcProvider()
  );
};

export const getErc20Contract = (
  address = env.NEXT_PUBLIC_STAKING_TOKEN_ADDRESS
) => {
  return Erc20__factory.connect(address, getRpcProvider());
};
