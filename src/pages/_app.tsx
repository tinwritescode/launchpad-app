import { ThemeProvider } from "@mui/material";
import "antd/dist/reset.css";
import type { AppType } from "next/app";
import { Inter } from "next/font/google";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";
import { api } from "~/utils/api";
import { Providers } from "../components/providers";
import { theme } from "../utils/theme";

// If loading a variable font, you don't need to specify the font weight
export const inter = Inter({ subsets: ["latin"] });

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
