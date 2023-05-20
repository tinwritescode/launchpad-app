import { Alert, AlertTitle } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useAccount, useChainId, useNetwork, useSwitchNetwork } from 'wagmi';
import { env } from '../../../env.mjs';
import { switchNetwork } from '../../../utils/ethereum';
import { Button } from '../AppButton/AppButton';

export const ChangeNetwork = () => {
  const chainId = useChainId();
  const account = useAccount();
  const { switchNetworkAsync, isLoading } = useSwitchNetwork();

  return (
    (account.isConnected &&
      chainId !== parseInt(env.NEXT_PUBLIC_CHAIN_ID, 16) && (
        <Alert
          severity="error"
          sx={{ width: '100%' }}
          action={
            <Button
              size="sm"
              disabled={isLoading}
              onClick={async () => {
                try {
                  if (!switchNetworkAsync) return;
                  await switchNetworkAsync(
                    parseInt(env.NEXT_PUBLIC_CHAIN_ID, 16)
                  );
                } catch (error: any) {
                  toast.error(error?.message || 'Failed to switch network.');
                }
              }}
            >
              Change Network
            </Button>
          }
        >
          <AlertTitle>You are not connected to the correct network.</AlertTitle>
        </Alert>
      )) || <></>
  );
};
