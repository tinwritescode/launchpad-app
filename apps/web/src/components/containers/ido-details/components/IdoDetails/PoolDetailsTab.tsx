import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
import { useIdoDetail } from "../../hooks/useIdoDetail";
import { SkeletonCell } from "./SkeletonCell";
import { ethers } from "ethers";

const createPoolData = (
  idoContracts: any,
  idoInfos: any
):
  | {
      address: string;
      name: string;
      dividendAmount: string;
      fulfilledAmount: string;
      idoPrice: string;
      maxStaking: string;
      minStaking: string;
      purchaseCap: string;
      startTime: string;
      endTime: string;
    }[]
  | undefined => {
  const contracts = idoContracts?.map((c: any) => {
    return {
      address: c.address,
      name: c.name,
      dividendAmount: c.dividendAmount,
      fulfilledAmount: c.fulfilledAmount,
    };
  });

  const idos = idoInfos?.map((ido: any) => {
    return {
      address: ido.address,
      name: ido.name,
      idoPrice: ido.idoPrice,
      maxStaking: ido.maxStaking,
      minStaking: ido.minStaking,
      purchaseCap: ido.purchaseCap,
      startTime: ido.startTime,
      endTime: ido.endTime,
    };
  });

  // combine idos and data with same address
  // format date tp dd/mm/yyyy
  const dateFormater = (date: any) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const combineData = contracts?.map((d: any) => {
    const ido = idos?.find((i: any) => i.address === d.address);
    return {
      address: d.address,
      name: d.name?.replace("_", " "),
      dividendAmount: d.dividendAmount,
      fulfilledAmount: d.fulfilledAmount,
      idoPrice: ido?.idoPrice?.toString(),
      maxStaking: ido?.maxStaking?.toString(),
      minStaking: ido?.minStaking?.toString(),
      purchaseCap: ido?.purchaseCap?.toString(),
      // convert big number to date format
      startTime: dateFormater(ido?.startTime?.toNumber()),
      endTime: dateFormater(ido?.endTime?.toNumber()),
    };
  });

  return combineData;
};

const PoolItem = ({
  poolName,
  stakingRequirement,
  startTime,
  endTime,
  IdoPrice,
  purchaseCap,
  dividendAmount,
  fulfilledAmount,
}: {
  poolName: string;
  stakingRequirement: string;
  startTime: string;
  endTime: string;
  IdoPrice: string;
  purchaseCap: string;
  dividendAmount: string;
  fulfilledAmount: string;
}) => {
  return (
    <>
      <div className="w-full max-w-sm p-4 bg-gray-700 border border-gray-200 rounded-lg shadow">
        <div className="flex flex-col justify-between items-center">
          <div className=" text-yellow-500 text-2xl font-bold">{poolName}</div>
          <div className="w-full h-px bg-gray-500 my-2"></div>
          <div className=" text-gray-400  text-lg">Staking Requirement</div>
          <div className=" text-white font-bold text-xl">
            {stakingRequirement}
          </div>
          <div className=" text-gray-400 text-lg">Time Lenght</div>
          <div className=" text-white font-bold text-lg">
            {startTime} - {endTime}
          </div>
          <div className=" text-gray-400 text-lg">Price</div>
          <div className=" text-white font-bold text-lg">{IdoPrice} STRAW</div>
          <div className=" text-gray-400 text-lg">Purchase Cap</div>
          <div className=" text-white font-bold text-lg">
            {purchaseCap} STRAW
          </div>
          <div className=" text-gray-400 text-lg">Dividend Amount</div>
          <div className=" text-white font-bold text-lg">
            {dividendAmount} STRAW
          </div>
          <div className=" text-gray-400 text-lg">Fulfilled Amount</div>
          <div className=" text-white font-bold text-lg">
            {fulfilledAmount} STRAW
          </div>
          <div className="w-full h-px bg-gray-500 my-2"></div>
        </div>
      </div>
    </>
  );
};

const PoolItemSkeleton = () => {
  return (
    <>
      <div className="w-full max-w-sm p-4 bg-gray-700 border border-gray-200 rounded-lg shadow">
        <div className="flex flex-col justify-between items-center">
          <div className=" text-yellow-500 text-2xl w-full">
            <SkeletonCell />
          </div>
          <div className="w-full h-px bg-gray-500 my-2"></div>
          <div className=" text-gray-400 text-lg">Staking Requirement</div>
          <div className=" text-white font-bold text-xl w-full">
            <SkeletonCell />
          </div>
          <div className=" text-gray-400 text-lg">Time Lenght</div>
          <div className=" text-white font-bold text-lg w-full">
            <SkeletonCell />
          </div>
          <div className=" text-gray-400 text-lg">Price</div>
          <div className=" text-white font-bold text-lg w-full">
            <SkeletonCell />
          </div>
          <div className=" text-gray-400 text-lg">Purchase Cap</div>
          <div className=" text-white font-bold text-lg w-full">
            <SkeletonCell />
          </div>
          <div className=" text-gray-400 text-lg">Dividend Amount</div>
          <div className=" text-white font-bold text-lg w-full">
            <SkeletonCell />
          </div>
          <div className=" text-gray-400 text-lg">Fulfilled Amount</div>
          <div className=" text-white font-bold text-lg w-full">
            <SkeletonCell />
          </div>
          <div className="w-full h-px bg-gray-500 my-2"></div>
        </div>
      </div>
    </>
  );
};

export const PoolDetailsTab = () => {
  const { id } = useRouter().query as { id: string };
  const { data, isLoading: projectLoading } = api.project.getOne.useQuery(
    { id },
    { enabled: !!id, refetchOnWindowFocus: false }
  );

  const {
    tokenInfo,
    idosInfo,
    isLoading: IdoDetailLoading,
  } = useIdoDetail({
    erc20ContractAddress: data?.token?.address,
    idoContractAddresses: data?.IDOContract?.map((c) => c.address),
  });

  const isLoading = projectLoading || IdoDetailLoading;

  const poolData = createPoolData(data?.IDOContract, idosInfo);

  return (
    <>
      <div className="grid grid-cols-3 md:grid-rows-1 gap-8">
        {projectLoading || IdoDetailLoading
          ? [...Array(6)].map((_, i) => <PoolItemSkeleton key={i} />)
          : poolData?.map((pool: any) => (
              <PoolItem
                key={pool.address}
                poolName={pool.name}
                stakingRequirement={pool.minStaking}
                IdoPrice={ethers.utils.formatEther(pool.idoPrice || 0)}
                purchaseCap={pool.purchaseCap}
                dividendAmount={pool.dividendAmount}
                fulfilledAmount={pool.fulfilledAmount}
                startTime={pool.startTime}
                endTime={pool.endTime}
              />
            ))}
      </div>
    </>
  );
};
