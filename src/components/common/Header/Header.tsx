import { Image, Layout, Space } from "antd";
import Link from "next/link";
import { useEffect } from "react";
import { LoginModal } from "../LoginModal/LoginModal";
import { ChangeNetwork } from "./ChangeNetwork";
import style from "./Header.module.scss";

type Props = {};

function Header({}: Props) {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const header = document.querySelector(`.${style.header}`);
      if (header) {
        const scrollY = window.scrollY;
        if (scrollY > 0) {
          header.classList.add(style.header__scroll as string);
        } else {
          header.classList.remove(style.header__scroll as string);
        }
      }
    });
  }, [style.header, style.header__scroll]);

  return (
    <Space direction="vertical">
      <Layout.Header className={style.header}>
        <Link href="/">
          <Image src="/assets/logo.svg" width={190} height={40} />
        </Link>
        <LoginModal />
      </Layout.Header>
      <ChangeNetwork />
    </Space>
  );
}

export default Header;
