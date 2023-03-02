import React from "react";
import { Footer, Header } from "../common";
import { Layout } from "antd";
import style from "./PageLayout.module.scss";
import * as S from "./PageLayout.style";

type Props = {
  children: React.ReactNode;
};

function PageLayout({ children }: Props) {
  return (
    <Layout>
      <Layout.Header className={style.header}>
        <Header />
      </Layout.Header>

      <S.Container>{children}</S.Container>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default PageLayout;
