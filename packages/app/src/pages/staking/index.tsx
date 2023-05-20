import Head from 'next/head';
import Staking from '../../components/containers/staking/Staking';
import PageLayout from '../../components/templates/PageLayout';

const WrappedStaking = () => {
  return (
    <PageLayout>
      <Head>
        <title>Staking</title>
      </Head>
      <Staking />
    </PageLayout>
  );
};

export default WrappedStaking;
