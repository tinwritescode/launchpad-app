import { Counter, PageHeader, Project } from "@strawberry/ui";
import { type NextPage } from "next";
import Head from "next/head";
import { api } from "../../utils/api";

const Home: NextPage = () => {
  const { data, isLoading, error, refetch } = api.project.getAll.useQuery({
    offset: 0,
    limit: 100,
  });

  return (
    <>
      <PageHeader title="Projects" text="projects" />
      <Head>
        <title>Projects - Strawberry Launchpad</title>
      </Head>
      <Counter />
      <Project.Upcoming
        data={data?.data?.filter((item) => item.sale.status === "UPCOMING")}
        isLoading={isLoading}
      />
      <Project.Opening
        data={data?.data?.filter((item) => item.sale.status === "OPEN")}
        isLoading={isLoading}
      />
      <Project.Completed
        data={data?.data?.filter((item) => item.sale.status === "CLOSED")}
        isLoading={isLoading}
      />
    </>
  );
};

export default Home;
