import { ethers } from 'hardhat';
import { ContractTransaction } from 'ethers';

export const deployContract = async <T extends string>(
  contractName: T,
  ...args: any
) => {
  return (await ethers.getContractFactory(contractName))
    .deploy(...args)
    .then((contract) => contract.deployed())
    .then((contract) => contract.address);
};

export const waitForTx = async (tx: ContractTransaction) => {
  console.group('TX');
  console.log('TX hash:', tx.hash);
  console.log('TX blockNumber:', tx.blockNumber);
  console.log('TX confirmations:', tx.confirmations);

  return tx.wait().then((receipt) => {
    // console.log("TX receipt:", receipt);
    console.log(
      'TX Events: ',
      receipt.events?.map((e) => e.event)
    );
    console.groupEnd();
    return receipt;
  });
};

export const getErc20Contract = async (address: string) => {
  return (await ethers.getContractAt('Erc20', address)).deployed();
};
