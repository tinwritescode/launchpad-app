//import { Space } from "antd";
import { Typography } from "@mui/material";
import Link from "next/link";
import React, { useMemo } from "react";
import { Box, Button } from "@mui/material";
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
            <Button variant="contained">Upcoming IDO</Button>
            <Button variant="contained">Apply to launch</Button>
          </Box>
        </Box>
      </Box>

      <div>
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            <Button key={link.href} variant="contained">
              {link.label}
            </Button>
          </Link>
        ))}
      </div>

      {/* <Space direction='vertical'>
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            <Button key={link.href} variant='contained'>
              {link.label}
            </Button>
          </Link>
        ))}
      </Space> */}

      <div style={{ height: "700px" }} />
    </PageLayout>
  );
}

export default Home;
