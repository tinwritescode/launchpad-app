import { Button, Space } from "antd";
import Link from "next/link";
import React, { useMemo } from "react";
import AppButton from "../components/common/AppButton";
import PageLayout from "../components/templates/PageLayout";

type Props = {};

function Home({}: Props) {
  const links = useMemo(
    () => [
      {
        href: "/ido-list",
        label: "IDO List screen",
      },
   {
        href: "/ido/create",
        label: "IDO Create screen",
      },
      {
        href: "/farming",
        label: "Farming screen",
      },
      {
        href: "/ido/test",
        label: "IDO Test screen",
      },
    ],
    []
  );

  return (
    <PageLayout>
      <p>Home</p>

      <Space direction="vertical">
        {links.map((link) => (
          <AppButton key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </AppButton>
        ))}
      </Space>
    </PageLayout>
  );
}

export default Home;
