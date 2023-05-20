import { ethers } from 'ethers';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  network,
}: HardhatRuntimeEnvironment) {
  const { deploy, save } = deployments;
  const { deployer } = await getNamedAccounts();

  if (['localhost', 'hardhat'].includes(network.name)) {
    // deploy WETH
    await deploy('WETH', {
      contract: 'Erc20',
      args: [ethers.utils.parseEther('1000000000'), 'Wrapped Ether', 'WETH'],
      from: deployer,
      log: true,
    });
  } else if (['polygonMumbai'].includes(network.name)) {
    // deploy WMATIC
    await save('WETH', {
      address: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
      //  artifacts/@thirdweb-dev/contracts/interfaces/IWETH.sol/IWETH.json
      abi: (
        await import(
          '../artifacts/@thirdweb-dev/contracts/interfaces/IWETH.sol/IWETH.json'
        )
      ).abi,
    });
  } else {
    throw new Error('Network not supported');
  }
};

export default func;
func.tags = ['init', 'weth'];
