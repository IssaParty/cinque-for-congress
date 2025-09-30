/**
 * Input validation and sanitization for bulletproof security
 * Prevents XSS, injection attacks, and malicious input
 */

import { logger } from './secureLogger.js';

class InputSecurity {
  constructor() {
    this.submissionCount = new Map();
    this.maxSubmissions = 3; // Per hour
    this.timeWindow = 60 * 60 * 1000; // 1 hour in milliseconds
  }

  /**
   * Sanitize user input to prevent XSS and injection attacks
   */
  sanitizeInput(input, type = 'text') {
    if (typeof input !== 'string') {
      return '';
    }

    let sanitized = input;

    // Remove potential script tags and dangerous HTML
    sanitized = sanitized.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    sanitized = sanitized.replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '');
    sanitized = sanitized.replace(/javascript:/gi, '');
    sanitized = sanitized.replace(/data:text\/html/gi, '');
    sanitized = sanitized.replace(/vbscript:/gi, '');
    sanitized = sanitized.replace(/onload\s*=/gi, '');
    sanitized = sanitized.replace(/onerror\s*=/gi, '');
    sanitized = sanitized.replace(/onclick\s*=/gi, '');

    // Type-specific sanitization
    switch (type) {
      case 'email':
        // Allow only valid email characters
        sanitized = sanitized.replace(/[^a-zA-Z0-9@._-]/g, '');
        break;
      case 'name':
        // Allow letters, spaces, hyphens, apostrophes
        sanitized = sanitized.replace(/[^a-zA-Z\s\-']/g, '');
        break;
      case 'phone':
        // Allow numbers, spaces, hyphens, parentheses, plus
        sanitized = sanitized.replace(/[^0-9\s\-\(\)\+\.]/g, '');
        break;
      case 'zipcode':
        // Allow numbers and hyphens only
        sanitized = sanitized.replace(/[^0-9\-]/g, '');
        break;
      case 'city':
        // Allow letters, spaces, hyphens, apostrophes
        sanitized = sanitized.replace(/[^a-zA-Z\s\-']/g, '');
        break;
      default:
        // General text sanitization
        sanitized = sanitized.replace(/[<>]/g, '');
    }

    // Trim and limit length
    sanitized = sanitized.trim().substring(0, 200);

    return sanitized;
  }

  /**
   * Validate input data structure and content
   */
  validateFormData(data, formType = 'endorsement') {
    const errors = [];
    const sanitizedData = {};

    // Required fields validation
    const requiredFields = formType === 'endorsement'
      ? ['name', 'city', 'zipCode']
      : ['name', 'city', 'zipCode', 'email'];

    for (const field of requiredFields) {
      if (!data[field] || typeof data[field] !== 'string') {
        errors.push(`${field} is required`);
        continue;
      }

      const sanitized = this.sanitizeInput(data[field], field);
      if (!sanitized) {
        errors.push(`${field} contains invalid characters`);
        continue;
      }

      sanitizedData[field] = sanitized;
    }

    // Specific validation rules
    if (sanitizedData.name && sanitizedData.name.length < 2) {
      errors.push('Name must be at least 2 characters');
    }

    if (sanitizedData.city && sanitizedData.city.length < 2) {
      errors.push('City must be at least 2 characters');
    }

    if (sanitizedData.zipCode && !/^\d{5}(-\d{4})?$/.test(sanitizedData.zipCode)) {
      errors.push('ZIP code must be in format 12345 or 12345-6789');
    }

    if (sanitizedData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedData.email)) {
      errors.push('Email address is invalid');
    }

    // Optional fields
    if (data.phone) {
      sanitizedData.phone = this.sanitizeInput(data.phone, 'phone');
      if (sanitizedData.phone && !/^[\d\s\-\(\)\+\.]{7,}$/.test(sanitizedData.phone)) {
        errors.push('Phone number is invalid');
      }
    }

    if (data.email && formType === 'endorsement') {
      sanitizedData.email = this.sanitizeInput(data.email, 'email');
      if (sanitizedData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedData.email)) {
        errors.push('Email address is invalid');
      }
    }

    return { errors, sanitizedData };
  }

  /**
   * Rate limiting to prevent spam and abuse
   */
  checkRateLimit(identifier = 'default') {
    const now = Date.now();
    const submissions = this.submissionCount.get(identifier) || [];

    // Remove old submissions outside time window
    const recentSubmissions = submissions.filter(time => now - time < this.timeWindow);

    if (recentSubmissions.length >= this.maxSubmissions) {
      logger.warn('Rate limit exceeded', { identifier, count: recentSubmissions.length });
      return false;
    }

    // Record this submission
    recentSubmissions.push(now);
    this.submissionCount.set(identifier, recentSubmissions);

    return true;
  }

  /**
   * Generate CSRF token for form protection
   */
  generateCSRFToken() {
    try {
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      logger.error(e, 'Failed to generate CSRF token');
      return 'fallback_' + Date.now() + '_' + Math.random().toString(36);
    }
  }

  /**
   * Create honeypot field to detect bots
   */
  createHoneypot() {
    return {
      name: 'website_url', // Common bot target
      value: '',
      style: 'position:absolute;left:-9999px;visibility:hidden;'
    };
  }

  /**
   * Validate honeypot wasn't filled (indicates bot)
   */
  validateHoneypot(honeypotValue) {
    return !honeypotValue || honeypotValue.trim() === '';
  }

  /**
   * Clean up old rate limiting data
   */
  cleanup() {
    const now = Date.now();
    for (const [identifier, submissions] of this.submissionCount.entries()) {
      const recentSubmissions = submissions.filter(time => now - time < this.timeWindow);
      if (recentSubmissions.length === 0) {
        this.submissionCount.delete(identifier);
      } else {
        this.submissionCount.set(identifier, recentSubmissions);
      }
    }
  }
}

export const inputSecurity = new InputSecurity();