import { Button } from "@mui/material";
import { Project, ScheduleRound } from "@prisma/client";
import { Card, Col, Progress, Row, Space } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
import * as S from "./TopDetailInfo.style";

interface Props {}

const TopDetailInfo: React.FC<Props> = () => {
  const { id } = useRouter().query as { id: string };
  const { data, isLoading } = api.project.getOne.useQuery({ id });
  const project = data as Project;
  const scheduleRounds = data?.ScheduleRound as ScheduleRound[];
  const currentRound = scheduleRounds?.find(
    (round) => round.startTime < new Date() && round.endTime > new Date()
  );
  const elapsedTime: number = currentRound
    ? new Date().getTime() - new Date(currentRound.startTime).getTime()
    : 0;

  return (
    <S.Container>
      <Card>
        <Row>
          <Col span={10}>
            <Row>
              <Space>
                <img src={project?.image} width={150} height={150} />
                <Col>
                  <h1>{project?.name}</h1>
                  <div>PRICE (DDO) = {currentRound?.pricePerToken} BUSD</div>
                </Col>
              </Space>
            </Row>
          </Col>
          <Col span={4}>
            <img
              src="https://www.iconarchive.com/download/i109534/cjdowner/cryptocurrency-flat/Ethereum-ETH.1024.png"
              width={50}
              height={50}
            />
          </Col>
          <Col span={10}>
            {elapsedTime > 0 ? (
              <>
                <p>Sale ends in</p>
                <h1>1d 2h 3m 4s</h1>
              </>
            ) : (
              <p>Sale has ended</p>
            )}
          </Col>
        </Row>
        <Row>
          <Col span={10}>Total raise: 10000 BUSD 15%</Col>
          <Col span={4}>Allocation: 10000 BUSD Max</Col>
          <Col span={10}>Targeted raise: 100000 BUSD</Col>
        </Row>
        <Progress
          percent={50}
          strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
        />
        <Row>
          <Col span={10}>
            <Button variant="contained">Claim token</Button>
          </Col>
          <Col span={4}>Participants 100 / 1000</Col>
          <Col span={10}>Share this project</Col>
        </Row>
      </Card>
    </S.Container>
  );
};

export default TopDetailInfo;
