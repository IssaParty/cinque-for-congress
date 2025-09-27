import React from 'react';

const EndorsementsPage = () => {
  return (
    <main style={styles.contentPage}>
      <div style={styles.pageContainer}>
        <h1 style={styles.pageTitle}>Endorsements</h1>
        <div style={styles.pageContent}>
          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Community Support</h2>
            <p style={styles.contentText}>
              Coming soon - we are building support from community leaders, organizations, and fellow citizens who believe in our vision for change.
            </p>
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
  }
};

export default EndorsementsPage;