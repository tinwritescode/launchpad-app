import { AppBar, Box, Button, List, ListItem, Toolbar } from "@mui/material";
import { Image, Layout, Space } from "antd";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { LoginModal } from "../LoginModal/LoginModal";
import { ChangeNetwork } from "./ChangeNetwork";
import style from "./Header.module.scss";

type Props = {};

function Header({}: Props) {
  const links = useMemo(
    () => [
      {
        href: "/ido-list",
        label: "IDO List screen",
      },
      {
        href: "/ido/create",
        label: "IDO Create screen",
      },
      {
        href: "/farming",
        label: "Farming screen",
      },
      {
        href: "/ido/test",
        label: "IDO Test screen",
      },
      {
        href: "/my-project",
        label: "My project",
      },
    ],
    []
  );
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
    <>
      <Space direction="vertical">
        <AppBar position="fixed" className={style.header}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Link href="/">
              <img src="/assets/logo.svg" width={190} height={40} />
            </Link>
            <Box>
              {links.map((link) => (
                <Button key={link.href} variant="text">
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </Box>

            <LoginModal />
          </Toolbar>
        </AppBar>
        <ChangeNetwork />
      </Space>

      <Box sx={{ height: "100px" }} />
    </>
  );
}

export default Header;
