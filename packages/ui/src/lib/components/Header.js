import Link from 'next/link';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';

import Wallet from './Wallet';
import { AppContext } from '../context/AppContext';
import { useRouter } from 'next/router';
import Image from 'next/image';

function Header() {
  const [menu, setMenu] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();

  // ........header Sticky..................
  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    router.events.on('routeChangeStart', removeActive);

    return () => {
      window.removeEventListener('scroll', isSticky);
      router.events.off('routeChangeStart', removeActive);
    };
  });

  const isSticky = (e) => {
    const header = document.querySelector('.header-section');
    const scrollTop = window.scrollY;
    scrollTop >= 250
      ? header.classList.add('headerFixed')
      : header.classList.remove('headerFixed');
  };

  function closeAllMenus() {
    let elements = document.querySelectorAll('.menu-item-has-children.open');
    elements.forEach((item) => {
      item.classList.remove('open');
      item.querySelector('.submenu').style.display = 'none';
    });
  }

  // ...........main menu...............
  const toggleMenu = () => {
    setMenu(!menu);
    closeAllMenus();
  };

  //............submenu...............
  function removeActive() {
    const element = document.getElementById('menu');
    element.classList.remove('active');
    const icon = document.getElementById('icon');
    icon.classList.remove('active');
  }

  function toggleActive(event) {
    event.preventDefault();
    const mediaQuery = window.matchMedia('(max-width: 991px)');

    if (mediaQuery.matches) {
      // submenu open
      event.currentTarget.parentElement.classList.toggle('open');
      const submenu = event.currentTarget.nextElementSibling;
      if (!submenu.style.display || submenu.style.display === 'none') {
        submenu.style.display = 'block';
      } else {
        submenu.style.display = 'none';
      }
    }
  }

  // ..............modal....................
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const substr = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) : str;
  };

  const {
    account,
    isWalletConnected,
    connectWalletHandle,
    setAccountAfterDisconnectWallet,
  } = useContext(AppContext);

  useEffect(() => {
    if (isWalletConnected() === true) {
      connectWalletHandle();
    } else {
      setAccountAfterDisconnectWallet();
    }
  });

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
                  {' '}
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
                  <ul id="menu" className={menu ? 'menu active' : 'menu'}>
                    <li id="pr-1" className="menu-item-has-children">
                      <Link href="#" onClick={toggleActive}>
                        Home
                      </Link>
                      <ul className="submenu">
                        <li>
                          {' '}
                          <Link href="/">Home 1</Link>
                        </li>
                        <li>
                          <Link href="/home2">Home 2</Link>
                        </li>
                        <li>
                          <Link href="/home3">
                            {' '}
                            Home 3{' '}
                            <span className="badge bg--secondary-color">
                              {' '}
                              New{' '}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li id="pr-2" className="menu-item-has-children">
                      <Link href="#" onClick={toggleActive}>
                        Project
                      </Link>
                      <ul className="submenu">
                        <li>
                          <Link href="/project">Project 1</Link>
                        </li>
                        <li>
                          <Link href="/project2">Project 2</Link>
                        </li>
                        <li>
                          <Link href="/projectdetails">Project Details</Link>
                        </li>
                        <li>
                          {' '}
                          <Link href="/apply-project">Apply for Project</Link>
                        </li>
                        <li>
                          <Link href="/tokenomics">Tokenomics</Link>
                        </li>
                      </ul>
                    </li>
                    <li id="pr-3" className="menu-item-has-children">
                      <Link href="#" onClick={toggleActive}>
                        Stacking
                      </Link>
                      <ul className="submenu">
                        <li>
                          <Link href="/stacking">Stacking</Link>
                        </li>
                        <li>
                          {' '}
                          <Link href="/farming">Farming</Link>
                        </li>
                      </ul>
                    </li>
                    <li id="pr-4" className="menu-item-has-children">
                      <Link href="#" onClick={toggleActive}>
                        Pages
                      </Link>
                      <ul className="submenu">
                        <li>
                          <Link href="/roadmap">Roadmap</Link>
                        </li>
                        <li>
                          {' '}
                          <Link href="/roadmap2">Roadmap 2</Link>
                        </li>
                        <li>
                          <Link href="/kyc">KYC</Link>
                        </li>
                        <li>
                          <Link href="/tier">Tier</Link>
                        </li>
                        <li>
                          <Link href="/faq">FAQ</Link>
                        </li>
                        <li>
                          <Link href="/leaderboard">Leaderboard</Link>
                        </li>
                        <li id="pr-5" className="menu-item-has-children">
                          <Link href="#" onClick={toggleActive}>
                            Team
                          </Link>
                          <ul className="submenu">
                            <li>
                              <Link href="/team">Team</Link>
                            </li>
                            <li>
                              <Link href="/team-member">Team Member</Link>
                            </li>
                          </ul>
                        </li>
                        <li id="pr-6" className="menu-item-has-children">
                          <Link href="#" onClick={toggleActive}>
                            Account
                          </Link>
                          <ul className="submenu">
                            <li>
                              <Link href="/signup">Sign Up</Link>
                            </li>
                            <li>
                              <Link href="/login">Log In</Link>
                            </li>
                            <li>
                              <Link href="/reset-password">Reset Pass</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link href="/404">404</Link>
                        </li>
                        <li>
                          <Link href="/coming-soon">Coming Soon</Link>
                        </li>
                      </ul>
                    </li>
                    <li id="pr-7" className="menu-item-has-children">
                      <Link href="#" onClick={toggleActive}>
                        Blog
                      </Link>
                      <ul className="submenu">
                        <li>
                          <Link href="/blog">Blog </Link>
                        </li>
                        <li>
                          <Link href="/blog2">Blog 2</Link>
                        </li>
                        <li>
                          <Link href="/blog-single">Blog Single</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
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
                        ? 'header-bar d-lg-none active'
                        : 'header-bar d-lg-none'
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
