import { Counter, PageHeader, Project } from "@strawberry/ui";
import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <PageHeader title="Projects" text="projects" />
      <Project.Upcoming data={null} />
      <Counter />
      <Project.UpcomingTwo data={null} />
    </>
  );
};

export default Home;
