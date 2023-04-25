import { Token } from "database";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
import { useIdoDetail } from "../TopDetailInfo/hooks/useIdoDetail";

interface Props {}

const MiddleDetailInfo: React.FC<Props> = () => {
  const { id } = useRouter().query as { id: string };
  const { data, isLoading } = api.project.getOne.useQuery({ id });
  const { erc20Contract, idoContract, saleEndIn } = useIdoDetail({
    erc20ContractAddress: data?.token?.address,
  });
  const token = data?.token as Token;

  return (
    <div className="flex gap-3">
      <PoolInfo
        tokenDistribution={data?.tokenDistribution}
        minAllocation={data?.minAllocation}
        maxAllocation={data?.maxAllocation}
        tokenPrice={data?.tokenPrice}
        accessType={data?.accessType}
      />
      <TokenInfo
        // Correct this
        tokenAddress={token?.address}
        tokenName="test"
        tokenSymbol="TEST"
        tokenDecimals="18"
        tokenTotalSupply="100000"
      />
    </div>
  );
};

export default MiddleDetailInfo;

function PoolInfo({
  tokenDistribution,
  minAllocation,
  maxAllocation,
  tokenPrice,
  accessType,
}: {
  tokenDistribution: string;
  minAllocation: string;
  maxAllocation: string;
  tokenPrice: string;
  accessType: string;
}) {
  const info = [
    {
      title: "Token distribution",
      value: tokenDistribution,
    },
    {
      title: "Min allocation",
      value: minAllocation,
    },
    { title: "Max allocation", value: maxAllocation },
    { title: "Token price", value: tokenPrice },
    { title: "Access type", value: accessType },
  ];

  return (
    <div className="bg-gray-800 rounded text-white space-y-2 gap-3 grid p-4 flex-1">
      <div>Pool Info</div>

      {info.map((item, index) => (
        <div className="flex justify-between items-center" key={item.title}>
          <span className="text-gray-500">{item.title}</span>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function TokenInfo({
  tokenName,
  tokenSymbol,
  tokenDecimals,
  tokenAddress,
  tokenTotalSupply,
}: {
  tokenName: string;
  tokenSymbol: string;
  tokenDecimals: string;
  tokenAddress: string;
  tokenTotalSupply: string;
}) {
  const info = [
    {
      title: "Token name",
      value: tokenName,
    },
    {
      title: "Token symbol",
      value: tokenSymbol,
    },
    { title: "Decimals", value: tokenDecimals },
    {
      title: "Address",
      value: tokenAddress,
      render: (value: string) => (
        <a href={`https://bscscan.com/address/${value}`} target="_blank">
          {value}
        </a>
      ),
    },
    { title: "Total supply", value: tokenTotalSupply },
  ];

  return (
    <div className="bg-gray-800 rounded text-white space-y-2 gap-3 grid p-4 flex-1">
      <div>Token Info</div>

      {info.map((item, index) => (
        <div className="flex justify-between items-center">
          <span className="text-gray-500">{item.title}</span>
          <span>{item.render ? item.render(item.value) : item.value}</span>
        </div>
      ))}
    </div>
  );
}
