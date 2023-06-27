import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useLogin } from "@refinedev/core";
import { Button, Col, Layout, Row, Space } from "antd";
import { useAccount, useDisconnect } from "wagmi";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin();
  const { isConnected } = useAccount({
    onConnect: ({ address, isReconnected }) => {
      if (!isReconnected) login({ email: address, password: address });
    },
  });
  const { disconnect } = useDisconnect();

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
            {isConnected ? (
              <div
                style={{
                  display: "flex",
                  gap: "0.25rem",
                }}
              >
                <Button
                  type="primary"
                  onClick={() => login({})}
                  size="large"
                  style={{
                    flex: "1",
                  }}
                >
                  Continue
                </Button>
                <Button
                  onClick={() => disconnect()}
                  size="large"
                  style={{
                    flex: "1",
                  }}
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <ConnectButton />
            )}
          </Space>
        </Col>
      </Row>
    </Layout>
  );
};
