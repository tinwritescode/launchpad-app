import { NonceManager } from "@ethersproject/experimental";
import { ContractFactory } from "ethers";
import { ethers } from "hardhat";
import {
  Dividend__factory,
  Erc20__factory,
  IDOContract__factory,
  Staking__factory,
} from "../typechain-types";
import { waitForTx } from "../src/utils";

const deployContract = async <T extends ContractFactory>(
  name: string,
  ...args: Parameters<T["deploy"]>
) => {
  const Contract = await ethers.getContractFactory(name);
  const contract = await Contract.deploy(...(args as any));
  return contract.deployed() as Promise<ReturnType<T["deploy"]>>;
};

describe("Dividend contract", () => {
  it("Receive and divide to addresses", async () => {
    const [deployer] = await ethers
      .getSigners()
      .then((signer) => signer.map((signer) => new NonceManager(signer)));

    const dividendContract = await deployContract<Dividend__factory>(
      "Dividend"
    );
    const erc20Contract = await deployContract<Erc20__factory>(
      "Erc20",
      ethers.utils.parseEther("1000000"),
      "Test",
      "TEST"
    );
    const purchaseTokenContract = await deployContract<Erc20__factory>(
      "Erc20",
      ethers.utils.parseEther("1000000"),
      "PurchaseToken",
      "PT"
    );
    const stakingContract = await deployContract<Staking__factory>(
      "Staking",
      1,
      1,
      10000,
      erc20Contract.address,
      erc20Contract.address,
      erc20Contract.address,
      1
    );
    const stakingAmount = ethers.utils.parseEther("100");
    await waitForTx(
      await erc20Contract.increaseAllowance(
        stakingContract.address,
        stakingAmount
      )
    );
    await waitForTx(
      await stakingContract.stake(ethers.utils.parseEther("100"))
    );

    let PQueue = await import("p-queue").then((module) => module.default);
    const queue = new PQueue({ concurrency: 1 });
    const idoContracts = await queue.addAll(
      Array.from({ length: 6 }).map((_, i) => {
        return async () => {
          const idoContract = await deployContract<IDOContract__factory>(
            "IDOContract",
            erc20Contract.address,
            purchaseTokenContract.address,
            ethers.utils.parseEther("1.5"),
            ethers.utils.parseEther("1000"),
            (new Date().getTime() / 1000 + 60 * 60 * 24).toFixed(0),
            (new Date().getTime() / 1000 + 60 * 60 * 24 * 2).toFixed(0),
            stakingContract.address,
            ethers.utils.parseEther("100"),
            ethers.utils.parseEther("1000")
          );
          return idoContract;
        };
      })
    );

    await queue.addAll(
      idoContracts.map((contract) => {
        return async () => {
          return contract.addOperator(dividendContract.address).then((tx) => {
            return tx.wait();
          });
        };
      })
    );

    await waitForTx(
      await erc20Contract.transfer(
        dividendContract.address,
        ethers.utils.parseEther("500")
      )
    );

    await waitForTx(
      await dividendContract
        .connect(deployer)
        .distribute(erc20Contract.address, [
          {
            to: idoContracts[0].address,
            amount: ethers.utils.parseEther("100"),
          },
        ])
    );
  });
});
