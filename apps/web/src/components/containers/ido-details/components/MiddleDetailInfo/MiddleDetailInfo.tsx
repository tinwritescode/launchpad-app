import { Token } from "database";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
import * as S from "./MiddleDetailInfo.style";

interface Props {}

const MiddleDetailInfo: React.FC<Props> = () => {
  const { id } = useRouter().query as { id: string };
  const { data, isLoading } = api.project.getOne.useQuery({ id });

  const token = data?.token as Token;

  return (
    <S.Container>
      {/* <Card title="TOKEN INFO">
        <div>
          <span>Token Name: </span>
          <span>{token?.name}</span>
        </div>
        <div>
          <span>Token Symbol: </span>
          <span>{token?.symbol}</span>
        </div>
        <div>
          <span>Decimals: </span>
          <span>{token?.decimals}</span>
        </div>
        <div>
          <span>Address: </span>
          <span>{token?.address}</span>
        </div>
        <div>
          <span>Total Supply: </span>
          <span>{token?.totalSupply}</span>
        </div>
      </Card> */}
      <h1>Card TOKEN INFO</h1>
    </S.Container>
  );
};

export default MiddleDetailInfo;
