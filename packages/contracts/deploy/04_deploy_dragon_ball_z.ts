import { ethers } from 'ethers';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const PLATFORM_TOKEN_INFO = {
  name: 'Dragon Ball Z',
  symbol: 'DBZ',
  decimals: 18,
  totalSupply: ethers.utils.parseEther('1000000000'),
};

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const { totalSupply, name, symbol } = PLATFORM_TOKEN_INFO;

  await deploy('IdoToken', {
    contract: 'Erc20',
    args: [totalSupply, name, symbol],
    from: deployer,
    log: true,
  });
};

export default func;
func.tags = ['init', 'ido-token'];
