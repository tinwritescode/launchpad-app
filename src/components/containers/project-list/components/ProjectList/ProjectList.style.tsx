import styled from 'styled-components';
import { DownOutlined } from '@ant-design/icons';
import { Tabs, Dropdown, Menu, Avatar } from 'antd';
import { Col, Row, Card } from 'antd';

type CustomUserInfoCardProps = {
  name: string;
  role: string;
  description: string;
  img: string;
  link: string;
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
export const UserInfoCard = (props: CustomUserInfoCardProps) => {
  return (
    <Card style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', width: '100%' }}>
      <Row>
        <Col span={8}>
          <div style={{ padding: '0 0 0 50px' }}>
            <Avatar size={120} src={props.img} shape='circle' />
          </div>
        </Col>
        <Col span={8}>
          <p>name:</p>
          <p>role:</p>
          <p>description:</p>
        </Col>
        <Col span={8}>
          <p>{props.name}</p>
          <p>{props.role}</p>
          <p>{props.description}</p>
        </Col>
      </Row>
    </Card>
  );
};

//custom Dropdown antd component

export const ProjectInfo = function ({ item }: CustomProjectInfoProps) {
  return (
    <a href={item.link}>
      <div style={{ display: 'flex', color: 'black', alignItems: 'center' }}>
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
export const Container = styled.div`
  margin: 30px auto;
`;

export const StyledChainImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: 15px;
`;

// custom Tabs antd component
