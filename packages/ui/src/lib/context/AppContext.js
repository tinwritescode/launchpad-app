import React, { createContext, useState } from "react";
import { useAccount } from "wagmi";

export const AppContext = createContext();

const { ethereum } = typeof window !== "undefined" ? window : {};

const AppProvider = ({ children }) => {
  const [visibility, setVisibility] = useState(false);
  const [walletModalvisibility, setModalvisibility] = useState(false);
  const [shareModalVisibility, setShareModalvisibility] = useState(false);
  const [metamaskModalVisibility, setMetamaskModalVisibility] = useState(false);
  const [connectWalletModal, setConnectWalletModal] = useState(false);
  const { address: account } = useAccount();

  const isMetaMaskInstalled = () => {
    if (ethereum) {
      return true;
    }

    return false;
  };

  const isWalletConnected = () => {
    if (localStorage.getItem("isWalletConnected") === "true") {
      return true;
    }

    return false;
  };

  const mintModalHandle = () => {
    setVisibility(!visibility);
  };
  const walletModalHandle = () => {
    setModalvisibility(!walletModalvisibility);
  };
  const shareModalHandle = (e) => {
    e.preventDefault();
    setShareModalvisibility(!shareModalVisibility);
  };

  const metamaskModalHandle = () => {
    setMetamaskModalVisibility(!metamaskModalVisibility);
  };

  const connectWalletModalHanlde = () => {
    if (!isWalletConnected()) {
      setConnectWalletModal(!connectWalletModal);
    }
  };

  const isWalletAlreadyConnected = async () => {
    if (isWalletConnected()) {
      // const accounts = await connectWallet();
      // setAccount(accounts);
    }
  };

  const setAccountAfterDisconnectWallet = async () => {
    // setAccount("");
  };

  return (
    <AppContext.Provider
      value={{
        isWalletConnected,
        visibility,
        mintModalHandle,
        walletModalHandle,
        walletModalvisibility,
        shareModalVisibility,
        shareModalHandle,
        metamaskModalVisibility,
        metamaskModalHandle,
        account,
        connectWalletHandle: () => {
          console.log("hello");
        },
        isWalletAlreadyConnected,
        setAccountAfterDisconnectWallet,
        connectWalletModalHanlde,
        connectWalletModal,
        isMetaMaskInstalled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
