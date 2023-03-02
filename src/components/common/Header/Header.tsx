import { Web3Button } from "@web3modal/react";
import * as S from "./Header.style";
import { Layout } from "antd";
import style from "./Header.module.scss";
import Link from "next/link";

type Props = {};

function Header({}: Props) {
  return (
    <Layout.Header className={style.header}>
      <S.Container>
        <Link href="/">
          <S.Heading>Home</S.Heading>
        </Link>
        <Web3Button />
      </S.Container>
    </Layout.Header>
  );
}

export default Header;
