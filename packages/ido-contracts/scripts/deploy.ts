import fs from "fs/promises";
import { ethers } from "hardhat";
import {
  deployDividendContract,
  deployIdoContract,
  deployIDOToken,
  deployStakingContract,
  deployUSDCToken,
} from "./lib";

async function main() {
  const {
    stakingContract,
    stakingTokenAddress,
    rewardTokenAddress,
    WETHAddress,
  } = await deployStakingContract();
  const { idoToken } = await deployIDOToken();
  const { usdcToken } = await deployUSDCToken();
  const { idoContract } = await deployIdoContract(
    idoToken,
    stakingTokenAddress,
    stakingContract
  );
  const { dividendContract } = await deployDividendContract();

  // faucet to user
  const [deployer] = await ethers.getSigners();
  await idoToken.transfer(deployer.address, ethers.utils.parseEther("1000"));
  await usdcToken.transfer(deployer.address, ethers.utils.parseEther("1000"));

  await saveToEnvFile({
    NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS: stakingContract.address,
    NEXT_PUBLIC_STAKING_TOKEN_ADDRESS: stakingTokenAddress,
    NEXT_PUBLIC_REWARD_TOKEN_ADDRESS: rewardTokenAddress,
    NEXT_PUBLIC_USDC_TOKEN_ADDRESS: usdcToken.address,
    NEXT_PUBLIC_IDO_CONTRACT_ADDRESS: idoContract.address,
    NEXT_PUBLIC_IDO_TOKEN_ADDRESS: idoToken.address,
    NEXT_PUBLIC_DIVIDEND_CONTRACT_ADDRESS: dividendContract.address,
  });
}

const saveToEnvFile = (json: any, fileName = ".env") => {
  const envConfigFile = Object.keys(json).map((k) => `${k}="${json[k]}"`).join(`
`);
  return fs.writeFile(fileName, envConfigFile);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
