import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";
import { ethers } from "ethers";
import { HardhatUserConfig } from "hardhat/config";

const accounts = [
  {
    privateKey:
      "940f63a87785278458057dffadff0a172456bd388ddda58a8c1b14107007d8b0",
    balance: ethers.utils.parseEther("100000").toString(),
  },
  {
    privateKey:
      "0x382c4555fd34a8af14d49247a2225caff135598ac5ecb646931b5087e85b69b9",
    balance: ethers.utils.parseEther("100000").toString(),
  },
  {
    privateKey:
      "0xf8cecf13e3e81f4c4d81f9f5c4ae61343416326337616fb5a153bbf11d71c2ba",
    balance: ethers.utils.parseEther("100000").toString(),
  },
  {
    privateKey:
      "0xc2142ee6292a0dab167b08e1f083cccb63f62e86d811eb24c3322b4d454d6927",
    balance: ethers.utils.parseEther("100000").toString(),
  },
];

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  typechain: {
    target: "ethers-v5",
    outDir: "src/lib/typechain-types",
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
      url: "https://rpc.ankr.com/polygon_mumbai",
      chainId: 80001,
      accounts: accounts.map((account) => account.privateKey),
      verify: {
        etherscan: {
          apiUrl: "https://api-mumbai.polygonscan.com",
          apiKey: "4ZB2AQMXBMWXIBCXFAB1JYTCKKNSU27ZRY",
        },
      },
    },
  },
  namedAccounts: {
    deployer: 0,
    alice: 1,
    bob: 2,
    john: 3,
  },
};

export default config;
