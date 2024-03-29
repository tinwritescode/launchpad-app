import { ThemeProvider } from "@mui/material";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { UiProvider } from "@strawberry/ui";
import type { AppType } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { chains, wagmiClient } from "shared";
import { WagmiConfig } from "wagmi";
import { Providers } from "../components/providers";
import "../styles/globals.css";
import { api } from "../utils/api";
import { theme } from "../utils/theme";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <WagmiConfig config={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <UiProvider>
          <ThemeProvider theme={theme}>
            <Head>
              <title>Strawberry Launchpad</title>
            </Head>
            <Toaster
              position="top-right"
              containerStyle={{
                top: 80,
              }}
            />
            <NextNProgress />
            <Providers>
              <Component {...pageProps} />
            </Providers>
          </ThemeProvider>
        </UiProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);
