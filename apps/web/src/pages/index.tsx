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
          background: "url('/assets/hero-bg.png') no-repeat 0% 80%/cover",
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: "-100px",
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

      <div className="flex space-x-2">
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            <Button key={link.href}>{link.label}</Button>
          </Link>
        ))}
      </div>

      <div style={{ height: "700px" }} />
    </PageLayout>
  );
}

export default Home;
