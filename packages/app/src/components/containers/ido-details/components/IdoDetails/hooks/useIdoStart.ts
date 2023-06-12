import { IDOContract__factory } from "@strawberry/contracts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { Logger } from "ethers/lib/utils.js";
import { useMemo } from "react";
import { toast } from "react-hot-toast";
import { useAccount } from "wagmi";
import { getErc20Contract } from "../../../../../../libs/blockchain";
import { api } from "../../../../../../utils/api";
import { getSigner } from "../../../../../../utils/ethereum";
import { message } from "antd";

type Props = {
  idoContractAddress?: string | null;
  proof?: any[];
  stakedAmount?: string;
};

function useIdoStart({ idoContractAddress, proof, stakedAmount }: Props) {
  const { address } = useAccount();
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
        await contractFactory.purchaseToken()
      ).connect(getSigner());
      const allowance = await erc20Contract.allowance(
        getSigner().getAddress(),
        idoContractAddress
      );
      if (allowance.lt(amount)) {
        await erc20Contract
          .approve(idoContractAddress, amount)
          .then((tx) => tx.wait());
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
        .claim(ethers.utils.parseEther(amount))
        .then((tx) => tx.wait());
    },
    {
      onSuccess: () => {
        invalidate();
        message.success("Claimed successfully");
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

  const purchaseHistory = useQuery(
    ["purchaseHistory", { idoContractAddress, address }],
    async () => {
      if (!contractFactory) throw new Error("No contract factory");
      if (!idoContractAddress) throw new Error("No ido contract address");
      if (!address) throw new Error("No address");

      const queryFilter = await contractFactory.queryFilter(
        contractFactory.filters.Purchased(address),
        0,
        "latest"
      );

      return Promise.all(
        queryFilter.map(async (event) => {
          const { args, blockHash, blockNumber, transactionHash, getBlock } =
            event;

          const timestamp = await getBlock().then((block) => block.timestamp);
          const { amount, sender } = args;
          return {
            amount,
            sender,
            blockHash,
            blockNumber,
            transactionHash,
            timestamp,
          };
        })
      );
    },
    {
      enabled: !!idoContractAddress && !!address,
    }
  );

  const purchaseAmount = useQuery(
    ["purchaseAmount", { idoContractAddress, address }],
    async () => {
      if (!contractFactory) throw new Error("No contract factory");
      if (!idoContractAddress) throw new Error("No ido contract address");

      return contractFactory
        .connect(getSigner())
        .purchasedAmounts(address as string);
    },
    {
      enabled: !!idoContractAddress && !!address,
    }
  );

  return { purchase, claim, purchaseHistory, purchaseAmount };
}

export default useIdoStart;
