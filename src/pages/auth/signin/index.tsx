import Head from 'next/head';
import React from 'react';
import SignIn from '~/components/containers/auth/SignIn';
import PageLayout from '~/components/templates/PageLayout';

type Props = {};

function Index({}: Props) {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>

      <PageLayout>
        <SignIn />
      </PageLayout>
    </>
  );
}

export default Index;
