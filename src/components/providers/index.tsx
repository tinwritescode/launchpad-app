import React from "react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Mumbai } from "@thirdweb-dev/chains";

const activeChainId = ChainId.Goerli;

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return <ThirdwebProvider activeChain={Mumbai}>{children}</ThirdwebProvider>;
};
