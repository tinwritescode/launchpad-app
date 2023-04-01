import { Box, Button, Typography } from "@mui/material";
import PageLayout from "../components/templates/PageLayout";
import style from "./index.module.scss";

type Props = {};

function Home({}: Props) {
  return (
    <PageLayout>
      <Box
        sx={{
          background: "url('/assets/hero-bg.png') no-repeat 0% 80%/cover",
          height: "400px",
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
            <Button variant="contained">Upcoming IDO</Button>
            <Button variant="contained">Apply to launch</Button>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
}

export default Home;
