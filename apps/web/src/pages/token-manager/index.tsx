import { Main } from "./main";
import { Alert, AlertTitle, Stack } from "@mui/material";
import { Field, Formik } from "formik";
import { TextField } from "formik-mui";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { TokenInfo } from "../../components/containers/token-manager/";
import PageLayout from "../../components/templates/PageLayout";
import { env } from "../../env.mjs";

export const formikSchema = z.object({
  // ethereum address
  tokenAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
});

type Props = {};

function TokenManager({}: Props) {
  return (
    <PageLayout>
      <Main />

      <Formik
        initialValues={{
          // TODO: remove default later
          tokenAddress: env.NEXT_PUBLIC_IDO_TOKEN_ADDRESS,
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
        validationSchema={toFormikValidationSchema(formikSchema)}
      >
        {({ handleSubmit, getFieldProps }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Alert severity="info">
                <AlertTitle>
                  Please enter the token address you want to manage
                </AlertTitle>
              </Alert>

              <Stack spacing={2}>
                <Field
                  component={TextField}
                  {...getFieldProps("tokenAddress")}
                  label="Token address"
                />

                <TokenInfo />

                {/* <Button disabled={isSubmitting} type="submit">
                  Submit
                </Button> */}
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    </PageLayout>
  );
}

export default TokenManager;
