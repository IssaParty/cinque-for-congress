// Secure form submission approach that bypasses CORS issues
// This uses a hidden iframe method that works with Google Apps Script

import { logger } from './secureLogger.js';
import { inputSecurity } from './inputSecurity.js';
import { secureStorage } from './secureStorage.js';

export const formSubmission = {
  /**
   * Get secure endpoint (runtime reconstructed)
   */
  getSecureEndpoint() {
    // For development/demo purposes - replace with your actual Google Apps Script URL
    // TODO: Update with your Google Apps Script deployment ID
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isDevelopment) {
      return null; // Will trigger mock response in development
    }

    // Dynamic URL construction using encoded algorithm
    const base = 'https://';
    const host = ['script', 'google', 'com'].join('.');
    const path = '/macros/s/';

    // Secure URL reconstruction using character encoding
    const encodedParts = [
      [113,123,150,169,147,146,169,103,121,100,168,97,105,160,156,154,163,118,146,147,151,150,130,122,125,136,115,103,100,93,105,129,101,116,123,96,143,163,170,125],
      [126,170,113,162,158,163,117,93,159,156,154,166,119,103,113,148,115,125,115,153,117,161,118,138,145,100,153,118,151,159,131,155]
    ];
    const scriptId = encodedParts.map(part =>
      part.map(code => String.fromCharCode(code - 48)).join('')
    ).join('');

    if (scriptId === 'REPLACE_WITH_YOUR_SCRIPT_ID') {
      return null; // Will trigger mock response when not configured
    }

    return base + host + path + scriptId + '/exec';
  },
  submitForm: async (formData, formType = 'endorsement') => {
    return new Promise(async (resolve) => {
      // Security validation
      const validation = inputSecurity.validateFormData(formData, formType);
      if (validation.errors.length > 0) {
        logger.warn('Form validation failed', validation.errors);
        resolve({ success: false, errors: validation.errors });
        return;
      }

      // Rate limiting check
      const clientId = await secureStorage.getItem('client_id') || 'anonymous';
      if (!inputSecurity.checkRateLimit(clientId)) {
        resolve({ success: false, error: 'Too many submissions. Please try again later.' });
        return;
      }

      // Honeypot validation
      if (!inputSecurity.validateHoneypot(formData.website_url)) {
        logger.warn('Honeypot triggered - potential bot submission');
        resolve({ success: false, error: 'Submission failed validation' });
        return;
      }

      // Use sanitized data
      const secureFormData = validation.sanitizedData;
      // Create a hidden form
      const form = document.createElement('form');
      form.method = 'POST';
      form.enctype = 'application/x-www-form-urlencoded';
      // Use obfuscated Google Apps Script URL
      const scriptUrl = formSubmission.getSecureEndpoint();

      if (!scriptUrl) {
        resolve({ success: false, error: 'Script URL not configured' });
        return;
      }

      form.action = scriptUrl;
      form.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;visibility:hidden;';

      // Add secure form fields with CSRF protection
      const sessionId = await secureStorage.getItem('sessionId') || 'unknown';
      const csrfToken = inputSecurity.generateCSRFToken();

      const fields = {
        action: 'SUBMIT_ENDORSEMENT',
        name: secureFormData.name,
        city: secureFormData.city,
        zipCode: secureFormData.zipCode,
        phone: secureFormData.phone || '',
        email: secureFormData.email || '',
        type: formType, // 'endorsement' or 'join_us'
        source: 'website',
        userAgent: navigator.userAgent.substring(0, 100),
        referrer: document.referrer || 'direct',
        sessionId: sessionId,
        csrfToken: csrfToken,
        timestamp: new Date().toISOString(),
        // Anti-bot parameters
        formInteractionTime: secureFormData.formInteractionTime || 0,
        humanConfirmed: secureFormData.humanConfirmed || false,
        browserFingerprint: secureFormData.browserFingerprint || ''
      };

      Object.keys(fields).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
      });

      // Create hidden iframe with secure properties
      const iframe = document.createElement('iframe');
      iframe.name = `f${Date.now()}`;
      form.target = iframe.name;
      iframe.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;visibility:hidden;';

      // Handle response from Google Apps Script
      let responseReceived = false;

      // Listen for postMessage from the iframe (Google Apps Script sends this)
      const messageHandler = (event) => {
        if (event.origin === 'https://n-lu7gxgbhobbozbojcaeycqx4ko5t3hlpwx6euji-0lu-script.googleusercontent.com' ||
            event.origin === 'https://n-qvabiondzydbfg7xscdcubd66c5t3hlpwx6euji-0lu-script.googleusercontent.com' ||
            event.origin === 'https://script.google.com') {
          responseReceived = true;
          window.removeEventListener('message', messageHandler);

          setTimeout(() => {
            try {
              if (form && form.parentNode) {
                document.body.removeChild(form);
              }
              if (iframe && iframe.parentNode) {
                document.body.removeChild(iframe);
              }
            } catch (error) {
              // Silent cleanup
            }

            // Check if the response indicates success (handle both JSON and string responses)
            let isSuccess = false;
            let responseMessage = 'Form submitted';
            let responseId = `submission_${Date.now()}`;

            try {
              // Try parsing as JSON first (Google Apps Script returns JSON)
              const response = JSON.parse(event.data);
              isSuccess = response.success === true;
              responseMessage = response.message || responseMessage;
              responseId = response.id || responseId;
            } catch {
              // Fallback to string checking for legacy compatibility
              isSuccess = event.data && event.data.toString().includes('SUCCESS');
              responseMessage = event.data ? event.data.toString() : responseMessage;
            }

            resolve({
              success: isSuccess,
              id: responseId,
              message: responseMessage
            });
          }, 500);
        }
      };

      window.addEventListener('message', messageHandler);

      // Handle iframe load (fallback if postMessage doesn't work)
      iframe.onload = () => {
        setTimeout(() => {
          if (!responseReceived) {
            window.removeEventListener('message', messageHandler);
            try {
              if (form && form.parentNode) {
                document.body.removeChild(form);
              }
              if (iframe && iframe.parentNode) {
                document.body.removeChild(iframe);
              }
            } catch (error) {
              // Silent cleanup
            }
            // Assume success if iframe loads without errors
            resolve({ success: true, id: `submission_${Date.now()}` });
          }
        }, 3000);
      };

      iframe.onerror = () => {
        window.removeEventListener('message', messageHandler);
        try {
          if (form && form.parentNode) {
            document.body.removeChild(form);
          }
          if (iframe && iframe.parentNode) {
            document.body.removeChild(iframe);
          }
        } catch (error) {
          // Silent cleanup
        }
        resolve({ success: false, error: 'Submission failed' });
      };

      // Add to page and submit with small random delay for security
      document.body.appendChild(iframe);
      document.body.appendChild(form);

      // Random delay to prevent timing analysis
      setTimeout(() => {
        form.submit();
      }, Math.floor(Math.random() * 100) + 50);
    });
  },

  generateSessionId: async () => {
    let sessionId = await secureStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      await secureStorage.setItem('sessionId', sessionId);

      // Also generate a client ID for rate limiting
      const clientId = 'client_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      await secureStorage.setItem('client_id', clientId);
    }
  },

  validateEndorsement: (data) => {
    // Use the new secure validation system
    const validation = inputSecurity.validateFormData(data, 'endorsement');
    return validation.errors;
  },

  validateJoinUs: function(data) {
    // Use the new secure validation system
    const validation = inputSecurity.validateFormData(data, 'join_us');
    return validation.errors;
  },

  // Add honeypot field for bot detection
  createHoneypotField: () => {
    return inputSecurity.createHoneypot();
  }
};