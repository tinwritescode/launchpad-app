import React from "react";
import { Button } from "../AppButton";

function PleaseConnectYourWallet() {
  return (
    <div
      className="flex justify-center"
      onClick={() => {
        document.getElementById("login-button")?.click();
      }}
    >
      <Button size="lg">Please connect your wallet</Button>
    </div>
  );
}

export default PleaseConnectYourWallet;
