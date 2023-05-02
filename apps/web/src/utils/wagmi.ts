import { InjectedConnector } from "wagmi/connectors/injected";
import { configureChains, createClient, mainnet } from "wagmi";
import { localhost, polygonMumbai } from "wagmi/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";
import { env } from "../env.mjs";

const getWagmiChain = () => {
  switch (env.NEXT_PUBLIC_CHAIN_ID) {
    case "0x1": {
      return mainnet;
    }
    case "0x539": {
      return localhost;
    }
    case "0x13881": {
      return polygonMumbai;
    }
    default: {
      return localhost;
    }
  }
};
const { chains, provider, webSocketProvider } = configureChains(
  [getWagmiChain()],
  [publicProvider()]
);

// Set up client
export const wagmiClient: any = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});
