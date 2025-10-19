import React from 'react';

const ExpendituresPage = () => {
  return (
    <>
      
      <main style={styles.contentPage}>
      <div style={styles.pageContainer}>
        <h1 style={styles.pageTitle}>Campaign Expenditures</h1>
        <div style={styles.pageContent}>
          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Financial Transparency</h2>
            <p style={styles.contentText}>
              We believe in complete transparency when it comes to campaign finances. All expenditures and donations will be documented and made publicly available.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Campaign Finance Reports</h2>
            <p style={styles.contentText}>
              Detailed financial reports coming soon. We are committed to showing exactly how every dollar is spent in service of our community.
            </p>
          </section>
        </div>
      </div>
      </main>
      
    </>
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

export default ExpendituresPage;