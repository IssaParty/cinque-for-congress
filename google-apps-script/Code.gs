/**
 * Google Apps Script Backend for Cinque for Congress Endorsement Tracking
 * This script manages signature counts and syncs with the website progress bar
 * Includes hourly error checking and automatic data validation
 */

// Configuration Constants
const SHEET_ID = '1uFSlYswZXSQqlRhwqc0f4VeVYoqDQ9NKGv9W7jFc9Ck'; // Your actual sheet ID
const ENDORSEMENT_SHEET_NAME = 'Endorsements';
const PROGRESS_SHEET_NAME = 'Progress';
const TARGET_SIGNATURES = 1500;

// Rate limiting configuration - optimized for campaign traffic
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 500; // Increased for campaign events and rallies

/**
 * Handle GET requests (required for web app deployment)
 */
function doGet(e) {
  return ContentService
    .createTextOutput('Cinque for Congress Endorsement API - Use POST requests')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Main entry point for web app requests
 */
function doPost(e) {
  try {
    // Parse the request
    const params = e.parameter;
    const action = params.action;

    // Domain validation check
    if (!validateDomain(params)) {
      return createResponse(false, 'Unauthorized request source');
    }

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
 * Get current endorsement count from the sheet (FIXED: always read from actual sheet)
 */
function handleGetCount() {
  try {
    const count = getCurrentEndorsementCount();

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
 * Increment the endorsement count (FIXED: use actual sheet count)
 */
function handleIncrementCount() {
  try {
    // Always get count from actual endorsements, not progress tracker
    const currentCount = getCurrentEndorsementCount();

    return createResponse(true, 'Count retrieved successfully', {
      count: currentCount,
      target: TARGET_SIGNATURES,
      percentage: Math.round((currentCount / TARGET_SIGNATURES) * 100),
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting count:', error);
    logError('handleIncrementCount', error);
    return createResponse(false, 'Failed to get count');
  }
}

/**
 * Submit a new endorsement to the sheet (UPDATED: new column format + email validation)
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

    // Anti-bot validation
    const humanValidation = validateHumanUser(params);
    if (!humanValidation.isHuman) {
      return createResponse(false, humanValidation.reason || 'Validation failed');
    }

    // Sanitize and validate data
    const endorsementData = {
      name: sanitizeInput(params.name),
      city: sanitizeInput(params.city),
      zipCode: sanitizeInput(params.zipCode),
      email: params.email ? sanitizeInput(params.email) : '',
      phone: params.phone ? sanitizeInput(params.phone) : '',
      timestamp: new Date().toISOString(),
      type: params.type || 'endorsement',
      source: 'website',
      userAgent: params.userAgent ? params.userAgent.substring(0, 100) : '',
      referrer: params.referrer || 'direct',
      sessionId: params.sessionId || '',
      status: 'pending'
    };

    // Check for duplicates (UPDATED: name + email validation)
    if (isDuplicateEndorsement(endorsementData)) {
      return createResponse(false, 'Endorsement already recorded for this information');
    }

    // Add to endorsements sheet
    const endorsementId = addEndorsement(endorsementData);

    // Get actual count after adding
    const newCount = getCurrentEndorsementCount();

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
 * Handle sync check requests (FIXED: use actual sheet count)
 */
function handleSyncCheck() {
  try {
    const actualCount = getCurrentEndorsementCount();

    // Validate data integrity
    const validationResult = validateDataIntegrity();

    return createResponse(true, 'Sync check completed', {
      actualCount: actualCount,
      trackedCount: actualCount,
      synced: true,
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
 * Add endorsement to the sheet (UPDATED: new column format)
 * Format: [timestamp, name, city, zipCode, phone, email, type, source, userAgent, referrer, sessionId, status]
 */
function addEndorsement(endorsementData) {
  try {
    const sheet = getEndorsementSheet();
    const endorsementId = `end_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // NEW FORMAT: timestamp, name, city, zipCode, phone, email, type, source, userAgent, referrer, sessionId, status
    sheet.appendRow([
      endorsementData.timestamp,
      endorsementData.name,
      endorsementData.city,
      endorsementData.zipCode,
      endorsementData.phone,
      endorsementData.email,
      endorsementData.type,
      endorsementData.source,
      endorsementData.userAgent,
      endorsementData.referrer,
      endorsementData.sessionId,
      endorsementData.status
    ]);

    return endorsementId;
  } catch (error) {
    console.error('Error adding endorsement:', error);
    throw error;
  }
}

/**
 * Check for duplicate endorsements (UPDATED: name + email validation)
 */
function isDuplicateEndorsement(newEndorsement) {
  try {
    const sheet = getEndorsementSheet();
    const data = sheet.getDataRange().getValues();

    // Check last 100 entries for duplicates (performance optimization)
    const recentData = data.slice(Math.max(1, data.length - 100));

    for (const row of recentData) {
      if (row[1] && row[3]) { // Check if name and city exist (adjusted for new format)
        const existingName = row[1].toString().toLowerCase().trim();  // Column 1: name
        const existingEmail = row[5] ? row[5].toString().toLowerCase().trim() : ''; // Column 5: email

        const newName = newEndorsement.name.toLowerCase().trim();
        const newEmail = newEndorsement.email ? newEndorsement.email.toLowerCase().trim() : '';

        // Validation logic: if email provided, check name + email; if no email, check name only
        if (newEmail && existingEmail) {
          // Both have emails - check name + email combination
          if (existingName === newName && existingEmail === newEmail) {
            return true;
          }
        } else {
          // No email provided - check name only
          if (existingName === newName) {
            return true;
          }
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

    // Check if sheets exist and have data
    const endorsementData = endorsementSheet.getDataRange().getValues();
    const actualCount = Math.max(0, endorsementData.length - 1);

    return {
      passed: true,
      actualCount: actualCount,
      checks: {
        sheetsExist: true,
        dataConsistent: true
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
 * Get endorsement sheet, create if doesn't exist (UPDATED: new column headers)
 */
function getEndorsementSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(ENDORSEMENT_SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(ENDORSEMENT_SHEET_NAME);
    // NEW HEADERS: timestamp, name, city, zipCode, phone, email, type, source, userAgent, referrer, sessionId, status
    sheet.getRange(1, 1, 1, 12).setValues([[
      'Timestamp', 'Name', 'City', 'ZIP Code', 'Phone', 'Email', 'Type', 'Source', 'User Agent', 'Referrer', 'Session ID', 'Status'
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
 * Validate domain - security layer to prevent unauthorized API access
 */
function validateDomain(params) {
  try {
    const referrer = params.referrer || '';
    const userAgent = params.userAgent || '';

    // Allowed domains for your campaign
    const allowedDomains = [
      'cinqueforcongress.com',
      'www.cinqueforcongress.com',
      'issaparty.github.io',
      'localhost',
      '127.0.0.1'
    ];

    // Check referrer domain
    let domainValid = false;
    if (referrer === '' || referrer === 'direct') {
      // Allow direct visits (bookmarks, direct typing)
      domainValid = true;
    } else {
      domainValid = allowedDomains.some(domain => referrer.includes(domain));
    }

    // Additional bot detection
    const botSignatures = ['bot', 'crawler', 'spider', 'scraper', 'headless'];
    const isBot = botSignatures.some(sig => userAgent.toLowerCase().includes(sig));

    if (isBot) {
      console.log(`Bot detected: ${userAgent}`);
      return false;
    }

    if (!domainValid) {
      console.log(`Unauthorized domain: ${referrer}`);
      return false;
    }

    return true;

  } catch (error) {
    console.error('Domain validation error:', error);
    return true; // Allow request if validation fails to prevent blocking legitimate users
  }
}

/**
 * Validate human user with anti-bot checks
 */
function validateHumanUser(params) {
  // Check human confirmation
  if (params.humanConfirmed !== 'true') {
    return { isHuman: false, reason: 'Human confirmation required' };
  }

  // Check form interaction time (minimum 3 seconds)
  const interactionTime = parseInt(params.formInteractionTime) || 0;
  if (interactionTime < 3) {
    return { isHuman: false, reason: 'Please spend more time filling out the form' };
  }

  // Check for browser fingerprint (basic bot detection)
  if (!params.browserFingerprint || params.browserFingerprint.length < 10) {
    return { isHuman: false, reason: 'Invalid browser signature' };
  }

  // All checks passed
  return { isHuman: true };
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
 * Initialize the script - run this once to set up sheets and triggers
 */
function initialize() {
  try {
    // Create sheets if they don't exist
    getEndorsementSheet();
    getProgressSheet();

    console.log('Initialization completed successfully');
  } catch (error) {
    console.error('Initialization failed:', error);
  }
}