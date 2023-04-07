import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Stack,
} from "@mui/material";
import { useCallback, useState } from "react";
import { formatWalletAddress } from "../../../utils/ethereum";
import AppButton from "../AppButton";
import ConnectWalletButton from "../ConnectWalletButton";
import * as coinbase from "../ConnectWalletButton/connectors/coinbaseWallet";
import { hooks, metaMask } from "../ConnectWalletButton/connectors/metamask";
import Flex from "../Flex/Flex";
import LoginButton from "../LoginButton";
import { useSession } from "../LoginButton/lib";

type Props = {};

export function LoginModal({}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useSession();

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const hideModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <Flex
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <AppButton variant="contained" onClick={showModal}>
        {!!data?.isLoggedIn
          ? `Welcome ${formatWalletAddress(data?.address)}`
          : "Login"}
      </AppButton>
      <Dialog
        title="Login"
        open={isModalOpen}
        onClose={hideModal}
        maxWidth="xl"
      >
        <DialogContent>
          <DialogContentText>
            <h4>Step 1</h4>
            <Stack
              sx={{
                width: "100%",
                alignItems: "stretch",
              }}
            >
              <ConnectWalletButton
                connector={metaMask}
                hooks={hooks}
                text="Connect with MetaMask"
                size="large"
                disabled={!!data?.isLoggedIn}
              />

              <ConnectWalletButton
                connector={coinbase.coinbaseWallet}
                text="Connect with Coinbase Wallet"
                hooks={coinbase.hooks}
                size="large"
                disabled={!!data?.isLoggedIn}
              />
            </Stack>
          </DialogContentText>
          <DialogContentText>
            <h4>Step 2</h4>
            <LoginButton />
          </DialogContentText>

          <DialogContentText>
            <h4>Step 3</h4>
            <Button
              variant="contained"
              disabled={!data?.isLoggedIn}
              onClick={hideModal}
              style={{ width: "100%" }}
              size="large"
            >
              Go to your profile
            </Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Flex>
  );
}
