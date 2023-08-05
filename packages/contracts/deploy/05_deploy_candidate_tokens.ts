import { ethers } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const tokensToDeploy = [
  {
    name: "Seapad",
    symbol: "SPT",
    decimals: 18,
    totalSupply: ethers.utils.parseEther("1000000000"),
    logo: "https://s3-ap-southeast-1.amazonaws.com/bscstation.org/images/d7a14c704fdf8cb7b567ea1ab4fdd02049429cee127e7ff528.png",
  },
  {
    name: "Magic Shoes",
    symbol: "MCT",
    decimals: 18,
    totalSupply: ethers.utils.parseEther("1000000000"),
    logo: "https://s3-ap-southeast-1.amazonaws.com/bscstation.org/images/980f1258d72000eb44b2b87ba186aa4e56a5d2ad4d4c1609c8.png",
  },
  {
    name: "Umi`s Friends",
    symbol: "UNT",
    decimals: 18,
    totalSupply: ethers.utils.parseEther("1000000000"),
    logo: "https://s3-ap-southeast-1.amazonaws.com/bscstation.org/images/6edbb8f2d6ede02516cc9bf042bcf129be7c9b1bc16347c985.png",
  },
  {
    name: "Aradena",
    symbol: "AG",
    decimals: 18,
    totalSupply: ethers.utils.parseEther("1000000000"),
    logo: "https://s3-ap-southeast-1.amazonaws.com/bscstation.org/images/9e6dad32e738615740b791c908f406d0a8156f8ccfec4173dd.png",
  },
  {
    name: "MetaDoge",
    symbol: "MTDU",
    decimals: 18,
    totalSupply: ethers.utils.parseEther("1000000000"),
    logo: "https://s3-ap-southeast-1.amazonaws.com/bscstation.org/images/0a40916cf43ecfdd977ae28bb29f56aff58eded45c58e48e00.png",
  },
];

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  for (const token of tokensToDeploy) {
    const { totalSupply, name, symbol } = token;

    await deploy(`IDO_${symbol}`, {
      contract: "Erc20",
      args: [totalSupply, name, symbol],
      from: deployer,
      log: true,
    });
  }
};

export default func;
func.tags = ["init", "ido-token"];
