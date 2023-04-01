import { ExternalProvider } from "@ethersproject/providers";
import { Alert, AlertTitle, Button } from "@mui/material";
import { toast } from "react-hot-toast";
import { env } from "../../../env.mjs";
import { switchNetwork } from "../../../utils/ethereum";
import { useWeb3Hooks } from "../ConnectWalletButton/store";

export const ChangeNetwork = () => {
  const { useChainId, useAccount } = useWeb3Hooks();
  const chainId = useChainId();
  const account = useAccount();

  (chainId !== parseInt(env.NEXT_PUBLIC_CHAIN_ID, 16) && (
    <Alert
      severity="error"
      sx={{ width: "100%" }}
      action={
        <Button
          size="small"
          variant="contained"
          onClick={async () => {
            try {
              toast.loading("Switching network...");
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
  )) || <></>;

  // return (
  //   (chainId !== parseInt(env.NEXT_PUBLIC_CHAIN_ID, 16) && (
  //     <>
  //       <Alert
  //         message="You are not connected to the correct network."
  //         className={style.alert}
  //         action={
  //           <Button
  //             type="primary"
  //             onClick={() => {
  //               if (typeof window !== "undefined" && window.ethereum) {
  //                 const ethereum = window.ethereum as ExternalProvider;

  //                 switchNetwork(env.NEXT_PUBLIC_CHAIN_ID);
  //               }
  //             }}
  //           >
  //             Change network
  //           </Button>
  //         }
  //       />
  //     </>
  //   )) || <></>
  // );
};
