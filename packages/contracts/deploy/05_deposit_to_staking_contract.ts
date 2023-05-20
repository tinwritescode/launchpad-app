import { ethers } from 'hardhat';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  // code here
  //   const { deploy, save } = deployments;
  //   const { deployer } = await getNamedAccounts();
  //   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  //   const timeUnitInSecs = 60;
  //   const rewardRatio = {
  //     numerator: 1,
  //     denominator: 10000,
  //   };
  //   const lockTime = ONE_YEAR_IN_SECS;

  //   const stakingToken = await deployments.get('Strawberry');
  //   const rewardToken = await deployments.get('Strawberry');
  //   const WETH = await deployments.get('WETH');

  //   await save('RewardToken', rewardToken);
  //   await save('StakingToken', stakingToken);

  //   await deploy('Staking', {
  //     args: [
  //       timeUnitInSecs,
  //       rewardRatio.numerator,
  //       rewardRatio.denominator,
  //       stakingToken.address,
  //       rewardToken.address,
  //       WETH.address,
  //       lockTime,
  //     ],
  //     from: deployer,
  //     log: true,
  //   });

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
    .mul('20')
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
};

export default func;
func.tags = ['init'];
func.dependencies = ['staking-contract'];
