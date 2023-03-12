import React, { useEffect, useState } from 'react';
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
  const dataSource2 = [
    {
      key: '1',
      project: {
        name: 'John Brown',
        pricePerToken: 100,
        tokenSymbol: 'PSC',
        img: 'https://picsum.photos/200/300',
        link: 'http://localhost:3000/',
      },
      chain: 'https://picsum.photos/200/300',
      endTime: '0D 12H 15M 58S',
      totalRaise: 32,
      progress: '56%',
    },
    {
      key: '2',
      project: {
        name: 'John Brown',
        pricePerToken: 100,
        tokenSymbol: 'PSC',
        img: 'https://picsum.photos/200/300',
        link: 'http://localhost:3000/',
      },
      chain: 'https://picsum.photos/200/300',
      endTime: '0D 12H 15M 58S',
      totalRaise: 32,
      progress: '56%',
    },
  ];

  const dataSource1 = [
    {
      key: '1',
      project: {
        name: 'John Brown',
        pricePerToken: 100,
        tokenSymbol: 'PSC',
        img: 'https://picsum.photos/200/300',
        link: 'http://localhost:3000/',
      },
      chain: 'https://picsum.photos/200/300',
      endTime: '0D 12H 15M 58S',
      totalRaise: 32,
      progress: '56%',
    },
    {
      key: '2',
      project: {
        name: 'John Brown',
        pricePerToken: 100,
        tokenSymbol: 'PSC',
        img: 'https://picsum.photos/200/300',
        link: 'http://localhost:3000/',
      },
      chain: 'https://picsum.photos/200/300',
      endTime: '0D 12H 15M 58S',
      totalRaise: 32,
      progress: '56%',
    },
    {
      key: '3',
      project: {
        name: 'John Brown',
        pricePerToken: 100,
        tokenSymbol: 'PSC',
        img: 'https://picsum.photos/200/300',
        link: 'http://localhost:3000/',
      },
      chain: 'https://picsum.photos/200/300',
      endTime: '0D 12H 15M 58S',
      totalRaise: 32,
      progress: '56%',
    },
    {
      key: '3',
      project: {
        name: 'John Brown',
        pricePerToken: 100,
        tokenSymbol: 'PSC',
        img: 'https://picsum.photos/200/300',
        link: 'http://localhost:3000/',
      },
      chain: 'https://picsum.photos/200/300',
      endTime: '0D 12H 15M 58S',
      totalRaise: 32,
      progress: '56%',
    },
    {
      key: '3',
      project: {
        name: 'John Brown',
        pricePerToken: 100,
        tokenSymbol: 'PSC',
        img: 'https://picsum.photos/200/300',
        link: 'http://localhost:3000/',
      },
      chain: 'https://picsum.photos/200/300',
      endTime: '0D 12H 15M 58S',
      totalRaise: 32,
      progress: '56%',
    },
  ];

  const [dataSource, setDataSource] = useState<
    {
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
    }[]
  >(dataSource1);

  const { data, isLoading } = api.project.getAll.useQuery({
    offset: 0,
    limit: 10,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  //(data as any).map((item: any) => {});

  const onChange = (key: string) => {
    if (key === '1') {
      setDataSource(dataSource1);
    }
    if (key === '2') {
      setDataSource(dataSource2);
    }
    if (key === '3') {
      setDataSource(dataSource1);
    }
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
      <div>{JSON.stringify(data)}</div>
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
        <Table dataSource={dataSource} columns={columns} />
      </S.Container>
    </div>
  );
};

export default IDOList;
