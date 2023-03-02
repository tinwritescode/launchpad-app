import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import PageTopHeading from "../../components/common/PageTopHeading";
import {
  ApplyForIDOHeading,
  FindUsInSocial,
  IDOList,
} from "../../components/containers/project-list/components";
import PageLayout from "../../components/templates/PageLayout";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <PageLayout>
        <PageTopHeading />
        <IDOList />
        <ApplyForIDOHeading />
      </PageLayout>
    </>
  );
};

export default Home;
