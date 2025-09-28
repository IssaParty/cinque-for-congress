// Simple Google Apps Script that handles form POST data
// Replace your entire Apps Script with this code

function doPost(e) {
  try {
    // Get form parameters
    const params = e.parameter;

    console.log('Received parameters:', params);

    // Get the active sheet
    const sheet = SpreadsheetApp.openById('1E_hlG4vVeEVM-N7sr2wuDO0liXuuqLBjFFH8U0hwPl4').getActiveSheet();

    // Validate required fields
    if (!params.name || !params.city || !params.zipCode) {
      console.log('Missing required fields');
      return createResponse('Missing required fields');
    }

    // Prepare endorsement data
    const endorsementData = {
      timestamp: params.timestamp || new Date().toISOString(),
      name: params.name.toString().trim().substring(0, 100),
      city: params.city.toString().trim().substring(0, 50),
      zipCode: params.zipCode.toString().trim().substring(0, 10),
      source: params.source || 'website',
      userAgent: (params.userAgent || '').substring(0, 200),
      referrer: params.referrer || 'direct',
      sessionId: params.sessionId || 'unknown',
      status: 'pending'
    };

    console.log('Processed data:', endorsementData);

    // Check for duplicates
    const existingData = sheet.getDataRange().getValues();
    if (existingData.length > 1) { // Skip header row
      for (let i = 1; i < existingData.length; i++) {
        const row = existingData[i];
        if (row[1] === endorsementData.name && row[3] === endorsementData.zipCode) {
          console.log('Duplicate found');
          return createResponse('This person has already endorsed');
        }
      }
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

    sheet.appendRow(newRow);

    console.log(`Success: Added endorsement for ${endorsementData.name} from ${endorsementData.city}`);

    // Return success response
    return createResponse('SUCCESS: Endorsement recorded');

  } catch (error) {
    console.error('Error processing endorsement:', error);
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
    </head>
    <body>
      <h1>Endorsement Submission</h1>
      <p>${message}</p>
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
      </head>
      <body>
        <h1>Campaign Endorsement API</h1>
        <p>Status: Active</p>
        <p>Total Endorsements: ${count}</p>
        <p>Last Updated: ${new Date().toISOString()}</p>
      </body>
      </html>
    `;

    return HtmlService.createHtmlOutput(html);
  } catch (error) {
    return HtmlService.createHtmlOutput(`<h1>Error</h1><p>${error.toString()}</p>`);
  }
}