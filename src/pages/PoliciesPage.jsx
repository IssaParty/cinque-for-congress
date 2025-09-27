import React from 'react';
import { Link } from 'react-router-dom';

const PoliciesPage = () => {
  return (
    <main style={styles.contentPage}>
      <div style={styles.pageContainer}>
        <h1 style={styles.pageTitle}>Policy Platform</h1>
        <div style={styles.pageContent}>
          <section style={styles.redirectSection}>
            <h2 style={styles.redirectTitle}>Our Comprehensive Policy Platform</h2>
            <p style={styles.redirectText}>
              We've moved our complete policy platform to provide you with a more comprehensive
              and detailed view of our plans for Colorado's 2nd District.
            </p>
            <p style={styles.redirectText}>
              Our platform covers everything from Free Palestine advocacy to corporate accountability,
              Medicare for All, climate action, workers' rights, and much more.
            </p>
            <Link to="/my-plan" style={styles.redirectButton}>
              View My Complete Plan
            </Link>
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
  redirectSection: {
    textAlign: 'center',
    padding: '3rem 2rem',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    border: '2px solid #d4a017'
  },
  redirectTitle: {
    color: '#1e3a5f',
    marginBottom: '1.5rem',
    fontSize: '2rem',
    fontFamily: 'Arial, sans-serif'
  },
  redirectText: {
    color: '#4a4a4a',
    lineHeight: '1.8',
    marginBottom: '1.5rem',
    fontSize: '1.1rem'
  },
  redirectButton: {
    display: 'inline-block',
    padding: '1rem 2rem',
    backgroundColor: '#2d5016',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    marginTop: '1rem'
  }
};

export default PoliciesPage;