import React, { useEffect } from 'react';

const Analytics = () => {
  useEffect(() => {
    // Google Analytics 4 Configuration
    const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

    // Load Google Analytics script
    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
      // Create script element for gtag
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID, {
        // Enhanced tracking for political campaigns
        send_page_view: true,
        enhanced_measurement: true,

        // Privacy settings - important for political campaigns
        anonymize_ip: true,
        allow_google_signals: false, // Disable advertising features
        allow_ad_personalization_signals: false,

        // Custom parameters for campaign tracking
        custom_map: {
          'custom_parameter_1': 'page_type',
          'custom_parameter_2': 'form_interaction'
        }
      });

      // Track initial page view
      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href
      });

      // Enhanced campaign-specific tracking
      gtag('event', 'campaign_visit', {
        'candidate': 'Cinque Mason',
        'district': 'Colorado-2',
        'party': 'Democratic'
      });
    }

    // Privacy-first alternative tracking (fallback)
    const trackVisit = () => {
      const visitData = {
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        referrer: document.referrer || 'direct',
        userAgent: navigator.userAgent,
        language: navigator.language,
        sessionId: sessionStorage.getItem('sessionId') || 'unknown'
      };

      // Store locally for backup (respect privacy)
      const visits = JSON.parse(localStorage.getItem('campaign_visits') || '[]');
      visits.push(visitData);

      // Keep only last 100 visits to respect storage limits
      if (visits.length > 100) {
        visits.splice(0, visits.length - 100);
      }

      localStorage.setItem('campaign_visits', JSON.stringify(visits));
    };

    trackVisit();

    // Track form interactions for campaign insights
    const trackFormInteraction = (formType) => {
      if (window.gtag) {
        window.gtag('event', 'form_interaction', {
          'form_type': formType,
          'engagement_level': 'high'
        });
      }
    };

    // Make tracking function available globally
    window.trackCampaignEvent = (eventName, parameters = {}) => {
      if (window.gtag) {
        window.gtag('event', eventName, {
          'campaign': 'cinque-for-congress',
          ...parameters
        });
      }
    };

    window.trackFormInteraction = trackFormInteraction;

  }, []);

  return null; // This component doesn't render anything
};

export default Analytics;