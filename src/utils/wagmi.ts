import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { env } from "../env.mjs";

const chains = [arbitrum, mainnet, polygon];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({
    projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  }),
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    version: "2", // or "2"
    appName: "web3Modal",
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
export const ethereumClient = new EthereumClient(wagmiClient, chains);
