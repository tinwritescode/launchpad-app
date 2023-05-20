import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  // code here
  const { deploy, save } = deployments;
  const { deployer } = await getNamedAccounts();
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const timeUnitInSecs = 60;
  const rewardRatio = {
    numerator: 1,
    denominator: 10000,
  };
  const lockTime = ONE_YEAR_IN_SECS;

  const stakingToken = await deployments.get('Strawberry');
  const rewardToken = await deployments.get('Strawberry');
  const WETH = await deployments.get('WETH');

  await save('RewardToken', rewardToken);
  await save('StakingToken', stakingToken);

  await deploy('Staking', {
    args: [
      timeUnitInSecs,
      rewardRatio.numerator,
      rewardRatio.denominator,
      stakingToken.address,
      rewardToken.address,
      WETH.address,
      lockTime,
    ],
    from: deployer,
    log: true,
  });
};

export default func;
func.tags = ['init', 'staking-contract'];
func.dependencies = ['platform-token', 'weth'];
