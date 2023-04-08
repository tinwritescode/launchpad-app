import { ethers } from "ethers";
import { AuthBindings } from "@refinedev/core";
import { TOKEN_KEY, axiosInstance } from "./utils/axios";
import { getBalance } from "./utils";

export const authProvider: AuthBindings = {
  login: async () => {
    if (window.ethereum) {
      const message = await axiosInstance
        .get("/auth/message")
        .then((res) => res.data)
        .catch((err) => {
          throw new Error("Fail to get message to sign");
        });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);

      const login = await axiosInstance
        .post("/auth/login", {
          signature,
          walletAddress: await signer.getAddress(),
          message,
        })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error("Fail to login");
        });

      console.log(login);

      localStorage.setItem(TOKEN_KEY, JSON.stringify(login));

      return {
        success: true,
        redirectTo: "/",
      };
    } else {
      return {
        success: false,
        error: new Error(
          "Not set ethereum wallet or invalid. You need to install Metamask"
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
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
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
      redirectTo: "/login",
      logout: true,
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const address = localStorage.getItem(TOKEN_KEY);
    if (!address) {
      return null;
    }

    const balance = await getBalance(address);

    return {
      address,
      balance,
    };
  },
};
