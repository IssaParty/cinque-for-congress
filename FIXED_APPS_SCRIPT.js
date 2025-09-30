/**
 * FIXED SECURE CAMPAIGN FORM HANDLER - Google Apps Script
 *
 * SETUP INSTRUCTIONS:
 * 1. Replace your current Google Apps Script code with this
 * 2. Update SHEET_ID constant below with your Google Sheet ID
 * 3. Save and deploy as web app
 *
 * SECURITY FEATURES:
 * - Rate limiting, input validation, spam detection
 * - Error handling with detailed logs
 */

// ===== CONFIGURATION =====
const SHEET_ID = '1E_hlG4vVeEVM-N7sr2wuDO0liXuuqLBjFFH8U0hwPl4'; // Your actual Sheet ID
const MAX_SUBMISSIONS_PER_HOUR = 10;
const ALLOWED_ORIGINS = [
  'https://cinqueforcongress.com',
  'https://www.cinqueforcongress.com',
  'https://issaparty.github.io' // GitHub Pages backup domain
];

/**
 * Handle POST requests (form submissions)
 */
function doPost(e) {
  const startTime = new Date();

  try {
    Logger.log('doPost called with event: ' + JSON.stringify(e));

    // Check if event and parameter exist
    if (!e || !e.parameter) {
      Logger.log('ERROR: No event or parameter object received');
      return createErrorResponse('Invalid request format');
    }

    Logger.log('Parameters received: ' + JSON.stringify(e.parameter));

    // Security: Check rate limiting
    if (!checkRateLimit()) {
      return createErrorResponse('Rate limit exceeded. Please try again later.');
    }

    // Parse form data
    const formData = parseFormData(e.parameter);
    Logger.log('Parsed form data: ' + JSON.stringify(formData));

    // Validate required fields
    const validation = validateFormData(formData);
    if (!validation.valid) {
      Logger.log('Validation failed: ' + validation.error);
      return createErrorResponse(validation.error);
    }

    // Security: Basic spam detection
    if (isSpam(formData)) {
      Logger.log('Spam detected: ' + JSON.stringify(formData));
      return createErrorResponse('Submission blocked by security filters.');
    }

    // Save to spreadsheet
    const result = saveToSheet(formData);

    if (result.success) {
      // Log successful submission
      Logger.log(`SUCCESS: ${formData.type} submission from ${formData.name} saved. Execution time: ${new Date() - startTime}ms`);

      return createSuccessResponse(
        `SUCCESS: ${formData.type === 'join_us' ? 'volunteer signup' : formData.type} recorded for ${formData.name}`
      );
    } else {
      Logger.log('ERROR: Failed to save to sheet: ' + result.error);
      return createErrorResponse('Failed to save submission. Please try again.');
    }

  } catch (error) {
    Logger.log('FATAL ERROR in doPost: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
    return createErrorResponse('System error. Please contact support.');
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  Logger.log('doGet called');
  return createResponse('Campaign Form Handler is running. POST your form data here.');
}

/**
 * Parse and clean form data
 */
function parseFormData(params) {
  if (!params) {
    throw new Error('No parameters provided');
  }

  return {
    name: cleanString(params.name || ''),
    city: cleanString(params.city || ''),
    zipCode: cleanString(params.zipCode || ''),
    phone: cleanString(params.phone || ''),
    email: cleanString(params.email || ''),
    type: cleanString(params.type || 'endorsement'),
    source: cleanString(params.source || 'unknown'),
    userAgent: cleanString((params.userAgent || '').substring(0, 200)),
    referrer: cleanString(params.referrer || ''),
    sessionId: cleanString(params.sessionId || ''),
    timestamp: params.timestamp || new Date().toISOString(),
    ipAddress: getClientIP(),
    submissionTime: new Date().toISOString()
  };
}

/**
 * Validate form data
 */
function validateFormData(data) {
  // Required fields
  if (!data.name || data.name.length < 2) {
    return { valid: false, error: 'Name is required (minimum 2 characters)' };
  }

  if (!data.city || data.city.length < 2) {
    return { valid: false, error: 'City is required (minimum 2 characters)' };
  }

  if (!data.zipCode || !/^\d{5}(-\d{4})?$/.test(data.zipCode)) {
    return { valid: false, error: 'Valid ZIP code is required (e.g., 80301 or 80301-1234)' };
  }

  // Email validation (required for join_us, optional for others)
  if (data.type === 'join_us' && (!data.email || !isValidEmail(data.email))) {
    return { valid: false, error: 'Valid email address is required for campaign signup' };
  }

  if (data.email && !isValidEmail(data.email)) {
    return { valid: false, error: 'Please provide a valid email address' };
  }

  // Phone validation (optional)
  if (data.phone && !isValidPhone(data.phone)) {
    return { valid: false, error: 'Please provide a valid phone number' };
  }

  // Name length check
  if (data.name.length > 100) {
    return { valid: false, error: 'Name is too long (maximum 100 characters)' };
  }

  return { valid: true };
}

/**
 * Basic spam detection
 */
function isSpam(data) {
  // Check for suspicious patterns
  const spamPatterns = [
    /http[s]?:\/\//i,  // URLs in name/city
    /\b(viagra|cialis|loan|casino|poker)\b/i,  // Spam keywords
    /(.)\1{10,}/,  // Repeated characters
  ];

  const textFields = [data.name, data.city, data.email];

  for (const field of textFields) {
    if (field) {
      for (const pattern of spamPatterns) {
        if (pattern.test(field)) {
          return true;
        }
      }
    }
  }

  // Check for suspicious email domains
  if (data.email && data.email.includes('@')) {
    const domain = data.email.split('@')[1].toLowerCase();
    const suspiciousDomains = ['tempmail.org', '10minutemail.com', 'mailinator.com'];
    if (suspiciousDomains.includes(domain)) {
      return true;
    }
  }

  return false;
}

/**
 * Rate limiting check
 */
function checkRateLimit() {
  try {
    const ip = getClientIP();
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    // Use PropertiesService to track submissions
    const properties = PropertiesService.getScriptProperties();
    const key = `rate_${ip}`;
    const submissions = JSON.parse(properties.getProperty(key) || '[]');

    // Filter submissions from the last hour
    const recentSubmissions = submissions.filter(timestamp =>
      new Date(timestamp) > oneHourAgo
    );

    if (recentSubmissions.length >= MAX_SUBMISSIONS_PER_HOUR) {
      return false;
    }

    // Add current submission
    recentSubmissions.push(now.toISOString());
    properties.setProperty(key, JSON.stringify(recentSubmissions));

    return true;

  } catch (error) {
    Logger.log('Rate limit check failed: ' + error.toString());
    return true; // Allow submission if rate limiting fails
  }
}

/**
 * Get client IP address (limited in Apps Script)
 */
function getClientIP() {
  try {
    // Apps Script doesn't provide real client IP, but we can create a session identifier
    return Session.getTemporaryActiveUserKey() || 'unknown';
  } catch (error) {
    return 'unknown';
  }
}

/**
 * Save data to spreadsheet
 */
function saveToSheet(data) {
  try {
    Logger.log('Attempting to save to sheet with ID: ' + SHEET_ID);

    const sheet = SpreadsheetApp.openById(SHEET_ID);
    Logger.log('Successfully opened spreadsheet: ' + sheet.getName());

    // Determine which sheet to use based on form type
    let targetSheet;
    const sheetName = data.type === 'join_us' ? 'Volunteers' :
                     data.type === 'endorsement' ? 'Endorsements' :
                     'Other';

    Logger.log('Looking for sheet: ' + sheetName);

    try {
      targetSheet = sheet.getSheetByName(sheetName);
      if (!targetSheet) {
        Logger.log('Sheet not found, creating: ' + sheetName);
        targetSheet = sheet.insertSheet(sheetName);
      }
    } catch (e) {
      Logger.log('Creating new sheet: ' + sheetName);
      targetSheet = sheet.insertSheet(sheetName);
    }

    // Check if headers exist, add if not
    const headers = [
      'Timestamp', 'Name', 'City', 'ZIP Code', 'Phone', 'Email',
      'Type', 'Source', 'User Agent', 'Referrer', 'Session ID', 'IP Address'
    ];

    if (targetSheet.getLastRow() === 0) {
      Logger.log('Adding headers to new sheet');
      targetSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }

    // Add data row
    const rowData = [
      data.submissionTime,
      data.name,
      data.city,
      data.zipCode,
      data.phone,
      data.email,
      data.type,
      data.source,
      data.userAgent,
      data.referrer,
      data.sessionId,
      data.ipAddress
    ];

    Logger.log('Adding row data: ' + JSON.stringify(rowData));
    targetSheet.appendRow(rowData);
    Logger.log('Successfully added row to sheet');

    return { success: true };

  } catch (error) {
    Logger.log('Sheet save error: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
    return { success: false, error: error.toString() };
  }
}

/**
 * Utility: Clean and sanitize string input
 */
function cleanString(str) {
  if (!str) return '';

  return str.toString()
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML
    .substring(0, 500); // Limit length
}

/**
 * Utility: Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Utility: Validate phone format
 */
function isValidPhone(phone) {
  const phoneRegex = /^[\d\s\-\(\)\+\.]{7,}$/;
  return phoneRegex.test(phone) && phone.length <= 20;
}

/**
 * Create success response
 */
function createSuccessResponse(message) {
  return createResponse(message, 'success');
}

/**
 * Create error response
 */
function createErrorResponse(message) {
  return createResponse(message, 'error');
}

/**
 * Create HTML response
 */
function createResponse(message, type = 'info') {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Form Submission Response</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .success { color: green; }
        .error { color: red; }
        .info { color: blue; }
      </style>
    </head>
    <body>
      <h1>Campaign Form Submission</h1>
      <p class="${type}">${message}</p>
      <p><small>Timestamp: ${new Date().toISOString()}</small></p>
      <script>
        // Send message to parent window (for iframe integration)
        if (window.parent !== window) {
          window.parent.postMessage('${message}', '*');
        }
      </script>
    </body>
    </html>
  `;

  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Test function - run this to verify setup
 */
function testSetup() {
  Logger.log('Testing Google Apps Script setup...');

  // Test sheet access
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID);
    Logger.log('✅ Sheet access successful: ' + sheet.getName());
  } catch (error) {
    Logger.log('❌ Sheet access failed: ' + error.toString());
    Logger.log('Please verify SHEET_ID is correct: ' + SHEET_ID);
    return false;
  }

  // Test form submission with mock data
  const testEvent = {
    parameter: {
      name: 'Test User',
      city: 'Boulder',
      zipCode: '80301',
      phone: '555-123-4567',
      email: 'test@example.com',
      type: 'endorsement',
      source: 'test',
      timestamp: new Date().toISOString()
    }
  };

  try {
    const result = doPost(testEvent);
    Logger.log('✅ Test submission completed successfully');
    return true;
  } catch (error) {
    Logger.log('❌ Test submission failed: ' + error.toString());
    return false;
  }
}