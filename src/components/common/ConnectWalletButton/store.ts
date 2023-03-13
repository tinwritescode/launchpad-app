import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { Web3ReactHooks } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { create } from "zustand";
import { hooks, metaMask } from "./connectors/metamask";

export type SupportedWallets = MetaMask | CoinbaseWallet;

type Web3React = {
  connector: SupportedWallets;
  hooks: Web3ReactHooks;
  setConnector: (connector: SupportedWallets) => void;
  setHooks: (hooks: Web3ReactHooks) => void;
};

export const useWeb3App = create<Web3React>((set, get) => ({
  connector: metaMask,
  hooks: hooks,
  setConnector: (connector: SupportedWallets) => set(() => ({ connector })),
  setHooks: (hooks: Web3ReactHooks) => set(() => ({ hooks })),
}));
