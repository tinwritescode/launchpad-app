import { ERC20__factory } from "./../libs/typechain-types/factories/@openzeppelin/contracts/token/ERC20/ERC20__factory";
import { ethers } from "ethers";
import { Staking__factory, Erc20__factory } from "~/libs/typechain-types";
import { env } from "~/env.mjs";

export const getStakingContract = (provider?: any) => {
  const jsonRpcProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/polygon_mumbai"
  );

  return Staking__factory.connect(
    env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
    provider || jsonRpcProvider
  );
};

export const getERC20Contract = (provider?: any) => {
  const jsonRpcProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/polygon_mumbai"
  );

  return Erc20__factory.connect(
    env.NEXT_PUBLIC_STAKING_TOKEN_ADDRESS,
    provider || jsonRpcProvider
  );
};
