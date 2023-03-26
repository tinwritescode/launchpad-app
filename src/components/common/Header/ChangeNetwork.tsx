import { ExternalProvider } from "@ethersproject/providers";
import { Alert, Button } from "antd";
import { env } from "../../../env.mjs";
import { switchNetwork } from "../../../utils/ethereum";
import { useWeb3Hooks } from "../ConnectWalletButton/store";
import style from "./Header.module.scss";

export const ChangeNetwork = () => {
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
