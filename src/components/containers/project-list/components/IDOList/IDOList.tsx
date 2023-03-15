import React, { useEffect, useState, useMemo } from 'react';
import * as S from './IDOList.style';
import type { TabsProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Space, Menu, Dropdown, Table } from 'antd';
import { api } from '~/utils/api';

const navItems: TabsProps['items'] = [
  {
    key: '1',
    label: `OPEN IGO`,
  },
  {
    key: '2',
    label: `UPCOMING`,
  },
  {
    key: '3',
    label: `PAST IGO`,
  },
];

interface Props {}

const IDOList: React.FC<Props> = () => {
  const menuItems1 = [
    { key: '1', label: 'Item 1', link: 'http://localhost:3000/' },
    { key: '2', label: 'Item 2', link: 'http://localhost:3000/' },
    { key: '3', label: 'Item 3', link: 'http://localhost:3000/' },
  ];
  const menuItems2 = [
    { key: '4', label: 'Item 5', link: 'http://localhost:3000/' },
    { key: '5', label: 'Item 6', link: 'http://localhost:3000/' },
    { key: '6', label: 'Item 7', link: 'http://localhost:3000/' },
  ];

  interface Row {
    key: string;
    project: {
      name: string;
      pricePerToken: number;
      tokenSymbol: string;
      img: string;
      link: string;
    };
    chain: string;
    endTime: string;
    totalRaise: number;
    progress: string;
  }
  interface Response {
    id: string;
    name: string;
    image: string;
    pricePerToken: number;
    Chain: { id: string; image: string; name: string };
    endTime: Date;
    totalRaise: number;
    progress: string;
  }

  const [status, setStatus] = useState<
    'ACTIVE' | 'INACTIVE' | 'DELETED' | undefined
  >('ACTIVE');
  const { data, isLoading, error, refetch } = api.project.getAll.useQuery({
    status,
    offset: 0,
    limit: 10,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }

  const onChange = (key: string) => {
    setStatus(key === '1' ? 'ACTIVE' : key === '2' ? 'INACTIVE' : 'DELETED');
    refetch();
  };
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
  ];

  return (
    <div>
      <S.Container>
        <S.NavContainer>
          <S.NavTabItem>
            <S.StyledTabs
              defaultActiveKey='1'
              items={navItems}
              onChange={onChange}
            />
          </S.NavTabItem>
          <S.NavDropDownItem>
            <S.MyDropdown name='All Access' items={menuItems1} />
            <S.MyDropdown name='All Block Chain' items={menuItems2} />
          </S.NavDropDownItem>
        </S.NavContainer>
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
            };
          })}
          columns={columns}
        />
      </S.Container>
    </div>
  );
};

export default IDOList;
