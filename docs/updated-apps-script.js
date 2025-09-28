// UPDATED Google Apps Script - handles endorsement and join_us forms with phone/email
// Replace your entire Apps Script with this code

function doPost(e) {
  try {
    // Log what we received
    console.log('Received event:', e);
    console.log('Post data:', e.postData);
    console.log('Parameters:', e.parameter);

    // Get form parameters (NOT JSON)
    const params = e.parameter || {};

    console.log('Parsed parameters:', params);

    // Get the active sheet
    const sheet = SpreadsheetApp.openById('1E_hlG4vVeEVM-N7sr2wuDO0liXuuqLBjFFH8U0hwPl4').getActiveSheet();

    // Validate required fields
    if (!params.name || !params.city || !params.zipCode) {
      console.log('Missing required fields:', { name: params.name, city: params.city, zipCode: params.zipCode });
      return createResponse('ERROR: Missing required fields');
    }

    // Validate email for join_us forms
    if (params.type === 'join_us' && (!params.email || !params.email.trim())) {
      console.log('Missing email for join_us form');
      return createResponse('ERROR: Email is required for joining the campaign');
    }

    // Prepare submission data
    const submissionData = {
      timestamp: new Date().toISOString(),
      name: params.name.toString().trim().substring(0, 100),
      city: params.city.toString().trim().substring(0, 50),
      zipCode: params.zipCode.toString().trim().substring(0, 10),
      phone: (params.phone || '').toString().trim().substring(0, 20),
      email: (params.email || '').toString().trim().substring(0, 100),
      type: params.type || 'endorsement', // 'endorsement' or 'join_us'
      source: params.source || 'website',
      userAgent: (params.userAgent || '').substring(0, 200),
      referrer: params.referrer || 'direct',
      sessionId: params.sessionId || 'unknown',
      status: 'pending'
    };

    console.log('Processed submission data:', submissionData);

    // Check for duplicates (based on name and zipCode)
    try {
      const existingData = sheet.getDataRange().getValues();
      console.log('Sheet has', existingData.length, 'rows');

      if (existingData.length > 1) { // Skip header row
        for (let i = 1; i < existingData.length; i++) {
          const row = existingData[i];
          // Check columns: timestamp(0), name(1), city(2), zipCode(3)
          if (row[1] === submissionData.name && row[3] === submissionData.zipCode) {
            console.log('Duplicate found for:', submissionData.name, submissionData.zipCode);
            return createResponse('ERROR: This person has already submitted');
          }
        }
      }
    } catch (duplicateError) {
      console.log('Error checking duplicates:', duplicateError);
      // Continue anyway - don't fail the entire submission for duplicate check
    }

    // Add new submission to sheet
    // Order: timestamp, name, city, zipCode, phone, email, type, source, userAgent, referrer, sessionId, status
    const newRow = [
      submissionData.timestamp,
      submissionData.name,
      submissionData.city,
      submissionData.zipCode,
      submissionData.phone,
      submissionData.email,
      submissionData.type,
      submissionData.source,
      submissionData.userAgent,
      submissionData.referrer,
      submissionData.sessionId,
      submissionData.status
    ];

    console.log('Adding row to sheet:', newRow);

    sheet.appendRow(newRow);

    const actionText = submissionData.type === 'join_us' ? 'volunteer signup' : 'endorsement';
    console.log(`SUCCESS: Added ${actionText} for ${submissionData.name} from ${submissionData.city}`);

    // Return success response
    return createResponse(`SUCCESS: ${actionText} recorded for ${submissionData.name}`);

  } catch (error) {
    console.error('Error processing submission:', error);
    console.error('Error details:', error.toString());
    return createResponse('ERROR: ' + error.toString());
  }
}

// Create simple HTML response
function createResponse(message) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Form Submission Response</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .success { color: green; }
        .error { color: red; }
      </style>
    </head>
    <body>
      <h1>Campaign Form Submission</h1>
      <p class="${message.includes('ERROR') ? 'error' : 'success'}">${message}</p>
      <p><small>Timestamp: ${new Date().toISOString()}</small></p>
      <script>
        // Send message to parent window
        if (window.parent !== window) {
          window.parent.postMessage('${message}', '*');
        }
      </script>
    </body>
    </html>
  `;

  return HtmlService.createHtmlOutput(html);
}

// Handle GET requests (for testing)
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.openById('1E_hlG4vVeEVM-N7sr2wuDO0liXuuqLBjFFH8U0hwPl4').getActiveSheet();
    const lastRow = sheet.getLastRow();
    const count = Math.max(0, lastRow - 1); // Subtract header row

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Campaign Form API Status</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .form-group { margin: 10px 0; }
          .form-group input, .form-group select { margin-left: 10px; }
        </style>
      </head>
      <body>
        <h1>Campaign Form API</h1>
        <p><strong>Status:</strong> Active ✅</p>
        <p><strong>Total Submissions:</strong> ${count}</p>
        <p><strong>Last Updated:</strong> ${new Date().toISOString()}</p>
        <p><strong>Sheet ID:</strong> 1E_hlG4vVeEVM-N7sr2wuDO0liXuuqLBjFFH8U0hwPl4</p>

        <h2>Test Forms</h2>

        <h3>Test Endorsement Form</h3>
        <form action="" method="POST">
          <div class="form-group">Name: <input type="text" name="name" value="Test Endorser" required></div>
          <div class="form-group">City: <input type="text" name="city" value="Boulder" required></div>
          <div class="form-group">ZIP: <input type="text" name="zipCode" value="80301" required></div>
          <div class="form-group">Phone: <input type="tel" name="phone" value="555-123-4567"></div>
          <div class="form-group">Email: <input type="email" name="email" value="test@example.com"></div>
          <input type="hidden" name="type" value="endorsement">
          <input type="hidden" name="source" value="api-test">
          <div class="form-group"><button type="submit">Test Endorsement</button></div>
        </form>

        <h3>Test Join Us Form</h3>
        <form action="" method="POST">
          <div class="form-group">Name: <input type="text" name="name" value="Test Volunteer" required></div>
          <div class="form-group">City: <input type="text" name="city" value="Denver" required></div>
          <div class="form-group">ZIP: <input type="text" name="zipCode" value="80202" required></div>
          <div class="form-group">Phone: <input type="tel" name="phone" value="555-987-6543"></div>
          <div class="form-group">Email: <input type="email" name="email" value="volunteer@example.com" required></div>
          <input type="hidden" name="type" value="join_us">
          <input type="hidden" name="source" value="api-test">
          <div class="form-group"><button type="submit">Test Join Us</button></div>
        </form>
      </body>
    </html>
    `;

    return HtmlService.createHtmlOutput(html);
  } catch (error) {
    return HtmlService.createHtmlOutput(`<h1>Error</h1><p>${error.toString()}</p>`);
  }
}