import { BigNumber, ethers } from "ethers";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useAccount } from "wagmi";
import { api } from "../../../../../utils/api";
import { Button } from "../../../../common";
import { Input } from "../../../../common/ui/input";
import { Label } from "../../../../common/ui/label";
import useIdoStart from "./hooks/useIdoStart";
import Spinner from "../../../../common/ui/spinner";
import Link from "next/link";

type Props = {};

function IdoStart({}: Props) {
  const { query } = useRouter();
  const { address } = useAccount();
  const { data, isLoading } = api.project.getUserWhiteListInfo.useQuery({
    id: query?.id as string,
    walletAddress: address as string,
  });
  const { purchase, purchaseHistory, purchaseAmount } = useIdoStart({
    idoContractAddress: data?.idoContractAddress,
    proof: data?.proof?.proof,
    stakedAmount: data?.proof?.stakedAmount,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const percentButtons = ["25", "50", "75", "100"];

  if (!isLoading && !data?.isWhiteListed) {
    return <div>❌ You are not whitelisted!</div>;
  }

  return (
    <div className="space-y-4">
      {data?.purchaseCap && (
        <div className="flex justify-between items-center">
          <Label className="mb-2 font-semibold">Amount</Label>
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Purchase cap:{" "}
              {ethers.utils.commify(
                ethers.utils.formatEther(data?.purchaseCap)
              )}
            </Label>
            {purchaseAmount.data && (
              <Label className="flex items-center gap-1">
                Purchase amount:{" "}
                {ethers.utils.commify(
                  ethers.utils.formatEther(purchaseAmount.data)
                )}
              </Label>
            )}
          </div>
        </div>
      )}

      <Input ref={inputRef} disabled={!data?.isIdoStarted} />

      <div className="flex gap-1">
        {percentButtons.map((percent) => (
          <Button
            size="sm"
            variant="outline"
            key={percent}
            disabled={!data?.isIdoStarted}
            className="flex-1"
            onClick={() => {
              if (!data?.purchaseCap) return;
              if (!inputRef.current) return;

              inputRef.current.value = BigNumber.from(data?.purchaseCap)
                .sub(purchaseAmount.data || 0)
                .mul(percent)
                .div(100)
                .div(BigNumber.from(10).pow(18))
                .toString();
            }}
          >
            {percent}%
          </Button>
        ))}
      </div>

      <div className="h-4"></div>

      {/* Is ido started? */}
      {!data?.isIdoStarted ? (
        <p>❌ IDO has not started yet. Please wait until the IDO starts.</p>
      ) : (
        <p>✅ IDO has started. You can purchase now.</p>
      )}

      <div className="flex justify-center">
        <Button
          onClick={() => {
            if (!inputRef.current?.value) return;

            return purchase.mutate({ amount: inputRef.current?.value });
          }}
          disabled={!data?.isIdoStarted}
        >
          {!data?.isIdoStarted ? (
            <>
              <Spinner className="mr-2 w-4" color="green" />
              <span>IDO has not started yet</span>
            </>
          ) : (
            "Purchase"
          )}
        </Button>
      </div>

      <div className="h-4"></div>

      <Label className="font-semibold">Purchase History</Label>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">TX Hash</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {purchaseHistory.data?.map((purchase, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                <Link
                  href={`https://mumbai.polygonscan.com/tx/${purchase.transactionHash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {purchase.transactionHash.slice(0, 6)}...
                </Link>
              </td>
              <td className="border px-4 py-2">
                {ethers.utils.commify(
                  ethers.utils.formatEther(purchase.amount)
                )}
              </td>
              <td className="border px-4 py-2">
                {new Date(purchase.timestamp * 1000).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IdoStart;
