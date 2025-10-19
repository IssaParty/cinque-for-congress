import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hero image - single image display
  const heroImages = [
    {
      src: '/images/WhatsApp Image 2025-10-12 at 17.09.27 (3).jpeg',
      alt: 'Cinque Mason - Official Campaign Photo'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .content-wrapper {
              display: flex !important;
              flex-direction: column !important;
              gap: 1rem !important;
            }

            .main-column {
              width: 100% !important;
              margin-bottom: 1rem !important;
            }

            .sidebar-column {
              width: 100% !important;
            }

            .hero-image-wrapper {
              height: 300px !important;
            }

            .blog-section {
              margin: 1rem 0 !important;
            }

            .blog-content {
              padding: 1rem !important;
            }

            .blog-header {
              margin-bottom: 1.5rem !important;
            }

            .blog-title {
              font-size: 1.4rem !important;
            }

            .blog-post {
              padding: 1rem !important;
            }

            .blog-post-title {
              font-size: 1.1rem !important;
            }

            .signup-button {
              padding: 0.8rem 1.5rem !important;
              font-size: 0.9rem !important;
            }
          }
        `}
      </style>
      <main>
        {/* Campaign Alert Banner */}
        <div style={styles.alertBanner}>
          <div style={styles.container}>
            <p style={styles.alertText}>
              <strong>CAMPAIGN UPDATE:</strong> Our campaign will be gathering signatures January 2nd-March 18th 2026!!!
            </p>
          </div>
        </div>

        {/* Main Content Area - Sanders Two-Column Layout */}
        <div style={styles.mainContent}>
          <div style={styles.container}>
            <div style={styles.contentWrapper} className="content-wrapper">

              {/* Main Content Column */}
              <div style={styles.mainColumn} className="main-column">


                {/* Large Hero Image */}
                <div style={styles.heroContainer}>
                  <div style={styles.heroImageWrapper} className="hero-image-wrapper">
                    <img
                      src={heroImages[0].src}
                      alt={heroImages[0].alt}
                      style={styles.heroImage}
                    />
                  </div>
                </div>

                {/* Blog Content Section */}
                <div style={styles.blogSection} className="blog-section">
                  <div style={styles.blogContent} className="blog-content">
                    <div style={styles.blogHeader} className="blog-header">
                      <h3 style={styles.blogTitle} className="blog-title">Campaign Blog</h3>
                      <p style={styles.blogDescription}>
                        Stay informed with the latest updates, policy insights, and campaign news.
                      </p>
                    </div>

                    {/* Latest Blog Posts */}
                    <div style={styles.blogPosts}>
                      <article style={styles.blogPost}>
                        <h4 style={styles.blogPostTitle}>
                          <a
                            href="https://cinquemason4cd2.substack.com/p/why-im-running-to-return-power-to"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.blogPostTitleLink}
                          >
                            Why I'm Running: To Return Power to the People
                          </a>
                        </h4>
                        <p style={styles.blogPostDate}>October 06, 2025</p>
                        <p style={styles.blogPostExcerpt}>
                          Cinque Mason is challenging incumbent Joe Neguse in the Democratic primary to restore democracy and challenge corporate control. His platform focuses on pro-union, pro-environment, anti-corruption policies that support workers, families, and marginalized communities while dismantling corporate monopolies.
                        </p>
                        <div style={styles.blogPostTags}>
                          <span style={styles.blogTag}>Democracy</span>
                          <span style={styles.blogTag}>Anti-Corruption</span>
                          <span style={styles.blogTag}>Workers Rights</span>
                        </div>
                      </article>

                      <article style={styles.blogPost}>
                        <h4 style={styles.blogPostTitle}>
                          <a
                            href="https://cinquemason4cd2.substack.com/p/dc-is-occupied-we-must-be-the-ones"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.blogPostTitleLink}
                          >
                            DC is occupied, we must be the ones to fight back
                          </a>
                        </h4>
                        <p style={styles.blogPostDate}>October 06, 2025</p>
                        <p style={styles.blogPostExcerpt}>
                          A call for renewed populist movement that bridges urban and rural divides, focusing on grassroots political engagement and systemic change. The piece argues that both parties are failing the public and emphasizes the need for collective action against corporate interests and autocratic control.
                        </p>
                        <div style={styles.blogPostTags}>
                          <span style={styles.blogTag}>Populism</span>
                          <span style={styles.blogTag}>Grassroots</span>
                          <span style={styles.blogTag}>Political Reform</span>
                        </div>
                      </article>
                    </div>

                    <div style={styles.newsletterSignup}>
                      <p style={styles.signupText}>See what's latest on our blog:</p>
                      <a
                        href="https://cinquemason4cd2.substack.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.signupButton}
                        className="signup-button"
                      >
                        Visit Our Blog →
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              {/* Sidebar Column */}
              <div style={styles.sidebarColumn} className="sidebar-column">

                {/* Twitter Section */}
                <div style={styles.sidebarSection}>
                  <div style={styles.socialHeader}>
                    <svg style={styles.twitterIcon} viewBox="0 0 24 24" fill="#000000">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <h3 style={styles.sidebarTitle}>Follow on X (Twitter)</h3>
                  </div>
                  <div style={styles.sidebarContent}>
                    <a
                      className="twitter-timeline"
                      data-height="400"
                      data-theme="light"
                      href="https://twitter.com/CinqueForCD2?ref_src=twsrc%5Etfw"
                    >
                      Follow @CinqueForCD2
                    </a>
                    <div style={styles.followSection}>
                      <a
                        href="https://twitter.com/CinqueForCD2"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.socialButton}
                      >
                        Follow @CinqueForCD2 →
                      </a>
                    </div>
                  </div>
                </div>

                {/* Facebook Section */}
                <div style={styles.sidebarSection}>
                  <div style={styles.socialHeader}>
                    <svg style={styles.facebookIcon} viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <h3 style={styles.sidebarTitle}>Follow on Facebook</h3>
                  </div>
                  <div style={styles.sidebarContent}>
                    <div
                      className="fb-page"
                      data-href="https://www.facebook.com/share/17P8SZ2EaP/"
                      data-tabs="timeline"
                      data-width="350"
                      data-height="400"
                      data-small-header="false"
                      data-adapt-container-width="true"
                      data-hide-cover="false"
                      data-show-facepile="true"
                    >
                      <blockquote cite="https://www.facebook.com/share/17P8SZ2EaP/" className="fb-xfbml-parse-ignore">
                        <a href="https://www.facebook.com/share/17P8SZ2EaP/">Cinque Mason for Congress</a>
                      </blockquote>
                    </div>
                    <div style={styles.followSection}>
                      <a
                        href="https://www.facebook.com/share/17P8SZ2EaP/?mibextid=wwXIfr"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.socialButton}
                      >
                        Follow on Facebook →
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const styles = {
  // Government Alert Banner - Exact Sanders Style
  alertBanner: {
    backgroundColor: '#0E3A60',
    color: '#ffffff',
    padding: '0.75rem 0',
    borderBottom: '3px solid #2E6FB3',
  },

  alertText: {
    fontSize: '0.9rem',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: '500',
    textAlign: 'center',
    margin: '0',
    letterSpacing: '0.3px'
  },

  // Main Content
  mainContent: {
    backgroundColor: '#F5F5F5',
    padding: '2rem 0',
    minHeight: '70vh'
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  },

  contentWrapper: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    alignItems: 'start'
  },

  // Main Column
  mainColumn: {
    backgroundColor: '#ffffff',
    padding: '0',
    borderRadius: '0'
  },

  contentAlert: {
    backgroundColor: '#2E6FB3',
    color: '#ffffff',
    padding: '1rem 1.5rem',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: '600',
    fontSize: '0.9rem',
    letterSpacing: '0.5px'
  },

  // Hero Image Section
  heroContainer: {
    position: 'relative',
    backgroundColor: '#ffffff',
    padding: '0'
  },

  heroImageWrapper: {
    width: '100%',
    height: '450px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center'
  },

  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#ffffff',
    border: 'none',
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px'
  },

  navArrow: {
    fontSize: '30px',
    fontWeight: 'bold'
  },

  // Sidebar Column
  sidebarColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },

  sidebarSection: {
    backgroundColor: '#ffffff',
    border: '1px solid #D9D9D9'
  },

  sidebarTitle: {
    backgroundColor: '#0E3A60',
    color: '#ffffff',
    margin: '0',
    padding: '1rem 1.5rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    fontFamily: 'Open Sans, sans-serif',
    fontStyle: 'italic'
  },

  socialHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#0E3A60',
    padding: '1rem 1.5rem',
    margin: '0'
  },

  socialIcon: {
    width: '20px',
    height: '20px',
    color: '#ffffff'
  },

  twitterIcon: {
    width: '20px',
    height: '20px',
    color: '#000000'
  },

  facebookIcon: {
    width: '20px',
    height: '20px',
    color: '#1877F2'
  },

  sidebarContent: {
    padding: '1.5rem'
  },

  twitterLink: {
    color: '#2E6FB3',
    textDecoration: 'underline',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '0.9rem'
  },

  // Facebook Widget
  facebookWidget: {
    padding: '0'
  },

  facebookHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #D9D9D9',
    gap: '0.75rem'
  },

  facebookAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#D9D9D9'
  },

  facebookInfo: {
    flex: 1
  },

  facebookName: {
    fontWeight: '600',
    fontSize: '0.9rem',
    fontFamily: 'Open Sans, sans-serif',
    color: '#0E3A60'
  },

  facebookHandle: {
    fontSize: '0.8rem',
    color: '#666',
    fontFamily: 'Open Sans, sans-serif'
  },

  facebookFollowBtn: {
    backgroundColor: '#2E6FB3',
    color: '#ffffff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontFamily: 'Open Sans, sans-serif',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block'
  },

  facebookPost: {
    padding: '1rem 1.5rem'
  },

  facebookPostImage: {
    width: '100%',
    height: '280px',
    objectFit: 'cover',
    objectPosition: 'center center',
    marginBottom: '1rem'
  },

  facebookPostTitle: {
    color: '#0E3A60',
    fontSize: '1rem',
    fontWeight: '700',
    margin: '0 0 0.5rem 0',
    fontFamily: 'Open Sans, sans-serif'
  },

  facebookPostText: {
    color: '#333',
    fontSize: '0.9rem',
    lineHeight: '1.4',
    margin: '0',
    fontFamily: 'Open Sans, sans-serif'
  },

  // Social Media Fallback Styles
  twitterFallback: {
    textAlign: 'center',
    padding: '2rem 1.5rem'
  },

  facebookFallback: {
    textAlign: 'center',
    padding: '2rem 1.5rem'
  },

  socialIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    display: 'block'
  },

  socialCallout: {
    color: '#0E3A60',
    fontSize: '1.2rem',
    fontWeight: '700',
    margin: '0 0 1rem 0',
    fontFamily: 'Open Sans, sans-serif'
  },

  socialDescription: {
    color: '#333',
    fontSize: '0.9rem',
    lineHeight: '1.5',
    margin: '0 0 1.5rem 0',
    fontFamily: 'Open Sans, sans-serif'
  },

  socialButton: {
    display: 'inline-block',
    backgroundColor: '#2E6FB3',
    color: '#ffffff',
    padding: '0.75rem 1.5rem',
    textDecoration: 'none',
    fontWeight: '600',
    borderRadius: '6px',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease'
  },

  followSection: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #E1E8ED',
    textAlign: 'center'
  },

  // Blog Section Styles
  blogSection: {
    backgroundColor: '#ffffff',
    border: '1px solid #D9D9D9',
    borderRadius: '8px',
    margin: '2rem 0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  },

  blogContent: {
    padding: '2rem'
  },

  blogHeader: {
    marginBottom: '2rem',
    borderBottom: '2px solid #0E3A60',
    paddingBottom: '1rem'
  },

  blogTitle: {
    color: '#0E3A60',
    fontSize: '1.75rem',
    fontWeight: '700',
    margin: '0 0 0.75rem 0',
    fontFamily: 'Open Sans, sans-serif'
  },

  blogDescription: {
    color: '#333',
    fontSize: '1rem',
    lineHeight: '1.6',
    margin: '0',
    fontFamily: 'Open Sans, sans-serif'
  },

  blogPosts: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: '2rem'
  },

  blogPost: {
    padding: '1.5rem',
    border: '1px solid #E5E5E5',
    borderRadius: '6px',
    backgroundColor: '#FAFAFA'
  },

  blogPostTitle: {
    color: '#0E3A60',
    fontSize: '1.2rem',
    fontWeight: '600',
    margin: '0 0 0.5rem 0',
    fontFamily: 'Open Sans, sans-serif',
    lineHeight: '1.4'
  },

  blogPostTitleLink: {
    color: '#0E3A60',
    textDecoration: 'none',
    display: 'block',
    transition: 'color 0.3s ease'
  },

  blogPostDate: {
    color: '#666',
    fontSize: '0.85rem',
    margin: '0 0 1rem 0',
    fontFamily: 'Open Sans, sans-serif',
    fontStyle: 'italic'
  },

  blogPostExcerpt: {
    color: '#333',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    margin: '0 0 1rem 0',
    fontFamily: 'Open Sans, sans-serif'
  },

  blogPostTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem'
  },

  blogTag: {
    backgroundColor: '#2E6FB3',
    color: '#ffffff',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: '500'
  },

  newsletterSignup: {
    textAlign: 'center',
    padding: '1.5rem',
    backgroundColor: '#F0F4F8',
    borderRadius: '6px',
    border: '1px solid #D9D9D9'
  },

  signupText: {
    color: '#0E3A60',
    fontSize: '1rem',
    margin: '0 0 1rem 0',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: '600'
  },

  signupButton: {
    display: 'inline-block',
    backgroundColor: '#FF6719',
    color: '#ffffff',
    padding: '0.75rem 1.5rem',
    textDecoration: 'none',
    fontWeight: '600',
    borderRadius: '6px',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    border: '2px solid #FF6719'
  }
};

// Left nav button
styles.leftNavButton = {
  ...styles.navButton,
  left: '0'
};

// Right nav button
styles.rightNavButton = {
  ...styles.navButton,
  right: '0'
};

export default HomePage;