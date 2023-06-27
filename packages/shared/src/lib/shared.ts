import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createConfig } from "wagmi";
import { localhost, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [polygonMumbai, localhost],
  [publicProvider()]
);

export { chains };

const { connectors } = getDefaultWallets({
  appName: "Strawberry launchpad",
  projectId: "8b0aa9185002193d92eb304bcc8c6c4a",
  chains,
});

export const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
