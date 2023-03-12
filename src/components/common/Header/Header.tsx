import { Button, Layout, Modal } from "antd";
import Link from "next/link";
import { useCallback, useState } from "react";
import ConnectWalletButton from "../ConnectWalletButton";
import LoginButton from "../LoginButton";
import style from "./Header.module.scss";
import * as S from "./Header.style";

type Props = {};

function Header({}: Props) {
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
          Login wallet
        </Button>
        <Modal
          title="Login"
          open={isModalOpen}
          footer={null}
          onCancel={hideModal}
        >
          <div>
            <h4>Step 1</h4>

            <ConnectWalletButton />
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
