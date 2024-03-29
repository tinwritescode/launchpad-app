import {
  Erc20__factory,
  IDOContract__factory,
  Staking__factory,
} from '@strawberry/contracts';
import { ethers } from 'ethers';
import { env } from '../../env.mjs';

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

export const getErc20Contract = (address: string) => {
  return Erc20__factory.connect(address, getRpcProvider());
};

export const getIdoContract = (address: string) => {
  return IDOContract__factory.connect(address, getRpcProvider());
};

export const useErc20Contract = (address: string) => {
  return getErc20Contract(address);
};
