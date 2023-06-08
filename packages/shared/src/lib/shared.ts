import { localhost, polygonMumbai } from "viem/chains";
import { configureChains, createConfig } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [polygonMumbai, localhost],
  [publicProvider()]
);

// Set up client
export const wagmiClient = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
  ],
  publicClient,
});
