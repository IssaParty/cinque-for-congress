/**
 * Secure storage utility with AES-256-GCM encryption
 * Uses Web Crypto API for military-grade encryption
 * NEVER stores unencrypted data - fails gracefully with no storage instead
 */

import { logger } from './secureLogger.js';

class SecureStorage {
  constructor() {
    this.isSupported = this.checkSupport();
    this.cryptoKey = null;
    this.initializeKey();
  }

  checkSupport() {
    try {
      return typeof localStorage !== 'undefined' &&
             typeof crypto !== 'undefined' &&
             typeof crypto.subtle !== 'undefined' &&
             typeof crypto.getRandomValues === 'function';
    } catch (e) {
      return false;
    }
  }

  async initializeKey() {
    if (!this.isSupported) return;

    try {
      // Generate or retrieve session-specific AES-256-GCM key
      const sessionKeyData = sessionStorage.getItem('sec_session_key');

      if (sessionKeyData) {
        // Import existing key for this session
        const keyData = JSON.parse(sessionKeyData);
        this.cryptoKey = await crypto.subtle.importKey(
          'raw',
          new Uint8Array(keyData),
          { name: 'AES-GCM', length: 256 },
          false,
          ['encrypt', 'decrypt']
        );
      } else {
        // Generate new key for this session
        this.cryptoKey = await crypto.subtle.generateKey(
          { name: 'AES-GCM', length: 256 },
          true,
          ['encrypt', 'decrypt']
        );

        // Export and store key data for session consistency
        const exportedKey = await crypto.subtle.exportKey('raw', this.cryptoKey);
        sessionStorage.setItem('sec_session_key', JSON.stringify(Array.from(new Uint8Array(exportedKey))));
      }
    } catch (e) {
      logger.error(e, 'Failed to initialize encryption key');
      this.cryptoKey = null;
    }
  }

  async encrypt(data) {
    if (!this.isSupported || !this.cryptoKey) {
      throw new Error('AES-256-GCM encryption not available');
    }

    try {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(JSON.stringify(data));

      // Generate random 96-bit IV for GCM
      const iv = crypto.getRandomValues(new Uint8Array(12));

      // Encrypt with AES-256-GCM
      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        this.cryptoKey,
        dataBuffer
      );

      // Combine IV + encrypted data
      const combined = new Uint8Array(iv.length + encrypted.byteLength);
      combined.set(iv, 0);
      combined.set(new Uint8Array(encrypted), iv.length);

      // Base64 encode for storage
      return btoa(String.fromCharCode(...combined));
    } catch (e) {
      logger.error(e, 'AES-256-GCM encryption failed');
      throw new Error('Encryption failed');
    }
  }

  async decrypt(encryptedData) {
    if (!this.isSupported || !this.cryptoKey) {
      throw new Error('AES-256-GCM decryption not available');
    }

    try {
      // Decode base64
      const combined = new Uint8Array(atob(encryptedData).split('').map(c => c.charCodeAt(0)));

      // Extract IV (first 12 bytes) and encrypted data
      const iv = combined.slice(0, 12);
      const encrypted = combined.slice(12);

      // Decrypt with AES-256-GCM
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        this.cryptoKey,
        encrypted
      );

      // Decode and parse
      const decoder = new TextDecoder();
      return JSON.parse(decoder.decode(decrypted));
    } catch (e) {
      logger.error(e, 'AES-256-GCM decryption failed');
      throw new Error('Decryption failed');
    }
  }

  async setItem(key, value) {
    if (!this.isSupported) {
      logger.warn('AES-256-GCM storage not available - data not saved');
      return false; // Fail gracefully - no storage instead of insecure storage
    }

    // Wait for key initialization if needed
    if (!this.cryptoKey) {
      await this.initializeKey();
    }

    try {
      const encrypted = await this.encrypt(value);
      localStorage.setItem(`sec_${key}`, encrypted);
      return true;
    } catch (e) {
      logger.error(e, 'Failed to store data with AES-256-GCM');
      return false; // Never store unencrypted data
    }
  }

  async getItem(key) {
    if (!this.isSupported) {
      return null;
    }

    // Wait for key initialization if needed
    if (!this.cryptoKey) {
      await this.initializeKey();
    }

    try {
      const encrypted = localStorage.getItem(`sec_${key}`);
      if (!encrypted) return null;

      return await this.decrypt(encrypted);
    } catch (e) {
      logger.error(e, 'Failed to retrieve data with AES-256-GCM');
      // Remove corrupted data
      this.removeItem(key);
      return null;
    }
  }

  removeItem(key) {
    if (this.isSupported) {
      localStorage.removeItem(`sec_${key}`);
    }
  }

  clear() {
    if (this.isSupported) {
      // Only clear our secure items
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('sec_')) {
          localStorage.removeItem(key);
        }
      });

      // Clear session key
      sessionStorage.removeItem('sec_session_key');
      this.cryptoKey = null;
    }
  }

  /**
   * Get encryption status for debugging
   */
  getStatus() {
    return {
      supported: this.isSupported,
      keyInitialized: !!this.cryptoKey,
      algorithm: 'AES-256-GCM',
      keyLength: 256,
      ivLength: 96
    };
  }
}

export const secureStorage = new SecureStorage();

// Export for debugging in development
if (process.env.NODE_ENV === 'development') {
  window.secureStorageDebug = secureStorage;
}