import { Counter, PageHeader, Project } from "@strawberry/ui";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <PageHeader title="Projects" text="projects" />
      <Head>
        <title>Projects - Strawberry Launchpad</title>
      </Head>
      <Project.Upcoming data={null} />
      <Counter />
      <Project.UpcomingTwo data={null} />
    </>
  );
};

export default Home;
