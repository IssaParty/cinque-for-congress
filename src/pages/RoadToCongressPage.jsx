import React, { useState, useEffect } from 'react';
import { formSubmission } from '../utils/formSubmission';
import { progressStorage } from '../utils/progressStorage';
import { logger } from '../utils/secureLogger';
import { secureStorage } from '../utils/secureStorage';

const RoadToCongressPage = () => {
  const [endorsements, setEndorsements] = useState([]);
  const [formData, setFormData] = useState({ name: '', city: '', zipCode: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [currentEndorsements, setCurrentEndorsements] = useState(0);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  const endorsementGoal = 1500;
  const progressPercentage = Math.min((currentEndorsements / endorsementGoal) * 100, 100);

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
    const initializeApp = async () => {
      // Generate session ID for tracking
      await formSubmission.generateSessionId();

      // Load progress count from Google Sheets (persistent across deployments)
      loadProgressCount();

      // Load existing endorsements from secure storage for display
      try {
        const savedEndorsements = await secureStorage.getItem('endorsements');
        if (savedEndorsements) {
          setEndorsements(savedEndorsements || []);
        }
      } catch (error) {
        logger.error(error, 'Error loading saved endorsements');
        secureStorage.removeItem('endorsements');
        setEndorsements([]);
      }
    };

    initializeApp();
  }, []);

  const loadProgressCount = async () => {
    try {
      setIsLoadingProgress(true);
      const count = await progressStorage.getCurrentCount();
      setCurrentEndorsements(count);
      logger.debug('Loaded progress count:', count);
    } catch (error) {
      logger.error(error, 'Error loading progress count');
      setCurrentEndorsements(0);
    } finally {
      setIsLoadingProgress(false);
    }
  };

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

        // Save to secure storage for persistence
        await secureStorage.setItem('endorsements', updatedEndorsements);

        // Update the progress count from server response
        if (result.count !== undefined) {
          setCurrentEndorsements(result.count);
          progressStorage.setCachedCount(result.count);
        }

        setFormData({ name: '', city: '', zipCode: '', phone: '', email: '' });
        setSubmissionMessage('Thank you for your endorsement! Your support has been recorded.');
      } else {
        setSubmissionMessage(result.error || 'There was an error submitting your endorsement. Please try again.');
      }
    } catch (error) {
      logger.error(error, 'Submission error');
      setSubmissionMessage('There was an error submitting your endorsement. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={isMobile ? styles.contentPageMobile : styles.contentPage}>
      <div style={isMobile ? styles.pageContainerMobile : styles.pageContainer}>
        <h1 style={isMobile ? styles.pageTitleMobile : styles.pageTitle}>Road to Congress</h1>
        <div style={styles.pageContent}>
          <section style={styles.contentSection}>
            <h2 style={isMobile ? styles.contentSubtitleMobile : styles.contentSubtitle}>The Signatory Route</h2>
            <div style={styles.textContent}>
                <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
                  Which will be our road will be the signatory route. We will have to obtain <strong>1500 verified signatures from registered democrats before March 18th, 2026</strong>. Upon getting those signatures then and only then will we be able to challenge Joe Neguse for the Primary. Where any registered democrat or independent can vote in. Upon getting the democrat and independent vote then we will be the next democratic challenger in this midterm where it is almost a guaranteed win.
                </p>
                <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
                  <strong>Joe Neguse has gone every primary since 2019 unopposed. We plan to change that and defeat him this midterm.</strong>
                </p>
                <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
                  We need help though! We need signatures, votes, volunteers, donations, involvement on social media, and ideas. We need exposure and participation!
                </p>
                <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
                  Upon winning this seat we will have flipped this seat from the hands of corporate agendas and foreign lobbying groups to the hands and voices of Coloradans. <a href="https://www.opensecrets.org/members-of-congress/joseph-neguse/summary?cid=N00041080" target="_blank" rel="noopener noreferrer" style={styles.donateLink}>Click here</a>
                </p>
            </div>
          </section>

          {/* Progress Bar */}
          <section style={styles.progressSection}>
            <h2 style={isMobile ? styles.progressTitleMobile : styles.progressTitle}>Endorsement Progress</h2>
            <div style={isMobile ? styles.progressContainerMobile : styles.progressContainer}>
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${progressPercentage}%`
                  }}
                ></div>
              </div>
              <p style={isMobile ? styles.progressTextMobile : styles.progressText}>
                {isLoadingProgress ?
                  'Loading progress...' :
                  `${currentEndorsements} of ${endorsementGoal} signatures (${Math.round(progressPercentage)}%)`
                }
              </p>
            </div>
          </section>

          {/* Endorsement Form */}
          <section style={styles.formSection}>
            <h2 style={isMobile ? styles.contentSubtitleMobile : styles.contentSubtitle}>Endorse Cinque Mason</h2>
            <p style={isMobile ? styles.formDescriptionMobile : styles.formDescription}>
              Join the growing movement of people endorsing Cinque Mason for Congress. Your voice matters!
            </p>

            <form onSubmit={handleSubmit} style={isMobile ? styles.endorsementFormMobile : styles.endorsementForm}>
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
                <label style={isMobile ? styles.formLabelMobile : styles.formLabel}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={isMobile ? styles.formInputMobile : styles.formInput}
                  placeholder="Enter your phone number (optional)"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={isMobile ? styles.formLabelMobile : styles.formLabel}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={isMobile ? styles.formInputMobile : styles.formInput}
                  placeholder="Enter your email address (optional)"
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


          {/* Business/Union Endorsements */}
          <section style={styles.orgEndorsementsSection}>
            <h2 style={isMobile ? styles.contentSubtitleMobile : styles.contentSubtitle}>Organizational Endorsements</h2>
            <p style={{...(isMobile ? styles.contentTextMobile : styles.contentText), fontStyle: 'italic'}}>Are you an organization? Care to Endorse Us? Email us at Info@cinqueforcongress.com</p>
          </section>


          {/* Political Statement */}
          <section style={styles.statementSection}>
            <div style={styles.statementBox}>
              <p style={isMobile ? styles.boldStatementMobile : styles.boldStatement}>
                <strong>
                  We take no AIPAC money and adamantly oppose U.S. support for Israel and the genocide.
                </strong>
              </p>
            </div>
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
  pageContent: {},
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
  contentText: {
    color: '#4a4a4a',
    lineHeight: '1.8',
    marginBottom: '1rem'
  },
  campaignContent: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start'
  },
  textContent: {
    flex: '2'
  },
  donateLink: {
    color: '#2d5016',
    fontWeight: 'bold',
    textDecoration: 'underline',
    transition: 'color 0.3s ease'
  },
  thermometerContainer: {
    flex: '1',
    minWidth: '200px'
  },
  thermometer: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '2px solid #e2e8f0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  thermometerHeader: {
    textAlign: 'center',
    marginBottom: '1rem'
  },
  thermometerTitle: {
    color: '#2d5016',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: '0 0 0.5rem 0',
    fontFamily: 'Arial, sans-serif'
  },
  thermometerCount: {
    color: '#1e3a5f',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    margin: '0 0 0.25rem 0'
  },
  thermometerPercentage: {
    color: '#6c757d',
    fontSize: '1rem',
    margin: 0
  },
  thermometerBody: {
    position: 'relative',
    height: '200px',
    width: '40px',
    margin: '0 auto',
    backgroundColor: '#e9ecef',
    borderRadius: '20px',
    overflow: 'hidden',
    border: '2px solid #d4a017'
  },
  thermometerFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(to top, #d4a017, #f5d76e)',
    borderRadius: '0 0 18px 18px',
    transition: 'height 0.5s ease-in-out'
  },
  thermometerMarks: {
    position: 'absolute',
    right: '-50px',
    top: 0,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    color: '#6c757d'
  },
  mark: {
    lineHeight: 1
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

  // Daily Counter Styles
  dailyCounterContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem'
  },
  dailyCounterCard: {
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '12px',
    textAlign: 'center',
    border: '3px solid #d4a017',
    boxShadow: '0 4px 15px rgba(212, 160, 23, 0.2)',
    minWidth: '200px'
  },
  dailyCounterNumber: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#2d5016',
    margin: '0 0 0.5rem 0',
    fontFamily: 'Arial, sans-serif'
  },
  dailyCounterLabel: {
    fontSize: '1.1rem',
    color: '#1e3a5f',
    margin: 0,
    fontFamily: 'Arial, sans-serif'
  },

  // Organizational Endorsements Styles
  orgEndorsementsSection: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
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
  },

  // Mobile styles
  contentPageMobile: {
    padding: '2rem 1rem',
    minHeight: '70vh',
    flex: 1,
    backgroundColor: '#fafafa'
  },
  pageContainerMobile: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: '0 0.5rem'
  },
  pageTitleMobile: {
    color: '#2d5016',
    marginBottom: '1.5rem',
    fontSize: '2rem',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    lineHeight: '1.2'
  },
  contentSubtitleMobile: {
    color: '#1e3a5f',
    marginBottom: '0.8rem',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.4rem',
    fontWeight: 'bold'
  },
  contentTextMobile: {
    color: '#4a4a4a',
    lineHeight: '1.7',
    marginBottom: '1rem',
    fontSize: '1rem'
  },
  progressTitleMobile: {
    color: '#1e3a5f',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.3rem',
    textAlign: 'center'
  },
  progressContainerMobile: {
    width: '100%'
  },
  progressTextMobile: {
    textAlign: 'center',
    color: '#4a4a4a',
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  formDescriptionMobile: {
    color: '#4a4a4a',
    lineHeight: '1.5',
    marginBottom: '1.2rem',
    fontSize: '1rem'
  },
  endorsementFormMobile: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
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
  boldStatementMobile: {
    color: '#ffffff',
    fontSize: '1.1rem',
    lineHeight: '1.5',
    margin: 0,
    fontFamily: 'Arial, sans-serif'
  }
};

export default RoadToCongressPage;