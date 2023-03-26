import { Button } from "@mui/material";
import { Modal, Space } from "antd";
import { useCallback, useState } from "react";
import { formatWalletAddress } from "../../../utils/ethereum";
import AppButton from "../AppButton";
import ConnectWalletButton from "../ConnectWalletButton";
import * as coinbase from "../ConnectWalletButton/connectors/coinbaseWallet";
import { hooks, metaMask } from "../ConnectWalletButton/connectors/metamask";
import LoginButton from "../LoginButton";
import { useSession } from "../LoginButton/lib";
import * as S from "./LoginModal.style";

type Props = {};

export function LoginModal({}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useSession();

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const hideModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <S.Container>
      <AppButton variant="contained" onClick={showModal}>
        {!!data?.isLoggedIn
          ? `Welcome ${formatWalletAddress(data?.address)}`
          : "Login"}
      </AppButton>
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
              disabled={!!data?.isLoggedIn}
            />

            <ConnectWalletButton
              connector={coinbase.coinbaseWallet}
              text="Connect with Coinbase Wallet"
              hooks={coinbase.hooks}
              size="large"
              disabled={!!data?.isLoggedIn}
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
            variant="contained"
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
  );
}
