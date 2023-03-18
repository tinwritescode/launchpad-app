import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    polygonMumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [
        "940f63a87785278458057dffadff0a172456bd388ddda58a8c1b14107007d8b0",
      ],
    },
  },
  // private key
};

export default config;
