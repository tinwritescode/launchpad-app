import React, { useMemo } from "react";
import { getErc20Contract } from "../../../../../../libs/blockchain";
import { IDOContract__factory } from "ido-contracts/typechain-types";
import { getSigner } from "../../../../../../utils/ethereum";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../../../utils/api";
import { ethers } from "ethers";
import { Logger } from "ethers/lib/utils.js";
import { toast } from "react-hot-toast";

type Props = {
  idoContractAddress?: string | null;
  proof?: any[];
  stakedAmount?: string;
};

function useIdoStart({ idoContractAddress, proof, stakedAmount }: Props) {
  const contractFactory = useMemo(
    () =>
      idoContractAddress &&
      IDOContract__factory.connect(idoContractAddress, getSigner()),
    [idoContractAddress]
  );
  const invalidate = api.useContext().project.invalidate;

  const purchase = useMutation(
    async ({ amount: _amount }: { amount: string }) => {
      if (!contractFactory) throw new Error("No contract factory");
      if (!proof) throw new Error("No proof");
      if (!stakedAmount) throw new Error("No staked amount");
      if (!idoContractAddress) throw new Error("No ido contract address");

      const amount = ethers.utils.parseEther(_amount);

      const erc20Contract = getErc20Contract(
        await contractFactory.ido()
      ).connect(getSigner());
      const allowance = await erc20Contract.allowance(
        getSigner().getAddress(),
        idoContractAddress
      );
      if (allowance.lt(amount)) {
        await erc20Contract.approve(idoContractAddress, amount);
      }

      return contractFactory
        .connect(getSigner())
        .purchase(amount, proof, stakedAmount)
        .then((tx) => tx.wait());
    },
    {
      onSuccess: () => {
        invalidate();
      },
      onError: (error: any) => {
        if (error?.code === Logger.errors.UNPREDICTABLE_GAS_LIMIT) {
          // Error: VM Exception while processing transaction: reverted with reason string
          const reason: string = error?.reason;

          if (reason.includes("SALE_NOT_STARTED")) {
            toast.error("Sale not started");
          } else if (reason.includes("INVALID_PROOF")) {
            toast.error("Invalid proof");
          } else if (reason.includes("INSUFFICIENT_SELL_BALANCE")) {
            toast.error("Insufficient sell balance");
          } else if (reason.includes("INSUFFICIENT_FUNDS")) {
            toast.error("Insufficient funds");
          } else if (reason.includes("PURCHASE_CAP_EXCEEDED")) {
            toast.error("Purchase cap exceeded");
          } else if (reason.includes("SALE_ALREADY_ENDED")) {
            toast.error("Sale already ended");
          } else if (reason.includes("PURCHASE_AMOUNT_INVALID")) {
            toast.error("Purchase amount invalid");
          } else {
            toast.error("Transaction failed");
          }
        }
      },
    }
  );

  const claim = useMutation(
    async ({ amount }: { amount: string }) => {
      if (!contractFactory) throw new Error("No contract factory");
      if (!idoContractAddress) throw new Error("No ido contract address");

      return contractFactory
        .connect(getSigner())
        .claim(amount)
        .then((tx) => tx.wait());
    },
    {
      onSuccess: () => {
        invalidate();
      },
      onError: (error: any) => {
        if (error?.code === Logger.errors.UNPREDICTABLE_GAS_LIMIT) {
          // Error: VM Exception while processing transaction: reverted with reason string
          const reason: string = error?.reason;

          if (reason.includes("SALE_NOT_ENDED")) {
            toast.error("Sale not ended");
          } else if (reason.includes("CLAIM_AMOUNT_INVALID")) {
            toast.error("Claim amount invalid");
          } else if (reason.includes("CLAIM_AMOUNT_EXCEEDED")) {
            toast.error("Claim amount exceeded");
          } else {
            toast.error("Transaction failed");
          }
        }
      },
    }
  );

  return { purchase, claim };
}

export default useIdoStart;
