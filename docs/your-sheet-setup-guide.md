# Setup Guide for Your Campaign Endorsements Sheet

Your Google Sheet: https://docs.google.com/spreadsheets/d/1E_hlG4vVeEVM-N7sr2wuDO0liXuuqLBjFFH8U0hwPl4/edit

## Step 1: Set Up Sheet Headers

1. **Open your Google Sheet** (link above)
2. **In Row 1, add these headers** (exactly as shown):

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Timestamp | Full Name | City | ZIP Code | Source | User Agent | Referrer | Session ID | Status |

## Step 2: Create Apps Script

1. **In your Google Sheet**, go to **Extensions > Apps Script**
2. **Delete the default code** and paste this:

```javascript
function doPost(e) {
  try {
    // Parse incoming data
    const data = JSON.parse(e.postData.contents);

    // Get the active sheet
    const sheet = SpreadsheetApp.openById('1E_hlG4vVeEVM-N7sr2wuDO0liXuuqLBjFFH8U0hwPl4').getActiveSheet();

    // Validate required fields
    if (!data.name || !data.city || !data.zipCode) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Missing required fields'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Sanitize and prepare data
    const endorsementData = {
      timestamp: new Date().toISOString(),
      name: data.name.toString().trim().substring(0, 100),
      city: data.city.toString().trim().substring(0, 50),
      zipCode: data.zipCode.toString().trim().substring(0, 10),
      source: data.source || 'website',
      userAgent: (data.userAgent || '').substring(0, 200),
      referrer: data.referrer || 'direct',
      sessionId: data.sessionId || 'unknown',
      status: 'pending'
    };

    // Check for duplicates
    const existingData = sheet.getDataRange().getValues();
    if (existingData.length > 1) { // Skip header row
      for (let i = 1; i < existingData.length; i++) {
        const row = existingData[i];
        if (row[1] === endorsementData.name && row[3] === endorsementData.zipCode) {
          return ContentService
            .createTextOutput(JSON.stringify({
              success: false,
              error: 'This person has already endorsed'
            }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    // Add new endorsement
    sheet.appendRow([
      endorsementData.timestamp,
      endorsementData.name,
      endorsementData.city,
      endorsementData.zipCode,
      endorsementData.source,
      endorsementData.userAgent,
      endorsementData.referrer,
      endorsementData.sessionId,
      endorsementData.status
    ]);

    // Log success
    console.log(`New endorsement: ${endorsementData.name} from ${endorsementData.city}`);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        id: `end_${Date.now()}`,
        message: 'Endorsement recorded successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'Server error - please try again'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Get endorsement count
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.openById('1E_hlG4vVeEVM-N7sr2wuDO0liXuuqLBjFFH8U0hwPl4').getActiveSheet();
    const lastRow = sheet.getLastRow();
    const count = Math.max(0, lastRow - 1); // Subtract header row

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        count: count
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

1. **Click the Save button** (💾) to save your script
2. **Click Deploy > New deployment**
3. **Choose Type**: Web app
4. **Description**: "Campaign Endorsement API"
5. **Execute as**: Me (your email)
6. **Who has access**: Anyone
7. **Click Deploy**
8. **Copy the Web App URL** - it will look like:
   `https://script.google.com/macros/s/ABC123.../exec`

## Step 4: Add Web App URL to Your Website

1. **Open the `.env` file** in your project
2. **Replace the empty `REACT_APP_GOOGLE_SCRIPT_URL=`** with your Web App URL:
   ```
   REACT_APP_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. **Save the file**

## Step 5: Restart Your Development Server

1. **Stop the current server** (Ctrl+C in terminal)
2. **Start it again**: `npm start`

## Step 6: Test the Form

1. **Go to** http://localhost:3000/endorsements
2. **Fill out the endorsement form**
3. **Submit it**
4. **Check your Google Sheet** - you should see the new endorsement!

## Step 7: Secure Your Sheet

1. **Right-click on the sheet tab** at the bottom
2. **Select "Protect sheet"**
3. **Set permissions to "Only you can edit"**
4. **Click "Set permissions"**

This prevents others from editing while allowing the script to add data.

## Expected Result

After setup, when someone submits an endorsement:
- ✅ Data appears instantly in your Google Sheet
- ✅ Duplicate submissions are blocked
- ✅ All submissions are timestamped
- ✅ You can export data anytime (File > Download)

## Troubleshooting

**If endorsements don't appear:**
1. Check the Web App URL is correct in `.env`
2. Make sure you deployed the script as "Anyone can access"
3. Check the browser console for error messages
4. Verify the sheet headers match exactly

**If you get permission errors:**
1. Re-deploy the script
2. Make sure "Execute as: Me" is selected
3. Authorize the script when prompted

**Need help?**
- Check the Apps Script logs: https://script.google.com > Your Project > Executions
- Test the Web App URL directly in your browser