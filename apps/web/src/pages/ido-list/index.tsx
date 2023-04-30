import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import PageTopHeading from "../../components/common/PageTopHeading";
import {
  ApplyForIDOHeading,
  FindUsInSocial,
  IDOList,
} from "../../components/containers/project-list/components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PageLayout from "../../components/templates/PageLayout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <PageLayout
        style={{
          display: "grid",
          gap: "1rem",
        }}
      >
        <Tabs aria-label="disabled tabs example">
          <Tab label="Active" />
          <Tab label="Disabled" disabled />
          <Tab label="Active" />
        </Tabs>
        {/* <PageTopHeading /> */}
        <IDOList />
        {/* <ApplyForIDOHeading /> */}
      </PageLayout>
    </>
  );
};

export default Home;
