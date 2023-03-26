import { Space, Typography } from "antd";
import Link from "next/link";
import React, { useMemo } from "react";
import { Button } from "@mui/material";
import PageLayout from "../components/templates/PageLayout";
import style from "./index.module.scss";

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
      {
        href: "/my-project",
        label: "My project",
      },
    ],
    []
  );

  return (
    <PageLayout>
      <div style={{ height: "100px" }} />

      <Typography.Title level={2} className={style.heroText}>
        The fully decentralized protocol for launching new ideas
      </Typography.Title>

      <Space direction="vertical">
        {links.map((link) => (
          <Link href={link.href}>
            <Button key={link.href} variant="contained">
              {link.label}
            </Button>
          </Link>
        ))}
      </Space>

      <div style={{ height: "700px" }} />
    </PageLayout>
  );
}

export default Home;
