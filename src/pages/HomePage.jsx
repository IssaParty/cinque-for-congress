import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [newsletterStatus, setNewsletterStatus] = useState('');

  const handleNewsletterSubmit = () => {
    const email = document.getElementById('newsletter-email').value;
    if (email && email.includes('@')) {
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
        ...styles.heroPlatform,
        backgroundImage: `linear-gradient(rgba(212, 160, 23, 0.8), rgba(0, 0, 0, 0.6)), url(/images/boulder-landmark.svg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}>
        <div style={styles.heroPlatformContent}>
          <div style={styles.heroSection}>
            <h1 style={styles.heroTitle}>CINQUE MASON FOR CONGRESS</h1>
            <p style={styles.district}>Colorado's 2nd District</p>
            <p style={styles.tagline}>
              Free Palestine, Crack down on corporations, and Strengthen our democracy
            </p>
            <div style={styles.ctaButtons}>
              <Link to="/join" style={styles.btnPrimary}>
                Join Campaign
              </Link>
            </div>
          </div>

          <div style={styles.platformOverview}>
            <h2 style={styles.platformTitle}>Platform Overview</h2>
            <p style={styles.platformIntro}>
              Real change starts with breaking corporate control and putting people first. We reject special interest money and fight for policies that serve working families, not Wall Street.
            </p>
            <div style={styles.platformGrid}>
              <article style={styles.platformCard}>
                <h3 style={styles.platformCardTitle}>Free Palestine</h3>
                <p style={styles.platformCardText}>End unconditional military aid to Israel and advocate for Palestinian rights and self-determination.</p>
              </article>
              <article style={styles.platformCard}>
                <h3 style={styles.platformCardTitle}>Corporate Accountability</h3>
                <p style={styles.platformCardText}>Break up monopolies, cap CEO salaries, and eliminate corporate influence in our elections.</p>
              </article>
              <article style={styles.platformCard}>
                <h3 style={styles.platformCardTitle}>Democratic Reform</h3>
                <p style={styles.platformCardText}>Implement ranked choice voting, end gerrymandering, and expand voting access for all citizens.</p>
              </article>
              <article style={styles.platformCard}>
                <h3 style={styles.platformCardTitle}>Healthcare as a Right</h3>
                <p style={styles.platformCardText}>Medicare for All to ensure universal healthcare coverage for every American.</p>
              </article>
              <article style={styles.platformCard}>
                <h3 style={styles.platformCardTitle}>Climate Action</h3>
                <p style={styles.platformCardText}>Transition to 100% renewable energy and create green jobs for a sustainable future.</p>
              </article>
              <article style={styles.platformCard}>
                <h3 style={styles.platformCardTitle}>Workers' Rights</h3>
                <p style={styles.platformCardText}>Strengthen unions, raise the minimum wage, and ensure workplace safety and dignity.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.getInvolved}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Get Involved</h2>
          <div style={styles.actionGrid}>
            <article style={styles.actionItem}>
              <div style={styles.actionIcon}>✊</div>
              <h3 style={styles.actionItemTitle}>Volunteer</h3>
              <p style={styles.actionItemText}>Join our grassroots movement and help build change from the ground up</p>
              <Link to="/join" style={styles.actionBtn}>
                Sign Up
              </Link>
            </article>
            <article style={styles.actionItem}>
              <div style={styles.actionIcon}>💰</div>
              <h3 style={styles.actionItemTitle}>Donate</h3>
              <p style={styles.actionItemText}>Support the campaign with a contribution - no amount is too small</p>
              <a
                href="https://secure.actblue.com/donate/cinqueforcongress"
                style={styles.actionBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contribute
              </a>
            </article>
            <article style={styles.actionItem}>
              <div style={styles.actionIcon}>🏠</div>
              <h3 style={styles.actionItemTitle}>Request an Event</h3>
              <p style={styles.actionItemText}>Organize a meet-and-greet or town hall in your community</p>
              <Link to="/request-event" style={styles.actionBtn}>
                Learn More
              </Link>
            </article>
            <article style={styles.actionItem}>
              <div style={styles.actionIcon}>📢</div>
              <h3 style={styles.actionItemTitle}>Spread the Word</h3>
              <p style={styles.actionItemText}>Share our message with friends, family, and neighbors</p>
              <a href="#" style={styles.actionBtn}>Get Materials</a>
            </article>
          </div>
        </div>
      </section>

      <section style={styles.newsletter}>
        <h2 style={styles.newsletterTitle}>Stay Informed</h2>
        <p style={styles.newsletterText}>Receive campaign updates and policy positions</p>
        <div style={styles.newsletterForm}>
          <input
            type="email"
            placeholder="Enter your email address"
            style={styles.newsletterInput}
            id="newsletter-email"
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
        <p style={styles.newsletterDisclaimer}>
          By subscribing, you consent to receive campaign communications.
        </p>
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
  heroPlatformContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    position: 'relative',
    zIndex: 2
  },
  heroSection: {
    textAlign: 'center',
    marginBottom: '4rem'
  },
  heroTitle: {
    fontSize: '3.5rem',
    marginBottom: '0.5rem',
    fontWeight: '700',
    letterSpacing: '-1px',
    fontFamily: 'Arial, sans-serif',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
  },
  district: {
    fontSize: '1.8rem',
    color: '#ffd700',
    marginBottom: '1.5rem',
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
  ctaButtons: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
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
  platformTitle: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '2rem',
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
  platformCard: {
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(10px)',
    padding: '2rem',
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

  // Get Involved Section
  getInvolved: {
    padding: '5rem 2rem',
    backgroundColor: '#fafafa'
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  actionItem: {
    textAlign: 'center',
    padding: '2.5rem 2rem',
    backgroundColor: '#ffffff',
    border: '2px solid #d4a017',
    borderRadius: '8px',
    transition: 'all 0.3s'
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
    transition: 'color 0.3s',
    fontFamily: 'Arial, sans-serif'
  },
  actionItemText: {
    color: '#4a4a4a',
    marginBottom: '1.5rem',
    transition: 'color 0.3s'
  },
  actionBtn: {
    padding: '0.7rem 2rem',
    backgroundColor: '#2d5016',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: '600',
    display: 'inline-block',
    transition: 'all 0.3s',
    fontFamily: 'Arial, sans-serif',
    cursor: 'pointer',
    border: 'none'
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
  }
};

export default HomePage;