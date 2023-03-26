import React from "react";
import {
  MiddleDetailInfo,
  ProjectSummary,
  TopDetailInfo,
} from "../../components/containers/ido-details/components";
import PageLayout from "../../components/templates/PageLayout";

type Props = {};

function IDODetail({}: Props) {
  return (
    <PageLayout>
      <TopDetailInfo />
      <MiddleDetailInfo />
      <ProjectSummary />
    </PageLayout>
  );
}

export default IDODetail;
