// Simple form submission approach that bypasses CORS issues
// This uses a hidden iframe method that always works with Google Apps Script

export const formSubmission = {
  submitForm: (formData, formType = 'endorsement') => {
    return new Promise((resolve) => {
      // Create a hidden form
      const form = document.createElement('form');
      form.method = 'POST';
      // Obfuscated script URL construction
      const parts = [
        'https://script.google.com/macros/s/',
        process.env.REACT_APP_GOOGLE_SCRIPT_URL?.split('/').pop() || '',
      ];
      const scriptUrl = parts.join('');


      form.action = scriptUrl;
      form.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;visibility:hidden;';

      // Add form fields
      const fields = {
        name: formData.name,
        city: formData.city,
        zipCode: formData.zipCode,
        phone: formData.phone || '',
        email: formData.email || '',
        type: formType, // 'endorsement' or 'join_us'
        source: 'website',
        userAgent: navigator.userAgent.substring(0, 100),
        referrer: document.referrer || 'direct',
        sessionId: sessionStorage.getItem('sessionId') || 'unknown',
        timestamp: new Date().toISOString()
      };


      Object.keys(fields).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
      });

      // Create hidden iframe with obfuscated properties
      const iframe = document.createElement('iframe');
      iframe.name = `f${Date.now()}`;
      form.target = iframe.name;
      iframe.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;visibility:hidden;';

      // Handle response from Google Apps Script
      let responseReceived = false;

      // Listen for postMessage from the iframe (Google Apps Script sends this)
      const messageHandler = (event) => {
        if (event.origin === 'https://n-lu7gxgbhobbozbojcaeycqx4ko5t3hlpwx6euji-0lu-script.googleusercontent.com' ||
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
        }, 2000);
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

      // Add to page and submit with small random delay
      document.body.appendChild(iframe);
      document.body.appendChild(form);

      // Random delay to prevent timing analysis
      setTimeout(() => {
        form.submit();
      }, Math.floor(Math.random() * 100) + 50);
    });
  },

  // Validate form data
  validateForm: (data, formType = 'endorsement') => {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
      errors.push('Full name is required (minimum 2 characters)');
    }

    if (!data.city || data.city.trim().length < 2) {
      errors.push('City is required (minimum 2 characters)');
    }

    if (!data.zipCode || !/^\d{5}(-\d{4})?$/.test(data.zipCode.trim())) {
      errors.push('Valid ZIP code is required (e.g., 12345 or 12345-6789)');
    }

    // Email validation (optional for endorsements, required for join us)
    if (data.email && data.email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
        errors.push('Valid email address is required');
      }
    } else if (formType === 'join_us') {
      errors.push('Email address is required for joining the campaign');
    }


    // Phone validation (optional)
    if (data.phone && data.phone.trim()) {
      if (!/^[\d\s\-\(\)\+]+$/.test(data.phone.trim())) {
        errors.push('Valid phone number is required');
      }
    }

    return errors;
  },

  // Backward compatibility
  validateEndorsement: (data) => {
    return formSubmission.validateForm(data, 'endorsement');
  },

  // Generate cryptographically secure session ID
  generateSessionId: () => {
    // Use crypto.getRandomValues for secure random number generation
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    const randomString = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    const sessionId = 'sess_' + randomString;
    sessionStorage.setItem('sessionId', sessionId);
    return sessionId;
  }
};

export default formSubmission;