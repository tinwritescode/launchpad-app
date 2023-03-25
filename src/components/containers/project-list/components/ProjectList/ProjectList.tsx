import * as S from "./ProjectList.style";
import { Button, Col, Modal, Row, Table } from "antd";
interface Props {}
import { api } from "~/utils/api";
import { Create } from "../../../create-ido";
import { create } from "zustand";

const projectListStore = create<{ open: boolean; toggleModal: () => void }>(
  (set) => ({
    open: false,
    toggleModal: () => set((state) => ({ open: !state.open })),
  })
);

const ProjectList: React.FC<Props> = () => {
  const columns = [
    {
      title: "PROJECT NAME",
      dataIndex: "project",
      key: "project",
      render: (project: {
        name: string;
        pricePerToken: number;
        tokenSymbol: string;
        img: string;
        link: string;
      }) => <S.ProjectInfo item={project} />,
    },
    {
      title: "CHAIN",
      dataIndex: "chain",
      key: "chain",
      render: (imageUrl: string) => (
        <S.StyledChainImage src={imageUrl}></S.StyledChainImage>
      ),
    },
    {
      title: "END IN",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "TOTAL RAISE",
      dataIndex: "totalRaise",
      key: "totalRaise",
    },
    {
      title: "PROGRESS",
      dataIndex: "progress",
      key: "progress",
      render: (text: string) => <a href="http://localhost:3000/">{text}</a>,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (text: string) => <a href="http://localhost:3000/">{text}</a>,
    },
  ];
  const { data, isLoading, error } = api.project.getAll.useQuery({
    offset: 0,
    limit: 10,
  });
  const pricePerToken = 100;
  const tokenSymbol = "ETH";
  const endTime = new Date().toLocaleDateString();
  const totalRaise = "1000 ETH";
  const progress = "50%";

  const { open, toggleModal } = projectListStore();

  // create modal

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }
  return (
    <S.Container>
      <S.UserInfoCard
        name="User Name"
        role="User Role"
        description="User Description"
        img="https://picsum.photos/200/300"
        link="http://localhost:3000/"
      />
      <Modal
        title="Create IDO"
        open={open}
        onCancel={toggleModal}
        footer={null}
        width={1000}
      >
        <Create />
      </Modal>
      <S.TopAction>
        <Button onClick={toggleModal}>Create IDO</Button>
      </S.TopAction>
      <Table
        dataSource={data?.map((project, index) => {
          return {
            key: index + "",
            project: {
              name: project.name,
              pricePerToken,
              tokenSymbol,
              img: project.image,
              link: "http://localhost:3000/",
            },
            chain: "https://picsum.photos/200/300",
            endTime,
            totalRaise,
            progress,
            status: "Active",
          };
        })}
        columns={columns}
      />
    </S.Container>
  );
};

export default ProjectList;
