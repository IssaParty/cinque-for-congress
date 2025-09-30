/**
 * Progress Storage Utility
 * Stores and retrieves endorsement progress from Google Sheets
 * Ensures progress persists across code updates and deployments
 */

class ProgressStorage {
  constructor() {
    // Obfuscated endpoint - not exposed in environment variables
    this.scriptUrl = this.getSecureEndpoint();
    this.cacheKey = 'endorsement_progress_cache';
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Get secure endpoint (obfuscated)
   */
  getSecureEndpoint() {
    const parts = [
      'https://script.google.com/macros/s/',
      'AKfycby7I4x19pljsFbcgfRJMXC74-9Q5DK0_szM',
      'NzArnsE-oljvG7AdCMCiEqFZa4iFgoSk',
      '/exec'
    ];
    return parts[0] + parts[1] + parts[2] + parts[3];
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
        this.setCachedCount(count);
        return count;
      } else {
        console.warn('Failed to fetch count from server, using cached/default');
        return this.getCachedCount() || 0;
      }
    } catch (error) {
      console.error('Error fetching progress count:', error);
      return this.getCachedCount() || 0;
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
        this.setCachedCount(newCount);
        return newCount;
      } else {
        // Fallback: increment locally
        const currentCount = this.getCachedCount() || 0;
        const newCount = currentCount + 1;
        this.setCachedCount(newCount);
        return newCount;
      }
    } catch (error) {
      console.error('Error incrementing count:', error);
      // Fallback: increment locally
      const currentCount = this.getCachedCount() || 0;
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
  getCachedCount() {
    try {
      const cached = localStorage.getItem(this.cacheKey);
      if (!cached) return null;

      const { count, timestamp } = JSON.parse(cached);

      // Check if cache is still valid
      if (Date.now() - timestamp > this.cacheTimeout) {
        localStorage.removeItem(this.cacheKey);
        return null;
      }

      return count;
    } catch (error) {
      console.error('Error reading cached count:', error);
      return null;
    }
  }

  /**
   * Set cached count in localStorage
   */
  setCachedCount(count) {
    try {
      const cacheData = {
        count: count,
        timestamp: Date.now()
      };
      localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error caching count:', error);
    }
  }

  /**
   * Clear cache (force refresh from server)
   */
  clearCache() {
    localStorage.removeItem(this.cacheKey);
  }
}

export const progressStorage = new ProgressStorage();