// Secure form submission approach that bypasses CORS issues
// This uses a hidden iframe method that works with Google Apps Script

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
  submitForm: (formData, formType = 'endorsement') => {
    return new Promise((resolve) => {
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

  generateSessionId: () => {
    if (!sessionStorage.getItem('sessionId')) {
      sessionStorage.setItem('sessionId', 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9));
    }
  },

  validateEndorsement: (data) => {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
      errors.push('Name is required (minimum 2 characters)');
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
    }

    // Phone validation (optional)
    if (data.phone && data.phone.trim()) {
      if (!/^[\d\s\-\(\)\+\.]{7,}$/.test(data.phone.trim())) {
        errors.push('Valid phone number is required');
      }
    }

    return errors;
  },

  validateJoinUs: function(data) {
    const errors = this.validateEndorsement(data);

    // Email is required for join us
    if (!data.email || !data.email.trim()) {
      errors.push('Email address is required for joining the campaign');
    }

    return errors;
  }
};