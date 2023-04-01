import { Box } from "@mui/material";
import React from "react";
import { Footer, Header } from "../common";
import * as S from "./PageLayout.style";

type Props = {
  children: React.ReactNode;
};

function PageLayout({ children }: Props) {
  return (
    <Box sx={{ position: "relative", height: "calc(100vh)", overflow: "auto" }}>
      <Header />

      <S.Container>{children}</S.Container>
      <Footer />
    </Box>
  );
}

export default PageLayout;
