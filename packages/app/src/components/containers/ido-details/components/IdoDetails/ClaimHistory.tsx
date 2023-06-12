import { ethers } from "ethers";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { api } from "../../../../../utils/api";
import { Label } from "../../../../common/ui/label";
import useIdoStart from "./hooks/useIdoStart";

function ClaimHistory() {
  const { query } = useRouter();
  const { address } = useAccount();
  const { data, isLoading } = api.project.getUserWhiteListInfo.useQuery({
    id: query?.id as string,
    walletAddress: address as string,
  });
  const { purchaseHistory } = useIdoStart({
    idoContractAddress: data?.idoContractAddress,
    proof: data?.proof?.proof,
    stakedAmount: data?.proof?.stakedAmount,
  });

  if (!isLoading && !data?.isWhiteListed) {
    return <div>❌ You are not whitelisted!</div>;
  }

  return (
    <div className="space-y-4">
      {/* Update this */}
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

export default ClaimHistory;
