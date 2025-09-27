import React from 'react';

const PressPage = () => {
  return (
    <main style={styles.contentPage}>
      <div style={styles.pageContainer}>
        <h1 style={styles.pageTitle}>Press & Media</h1>
        <div style={styles.pageContent}>
          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Media Inquiries</h2>
            <p style={styles.contentText}>
              For press inquiries, please contact: <a href="mailto:info@cinqueforcongress.com" style={styles.emailLink}>info@cinqueforcongress.com</a>
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Press Releases</h2>
            <p style={styles.contentText}>Coming soon...</p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Campaign Photos</h2>
            <p style={styles.contentText}>High-resolution photos available upon request.</p>
          </section>
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
  contentSection: {
    marginBottom: '2rem'
  },
  contentSubtitle: {
    color: '#1e3a5f',
    marginTop: '2rem',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif'
  },
  contentText: {
    color: '#4a4a4a',
    lineHeight: '1.8',
    marginBottom: '1rem'
  },
  emailLink: {
    color: '#ffd700',
    textDecoration: 'none'
  }
};

export default PressPage;