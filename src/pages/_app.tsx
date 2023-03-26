import type { AppType } from "next/app";
import NextNProgress from "nextjs-progressbar";
import "antd/dist/reset.css";
import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Providers } from "../components/providers";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={inter.className}>
      <Providers>
        <NextNProgress />
        <Component {...pageProps} />
      </Providers>
    </div>
  );
};

export default api.withTRPC(MyApp);
