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
    // Dynamic URL construction using encoded algorithm
    const base = 'https://';
    const host = ['script', 'google', 'com'].join('.');
    const path = '/macros/s/';

    // Key reconstruction using character manipulation
    const keyParts = [
      this.decodePart([131, 139, 170, 189, 167, 170, 183, 117, 116, 184, 81, 113, 180, 172, 179, 134, 170, 167, 171, 174, 146, 137, 145, 152, 135, 183, 116, 105, 145, 81, 117, 132, 139, 144, 95, 179, 186, 145]),
      this.decodePart([142, 186, 129, 178, 174, 179, 133, 105, 175, 172, 170, 182, 135, 183, 129, 168, 135, 145, 135, 173, 133, 177, 134, 154, 161, 116, 173, 134, 171, 175, 147, 175])
    ];

    return base + host + path + keyParts.join('') + '/exec';
  },

  decodePart(encoded) {
    return encoded.map(code => String.fromCharCode(code - 48)).join('');
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
      const scriptUrl = this.getSecureEndpoint();

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
        timestamp: new Date().toISOString()
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

            // Check if the response indicates success
            const isSuccess = event.data && event.data.toString().includes('SUCCESS');
            resolve({
              success: isSuccess,
              id: `submission_${Date.now()}`,
              message: event.data ? event.data.toString() : 'Form submitted'
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