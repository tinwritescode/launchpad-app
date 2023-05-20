import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAccount } from 'wagmi';
import { useErc20Contract } from '../../../../../libs/blockchain';
import { ethers } from 'ethers';
import { getSigner } from '../../../../../utils/ethereum';

const NotConnected = () => {
  return (
    <>
      <button
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded-xl"
        onClick={() => {
          document.getElementById('login-button')?.click();
        }}
      >
        Connect Wallet
      </button>
    </>
  );
};

type ConnectedProps = {
  purchaseTokenAddress: string;
  idoContractAddress: string;
  amount: string;
  idoPrice: string;
};

const Connected = ({
  purchaseTokenAddress,
  idoContractAddress,
  amount,
  idoPrice,
}: ConnectedProps) => {
  const contract = useErc20Contract(purchaseTokenAddress);

  const onAprove = async () => {
    const signer = getSigner();
    if (!signer) return toast.error('No signer found');

    toast.promise(
      contract
        .connect(getSigner())
        .approve(
          idoContractAddress,
          ethers.utils
            .parseEther(amount)
            .mul(idoPrice)
            .div(ethers.utils.parseEther('1'))
        )
        .then((tx) => tx.wait()),
      {
        loading: 'Approving...',
        success: 'Approved!',
        error: (err) => {
          console.error(err.message);

          return 'Failed to approve';
        },
      }
    );
  };
  return (
    <div className="flex gap-2">
      <button
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded-xl"
        onClick={onAprove}
      >
        Approve
      </button>

      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded-xl">
        Join Pool
      </button>
    </div>
  );
};

type IdoButtonWalletProps = {
  connectedButtonProps: ConnectedProps;
};

const IdoButtonWallet = ({ connectedButtonProps }: IdoButtonWalletProps) => {
  const { connector: activeConnector, isConnected } = useAccount();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded && (
        <>
          {isConnected ? (
            <Connected {...connectedButtonProps} />
          ) : (
            <NotConnected />
          )}
        </>
      )}
    </>
  );
};

export default IdoButtonWallet;
