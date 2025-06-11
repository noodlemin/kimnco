// NavBar.jsx
import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import LanguageToggle from "./LanguageToggle";

// const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const NavBar = () => {
  const { t } = useTranslation();
  const navItems = t('nav', { returnObjects: true });
  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  // Removed isMobileMenuOpen and toggleMobileMenu if no full-screen menu is desired

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src="/img/logo.png" alt="logo" className="w-10" />
          </a>

          {/* Right side content for mobile and desktop */}
          <div className="flex h-full items-center">
            {/* Desktop Navigation Links (hidden on mobile) */}
            <div className="hidden md:flex h-full items-center">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.id}`}
                  className="nav-hover-btn"
                >
                  {item.text}
                </a>
              ))}
            </div>

            {/* LanguageToggle visible on all screens, positioned right */}
            {/* On desktop, it will follow the nav items. On mobile, it will be the primary right-side element. */}
            <LanguageToggle className="ml-4 md:ml-10" /> {/* Adjusted margin for mobile/desktop */}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;