import Head from 'next/head';
import ForgetPassword from '~/components/containers/auth/ForgetPassword';
import PageLayout from '~/components/templates/PageLayout';

type Props = {};

const signup = (props: Props) => {
  return (
    <>
      <Head>
        <title>Forget Password</title>
      </Head>

      <PageLayout>
        <ForgetPassword />
      </PageLayout>
    </>
  );
};

export default signup;
