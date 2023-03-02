import { Web3Modal } from "@web3modal/react";
import React from "react";
import { WagmiConfig } from "wagmi";
import { env } from "../../env.mjs";
import { ethereumClient, wagmiClient } from "../../utils/wagmi";

type Props = {
  children: React.ReactNode;
};

function WagmiProvider({ children }: Props) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>

      <Web3Modal
        ethereumClient={ethereumClient}
        projectId={env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}
      />
    </>
  );
}

export default WagmiProvider;
