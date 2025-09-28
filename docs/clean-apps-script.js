function doPost(e) {
  // Simple form handler - NO JSON parsing
  try {
    console.log('Form submission received');

    // Get the sheet
    var sheet = SpreadsheetApp.openById('1E_hlG4vVeEVM-N7sr2wuDO0liXuuqLBjFFH8U0hwPl4').getActiveSheet();

    // Get form data from e.parameter (NOT e.postData)
    var name = e.parameter.name || '';
    var city = e.parameter.city || '';
    var zipCode = e.parameter.zipCode || '';

    console.log('Received:', name, city, zipCode);

    // Validate
    if (!name || !city || !zipCode) {
      console.log('Missing data');
      return HtmlService.createHtmlOutput('<h1>Error: Missing required fields</h1>');
    }

    // Add to sheet
    var timestamp = new Date();
    var source = e.parameter.source || 'website';
    var userAgent = e.parameter.userAgent || '';
    var referrer = e.parameter.referrer || '';
    var sessionId = e.parameter.sessionId || '';

    sheet.appendRow([
      timestamp,
      name,
      city,
      zipCode,
      source,
      userAgent,
      referrer,
      sessionId,
      'pending'
    ]);

    console.log('Added to sheet successfully');

    return HtmlService.createHtmlOutput('<h1>Success!</h1><p>Endorsement recorded for ' + name + '</p>');

  } catch (error) {
    console.error('Error:', error);
    return HtmlService.createHtmlOutput('<h1>Error</h1><p>' + error.toString() + '</p>');
  }
}

function doGet(e) {
  return HtmlService.createHtmlOutput('<h1>Endorsement API Active</h1><p>Ready to receive form submissions</p>');
}