import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Wallet from "./Wallet";

function Header() {
  const [menu, setMenu] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();

  // ........header Sticky..................
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    router.events.on("routeChangeStart", removeActive);

    return () => {
      window.removeEventListener("scroll", isSticky);
      router.events.off("routeChangeStart", removeActive);
    };
  });

  const isSticky = (e) => {
    const header = document.querySelector(".header-section");
    const scrollTop = window.scrollY;
    scrollTop >= 250
      ? header.classList.add("headerFixed")
      : header.classList.remove("headerFixed");
  };

  function closeAllMenus() {
    let elements = document.querySelectorAll(".menu-item-has-children.open");
    elements.forEach((item) => {
      item.classList.remove("open");
      item.querySelector(".submenu").style.display = "none";
    });
  }

  // ...........main menu...............
  const toggleMenu = () => {
    setMenu(!menu);
    closeAllMenus();
  };

  //............submenu...............
  function removeActive() {
    const element = document.getElementById("menu");
    element.classList.remove("active");
    const icon = document.getElementById("icon");
    icon.classList.remove("active");
  }

  function toggleActive(event) {
    event.preventDefault();
    const mediaQuery = window.matchMedia("(max-width: 991px)");

    if (mediaQuery.matches) {
      // submenu open
      event.currentTarget.parentElement.classList.toggle("open");
      const submenu = event.currentTarget.nextElementSibling;
      if (!submenu.style.display || submenu.style.display === "none") {
        submenu.style.display = "block";
      } else {
        submenu.style.display = "none";
      }
    }
  }

  // ..............modal....................
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const substr = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) : str;
  };

  const { isConnected: isWalletConnected, address: account } = useAccount();

  return (
    <div>
      <header className="header-section">
        <div className="container">
          <div className="header-holder">
            <div className="header-primary d-flex flex-wrap justify-content-between align-items-center">
              <div className="brand-logo d-none d-lg-inline-block">
                <div className="logo">
                  <Link href="/">
                    <Image
                      src="/images/logo/logo.png"
                      width={150}
                      height={55}
                      alt="logo"
                    />
                  </Link>
                </div>
              </div>
              <div className="header-wrapper justify-content-lg-end">
                <div className="mobile-logo d-lg-none">
                  {" "}
                  <Link href="/">
                    <Image
                      src="/images/logo/logo.png"
                      width={150}
                      height={55}
                      alt="logo"
                    />
                  </Link>
                </div>
                <div className="menu-area">
                  <ul id="menu" className={menu ? "menu active" : "menu"}>
                    <li id="pr-1">
                      <Link href="/">Home</Link>
                    </li>
                    <li id="pr-2">
                      <Link href="/ido-list">Project</Link>
                    </li>
                    <li id="pr-3">
                      <Link href="/staking">Staking</Link>
                    </li>
                    <li id="pr-5">
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                  {isWalletConnected && account ? (
                    <Link
                      onClick={() => handleShow()}
                      className="wallet-btn custom-wallet-btn"
                      href="#"
                    >
                      {substr(account.toString(), 8)}
                    </Link>
                  ) : (
                    <Link
                      onClick={() => handleShow()}
                      className="wallet-btn"
                      href="#"
                    >
                      <span>Connect </span> <FontAwesomeIcon icon={faWallet} />
                    </Link>
                  )}
                  <div
                    id="icon"
                    onClick={() => toggleMenu()}
                    className={
                      menu
                        ? "header-bar d-lg-none active"
                        : "header-bar d-lg-none"
                    }
                  >
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Wallet show={show} handleClose={handleClose}></Wallet>
    </div>
  );
}

export default Header;
