import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
import { useIdoDetail } from "../../hooks/useIdoDetail";

// type PoolInfoProps = {
//   opens?: string;
//   fcfsOpens?: string;
//   closes?: string;
//   swapRate?: string;
//   cap?: string;
//   totalUsersParticipated?: string;
//   totalFundsSwapped?: string;
//   accessType?: string;
// };
// type TokenInfoProps = {
//   tokenName?: string;
//   tokenSymbol?: string;
//   totalSupply?: string;
// };
export const ProjectDetailsTab = () => {
  const { id } = useRouter().query as { id: string };
  const { data, isLoading } = api.project.getOne.useQuery(
    { id },
    {
      enabled: !!id,
    }
  );

  const { tokenInfo } = useIdoDetail({
    erc20ContractAddress: data?.token?.address,
  });

  return (
    <>
      <div className="grid grid-flow-row gap-8 md:grid-flow-col">
        <div className="overflow-x-auto">
          <table className="text-sm text-left w-full">
            <thead className="text-xs uppercase bg-gray-700 ">
              <tr>
                <th className="px-6 py-3">Pool information</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            {/* <tbody>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Opens
                </th>
                <td className="px-6 py-4">{poolInfo?.opens}</td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  FCFS Opens
                </th>
                <td className="px-6 py-4">{poolInfo?.fcfsOpens}</td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Closes
                </th>
                <td className="px-6 py-4">{poolInfo?.closes}</td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Swap Rate
                </th>
                <td className="px-6 py-4">{poolInfo?.swapRate}</td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">Cap</th>
                <td className="px-6 py-4">{poolInfo?.cap}</td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Total Users Participated
                </th>
                <td className="px-6 py-4">
                  {poolInfo?.totalUsersParticipated}
                </td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Total Funds Swapped
                </th>
                <td className="px-6 py-4">{poolInfo?.totalFundsSwapped}</td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Access Type
                </th>
                <td className="px-6 py-4">{poolInfo?.accessType}</td>
              </tr>
            </tbody> */}
          </table>
        </div>

        <div className="overflow-x-auto">
          <table className="text-sm text-left w-full">
            <thead className="text-xs uppercase bg-gray-700 ">
              <tr>
                <th className="px-6 py-3">Token information</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Name
                </th>
                <td className="px-6 py-4">{tokenInfo?.name}</td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Token Symbol
                </th>
                <td className="px-6 py-4">{tokenInfo?.symbol}</td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Total Supply
                </th>
                <td className="px-6 py-4">
                  {tokenInfo?.totalSupply.toString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
