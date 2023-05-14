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
    </PageLayout>
  );
}

export default TokenManager;
