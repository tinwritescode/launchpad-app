import Head from 'next/head';
import SignUp from '~/components/containers/auth/SignUp';
import PageLayout from '~/components/templates/PageLayout';

type Props = {};

const signup = (props: Props) => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>

      <PageLayout>
        <SignUp />
      </PageLayout>
    </>
  );
};

export default signup;
