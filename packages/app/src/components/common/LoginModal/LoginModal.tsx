import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../../components/common/Dialog';
import { formatWalletAddress } from '../../../utils/ethereum';
import { Button } from '../AppButton';
import Flex from '../Flex/Flex';
import Image from 'next/image';

function LoginModalInner() {
  const { connectAsync, connectors, isLoading, pendingConnector } =
    useConnect();
  const { isConnected, address } = useAccount();
  const { disconnectAsync } = useDisconnect();

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

  const steps = [
    {
      name: 'Connect Wallet',
      children: (
        <>
          {(isConnected && (
            <Button
              onClick={async () =>
                disconnectAsync().catch((err) => {
                  toast.error(err.message);
                })
              }
            >
              {formatWalletAddress(address as string)}
            </Button>
          )) ||
            connectors.map((connector, index) => (
              <Button
                size="lg"
                disabled={!connector.ready}
                key={connector.id}
                onClick={async () =>
                  connectAsync({ connector }).catch((err) => {
                    toast.error(err.message);
                  })
                }
              >
                <div className="flex items-center justify-start space-x-2">
                  <Image
                    src={walletImages.at(index)?.image as string}
                    alt=""
                    width={50}
                    height={50}
                    className="p-1"
                  />
                  <div>
                    {connector.name}
                    {!connector.ready && '(unsupported)'}
                    {isLoading &&
                      connector.id === pendingConnector?.id &&
                      '(connecting)'}
                  </div>
                </div>
              </Button>
            ))}
        </>
      ),
    },
  ];

  return (
    <Flex
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button className="px-16" id="login-button">
            {isConnected
              ? `Welcome ${formatWalletAddress(address as string)}`
              : 'Connect Wallet'}
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-white">
          {steps.map((step) => (
            <div className="grid gap-4" key={step.name}>
              <h4 className="font-bold">{step.name}</h4>
              <div className="grid gap-4">{step.children}</div>
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </Flex>
  );
}

export const LoginModal = dynamic(() => Promise.resolve(LoginModalInner), {
  ssr: false,
});
