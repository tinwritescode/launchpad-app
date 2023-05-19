import { NonceManager } from "@ethersproject/experimental";
import fs from "fs/promises";
import { ethers } from "hardhat";
import {
  deployDividendContract,
  deployIDOToken,
  deployStakingContract,
} from "./lib";

export const PLATFORM_TOKEN_INFO = {
  name: "Strawberry",
  symbol: "STRAW",
  decimals: 18,
  totalSupply: ethers.utils.parseEther("1000000000"),
};

async function main() {
  const signer = new NonceManager((await ethers.getSigners())[0]);

  const {
    stakingContract,
    stakingTokenAddress,
    rewardTokenAddress,
    WETHAddress,
  } = await deployStakingContract(signer, PLATFORM_TOKEN_INFO);
  const { idoToken } = await deployIDOToken(signer);
  const { dividendContract } = await deployDividendContract(signer);

  // approve staking contract
  const stakingToken = await ethers.getContractAt(
    "ERC20",
    stakingTokenAddress,
    signer
  );
  await stakingToken
    .connect(signer)
    .approve(stakingContract.address, ethers.constants.MaxUint256);

  await stakingContract.connect(signer).stake(ethers.utils.parseEther("5000"));

  await saveToEnvFile({
    NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS: stakingContract.address,
    NEXT_PUBLIC_STAKING_TOKEN_ADDRESS: stakingTokenAddress,
    NEXT_PUBLIC_REWARD_TOKEN_ADDRESS: rewardTokenAddress,
    NEXT_PUBLIC_IDO_TOKEN_ADDRESS: idoToken.address,
    NEXT_PUBLIC_DIVIDEND_CONTRACT_ADDRESS: dividendContract.address,
  });
}

const saveToEnvFile = (json: any, fileName = ".env") => {
  const envConfigFile = Object.keys(json).map((k) => `${k}="${json[k]}"`).join(`
`);
  console.log(`[saveToEnvFile] ${fileName}`);
  console.log(envConfigFile);
  return fs.writeFile(fileName, envConfigFile);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
