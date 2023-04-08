import { Web3ReactHooks } from "@web3-react/core";
import { env } from "../../../env.mjs";
import { api } from "../../../utils/api";
import { formatWalletAddress } from "../../../utils/ethereum";
import { SupportedWallets, useWeb3App } from "./store";
import { Button } from "../AppButton";
import { Loader2 } from "lucide-react";

type Props = {
  connector: SupportedWallets;
  text: string;
  hooks: Web3ReactHooks;
} & React.ComponentProps<typeof Button>;

const ConnectWalletButton = ({ connector, text, hooks, ...props }: Props) => {
  const { useAccount, useIsActive, useIsActivating } = hooks;
  const utils = api.useContext();
  const { mutateAsync } = api.auth.logout.useMutation({
    onSettled: async () => {
      await utils.auth.invalidate();
    },
  });
  const isActive = useIsActive();
  const isActivating = useIsActivating();
  const account = useAccount();
  const { setConnector, setHooks } = useWeb3App();

  return (
    <Button
      onClick={async () => {
        if (isActive) {
          if (connector?.deactivate) {
            connector.deactivate();
          } else {
            connector.resetState();
          }
          await mutateAsync();
          return;
        }
        connector.activate({
          chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID, 16),
          chainName: "Mumbai Testnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
        });

        setConnector(connector);
        setHooks(hooks);
      }}
      style={{ width: "100%" }}
      // loading={isActivating}
      size="lg"
      {...props}
    >
      {(isActivating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />) ||
        (isActive && account
          ? `Logout (as ${formatWalletAddress(account)})`
          : text)}
    </Button>
  );
};

export default ConnectWalletButton;
