// Endorsement storage utility
// WARNING: This approach stores data in browser localStorage only
// For production, use a proper backend service

export const endorsementStorage = {
  // Encode data for storage (WARNING: This is NOT encryption - just Base64 encoding)
  encode: (data) => {
    try {
      const jsonString = JSON.stringify(data);
      // Base64 encoding for basic obfuscation - NOT SECURE
      return btoa(jsonString);
    } catch (error) {
      console.error('Encoding failed:', error);
      return null;
    }
  },

  // Decode data after retrieving
  decode: (encodedData) => {
    try {
      const jsonString = atob(encodedData);
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Decoding failed:', error);
      return null;
    }
  },

  // Store endorsement locally with timestamp and basic validation
  storeEndorsement: (endorsementData) => {
    const timestamp = new Date().toISOString();
    const endorsementWithMetadata = {
      ...endorsementData,
      timestamp,
      id: `endorsement_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userAgent: navigator.userAgent.substring(0, 100), // Basic fingerprint
      verified: false // Mark as unverified until admin review
    };

    // Get existing endorsements
    const existing = endorsementStorage.getAllEndorsements();

    // Add new endorsement
    const updated = [...existing, endorsementWithMetadata];

    // Encode and store
    const encoded = endorsementStorage.encode(updated);
    if (encoded) {
      localStorage.setItem('campaign_endorsements', encoded);
      return true;
    }
    return false;
  },

  // Retrieve all endorsements
  getAllEndorsements: () => {
    try {
      const encoded = localStorage.getItem('campaign_endorsements');
      if (!encoded) return [];

      const decoded = endorsementStorage.decode(encoded);
      return decoded || [];
    } catch (error) {
      console.error('Failed to retrieve endorsements:', error);
      return [];
    }
  },

  // Export endorsements for backup/admin review
  exportEndorsements: () => {
    const endorsements = endorsementStorage.getAllEndorsements();
    const csvHeader = 'Name,City,ZipCode,Timestamp,ID,Verified\n';
    const csvContent = endorsements.map(e =>
      `"${e.name}","${e.city}","${e.zipCode}","${e.timestamp}","${e.id}","${e.verified}"`
    ).join('\n');

    const blob = new Blob([csvHeader + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `endorsements_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  },

  // Validate endorsement data
  validateEndorsement: (data) => {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters');
    }

    if (!data.city || data.city.trim().length < 2) {
      errors.push('City must be at least 2 characters');
    }

    if (!data.zipCode || !/^\d{5}(-\d{4})?$/.test(data.zipCode)) {
      errors.push('Invalid ZIP code format');
    }

    // Check for potential duplicates (same name + zip)
    const existing = endorsementStorage.getAllEndorsements();
    const duplicate = existing.find(e =>
      e.name.toLowerCase() === data.name.toLowerCase() &&
      e.zipCode === data.zipCode
    );

    if (duplicate) {
      errors.push('This person appears to have already endorsed');
    }

    return errors;
  },

  // Submit to external service (placeholder for future implementation)
  submitToExternalService: async (endorsementData) => {
    // This is where you would integrate with:
    // - Google Sheets API
    // - Airtable
    // - Your backend API
    // - Netlify Forms
    // etc.

    console.log('Would submit to external service:', endorsementData);

    // Example Google Sheets integration:
    /*
    try {
      const response = await fetch(process.env.REACT_APP_GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(endorsementData)
      });

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, error: 'Submission failed' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
    */

    // For now, just return success
    return { success: true };
  }
};

// Security considerations for GitHub storage approach:
export const githubStorageConfig = {
  // DO NOT put real credentials in your code
  // Use environment variables or external secrets

  // Example structure for GitHub API integration:
  submitToGitHub: async (endorsementData) => {
    // This would require:
    // 1. GitHub Personal Access Token (stored as env variable)
    // 2. Private repository for data storage
    // 3. Encrypted file content
    // 4. Proper error handling

    console.warn('GitHub storage not implemented - use external service instead');
    return { success: false, error: 'Not implemented' };
  }
};

export default endorsementStorage;