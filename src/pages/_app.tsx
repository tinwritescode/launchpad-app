import { type AppType } from "next/app";
import NextNProgress from "nextjs-progressbar";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Providers } from "../components/providers";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Providers>
      <NextNProgress />
      <Component {...pageProps} />
    </Providers>
  );
};

export default api.withTRPC(MyApp);
