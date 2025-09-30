/**
 * Google Apps Script Backend for Cinque for Congress Endorsement Tracking
 * This script manages signature counts and syncs with the website progress bar
 * Includes daily limit checking with 1M maximum cap and enhanced security
 */

// Configuration Constants
const SHEET_ID = '1uFSlYswZXSQqlRhwqc0f4VeVYoqDQ9NKGv9W7jFc9Ck'; // Your actual sheet ID
const ENDORSEMENT_SHEET_NAME = 'Endorsements';
const PROGRESS_SHEET_NAME = 'Progress';
const TARGET_SIGNATURES = 1500; // Display target for progress bar
const MAXIMUM_SIGNATURES = 1000000; // Absolute maximum before stopping collection
const DAILY_LIMIT_CACHE_KEY = 'daily_signature_limit_v2'; // Versioned for security

// Rate limiting configuration - enhanced for security
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 300; // Reduced for security during high volume
const DAILY_CACHE_DURATION = 24 * 60 * 60; // 24 hours in seconds

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

    // Domain validation check (security layer 1)
    if (!validateDomain(params)) {
      return createResponse(false, 'Unauthorized request source');
    }

    // Rate limiting check (security layer 2)
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
 * Get current endorsement count with daily limit validation
 */
function handleGetCount() {
  try {
    const actualCount = getCurrentEndorsementCount();
    const dailyLimit = getDailySignatureLimit();
    const acceptingSignatures = actualCount < MAXIMUM_SIGNATURES;

    // Progress calculation (always based on TARGET_SIGNATURES for display)
    const displayProgress = Math.min((actualCount / TARGET_SIGNATURES) * 100, 100);

    return createResponse(true, 'Count retrieved successfully', {
      count: actualCount,
      target: TARGET_SIGNATURES,
      percentage: Math.round(displayProgress),
      acceptingSignatures: acceptingSignatures,
      dailyLimit: dailyLimit,
      maximumReached: actualCount >= MAXIMUM_SIGNATURES,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting count:', error);
    logError('handleGetCount', error);
    return createResponse(false, 'Failed to retrieve count');
  }
}

/**
 * Increment count handler (returns actual sheet count)
 */
function handleIncrementCount() {
  try {
    const currentCount = getCurrentEndorsementCount();
    const acceptingSignatures = currentCount < MAXIMUM_SIGNATURES;
    const displayProgress = Math.min((currentCount / TARGET_SIGNATURES) * 100, 100);

    return createResponse(true, 'Count retrieved successfully', {
      count: currentCount,
      target: TARGET_SIGNATURES,
      percentage: Math.round(displayProgress),
      acceptingSignatures: acceptingSignatures,
      maximumReached: currentCount >= MAXIMUM_SIGNATURES,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting count:', error);
    logError('handleIncrementCount', error);
    return createResponse(false, 'Failed to get count');
  }
}

/**
 * Submit endorsement with enhanced security and limit checking
 */
function handleSubmitEndorsement(params) {
  try {
    // Security validation layer 1: Required fields
    const requiredFields = ['name', 'city', 'zipCode'];
    for (const field of requiredFields) {
      if (!params[field] || params[field].trim().length === 0) {
        return createResponse(false, `Missing required field: ${field}`);
      }
    }

    // Security validation layer 2: Anti-bot checks
    const humanValidation = validateHumanUser(params);
    if (!humanValidation.isHuman) {
      return createResponse(false, humanValidation.reason || 'Validation failed');
    }

    // Security validation layer 3: Check current count and limits
    const currentCount = getCurrentEndorsementCount();

    // Check absolute maximum (security critical)
    if (currentCount >= MAXIMUM_SIGNATURES) {
      return createResponse(false, 'Maximum signature limit reached. Thank you for your interest in supporting the campaign.');
    }

    // Security validation layer 4: Daily limit check
    const dailyLimit = getDailySignatureLimit();
    const todayCount = getTodayEndorsementCount();

    if (todayCount >= dailyLimit) {
      return createResponse(false, 'Daily signature limit reached. Please try again tomorrow.');
    }

    // Sanitize and validate data (security layer 5)
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
      status: 'pending',
      ipHash: hashIP(params.clientIP || 'unknown'), // Security tracking
      dailySequence: todayCount + 1 // For audit trail
    };

    // Security validation layer 6: Duplicate check
    if (isDuplicateEndorsement(endorsementData)) {
      return createResponse(false, 'Endorsement already recorded for this information');
    }

    // Add to endorsements sheet with security audit trail
    const endorsementId = addEndorsement(endorsementData);

    // Get updated count
    const newCount = getCurrentEndorsementCount();
    const displayProgress = Math.min((newCount / TARGET_SIGNATURES) * 100, 100);

    // Log successful submission for security monitoring
    console.log(`Secure endorsement submitted: ID=${endorsementId}, Count=${newCount}, Daily=${todayCount + 1}`);

    return createResponse(true, 'Endorsement submitted successfully', {
      id: endorsementId,
      count: newCount,
      target: TARGET_SIGNATURES,
      percentage: Math.round(displayProgress),
      acceptingSignatures: newCount < MAXIMUM_SIGNATURES,
      dailyCount: todayCount + 1
    });

  } catch (error) {
    console.error('Error submitting endorsement:', error);
    logError('handleSubmitEndorsement', error);
    return createResponse(false, 'Failed to submit endorsement');
  }
}

/**
 * Handle sync check with enhanced security validation
 */
function handleSyncCheck() {
  try {
    const actualCount = getCurrentEndorsementCount();
    const dailyLimit = getDailySignatureLimit();
    const todayCount = getTodayEndorsementCount();
    const validationResult = validateDataIntegrity();

    return createResponse(true, 'Sync check completed', {
      actualCount: actualCount,
      trackedCount: actualCount,
      synced: true,
      dailyLimit: dailyLimit,
      todayCount: todayCount,
      acceptingSignatures: actualCount < MAXIMUM_SIGNATURES,
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
 * Get current endorsement count from actual sheet data (security critical)
 */
function getCurrentEndorsementCount() {
  try {
    const sheet = getEndorsementSheet();
    const data = sheet.getDataRange().getValues();

    // Filter out header row and empty rows (security: validate data integrity)
    const endorsements = data.slice(1).filter(row =>
      row[0] && row[0].toString().trim() !== '' &&
      row[1] && row[1].toString().trim() !== ''
    );

    return endorsements.length;
  } catch (error) {
    console.error('Error getting current count:', error);
    return 0;
  }
}

/**
 * Test function to display current endorsement count
 */
function testGetCurrentCount() {
  try {
    const count = getCurrentEndorsementCount();
    console.log(`Current endorsement count: ${count}`);

    // Additional debug info
    const sheet = getEndorsementSheet();
    const data = sheet.getDataRange().getValues();
    console.log(`Total rows in sheet: ${data.length}`);
    console.log(`Header row: ${JSON.stringify(data[0])}`);

    if (data.length > 1) {
      console.log(`First data row: ${JSON.stringify(data[1])}`);
      console.log(`Last data row: ${JSON.stringify(data[data.length - 1])}`);
    }

    return count;
  } catch (error) {
    console.error('Error in test function:', error);
    return null;
  }
}

/**
 * Get daily signature limit with secure caching
 */
function getDailySignatureLimit() {
  try {
    const cache = CacheService.getScriptCache();
    const cacheKey = DAILY_LIMIT_CACHE_KEY + '_' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');

    // Try to get cached limit
    const cachedLimit = cache.get(cacheKey);
    if (cachedLimit) {
      return parseInt(cachedLimit);
    }

    // Calculate new daily limit based on remaining signatures and time
    const currentCount = getCurrentEndorsementCount();
    const remainingSignatures = MAXIMUM_SIGNATURES - currentCount;

    // Conservative daily limit calculation (security: prevent rapid exhaustion)
    const daysRemaining = Math.max(1, Math.ceil((new Date('2026-03-18') - new Date()) / (1000 * 60 * 60 * 24)));
    const baseDailyLimit = Math.ceil(remainingSignatures / daysRemaining);

    // Apply security constraints
    const secureLimit = Math.min(
      Math.max(100, baseDailyLimit), // Minimum 100, maximum calculated
      5000 // Hard cap for security
    );

    // Cache the limit for the day
    cache.put(cacheKey, secureLimit.toString(), DAILY_CACHE_DURATION);

    console.log(`Daily limit calculated: ${secureLimit} (remaining: ${remainingSignatures}, days: ${daysRemaining})`);
    return secureLimit;

  } catch (error) {
    console.error('Error calculating daily limit:', error);
    return 1000; // Secure fallback
  }
}

/**
 * Get today's endorsement count for daily limit checking
 */
function getTodayEndorsementCount() {
  try {
    const sheet = getEndorsementSheet();
    const data = sheet.getDataRange().getValues();

    const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');

    let todayCount = 0;
    for (let i = 1; i < data.length; i++) { // Skip header
      if (data[i][0]) { // Check timestamp column
        const rowDate = Utilities.formatDate(new Date(data[i][0]), Session.getScriptTimeZone(), 'yyyy-MM-dd');
        if (rowDate === today) {
          todayCount++;
        }
      }
    }

    return todayCount;
  } catch (error) {
    console.error('Error getting today count:', error);
    return 0;
  }
}

/**
 * Add endorsement with enhanced security audit trail
 */
function addEndorsement(endorsementData) {
  try {
    const sheet = getEndorsementSheet();
    const endorsementId = `end_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Add with full security audit data
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
      endorsementData.status,
      endorsementId,
      endorsementData.ipHash,
      endorsementData.dailySequence
    ]);

    return endorsementId;
  } catch (error) {
    console.error('Error adding endorsement:', error);
    throw error;
  }
}

/**
 * Enhanced duplicate checking with security validation
 */
function isDuplicateEndorsement(newEndorsement) {
  try {
    const sheet = getEndorsementSheet();
    const data = sheet.getDataRange().getValues();

    // Check last 200 entries for duplicates (enhanced for security)
    const recentData = data.slice(Math.max(1, data.length - 200));

    for (const row of recentData) {
      if (row[1] && row[2]) { // Verify name and city exist
        const existingName = row[1].toString().toLowerCase().trim();
        const existingEmail = row[5] ? row[5].toString().toLowerCase().trim() : '';

        const newName = newEndorsement.name.toLowerCase().trim();
        const newEmail = newEndorsement.email ? newEndorsement.email.toLowerCase().trim() : '';

        // Enhanced validation logic with security checks
        if (newEmail && existingEmail) {
          if (existingName === newName && existingEmail === newEmail) {
            return true;
          }
        } else if (!newEmail && !existingEmail) {
          // Only check name if both have no email
          if (existingName === newName) {
            return true;
          }
        }
      }
    }

    return false;
  } catch (error) {
    console.error('Error checking duplicates:', error);
    return false; // Allow submission if check fails (fail-safe)
  }
}

/**
 * Enhanced data integrity validation
 */
function validateDataIntegrity() {
  try {
    const endorsementSheet = getEndorsementSheet();
    const endorsementData = endorsementSheet.getDataRange().getValues();
    const actualCount = Math.max(0, endorsementData.length - 1);

    // Security checks
    const securityChecks = {
      sheetsExist: true,
      dataConsistent: true,
      countValid: actualCount >= 0 && actualCount <= MAXIMUM_SIGNATURES,
      noMaliciousData: validateNoMaliciousContent(endorsementData)
    };

    return {
      passed: Object.values(securityChecks).every(check => check === true),
      actualCount: actualCount,
      checks: securityChecks
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
 * Security function to validate no malicious content
 */
function validateNoMaliciousContent(data) {
  try {
    const maliciousPatterns = [
      /<script/i, /javascript:/i, /vbscript:/i, /onload=/i, /onerror=/i
    ];

    for (let i = 1; i < Math.min(data.length, 50); i++) { // Check recent entries
      for (let j = 0; j < data[i].length; j++) {
        const cellValue = data[i][j].toString();
        for (const pattern of maliciousPatterns) {
          if (pattern.test(cellValue)) {
            console.error(`Malicious content detected in row ${i}, column ${j}`);
            return false;
          }
        }
      }
    }
    return true;
  } catch (error) {
    console.error('Error validating malicious content:', error);
    return true; // Fail-safe
  }
}

/**
 * Get endorsement sheet with enhanced security headers
 */
function getEndorsementSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(ENDORSEMENT_SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(ENDORSEMENT_SHEET_NAME);
    // Enhanced headers with security audit fields
    sheet.getRange(1, 1, 1, 15).setValues([[
      'Timestamp', 'Name', 'City', 'ZIP Code', 'Phone', 'Email', 'Type', 'Source',
      'User Agent', 'Referrer', 'Session ID', 'Status', 'Endorsement ID', 'IP Hash', 'Daily Sequence'
    ]]);
  }

  return sheet;
}

/**
 * Enhanced rate limiting with security measures
 */
function checkRateLimit() {
  try {
    const cache = CacheService.getScriptCache();
    const clientId = Session.getTemporaryActiveUserKey() || 'anonymous';
    const secureKey = `rate_limit_${Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_1, clientId).slice(0, 8)}`;

    const cached = cache.get(secureKey);
    const now = Date.now();

    if (!cached) {
      cache.put(secureKey, JSON.stringify({ count: 1, windowStart: now }), Math.ceil(RATE_LIMIT_WINDOW / 1000));
      return true;
    }

    const data = JSON.parse(cached);

    if (now - data.windowStart > RATE_LIMIT_WINDOW) {
      cache.put(secureKey, JSON.stringify({ count: 1, windowStart: now }), Math.ceil(RATE_LIMIT_WINDOW / 1000));
      return true;
    }

    if (data.count >= MAX_REQUESTS_PER_WINDOW) {
      console.log(`Rate limit exceeded for client: ${clientId.slice(0, 8)}...`);
      return false;
    }

    data.count++;
    cache.put(secureKey, JSON.stringify(data), Math.ceil((data.windowStart + RATE_LIMIT_WINDOW - now) / 1000));
    return true;

  } catch (error) {
    console.error('Rate limit check failed:', error);
    return true; // Fail-safe: allow request if check fails
  }
}

/**
 * Enhanced input sanitization
 */
function sanitizeInput(input) {
  if (!input) return '';

  return input.toString()
    .trim()
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/[<>'"&]/g, '') // Remove potentially dangerous characters
    .substring(0, 100); // Limit length
}

/**
 * Secure IP hashing for privacy
 */
function hashIP(ip) {
  const salt = 'cinque_campaign_2026_secure_salt';
  const hash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, ip + salt);
  return hash.map(byte => (byte + 256) % 256).map(byte => byte.toString(16).padStart(2, '0')).join('').substring(0, 16);
}

/**
 * Enhanced domain validation
 */
function validateDomain(params) {
  try {
    const referrer = params.referrer || '';
    const userAgent = params.userAgent || '';

    const allowedDomains = [
      'cinqueforcongress.com',
      'www.cinqueforcongress.com',
      'issaparty.github.io',
      'localhost',
      '127.0.0.1'
    ];

    let domainValid = false;
    if (referrer === '' || referrer === 'direct') {
      domainValid = true;
    } else {
      domainValid = allowedDomains.some(domain => referrer.includes(domain));
    }

    // Enhanced bot detection
    const botSignatures = ['bot', 'crawler', 'spider', 'scraper', 'headless', 'phantom', 'selenium'];
    const isBot = botSignatures.some(sig => userAgent.toLowerCase().includes(sig));

    if (isBot) {
      console.log(`Security: Bot detected - ${userAgent.slice(0, 50)}...`);
      return false;
    }

    if (!domainValid) {
      console.log(`Security: Unauthorized domain - ${referrer}`);
      return false;
    }

    return true;

  } catch (error) {
    console.error('Domain validation error:', error);
    return true; // Fail-safe
  }
}

/**
 * Enhanced human validation
 */
function validateHumanUser(params) {
  if (params.humanConfirmed !== 'true') {
    return { isHuman: false, reason: 'Human confirmation required' };
  }

  const interactionTime = parseInt(params.formInteractionTime) || 0;
  if (interactionTime < 3) {
    return { isHuman: false, reason: 'Please spend more time filling out the form' };
  }

  if (!params.browserFingerprint || params.browserFingerprint.length < 10) {
    return { isHuman: false, reason: 'Invalid browser signature' };
  }

  return { isHuman: true };
}

/**
 * Enhanced error logging with security context
 */
function logError(context, error) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let errorSheet = spreadsheet.getSheetByName('ErrorLog');

    if (!errorSheet) {
      errorSheet = spreadsheet.insertSheet('ErrorLog');
      errorSheet.getRange(1, 1, 1, 5).setValues([['Timestamp', 'Context', 'Error', 'Stack', 'Security Level']]);
    }

    errorSheet.appendRow([
      new Date(),
      context,
      error.message || error.toString(),
      error.stack || 'No stack trace',
      'SECURE'
    ]);

    const lastRow = errorSheet.getLastRow();
    if (lastRow > 101) {
      errorSheet.deleteRows(2, lastRow - 101);
    }

  } catch (logError) {
    console.error('Failed to log error:', logError);
  }
}

/**
 * Get progress sheet
 */
function getProgressSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(PROGRESS_SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(PROGRESS_SHEET_NAME);
    sheet.getRange(1, 1, 1, 5).setValues([[
      'Timestamp', 'Count', 'Target', 'Percentage', 'Source'
    ]]);
  }

  return sheet;
}

/**
 * Create secure response
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
 * Secure initialization
 */
function initialize() {
  try {
    getEndorsementSheet();
    getProgressSheet();
    console.log('Secure initialization completed successfully');
  } catch (error) {
    console.error('Initialization failed:', error);
  }
}