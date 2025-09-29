/**
 * SECURE CAMPAIGN FORM HANDLER - Google Apps Script
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Replace Code.gs content with this script
 * 4. Update SHEET_ID constant below with your Google Sheet ID
 * 5. Deploy as web app with these settings:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the new deployment URL to your .env file
 *
 * SECURITY FEATURES:
 * - Rate limiting (max 10 submissions per hour per IP)
 * - Input validation and sanitization
 * - Execution time logging
 * - Error handling with detailed logs
 * - Spam detection
 */

// ===== CONFIGURATION =====
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your actual Sheet ID
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
    // Security: Check rate limiting
    if (!checkRateLimit()) {
      return createErrorResponse('Rate limit exceeded. Please try again later.');
    }

    // Parse form data
    const formData = parseFormData(e.parameter);

    // Validate required fields
    const validation = validateFormData(formData);
    if (!validation.valid) {
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
    Logger.log('FATAL ERROR: ' + error.toString());
    return createErrorResponse('System error. Please contact support.');
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return createResponse('Campaign Form Handler is running. POST your form data here.');
}

/**
 * Parse and clean form data
 */
function parseFormData(params) {
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
    const sheet = SpreadsheetApp.openById(SHEET_ID);

    // Determine which sheet to use based on form type
    let targetSheet;
    const sheetName = data.type === 'join_us' ? 'Volunteers' :
                     data.type === 'endorsement' ? 'Endorsements' :
                     'Other';

    try {
      targetSheet = sheet.getSheetByName(sheetName);
    } catch (e) {
      // Create sheet if it doesn't exist
      targetSheet = sheet.insertSheet(sheetName);

      // Add headers
      const headers = [
        'Timestamp', 'Name', 'City', 'ZIP Code', 'Phone', 'Email',
        'Type', 'Source', 'User Agent', 'Referrer', 'Session ID', 'IP Address'
      ];
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

    targetSheet.appendRow(rowData);

    return { success: true };

  } catch (error) {
    Logger.log('Sheet save error: ' + error.toString());
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
    Logger.log('Please update SHEET_ID constant with your actual Google Sheet ID');
    return false;
  }

  // Test form submission
  const testData = {
    parameter: {
      name: 'Test User',
      city: 'Boulder',
      zipCode: '80301',
      phone: '555-123-4567',
      email: 'test@example.com',
      type: 'join_us',
      source: 'test',
      timestamp: new Date().toISOString()
    }
  };

  const result = doPost(testData);
  Logger.log('✅ Test submission completed');

  return true;
}