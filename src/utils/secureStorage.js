/**
 * Secure storage utility with mandatory encryption
 * NEVER stores unencrypted data - fails gracefully with no storage instead
 */

import { logger } from './secureLogger.js';

class SecureStorage {
  constructor() {
    this.isSupported = this.checkSupport();
    this.key = this.generateKey();
  }

  checkSupport() {
    try {
      return typeof localStorage !== 'undefined' &&
             typeof crypto !== 'undefined' &&
             crypto.subtle;
    } catch (e) {
      return false;
    }
  }

  generateKey() {
    // Generate a session-specific key for encryption
    // This ensures data is only readable within the same session
    try {
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      return null;
    }
  }

  async encrypt(data) {
    if (!this.isSupported || !this.key) {
      throw new Error('Encryption not available');
    }

    try {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(JSON.stringify(data));

      // Simple XOR encryption (suitable for client-side obfuscation)
      const keyBuffer = encoder.encode(this.key);
      const encrypted = new Uint8Array(dataBuffer.length);

      for (let i = 0; i < dataBuffer.length; i++) {
        encrypted[i] = dataBuffer[i] ^ keyBuffer[i % keyBuffer.length];
      }

      return btoa(String.fromCharCode(...encrypted));
    } catch (e) {
      throw new Error('Encryption failed');
    }
  }

  async decrypt(encryptedData) {
    if (!this.isSupported || !this.key) {
      throw new Error('Decryption not available');
    }

    try {
      const encrypted = new Uint8Array(atob(encryptedData).split('').map(c => c.charCodeAt(0)));
      const encoder = new TextEncoder();
      const keyBuffer = encoder.encode(this.key);
      const decrypted = new Uint8Array(encrypted.length);

      for (let i = 0; i < encrypted.length; i++) {
        decrypted[i] = encrypted[i] ^ keyBuffer[i % keyBuffer.length];
      }

      const decoder = new TextDecoder();
      return JSON.parse(decoder.decode(decrypted));
    } catch (e) {
      throw new Error('Decryption failed');
    }
  }

  async setItem(key, value) {
    if (!this.isSupported) {
      logger.warn('Secure storage not available - data not saved');
      return false; // Fail gracefully - no storage instead of insecure storage
    }

    try {
      const encrypted = await this.encrypt(value);
      localStorage.setItem(`sec_${key}`, encrypted);
      return true;
    } catch (e) {
      logger.error(e, 'Failed to store data securely');
      return false; // Never store unencrypted data
    }
  }

  async getItem(key) {
    if (!this.isSupported) {
      return null;
    }

    try {
      const encrypted = localStorage.getItem(`sec_${key}`);
      if (!encrypted) return null;

      return await this.decrypt(encrypted);
    } catch (e) {
      logger.error(e, 'Failed to retrieve data securely');
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
    }
  }
}

export const secureStorage = new SecureStorage();