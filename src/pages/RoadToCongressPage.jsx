import React from 'react';

const RoadToCongressPage = () => {
  return (
    <main style={styles.contentPage}>
      <div style={styles.pageContainer}>
        <h1 style={styles.pageTitle}>Road to Congress</h1>
        <div style={styles.pageContent}>
          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Our Journey</h2>
            <p style={styles.contentText}>
              The path to Congress is one that requires dedication, community support, and unwavering commitment to the values that will drive real change.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Campaign Milestones</h2>
            <p style={styles.contentText}>
              Follow our progress as we work toward election day, building grassroots support and connecting with communities across the district.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Get Involved</h2>
            <p style={styles.contentText}>
              Every step of this journey requires community involvement. Join us as we work together to bring real representation to Congress.
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

export default RoadToCongressPage;