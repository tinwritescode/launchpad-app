import { type NextPage } from 'next';
import Head from 'next/head';
import { IDOList } from '../../components/containers/project-list/components';
import PageLayout from '../../components/templates/PageLayout';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <PageLayout
        style={{
          display: 'grid',
          gap: '1rem',
        }}
      >
        {/* <PageTopHeading /> */}
        <IDOList />
        {/* <ApplyForIDOHeading /> */}
      </PageLayout>
    </>
  );
};

export default Home;
