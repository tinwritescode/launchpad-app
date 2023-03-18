import { BigNumber } from "ethers";
import { ethers, network } from "hardhat";
import { deployContract } from "../test/utils";
import { Erc20 } from "../typechain-types";
import { Staking } from "../typechain-types/contracts/Staking";

export async function deployStakingContract() {
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;

  const timeUnitInSecs = 60;
  const rewardRatio = {
    numerator: 1,
    denominator: 10000,
  };
  const totalSupply = BigNumber.from("1000000000");
  const lockTime = ONE_YEAR_IN_SECS;

  const address: Record<string, string> = {};
  address["stakingToken"] = await deployContract(
    "Erc20",
    totalSupply,
    "HCMUS IT Token",
    "HIT"
  );
  address["rewardToken"] = address["stakingToken"];

  switch (network.name) {
    case "hardhat": {
      address["WETH"] = await deployContract(
        "Erc20",
        totalSupply,
        "Wrapped Ether",
        "WETH"
      );
      break;
    }
    case "polygonMumbai": {
      address["WETH"] = "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889"; // WMATIC
    }
  }

  const Staking = await ethers.getContractFactory("Staking");
  const stakingContract = await Staking.deploy(
    timeUnitInSecs,
    rewardRatio.numerator,
    rewardRatio.denominator,
    address["stakingToken"],
    address["rewardToken"],
    address["WETH"],
    lockTime
  );

  await stakingContract.deployed();

  console.log("Staking deployed to:", stakingContract.address);

  return {
    stakingContract: stakingContract as Staking,
    stakingTokenAddress: address["stakingToken"],
    rewardTokenAddress: address["rewardToken"],
    WETHAddress: address["WETH"],
  };
}

export async function deployIDOToken() {
  return {
    idoToken: (await (await ethers.getContractFactory("Erc20"))
      .deploy(ethers.utils.parseEther("1000000000"), "Dragon Ball Z", "DBZ")
      .then((contract) => contract.deployed())) as Erc20,
  };
}

export async function deployUSDCToken() {
  return {
    usdcToken: await (await ethers.getContractFactory("Erc20"))
      .deploy(ethers.utils.parseEther("1000000000"), "USD Coin", "USDC")
      .then((contract) => contract.deployed()),
  };
}

export async function deployIdoContract(
  idoToken: Erc20,
  stakingTokenAddress: string,
  stakingContract: Staking
) {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const idoPrice = ethers.utils.parseEther("1.5");
  const startTime = currentTimestampInSeconds + 60;
  const endTime = currentTimestampInSeconds + 60 * 60;
  const purchaseCap = ethers.utils.parseEther("1000");
  const stakingRequired = ethers.utils.parseEther("100");

  const IdoContract = await ethers.getContractFactory("IDOContract");
  const idoContract = await IdoContract.deploy(
    idoToken.address,
    stakingTokenAddress,
    idoPrice,
    purchaseCap,
    startTime,
    endTime,
    stakingContract.address,
    stakingRequired
  );

  await idoContract.deployed();

  console.log("IDO Contract address:", idoContract.address);

  return {
    idoContract,
  };
}
