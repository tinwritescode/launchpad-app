import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  // code here
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('Dividend', {
    contract: 'Dividend',
    args: [],
    from: deployer,
    log: true,
  });
};

export default func;
func.tags = ['init'];
