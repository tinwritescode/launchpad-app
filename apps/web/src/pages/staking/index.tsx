import React from "react";
import Staking from "~/components/containers/staking/Staking";
import PageLayout from "~/components/templates/PageLayout";

type Props = {};

const index = (props: Props) => {
  return (
    <>
      <PageLayout>
        <Staking />
      </PageLayout>
    </>
  );
};

export default index;
