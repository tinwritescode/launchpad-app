//import { Divider } from "antd";
import styled from 'styled-components';
import PageLayout from '../../templates/PageLayout';
import FarmingFilterBar from './components/FarmingFilterBar';
import FarmingTable from './components/FarmingTable';

const FarmingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Farming = () => {
  return (
    <>
      <PageLayout>
        <FarmingContainer>
          <FarmingFilterBar />
          {/* <Divider /> */}
          <FarmingTable />
        </FarmingContainer>
      </PageLayout>
    </>
  );
};

export default Farming;
