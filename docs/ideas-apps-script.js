// IDEAS Google Apps Script - handles ideas form submissions
// Deploy this as a new Google Apps Script for the Ideas sheet: 1dLrRjPWqqSo-nd-7FOzG9i3cg_X_mebrFaJtHXYvUrg

function doPost(e) {
  try {
    // Log what we received
    console.log('Received event:', e);
    console.log('Post data:', e.postData);
    console.log('Parameters:', e.parameter);

    // Get form parameters (NOT JSON)
    const params = e.parameter || {};

    console.log('Parsed parameters:', params);

    // Get the active sheet for IDEAS
    const sheet = SpreadsheetApp.openById('1dLrRjPWqqSo-nd-7FOzG9i3cg_X_mebrFaJtHXYvUrg').getActiveSheet();

    // Validate required fields
    if (!params.name || !params.city || !params.zipCode) {
      console.log('Missing required fields:', { name: params.name, city: params.city, zipCode: params.zipCode });
      return createResponse('ERROR: Missing required fields');
    }

    // Validate ideas-specific fields
    if (!params.idea || params.idea.trim().length < 10) {
      console.log('Missing or insufficient idea content');
      return createResponse('ERROR: Please provide your idea or suggestion (minimum 10 characters)');
    }

    if (!params.category) {
      console.log('Missing category');
      return createResponse('ERROR: Please select a category for your idea');
    }

    // Prepare submission data
    const submissionData = {
      timestamp: new Date().toISOString(),
      name: params.name.toString().trim().substring(0, 100),
      city: params.city.toString().trim().substring(0, 50),
      zipCode: params.zipCode.toString().trim().substring(0, 10),
      phone: (params.phone || '').toString().trim().substring(0, 20),
      email: (params.email || '').toString().trim().substring(0, 100),
      category: params.category.toString().trim().substring(0, 50),
      idea: params.idea.toString().trim().substring(0, 2000), // Allow longer text for ideas
      type: params.type || 'ideas',
      source: params.source || 'website',
      userAgent: (params.userAgent || '').substring(0, 200),
      referrer: params.referrer || 'direct',
      sessionId: params.sessionId || 'unknown',
      status: 'pending'
    };

    console.log('Processed submission data:', submissionData);

    // Check for duplicates (based on name and idea content to avoid duplicate submissions)
    try {
      const existingData = sheet.getDataRange().getValues();
      console.log('Sheet has', existingData.length, 'rows');

      if (existingData.length > 1) { // Skip header row
        for (let i = 1; i < existingData.length; i++) {
          const row = existingData[i];
          // Check columns: timestamp(0), name(1), city(2), zipCode(3), phone(4), email(5), category(6), idea(7)
          if (row[1] === submissionData.name && row[7] === submissionData.idea) {
            console.log('Duplicate found for:', submissionData.name, 'with same idea content');
            return createResponse('ERROR: This idea has already been submitted');
          }
        }
      }
    } catch (duplicateError) {
      console.log('Error checking duplicates:', duplicateError);
      // Continue anyway - don't fail the entire submission for duplicate check
    }

    // Add new submission to sheet
    // Order: timestamp, name, city, zipCode, phone, email, category, idea, type, source, userAgent, referrer, sessionId, status
    const newRow = [
      submissionData.timestamp,
      submissionData.name,
      submissionData.city,
      submissionData.zipCode,
      submissionData.phone,
      submissionData.email,
      submissionData.category,
      submissionData.idea,
      submissionData.type,
      submissionData.source,
      submissionData.userAgent,
      submissionData.referrer,
      submissionData.sessionId,
      submissionData.status
    ];

    console.log('Adding row to sheet:', newRow);

    sheet.appendRow(newRow);

    console.log(`SUCCESS: Added idea submission for ${submissionData.name} from ${submissionData.city}`);

    // Return success response
    return createResponse(`SUCCESS: Idea submission recorded for ${submissionData.name}`);

  } catch (error) {
    console.error('Error processing idea submission:', error);
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
      <title>Ideas Submission Response</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .success { color: green; }
        .error { color: red; }
      </style>
    </head>
    <body>
      <h1>Ideas Form Submission</h1>
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
    const sheet = SpreadsheetApp.openById('1dLrRjPWqqSo-nd-7FOzG9i3cg_X_mebrFaJtHXYvUrg').getActiveSheet();
    const lastRow = sheet.getLastRow();
    const count = Math.max(0, lastRow - 1); // Subtract header row

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Ideas Form API Status</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .form-group { margin: 10px 0; }
          .form-group input, .form-group select, .form-group textarea { margin-left: 10px; display: block; width: 300px; }
        </style>
      </head>
      <body>
        <h1>Campaign Ideas Form API</h1>
        <p><strong>Status:</strong> Active ✅</p>
        <p><strong>Total Ideas Submitted:</strong> ${count}</p>
        <p><strong>Last Updated:</strong> ${new Date().toISOString()}</p>
        <p><strong>Sheet ID:</strong> 1dLrRjPWqqSo-nd-7FOzG9i3cg_X_mebrFaJtHXYvUrg</p>

        <h2>Test Ideas Form</h2>
        <form action="" method="POST">
          <div class="form-group">Name: <input type="text" name="name" value="Test Ideas User" required></div>
          <div class="form-group">City: <input type="text" name="city" value="Boulder" required></div>
          <div class="form-group">ZIP: <input type="text" name="zipCode" value="80301" required></div>
          <div class="form-group">Phone: <input type="tel" name="phone" value="555-123-4567"></div>
          <div class="form-group">Email: <input type="email" name="email" value="ideas@example.com"></div>
          <div class="form-group">Category:
            <select name="category" required>
              <option value="policy">Policy Suggestion</option>
              <option value="campaign">Campaign Strategy</option>
              <option value="community">Community Initiative</option>
              <option value="environment">Environmental Issue</option>
              <option value="economy">Economic Proposal</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-group">Idea:
            <textarea name="idea" required rows="4">This is a test idea submission to verify the form is working correctly. We need better public transportation in our district.</textarea>
          </div>
          <input type="hidden" name="type" value="ideas">
          <input type="hidden" name="source" value="api-test">
          <div class="form-group"><button type="submit">Test Ideas Submission</button></div>
        </form>
      </body>
    </html>
    `;

    return HtmlService.createHtmlOutput(html);
  } catch (error) {
    return HtmlService.createHtmlOutput(`<h1>Error</h1><p>${error.toString()}</p>`);
  }
}