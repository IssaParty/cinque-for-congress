import React, { useState, useEffect } from 'react';
import { formSubmission } from '../utils/formSubmission';

const JoinPage = () => {
  const [formData, setFormData] = useState({ name: '', city: '', zipCode: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  useEffect(() => {
    // Generate session ID for tracking
    formSubmission.generateSessionId();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = formSubmission.validateForm(formData, 'join_us');
    if (validationErrors.length > 0) {
      setSubmissionMessage(validationErrors[0]);
      return;
    }

    setIsSubmitting(true);
    setSubmissionMessage('Submitting your information...');

    try {
      // Submit using form method (bypasses CORS)
      const result = await formSubmission.submitForm({
        name: formData.name.trim(),
        city: formData.city.trim(),
        zipCode: formData.zipCode.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim()
      }, 'join_us');

      if (result.success) {
        setFormData({ name: '', city: '', zipCode: '', phone: '', email: '' });
        setSubmissionMessage('Thank you for joining our campaign! We will be in touch soon with volunteer opportunities.');
      } else {
        setSubmissionMessage(result.error || 'There was an error submitting your information. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionMessage('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={styles.formPage}>
      <div style={styles.formContainer}>
        <h1 style={styles.formTitle}>Join Our Campaign</h1>
        <p style={styles.formIntro}>
          Together, we can bring real change to Colorado's 2nd District. Join our grassroots movement to break corporate power and build a democracy that serves people.
        </p>

        {/* Join Campaign Form */}
        <form onSubmit={handleSubmit} style={styles.volunteerForm}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={styles.formInput}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>City/Town *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              style={styles.formInput}
              placeholder="Enter your city or town"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>ZIP Code *</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              style={styles.formInput}
              placeholder="Enter your ZIP code"
              pattern="[0-9]{5}(-[0-9]{4})?"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              style={styles.formInput}
              placeholder="Enter your phone number (optional)"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.formInput}
              placeholder="Enter your email address"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              ...styles.submitButton,
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Join the Campaign'}
          </button>

          {submissionMessage && (
            <p style={{
              ...styles.submissionMessage,
              color: submissionMessage.includes('error') || submissionMessage.includes('required') ? '#d32f2f' : '#2e7d32'
            }}>
              {submissionMessage}
            </p>
          )}
        </form>

        {/* Ways to Get Involved */}
        <section style={styles.involvementSection}>
          <h2 style={styles.sectionTitle}>Ways to Get Involved</h2>
          <div style={styles.involvementGrid}>
            <div style={styles.involvementItem}>
              <div style={styles.involvementIcon}>🚪</div>
              <h3 style={styles.involvementTitle}>Canvassing</h3>
              <p style={styles.involvementText}>Talk to voters in your neighborhood about our campaign</p>
            </div>
            <div style={styles.involvementItem}>
              <div style={styles.involvementIcon}>📞</div>
              <h3 style={styles.involvementTitle}>Phone Banking</h3>
              <p style={styles.involvementText}>Make calls to potential voters from home</p>
            </div>
            <div style={styles.involvementItem}>
              <div style={styles.involvementIcon}>📱</div>
              <h3 style={styles.involvementTitle}>Digital Organizing</h3>
              <p style={styles.involvementText}>Help spread our message on social media</p>
            </div>
            <div style={styles.involvementItem}>
              <div style={styles.involvementIcon}>🎯</div>
              <h3 style={styles.involvementTitle}>Events</h3>
              <p style={styles.involvementText}>Help organize and staff campaign events</p>
            </div>
          </div>
        </section>

        {/* Campaign Commitment */}
        <section style={styles.commitmentSection}>
          <h3 style={styles.commitmentTitle}>Our Campaign Commitment</h3>
          <div style={styles.commitmentText}>
            <p><strong>We take no corporate money.</strong> This campaign is funded by people like you.</p>
            <p><strong>We fight for working families.</strong> Our policies serve people, not profits.</p>
            <p><strong>We believe in grassroots power.</strong> Real change comes from organized communities.</p>
          </div>
        </section>
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
    maxWidth: '700px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '3rem',
    borderRadius: '8px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
  },
  formTitle: {
    color: '#2d5016',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif',
    fontSize: '2.5rem',
    textAlign: 'center'
  },
  formIntro: {
    color: '#4a4a4a',
    marginBottom: '2rem',
    fontSize: '1.1rem',
    lineHeight: '1.6',
    textAlign: 'center'
  },

  // Form Styles
  volunteerForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '3rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  formLabel: {
    color: '#1e3a5f',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    fontFamily: 'Arial, sans-serif'
  },
  formInput: {
    padding: '0.75rem',
    border: '2px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    fontFamily: 'Arial, sans-serif',
    transition: 'border-color 0.3s'
  },
  submitButton: {
    padding: '1rem 2rem',
    backgroundColor: '#d4a017',
    color: '#1e3a5f',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginTop: '0.5rem',
    boxShadow: '0 4px 15px rgba(212, 160, 23, 0.3)'
  },
  submissionMessage: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '1rem',
    fontSize: '1rem',
    padding: '1rem',
    borderRadius: '4px',
    backgroundColor: '#f8f9fa'
  },

  // Ways to Get Involved
  involvementSection: {
    marginBottom: '3rem'
  },
  sectionTitle: {
    color: '#1e3a5f',
    marginBottom: '1.5rem',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.8rem',
    textAlign: 'center'
  },
  involvementGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem'
  },
  involvementItem: {
    textAlign: 'center',
    padding: '1.5rem 1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '2px solid #e9ecef'
  },
  involvementIcon: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem'
  },
  involvementTitle: {
    color: '#2d5016',
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
    fontFamily: 'Arial, sans-serif'
  },
  involvementText: {
    color: '#4a4a4a',
    fontSize: '0.9rem',
    lineHeight: '1.4'
  },

  // Campaign Commitment
  commitmentSection: {
    backgroundColor: '#1e3a5f',
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center'
  },
  commitmentTitle: {
    color: '#ffd700',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.5rem'
  },
  commitmentText: {
    color: '#ffffff',
    lineHeight: '1.6'
  }
};

export default JoinPage;