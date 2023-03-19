import { useRouter } from "next/router";
import React from "react";
import {
  MiddleDetailInfo,
  ProjectSummary,
  TopDetailInfo,
} from "../../components/containers/ido-details/components";
import PageLayout from "../../components/templates/PageLayout";

import { api } from "~/utils/api";

type Props = {};

function IDODetail({}: Props) {
  const router = useRouter();
  const { id } = router.query as { id: string };

  if (id === undefined) {
    return <div>Loading...</div>;
  }

  const { data, isLoading } = api.project.getOne.useQuery({ id });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout>
      {JSON.stringify(data)}
      <TopDetailInfo />
      <MiddleDetailInfo />
      <ProjectSummary />
    </PageLayout>
  );
}

export default IDODetail;
