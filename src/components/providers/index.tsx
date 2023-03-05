import React from "react";
import WagmiProvider from "./WagmiProvider";

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return <WagmiProvider>{children}</WagmiProvider>;
};
