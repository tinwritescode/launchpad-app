import {
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
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
