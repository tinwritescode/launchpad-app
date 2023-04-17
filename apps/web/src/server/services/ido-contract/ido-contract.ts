import { NonceManager } from "@ethersproject/experimental";
import { BigNumber as BNjs } from "bignumber.js";
import { BigNumber, ContractFactory } from "ethers";
import { IDOContract__factory } from "ido-contracts/typechain-types";
import { IdoContractDto } from "./ido-contract.dto";

export type ContractInfo = {};

export class IDOContract {
  static instance = new IDOContract();

  static getInstance() {
    if (!IDOContract.instance) {
      IDOContract.instance = new IDOContract();
    }
    return IDOContract.instance;
  }

  deployIDOContract(
    payload: IdoContractDto & {
      purchaseCap: BigNumber;
    },
    signer: NonceManager
  ) {
    const {
      purchaseCap,
      endTime,
      idoPrice,
      idoTokenAddress,
      startTime,
      stakingContractAddress,
      stakingTokenAddress,
      minStakingRequired,
      maxStakingRequired,
    } = payload;

    const factory = new ContractFactory(
      IDOContract__factory.abi,
      IDOContract__factory.bytecode,
      signer
    );

    const contractInstance = factory.deploy(
      idoTokenAddress,
      stakingTokenAddress,
      idoPrice,
      purchaseCap,
      startTime,
      endTime,
      stakingContractAddress,
      minStakingRequired,
      maxStakingRequired
    );

    return contractInstance;
  }
}
