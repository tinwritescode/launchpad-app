import { Web3Button } from "@web3modal/react";
import React from "react";
import AppButton from "../AppButton";
import ConnectWalletButton from "../ConnectWalletButton";

type Props = {};

function Header({}: Props) {
  return (
    <div>
      <Web3Button />
    </div>
  );
}

export default Header;
