import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsive design
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleNewsletterSubmit = () => {
    const email = document.getElementById('newsletter-email').value;
    // Improved email validation with proper regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && emailRegex.test(email.trim())) {
      setNewsletterStatus('Thank you! We\'ll add you to our newsletter list.');
      document.getElementById('newsletter-email').value = '';
      setTimeout(() => setNewsletterStatus(''), 5000);
    } else {
      setNewsletterStatus('Please enter a valid email address.');
      setTimeout(() => setNewsletterStatus(''), 3000);
    }
  };

  return (
    <main>
      <section style={{
        ...(isMobile ? styles.heroPlatformMobile : styles.heroPlatform),
        backgroundImage: `linear-gradient(rgba(212, 160, 23, 0.8), rgba(0, 0, 0, 0.6)), url(/images/boulder-landmark.svg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}>
        <div style={isMobile ? styles.heroPlatformContentMobile : styles.heroPlatformContent}>
          <div style={isMobile ? styles.heroSectionMobile : styles.heroSection}>
            <h1 style={isMobile ? styles.heroTitleMobile : styles.heroTitle}>CINQUE MASON FOR CONGRESS</h1>
            <p style={isMobile ? styles.districtMobile : styles.district}>Colorado's 2nd District</p>
            <p style={isMobile ? styles.taglineMobile : styles.tagline}>
              Free Palestine, Crack down on corporations, and Strengthen our democracy
            </p>
            <div style={isMobile ? styles.ctaButtonsMobile : styles.ctaButtons}>
              <Link to="/join" style={styles.btnPrimary}>
                Join Campaign
              </Link>
            </div>
          </div>

          <div style={isMobile ? styles.platformOverviewMobile : styles.platformOverview}>
            <h2 style={isMobile ? styles.platformTitleMobile : styles.platformTitle}>Platform Overview</h2>
            <p style={styles.platformIntro}>
              No corporate donations. No special interests. Just Colorado's donations and Colorado interests.
            </p>
            <div style={isMobile ? styles.platformGridMobile : styles.platformGrid}>
              <article style={isMobile ? styles.platformCardMobile : styles.platformCard}>
                <h3 style={styles.platformCardTitle}>Corporate Reform</h3>
                <p style={styles.platformCardText}>Crack down on corporate abuse: enact and enforce strong antitrust laws, break up monopolies, and eliminate corporate influence in elections. No more corporate dominance over our economy, our politics, or our communities.</p>
              </article>
              <article style={isMobile ? styles.platformCardMobile : styles.platformCard}>
                <h3 style={styles.platformCardTitle}>Economic Justice</h3>
                <p style={styles.platformCardText}>Innovate beyond failed measures of wealth and GDP: raise quality of life through affordable housing, universal healthcare access, and fair wages. Invest in people, not profits, to build a society where well-being is the true measure of success.</p>
              </article>
              <article style={isMobile ? styles.platformCardMobile : styles.platformCard}>
                <h3 style={styles.platformCardTitle}>Democratic Governance</h3>
                <p style={styles.platformCardText}>Return power to the people: reduce executive overreach, implement transparent budgets, democratize the executive cabinet, and explore direct democracy initiatives. Recognize Native American tribes with legislative representation in Congress and protect their right to self-governance.</p>
              </article>
              <article style={isMobile ? styles.platformCardMobile : styles.platformCard}>
                <h3 style={styles.platformCardTitle}>Environmental Protection</h3>
                <p style={styles.platformCardText}>Protect land, water, and future generations: treat waste management as a fundamental right, invest in nationwide recycling and reuse systems, and clean up industrial and chemical waste. Restore streams, soils, and ecosystems while curbing destructive consumption patterns.</p>
              </article>
              <article style={isMobile ? styles.platformCardMobile : styles.platformCard}>
                <h3 style={styles.platformCardTitle}>Peace & Diplomacy</h3>
                <p style={styles.platformCardText}>End Weaponized Democracies and transactional diplomacy: cut the defense budget, audit military spending, and reinvest in domestic infrastructure. Stop funding Israel's militarism, acknowledge and apologize for the harms of U.S. foreign policy, and make diplomacy rooted in justice — not exploitation — the cornerstone of America's role in the world.</p>
              </article>
              <article style={isMobile ? styles.platformCardMobile : styles.platformCard}>
                <h3 style={styles.platformCardTitle}>Community First</h3>
                <p style={styles.platformCardText}>Put people before profits: support local agriculture, heritage farms, and small businesses against corporate greed. Protect our elders from rising costs, end the war on drugs, address the opioid crisis with compassion, and rebuild a Department of Justice that serves people — not the status quo.</p>
              </article>
            </div>
          </div>

          {/* Get Involved Section - Now part of the same background */}
          <div style={isMobile ? styles.getInvolvedIntegratedMobile : styles.getInvolvedIntegrated}>
            <h2 style={isMobile ? styles.getInvolvedTitleMobile : styles.getInvolvedTitle}>Get Involved</h2>
            <div style={isMobile ? styles.actionGridMobile : styles.actionGrid}>
              <article style={isMobile ? styles.actionItemMobile : styles.actionItem}>
                <div style={styles.actionIcon}>✊</div>
                <h3 style={isMobile ? styles.actionItemTitleMobile : styles.actionItemTitle}>Volunteer</h3>
                <p style={isMobile ? styles.actionItemTextMobile : styles.actionItemText}>Join our grassroots movement and help build change from the ground up</p>
                <Link to="/join" style={styles.actionBtn}>
                  Sign Up
                </Link>
              </article>
              <article style={isMobile ? styles.actionItemMobile : styles.actionItem}>
                <div style={styles.actionIcon}>💰</div>
                <h3 style={isMobile ? styles.actionItemTitleMobile : styles.actionItemTitle}>Donate</h3>
                <p style={isMobile ? styles.actionItemTextMobile : styles.actionItemText}>Support the campaign with a contribution - no amount is too small</p>
                <a
                  href="https://secure.actblue.com/donate/cinqueforcongress"
                  style={styles.actionBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contribute
                </a>
              </article>
            </div>
          </div>

          {/* Newsletter Section - Now part of the same background */}
          <div style={isMobile ? styles.newsletterIntegratedMobile : styles.newsletterIntegrated}>
            <h2 style={isMobile ? styles.newsletterTitleIntegratedMobile : styles.newsletterTitleIntegrated}>Stay Informed</h2>
            <p style={styles.newsletterTextIntegrated}>Receive campaign updates and policy positions</p>
            <div style={isMobile ? styles.newsletterFormMobile : styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email address"
                style={isMobile ? styles.newsletterInputMobile : styles.newsletterInput}
                id="newsletter-email"
              />
              <button
                onClick={handleNewsletterSubmit}
                style={isMobile ? styles.newsletterButtonMobile : styles.newsletterButton}
              >
                Subscribe
              </button>
            </div>
            {newsletterStatus && (
              <p style={styles.newsletterStatus}>
                {newsletterStatus}
              </p>
            )}
            <p style={styles.newsletterDisclaimer}>
              By subscribing, you consent to receive campaign communications.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

const styles = {
  // Hero Section with Static Background
  heroPlatform: {
    color: '#ffffff',
    padding: '5rem 2rem 6rem',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  heroPlatformMobile: {
    color: '#ffffff',
    padding: '3rem 1rem 4rem',
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  heroPlatformContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    position: 'relative',
    zIndex: 2
  },
  heroPlatformContentMobile: {
    maxWidth: '100%',
    margin: '0 auto',
    width: '100%',
    position: 'relative',
    zIndex: 2,
    padding: '0 0.5rem'
  },
  heroSection: {
    textAlign: 'center',
    marginBottom: '4rem'
  },
  heroSectionMobile: {
    textAlign: 'center',
    marginBottom: '2.5rem'
  },
  heroTitle: {
    fontSize: '3.5rem',
    marginBottom: '0.5rem',
    fontWeight: '700',
    letterSpacing: '-1px',
    fontFamily: 'Arial, sans-serif',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
  },
  heroTitleMobile: {
    fontSize: '2.2rem',
    marginBottom: '0.5rem',
    fontWeight: '700',
    letterSpacing: '-1px',
    fontFamily: 'Arial, sans-serif',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    lineHeight: '1.2'
  },
  district: {
    fontSize: '1.8rem',
    color: '#ffd700',
    marginBottom: '1.5rem',
    fontWeight: '500',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
  },
  districtMobile: {
    fontSize: '1.3rem',
    color: '#ffd700',
    marginBottom: '1rem',
    fontWeight: '500',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
  },
  tagline: {
    fontSize: '1.3rem',
    marginBottom: '2.5rem',
    lineHeight: '1.8',
    fontWeight: '400',
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
  },
  taglineMobile: {
    fontSize: '1.1rem',
    marginBottom: '2rem',
    lineHeight: '1.6',
    fontWeight: '400',
    maxWidth: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    padding: '0 0.5rem'
  },
  ctaButtons: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  ctaButtonsMobile: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '0 1rem'
  },
  btnPrimary: {
    padding: '0.9rem 2.5rem',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s',
    display: 'inline-block',
    borderRadius: '4px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.1rem',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: '#d4a017',
    color: '#1e3a5f',
    boxShadow: '0 4px 15px rgba(212, 160, 23, 0.3)'
  },

  // Platform Overview
  platformOverview: {
    paddingTop: '3rem',
    borderTop: '2px solid rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: '8px',
    padding: '3rem',
    backdropFilter: 'blur(10px)'
  },
  platformOverviewMobile: {
    paddingTop: '2rem',
    borderTop: '2px solid rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: '8px',
    padding: '1.5rem',
    backdropFilter: 'blur(10px)',
    margin: '0 0.5rem'
  },
  platformTitle: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#ffd700',
    fontFamily: 'Arial, sans-serif',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
  },
  platformTitleMobile: {
    fontSize: '1.8rem',
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#ffd700',
    fontFamily: 'Arial, sans-serif',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
  },
  platformIntro: {
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto 3rem',
    fontSize: '1.2rem',
    color: 'rgba(255,255,255,0.95)',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
  },
  platformGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  },
  platformGridMobile: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5rem'
  },
  platformCard: {
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(10px)',
    padding: '2rem',
    borderLeft: '4px solid #d4a017',
    borderRadius: '8px',
    transition: 'all 0.3s',
    border: '1px solid rgba(255,255,255,0.2)'
  },
  platformCardMobile: {
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(10px)',
    padding: '1.5rem',
    borderLeft: '4px solid #d4a017',
    borderRadius: '8px',
    transition: 'all 0.3s',
    border: '1px solid rgba(255,255,255,0.2)'
  },
  platformCardTitle: {
    color: '#ffd700',
    marginBottom: '1rem',
    fontSize: '1.4rem',
    fontFamily: 'Arial, sans-serif',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
  },
  platformCardText: {
    color: 'rgba(255,255,255,0.95)',
    lineHeight: '1.7',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
  },

  // Integrated Get Involved Section
  getInvolvedIntegrated: {
    paddingTop: '4rem',
    borderTop: '2px solid rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: '8px',
    padding: '3rem',
    backdropFilter: 'blur(10px)',
    marginTop: '3rem'
  },
  getInvolvedIntegratedMobile: {
    paddingTop: '2.5rem',
    borderTop: '2px solid rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: '8px',
    padding: '1.5rem',
    backdropFilter: 'blur(10px)',
    marginTop: '2rem',
    margin: '2rem 0.5rem 0'
  },
  getInvolvedTitle: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#ffd700',
    fontFamily: 'Arial, sans-serif',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
  },
  getInvolvedTitleMobile: {
    fontSize: '1.8rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#ffd700',
    fontFamily: 'Arial, sans-serif',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
  },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '3rem',
    maxWidth: '800px',
    margin: '0 auto'
  },
  actionItem: {
    textAlign: 'center',
    padding: '3rem 2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '3px solid #d4a017',
    borderRadius: '12px',
    transition: 'all 0.3s',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    backdropFilter: 'blur(10px)'
  },
  actionIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#2d5016'
  },
  actionItemTitle: {
    color: '#2d5016',
    marginBottom: '1rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif'
  },
  actionItemText: {
    color: '#4a4a4a',
    marginBottom: '1.5rem',
    fontSize: '1rem',
    lineHeight: '1.6'
  },
  actionBtn: {
    padding: '0.8rem 2rem',
    backgroundColor: '#2d5016',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: '700',
    fontSize: '1rem',
    display: 'inline-block',
    transition: 'all 0.3s',
    fontFamily: 'Arial, sans-serif',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 15px rgba(45, 80, 22, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },

  // Integrated Newsletter Section
  newsletterIntegrated: {
    paddingTop: '3rem',
    borderTop: '2px solid rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: '8px',
    padding: '3rem',
    backdropFilter: 'blur(10px)',
    marginTop: '3rem',
    textAlign: 'center'
  },
  newsletterTitleIntegrated: {
    fontSize: '2rem',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif',
    color: '#ffd700',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
  },
  newsletterTextIntegrated: {
    marginBottom: '2rem',
    color: 'rgba(255,255,255,0.95)',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    fontSize: '1.1rem'
  },
  newsletterForm: {
    display: 'flex',
    gap: '1rem',
    maxWidth: '500px',
    margin: '0 auto 2rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  newsletterInput: {
    flex: '1',
    minWidth: '250px',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  newsletterButton: {
    padding: '0.8rem 2rem',
    backgroundColor: '#d4a017',
    color: '#1e3a5f',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontSize: '1rem'
  },
  newsletterStatus: {
    fontSize: '1rem',
    marginTop: '1rem',
    padding: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: 'rgba(255,255,255,0.95)'
  },
  newsletterDisclaimer: {
    fontSize: '0.85rem',
    marginTop: '1rem',
    opacity: '0.9',
    color: 'rgba(255,255,255,0.8)'
  },

  // Get Involved Section
  getInvolved: {
    padding: '5rem 2rem',
    backgroundImage: `linear-gradient(rgba(212, 160, 23, 0.1), rgba(45, 80, 22, 0.3)), url(/images/boulder-flatirons.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  sectionTitle: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#2d5016',
    fontFamily: 'Arial, sans-serif'
  },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '3rem',
    maxWidth: '800px',
    margin: '0 auto'
  },
  actionItem: {
    textAlign: 'center',
    padding: '3.5rem 3rem',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '3px solid #d4a017',
    borderRadius: '12px',
    transition: 'all 0.3s',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    backdropFilter: 'blur(10px)'
  },
  actionIcon: {
    fontSize: '4rem',
    marginBottom: '1.5rem',
    color: '#2d5016'
  },
  actionItemTitle: {
    color: '#2d5016',
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    transition: 'color 0.3s',
    fontFamily: 'Arial, sans-serif'
  },
  actionItemText: {
    color: '#4a4a4a',
    marginBottom: '2rem',
    fontSize: '1.1rem',
    lineHeight: '1.6',
    transition: 'color 0.3s'
  },
  actionBtn: {
    padding: '1rem 3rem',
    backgroundColor: '#2d5016',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: '700',
    fontSize: '1.2rem',
    display: 'inline-block',
    transition: 'all 0.3s',
    fontFamily: 'Arial, sans-serif',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 15px rgba(45, 80, 22, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },

  // Newsletter Section
  newsletter: {
    backgroundColor: '#2d5016',
    color: '#ffffff',
    padding: '3rem 2rem',
    textAlign: 'center'
  },
  newsletterTitle: {
    fontSize: '2rem',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif'
  },
  newsletterText: {
    marginBottom: '1rem'
  },
  newsletterForm: {
    display: 'flex',
    gap: '1rem',
    maxWidth: '500px',
    margin: '2rem auto',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  newsletterInput: {
    flex: '1',
    minWidth: '250px',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  newsletterButton: {
    padding: '0.8rem 2rem',
    backgroundColor: '#d4a017',
    color: '#1e3a5f',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontSize: '1rem'
  },
  newsletterDisclaimer: {
    fontSize: '0.85rem',
    marginTop: '1rem',
    opacity: '0.9'
  },
  newsletterStatus: {
    fontSize: '1rem',
    marginTop: '1rem',
    padding: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },

  // Mobile styles for all sections
  newsletterIntegratedMobile: {
    paddingTop: '2.5rem',
    borderTop: '2px solid rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: '8px',
    padding: '1.5rem',
    backdropFilter: 'blur(10px)',
    marginTop: '2rem',
    textAlign: 'center',
    margin: '2rem 0.5rem 0'
  },
  newsletterTitleIntegratedMobile: {
    fontSize: '1.6rem',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif',
    color: '#ffd700',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
  },
  newsletterFormMobile: {
    display: 'flex',
    gap: '0.8rem',
    maxWidth: '100%',
    margin: '0 auto 1.5rem',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  newsletterInputMobile: {
    flex: '1',
    minWidth: '100%',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  newsletterButtonMobile: {
    padding: '0.8rem 2rem',
    backgroundColor: '#d4a017',
    color: '#1e3a5f',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontSize: '1rem',
    width: '100%'
  },

  // Mobile-specific action item styles with better contrast (force rebuild)
  actionItemTitleMobile: {
    color: '#ffd700', // Bright gold for better visibility on dark background
    marginBottom: '1rem',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    textShadow: '1px 1px 2px rgba(0,0,0,0.8)' // Strong text shadow for readability
  },
  actionItemTextMobile: {
    color: 'rgba(255,255,255,0.9)', // Light color for good contrast on dark background
    marginBottom: '1.5rem',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    textShadow: '1px 1px 2px rgba(0,0,0,0.6)' // Text shadow for readability
  }
};

export default HomePage;