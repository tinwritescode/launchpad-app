import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { Web3ReactHooks } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { ButtonProps } from "antd";
import { api } from "../../../utils/api";
import { formatWalletAddress } from "../../../utils/ethereum";
import AppButton from "../AppButton";
import { SupportedWallets, useWeb3App } from "./store";

type Props = {
  connector: SupportedWallets;
  text: string;
  hooks: Web3ReactHooks;
} & ButtonProps;

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
    <AppButton
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
          chainId: 80001,
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
      loading={isActivating}
      size="large"
      type="primary"
      {...props}
    >
      {isActive && account
        ? `Connect with ${formatWalletAddress(account)}`
        : text}
    </AppButton>
  );
};

export default ConnectWalletButton;
