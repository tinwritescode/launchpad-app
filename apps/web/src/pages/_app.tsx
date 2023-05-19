import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import type { AppType } from "next/app";
import NextNProgress from "nextjs-progressbar";
import React from "react";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import "~/styles/globals.css";
import { api } from "~/utils/api";
import { Providers } from "../components/providers";
import { theme } from "../utils/theme";
import { wagmiClient } from "../utils/wagmi";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
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
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);
