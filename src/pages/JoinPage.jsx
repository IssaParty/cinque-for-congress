import React from 'react';

const JoinPage = () => {
  return (
    <main style={styles.formPage}>
      <div style={styles.formContainer}>
        <h1 style={styles.formTitle}>Join Our Campaign</h1>
        <p style={styles.formIntro}>Together, we can bring real change to Colorado's 2nd District</p>

        <div style={styles.formInstructions}>
          <h3>How to Volunteer:</h3>
          <p>Send an email to <a href="mailto:info@cinqueforcongress.com?subject=VOLUNTEER SIGN UP" style={styles.emailLink}>info@cinqueforcongress.com</a> with:</p>
          <ul style={styles.instructionList}>
            <li>Your name and contact information</li>
            <li>Your ZIP code</li>
            <li>Areas of interest (canvassing, phone banking, events, social media)</li>
            <li>Your availability</li>
          </ul>
          <a
            href="mailto:info@cinqueforcongress.com?subject=VOLUNTEER SIGN UP&body=Name:%0D%0AEmail:%0D%0APhone:%0D%0AZIP Code:%0D%0AVolunteer Interests:%0D%0AMessage:"
            style={styles.btnPrimary}
          >
            Email to Volunteer
          </a>
        </div>
      </div>
    </main>
  );
};

const styles = {
  formPage: {
    padding: '4rem 2rem',
    minHeight: '70vh',
    backgroundColor: '#fafafa',
    flex: 1
  },
  formContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '3rem',
    borderRadius: '8px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
  },
  formTitle: {
    color: '#2d5016',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif'
  },
  formIntro: {
    color: '#4a4a4a',
    marginBottom: '2rem',
    fontSize: '1.1rem'
  },
  formInstructions: {
    marginTop: '2rem'
  },
  instructionList: {
    marginTop: '1rem',
    marginBottom: '2rem',
    paddingLeft: '1.5rem',
    color: '#4a4a4a',
    lineHeight: '1.8'
  },
  emailLink: {
    color: '#ffd700',
    textDecoration: 'none'
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
  }
};

export default JoinPage;