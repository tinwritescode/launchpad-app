import { Dialog, DialogContent, DialogContentText, Stack } from "@mui/material";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useConnect } from "wagmi";
import { formatWalletAddress } from "../../../utils/ethereum";
import { Button } from "../AppButton";
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

  const {
    connectAsync,
    connectors,
    isLoading,
    pendingConnector,
    data: chainData,
  } = useConnect();

  return (
    <Flex
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button onClick={showModal}>
        {!!data?.isLoggedIn
          ? `Welcome ${formatWalletAddress(data?.address)}`
          : "Login"}
      </Button>
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
              {(chainData?.account && (
                <Button
                  onClick={() => {
                    connectAsync({ connector: chainData?.connector }).catch(
                      (err) => {}
                    );
                  }}
                >
                  {formatWalletAddress(chainData?.account)}
                </Button>
              )) ||
                connectors.map((connector) => (
                  <Button
                    size="lg"
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={async () => {
                      connectAsync({ connector }).catch((err) => {
                        toast.error(err.message);
                      });
                    }}
                  >
                    {connector.name}
                    {!connector.ready && "(unsupported)"}
                    {isLoading &&
                      connector.id === pendingConnector?.id &&
                      "(connecting)"}
                  </Button>
                ))}
            </Stack>
          </DialogContentText>
          <DialogContentText>
            <h4>Step 2</h4>
            <LoginButton />
          </DialogContentText>

          <DialogContentText>
            <h4>Step 3</h4>
            <Button
              disabled={!data?.isLoggedIn}
              onClick={hideModal}
              style={{ width: "100%" }}
              size="lg"
            >
              Go to your profile
            </Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Flex>
  );
}
