import React, { useEffect } from "react";
import FarmingFilterBar from "./components/FarmingFilterBar";
import FarmingTable from "./components/FarmingTable";
import styled from "styled-components";
import { Divider, message } from "antd";
import PageLayout from "../../templates/PageLayout";
import { Staking__factory } from "../../../libs/typechain-types";
import { env } from "../../../env.mjs";
import { ethers } from "ethers";

const FarmingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Farming = () => {
  useEffect(() => {
    // polygon mumbai
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc.ankr.com/polygon_mumbai"
    );
    const stakingContract = Staking__factory.connect(
      env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
      provider
    );

    console.log(stakingContract);

    stakingContract.getRewardRatio().then((result) => {
      message.info(`Reward ratio: ${result}`);
    });
  }, []);

  return (
    <>
      <PageLayout>
        <FarmingContainer>
          <FarmingFilterBar />
          <Divider />
          <FarmingTable />
        </FarmingContainer>
      </PageLayout>
    </>
  );
};

export default Farming;
