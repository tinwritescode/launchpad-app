//import { Space } from "antd";
import { Typography } from "@mui/material";
import Link from "next/link";
import React, { useMemo } from "react";
import { Box } from "@mui/material";
import PageLayout from "../components/templates/PageLayout";
import style from "./index.module.scss";
import { Button } from "../components/common";

type Props = {};

function Home({}: Props) {
  const links = useMemo(
    () => [
      {
        href: "/ido-list",
        label: "IDO List screen",
      },
      {
        href: "/farming",
        label: "Farming screen",
      },
      {
        href: "/token-manager",
        label: "Token Manager",
      },
    ],
    []
  );

  return (
    <PageLayout>
      <Box
        sx={{
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography className={style.heroText} variant="h4">
            The fully decentralized protocol for launching new ideas
          </Typography>
          <Typography variant="subtitle1">
            An all-in-one Incubation Hub with a full stack Defi platform across
            all main blockchain networks
          </Typography>

          <Box sx={{ m: 2 }} />

          <Box sx={{ gap: 1, justifyContent: "center", display: "flex" }}>
            <Button>Upcoming IDO</Button>
            <Button>Apply to launch</Button>
          </Box>
        </Box>
      </Box>

      <div className="flex space-x-2 justify-center">
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            <Button key={link.href}>{link.label}</Button>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}

export default Home;
