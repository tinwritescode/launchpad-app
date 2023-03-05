import { useRouter } from "next/router";
import React from "react";
import {
  MiddleDetailInfo,
  ProjectSummary,
  TopDetailInfo,
} from "../../components/containers/ido-details/components";

type Props = {};

function IDODetail({}: Props) {
  const {
    query: { id },
  } = useRouter();

  return (
    <div>
      <TopDetailInfo />
      <MiddleDetailInfo />
      <ProjectSummary />
    </div>
  );
}

export default IDODetail;
