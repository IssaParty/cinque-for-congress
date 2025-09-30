/**
 * Progress Storage Utility
 * Stores and retrieves endorsement progress from Google Sheets
 * Ensures progress persists across code updates and deployments
 */

import { logger } from './secureLogger.js';
import { secureStorage } from './secureStorage.js';

class ProgressStorage {
  constructor() {
    // Obfuscated endpoint - not exposed in environment variables
    this.scriptUrl = this.getSecureEndpoint();
    this.cacheKey = 'endorsement_progress_cache';
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

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
  }

  decodePart(encoded) {
    return encoded.map(code => String.fromCharCode(code - 48)).join('');
  }

  /**
   * Get current endorsement count from Google Sheets
   */
  async getCurrentCount() {
    try {
      // First check cache
      const cached = this.getCachedCount();
      if (cached !== null) {
        return cached;
      }

      // Fetch from Google Sheets via Apps Script
      const response = await this.makeRequest('GET_COUNT');

      if (response.success) {
        const count = response.count || 0;
        await this.setCachedCount(count);
        return count;
      } else {
        logger.warn('Failed to fetch count from server, using cached/default');
        return await this.getCachedCount() || 0;
      }
    } catch (error) {
      logger.error(error, 'Error fetching progress count');
      return await this.getCachedCount() || 0;
    }
  }

  /**
   * Increment the progress count by 1
   */
  async incrementCount() {
    try {
      const response = await this.makeRequest('INCREMENT_COUNT');

      if (response.success) {
        const newCount = response.count || 0;
        await this.setCachedCount(newCount);
        return newCount;
      } else {
        // Fallback: increment locally
        const currentCount = await this.getCachedCount() || 0;
        const newCount = currentCount + 1;
        await this.setCachedCount(newCount);
        return newCount;
      }
    } catch (error) {
      logger.error(error, 'Error incrementing count');
      // Fallback: increment locally
      const currentCount = await this.getCachedCount() || 0;
      const newCount = currentCount + 1;
      this.setCachedCount(newCount);
      return newCount;
    }
  }

  /**
   * Make request to Google Apps Script
   */
  async makeRequest(action, data = {}) {
    if (!this.scriptUrl) {
      throw new Error('Google Script URL not configured');
    }

    const formData = new FormData();
    formData.append('action', action);

    // Add any additional data
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    const response = await fetch(this.scriptUrl, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Get cached count from localStorage
   */
  async getCachedCount() {
    try {
      const cached = await secureStorage.getItem(this.cacheKey);
      if (!cached) return null;

      const { count, timestamp } = cached;

      // Check if cache is still valid
      if (Date.now() - timestamp > this.cacheTimeout) {
        secureStorage.removeItem(this.cacheKey);
        return null;
      }

      return count;
    } catch (error) {
      logger.error(error, 'Error reading cached count');
      return null;
    }
  }

  /**
   * Set cached count in localStorage
   */
  async setCachedCount(count) {
    try {
      const cacheData = {
        count: count,
        timestamp: Date.now()
      };
      await secureStorage.setItem(this.cacheKey, cacheData);
    } catch (error) {
      logger.error(error, 'Error caching count');
    }
  }

  /**
   * Clear cache (force refresh from server)
   */
  clearCache() {
    secureStorage.removeItem(this.cacheKey);
  }
}

export const progressStorage = new ProgressStorage();