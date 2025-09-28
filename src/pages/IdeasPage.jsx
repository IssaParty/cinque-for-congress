import React, { useState, useEffect } from 'react';
import { formSubmission } from '../utils/formSubmission';

const IdeasPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    zipCode: '',
    phone: '',
    email: '',
    idea: '',
    category: 'policy'
  });
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
    const validationErrors = formSubmission.validateForm(formData, 'ideas');
    if (validationErrors.length > 0) {
      setSubmissionMessage(validationErrors[0]);
      return;
    }

    // Additional validation for idea content
    if (!formData.idea || formData.idea.trim().length < 10) {
      setSubmissionMessage('Please provide your idea or suggestion (minimum 10 characters)');
      return;
    }

    setIsSubmitting(true);
    setSubmissionMessage('Submitting your idea...');

    try {
      // Submit using form method (bypasses CORS)
      const result = await formSubmission.submitForm({
        name: formData.name.trim(),
        city: formData.city.trim(),
        zipCode: formData.zipCode.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        idea: formData.idea.trim(),
        category: formData.category
      }, 'ideas');

      if (result.success) {
        setFormData({
          name: '',
          city: '',
          zipCode: '',
          phone: '',
          email: '',
          idea: '',
          category: 'policy'
        });
        setSubmissionMessage('Thank you for sharing your idea! We appreciate your input and will review your submission.');
      } else {
        setSubmissionMessage(result.error || 'There was an error submitting your idea. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionMessage('There was an error submitting your idea. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={styles.formPage}>
      <div style={styles.formContainer}>
        <h1 style={styles.formTitle}>Share Your Ideas</h1>
        <p style={styles.formIntro}>
          Your voice matters! Share your ideas, suggestions, and policy proposals to help shape our campaign and build a better future for Colorado's 2nd District.
        </p>

        {/* Ideas Form */}
        <form onSubmit={handleSubmit} style={styles.ideasForm}>
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
            <label style={styles.formLabel}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.formInput}
              placeholder="Enter your email address (optional)"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              style={styles.formSelect}
              required
            >
              <option value="policy">Policy Suggestion</option>
              <option value="campaign">Campaign Strategy</option>
              <option value="community">Community Initiative</option>
              <option value="environment">Environmental Issue</option>
              <option value="economy">Economic Proposal</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Your Idea or Suggestion *</label>
            <textarea
              name="idea"
              value={formData.idea}
              onChange={handleInputChange}
              style={styles.formTextarea}
              placeholder="Share your idea, policy suggestion, or proposal in detail..."
              rows="6"
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
            {isSubmitting ? 'Submitting...' : 'Submit Your Idea'}
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

        {/* Ideas Guidelines */}
        <section style={styles.guidelinesSection}>
          <h2 style={styles.sectionTitle}>What Kind of Ideas Are We Looking For?</h2>
          <div style={styles.guidelinesGrid}>
            <div style={styles.guidelineItem}>
              <div style={styles.guidelineIcon}>💡</div>
              <h3 style={styles.guidelineTitle}>Policy Proposals</h3>
              <p style={styles.guidelineText}>Specific legislation or policy changes that could benefit our district</p>
            </div>
            <div style={styles.guidelineItem}>
              <div style={styles.guidelineIcon}>🏘️</div>
              <h3 style={styles.guidelineTitle}>Community Solutions</h3>
              <p style={styles.guidelineText}>Local initiatives that address neighborhood or community challenges</p>
            </div>
            <div style={styles.guidelineItem}>
              <div style={styles.guidelineIcon}>🌱</div>
              <h3 style={styles.guidelineTitle}>Environmental Action</h3>
              <p style={styles.guidelineText}>Ideas for protecting our environment and addressing climate change</p>
            </div>
            <div style={styles.guidelineItem}>
              <div style={styles.guidelineIcon}>💼</div>
              <h3 style={styles.guidelineTitle}>Economic Innovation</h3>
              <p style={styles.guidelineText}>Proposals to support workers, small businesses, and economic justice</p>
            </div>
          </div>
        </section>

        {/* Commitment */}
        <section style={styles.commitmentSection}>
          <h3 style={styles.commitmentTitle}>Our Commitment to Your Ideas</h3>
          <div style={styles.commitmentText}>
            <p><strong>We read every submission.</strong> Your ideas help shape our platform and priorities.</p>
            <p><strong>We respond when possible.</strong> While we can't reply to every idea, we aim to acknowledge innovative proposals.</p>
            <p><strong>We give credit where due.</strong> Good ideas that influence our policy will be attributed to community input.</p>
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
  ideasForm: {
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
  formSelect: {
    padding: '0.75rem',
    border: '2px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    fontFamily: 'Arial, sans-serif',
    transition: 'border-color 0.3s',
    backgroundColor: '#ffffff'
  },
  formTextarea: {
    padding: '0.75rem',
    border: '2px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    fontFamily: 'Arial, sans-serif',
    transition: 'border-color 0.3s',
    resize: 'vertical',
    minHeight: '120px'
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

  // Guidelines Section
  guidelinesSection: {
    marginBottom: '3rem'
  },
  sectionTitle: {
    color: '#1e3a5f',
    marginBottom: '1.5rem',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.8rem',
    textAlign: 'center'
  },
  guidelinesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem'
  },
  guidelineItem: {
    textAlign: 'center',
    padding: '1.5rem 1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '2px solid #e9ecef'
  },
  guidelineIcon: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem'
  },
  guidelineTitle: {
    color: '#2d5016',
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
    fontFamily: 'Arial, sans-serif'
  },
  guidelineText: {
    color: '#4a4a4a',
    fontSize: '0.9rem',
    lineHeight: '1.4'
  },

  // Commitment Section
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

export default IdeasPage;