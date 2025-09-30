// Google Sheets Integration for Secure Endorsement Storage
// This approach uses Google Apps Script as a secure backend

import { logger } from './secureLogger.js';

export const googleSheetsStorage = {
  // Your Google Apps Script Web App URL (deploy script as web app)
  SCRIPT_URL: process.env.REACT_APP_GOOGLE_SCRIPT_URL || 'YOUR_GOOGLE_SCRIPT_URL',

  // Submit endorsement to Google Sheets
  submitEndorsement: async (endorsementData) => {
    try {
      // Add timestamp and additional metadata
      const submissionData = {
        ...endorsementData,
        timestamp: new Date().toISOString(),
        source: 'website',
        userAgent: navigator.userAgent.substring(0, 100),
        referrer: document.referrer || 'direct',
        sessionId: sessionStorage.getItem('sessionId') || 'unknown'
      };

      // Submit to Google Apps Script using JSONP-style approach for better CORS handling
      const response = await fetch(googleSheetsStorage.SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
        redirect: 'follow'
      });

      // Google Apps Script might return opaque response due to CORS
      // We'll assume success if no error was thrown
      if (response.type === 'opaque' || response.status === 0) {
        // CORS prevented us from reading the response, but request likely succeeded
        return { success: true, id: `submission_${Date.now()}` };
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      try {
        const result = await response.json();
        if (result.success) {
          return { success: true, id: result.id };
        } else {
          throw new Error(result.error || 'Submission failed');
        }
      } catch (jsonError) {
        // If we can't parse JSON but response was ok, assume success
        return { success: true, id: `submission_${Date.now()}` };
      }

    } catch (error) {
      logger.error('Google Sheets submission error:', error);
      return {
        success: false,
        error: error.message || 'Network error - please try again'
      };
    }
  },

  // Validate endorsement data before submission
  validateEndorsement: (data) => {
    const errors = [];

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Full name is required (minimum 2 characters)');
    }

    // City validation
    if (!data.city || data.city.trim().length < 2) {
      errors.push('City is required (minimum 2 characters)');
    }

    // ZIP code validation (US format)
    if (!data.zipCode || !/^\d{5}(-\d{4})?$/.test(data.zipCode.trim())) {
      errors.push('Valid ZIP code is required (e.g., 12345 or 12345-6789)');
    }

    // Check for potentially harmful content
    const suspiciousPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi
    ];

    const allText = `${data.name} ${data.city} ${data.zipCode}`;
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(allText)) {
        errors.push('Invalid characters detected');
        break;
      }
    }

    return errors;
  },

  // Generate session ID for tracking (privacy-friendly)
  generateSessionId: () => {
    const sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('sessionId', sessionId);
    return sessionId;
  }
};

export default googleSheetsStorage;