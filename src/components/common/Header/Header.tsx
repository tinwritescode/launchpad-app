import { Button, Layout, Modal, Space } from "antd";
import Link from "next/link";
import { useCallback, useState } from "react";
import { formatWalletAddress } from "../../../utils/ethereum";
import ConnectWalletButton from "../ConnectWalletButton";
import * as coinbase from "../ConnectWalletButton/connectors/coinbaseWallet";
import { hooks, metaMask } from "../ConnectWalletButton/connectors/metamask";
import LoginButton from "../LoginButton";
import { useSession } from "../LoginButton/lib";
import style from "./Header.module.scss";
import * as S from "./Header.style";

type Props = {};

function Header({}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useSession();

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const hideModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <Layout.Header className={style.header}>
      <S.Container>
        <Link href="/">
          <S.Heading>Home</S.Heading>
        </Link>

        <Button type="primary" onClick={showModal}>
          {!!data?.isLoggedIn
            ? `Welcome ${formatWalletAddress(data?.address)}`
            : "Login"}
        </Button>
        <Modal
          title="Login"
          open={isModalOpen}
          footer={null}
          onCancel={hideModal}
        >
          <div>
            <h4>Step 1</h4>
            <Space
              direction="vertical"
              align="center"
              style={{
                width: "100%",
                alignItems: "stretch",
              }}
            >
              <ConnectWalletButton
                connector={metaMask}
                hooks={hooks}
                text="Connect with MetaMask"
                size="large"
                style={{
                  backgroundColor: "#E8831D",
                  color: "#fff",
                  width: "100%",
                }}
              />

              <ConnectWalletButton
                connector={coinbase.coinbaseWallet}
                text="Connect with Coinbase Wallet"
                hooks={coinbase.hooks}
                size="large"
                style={{
                  backgroundColor: "#1A1A1A",
                  color: "#fff",
                  width: "100%",
                }}
              />
            </Space>
          </div>
          <div>
            <h4>Step 2</h4>
            <LoginButton />
          </div>

          <div>
            <h4>Step 3</h4>
            <Button
              type="primary"
              disabled={!data?.isLoggedIn}
              onClick={hideModal}
              style={{ width: "100%" }}
              size="large"
            >
              Go to your profile
            </Button>
          </div>
        </Modal>
      </S.Container>
    </Layout.Header>
  );
}

export default Header;
