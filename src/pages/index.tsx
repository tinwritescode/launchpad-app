import { Button } from "antd";
import Link from "next/link";
import React from "react";
import AppButton from "../components/common/AppButton";
import PageLayout from "../components/templates/PageLayout";

type Props = {};

function Home({}: Props) {
  return (
    <PageLayout>
      <p>Home</p>
      <AppButton>
        <Link href="/ido-list">IDO List screen</Link>
      </AppButton>
    </PageLayout>
  );
}

export default Home;
