/**
 * Secure logging utility for production environments
 * Prevents sensitive information exposure in console
 */

const isDevelopment = process.env.NODE_ENV === 'development';

class SecureLogger {
  constructor() {
    this.enabled = isDevelopment;
  }

  log(...args) {
    if (this.enabled) {
      console.log(...args);
    }
  }

  error(error, context = '') {
    if (this.enabled) {
      console.error(context, error);
    } else {
      // In production, handle errors silently without exposing details
      this.reportError(error, context);
    }
  }

  warn(...args) {
    if (this.enabled) {
      console.warn(...args);
    }
  }

  debug(...args) {
    if (this.enabled) {
      console.debug(...args);
    }
  }

  reportError(error, context) {
    // Silent error reporting - could be enhanced with external service
    // Never expose error details in production
    try {
      // Store minimal error info for debugging without exposure
      const errorInfo = {
        timestamp: Date.now(),
        context: context || 'unknown',
        type: error?.name || 'Error'
      };

      // Store in sessionStorage temporarily for debugging
      if (typeof sessionStorage !== 'undefined') {
        const errors = JSON.parse(sessionStorage.getItem('app_errors') || '[]');
        errors.push(errorInfo);
        // Keep only last 5 errors to prevent storage bloat
        sessionStorage.setItem('app_errors', JSON.stringify(errors.slice(-5)));
      }
    } catch (e) {
      // Silent failure - never expose logging errors
    }
  }
}

export const logger = new SecureLogger();