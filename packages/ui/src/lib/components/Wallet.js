import { useState } from "react";

import { Modal } from "react-bootstrap";
import { faClone, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import Image from "next/image";

const Wallet = ({ show, handleClose }) => {
  const walletImages = [
    {
      name: "MetaMask",
      image: "/wallets/metamask.svg",
    },
    {
      name: "Coinbase",
      image: "/wallets/coinbase.svg",
    },
  ];

  const [copied, setIsCopied] = useState(false);
  const { connectAsync, connectors } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnectAsync } = useDisconnect();

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
          <div>Already Connected</div>
          <div className="wallet-btns">
            <button
              className="default-btn default-btn--small"
              onClick={() => copyToClipboard(address.toString())}
            >
              Copy Address <FontAwesomeIcon className="icon" icon={faClone} />
            </button>
            <button
              className="default-btn default-btn--small"
              onClick={() => disconnectAsync()}
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
            Please select a wallet from below to connect for Launching your IDO
          </div>
          <ul className="wallet__list">
            {connectors.map((connector, index) => (
              <li className="wallet__list-item" key={connector.id}>
                <Link
                  href="#"
                  onClick={() => {
                    connectAsync({
                      connector,
                    });
                  }}
                >
                  <Image
                    src={walletImages.at(index)?.image}
                    width={60}
                    height={60}
                    alt={walletImages.at(index)?.name}
                  />
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
      )}
    </Modal>
  );
};

export default Wallet;
