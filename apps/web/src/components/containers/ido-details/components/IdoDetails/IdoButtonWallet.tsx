import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const NotConnected = () => {
  return (
    <>
      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded-xl">
        Connect Wallet
      </button>
    </>
  );
};

const Connected = () => {
  return (
    <div className="flex gap-2">
      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded-xl">
        Approve
      </button>

      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded-xl">
        Join Pool
      </button>
    </div>
  );
};

const IdoButtonWallet = () => {
  const { connector: activeConnector, isConnected } = useAccount();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>{domLoaded && <>{isConnected ? <Connected /> : <NotConnected />}</>}</>
  );
};

export default IdoButtonWallet;
