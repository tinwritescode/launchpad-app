import { type NextPage } from 'next';
import Head from 'next/head';
import { IDOList } from '../../components/containers/project-list/components';
import PageLayout from '../../components/templates/PageLayout';
import { Counter, Project } from '@strawberry/ui';

const Home: NextPage = () => {
  return (
    <>
      <Project.Upcoming data={null} />
      <Counter />
      <Project.UpcommingTwo data={null} />
    </>
  );
};

export default Home;
