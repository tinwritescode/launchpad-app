import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { api } from '../../../../../utils/api';
import { useStakingHook } from '../../../staking/useStaking';
import { useIdoDetail } from '../../hooks/useIdoDetail';
import { SkeletonCell } from './SkeletonCell';

export const ProjectDetailsTab = (tab0: any) => {
  const { id } = useRouter().query as { id: string };
  const { data, isLoading } = api.project.getOne.useQuery(
    { id },
    { enabled: !!id, refetchOnWindowFocus: false }
  );

  const { tokenInfo, idosInfo } = useIdoDetail({
    erc20ContractAddress: data?.token?.address,
    idoContractAddresses: data?.IDOContract?.map((c) => c.address),
  });

  const { amountStaked, stakingTokenName, stakingTokenBalance } =
    useStakingHook();

  const poolInfo = idosInfo?.find((c) => {
    const userTier =
      amountStaked &&
      data?.IDOContract?.find(
        (d) =>
          amountStaked.gte(ethers.utils.parseEther(d.minStakedAmount)) &&
          amountStaked.lt(ethers.utils.parseEther(d.maxStakedAmount))
      );
    return c.address === userTier?.address && userTier;
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
            <tbody>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Opens
                </th>
                <td className="px-6 py-4 w-full">
                  {(poolInfo?.startTime &&
                    new Date(
                      poolInfo.startTime.toNumber()
                    ).toLocaleString()) || <SkeletonCell />}
                </td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  FCFS Opens
                </th>
                <td className="px-6 py-4 w-full">{<SkeletonCell />}</td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Closes
                </th>
                <td className="px-6 py-4 w-full">
                  {(poolInfo?.endTime &&
                    new Date(poolInfo.endTime.toNumber()).toLocaleString()) || (
                    <SkeletonCell />
                  )}
                </td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Swap Rate
                </th>
                <td className="px-6 py-4 w-full">
                  {poolInfo?.idoPrice && tokenInfo && stakingTokenName ? (
                    '1 ' +
                    stakingTokenName +
                    ' = ' +
                    ethers.utils.formatEther(poolInfo.idoPrice) +
                    ' ' +
                    tokenInfo?.symbol
                  ) : (
                    <SkeletonCell />
                  )}
                </td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">Cap</th>
                <td className="px-6 py-4 w-full">
                  {poolInfo?.purchaseCap && tokenInfo ? (
                    // ethers.utils.formatEther(poolInfo.purchaseCap) +
                    poolInfo.purchaseCap.toString() + ' ' + tokenInfo?.symbol
                  ) : (
                    <SkeletonCell />
                  )}
                </td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Total Users Participated
                </th>
                <td className="px-6 py-4 w-full">{<SkeletonCell />}</td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Total Funds Swapped
                </th>
                <td className="px-6 py-4 w-full">{<SkeletonCell />}</td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Access Type
                </th>
                <td className="px-6 py-4 w-full">{<SkeletonCell />}</td>
              </tr>
            </tbody>
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
                <td className="px-6 py-4 w-full">
                  {!isLoading ? tokenInfo?.name : <SkeletonCell />}
                </td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Token Symbol
                </th>
                <td className="px-6 py-4 w-full">
                  {' '}
                  {!isLoading ? tokenInfo?.symbol : <SkeletonCell />}
                </td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Total Supply
                </th>
                <td className="px-6 py-4 w-full">
                  {!isLoading ? (
                    tokenInfo?.totalSupply.toString()
                  ) : (
                    <SkeletonCell />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
