import React, { useState, useEffect } from 'react';
import { formSubmission } from '../utils/formSubmission';

const EndorsementsPage = () => {
  const [endorsements, setEndorsements] = useState([]);
  const [formData, setFormData] = useState({ name: '', city: '', zipCode: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const endorsementGoal = 1000;
  const currentEndorsements = endorsements.length;
  const progressPercentage = Math.min((currentEndorsements / endorsementGoal) * 100, 100);

  useEffect(() => {
    // Generate session ID for tracking
    formSubmission.generateSessionId();

    // Load existing endorsements from localStorage for display
    const savedEndorsements = localStorage.getItem('endorsements');
    if (savedEndorsements) {
      try {
        setEndorsements(JSON.parse(savedEndorsements));
      } catch (error) {
        console.error('Error loading saved endorsements:', error);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = formSubmission.validateEndorsement(formData);
    if (validationErrors.length > 0) {
      setSubmissionMessage(validationErrors[0]);
      return;
    }

    setIsSubmitting(true);
    setSubmissionMessage('Submitting your endorsement...');

    try {
      // Submit using form method (bypasses CORS)
      const result = await formSubmission.submitForm({
        name: formData.name.trim(),
        city: formData.city.trim(),
        zipCode: formData.zipCode.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim()
      }, 'endorsement');

      if (result.success) {
        // Add to local display (for immediate feedback)
        const newEndorsement = {
          id: result.id || Date.now(),
          name: formData.name.trim(),
          city: formData.city.trim(),
          zipCode: formData.zipCode.trim(),
          timestamp: new Date().toISOString()
        };

        const updatedEndorsements = [...endorsements, newEndorsement];
        setEndorsements(updatedEndorsements);

        // Save to localStorage for persistence
        localStorage.setItem('endorsements', JSON.stringify(updatedEndorsements));

        setFormData({ name: '', city: '', zipCode: '', phone: '', email: '' });
        setSubmissionMessage('Thank you for your endorsement! Your support has been recorded.');
      } else {
        setSubmissionMessage(result.error || 'There was an error submitting your endorsement. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionMessage('There was an error submitting your endorsement. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={styles.contentPage}>
      <div style={styles.pageContainer}>
        <h1 style={styles.pageTitle}>Endorsements</h1>

        {/* Progress Bar */}
        <section style={styles.progressSection}>
          <h2 style={styles.progressTitle}>Endorsement Progress</h2>
          <div style={styles.progressContainer}>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${progressPercentage}%`
                }}
              ></div>
            </div>
            <p style={styles.progressText}>
              {currentEndorsements} of {endorsementGoal} endorsements ({Math.round(progressPercentage)}%)
            </p>
          </div>
        </section>

        {/* Endorsement Form */}
        <section style={styles.formSection}>
          <h2 style={styles.contentSubtitle}>Endorse Cinque Mason</h2>
          <p style={styles.formDescription}>
            Join the growing movement of people endorsing Cinque Mason for Congress. Your voice matters!
          </p>

          <form onSubmit={handleSubmit} style={styles.endorsementForm}>
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

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                ...styles.submitButton,
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Add My Endorsement'}
            </button>

            {submissionMessage && (
              <p style={{
                ...styles.submissionMessage,
                color: submissionMessage.includes('error') ? '#d32f2f' : '#2e7d32'
              }}>
                {submissionMessage}
              </p>
            )}
          </form>
        </section>

        {/* Real-time Endorsements List */}
        {endorsements.length > 0 && (
          <section style={styles.endorsementsList}>
            <h2 style={styles.contentSubtitle}>Recent Endorsements</h2>
            <div style={styles.endorsementsGrid}>
              {endorsements.slice(-12).reverse().map((endorsement) => (
                <div key={endorsement.id} style={styles.endorsementCard}>
                  <p style={styles.endorsementName}>{endorsement.name}</p>
                  <p style={styles.endorsementLocation}>{endorsement.city}, {endorsement.zipCode}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Business/Union Endorsements */}
        <section style={styles.contentSection}>
          <h2 style={styles.contentSubtitle}>Organizational Endorsements</h2>
          <div style={styles.orgEndorsements}>
            <div style={styles.orgCategory}>
              <h3 style={styles.orgCategoryTitle}>Labor Unions</h3>
              <ul style={styles.orgList}>
                <li>United Food and Commercial Workers Local 7</li>
                <li>Communications Workers of America Local 7777</li>
                <li>Service Employees International Union Local 105</li>
              </ul>
            </div>

            <div style={styles.orgCategory}>
              <h3 style={styles.orgCategoryTitle}>Community Organizations</h3>
              <ul style={styles.orgList}>
                <li>Colorado Progressive Coalition</li>
                <li>Boulder County Democratic Party</li>
                <li>Environmental Action Network</li>
              </ul>
            </div>

            <div style={styles.orgCategory}>
              <h3 style={styles.orgCategoryTitle}>Business Leaders</h3>
              <ul style={styles.orgList}>
                <li>Local Business Alliance for Progressive Change</li>
                <li>Green Business Collective</li>
                <li>Worker-Owned Cooperative Network</li>
              </ul>
            </div>
          </div>
        </section>

        {/* External Form Button */}
        <section style={styles.externalFormSection}>
          <h2 style={styles.contentSubtitle}>Official Endorsement Form</h2>
          <p style={styles.externalFormText}>
            For official endorsement documentation and to be included in campaign materials,
            please complete our comprehensive endorsement form.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf_EXAMPLE_FORM_ID/viewform"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.externalFormButton}
          >
            I want to sign!
          </a>
        </section>

        {/* Political Statement */}
        <section style={styles.statementSection}>
          <div style={styles.statementBox}>
            <p style={styles.boldStatement}>
              <strong>
                We take no AIPAC money and adamantly oppose U.S. support for Israel and the genocide.
              </strong>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

const styles = {
  contentPage: {
    padding: '4rem 2rem',
    minHeight: '70vh',
    flex: 1,
    backgroundColor: '#fafafa'
  },
  pageContainer: {
    maxWidth: '900px',
    margin: '0 auto'
  },
  pageTitle: {
    color: '#2d5016',
    marginBottom: '2rem',
    fontSize: '2.5rem',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center'
  },

  // Progress Bar Styles
  progressSection: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  progressTitle: {
    color: '#1e3a5f',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.5rem',
    textAlign: 'center'
  },
  progressContainer: {
    width: '100%'
  },
  progressBar: {
    width: '100%',
    height: '30px',
    backgroundColor: '#e0e0e0',
    borderRadius: '15px',
    overflow: 'hidden',
    marginBottom: '0.5rem'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2d5016',
    transition: 'width 0.3s ease',
    borderRadius: '15px'
  },
  progressText: {
    textAlign: 'center',
    color: '#4a4a4a',
    fontWeight: 'bold',
    fontSize: '1.1rem'
  },

  // Form Styles
  formSection: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  formDescription: {
    color: '#4a4a4a',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
    fontSize: '1.1rem'
  },
  endorsementForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
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
    fontSize: '1rem'
  },

  // Endorsements List Styles
  endorsementsList: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  endorsementsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginTop: '1rem'
  },
  endorsementCard: {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    borderRadius: '6px',
    borderLeft: '4px solid #2d5016'
  },
  endorsementName: {
    fontWeight: 'bold',
    color: '#1e3a5f',
    margin: '0 0 0.5rem 0',
    fontSize: '1rem'
  },
  endorsementLocation: {
    color: '#666',
    margin: 0,
    fontSize: '0.9rem'
  },

  // Organizational Endorsements Styles
  contentSection: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  contentSubtitle: {
    color: '#1e3a5f',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.8rem',
    fontWeight: 'bold'
  },
  orgEndorsements: {
    display: 'grid',
    gap: '2rem',
    marginTop: '1rem'
  },
  orgCategory: {
    borderLeft: '4px solid #d4a017',
    paddingLeft: '1rem'
  },
  orgCategoryTitle: {
    color: '#2d5016',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.3rem',
    marginBottom: '0.5rem'
  },
  orgList: {
    color: '#4a4a4a',
    lineHeight: '1.8',
    paddingLeft: '1.5rem'
  },

  // External Form Styles
  externalFormSection: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  externalFormText: {
    color: '#4a4a4a',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
    fontSize: '1.1rem'
  },
  externalFormButton: {
    display: 'inline-block',
    padding: '1.5rem 3rem',
    backgroundColor: '#1e3a5f',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    transition: 'all 0.3s',
    boxShadow: '0 6px 20px rgba(30, 58, 95, 0.3)',
    border: '3px solid #d4a017'
  },

  // Statement Styles
  statementSection: {
    marginTop: '3rem'
  },
  statementBox: {
    backgroundColor: '#1e3a5f',
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center',
    border: '3px solid #d4a017'
  },
  boldStatement: {
    color: '#ffffff',
    fontSize: '1.3rem',
    lineHeight: '1.6',
    margin: 0,
    fontFamily: 'Arial, sans-serif'
  }
};

export default EndorsementsPage;