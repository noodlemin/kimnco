import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import clsx from 'clsx';
import LanguageToggle from "./LanguageToggle";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const NavBar = ({ lang }) => {
  const { t } = useTranslation();
  const navItems = t('nav', { returnObjects: true });
  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation(); // Get the current location object

  // --- Effect to manage navbar visibility and style on scroll ---
  useEffect(() => {
    const atTop = currentScrollY <= 10;
    setIsAtTop(atTop);

    if (isMobileMenuOpen) {
      setIsNavVisible(true);
      return;
    }
    
    if (atTop) {
      setIsNavVisible(true);
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY, isMobileMenuOpen]);

  // --- GSAP Animation for nav visibility ---
  useEffect(() => {
    if (window.gsap) {
      window.gsap.to(navContainerRef.current, {
        y: isNavVisible ? 0 : -120,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isNavVisible]);

  // --- Lock body scroll when mobile menu is open ---
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto'; // Cleanup on unmount
    };
  }, [isMobileMenuOpen]);

  // --- Handle logo click to scroll to top ---
  const handleLogoClick = (e) => {
    // Check if we are already on the home page
    if (location.pathname === `/${lang}` || location.pathname === `/${lang}/`) {
      e.preventDefault(); // Prevent the Link's default navigation
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    // If not on the home page, the Link will navigate as usual
  };

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-0 z-50 h-16 transition-all duration-700"
      >
        <header
          className={clsx(
            'relative w-full h-full border-b transition-all duration-300',
            {
              'bg-black/30 backdrop-blur-lg shadow-lg border-white/10': !isAtTop || isMobileMenuOpen,
              'border-transparent': isAtTop && !isMobileMenuOpen,
            }
          )}
        >
          <nav className="flex items-center justify-between w-full h-full px-4 sm:px-6">
            {/* Logo */}
            <Link 
              to={`/${lang}`} 
              className="flex items-center shrink-0" 
              onClick={handleLogoClick} // Add the click handler here
            >
              <img src="/img/logo.png" alt="logo" className="w-10" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex h-full items-center gap-2">
              {navItems.map((item) => (
                <Link key={item.id} to={`/${lang}/${item.id}`} className="nav-hover-btn">
                  {item.text}
                </Link>
              ))}
              <LanguageToggle className="ml-8" />
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="z-50 p-2 text-gray-200 transition-colors hover:text-white"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-gray-900/90 backdrop-blur-md transition-opacity duration-300 md:hidden",
          {
            "visible opacity-100": isMobileMenuOpen,
            "invisible opacity-0": !isMobileMenuOpen,
          }
        )}
      >
        <div className="flex flex-col items-center justify-center h-full pt-16">
          <div className="flex flex-col items-center gap-6 text-center">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={`/${lang}/${item.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-semibold text-gray-200 transition-colors hover:text-white"
              >
                {item.text}
              </Link>
            ))}
          </div>
          <div className="mt-12">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;