import { AuthBindings } from '@refinedev/core';
import { ethers } from 'ethers';
import { getBalance } from './utils';
import { TOKEN_KEY, axiosInstance } from './utils/axios';

export const authProvider: AuthBindings = {
  login: async () => {
    if (window.ethereum) {
      const message = await axiosInstance
        .get('/auth/message')
        .then((res) => res.data)
        .catch((err) => {
          throw new Error('Fail to get message to sign');
        });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);

      const login = await axiosInstance
        .post('/auth/login', {
          signature,
          walletAddress: await signer.getAddress(),
          message,
        })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error('Fail to login');
        });

      console.log(login);

      localStorage.setItem(TOKEN_KEY, JSON.stringify(login));

      return {
        success: true,
        redirectTo: '/',
      };
    } else {
      return {
        success: false,
        error: new Error(
          'Not set ethereum wallet or invalid. You need to install Metamask'
        ),
      };
    }
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);

    const provider = window.ethereum;
    if (provider && provider.close) {
      await provider.close();
    }

    return {
      success: true,
      redirectTo: '/login',
    };
  },
  onError: async (error) => {
    console.log('onError', error);

    if (error?.statusCode === 401) {
      localStorage.removeItem(TOKEN_KEY);
      return {
        redirectTo: '/login',
        success: false,
      };
    }

    return {
      success: false,
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: '/login',
      logout: true,
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const authData = localStorage.getItem(TOKEN_KEY);
    if (!authData) {
      return null;
    }

    const user = JSON.parse(authData)?.user;

    const balance = await getBalance(user.walletAddress);

    return {
      authData,
      balance,
    };
  },
};
