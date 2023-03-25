import { NonceManager } from "@ethersproject/experimental";
import { ContractFactory, ethers, Wallet } from "ethers";
import { env } from "~/env.mjs";
import { IDOContract__factory } from "~/libs/typechain-types";
import { IdoContractDto } from "./ido-contract.dto";

export type ContractInfo = {};

export class IDOContract {
  static instance = new IDOContract();
  signer = new NonceManager(
    new Wallet(
      env.ADMIN_PRIVATE_KEY,
      new ethers.providers.JsonRpcProvider(env.NEXT_PUBLIC_BLOCKCHAIN_RPC)
    )
  );

  private constructor() {}

  static getInstance() {
    if (!IDOContract.instance) {
      IDOContract.instance = new IDOContract();
    }
    return IDOContract.instance;
  }

  deployIDOContract(payload: IdoContractDto) {
    const {
      endTime,
      idoPrice,
      idoTokenAddress,
      purchaseCap,
      startTime,
      stakingContractAddress,
      stakingTokenAddress,
      stakingRequired,
    } = payload;

    const factory = new ContractFactory(
      IDOContract__factory.abi,
      IDOContract__factory.bytecode,
      this.signer
    );

    const contractInstance = factory.deploy(
      idoTokenAddress,
      stakingTokenAddress,
      idoPrice,
      purchaseCap,
      startTime,
      endTime,
      stakingContractAddress,
      stakingRequired
    );

    return contractInstance;
  }
}
