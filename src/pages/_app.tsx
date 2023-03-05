import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Providers } from "../components/providers";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Providers>
      <Component {...pageProps} />;
    </Providers>
  );
};

export default api.withTRPC(MyApp);
