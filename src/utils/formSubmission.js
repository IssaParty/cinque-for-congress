// Simple form submission approach that bypasses CORS issues
// This uses a hidden iframe method that always works with Google Apps Script

export const formSubmission = {
  submitForm: (formData, formType = 'endorsement') => {
    return new Promise((resolve) => {
      // Create a hidden form
      const form = document.createElement('form');
      form.method = 'POST';
      // Use different script URLs based on form type
      const scriptUrl = formType === 'ideas'
        ? process.env.REACT_APP_IDEAS_SCRIPT_URL
        : process.env.REACT_APP_GOOGLE_SCRIPT_URL;

      console.log('Form submission details:', {
        formType,
        scriptUrl,
        ideasUrl: process.env.REACT_APP_IDEAS_SCRIPT_URL,
        mainUrl: process.env.REACT_APP_GOOGLE_SCRIPT_URL
      });

      form.action = scriptUrl;
      form.target = 'hidden-iframe';
      form.style.display = 'none';

      // Add form fields
      const fields = {
        name: formData.name,
        city: formData.city,
        zipCode: formData.zipCode,
        phone: formData.phone || '',
        email: formData.email || '',
        type: formType, // 'endorsement', 'join_us', or 'ideas'
        source: 'website',
        userAgent: navigator.userAgent.substring(0, 100),
        referrer: document.referrer || 'direct',
        sessionId: sessionStorage.getItem('sessionId') || 'unknown',
        timestamp: new Date().toISOString()
      };

      // Add ideas-specific fields if this is an ideas submission
      if (formType === 'ideas') {
        fields.idea = formData.idea || '';
        fields.category = formData.category || '';
      }

      Object.keys(fields).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
      });

      // Create hidden iframe
      const iframe = document.createElement('iframe');
      iframe.name = 'hidden-iframe';
      iframe.style.display = 'none';

      // Handle response
      iframe.onload = () => {
        setTimeout(() => {
          try {
            if (form && form.parentNode) {
              document.body.removeChild(form);
            }
            if (iframe && iframe.parentNode) {
              document.body.removeChild(iframe);
            }
          } catch (error) {
            console.log('Error removing form elements:', error);
          }
          resolve({ success: true, id: `submission_${Date.now()}` });
        }, 1000);
      };

      iframe.onerror = () => {
        try {
          if (form && form.parentNode) {
            document.body.removeChild(form);
          }
          if (iframe && iframe.parentNode) {
            document.body.removeChild(iframe);
          }
        } catch (error) {
          console.log('Error removing form elements:', error);
        }
        resolve({ success: false, error: 'Submission failed' });
      };

      // Add to page and submit
      document.body.appendChild(iframe);
      document.body.appendChild(form);
      form.submit();
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

    // Email validation (optional for endorsements and ideas, required for join us)
    if (data.email && data.email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
        errors.push('Valid email address is required');
      }
    } else if (formType === 'join_us') {
      errors.push('Email address is required for joining the campaign');
    }

    // Ideas-specific validation
    if (formType === 'ideas') {
      if (!data.idea || data.idea.trim().length < 10) {
        errors.push('Please provide your idea or suggestion (minimum 10 characters)');
      }
      if (!data.category || data.category.trim().length < 1) {
        errors.push('Please select a category for your idea');
      }
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

  // Generate session ID for tracking
  generateSessionId: () => {
    const sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('sessionId', sessionId);
    return sessionId;
  }
};

export default formSubmission;