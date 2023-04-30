import { AppBar, Stack, Toolbar } from "@mui/material";
import Link from "next/link";
import { LoginModal } from "../LoginModal/LoginModal";
import { ChangeNetwork } from "./ChangeNetwork";
import style from "./Header.module.scss";

type Props = {};

function Header({}: Props) {
  const links = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "IDOs",
      url: "/ido-list",
    },
    {
      name: "Staking",
      url: "/staking",
    },
  ];

  return (
    <>
      <nav className="flex justify-evenly gap-3 p-4 py-8  text-gray-600 items-center">
        <div className="flex gap-8 items-center">
          <Link href="/">
            <h1 className="font-bold font-mono text-3xl text-gray-800">
              HCMUSStarter
            </h1>
          </Link>
          <div className="flex gap-8">
            {links.map((link) => (
              <Link className="font-semibold" href={link.url}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <LoginModal />
      </nav>
      <Stack spacing={2} sx={{ position: "sticky", top: 0, zIndex: 100 }}>
        <ChangeNetwork />
      </Stack>
    </>
  );
}

export default Header;
