import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppType } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { Toaster } from 'react-hot-toast';
import { wagmiClient } from 'shared';
import { WagmiConfig } from 'wagmi';
import { Providers } from '../components/providers';
import { api } from '../utils/api';
import { theme } from '../utils/theme';
import '../styles/globals.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig config={wagmiClient}>
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
