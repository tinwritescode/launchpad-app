import styled from "styled-components";
import { DownOutlined } from "@ant-design/icons";
import { Tabs, Dropdown, Menu } from "antd";

export const Container = styled.div`
  margin: 0 auto;
`;

export const NavContainer = styled.div`
  display: flex;
  padding-bottom: 20px;
  justify-content: space-between;
`;

export const NavTabItem = styled.div`
  min-wigdth: 50%;
`;

export const NavDropDownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

type CustomComponentProps = {
  name: string;
  items: {
    key: string;
    label: string;
    link: string;
  }[];
};

//custom Dropdown antd component
export const MyDropdown = function ({ name, items }: CustomComponentProps) {
  const menu = (
    <Menu>
      {items.map((item) => (
        <Menu.Item key={item.key}>
          <a href={item.link}>{item.label}</a>
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <a href="#">
        {name} <DownOutlined />
      </a>
    </Dropdown>
  );
};

type CustomProjectInfoProps = {
  item: {
    name: string;
    pricePerToken: number;
    tokenSymbol: string;
    img: string;
    link: string;
  };
};

export const ProjectInfo = function ({ item }: CustomProjectInfoProps) {
  return (
    <a href={item.link}>
      <div style={{ display: "flex", color: "black", alignItems: "center" }}>
        <StyledImage src={item.img} />
        <div>
          <p>{item.name}</p>
          <p>{`Price(${item.tokenSymbol}) : ${item.pricePerToken} BUSD`}</p>
        </div>
      </div>
    </a>
  );
};
const StyledImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;
export const StyledChainImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: 15px;
`;

// custom Tabs antd component
export const StyledTabs = styled(Tabs)`
.ant-tabs-nav {
    margin: 0;
    padding: 0;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    // background-color: #fff;
    // border-radius: 10px;
    // box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    .ant-tabs-tab {
        margin: 10px;
        padding: 10px 0px 25px 0px;
        height: 100%;
        display: flex;
        justify-content: center;
        font-size: 14px;
        font-weight: 500;
        color: #000;
        border: none;
        background-color: #fff;
        &:hover {
            color: #000;
            background-color: #fff;
        }
    `;
