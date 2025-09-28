import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navStyle = mobileMenuOpen
    ? { ...styles.navMenu, ...styles.navMenuActive }
    : styles.navMenu;

  return (
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
        <ul style={navStyle}>
          <li style={styles.navItem}>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              style={styles.navLink}
            >
              Home
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              style={styles.navLink}
            >
              About
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link
              to="/my-plan"
              onClick={() => setMobileMenuOpen(false)}
              style={styles.navLink}
            >
              My Plan
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link
              to="/vision"
              onClick={() => setMobileMenuOpen(false)}
              style={styles.navLink}
            >
              Vision
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link
              to="/expenditures"
              onClick={() => setMobileMenuOpen(false)}
              style={styles.navLink}
            >
              Campaign Expenditures
            </Link>
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
            <Link
              to="/road-to-congress"
              onClick={() => setMobileMenuOpen(false)}
              style={styles.navLink}
            >
              Road to Congress
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link
              to="/ideas"
              onClick={() => setMobileMenuOpen(false)}
              style={styles.navLink}
            >
              Ideas
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link
              to="/join"
              onClick={() => setMobileMenuOpen(false)}
              style={styles.navLink}
            >
              Join Us
            </Link>
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
        <button
          style={styles.menuToggle}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span style={styles.menuToggleSpan}></span>
          <span style={styles.menuToggleSpan}></span>
          <span style={styles.menuToggleSpan}></span>
        </button>
      </nav>
    </header>
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
    padding: 0
  },
  menuToggleSpan: {
    width: '25px',
    height: '3px',
    backgroundColor: '#2d5016',
    margin: '3px 0',
    transition: '0.3s',
    display: 'block'
  }
};

export default Header;