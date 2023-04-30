import { useLogin } from "@refinedev/core";
import { Alert, Button, Col, Layout, Row, Space } from "antd";
import { useConnect } from "wagmi";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin();
  const { connectAsync, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <Layout
      style={{
        background: `radial-gradient(50% 50% at 50% 50%, #63386A 0%, #310438 100%)`,
        backgroundSize: "cover",
      }}
    >
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Col xs={22}>
          <Space
            direction="vertical"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {connectors.map((connector) => (
              <Button
                size="large"
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => {
                  connectAsync({ connector }).finally(() => login({}));
                }}
              >
                {connector.name}
                {!connector.ready && " (unsupported)"}
                {isLoading &&
                  connector.id === pendingConnector?.id &&
                  " (connecting)"}
              </Button>
            ))}
          </Space>
        </Col>
      </Row>
    </Layout>
  );
};
