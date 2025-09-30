# Google Apps Script Setup Instructions

## Overview
This Google Apps Script serves as the backend for the Cinque for Congress endorsement tracking system. It provides secure signature count management with automatic syncing and hourly error checking.

## Setup Instructions

### 1. Create Google Sheets
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Cinque for Congress - Endorsement Tracking"
4. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)

### 2. Deploy Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project
3. Replace the default `Code.gs` content with the provided script
4. Update the `SHEET_ID` constant with your actual Sheet ID
5. Save the project

### 3. Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set execution as "Me"
4. Set access to "Anyone"
5. Click "Deploy"
6. Copy the Web App URL

### 4. Update Website Configuration
The script uses obfuscated URLs, so you'll need to encode your Web App URL:

1. Take your Web App URL: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
2. Extract the script ID part
3. Convert each character to ASCII code + 48
4. Update the character arrays in `progressStorage.js`

### 5. Set Up Triggers
Run the `initialize()` function once to:
- Create necessary sheets
- Set up hourly sync triggers

### 6. Test the Integration
1. Deploy your website
2. Submit a test endorsement
3. Check that the count updates in both the sheet and website
4. Verify hourly sync is working

## Features

### Automatic Data Management
- **Real-time Count Sync**: Progress bar syncs with actual endorsement data
- **Hourly Error Checking**: Automatic validation and correction
- **Duplicate Prevention**: Prevents duplicate endorsements
- **Rate Limiting**: 100 requests per hour per client

### Security Features
- **Input Sanitization**: Prevents XSS and injection attacks
- **IP Hash Privacy**: Stores hashed IPs for analytics while preserving privacy
- **Error Logging**: Comprehensive error tracking and monitoring
- **Data Validation**: Ensures data integrity across all operations

### Sheet Structure
- **Endorsements Sheet**: Stores all endorsement data
- **Progress Sheet**: Tracks count changes over time
- **ErrorLog Sheet**: Monitors system errors and issues

## API Endpoints

### GET_COUNT
Returns current endorsement count and progress information.

### INCREMENT_COUNT
Increments the count (used when progress bar needs updating).

### SUBMIT_ENDORSEMENT
Submits a new endorsement with validation and duplicate checking.

### SYNC_CHECK
Performs data integrity check and syncs any discrepancies.

## Monitoring

The script automatically:
- Validates data integrity every hour
- Logs all errors for review
- Maintains performance by limiting sheet size
- Provides detailed response data for debugging

## Troubleshooting

### Common Issues
1. **Sheet ID not found**: Verify the SHEET_ID constant is correct
2. **Permission errors**: Ensure script has access to the sheet
3. **Rate limiting**: Check if you're exceeding 100 requests/hour
4. **Sync issues**: Review the ErrorLog sheet for specific errors

### Manual Sync
If sync issues occur, the script will automatically correct them during the next hourly check. You can also manually trigger `hourlySync()` function.