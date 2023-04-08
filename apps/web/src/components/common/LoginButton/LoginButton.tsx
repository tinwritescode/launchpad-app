import React, { useCallback } from "react";
import { toast } from "react-hot-toast";
import { api } from "../../../utils/api";
import { getSigner, isWalletInstalled } from "../../../utils/ethereum";
import { Button } from "../AppButton";
import { useWeb3App } from "../ConnectWalletButton/store";

interface Props {}

const LoginButton: React.FC<Props> = ({ ...props }) => {
  // trpc
  const utils = api.useContext();
  const userSession = api.auth.getSession.useQuery(undefined, {});
  const { mutateAsync } = api.auth.login.useMutation({
    onSuccess: () => {
      toast.success("Login successful");
      utils.auth.invalidate();
    },
  });
  const sessionMessage = api.auth.getMessage.useQuery();
  const logout = api.auth.logout.useMutation({
    onSettled: async () => {
      toast.success("Logout successful");
      await utils.auth.invalidate();
    },
  });

  // callbacks
  const onLoginClicked = useCallback(() => {
    if (!isWalletInstalled()) return toast.error("No wallet detected");
    if (!sessionMessage.data) return toast.error("No session message");
    if (userSession.data?.isLoggedIn) return toast.error("Already logged in");

    const signer = getSigner();

    signer
      ?.signMessage(sessionMessage.data)
      .then(async (res) => {
        mutateAsync({
          message: sessionMessage.data,
          signature: res,
          walletAddress: await signer.getAddress(),
        });
      })
      .catch((err) => {
        toast.error("User denied signing");
      });
  }, [sessionMessage.data, userSession.data]);

  //
  const isLoggedIn = userSession.data?.isLoggedIn;

  const { hooks } = useWeb3App();
  const { useAccount } = hooks;

  return (
    <Button
      style={{ width: "100%" }}
      onClick={!isLoggedIn ? onLoginClicked : () => logout.mutateAsync()}
      disabled={!sessionMessage.data}
      size="lg"
    >
      {/* loading={logout.isLoading} */}
      {isLoggedIn ? "Logout" : "Sign"}
    </Button>
  );
};

export default LoginButton;
