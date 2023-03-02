import React from "react";
import AppButton from "../AppButton";
import ConnectWalletButton from "../ConnectWalletButton";

type Props = {};

function Header({}: Props) {
  return (
    <div>
      <ConnectWalletButton />
    </div>
  );
}

export default Header;
