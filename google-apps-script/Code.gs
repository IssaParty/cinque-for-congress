/**
 * Google Apps Script Backend for Cinque for Congress Endorsement Tracking
 * This script manages signature counts and syncs with the website progress bar
 * Includes hourly error checking and automatic data validation
 */

// Configuration Constants
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID'; // Replace with your actual sheet ID
const ENDORSEMENT_SHEET_NAME = 'Endorsements';
const PROGRESS_SHEET_NAME = 'Progress';
const TARGET_SIGNATURES = 1500;

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 100;

/**
 * Main entry point for web app requests
 */
function doPost(e) {
  try {
    // Parse the request
    const params = e.parameter;
    const action = params.action;

    // Rate limiting check
    if (!checkRateLimit()) {
      return createResponse(false, 'Rate limit exceeded. Please try again later.');
    }

    // Route to appropriate handler
    switch (action) {
      case 'GET_COUNT':
        return handleGetCount();
      case 'INCREMENT_COUNT':
        return handleIncrementCount();
      case 'SUBMIT_ENDORSEMENT':
        return handleSubmitEndorsement(params);
      case 'SYNC_CHECK':
        return handleSyncCheck();
      default:
        return createResponse(false, 'Invalid action specified');
    }
  } catch (error) {
    console.error('Error in doPost:', error);
    logError('doPost', error);
    return createResponse(false, 'Internal server error');
  }
}

/**
 * Get current endorsement count from the sheet
 */
function handleGetCount() {
  try {
    const count = getCurrentEndorsementCount();
    updateProgressTracker(count);

    return createResponse(true, 'Count retrieved successfully', {
      count: count,
      target: TARGET_SIGNATURES,
      percentage: Math.round((count / TARGET_SIGNATURES) * 100),
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting count:', error);
    logError('handleGetCount', error);
    return createResponse(false, 'Failed to retrieve count');
  }
}

/**
 * Increment the endorsement count (used for website progress tracking)
 */
function handleIncrementCount() {
  try {
    // Get current count from actual endorsements
    const currentCount = getCurrentEndorsementCount();
    const newCount = currentCount + 1;

    // Update progress tracker
    updateProgressTracker(newCount);

    return createResponse(true, 'Count incremented successfully', {
      count: newCount,
      target: TARGET_SIGNATURES,
      percentage: Math.round((newCount / TARGET_SIGNATURES) * 100),
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error incrementing count:', error);
    logError('handleIncrementCount', error);
    return createResponse(false, 'Failed to increment count');
  }
}

/**
 * Submit a new endorsement to the sheet
 */
function handleSubmitEndorsement(params) {
  try {
    // Validate required fields
    const requiredFields = ['name', 'city', 'zipCode'];
    for (const field of requiredFields) {
      if (!params[field] || params[field].trim().length === 0) {
        return createResponse(false, `Missing required field: ${field}`);
      }
    }

    // Sanitize and validate data
    const endorsementData = {
      name: sanitizeInput(params.name),
      city: sanitizeInput(params.city),
      zipCode: sanitizeInput(params.zipCode),
      timestamp: new Date(),
      source: 'website',
      ipHash: hashIP(params.clientIP || 'unknown')
    };

    // Check for duplicates
    if (isDuplicateEndorsement(endorsementData)) {
      return createResponse(false, 'Endorsement already recorded for this information');
    }

    // Add to endorsements sheet
    const endorsementId = addEndorsement(endorsementData);

    // Update count
    const newCount = getCurrentEndorsementCount();
    updateProgressTracker(newCount);

    return createResponse(true, 'Endorsement submitted successfully', {
      id: endorsementId,
      count: newCount,
      target: TARGET_SIGNATURES,
      percentage: Math.round((newCount / TARGET_SIGNATURES) * 100)
    });

  } catch (error) {
    console.error('Error submitting endorsement:', error);
    logError('handleSubmitEndorsement', error);
    return createResponse(false, 'Failed to submit endorsement');
  }
}

/**
 * Handle sync check requests (called hourly by website)
 */
function handleSyncCheck() {
  try {
    const actualCount = getCurrentEndorsementCount();
    const trackedCount = getTrackedCount();

    // Check for discrepancies
    if (Math.abs(actualCount - trackedCount) > 0) {
      console.log(`Sync discrepancy detected: actual=${actualCount}, tracked=${trackedCount}`);
      updateProgressTracker(actualCount);
    }

    // Validate data integrity
    const validationResult = validateDataIntegrity();

    return createResponse(true, 'Sync check completed', {
      actualCount: actualCount,
      trackedCount: trackedCount,
      synced: actualCount === trackedCount,
      validationPassed: validationResult.passed,
      lastSyncCheck: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in sync check:', error);
    logError('handleSyncCheck', error);
    return createResponse(false, 'Sync check failed');
  }
}

/**
 * Get current endorsement count from the actual data
 */
function getCurrentEndorsementCount() {
  try {
    const sheet = getEndorsementSheet();
    const data = sheet.getDataRange().getValues();

    // Filter out header row and empty rows
    const endorsements = data.slice(1).filter(row => row[0] && row[0].toString().trim() !== '');

    return endorsements.length;
  } catch (error) {
    console.error('Error getting current count:', error);
    return 0;
  }
}

/**
 * Get tracked count from progress sheet
 */
function getTrackedCount() {
  try {
    const sheet = getProgressSheet();
    const lastRow = sheet.getLastRow();

    if (lastRow <= 1) {
      return 0;
    }

    const data = sheet.getRange(lastRow, 2).getValue();
    return parseInt(data) || 0;
  } catch (error) {
    console.error('Error getting tracked count:', error);
    return 0;
  }
}

/**
 * Update progress tracker with new count
 */
function updateProgressTracker(count) {
  try {
    const sheet = getProgressSheet();
    const timestamp = new Date();

    // Add new entry
    sheet.appendRow([
      timestamp,
      count,
      TARGET_SIGNATURES,
      Math.round((count / TARGET_SIGNATURES) * 100),
      'auto-sync'
    ]);

    // Keep only last 1000 entries to prevent sheet bloat
    const lastRow = sheet.getLastRow();
    if (lastRow > 1001) {
      sheet.deleteRows(2, lastRow - 1001);
    }

  } catch (error) {
    console.error('Error updating progress tracker:', error);
  }
}

/**
 * Add endorsement to the sheet
 */
function addEndorsement(endorsementData) {
  try {
    const sheet = getEndorsementSheet();
    const endorsementId = `end_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    sheet.appendRow([
      endorsementData.name,
      endorsementData.city,
      endorsementData.zipCode,
      endorsementData.timestamp,
      endorsementData.source,
      endorsementData.ipHash,
      endorsementId
    ]);

    return endorsementId;
  } catch (error) {
    console.error('Error adding endorsement:', error);
    throw error;
  }
}

/**
 * Check for duplicate endorsements
 */
function isDuplicateEndorsement(newEndorsement) {
  try {
    const sheet = getEndorsementSheet();
    const data = sheet.getDataRange().getValues();

    // Check last 100 entries for duplicates (performance optimization)
    const recentData = data.slice(Math.max(1, data.length - 100));

    for (const row of recentData) {
      if (row[0] && row[1] && row[2]) {
        const existingName = row[0].toString().toLowerCase().trim();
        const existingCity = row[1].toString().toLowerCase().trim();
        const existingZip = row[2].toString().trim();

        const newName = newEndorsement.name.toLowerCase().trim();
        const newCity = newEndorsement.city.toLowerCase().trim();
        const newZip = newEndorsement.zipCode.trim();

        if (existingName === newName && existingCity === newCity && existingZip === newZip) {
          return true;
        }
      }
    }

    return false;
  } catch (error) {
    console.error('Error checking duplicates:', error);
    return false; // Allow submission if check fails
  }
}

/**
 * Validate data integrity
 */
function validateDataIntegrity() {
  try {
    const endorsementSheet = getEndorsementSheet();
    const progressSheet = getProgressSheet();

    // Check if sheets exist and have data
    const endorsementData = endorsementSheet.getDataRange().getValues();
    const progressData = progressSheet.getDataRange().getValues();

    const actualCount = Math.max(0, endorsementData.length - 1);
    const lastTrackedCount = progressData.length > 1 ?
      parseInt(progressData[progressData.length - 1][1]) || 0 : 0;

    return {
      passed: true,
      actualCount: actualCount,
      trackedCount: lastTrackedCount,
      checks: {
        sheetsExist: true,
        dataConsistent: Math.abs(actualCount - lastTrackedCount) <= 1
      }
    };
  } catch (error) {
    console.error('Data integrity validation failed:', error);
    return {
      passed: false,
      error: error.message
    };
  }
}

/**
 * Get endorsement sheet, create if doesn't exist
 */
function getEndorsementSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(ENDORSEMENT_SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(ENDORSEMENT_SHEET_NAME);
    // Add headers
    sheet.getRange(1, 1, 1, 7).setValues([[
      'Name', 'City', 'ZIP Code', 'Timestamp', 'Source', 'IP Hash', 'ID'
    ]]);
  }

  return sheet;
}

/**
 * Get progress sheet, create if doesn't exist
 */
function getProgressSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(PROGRESS_SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(PROGRESS_SHEET_NAME);
    // Add headers
    sheet.getRange(1, 1, 1, 5).setValues([[
      'Timestamp', 'Count', 'Target', 'Percentage', 'Source'
    ]]);
  }

  return sheet;
}

/**
 * Rate limiting check
 */
function checkRateLimit() {
  try {
    const cache = CacheService.getScriptCache();
    const clientId = Session.getTemporaryActiveUserKey() || 'anonymous';
    const cacheKey = `rate_limit_${clientId}`;

    const cached = cache.get(cacheKey);
    const now = Date.now();

    if (!cached) {
      cache.put(cacheKey, JSON.stringify({ count: 1, windowStart: now }), Math.ceil(RATE_LIMIT_WINDOW / 1000));
      return true;
    }

    const data = JSON.parse(cached);

    if (now - data.windowStart > RATE_LIMIT_WINDOW) {
      // New window
      cache.put(cacheKey, JSON.stringify({ count: 1, windowStart: now }), Math.ceil(RATE_LIMIT_WINDOW / 1000));
      return true;
    }

    if (data.count >= MAX_REQUESTS_PER_WINDOW) {
      return false;
    }

    data.count++;
    cache.put(cacheKey, JSON.stringify(data), Math.ceil((data.windowStart + RATE_LIMIT_WINDOW - now) / 1000));
    return true;

  } catch (error) {
    console.error('Rate limit check failed:', error);
    return true; // Allow request if check fails
  }
}

/**
 * Sanitize input data
 */
function sanitizeInput(input) {
  if (!input) return '';

  return input.toString()
    .trim()
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .substring(0, 100); // Limit length
}

/**
 * Hash IP address for privacy
 */
function hashIP(ip) {
  const hash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_1, ip + 'salt_string');
  return hash.map(byte => (byte + 256) % 256).map(byte => byte.toString(16).padStart(2, '0')).join('').substring(0, 16);
}

/**
 * Log errors to a separate sheet for monitoring
 */
function logError(context, error) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let errorSheet = spreadsheet.getSheetByName('ErrorLog');

    if (!errorSheet) {
      errorSheet = spreadsheet.insertSheet('ErrorLog');
      errorSheet.getRange(1, 1, 1, 4).setValues([['Timestamp', 'Context', 'Error', 'Stack']]);
    }

    errorSheet.appendRow([
      new Date(),
      context,
      error.message || error.toString(),
      error.stack || 'No stack trace'
    ]);

    // Keep only last 100 error entries
    const lastRow = errorSheet.getLastRow();
    if (lastRow > 101) {
      errorSheet.deleteRows(2, lastRow - 101);
    }

  } catch (logError) {
    console.error('Failed to log error:', logError);
  }
}

/**
 * Create standardized response
 */
function createResponse(success, message, data = {}) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString(),
    ...data
  };

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Scheduled function for hourly sync checks (set up as a trigger)
 */
function hourlySync() {
  try {
    console.log('Running hourly sync check...');

    const actualCount = getCurrentEndorsementCount();
    const trackedCount = getTrackedCount();

    if (actualCount !== trackedCount) {
      console.log(`Sync issue detected: actual=${actualCount}, tracked=${trackedCount}`);
      updateProgressTracker(actualCount);
    }

    // Validate data integrity
    const validation = validateDataIntegrity();
    if (!validation.passed) {
      console.error('Data integrity validation failed:', validation.error);
    }

    console.log('Hourly sync completed successfully');
  } catch (error) {
    console.error('Hourly sync failed:', error);
    logError('hourlySync', error);
  }
}

/**
 * Initialize the script - run this once to set up sheets and triggers
 */
function initialize() {
  try {
    // Create sheets if they don't exist
    getEndorsementSheet();
    getProgressSheet();

    // Set up hourly trigger
    ScriptApp.newTrigger('hourlySync')
      .timeBased()
      .everyHours(1)
      .create();

    console.log('Initialization completed successfully');
  } catch (error) {
    console.error('Initialization failed:', error);
  }
}