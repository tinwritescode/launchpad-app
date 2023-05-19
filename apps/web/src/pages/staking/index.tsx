import Head from "next/head";
import React from "react";
import Staking from "~/components/containers/staking/Staking";
import PageLayout from "~/components/templates/PageLayout";
import { env } from "../../env.mjs";

type Props = {};

const index = (props: Props) => {
  return (
    <>
      <Head>
        <title>Staking - {env.NEXT_PUBLIC_PROJECT_NAME}</title>
      </Head>
      <PageLayout>
        <Staking />
      </PageLayout>
    </>
  );
};

export default index;
