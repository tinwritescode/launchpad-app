import React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { api } from "~/utils/api";
import { Project, ScheduleRound, TokenomicsItem } from "@prisma/client";

//import { Anchor, Table, Col, Row, Card } from "antd";
import * as S from "./ProjectSummary.style";
// const Pie = dynamic(() => import("@ant-design/charts").then((mod) => mod.Pie), {
//   ssr: false,
// });

interface Props {}

type Column = {
  title: string;
  dataIndex: string;
  key: string;
  align?: "left" | "right" | "center";
  render?: (text: string) => string;
};

const scheduleColumn: Column[] = [
  {
    title: "Round",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Opens",
    dataIndex: "startTime",
    key: "startTime",
    render: (text: string) => new Date(text).toLocaleString(),
  },
  {
    title: "Closes",
    dataIndex: "endTime",
    key: "endTime",
    render: (text: string) => new Date(text).toLocaleString(),
  },
];

const sortScheduleRounds = (rounds: ScheduleRound[]) =>
  rounds.sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

const ProjectSummary: React.FC<Props> = () => {
  const { id } = useRouter().query as { id: string };
  const { data, isLoading } = api.project.getOne.useQuery({ id });

  const project = data as Project;
  const scheduleRounds = data?.ScheduleRound as ScheduleRound[];
  const tokenomicsItems = data?.TokenomicsItem as TokenomicsItem[];

  return (
    // <S.Container>
    //   <Row>
    //     <Col span={8}>
    //       <Card>
    //         <Anchor>
    //           <Anchor.Link href="#prjSummary" title="Project Summary" />
    //           <Anchor.Link href="#prjSchedule" title="Schedule" />
    //           <Anchor.Link href="#prjComparision" title="Comparision" />
    //           <Anchor.Link href="#prjTokenomics" title="Tokenomics" />
    //           <Anchor.Link href="#prjRoadmap" title="Roadmap" />
    //         </Anchor>
    //       </Card>
    //     </Col>

    //     <Col span={16}>
    //       <div id="prjSummary">
    //         <h1>Project Summary</h1>
    //         <p>{project?.summaryContent}</p>
    //         <video controls width={500}>
    //           <source src={project?.videoURL} type="video/mp4" />
    //         </video>
    //       </div>

    //       <div id="prjSchedule">
    //         <h1>Schedule</h1>
    //         <Table
    //           dataSource={sortScheduleRounds(scheduleRounds ?? [])}
    //           columns={scheduleColumn}
    //           pagination={false}
    //         />
    //       </div>

    //       <div id="prjComparision">
    //         <h1>Comparision</h1>
    //         <p>{project?.comparisionContent}</p>
    //       </div>

    //       <div id="prjTokenomics">
    //         <h1>Tokenomics</h1>
    //         <Pie
    //           data={tokenomicsItems}
    //           angleField="value"
    //           colorField="name"
    //           appendPadding={10}
    //           radius={0.8}
    //           label={{
    //             type: "outer",
    //             content: "{name} {value}%",
    //           }}
    //           interactions={[
    //             {
    //               type: "pie-legend-active",
    //             },
    //             {
    //               type: "element-active",
    //             },
    //           ]}
    //         />
    //       </div>

    //       <div id="prjRoadmap">
    //         <h1>Roadmap</h1>
    //         <p>{project?.roadmapContent}</p>
    //       </div>
    //     </Col>
    //   </Row>
    // </S.Container>
    <h1>pie chart</h1>
  );
};

export default ProjectSummary;
