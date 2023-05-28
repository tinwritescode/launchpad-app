import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

import { Modal } from "react-bootstrap";
import { faClone, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import Image from "next/image";

const Wallet = ({ show, handleClose }) => {
  const [copied, setIsCopied] = useState(false);
  // const [isWalletDisconnect, setIsWalletDisconnect] = useState(false);
  const { connectAsync, connectors, isLoading, pendingConnector } =
    useConnect();
  const { isConnected, address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const {
    setAccountAfterDisconnectWallet,
    // isMetaMaskInstalled,
  } = useContext(AppContext);

  const disconnectWallet = async () => {
    setAccountAfterDisconnectWallet();
    localStorage.setItem("isWalletConnected", false);
  };

  // const connectMetamaskWallet = async () => {
  //   if (isMetaMaskInstalled()) {
  //     connectWalletHandle();
  //     localStorage.setItem("isWalletConnected", true);
  //   } else {
  //     window.open("https://metamask.io/download/", "_blank");
  //   }
  // };
  const walletImages = [
    {
      name: 'MetaMask',
      image: '/wallets/metamask.svg',
    },
    {
      name: 'Coinbase',
      image: '/wallets/coinbase.svg',
    },
  ];

  const copyToClipboard = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
    } catch (error) {
      console.error("Error copying text to clipboard:", error);
    }
  };

  return (
    <Modal className="wallet-modal" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Connect Your Wallet</Modal.Title>
      </Modal.Header>

      {isConnected && address ? (
        <div className="modal-body">
          <div> Already Connected</div>
          <div className="wallet-btns">
            <button
              className="default-btn default-btn--small"
              onClick={() => copyToClipboard(address.toString())}
            >
              Copy Address <FontAwesomeIcon className="icon" icon={faClone} />
            </button>
            <button
              className="default-btn default-btn--small"
              onClick={() => disconnectWallet()}
            >
              Disconnect{" "}
              <FontAwesomeIcon className="icon" icon={faRightToBracket} />
            </button>
          </div>
          <div className="errors">
            {copied === true ? (
              <span className="text-white">Address Copied.</span>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="modal-body">
          <div>
            Please select a wallet from below to connect for Launching
            yourIDO&apos;s{" "}
          </div>
          <ul className="wallet__list">
            {connectors.map((connector, index) => (
              <li className="wallet__list-item" key={connector.id}>
                <Link href="#" onClick={() => connectAsync(connector.name)}>
                  <Image
                    src={walletImages.at(index)?.image}
                    width={60}
                    height={60}
                    alt={walletImages.at(index)?.name}
                  />
                  {/* <button onClick={() => connectAsync(connector.name)}
                      disabled={isLoading || pendingConnector === connector.name}
                    > */}
                  {/* {isLoading && pendingConnector === connector.name
                    ? "Loading..."
                    : `Connect ${connector.name}`} */}


                  {/* </button> */}
                </Link>

              </li>
            ))}
          </ul>
          <div>
            By connecting your wallet, you agree to our{" "}
            <Link href="#">Terms of Service</Link> and our {""}
            <Link href="#">Privacy Policy</Link> .
          </div>
        </div>
      )
      }
    </Modal >
  );
};

export default Wallet;



{/* <li className="wallet__list-item">
<Link
  // onClick={connectMetamaskWallet} 
  href="#">
  <span>
    <Image
      src="/images/wallet/metamask.svg"
      width={60}
      height={60}
      alt="metamask"
    />
  </span>
</Link>
</li>
<li className="wallet__list-item">
<Link href="#">
  <span>
    <Image
      src="/images/wallet/coinbase.svg"
      width={60}
      height={60}
      alt="coinbase"
    />
  </span>
</Link> */}