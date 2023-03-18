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

      <Layout.Content>
        <S.Container>{children}</S.Container>
      </Layout.Content>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default PageLayout;
