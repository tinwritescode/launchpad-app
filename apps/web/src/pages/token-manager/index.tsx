import Head from "next/head";
import { z } from "zod";
import { Main } from "../../components/containers/token-manager/main";
import PageLayout from "../../components/templates/PageLayout";

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
      <Head>
        <title>Token Manager</title>
      </Head>
      <Main />
    </PageLayout>
  );
}

export default TokenManager;
