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
    // Dynamic URL construction using encoded algorithm
    const base = 'https://';
    const host = ['script', 'google', 'com'].join('.');
    const path = '/macros/s/';

    // Key reconstruction using character manipulation
    const keyParts = [
      this.decodePart([113, 139, 174, 185, 179, 179, 169, 185, 121, 116, 172, 124, 113, 153, 168, 169, 186, 177, 118, 169, 179, 135, 174, 135, 153, 139, 118, 154, 159, 131, 185, 116, 157, 140, 118, 168, 169, 186, 135, 157, 174, 186, 177, 118, 163, 178, 165, 177]),
      this.decodePart([117, 141, 167, 169, 186, 174, 135, 153, 121, 113, 168, 116, 179, 139, 179, 161, 174, 177, 134, 186, 113, 156, 161, 174, 135, 167, 135, 167, 117])
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