import { NonceManager } from '@ethersproject/experimental';
import { IDOContract__factory } from '@strawberry/contracts';
import { BigNumber, ContractFactory } from 'ethers';
import { IdoContractDto } from './ido-contract.dto';

export class IDOContract {
  static instance = new IDOContract();

  static getInstance() {
    if (!IDOContract.instance) {
      IDOContract.instance = new IDOContract();
    }
    return IDOContract.instance;
  }

  deployIDOContract(
    payload: Omit<IdoContractDto, 'idoPrice'> & {
      purchaseCap: BigNumber;
      idoPrice: BigNumber;
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
