import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const stakingTokenAddress = await deployments.get("StakingToken");
  const stakingContractAddress = await deployments.get("Staking");

  const { deployer, alice, bob, john } = await getNamedAccounts();
  const signer = await ethers.getSigner(deployer);

  const stakingTokenContract = await ethers.getContractAt(
    "Erc20",
    stakingTokenAddress.address,
    signer
  );
  const stakingContract = await ethers.getContractAt(
    "Staking20",
    stakingContractAddress.address,
    signer
  );

  const people = [
    {
      address: alice,
      signer: await ethers.getSigner(alice),
      amount: ethers.utils.parseEther("5000"),
    },
    {
      address: bob,
      signer: await ethers.getSigner(bob),
      amount: ethers.utils.parseEther("10000"),
    },
    {
      address: john,
      signer: await ethers.getSigner(john),
      amount: ethers.utils.parseEther("25000"),
    },
  ];

  // airdrop everyone 50k tokens
  for (const { address } of people) {
    console.log(`Airdropping 50k tokens to ${address}...`);
    await stakingTokenContract
      .connect(signer)
      .mint(address, ethers.utils.parseEther("50000"));
  }

  for (const { signer, amount } of people) {
    console.log(
      `Staking ${ethers.utils.formatEther(amount)} tokens... (address: ${
        signer.address
      })`
    );
    await stakingTokenContract
      .connect(signer)
      .approve(stakingContract.address, amount);

    await stakingContract.connect(signer).stake(amount);

    const stakeInfo = await stakingContract.getStakeInfo(signer.address);
    console.log(
      `Stake info: { tokenStaked: ${ethers.utils.formatEther(
        stakeInfo._tokensStaked
      )}, reward: ${ethers.utils.formatEther(stakeInfo._rewards)} }`
    );
  }

  const rewardTokenAmount = (await stakingTokenContract.balanceOf(deployer))
    .mul("30")
    .div("100");
  await stakingTokenContract
    .connect(signer)
    .transfer(stakingContract.address, rewardTokenAmount)
    .then((tx) => tx.wait());
};

export default func;
func.tags = ["init"];
func.dependencies = ["staking-contract"];
