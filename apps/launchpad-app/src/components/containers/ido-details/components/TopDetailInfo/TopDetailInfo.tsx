import React from "react";
import { Button, Progress } from "antd";

import * as S from "./TopDetailInfo.style";
import { ProjectOverview } from "../../lib/types";

interface Props {}

const TopDetailInfo: React.FC<Props> = () => {
  const projectOverview: ProjectOverview = {
    name: "ABC",
    tokenSymbol: "https://via.placeholder.com/150",
    pricePerToken: 0.1,
    currency: "BUSD",
    totalRaise: 1000,
    targetRaise: 10000,
    allocation: 100,
    startTime: new Date("2021-01-01"),
    endTime: new Date("2021-02-01"),
    participants: 100,
    targetParticipants: 1000,
  };

  return (
    <S.Container>
      <div>
        <img src={projectOverview.tokenSymbol} width={150} height={150} />
        <div>{projectOverview.name}</div>
        <div>PRICE (DDO) = {projectOverview.pricePerToken} BUSD</div>
        <img
          src="https://www.iconarchive.com/download/i109534/cjdowner/cryptocurrency-flat/Ethereum-ETH.1024.png"
          width={50}
          height={50}
        />
        <div>Total raise: {projectOverview.totalRaise} (x)%</div>
        <div>Allocation: {projectOverview.targetRaise}</div>
        <Progress
          percent={projectOverview.totalRaise / projectOverview.targetRaise}
        />
        <Button type="primary">Claim token</Button>
        <div>
          Participants {projectOverview.participants} /{" "}
          {projectOverview.targetParticipants}
        </div>
      </div>
    </S.Container>
  );
};

export default TopDetailInfo;
