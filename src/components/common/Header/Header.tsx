import { ConnectWallet } from "@thirdweb-dev/react";
import { Layout } from "antd";
import Link from "next/link";
import style from "./Header.module.scss";
import * as S from "./Header.style";

type Props = {};

function Header({}: Props) {
  return (
    <Layout.Header className={style.header}>
      <S.Container>
        <Link href="/">
          <S.Heading>Home</S.Heading>
        </Link>

        <ConnectWallet />
      </S.Container>
    </Layout.Header>
  );
}

export default Header;
