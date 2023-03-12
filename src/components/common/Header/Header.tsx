import { ConnectWallet, useConnect } from "@thirdweb-dev/react";
import { Button, Layout, Modal } from "antd";
import Link from "next/link";
import { useCallback, useState } from "react";
import LoginButton from "../ConnectWalletButton";
import style from "./Header.module.scss";
import * as S from "./Header.style";

type Props = {};

function Header({}: Props) {
  const [data] = useConnect();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          Open Modal
        </Button>
        <Modal
          title="Login"
          open={isModalOpen}
          footer={null}
          onCancel={hideModal}
        >
          <div>
            <h4>Step 1</h4>
            <ConnectWallet />
          </div>
          <div>
            <h4>Step 2</h4>
            <LoginButton />
          </div>
        </Modal>
      </S.Container>
    </Layout.Header>
  );
}

export default Header;
