import React from "react";

import * as S from "./MiddleDetailInfo.style";
import { Card } from "antd";
import { PoolInfo, TokenInfo } from "../../lib/types";

interface Props {}

const MiddleDetailInfo: React.FC<Props> = () => {
  const poolInfo: PoolInfo = {
    distributionPercentage: 100,
    minAllocation: 100,
    maxAllocation: 1000,
    tokenPrice: 0.1,
    accessType: "Public",
  };

  const tokenInfo: TokenInfo = {
    name: "ABC",
    symbol: "ABC",
    address: "0x00000",
    decimals: 18,
    totalSupply: 1000000,
  };

  return (
    <S.Container>
      <Card title="POOL INFO">
        <div>
          <span>Distribution Percentage</span>
          <span>{poolInfo.distributionPercentage}</span>
        </div>
        <div>
          <span>Min Allocation</span>
          <span>{poolInfo.minAllocation}</span>
        </div>
        <div>
          <span>Max Allocation</span>
          <span>{poolInfo.maxAllocation}</span>
        </div>
        <div>
          <span>Token Price</span>
          <span>{poolInfo.tokenPrice}</span>
        </div>
        <div>
          <span>Access Type</span>
          <span>{poolInfo.accessType}</span>
        </div>
      </Card>

      <Card title="TOKEN INFO">
        <div>
          <span>Token Name</span>
          <span>{tokenInfo.name}</span>
        </div>
        <div>
          <span>Token Symbol</span>
          <span>{tokenInfo.symbol}</span>
        </div>
        <div>
          <span>Decimals</span>
          <span>{tokenInfo.decimals}</span>
        </div>
        <div>
          <span>Addres</span>
          <span>{tokenInfo.address}</span>
        </div>
        <div>
          <span>Total Supply</span>
          <span>{tokenInfo.totalSupply}</span>
        </div>
      </Card>
    </S.Container>
  );
};

export default MiddleDetailInfo;
