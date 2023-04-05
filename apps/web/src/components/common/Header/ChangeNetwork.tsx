import { Alert, AlertTitle, Button } from "@mui/material";
import { toast } from "react-hot-toast";
import { env } from "../../../env.mjs";
import { switchNetwork } from "../../../utils/ethereum";
import { useWeb3Hooks } from "../ConnectWalletButton/store";

export const ChangeNetwork = () => {
  const { useChainId, useAccount } = useWeb3Hooks();
  const chainId = useChainId();
  const account = useAccount();

  return (
    (account && chainId !== parseInt(env.NEXT_PUBLIC_CHAIN_ID, 16) && (
      <Alert
        severity="error"
        sx={{ width: "100%" }}
        action={
          <Button
            size="small"
            variant="contained"
            onClick={async () => {
              try {
                await switchNetwork(env.NEXT_PUBLIC_CHAIN_ID);
              } catch (error: any) {
                toast.error(error?.message || "Failed to switch network.");
              }
            }}
          >
            Change network
          </Button>
        }
      >
        <AlertTitle>You are not connected to the correct network.</AlertTitle>
      </Alert>
    )) || <></>
  );
};