import { ethers } from 'hardhat';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { mine } from '@nomicfoundation/hardhat-network-helpers';

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const stakingTokenAddress = await deployments.get('StakingToken');
  const stakingContractAddress = await deployments.get('Staking');

  const { deployer } = await getNamedAccounts();
  const signer = await ethers.getSigner(deployer);

  const stakingTokenContract = await ethers.getContractAt(
    'Erc20',
    stakingTokenAddress.address,
    signer
  );
  const stakingContract = await ethers.getContractAt(
    'Staking20',
    stakingContractAddress.address,
    signer
  );

  const rewardTokenAmount = (await stakingTokenContract.balanceOf(deployer))
    .mul('30')
    .div('100');

  await stakingTokenContract
    .connect(signer)
    .approve(stakingContract.address, ethers.constants.MaxUint256)
    .then((tx) => tx.wait());
  await stakingTokenContract
    .connect(signer)
    .transfer(stakingContract.address, rewardTokenAmount);
  await stakingContract
    .connect(signer)
    .stake(ethers.utils.parseEther('5000'))
    .then((tx) => tx.wait());

  // add time to 10 days
  await mine(60 * 60 * 24 * 10);
};

export default func;
func.tags = ['init'];
func.dependencies = ['staking-contract'];
