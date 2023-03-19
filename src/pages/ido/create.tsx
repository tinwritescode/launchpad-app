import { Create } from "../../components/containers/create-ido";
import PageLayout from "../../components/templates/PageLayout";

type Props = {};

export const Main = () => {
  return (
    <PageLayout>
      {/* <List /> */}
      <Create />
    </PageLayout>
  );
};

export default Main;
