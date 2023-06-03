import { Counter, Project } from "@strawberry/ui";
import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Project.Upcoming data={null} />
      <Counter />
      <Project.UpcomingTwo data={null} />
    </>
  );
};

export default Home;
