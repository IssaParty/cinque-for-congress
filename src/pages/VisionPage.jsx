import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VisionPage = () => {
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

  return (
    <main style={isMobile ? styles.contentPageMobile : styles.contentPage}>
        <div style={isMobile ? styles.pageContainerMobile : styles.pageContainer}>
          <h1 style={isMobile ? styles.pageTitleMobile : styles.pageTitle}>Our Vision: A Cleaner, Safer, and Unified Republic</h1>
        <div style={styles.pageContent}>
          <p style={isMobile ? styles.visionIntroMobile : styles.visionIntro}>
            We believe in a society where people come first — where quality of life matters more than the quality of stocks, and where innovation and community drive progress, not corporate greed. Our mission is simple: break the grip of corporations on every aspect of life, restore civil liberties to the people, and build a path toward direct democracy.
          </p>

          <section style={styles.contentSection}>
            <h2 style={isMobile ? styles.contentSubtitleMobile : styles.contentSubtitle}>Corporate Greed: The All-Prevailing Problem</h2>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              Once, our economy thrived on real innovation — people building solutions in their communities and garages. Today, corporations are dominated by speculation, mergers, and buyouts. Real competition has vanished. When a handful of companies control entire industries, markets collapse, alternatives disappear, and everyday Americans bear the cost.
            </p>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              Corporations now control essentials: wood, drywall, eggs, milk, health care — the very basics of shelter, food, and life itself. They profit from our debt, lay off workers when bets fail, and trigger recessions while keeping their gains. When failure hits, taxpayers are forced to bail them out, socializing risk and privatizing reward.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={isMobile ? styles.contentSubtitleMobile : styles.contentSubtitle}>The Costs of Corporate Power</h2>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              <strong>Bailouts and Debt:</strong> Corporate failures are socialized through government intervention, ballooning national debt and threatening future generations.
            </p>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              <strong>Corporate Militarism:</strong> Abroad, the U.S. military has too often served corporate interests, from securing oil to rare minerals, turning our soldiers into foot soldiers for Wall Street.
            </p>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              <strong>Legislative Buyouts:</strong> Citizens United opened the floodgates for corporate spending in politics, producing laws that favor corporations over people.
            </p>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              <strong>The Revolving Door:</strong> Elected officials leave office only to become corporate lobbyists, perpetuating a cycle where accountability is optional.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={isMobile ? styles.contentSubtitleMobile : styles.contentSubtitle}>Restoring Economic Freedom</h2>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              America has a proud tradition of trust-busting:
            </p>
            <ul style={isMobile ? styles.contentListMobile : styles.contentList}>
              <li><strong>Sherman Antitrust Act (1890):</strong> Prohibits monopolies</li>
              <li><strong>Clayton Antitrust Act (1914):</strong> Bans predatory pricing</li>
              <li><strong>FTC Act (1914):</strong> Creates antitrust enforcement</li>
              <li><strong>Robinson-Patman Act (1936):</strong> Stops price discrimination</li>
              <li><strong>Hart-Scott-Rodino Act (1976):</strong> Reviews major acquisitions</li>
            </ul>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              Today, leaders like Lina Khan, Tim Wu, and Congressman Joe Neguse continue this work — but it must go further. Colorado's 2nd District can lead a nationwide effort to break monopolies across industries like agriculture, real estate, healthcare, energy, finance, and technology. Economic freedom is political freedom. Until we reclaim our economy, we cannot reclaim our democracy.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={isMobile ? styles.contentSubtitleMobile : styles.contentSubtitle}>A Path Beyond Politics as Usual</h2>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              This campaign is different. I promise to go after deep, structural change, not incremental fixes. If there is no progress with restoring the balance of power away from DC and back to the people while in congress, then with support from Colorado's 2nd District, I will collaborate with state legislatures to call for a Constitutional Convention, redefining key definitions that have allowed our government to go awry, to force DC to play by our rules not the other way around. This is how we can:
            </p>
            <ul style={isMobile ? styles.contentListMobile : styles.contentList}>
              <li>Restore our quality of life</li>
              <li>Reduce corporate influence over democracy</li>
              <li>Reclaim our right to govern ourselves peacefully and effectively</li>
            </ul>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              This is not a campaign — it's a movement. A diplomatic revolution to restore the government to its rightful place: serving us, the people.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={isMobile ? styles.contentSubtitleMobile : styles.contentSubtitle}>Why Age and Experience Are Strengths, Not Barriers</h2>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              At 25, I bring a unique perspective rooted in service, multidisciplinary learning, and technological fluency. Today, information connects billions globally — yet our governance lags behind. Direct democracy is not a distant dream; it is possible now. With your support, Colorado's 2nd District can pioneer citizen-led voting on laws, budgets, and national priorities.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={isMobile ? styles.contentSubtitleMobile : styles.contentSubtitle}>A Vision for True Representation</h2>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              No single person holds all the answers. True governance empowers communities to decide what works for them. Political experience or insider connections do not define the ability to serve; listening, acting, and enabling others to act do. Our founding fathers designed a system to give the people a voice — it's time to honor that legacy.
            </p>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              We envision a republic that is cleaner, safer, and unified, focused on innovation, fairness, and community, and built to serve everyone — not just corporations. This is the path forward.
            </p>
          </section>

          <div style={styles.callToAction}>
            <h2 style={isMobile ? styles.ctaTitleMobile : styles.ctaTitle}>Join the Movement</h2>
            <p style={isMobile ? styles.ctaTextMobile : styles.ctaText}>
              This campaign represents a fundamental shift from politics as usual. Together, we can restore democratic governance, break corporate strangleholds on our economy, build sustainable communities, and create a government that serves its people.
            </p>
            <Link to="/join" style={styles.btnPrimary}>
              Get Involved
            </Link>
          </div>
        </div>
        </div>
      </main>
  );
};

const styles = {
  contentPage: {
    padding: '4rem 2rem',
    minHeight: '70vh',
    flex: 1
  },
  pageContainer: {
    maxWidth: '900px',
    margin: '0 auto'
  },
  pageTitle: {
    color: '#2d5016',
    marginBottom: '2rem',
    fontSize: '2.5rem',
    fontFamily: 'Arial, sans-serif'
  },
  pageContent: {},
  visionIntro: {
    fontSize: '1.2rem',
    color: '#1e3a5f',
    marginBottom: '2rem',
    textAlign: 'center'
  },
  visionGrid: {
    display: 'grid',
    gap: '2rem',
    margin: '2rem 0'
  },
  visionItem: {
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    borderTop: '4px solid #2d5016',
    boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
  },
  visionItemTitle: {
    color: '#2d5016',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif'
  },
  visionItemText: {
    color: '#4a4a4a',
    lineHeight: '1.8'
  },
  callToAction: {
    textAlign: 'center',
    marginTop: '3rem',
    padding: '2rem',
    backgroundColor: '#fafafa',
    borderRadius: '8px'
  },
  ctaTitle: {
    color: '#2d5016',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif'
  },
  ctaText: {
    color: '#4a4a4a',
    lineHeight: '1.8',
    marginBottom: '1.5rem'
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
  contentSection: {
    marginBottom: '3rem'
  },
  contentSubtitle: {
    color: '#1e3a5f',
    marginTop: '2rem',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.8rem',
    fontWeight: 'bold'
  },
  contentText: {
    color: '#4a4a4a',
    lineHeight: '1.8',
    marginBottom: '1rem',
    fontSize: '1.1rem'
  },
  contentList: {
    color: '#4a4a4a',
    lineHeight: '1.8',
    marginBottom: '1rem',
    paddingLeft: '2rem',
    fontSize: '1rem'
  },
  standForList: {
    color: '#1e3a5f',
    lineHeight: '1.8',
    marginBottom: '2rem',
    paddingLeft: '2rem',
    fontSize: '1.1rem',
    fontWeight: 'bold'
  },

  // Mobile styles
  contentPageMobile: {
    padding: '2rem 1rem',
    minHeight: '70vh',
    flex: 1
  },
  pageContainerMobile: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: '0 0.5rem'
  },
  pageTitleMobile: {
    color: '#2d5016',
    marginBottom: '1.5rem',
    fontSize: '2rem',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    lineHeight: '1.2'
  },
  visionIntroMobile: {
    fontSize: '1.1rem',
    color: '#1e3a5f',
    marginBottom: '1.5rem',
    textAlign: 'center',
    lineHeight: '1.6'
  },
  contentSubtitleMobile: {
    color: '#1e3a5f',
    marginTop: '1.5rem',
    marginBottom: '0.8rem',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.4rem',
    fontWeight: 'bold'
  },
  contentTextMobile: {
    color: '#4a4a4a',
    lineHeight: '1.7',
    marginBottom: '1rem',
    fontSize: '1rem'
  },
  contentListMobile: {
    color: '#4a4a4a',
    lineHeight: '1.7',
    marginBottom: '1rem',
    paddingLeft: '1.5rem',
    fontSize: '0.95rem'
  },
  ctaTitleMobile: {
    color: '#2d5016',
    marginBottom: '0.8rem',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.4rem',
    textAlign: 'center'
  },
  ctaTextMobile: {
    color: '#4a4a4a',
    lineHeight: '1.6',
    marginBottom: '1.2rem',
    fontSize: '1rem'
  }
};

export default VisionPage;