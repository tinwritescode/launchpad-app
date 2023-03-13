import { message } from "antd";
import { ethers } from "ethers";
import React, { useCallback } from "react";
import { api } from "../../../utils/api";
import { getSigner, isWalletInstalled } from "../../../utils/ethereum";
import AppButton from "../AppButton";

interface Props {}

const LoginButton: React.FC<Props> = ({ ...props }) => {
  // trpc
  const utils = api.useContext();
  const userSession = api.auth.getSession.useQuery(undefined, {});
  const { mutateAsync } = api.auth.login.useMutation({
    onSuccess: () => {
      message.success("Login successful");
      utils.auth.invalidate();
    },
  });
  const sessionMessage = api.auth.getMessage.useQuery(undefined);
  const logout = api.auth.logout.useMutation({
    onSettled: async () => {
      message.success("Logout successful");
      await utils.auth.invalidate();
    },
  });

  // callbacks
  const onLoginClicked = useCallback(() => {
    if (!isWalletInstalled()) return message.error("No wallet detected");
    if (!sessionMessage.data) return message.error("No session message");
    if (userSession.data?.isLoggedIn) return message.error("Already logged in");

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
        message.error("User denied signing");
      });
  }, [sessionMessage.data, userSession.data]);

  //
  const isLoggedIn = userSession.data?.isLoggedIn;

  return (
    <AppButton
      style={{ width: "100%" }}
      onClick={!isLoggedIn ? onLoginClicked : () => logout.mutateAsync()}
      type="primary"
      loading={
        sessionMessage.isLoading || userSession.isLoading || logout.isLoading
      }
    >
      {isLoggedIn ? "Connected" : "Sign"}
    </AppButton>
  );
};

export default LoginButton;
