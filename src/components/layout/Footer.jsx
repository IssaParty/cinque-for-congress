import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [newsletterStatus, setNewsletterStatus] = useState('');

  const handleNewsletterSubmit = () => {
    const email = document.getElementById('footer-newsletter-email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && emailRegex.test(email.trim())) {
      setNewsletterStatus('Thank you! We\'ll add you to our newsletter list.');
      document.getElementById('footer-newsletter-email').value = '';
      setTimeout(() => setNewsletterStatus(''), 5000);
    } else {
      setNewsletterStatus('Please enter a valid email address.');
      setTimeout(() => setNewsletterStatus(''), 3000);
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>

        {/* Office Locations - Like Sanders */}
        <div style={styles.footerSection}>
          <h4 style={styles.footerTitle}>Campaign Headquarters</h4>
          <div style={styles.officeInfo}>
            <p style={styles.officeAddress}>
              Boulder, Colorado<br/>
              Email: info@cinqueforcongress.com
            </p>
          </div>
        </div>

        {/* Newsletter Signup - Like Sanders */}
        <div style={styles.footerSection}>
          <h4 style={styles.footerTitle}>Stay Updated</h4>
          <p style={styles.newsletterText}>
            Get campaign updates and policy news
          </p>
          <div style={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.newsletterInput}
              id="footer-newsletter-email"
            />
            <button
              onClick={handleNewsletterSubmit}
              style={styles.newsletterButton}
            >
              Subscribe
            </button>
          </div>
          {newsletterStatus && (
            <p style={styles.newsletterStatus}>
              {newsletterStatus}
            </p>
          )}
        </div>

        {/* Social Media - Like Sanders */}
        <div style={styles.footerSection}>
          <h4 style={styles.footerTitle}>Follow Cinque</h4>
          <div style={styles.socialLinks}>
            <a href="https://www.facebook.com/share/17P8SZ2EaP/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span style={styles.socialLabel}>Facebook</span>
            </a>
            <a href="https://x.com/CinqueForCD2" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              <span style={styles.socialLabel}>Twitter</span>
            </a>
            <a href="https://www.instagram.com/cinqueforcongress/" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span style={styles.socialLabel}>Instagram</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div style={styles.footerSection}>
          <h4 style={styles.footerTitle}>Quick Links</h4>
          <ul style={styles.footerLinks}>
            <li>
              <Link to="/about" onClick={() => window.scrollTo(0, 0)} style={styles.footerLink}>
                About Cinque Mason
              </Link>
            </li>
            <li>
              <Link to="/platform" onClick={() => window.scrollTo(0, 0)} style={styles.footerLink}>
                Policy Platform
              </Link>
            </li>
            <li>
              <Link to="/join" onClick={() => window.scrollTo(0, 0)} style={styles.footerLink}>
                Join Campaign
              </Link>
            </li>
            <li>
              <a
                href="https://secure.actblue.com/donate/cinqueforcongress"
                style={styles.footerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contribute
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Legal Disclaimer */}
      <div style={styles.disclaimer}>
        <strong>PAID FOR BY CINQUE MASON FOR CONGRESS</strong><br/>
        Boulder, Colorado<br/>
        No corporate funds accepted. Contributions are not tax deductible.<br/>
        Federal law requires disclosure of contributions exceeding $200.
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#0E3A60',
    color: '#ffffff',
    paddingTop: '3rem',
    marginTop: 'auto'
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  },
  footerSection: {},
  footerTitle: {
    color: '#2E6FB3',
    marginBottom: '1rem',
    fontFamily: 'Merriweather, serif',
    fontSize: '1.3rem',
    fontWeight: '600'
  },
  footerText: {
    color: 'rgba(255,255,255,0.9)',
    lineHeight: '1.8',
    fontFamily: 'Open Sans, sans-serif'
  },

  // Office Address Styling
  officeInfo: {
    marginTop: '1rem'
  },
  officeAddress: {
    color: 'rgba(255,255,255,0.9)',
    lineHeight: '1.6',
    fontFamily: 'Open Sans, sans-serif',
    margin: '0'
  },

  // Newsletter Form Styling
  newsletterText: {
    color: 'rgba(255,255,255,0.9)',
    marginBottom: '1rem',
    fontFamily: 'Open Sans, sans-serif'
  },
  newsletterForm: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
    flexDirection: 'column'
  },
  newsletterInput: {
    padding: '0.7rem',
    border: '1px solid #D9D9D9',
    borderRadius: '4px',
    fontSize: '1rem',
    fontFamily: 'Open Sans, sans-serif',
    backgroundColor: '#ffffff',
    color: '#0E3A60'
  },
  newsletterButton: {
    padding: '0.7rem 1.5rem',
    backgroundColor: '#2E6FB3',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    fontFamily: 'Open Sans, sans-serif'
  },
  newsletterStatus: {
    fontSize: '0.9rem',
    padding: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: 'rgba(255,255,255,0.95)',
    fontFamily: 'Open Sans, sans-serif'
  },

  // Footer Links
  footerLinks: {
    listStyle: 'none',
    padding: 0
  },
  footerLink: {
    color: 'rgba(255,255,255,0.9)',
    textDecoration: 'none',
    lineHeight: '1.8',
    cursor: 'pointer',
    fontFamily: 'Open Sans, sans-serif',
    display: 'block',
    padding: '0.3rem 0',
    transition: 'color 0.3s ease'
  },

  // Social Media Styling
  socialLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    marginTop: '1rem'
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '0.5rem',
    backgroundColor: '#2E6FB3',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '0.9rem'
  },
  socialLabel: {
    fontWeight: '500'
  },

  // Legal Disclaimer
  disclaimer: {
    backgroundColor: '#1a1a1a',
    color: '#D9D9D9',
    textAlign: 'center',
    padding: '1.5rem 2rem',
    fontSize: '0.85rem',
    lineHeight: '1.6',
    fontFamily: 'Open Sans, sans-serif'
  }
};

export default Footer;