import React, { useState, useEffect } from 'react';
import { formSubmission } from '../utils/formSubmission';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const JoinPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    zipCode: '',
    email: '',
    website_url: '' // Honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [mouseEvents, setMouseEvents] = useState([]);

  // Check screen size for responsive design
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // Generate session ID for tracking
    formSubmission.generateSessionId();
    // Track form start time for security
    formSubmission.trackFormStart();

    // Track mouse movements for bot detection
    const handleMouseMove = (e) => {
      setMouseEvents(prev => [...prev.slice(-10), { // Keep last 10 events
        type: 'mousemove',
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      }]);
    };

    const handleClick = (e) => {
      setMouseEvents(prev => [...prev.slice(-10), {
        type: 'click',
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      }]);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Track form interaction for analytics
    if (window.trackFormInteraction) {
      window.trackFormInteraction('join_us');
    }

    // Track campaign event
    if (window.trackCampaignEvent) {
      window.trackCampaignEvent('join_campaign_attempt', {
        'city': formData.city,
        'zipCode': formData.zipCode.substring(0, 3) + 'XX', // Privacy-friendly
        'form_type': 'join_us'
      });
    }

    // Validate form data
    const validationErrors = formSubmission.validateJoinUs(formData);
    if (validationErrors.length > 0) {
      setSubmissionMessage(validationErrors[0]);
      return;
    }

    setIsSubmitting(true);
    setSubmissionMessage('Submitting your information to join our campaign...');

    try {
      // Submit using form method (bypasses CORS) with security data
      const result = await formSubmission.submitForm({
        name: formData.name.trim(),
        city: formData.city.trim(),
        zipCode: formData.zipCode.trim(),
        email: formData.email.trim(),
        website_url: formData.website_url, // Honeypot field
        mouseEvents: JSON.stringify(mouseEvents),
        humanConfirmed: true,
        formInteractionTime: Date.now() - (parseInt(localStorage.getItem('formStartTime')) || Date.now())
      }, 'join_us');

      if (result.success) {
        setFormData({ name: '', city: '', zipCode: '', email: '', website_url: '' });
        setMouseEvents([]); // Clear mouse events
        setSubmissionMessage('Thank you for joining our campaign! Your submission has been recorded and we will be in touch soon with volunteer opportunities.');

        // Track successful campaign signup
        if (window.trackCampaignEvent) {
          window.trackCampaignEvent('join_campaign_success', {
            'engagement_level': 'high',
            'conversion': 'volunteer_signup'
          });
        }
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
    <>
      <Header />
      <main style={isMobile ? styles.formPageMobile : styles.formPage}>
      <div style={isMobile ? styles.formContainerMobile : styles.formContainer}>
        <h1 style={isMobile ? styles.formTitleMobile : styles.formTitle}>Join Our Campaign</h1>
        <p style={isMobile ? styles.formIntroMobile : styles.formIntro}>
          Together, we can bring real change to Colorado's 2nd District. Join our grassroots movement to break corporate power and build a democracy that serves people.
        </p>

        {/* Join Campaign Form */}
        <form onSubmit={handleSubmit} style={isMobile ? styles.volunteerFormMobile : styles.volunteerForm}>
          <div style={styles.formGroup}>
            <label style={isMobile ? styles.formLabelMobile : styles.formLabel}>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={isMobile ? styles.formInputMobile : styles.formInput}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={isMobile ? styles.formLabelMobile : styles.formLabel}>City/Town *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              style={isMobile ? styles.formInputMobile : styles.formInput}
              placeholder="Enter your city or town"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={isMobile ? styles.formLabelMobile : styles.formLabel}>ZIP Code *</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              style={isMobile ? styles.formInputMobile : styles.formInput}
              placeholder="Enter your ZIP code"
              pattern="[0-9]{5}(-[0-9]{4})?"
              required
            />
          </div>


          <div style={styles.formGroup}>
            <label style={isMobile ? styles.formLabelMobile : styles.formLabel}>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={isMobile ? styles.formInputMobile : styles.formInput}
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Honeypot field - hidden from users, bots will fill it */}
          <div style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}>
            <label>Website URL (leave blank)</label>
            <input
              type="text"
              name="website_url"
              value={formData.website_url}
              onChange={handleInputChange}
              tabIndex="-1"
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              ...(isMobile ? styles.submitButtonMobile : styles.submitButton),
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
          <h2 style={isMobile ? styles.sectionTitleMobile : styles.sectionTitle}>Ways to Get Involved</h2>
          <div style={isMobile ? styles.involvementGridMobile : styles.involvementGrid}>
            <div style={isMobile ? styles.involvementItemMobile : styles.involvementItem}>
              <div style={styles.involvementIcon}>🚪</div>
              <h3 style={isMobile ? styles.involvementTitleMobile : styles.involvementTitle}>Canvassing</h3>
              <p style={isMobile ? styles.involvementTextMobile : styles.involvementText}>Talk to voters in your neighborhood about our campaign</p>
            </div>
            <div style={isMobile ? styles.involvementItemMobile : styles.involvementItem}>
              <div style={styles.involvementIcon}>📞</div>
              <h3 style={isMobile ? styles.involvementTitleMobile : styles.involvementTitle}>Community Outreach</h3>
              <p style={isMobile ? styles.involvementTextMobile : styles.involvementText}>Make calls to potential voters from home</p>
            </div>
            <div style={isMobile ? styles.involvementItemMobile : styles.involvementItem}>
              <div style={styles.involvementIcon}>📱</div>
              <h3 style={isMobile ? styles.involvementTitleMobile : styles.involvementTitle}>Digital Organizing</h3>
              <p style={isMobile ? styles.involvementTextMobile : styles.involvementText}>Help spread our message on social media</p>
            </div>
            <div style={isMobile ? styles.involvementItemMobile : styles.involvementItem}>
              <div style={styles.involvementIcon}>🎯</div>
              <h3 style={isMobile ? styles.involvementTitleMobile : styles.involvementTitle}>Events</h3>
              <p style={isMobile ? styles.involvementTextMobile : styles.involvementText}>Help organize and staff campaign events</p>
            </div>
          </div>
        </section>

        {/* Campaign Commitment */}
        <section style={styles.commitmentSection}>
          <h3 style={isMobile ? styles.commitmentTitleMobile : styles.commitmentTitle}>Our Campaign Commitment</h3>
          <div style={isMobile ? styles.commitmentTextMobile : styles.commitmentText}>
            <p><strong>We take no corporate money.</strong> This campaign is funded by people like you.</p>
            <p><strong>We fight for working families.</strong> Our policies serve people, not profits.</p>
            <p><strong>We believe in grassroots power.</strong> Real change comes from organized communities.</p>
          </div>
        </section>
      </div>
      </main>
      <Footer />
    </>
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
  },

  // Mobile styles
  formPageMobile: {
    padding: '2rem 1rem',
    minHeight: '70vh',
    backgroundColor: '#fafafa',
    flex: 1
  },
  formContainerMobile: {
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
  },
  formTitleMobile: {
    color: '#2d5016',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif',
    fontSize: '2rem',
    textAlign: 'center',
    lineHeight: '1.2'
  },
  formIntroMobile: {
    color: '#4a4a4a',
    marginBottom: '1.5rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    textAlign: 'center'
  },
  volunteerFormMobile: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem'
  },
  formLabelMobile: {
    color: '#1e3a5f',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    fontFamily: 'Arial, sans-serif',
    fontSize: '0.95rem'
  },
  formInputMobile: {
    padding: '0.75rem',
    border: '2px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    fontFamily: 'Arial, sans-serif',
    transition: 'border-color 0.3s'
  },
  submitButtonMobile: {
    padding: '1rem 1.5rem',
    backgroundColor: '#d4a017',
    color: '#1e3a5f',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginTop: '0.5rem',
    boxShadow: '0 4px 15px rgba(212, 160, 23, 0.3)',
    width: '100%'
  },
  sectionTitleMobile: {
    color: '#1e3a5f',
    marginBottom: '1.2rem',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.5rem',
    textAlign: 'center'
  },
  involvementGridMobile: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1rem',
    marginTop: '1rem'
  },
  involvementItemMobile: {
    textAlign: 'center',
    padding: '1.2rem 0.8rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '2px solid #e9ecef'
  },
  involvementTitleMobile: {
    color: '#2d5016',
    fontSize: '1rem',
    marginBottom: '0.5rem',
    fontFamily: 'Arial, sans-serif'
  },
  involvementTextMobile: {
    color: '#4a4a4a',
    fontSize: '0.9rem',
    lineHeight: '1.4'
  },
  commitmentTitleMobile: {
    color: '#ffd700',
    marginBottom: '0.8rem',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.3rem',
    textAlign: 'center'
  },
  commitmentTextMobile: {
    color: '#ffffff',
    lineHeight: '1.5',
    fontSize: '0.95rem'
  }
};

export default JoinPage;