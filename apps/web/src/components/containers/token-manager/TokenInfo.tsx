import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { Field, Formik, useFormikContext } from "formik";
import { TextField } from "formik-mui";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { useAccount } from "wagmi";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { env } from "../../../env.mjs";
import { getErc20Contract } from "../../../libs/blockchain";
import { formikSchema } from "../../../pages/token-manager/index";
import { getSigner } from "../../../utils/ethereum";
import { formatNumber } from "../../../utils/format";
import { Button } from "../../common";

export const TokenInfo = () => {
  const { values, errors } = useFormikContext<z.infer<typeof formikSchema>>();
  const { address } = useAccount();
  const getTokenInfo = useCallback(
    async ({ queryKey: [, tokenAddress] }: any) => {
      if (!address || !tokenAddress) {
        return null;
      }
      const erc20Contract = getErc20Contract(tokenAddress);

      const [name, decimals, totalSupply, balanceOf] = await Promise.all([
        erc20Contract.name(),
        erc20Contract.decimals(),
        erc20Contract.totalSupply(),
        erc20Contract.balanceOf(address),
      ]);

      return {
        name,
        decimals,
        totalSupply,
        balanceOf,
      };
    },
    []
  );
  const tokenInfo = useQuery(["tokenInfo", values.tokenAddress], getTokenInfo, {
    enabled: !!values.tokenAddress,
    refetchOnWindowFocus: false,
  });
  const renderTokenInfo = useCallback(() => {
    if (!tokenInfo.data) {
      return null;
    }

    const renderFields = [
      {
        label: "Token name",
        value: tokenInfo.data?.name,
      },
      {
        label: "Token decimals",
        value: tokenInfo.data?.decimals,
      },
      {
        label: "Total supply",
        value: formatNumber(
          ethers.utils.formatEther(tokenInfo.data?.totalSupply)
        ),
        render: (value: string) => <Typography>{value}</Typography>,
      },
      {
        label: "Your balance",
        value: formatNumber(
          ethers.utils.formatEther(tokenInfo.data?.balanceOf)
        ),
        render: (value: string) => <Typography>{value}</Typography>,
      },
    ];

    return (
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <List>
              {renderFields.map((field) => (
                <Stack key={field.label} direction="row" spacing={2}>
                  <Typography>{field.label}</Typography>
                  {field.render ? (
                    field.render(field.value)
                  ) : (
                    <Typography>{field.value}</Typography>
                  )}
                </Stack>
              ))}
            </List>
          </Stack>
        </CardContent>
      </Card>
    );
  }, [tokenInfo.data]);
  const transferEventHistory = useQuery(
    ["transferEventHistory", values.tokenAddress],
    async ({ queryKey: [, tokenAddress] }: any) => {
      if (!address || !tokenAddress) {
        return null;
      }
      const erc20Contract = getErc20Contract(tokenAddress);

      // get last 1000 transfer events
      const logs = await erc20Contract.queryFilter(
        erc20Contract.filters.Transfer(null, null),
        0,
        1000
      );

      return logs;
    },
    {
      enabled: !!values.tokenAddress,
      refetchOnWindowFocus: false,
    }
  );
  const renderTranferEventHistory = () => {
    if (!transferEventHistory.data?.length) {
      return <Typography>No transfer event history</Typography>;
    }

    return transferEventHistory.data?.map((event) => (
      <Typography key={event.transactionHash}>
        {`From: ${event.args?.from} - To: ${
          event.args?.to
        } - Amount: ${ethers.utils.formatEther(event.args?.value)}`}
      </Typography>
    ));
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <Typography variant="h5">Token info</Typography>

        {(tokenInfo.isLoading && <CircularProgress />) ||
          (!errors.tokenAddress && renderTokenInfo())}
      </Stack>

      {/* Transfer event history */}
      <Stack spacing={1}>
        <Typography variant="h5">Transfer event history</Typography>

        <Card variant="outlined">
          <CardContent>
            <List>
              {(transferEventHistory.isLoading && <CircularProgress />) ||
                renderTranferEventHistory()}
            </List>
          </CardContent>
        </Card>
      </Stack>

      {/* Transfer form */}
      <Stack spacing={1}>
        <Typography variant="h5">Transfer</Typography>
        <Alert severity="info">
          {/* Step: 
        1. Transfer token to our contract address
        2. We will then divide the token to all the tiers, you can check at this link
        3. Your IDO will be marked as deposited, it will be activated on the start time
        */}
          <Typography variant="body2">
            Step:
            <br />
            1. Transfer token to our contract address
            <br />
            2. We will then divide the token to all the tiers, you can check at
            this link
            <br />
            3. Your IDO will be marked as deposited, it will be activated on the
            start time
          </Typography>
        </Alert>

        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Formik
                initialValues={{
                  amount: 0,
                }}
                onSubmit={async (_values, { setSubmitting }) => {
                  try {
                    console.log("values", _values);
                    const erc20Contract = getErc20Contract(values.tokenAddress);
                    const signer = getSigner();
                    await erc20Contract
                      .connect(signer)
                      .transfer(
                        env.NEXT_PUBLIC_DIVIDEND_CONTRACT_ADDRESS,
                        ethers.utils.parseEther(_values.amount.toString())
                      )
                      .then((tx) => tx.wait());

                    toast.success("Transfer success");

                    // mutate
                    tokenInfo.refetch();
                    transferEventHistory.refetch();
                  } catch (error: any) {
                    toast.error(error?.message || "Transfer failed");
                  } finally {
                    setSubmitting(false);
                  }
                }}
                validationSchema={toFormikValidationSchema(
                  z.object({
                    amount: z.coerce
                      .bigint()
                      .min(BigInt(1))
                      .max(tokenInfo.data?.balanceOf.toBigInt() as bigint),
                  })
                )}
              >
                {({ isSubmitting, submitForm }) => (
                  <Stack spacing={2}>
                    <Field component={TextField} name="amount" label="Amount" />
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Transfer
                    </Button>
                  </Stack>
                )}
              </Formik>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
};
