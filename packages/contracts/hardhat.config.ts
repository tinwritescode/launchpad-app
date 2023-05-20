import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';
import { ethers } from 'ethers';
import { HardhatUserConfig } from 'hardhat/config';

const accounts = [
  {
    privateKey:
      '940f63a87785278458057dffadff0a172456bd388ddda58a8c1b14107007d8b0',
    balance: ethers.utils.parseEther('100000').toString(),
  },
];

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  typechain: {
    target: 'ethers-v5',
    outDir: 'src/lib/typechain-types',
  },
  networks: {
    hardhat: {
      accounts: accounts,
      chainId: 1337,
      initialDate: new Date(Date.now()).toISOString(),
      mining: {
        auto: true,
        interval: 10000,
      },
    },
    polygonMumbai: {
      url: 'https://rpc.ankr.com/polygon_mumbai',
      chainId: 80001,
      accounts: accounts.map((account) => account.privateKey),
    },
  },
  namedAccounts: {
    deployer: 0,
    creator: 0,
    test: 0,
  },
};

export default config;
