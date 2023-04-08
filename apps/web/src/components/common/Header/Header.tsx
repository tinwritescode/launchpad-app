import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";
import Link from "next/link";
import { useMemo } from "react";
import { LoginModal } from "../LoginModal/LoginModal";
import { ChangeNetwork } from "./ChangeNetwork";
import style from "./Header.module.scss";

type Props = {};

function Header({}: Props) {
  return (
    <>
      <AppBar
        position="sticky"
        className={style.header}
        sx={{ top: 0, zIndex: 999 }}
        color={"transparent"}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link href="/">
            <img src="/assets/logo.svg" alt="logo" height={20} />
          </Link>

          <LoginModal />
        </Toolbar>
      </AppBar>
      <Stack spacing={2} sx={{ position: "sticky", top: 0, zIndex: 100 }}>
        <ChangeNetwork />
      </Stack>
    </>
  );
  // return (
  //   <>
  //     <Space direction="vertical">
  //       <AppBar position="fixed" className={style.header}>
  //         <Toolbar sx={{ justifyContent: "space-between" }}>
  //           <Link href="/">
  //             <img src="/assets/logo.svg" width={190} height={40} />
  //           </Link>
  //           <Box>
  //             {links.map((link) => (
  //               <Button key={link.href} variant="text">
  //                 <Link href={link.href}>{link.label}</Link>
  //               </Button>
  //             ))}
  //           </Box>

  //           <LoginModal />
  //         </Toolbar>
  //       </AppBar>
  //       <ChangeNetwork />
  //     </Space>

  //     <Box sx={{ height: "100px" }} />
  //   </>
  // );
}

export default Header;
