import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { ethers } from "ethers";

const accounts = [
  {
    privateKey:
      "940f63a87785278458057dffadff0a172456bd388ddda58a8c1b14107007d8b0",
    balance: ethers.utils.parseEther("1000").toString(),
  },
];

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  typechain: {
    target: "ethers-v5",
  },
  networks: {
    polygonMumbai: {
      url: "https://rpc.ankr.com/polygon_mumbai",
      chainId: 80001,
      accounts: accounts.map((account) => account.privateKey),
    },
    hardhat: {
      accounts: accounts,
      // https://hardhat.org/hardhat-network/docs/metamask-issue
      chainId: 1337,
    },
  },
};

export default config;
