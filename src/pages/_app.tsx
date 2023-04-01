import { ThemeProvider } from "@mui/material";
import type { AppType } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";
import { api } from "~/utils/api";
import { Providers } from "../components/providers";
import { theme } from "../utils/theme";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Toaster position="bottom-right" />
      <NextNProgress />
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
