import { create } from "zustand";
import ethers from "ethers";

type ConnectWalletButtonStore = {
  state: "idle" | "loading" | "error";
  connectWallet: () => void;
  disconnectWallet: () => void;
};

export const useConnectWalletButtonStore = create<ConnectWalletButtonStore>(
  (set) => ({
    // intial state only
    state: "idle",

    // functions
    connectWallet: () => {
      set({ state: "loading" });

      set({ state: "idle" });
    },
    disconnectWallet: () => {
      set({ state: "loading" });
      // Disconnect wallet logic
      set({ state: "idle" });
    },
  })
);
