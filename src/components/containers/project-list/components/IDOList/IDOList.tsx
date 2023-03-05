import React,{useState} from "react";
import * as S from "./IDOList.style";
import type { TabsProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};

const navItems: TabsProps['items'] = [
  {
    key: '1',
    label: `Tab 1`,
    children: `Content of Tab Pane 1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
  },
  {
    key: '2',
    label: `Tab 2`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: '3',
    label: `Tab 3`,
    children: `Content of Tab 3`,
  },
];

interface Props {}

const IDOList: React.FC<Props> = () => {

  const [open, setOpen] = useState(false);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '3') {
      setOpen(false);
    }
  };

  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };

  const items: MenuProps['items'] = [
    {
      label: 'Clicking me will not close the menu.',
      key: '1',
    },
    {
      label: 'Clicking me will not close the menu also.',
      key: '2',
    },
    {
      label: 'Clicking me will close the menu.',
      key: '3',
    },
  ];
  return <S.Container>
    <S.NavContainer>
      <S.NavTabItem>    
        <S.StyledTabs defaultActiveKey="1" items={navItems} onChange={onChange} />
      </S.NavTabItem>
        <S.NavDropDownItem>
          <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      onOpenChange={handleOpenChange}
      open={open}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Hover me
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
        </S.NavDropDownItem>
    </S.NavContainer>
  </S.Container>;
};

export default IDOList;
