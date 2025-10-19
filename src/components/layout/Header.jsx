import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();


  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleDropdownClick = (dropdownName, event) => {
    event.preventDefault();
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };


  // Check screen size and update mobile state
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('nav')) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest('.dropdown-wrapper')) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeDropdown]);

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
            background-color: #F5F5F5 !important;
            border-left-color: #2E6FB3 !important;
          }

          .mobile-donate-btn:hover {
            background-color: #1e5a8a !important;
          }

          /* Simplified dropdown implementation */
          .dropdown-wrapper {
            position: relative !important;
            display: inline-block !important;
            list-style: none !important;
          }

          .dropdown-toggle {
            background-color: #ffffff;
            border: 1px solid #2E6FB3;
            border-radius: 4px;
            color: #0E3A60;
            cursor: pointer;
            font-family: 'Open Sans', sans-serif;
            font-size: 0.85rem;
            font-weight: 500;
            padding: 0.5rem 0.8rem;
            text-align: center;
            white-space: nowrap;
            text-decoration: none;
            display: block;
            transition: background-color 0.2s ease;
          }

          /* Ensure button elements have consistent styling */
          button.dropdown-toggle {
            background-color: #ffffff;
            border: 1px solid #2E6FB3;
            border-radius: 4px;
            color: #0E3A60;
            cursor: pointer;
            font-family: 'Open Sans', sans-serif;
            font-size: 0.85rem;
            font-weight: 500;
            padding: 0.5rem 0.8rem;
            text-align: center;
            white-space: nowrap;
            text-decoration: none;
            display: block;
            transition: background-color 0.2s ease;
          }

          .dropdown-toggle:focus,
          button.dropdown-toggle:focus {
            background-color: #f0f4f8;
            color: #0E3A60;
            outline: none;
          }

          .dropdown-content {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #ffffff;
            border: 1px solid #2E6FB3;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            min-width: 180px;
            z-index: 10000;
            padding: 0.5rem 0;
            margin-top: 2px;
          }

          /* Dropdown content is controlled by React state via inline styles */

          .dropdown-item {
            display: block !important;
            padding: 0.75rem 1rem !important;
            color: #0E3A60 !important;
            text-decoration: none !important;
            font-size: 0.8rem !important;
            font-family: 'Open Sans', sans-serif !important;
            white-space: nowrap !important;
            width: 100% !important;
            box-sizing: border-box !important;
            transition: background-color 0.15s ease !important;
          }

          .dropdown-item:hover,
          .dropdown-item:focus {
            background-color: #f0f4f8 !important;
            color: #0E3A60 !important;
            text-decoration: none !important;
          }

          /* Standalone donate button styling */
          .donate-btn {
            background-color: #2E6FB3 !important;
            color: #ffffff !important;
            padding: 0.8rem 1.8rem !important;
            text-decoration: none !important;
            font-weight: 600 !important;
            border-radius: 6px !important;
            font-family: 'Open Sans', sans-serif !important;
            font-size: 1rem !important;
            transition: all 0.3s ease !important;
            border: 2px solid #2E6FB3 !important;
            display: inline-block !important;
            white-space: nowrap !important;
            text-align: center !important;
          }

          .donate-btn:hover,
          .donate-btn:focus {
            background-color: #1e5a8a !important;
            border-color: #1e5a8a !important;
            color: #ffffff !important;
            text-decoration: none !important;
            transform: translateY(-1px) !important;
            box-shadow: 0 2px 8px rgba(46, 111, 179, 0.3) !important;
          }

          /* Mobile - dropdowns handled by mobile menu instead */
          @media (max-width: 768px) {
            .dropdown-wrapper {
              display: none;
            }

            /* Ensure mobile menu doesn't overflow */
            .mobile-menu-link {
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 1.4;
            }

            /* Fix mobile layout boundaries */
            .mobile-dropdown {
              width: 100% !important;
              left: 0 !important;
              right: 0 !important;
              max-width: 100vw !important;
              box-sizing: border-box !important;
              overflow-x: hidden !important;
              position: fixed !important;
              top: 100% !important;
              z-index: 9999 !important;
            }

            /* Ensure header doesn't overflow */
            .header-nav {
              width: 100% !important;
              max-width: 100vw !important;
              overflow: hidden !important;
              box-sizing: border-box !important;
            }

            /* Fix logo container on mobile */
            .logo-container {
              flex-shrink: 1 !important;
              min-width: 0 !important;
              overflow: hidden !important;
            }

            /* Hamburger menu positioning */
            .menu-toggle {
              position: relative !important;
              right: 0 !important;
              flex-shrink: 0 !important;
            }
          }
        `}
      </style>
      <header style={styles.header}>
        <nav style={styles.nav} className="header-nav">
        <div style={styles.logoContainer} className="logo-container">
          <div style={styles.logoIcon}>
            <svg width="60" height="40" viewBox="0 0 60 40" style={styles.logoSvg}>
              {/* Colorado state outline */}
              <path d="M5 8 L55 8 L55 32 L5 32 Z" fill="#2E6FB3" stroke="#0E3A60" strokeWidth="2"/>
              <rect x="8" y="11" width="44" height="18" fill="#0E3A60"/>
              <text x="30" y="22" textAnchor="middle" fill="white" fontSize="8" fontFamily="Arial">CO</text>
            </svg>
          </div>
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={styles.logo}
          >
            <div style={styles.logoText}>
              <div style={styles.logoName}>CINQUE MASON</div>
              <div style={styles.logoTitle}>Congressional Candidate for Colorado District 2</div>
            </div>
          </Link>
        </div>
        {/* Desktop Navigation */}
        {!isMobile && (
          <>
            <ul style={styles.navMenu}>
              {/* Home - only show when not on home page */}
              {location.pathname !== '/' && (
                <li style={styles.navItem}>
                  <Link to="/" style={styles.navLink}>Home</Link>
                </li>
              )}

              {/* About Me Dropdown */}
              <li className="dropdown-wrapper">
                <button
                  className="dropdown-toggle"
                  onClick={(e) => handleDropdownClick('about', e)}
                >
                  About Me ▼
                </button>
                {activeDropdown === 'about' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      backgroundColor: '#ffffff',
                      color: '#0E3A60',
                      padding: '10px 0',
                      zIndex: 999999,
                      border: '2px solid #2E6FB3',
                      borderRadius: '6px',
                      fontSize: '14px',
                      minWidth: '180px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      marginTop: '4px'
                    }}
                  >
                    <Link to="/about" style={{ color: '#0E3A60', display: 'block', padding: '8px 15px', textDecoration: 'none' }}>About Me</Link>
                    <Link to="/my-plan" style={{ color: '#0E3A60', display: 'block', padding: '8px 15px', textDecoration: 'none' }}>My Plan</Link>
                    <Link to="/vision" style={{ color: '#0E3A60', display: 'block', padding: '8px 15px', textDecoration: 'none' }}>Vision</Link>
                  </div>
                )}
              </li>

              {/* The Campaign Dropdown */}
              <li className="dropdown-wrapper">
                <button
                  className="dropdown-toggle"
                  onClick={(e) => handleDropdownClick('campaign', e)}
                >
                  The Campaign ▼
                </button>
                {activeDropdown === 'campaign' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      backgroundColor: '#ffffff',
                      color: '#0E3A60',
                      padding: '10px 0',
                      zIndex: 999999,
                      border: '2px solid #2E6FB3',
                      borderRadius: '6px',
                      fontSize: '14px',
                      minWidth: '200px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      marginTop: '4px'
                    }}
                  >
                    <Link to="/expenditures" style={{ color: '#0E3A60', display: 'block', padding: '8px 15px', textDecoration: 'none' }}>Campaign Expenditures</Link>
                    <a href="https://secure.actblue.com/donate/cd2merch" target="_blank" rel="noopener noreferrer" style={{ color: '#0E3A60', display: 'block', padding: '8px 15px', textDecoration: 'none' }}>Shop</a>
                    <Link to="/road-to-congress" style={{ color: '#0E3A60', display: 'block', padding: '8px 15px', textDecoration: 'none' }}>Road to Congress</Link>
                  </div>
                )}
              </li>

              {/* Get Involved Dropdown */}
              <li className="dropdown-wrapper">
                <button
                  className="dropdown-toggle"
                  onClick={(e) => handleDropdownClick('involved', e)}
                >
                  Get Involved ▼
                </button>
                {activeDropdown === 'involved' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      backgroundColor: '#ffffff',
                      color: '#0E3A60',
                      padding: '10px 0',
                      zIndex: 999999,
                      border: '2px solid #2E6FB3',
                      borderRadius: '6px',
                      fontSize: '14px',
                      minWidth: '180px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      marginTop: '4px'
                    }}
                  >
                    <Link to="/join" style={{ color: '#0E3A60', display: 'block', padding: '8px 15px', textDecoration: 'none' }}>Volunteer</Link>
                    <a href="https://secure.actblue.com/donate/cinqueforcongress" target="_blank" rel="noopener noreferrer" style={{ color: '#0E3A60', display: 'block', padding: '8px 15px', textDecoration: 'none' }}>Donate</a>
                  </div>
                )}
              </li>
            </ul>

            {/* Standalone Donate Button - Far Right */}
            <div style={styles.donateContainer}>
              <a
                href="https://secure.actblue.com/donate/cinqueforcongress"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.donateBtn}
                className="donate-btn"
              >
                Donate
              </a>
            </div>
          </>
        )}

        {/* Mobile Hamburger Menu */}
        {isMobile && (
          <button
            style={{...styles.menuToggle, display: 'flex'}}
            className="menu-toggle"
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
        <div style={styles.mobileDropdown} className="mobile-dropdown">
          <ul style={styles.mobileMenu}>
            {/* Home - always show in mobile */}
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

            {/* About Me Section */}
            <li style={styles.mobileMenuItem}>
              <Link
                to="/about"
                onClick={handleMobileNavClick}
                style={styles.mobileMenuLink}
                className="mobile-menu-link"
              >
                About Me
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

            {/* The Campaign Section */}
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

            {/* Get Involved Section */}
            <li style={styles.mobileMenuItem}>
              <Link
                to="/join"
                onClick={handleMobileNavClick}
                style={styles.mobileMenuLink}
                className="mobile-menu-link"
              >
                Volunteer
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
                Donate
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
    zIndex: 1000,
    borderBottom: '1px solid #D9D9D9',
    width: '100%',
    maxWidth: '100vw',
    boxSizing: 'border-box'
  },
  nav: {
    width: '100%',
    padding: '1.2rem 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '100vw',
    boxSizing: 'border-box'
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
    textDecoration: 'none',
    fontFamily: 'Merriweather, serif'
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  logoName: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#0E3A60',
    lineHeight: '1.1',
    letterSpacing: '1px'
  },
  logoTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#2E6FB3',
    letterSpacing: '0.5px',
    marginTop: '2px'
  },
  navMenu: {
    display: 'flex',
    listStyle: 'none',
    gap: '1rem',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    flex: 1,
    justifyContent: 'flex-end',
    flexWrap: 'nowrap',
    marginRight: '1rem'
  },
  donateContainer: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    marginLeft: '2rem'
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
    borderTop: '2px solid #2E6FB3'
  },
  navItem: {
    listStyle: 'none'
  },

  // New Simple Dropdown Styles
  dropdownWrapper: {
    listStyle: 'none',
    position: 'relative',
    display: 'inline-block'
  },
  dropdownToggle: {
    textDecoration: 'none',
    color: '#0E3A60',
    fontWeight: '500',
    fontSize: '0.85rem',
    fontFamily: 'Open Sans, sans-serif',
    cursor: 'pointer',
    padding: '0.5rem 0.8rem',
    border: '1px solid #2E6FB3',
    borderRadius: '4px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    transition: 'all 0.3s ease'
  },
  dropdownContent: {
    position: 'absolute',
    top: 'calc(100% + 3px)',
    left: '0',
    backgroundColor: '#ffffff',
    border: '1px solid #2E6FB3',
    borderRadius: '4px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    minWidth: '180px',
    zIndex: 9999,
    padding: '0.5rem 0',
    display: 'block !important',
    visibility: 'visible !important',
    opacity: '1 !important',
    transform: 'translateY(0)',
    transition: 'all 0.2s ease-in-out'
  },
  dropdownItem: {
    display: 'block',
    padding: '0.5rem 1rem',
    color: '#0E3A60',
    textDecoration: 'none',
    fontSize: '0.8rem',
    fontFamily: 'Open Sans, sans-serif',
    transition: 'background-color 0.2s ease',
    whiteSpace: 'nowrap',
    borderBottom: 'none'
  },
  navLink: {
    textDecoration: 'none',
    color: '#0E3A60',
    fontWeight: '500',
    fontSize: '0.85rem',
    transition: 'all 0.3s',
    fontFamily: 'Open Sans, sans-serif',
    cursor: 'pointer',
    padding: '0.5rem 0.8rem',
    border: '1px solid #2E6FB3',
    borderRadius: '4px',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    textAlign: 'center'
  },
  donateBtn: {
    backgroundColor: '#2E6FB3',
    color: '#ffffff',
    padding: '0.8rem 1.8rem',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s',
    borderRadius: '6px',
    fontFamily: 'Open Sans, sans-serif',
    flexShrink: 0,
    fontSize: '1rem'
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
    backgroundColor: '#0E3A60',
    margin: '3px 0',
    transition: 'all 0.3s ease',
    display: 'block',
    borderRadius: '2px'
  },
  // Mobile dropdown menu styles
  mobileDropdown: {
    position: 'fixed',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    borderTop: '2px solid #2E6FB3',
    zIndex: 9999,
    animation: 'slideDown 0.3s ease-out',
    maxWidth: '100vw',
    width: '100%',
    boxSizing: 'border-box'
  },
  mobileMenu: {
    listStyle: 'none',
    margin: 0,
    padding: '1rem 0',
    maxHeight: 'calc(100vh - 120px)',
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
    color: '#0E3A60',
    fontWeight: '500',
    fontSize: '1rem',
    fontFamily: 'Open Sans, sans-serif',
    transition: 'all 0.3s ease',
    borderLeft: '4px solid transparent',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    maxWidth: '100%',
    boxSizing: 'border-box'
  },
  mobileDonateBtnLink: {
    display: 'block',
    padding: '1rem 1.5rem',
    textDecoration: 'none',
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '1rem',
    fontFamily: 'Open Sans, sans-serif',
    backgroundColor: '#2E6FB3',
    margin: '1rem 1.5rem',
    borderRadius: '6px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    maxWidth: 'calc(100% - 3rem)',
    boxSizing: 'border-box'
  }
};

export default Header;