# Google Apps Script Setup for Secure Endorsement Storage

## Step 1: Create Google Sheets Document

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Campaign Endorsements"
3. Set up columns in Sheet1:
   - A: Timestamp
   - B: Full Name
   - C: City
   - D: ZIP Code
   - E: Source
   - F: User Agent
   - G: Referrer
   - H: Session ID
   - I: Status (verified/pending)

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Replace the default code with this script:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();

    // Validate required fields
    if (!data.name || !data.city || !data.zipCode) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Missing required fields'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Sanitize data
    const sanitizedData = {
      timestamp: data.timestamp || new Date().toISOString(),
      name: data.name.toString().trim().substring(0, 100),
      city: data.city.toString().trim().substring(0, 50),
      zipCode: data.zipCode.toString().trim().substring(0, 10),
      source: data.source || 'unknown',
      userAgent: (data.userAgent || '').substring(0, 200),
      referrer: (data.referrer || 'direct').substring(0, 200),
      sessionId: data.sessionId || 'unknown',
      status: 'pending'
    };

    // Check for duplicates (same name + ZIP code)
    const existingData = sheet.getDataRange().getValues();
    const headers = existingData[0];
    const nameCol = headers.indexOf('Full Name') + 1;
    const zipCol = headers.indexOf('ZIP Code') + 1;

    for (let i = 1; i < existingData.length; i++) {
      const row = existingData[i];
      if (row[nameCol-1] === sanitizedData.name &&
          row[zipCol-1] === sanitizedData.zipCode) {
        return ContentService
          .createTextOutput(JSON.stringify({
            success: false,
            error: 'This person has already endorsed'
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Add the data to the sheet
    const newRow = [
      sanitizedData.timestamp,
      sanitizedData.name,
      sanitizedData.city,
      sanitizedData.zipCode,
      sanitizedData.source,
      sanitizedData.userAgent,
      sanitizedData.referrer,
      sanitizedData.sessionId,
      sanitizedData.status
    ];

    sheet.appendRow(newRow);

    // Generate unique ID for this submission
    const rowNumber = sheet.getLastRow();
    const uniqueId = `end_${Date.now()}_${rowNumber}`;

    // Log the submission (optional)
    console.log(`New endorsement: ${sanitizedData.name} from ${sanitizedData.city}`);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        id: uniqueId,
        message: 'Endorsement recorded successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Error processing endorsement:', error);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'Server error - please try again'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Function to get endorsement count (for public display)
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const lastRow = sheet.getLastRow();
    const count = Math.max(0, lastRow - 1); // Subtract header row

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        count: count,
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'Could not retrieve count'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 3: Deploy the Script

1. Click **Deploy > New deployment**
2. Choose type: **Web app**
3. Description: "Campaign Endorsement API"
4. Execute as: **Me**
5. Who has access: **Anyone** (this allows your website to submit data)
6. Click **Deploy**
7. **Copy the Web App URL** - you'll need this for your website

## Step 4: Set Up Environment Variables

1. Create a `.env` file in your project root:
```
REACT_APP_GOOGLE_SCRIPT_URL=YOUR_COPIED_WEB_APP_URL
```

## Step 5: Security Best Practices

### Sheet Protection:
1. Right-click on the sheet tab > **Protect sheet**
2. Set permissions to "Only you can edit"
3. This prevents unauthorized access while allowing the script to write

### Additional Security:
- Enable 2-Factor Authentication on your Google account
- Regularly review the Apps Script logs
- Consider setting up email notifications for new submissions

### Data Privacy:
- Add a privacy notice to your endorsement form
- Consider anonymizing data after a certain period
- Regularly backup your data

## Step 6: Optional Enhancements

### Email Notifications:
Add this to your Apps Script to get notified of new endorsements:

```javascript
// Add after successful submission in doPost function
GmailApp.sendEmail(
  'your-email@example.com',
  'New Campaign Endorsement',
  `New endorsement from ${sanitizedData.name} in ${sanitizedData.city}, ${sanitizedData.zipCode}`
);
```

### Data Export:
The spreadsheet automatically provides export options (CSV, Excel, PDF)

## Alternative: Encrypted Google Drive Storage

If you prefer file-based storage:

1. Create a Google Apps Script that writes to a Google Drive file
2. Use CryptoJS for client-side encryption before sending
3. Store encrypted JSON data in Drive files

## Support

- Google Apps Script Documentation: https://developers.google.com/apps-script
- Sheets API Reference: https://developers.google.com/sheets/api
- For campaign-specific help, contact your technical team lead