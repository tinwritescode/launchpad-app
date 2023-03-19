import { ExternalProvider } from "@ethersproject/providers";
import { Alert, Button, Layout, Space } from "antd";
import { env } from "../../../env.mjs";
import { switchNetwork } from "../../../utils/ethereum";
import { useWeb3Hooks } from "../ConnectWalletButton/store";
import { LoginModal } from "../LoginModal/LoginModal";
import style from "./Header.module.scss";

type Props = {};

function Header({}: Props) {
  return (
    <Space direction="vertical">
      <Layout.Header>
        <LoginModal />
      </Layout.Header>
      <ChangeNetwork />
    </Space>
  );
}

const ChangeNetwork = () => {
  const { useChainId, useProvider } = useWeb3Hooks();
  const chainId = useChainId();

  return (
    (chainId !== parseInt(env.NEXT_PUBLIC_CHAIN_ID, 16) && (
      <>
        <Alert
          message="You are not connected to the correct network."
          className={style.alert}
          action={
            <Button
              type="primary"
              onClick={() => {
                if (typeof window !== "undefined" && window.ethereum) {
                  const ethereum = window.ethereum as ExternalProvider;

                  switchNetwork(env.NEXT_PUBLIC_CHAIN_ID);
                }
              }}
            >
              Change network
            </Button>
          }
        />
      </>
    )) || <></>
  );
};

export default Header;
