import { Box } from "@mui/material";
import React from "react";
import { Footer, Header } from "../common";
import * as S from "./PageLayout.style";

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function PageLayout({ children, ...rest }: Props) {
  return (
    <main>
      <Header />
      <S.Container {...rest}>{children}</S.Container>
      <Footer />
    </main>
  );
}

export default PageLayout;
