import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hero image - single image display
  const heroImages = [
    {
      src: '/images/WhatsApp Image 2025-10-12 at 17.09.27 (3).jpeg',
      alt: 'Cinque Mason - Official Campaign Photo'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .content-wrapper {
              display: flex !important;
              flex-direction: column !important;
              gap: 1rem !important;
            }

            .main-column {
              width: 100% !important;
              margin-bottom: 1rem !important;
            }

            .sidebar-column {
              width: 100% !important;
            }

            .hero-image-wrapper {
              height: 300px !important;
            }

            .newsletter-section {
              margin: 1rem 0 !important;
            }

            .newsletter-content {
              padding: 1rem !important;
            }

            .newsletter-header {
              flex-direction: column !important;
              align-items: center !important;
              text-align: center !important;
              gap: 1rem !important;
            }

            .newsletter-title {
              font-size: 1.2rem !important;
            }

            .newsletter-button {
              padding: 0.8rem 1.5rem !important;
              font-size: 0.9rem !important;
            }
          }
        `}
      </style>
      <Header />
      <main>
        {/* Campaign Alert Banner */}
        <div style={styles.alertBanner}>
          <div style={styles.container}>
            <p style={styles.alertText}>
              <strong>CAMPAIGN UPDATE:</strong> Our campaign will be gathering signatures January 2nd-March 18th 2026!!!
            </p>
          </div>
        </div>

        {/* Main Content Area - Sanders Two-Column Layout */}
        <div style={styles.mainContent}>
          <div style={styles.container}>
            <div style={styles.contentWrapper} className="content-wrapper">

              {/* Main Content Column */}
              <div style={styles.mainColumn} className="main-column">


                {/* Large Hero Image */}
                <div style={styles.heroContainer}>
                  <div style={styles.heroImageWrapper} className="hero-image-wrapper">
                    <img
                      src={heroImages[0].src}
                      alt={heroImages[0].alt}
                      style={styles.heroImage}
                    />
                  </div>
                </div>

                {/* Newsletter Section */}
                <div style={styles.newsletterSection} className="newsletter-section">
                  <div style={styles.newsletterContent} className="newsletter-content">
                    <div style={styles.newsletterHeader} className="newsletter-header">
                      <div style={styles.substackIcon}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="#FF6719">
                          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.539 24V10.812H1.46zM22.539 0H1.46v2.836h21.08V0z"/>
                        </svg>
                      </div>
                      <div style={styles.newsletterInfo}>
                        <h3 style={styles.newsletterTitle} className="newsletter-title">Read Our Blog</h3>
                        <p style={styles.newsletterDescription}>
                          Get exclusive insights, policy updates, and behind-the-scenes content from the campaign.
                        </p>
                      </div>
                    </div>
                    <a
                      href="https://cinquemason4cd2.substack.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.newsletterButton}
                      className="newsletter-button"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.539 24V10.812H1.46zM22.539 0H1.46v2.836h21.08V0z"/>
                      </svg>
                      Read Our Blog →
                    </a>
                  </div>
                </div>

              </div>

              {/* Sidebar Column */}
              <div style={styles.sidebarColumn} className="sidebar-column">

                {/* Follow Me On Twitter Section */}
                <div style={styles.sidebarSection}>
                  <h3 style={styles.sidebarTitle}>Follow Me On Twitter</h3>
                  <div style={styles.sidebarContent}>
                    <div style={styles.twitterFallback}>
                      <div style={styles.socialIcon}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="#1DA1F2">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </div>
                      <h4 style={styles.socialCallout}>Follow @CinqueForCD2</h4>
                      <p style={styles.socialDescription}>
                        Get the latest campaign updates, policy positions, and behind-the-scenes content from the campaign trail.
                      </p>
                      <a
                        href="https://twitter.com/CinqueForCD2"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.socialButton}
                      >
                        Follow on Twitter →
                      </a>
                    </div>
                  </div>
                </div>

                {/* Follow Me On Facebook Section */}
                <div style={styles.sidebarSection}>
                  <h3 style={styles.sidebarTitle}>Follow Me On Facebook</h3>
                  <div style={styles.sidebarContent}>
                    <div style={styles.facebookFallback}>
                      <div style={styles.socialIcon}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="#1877F2">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </div>
                      <h4 style={styles.socialCallout}>Connect on Facebook</h4>
                      <p style={styles.socialDescription}>
                        Join our community for in-depth policy discussions and grassroots organizing updates.
                      </p>
                      <a
                        href="https://www.facebook.com/share/17P8SZ2EaP/?mibextid=wwXIfr"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.socialButton}
                      >
                        Follow on Facebook →
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

const styles = {
  // Government Alert Banner - Exact Sanders Style
  alertBanner: {
    backgroundColor: '#0E3A60',
    color: '#ffffff',
    padding: '0.75rem 0',
    borderBottom: '3px solid #2E6FB3',
  },

  alertText: {
    fontSize: '0.9rem',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: '500',
    textAlign: 'center',
    margin: '0',
    letterSpacing: '0.3px'
  },

  // Main Content
  mainContent: {
    backgroundColor: '#F5F5F5',
    padding: '2rem 0',
    minHeight: '70vh'
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  },

  contentWrapper: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    alignItems: 'start'
  },

  // Main Column
  mainColumn: {
    backgroundColor: '#ffffff',
    padding: '0',
    borderRadius: '0'
  },

  contentAlert: {
    backgroundColor: '#2E6FB3',
    color: '#ffffff',
    padding: '1rem 1.5rem',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: '600',
    fontSize: '0.9rem',
    letterSpacing: '0.5px'
  },

  // Hero Image Section
  heroContainer: {
    position: 'relative',
    backgroundColor: '#ffffff',
    padding: '0'
  },

  heroImageWrapper: {
    width: '100%',
    height: '450px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center'
  },

  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#ffffff',
    border: 'none',
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px'
  },

  navArrow: {
    fontSize: '30px',
    fontWeight: 'bold'
  },

  // Sidebar Column
  sidebarColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },

  sidebarSection: {
    backgroundColor: '#ffffff',
    border: '1px solid #D9D9D9'
  },

  sidebarTitle: {
    backgroundColor: '#0E3A60',
    color: '#ffffff',
    margin: '0',
    padding: '1rem 1.5rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    fontFamily: 'Open Sans, sans-serif',
    fontStyle: 'italic'
  },

  sidebarContent: {
    padding: '1.5rem'
  },

  twitterLink: {
    color: '#2E6FB3',
    textDecoration: 'underline',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '0.9rem'
  },

  // Facebook Widget
  facebookWidget: {
    padding: '0'
  },

  facebookHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #D9D9D9',
    gap: '0.75rem'
  },

  facebookAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#D9D9D9'
  },

  facebookInfo: {
    flex: 1
  },

  facebookName: {
    fontWeight: '600',
    fontSize: '0.9rem',
    fontFamily: 'Open Sans, sans-serif',
    color: '#0E3A60'
  },

  facebookHandle: {
    fontSize: '0.8rem',
    color: '#666',
    fontFamily: 'Open Sans, sans-serif'
  },

  facebookFollowBtn: {
    backgroundColor: '#2E6FB3',
    color: '#ffffff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontFamily: 'Open Sans, sans-serif',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block'
  },

  facebookPost: {
    padding: '1rem 1.5rem'
  },

  facebookPostImage: {
    width: '100%',
    height: '280px',
    objectFit: 'cover',
    objectPosition: 'center center',
    marginBottom: '1rem'
  },

  facebookPostTitle: {
    color: '#0E3A60',
    fontSize: '1rem',
    fontWeight: '700',
    margin: '0 0 0.5rem 0',
    fontFamily: 'Open Sans, sans-serif'
  },

  facebookPostText: {
    color: '#333',
    fontSize: '0.9rem',
    lineHeight: '1.4',
    margin: '0',
    fontFamily: 'Open Sans, sans-serif'
  },

  // Social Media Fallback Styles
  twitterFallback: {
    textAlign: 'center',
    padding: '2rem 1.5rem'
  },

  facebookFallback: {
    textAlign: 'center',
    padding: '2rem 1.5rem'
  },

  socialIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    display: 'block'
  },

  socialCallout: {
    color: '#0E3A60',
    fontSize: '1.2rem',
    fontWeight: '700',
    margin: '0 0 1rem 0',
    fontFamily: 'Open Sans, sans-serif'
  },

  socialDescription: {
    color: '#333',
    fontSize: '0.9rem',
    lineHeight: '1.5',
    margin: '0 0 1.5rem 0',
    fontFamily: 'Open Sans, sans-serif'
  },

  socialButton: {
    display: 'inline-block',
    backgroundColor: '#2E6FB3',
    color: '#ffffff',
    padding: '0.75rem 1.5rem',
    textDecoration: 'none',
    fontWeight: '600',
    borderRadius: '6px',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease'
  },

  // Newsletter Section Styles
  newsletterSection: {
    backgroundColor: '#ffffff',
    border: '2px solid #FF6719',
    borderRadius: '8px',
    margin: '2rem 0',
    boxShadow: '0 4px 12px rgba(255, 103, 25, 0.1)'
  },

  newsletterContent: {
    padding: '2rem'
  },

  newsletterHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1.5rem',
    marginBottom: '1.5rem'
  },

  substackIcon: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  newsletterInfo: {
    flex: 1
  },

  newsletterTitle: {
    color: '#0E3A60',
    fontSize: '1.5rem',
    fontWeight: '700',
    margin: '0 0 0.75rem 0',
    fontFamily: 'Open Sans, sans-serif'
  },

  newsletterDescription: {
    color: '#333',
    fontSize: '1rem',
    lineHeight: '1.6',
    margin: '0',
    fontFamily: 'Open Sans, sans-serif'
  },

  newsletterButton: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#FF6719',
    color: '#ffffff',
    padding: '1rem 2rem',
    textDecoration: 'none',
    fontWeight: '600',
    borderRadius: '8px',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    border: '2px solid #FF6719',
    boxShadow: '0 2px 8px rgba(255, 103, 25, 0.2)'
  }
};

// Left nav button
styles.leftNavButton = {
  ...styles.navButton,
  left: '0'
};

// Right nav button
styles.rightNavButton = {
  ...styles.navButton,
  right: '0'
};

export default HomePage;