import * as S from './ProjectList.style';
import { Col, Row, Table } from 'antd';
interface Props {}
import { api } from '~/utils/api';

const ProjectList: React.FC<Props> = () => {
  const columns = [
    {
      title: 'PROJECT NAME',
      dataIndex: 'project',
      key: 'project',
      render: (project: {
        name: string;
        pricePerToken: number;
        tokenSymbol: string;
        img: string;
        link: string;
      }) => <S.ProjectInfo item={project} />,
    },
    {
      title: 'CHAIN',
      dataIndex: 'chain',
      key: 'chain',
      render: (imageUrl: string) => (
        <S.StyledChainImage src={imageUrl}></S.StyledChainImage>
      ),
    },
    {
      title: 'END IN',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'TOTAL RAISE',
      dataIndex: 'totalRaise',
      key: 'totalRaise',
    },
    {
      title: 'PROGRESS',
      dataIndex: 'progress',
      key: 'progress',
      render: (text: string) => <a href='http://localhost:3000/'>{text}</a>,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => <a href='http://localhost:3000/'>{text}</a>,
    },
  ];
  const { data, isLoading, error } = api.project.getAll.useQuery({
    offset: 0,
    limit: 10,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }
  return (
    <>
      <S.UserInfoCard
        name='User Name'
        role='User Role'
        description='User Description'
        img='https://picsum.photos/200/300'
        link='http://localhost:3000/'
      />
      <Row>
        <S.Container>
          <Table
            dataSource={data?.map((project, index) => {
              return {
                key: index + '',
                project: {
                  name: project.name,
                  pricePerToken: project.pricePerToken,
                  tokenSymbol: project.Chain.name,
                  img: project.image,
                  link: 'http://localhost:3000/',
                },
                chain: project.Chain.image,
                endTime: project.endTime.toISOString(),
                totalRaise: project.totalRaise,
                progress: project.progress,
                status: 'Active',
              };
            })}
            columns={columns}
          />
        </S.Container>
      </Row>
    </>
  );
};

export default ProjectList;
