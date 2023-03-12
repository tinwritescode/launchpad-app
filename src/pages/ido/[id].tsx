import { useRouter } from "next/router";
import React from "react";
import {
  MiddleDetailInfo,
  ProjectSummary,
  TopDetailInfo,
} from "../../components/containers/ido-details/components";

import { api } from "~/utils/api";

type Props = {};

function IDODetail({}: Props) {
  const router = useRouter();
  const { id } = router.query as { id: string };

  if (id === undefined) {
    return <div>Loading...</div>;
  }

  const { data, isLoading } = api.ido.getIdo.useQuery({ id });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TopDetailInfo />
      <MiddleDetailInfo />
      <ProjectSummary />
    </div>
  );
}

export default IDODetail;
