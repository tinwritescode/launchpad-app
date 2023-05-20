import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../../../components/common/Dialog';
import { formatWalletAddress } from '../../../utils/ethereum';
import { Button } from '../AppButton';
import Flex from '../Flex/Flex';

function LoginModalInner() {
  const { connectAsync, connectors, isLoading, pendingConnector } =
    useConnect();
  const { isConnected, address } = useAccount();
  const { disconnectAsync } = useDisconnect();

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
            connectors.map((connector) => (
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
                {connector.name}
                {!connector.ready && '(unsupported)'}
                {isLoading &&
                  connector.id === pendingConnector?.id &&
                  '(connecting)'}
              </Button>
            ))}
        </>
      ),
    },
    // {
    //   name: "Step 2",
    //   children: <LoginButton />,
    // },
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
              : 'Login'}
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-white">
          <DialogTitle>Login</DialogTitle>
          {steps.map((step) => (
            <div className="grid gap-4" key={step.name}>
              <h4 className="font-bold">{step.name}</h4>
              <div className="grid gap-2">{step.children}</div>
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
