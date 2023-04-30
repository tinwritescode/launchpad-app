import React from "react";
import { useAccount } from "wagmi";

type Props = {};

const IdoButtonWallet = (props: Props) => {
  const { connector: activeConnector, isConnected } = useAccount();
  return (
    <>
      <div className="flex gap-2">
        {isConnected ? (
          <>
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded-xl">
              Approve
            </button>

            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded-xl">
              Join Pool
            </button>
          </>
        ) : (
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded-xl">
            Connect Wallet
          </button>
        )}
      </div>
    </>
  );
};

export default IdoButtonWallet;
