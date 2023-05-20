import { ThemeProvider } from '@mui/material';
import type { AppType } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { Toaster } from 'react-hot-toast';
import { wagmiClient } from 'shared';
import { WagmiConfig } from 'wagmi';
import { Providers } from '../components/providers';
import '../styles/globals.css';
import { api } from '../utils/api';
import { theme } from '../utils/theme';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig config={wagmiClient}>
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
