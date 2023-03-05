import { Layout } from "antd";
import React from "react";
import { Footer, Header } from "../common";
import * as S from "./PageLayout.style";

type Props = {
  children: React.ReactNode;
};

function PageLayout({ children }: Props) {
  return (
    <Layout>
      <Header />

      <S.Container>{children}</S.Container>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default PageLayout;
