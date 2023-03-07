import React from "react";
import FarmingFilterBar from "./components/FarmingFilterBar";
import FarmingTable from "./components/FarmingTable";
import styled from "styled-components";
import { Divider } from "antd";

const FarmingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Farming = () => {
  return (
    <>
      <FarmingContainer>
        <FarmingFilterBar />
        <Divider />
        <FarmingTable />
      </FarmingContainer>
    </>
  );
};

export default Farming;
