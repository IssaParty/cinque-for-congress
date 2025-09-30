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
    this.syncCheckKey = 'last_sync_check';
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    this.syncInterval = 60 * 60 * 1000; // 1 hour
    this.maxRetries = 3;
    this.retryDelay = 2000; // 2 seconds

    // Start automatic sync monitoring
    this.initializeAutoSync();
  }

  /**
   * Get secure endpoint (runtime reconstructed)
   */
  getSecureEndpoint() {
    // For development/demo purposes - replace with your actual Google Apps Script URL
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isDevelopment) {
      return null; // Will trigger mock response in development
    }

    // Dynamic URL construction using encoded algorithm
    const base = 'https://';
    const host = ['script', 'google', 'com'].join('.');
    const path = '/macros/s/';

    // TODO: Replace with your actual Google Apps Script deployment ID
    const scriptId = 'REPLACE_WITH_YOUR_SCRIPT_ID';

    if (scriptId === 'REPLACE_WITH_YOUR_SCRIPT_ID') {
      return null; // Will trigger mock response when not configured
    }

    return base + host + path + scriptId + '/exec';
  }

  /**
   * Get current endorsement count from Google Sheets
   */
  async getCurrentCount() {
    try {
      // Check if we need to sync
      await this.checkAndPerformSync();

      // First check cache
      const cached = await this.getCachedCount();
      if (cached !== null) {
        return cached;
      }

      // Fetch from Google Sheets via Apps Script with retry logic
      const response = await this.makeRequestWithRetry('GET_COUNT');

      if (response && response.success) {
        const count = response.count || 0;
        await this.setCachedCount(count);
        await this.updateLastSyncTime();
        return count;
      } else {
        logger.warn('Failed to fetch count from server, using fallback');
        // Try to get a reasonable fallback instead of just 0
        const fallback = await this.getFallbackCount();
        return fallback;
      }
    } catch (error) {
      logger.error(error, 'Error fetching progress count');
      const fallback = await this.getFallbackCount();
      return fallback;
    }
  }

  /**
   * Increment the progress count by 1
   */
  async incrementCount() {
    try {
      const response = await this.makeRequestWithRetry('INCREMENT_COUNT');

      if (response && response.success) {
        const newCount = response.count || 0;
        await this.setCachedCount(newCount);
        await this.updateLastSyncTime();
        return newCount;
      } else {
        // Fallback: increment locally but mark for sync
        const currentCount = await this.getCachedCount() || await this.getFallbackCount();
        const newCount = currentCount + 1;
        await this.setCachedCount(newCount);
        await this.markForResync();
        return newCount;
      }
    } catch (error) {
      logger.error(error, 'Error incrementing count');
      // Fallback: increment locally but mark for sync
      const currentCount = await this.getCachedCount() || await this.getFallbackCount();
      const newCount = currentCount + 1;
      await this.setCachedCount(newCount);
      await this.markForResync();
      return newCount;
    }
  }

  /**
   * Make request to Google Apps Script using iframe method (bypasses CORS)
   */
  async makeRequest(action, data = {}) {
    return new Promise((resolve) => {
      const scriptUrl = this.getSecureEndpoint();
      if (!scriptUrl) {
        // Mock response for development/demo purposes
        logger.log('Using mock progress response - Google Apps Script not configured');
        setTimeout(() => {
          let mockResponse = { success: false };

          if (action === 'GET_COUNT') {
            mockResponse = { success: true, count: Math.floor(Math.random() * 200) + 50 };
          } else if (action === 'INCREMENT_COUNT') {
            const newCount = Math.floor(Math.random() * 200) + 51;
            mockResponse = { success: true, count: newCount };
          } else if (action === 'SYNC_CHECK') {
            mockResponse = { success: true, synced: true, actualCount: Math.floor(Math.random() * 200) + 50 };
          }

          resolve(mockResponse);
        }, 500 + Math.random() * 1000); // Simulate network delay
        return;
      }

      // Create a hidden form
      const form = document.createElement('form');
      form.method = 'POST';
      form.enctype = 'application/x-www-form-urlencoded';
      form.action = scriptUrl;
      form.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;visibility:hidden;';

      // Add form fields
      const fields = { action, ...data };
      Object.keys(fields).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
      });

      // Create hidden iframe
      const iframe = document.createElement('iframe');
      iframe.name = `progress_${Date.now()}`;
      form.target = iframe.name;
      iframe.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;visibility:hidden;';

      let responseReceived = false;

      // Listen for postMessage from iframe
      const messageHandler = (event) => {
        if (event.origin === 'https://n-lu7gxgbhobbozbojcaeycqx4ko5t3hlpwx6euji-0lu-script.googleusercontent.com' ||
            event.origin === 'https://n-qvabiondzydbfg7xscdcubd66c5t3hlpwx6euji-0lu-script.googleusercontent.com' ||
            event.origin === 'https://script.google.com') {
          responseReceived = true;
          window.removeEventListener('message', messageHandler);

          setTimeout(() => {
            try {
              if (form && form.parentNode) document.body.removeChild(form);
              if (iframe && iframe.parentNode) document.body.removeChild(iframe);
            } catch (error) {
              // Silent cleanup
            }

            let result = { success: false };
            try {
              result = JSON.parse(event.data);
            } catch {
              result.success = event.data && event.data.toString().includes('SUCCESS');
            }
            resolve(result);
          }, 500);
        }
      };

      window.addEventListener('message', messageHandler);

      // Handle iframe load (fallback)
      iframe.onload = () => {
        setTimeout(() => {
          if (!responseReceived) {
            window.removeEventListener('message', messageHandler);
            try {
              if (form && form.parentNode) document.body.removeChild(form);
              if (iframe && iframe.parentNode) document.body.removeChild(iframe);
            } catch (error) {
              // Silent cleanup
            }
            resolve({ success: false, error: 'No response received' });
          }
        }, 3000);
      };

      iframe.onerror = () => {
        window.removeEventListener('message', messageHandler);
        try {
          if (form && form.parentNode) document.body.removeChild(form);
          if (iframe && iframe.parentNode) document.body.removeChild(iframe);
        } catch (error) {
          // Silent cleanup
        }
        resolve({ success: false, error: 'Request failed' });
      };

      // Add to page and submit
      document.body.appendChild(iframe);
      document.body.appendChild(form);

      setTimeout(() => {
        form.submit();
      }, 100);
    });
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

      // Also store as fallback for offline scenarios
      await this.storeFallbackCount(count);
    } catch (error) {
      logger.error(error, 'Error caching count');
    }
  }

  /**
   * Initialize automatic sync monitoring
   */
  initializeAutoSync() {
    // Check for sync immediately if needed
    setTimeout(() => this.checkAndPerformSync(), 1000);

    // Set up periodic sync checking
    setInterval(() => {
      this.checkAndPerformSync().catch(error => {
        logger.error(error, 'Auto sync check failed');
      });
    }, this.syncInterval);
  }

  /**
   * Check if sync is needed and perform it
   */
  async checkAndPerformSync() {
    try {
      const lastSyncTime = await this.getLastSyncTime();
      const now = Date.now();

      if (!lastSyncTime || (now - lastSyncTime > this.syncInterval)) {
        logger.log('Performing scheduled sync check...');
        await this.performSyncCheck();
      }
    } catch (error) {
      logger.error(error, 'Error in sync check');
    }
  }

  /**
   * Perform comprehensive sync check with the server
   */
  async performSyncCheck() {
    try {
      const response = await this.makeRequestWithRetry('SYNC_CHECK');

      if (response && response.success) {
        // Check if there's a discrepancy
        if (!response.synced) {
          logger.warn(`Sync discrepancy detected: actual=${response.actualCount}, cached=${response.trackedCount}`);

          // Update with the actual count from server
          await this.setCachedCount(response.actualCount);
        }

        // Update last sync time
        await this.updateLastSyncTime();

        if (!response.validationPassed) {
          logger.error('Server data validation failed');
        }

        return response;
      } else {
        logger.warn('Sync check failed, will retry next interval');
        return null;
      }
    } catch (error) {
      logger.error(error, 'Sync check request failed');
      return null;
    }
  }

  /**
   * Make request with retry logic
   */
  async makeRequestWithRetry(action, data = {}, retryCount = 0) {
    try {
      return await this.makeRequest(action, data);
    } catch (error) {
      if (retryCount < this.maxRetries) {
        logger.warn(`Request failed, retrying... (${retryCount + 1}/${this.maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * (retryCount + 1)));
        return this.makeRequestWithRetry(action, data, retryCount + 1);
      } else {
        logger.error(error, `Request failed after ${this.maxRetries} retries`);
        throw error;
      }
    }
  }

  /**
   * Get fallback count when server is unavailable
   */
  async getFallbackCount() {
    try {
      // Try cached value first
      const cached = await this.getCachedCount();
      if (cached !== null && cached > 0) {
        return cached;
      }

      // Check if we have any stored fallback
      const fallback = await secureStorage.getItem('fallback_count');
      if (fallback && fallback.count) {
        return fallback.count;
      }

      // As absolute last resort, return 0 (removing hardcoded 25)
      return 0;
    } catch (error) {
      logger.error(error, 'Error getting fallback count');
      return 0;
    }
  }

  /**
   * Store fallback count for offline scenarios
   */
  async storeFallbackCount(count) {
    try {
      await secureStorage.setItem('fallback_count', {
        count: count,
        timestamp: Date.now()
      });
    } catch (error) {
      logger.error(error, 'Error storing fallback count');
    }
  }

  /**
   * Mark data for resync due to local changes
   */
  async markForResync() {
    try {
      await secureStorage.setItem('needs_resync', {
        marked: true,
        timestamp: Date.now()
      });
    } catch (error) {
      logger.error(error, 'Error marking for resync');
    }
  }

  /**
   * Get last sync time
   */
  async getLastSyncTime() {
    try {
      const syncData = await secureStorage.getItem(this.syncCheckKey);
      return syncData ? syncData.timestamp : null;
    } catch (error) {
      logger.error(error, 'Error getting last sync time');
      return null;
    }
  }

  /**
   * Update last sync time
   */
  async updateLastSyncTime() {
    try {
      await secureStorage.setItem(this.syncCheckKey, {
        timestamp: Date.now()
      });
    } catch (error) {
      logger.error(error, 'Error updating last sync time');
    }
  }

  /**
   * Force immediate sync check
   */
  async forceSyncCheck() {
    await secureStorage.removeItem(this.syncCheckKey);
    return await this.performSyncCheck();
  }

  /**
   * Clear cache (force refresh from server)
   */
  clearCache() {
    secureStorage.removeItem(this.cacheKey);
    secureStorage.removeItem(this.syncCheckKey);
    secureStorage.removeItem('fallback_count');
    secureStorage.removeItem('needs_resync');
  }

  /**
   * Get comprehensive status for debugging
   */
  async getStatus() {
    try {
      const cached = await this.getCachedCount();
      const lastSync = await this.getLastSyncTime();
      const needsResync = await secureStorage.getItem('needs_resync');

      return {
        cachedCount: cached,
        lastSyncTime: lastSync,
        needsResync: !!needsResync,
        timeSinceLastSync: lastSync ? Date.now() - lastSync : null,
        syncInterval: this.syncInterval
      };
    } catch (error) {
      logger.error(error, 'Error getting status');
      return { error: error.message };
    }
  }
}

export const progressStorage = new ProgressStorage();