import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Check screen size and update mobile state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) {
        setMobileMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('nav')) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navStyle = isMobile && mobileMenuOpen
    ? { ...styles.navMenu, ...styles.navMenuActive }
    : styles.navMenu;

  return (
    <>
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .mobile-menu-link:hover {
            background-color: #f8f9fa !important;
            border-left-color: #d4a017 !important;
          }

          .mobile-donate-btn:hover {
            background-color: #b8901a !important;
          }
        `}
      </style>
      <header style={styles.header}>
        <nav style={styles.nav}>
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>
            <svg width="40" height="40" viewBox="0 0 40 40" style={styles.logoSvg}>
              <rect x="0" y="0" width="40" height="40" fill="#4A90E2" rx="4"/>
              <rect x="5" y="5" width="12" height="12" fill="#7ED321"/>
              <rect x="23" y="5" width="12" height="12" fill="#F5A623"/>
              <rect x="5" y="23" width="12" height="12" fill="#D0021B"/>
              <rect x="23" y="23" width="12" height="12" fill="#50E3C2"/>
              <polygon points="14,14 26,14 26,26 14,26" fill="#BD10E0"/>
            </svg>
          </div>
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={styles.logo}
          >
            CINQUE <span style={{color: '#d4a017'}}>MASON</span>
          </Link>
        </div>
        {/* Desktop Navigation */}
        {!isMobile && (
          <>
            <ul style={styles.navMenu}>
              <li style={styles.navItem}>
                <Link to="/" style={styles.navLink}>Home</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/about" style={styles.navLink}>About</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/my-plan" style={styles.navLink}>My Plan</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/vision" style={styles.navLink}>Vision</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/expenditures" style={styles.navLink}>Campaign Expenditures</Link>
              </li>
              <li style={styles.navItem}>
                <a
                  href="https://secure.actblue.com/donate/cd2merch"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.navLink}
                >
                  Shop
                </a>
              </li>
              <li style={styles.navItem}>
                <Link to="/road-to-congress" style={styles.navLink}>Road to Congress</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/join" style={styles.navLink}>Join Us</Link>
              </li>
            </ul>
            <a
              href="https://secure.actblue.com/donate/cinqueforcongress"
              style={styles.donateBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              DONATE
            </a>
          </>
        )}

        {/* Mobile Hamburger Menu */}
        {isMobile && (
          <button
            style={{...styles.menuToggle, display: 'flex'}}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span style={{...styles.menuToggleSpan, transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'}}></span>
            <span style={{...styles.menuToggleSpan, opacity: mobileMenuOpen ? '0' : '1'}}></span>
            <span style={{...styles.menuToggleSpan, transform: mobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'}}></span>
          </button>
        )}
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobile && mobileMenuOpen && (
        <div style={styles.mobileDropdown}>
          <ul style={styles.mobileMenu}>
            <li style={styles.mobileMenuItem}>
              <Link
                to="/"
                onClick={handleMobileNavClick}
                style={styles.mobileMenuLink}
                className="mobile-menu-link"
              >
                Home
              </Link>
            </li>
            <li style={styles.mobileMenuItem}>
              <Link
                to="/about"
                onClick={handleMobileNavClick}
                style={styles.mobileMenuLink}
                className="mobile-menu-link"
              >
                About
              </Link>
            </li>
            <li style={styles.mobileMenuItem}>
              <Link
                to="/my-plan"
                onClick={handleMobileNavClick}
                style={styles.mobileMenuLink}
                className="mobile-menu-link"
              >
                My Plan
              </Link>
            </li>
            <li style={styles.mobileMenuItem}>
              <Link
                to="/vision"
                onClick={handleMobileNavClick}
                style={styles.mobileMenuLink}
                className="mobile-menu-link"
              >
                Vision
              </Link>
            </li>
            <li style={styles.mobileMenuItem}>
              <Link
                to="/expenditures"
                onClick={handleMobileNavClick}
                style={styles.mobileMenuLink}
                className="mobile-menu-link"
              >
                Campaign Expenditures
              </Link>
            </li>
            <li style={styles.mobileMenuItem}>
              <a
                href="https://secure.actblue.com/donate/cd2merch"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.mobileMenuLink}
                className="mobile-menu-link"
                onClick={handleMobileNavClick}
              >
                Shop
              </a>
            </li>
            <li style={styles.mobileMenuItem}>
              <Link
                to="/road-to-congress"
                onClick={handleMobileNavClick}
                style={styles.mobileMenuLink}
                className="mobile-menu-link"
              >
                Road to Congress
              </Link>
            </li>
            <li style={styles.mobileMenuItem}>
              <Link
                to="/join"
                onClick={handleMobileNavClick}
                style={styles.mobileMenuLink}
                className="mobile-menu-link"
              >
                Join Us
              </Link>
            </li>
            <li style={styles.mobileMenuItem}>
              <a
                href="https://secure.actblue.com/donate/cinqueforcongress"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.mobileDonateBtnLink}
                className="mobile-donate-btn"
                onClick={handleMobileNavClick}
              >
                DONATE
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
    </>
  );
};

const styles = {
  header: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  nav: {
    width: '100%',
    padding: '1.2rem 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    flexShrink: 0
  },
  logoIcon: {
    flexShrink: 0
  },
  logoSvg: {
    display: 'block'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2d5016',
    textDecoration: 'none',
    fontFamily: 'Arial, sans-serif'
  },
  navMenu: {
    display: 'flex',
    listStyle: 'none',
    gap: '1rem',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    flex: 1,
    justifyContent: 'center',
    flexWrap: 'nowrap',
    overflow: 'hidden'
  },
  navMenuActive: {
    display: 'flex',
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    padding: '1rem',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    borderTop: '2px solid #d4a017'
  },
  navItem: {
    listStyle: 'none'
  },
  navLink: {
    textDecoration: 'none',
    color: '#1a1a1a',
    fontWeight: '500',
    fontSize: '0.85rem',
    transition: 'all 0.3s',
    fontFamily: 'Arial, sans-serif',
    cursor: 'pointer',
    padding: '0.5rem 0.8rem',
    border: '1px solid #d4a017',
    borderRadius: '4px',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    textAlign: 'center'
  },
  donateBtn: {
    backgroundColor: '#d4a017',
    color: '#1e3a5f',
    padding: '0.6rem 1.2rem',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s',
    borderRadius: '4px',
    fontFamily: 'Arial, sans-serif',
    flexShrink: 0,
    fontSize: '0.9rem'
  },
  menuToggle: {
    display: 'none',
    flexDirection: 'column',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: '0.5rem',
    zIndex: 1001
  },
  menuToggleSpan: {
    width: '25px',
    height: '3px',
    backgroundColor: '#2d5016',
    margin: '3px 0',
    transition: 'all 0.3s ease',
    display: 'block',
    borderRadius: '2px'
  },
  // Mobile dropdown menu styles
  mobileDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    borderTop: '2px solid #d4a017',
    zIndex: 1000,
    animation: 'slideDown 0.3s ease-out'
  },
  mobileMenu: {
    listStyle: 'none',
    margin: 0,
    padding: '1rem 0',
    maxHeight: 'calc(100vh - 80px)',
    overflowY: 'auto'
  },
  mobileMenuItem: {
    listStyle: 'none',
    borderBottom: '1px solid #f0f0f0'
  },
  mobileMenuLink: {
    display: 'block',
    padding: '1rem 1.5rem',
    textDecoration: 'none',
    color: '#1a1a1a',
    fontWeight: '500',
    fontSize: '1rem',
    fontFamily: 'Arial, sans-serif',
    transition: 'all 0.3s ease',
    borderLeft: '4px solid transparent'
  },
  mobileDonateBtnLink: {
    display: 'block',
    padding: '1rem 1.5rem',
    textDecoration: 'none',
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '1rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#d4a017',
    margin: '1rem 1.5rem',
    borderRadius: '6px',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  }
};

export default Header;