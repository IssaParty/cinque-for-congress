// FIXED Google Apps Script - handles form data correctly
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

    // Prepare endorsement data
    const endorsementData = {
      timestamp: new Date().toISOString(),
      name: params.name.toString().trim().substring(0, 100),
      city: params.city.toString().trim().substring(0, 50),
      zipCode: params.zipCode.toString().trim().substring(0, 10),
      source: params.source || 'website',
      userAgent: (params.userAgent || '').substring(0, 200),
      referrer: params.referrer || 'direct',
      sessionId: params.sessionId || 'unknown',
      status: 'pending'
    };

    console.log('Processed endorsement data:', endorsementData);

    // Check for duplicates
    try {
      const existingData = sheet.getDataRange().getValues();
      console.log('Sheet has', existingData.length, 'rows');

      if (existingData.length > 1) { // Skip header row
        for (let i = 1; i < existingData.length; i++) {
          const row = existingData[i];
          if (row[1] === endorsementData.name && row[3] === endorsementData.zipCode) {
            console.log('Duplicate found for:', endorsementData.name, endorsementData.zipCode);
            return createResponse('ERROR: This person has already endorsed');
          }
        }
      }
    } catch (duplicateError) {
      console.log('Error checking duplicates:', duplicateError);
      // Continue anyway - don't fail the entire submission for duplicate check
    }

    // Add new endorsement to sheet
    const newRow = [
      endorsementData.timestamp,
      endorsementData.name,
      endorsementData.city,
      endorsementData.zipCode,
      endorsementData.source,
      endorsementData.userAgent,
      endorsementData.referrer,
      endorsementData.sessionId,
      endorsementData.status
    ];

    console.log('Adding row to sheet:', newRow);

    sheet.appendRow(newRow);

    console.log(`SUCCESS: Added endorsement for ${endorsementData.name} from ${endorsementData.city}`);

    // Return success response
    return createResponse(`SUCCESS: Endorsement recorded for ${endorsementData.name}`);

  } catch (error) {
    console.error('Error processing endorsement:', error);
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
      <title>Endorsement Response</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .success { color: green; }
        .error { color: red; }
      </style>
    </head>
    <body>
      <h1>Endorsement Submission</h1>
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
        <title>Endorsement API Status</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
        </style>
      </head>
      <body>
        <h1>Campaign Endorsement API</h1>
        <p><strong>Status:</strong> Active ✅</p>
        <p><strong>Total Endorsements:</strong> ${count}</p>
        <p><strong>Last Updated:</strong> ${new Date().toISOString()}</p>
        <p><strong>Sheet ID:</strong> 1E_hlG4vVeEVM-N7sr2wuDO0liXuuqLBjFFH8U0hwPl4</p>

        <h2>Test Form</h2>
        <form action="" method="POST">
          <p>Name: <input type="text" name="name" value="Test User" required></p>
          <p>City: <input type="text" name="city" value="Boulder" required></p>
          <p>ZIP: <input type="text" name="zipCode" value="80301" required></p>
          <input type="hidden" name="source" value="api-test">
          <p><button type="submit">Test Submission</button></p>
        </form>
      </body>
    </html>
    `;

    return HtmlService.createHtmlOutput(html);
  } catch (error) {
    return HtmlService.createHtmlOutput(`<h1>Error</h1><p>${error.toString()}</p>`);
  }
}