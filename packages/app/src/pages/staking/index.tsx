import Head from "next/head";
import Stacking from "../../components/containers/staking/stacking";

const WrappedStaking = () => {
  return (
    <>
      <Head>
        <title>Staking - Strawberry Launchpad</title>
      </Head>
      <Stacking />
    </>
  );
};

export default WrappedStaking;
