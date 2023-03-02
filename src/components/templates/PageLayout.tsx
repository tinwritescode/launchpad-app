import React from "react";
import { Footer, Header } from "../common";
import { Layout } from "antd";
import style from "./PageLayout.module.scss";

type Props = {
  children: React.ReactNode;
};

function PageLayout({ children }: Props) {
  return (
    <Layout>
      <Layout.Header className={style.header}>
        <Header />
      </Layout.Header>

      <main>{children}</main>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default PageLayout;
