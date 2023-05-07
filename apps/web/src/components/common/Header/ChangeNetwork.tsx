import { Alert, AlertTitle } from "@mui/material";
import { toast } from "react-hot-toast";
import { useAccount, useChainId } from "wagmi";
import { Button } from "~/components/common";
import { env } from "../../../env.mjs";
import { switchNetwork } from "../../../utils/ethereum";

export const ChangeNetwork = () => {
  const chainId = useChainId();
  const account = useAccount();

  return (
    (account.isConnected &&
      chainId !== parseInt(env.NEXT_PUBLIC_CHAIN_ID, 16) && (
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          action={
            <Button
              size="sm"
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
