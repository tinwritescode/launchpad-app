import Head from 'next/head';
import React from 'react';
import { env } from '../../env.mjs';
import Staking from '../../components/containers/farming/Farming';
import PageLayout from '../../components/templates/PageLayout';

const index = () => {
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
