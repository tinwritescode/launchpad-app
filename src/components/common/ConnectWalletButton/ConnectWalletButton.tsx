import { Button } from "antd";
import React from "react";

import * as S from "./ConnectWalletButton.style";
import { hooks, metaMask } from "./connectors/metamask";

interface Props {}

const { useIsActive, useIsActivating } = hooks;
const { activate, deactivate, resetState } = metaMask;

const ConnectWalletButton: React.FC<Props> = () => {
  const isActive = useIsActive();
  const isActivating = useIsActivating();

  return (
    <Button
      onClick={() => {
        if (isActive) {
          console.log("deactivate", deactivate);
          if (metaMask?.deactivate) {
            metaMask.deactivate();
          } else {
            metaMask.resetState();
          }
          return;
        }
        metaMask.activate({
          chainId: 80001,
          chainName: "Mumbai Testnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
        });
      }}
      style={{ width: "100%" }}
      loading={isActivating}
    >
      {isActive ? "Disconnect" : "Connect"}
    </Button>
  );
};

export default ConnectWalletButton;
