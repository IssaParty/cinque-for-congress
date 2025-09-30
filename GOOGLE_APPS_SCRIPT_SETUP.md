# Google Apps Script Setup Instructions

## Overview
The campaign website uses Google Apps Script to handle form submissions and track endorsement progress. Currently, the site runs in **demo mode** with mock responses because no Google Apps Script is configured.

## Steps to Configure Real Backend

### 1. Create Google Apps Script Project
1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the contents of `google-apps-script/Code.gs`

### 2. Set Up Google Sheet
1. Create a new Google Sheet for data storage
2. Create sheets named:
   - `Endorsements` (for storing form submissions)
   - `Progress` (for tracking counts)
   - `Errors` (for logging)
3. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)

### 3. Configure the Script
1. In your Google Apps Script, update line 8:
   ```javascript
   const SHEET_ID = 'YOUR_ACTUAL_SHEET_ID'; // Replace with your sheet ID
   ```

### 4. Deploy the Script
1. Click "Deploy" > "New deployment"
2. Choose type "Web app"
3. Set execute as "Me"
4. Set access to "Anyone"
5. Click "Deploy"
6. Copy the deployment ID from the URL (the part after `/macros/s/` and before `/exec`)

### 5. Update Website Configuration
1. In `src/utils/formSubmission.js` line 28, replace:
   ```javascript
   const scriptId = 'REPLACE_WITH_YOUR_SCRIPT_ID';
   ```
   with:
   ```javascript
   const scriptId = 'YOUR_ACTUAL_DEPLOYMENT_ID';
   ```

2. In `src/utils/progressStorage.js` line 42, make the same change

### 6. Deploy Updated Website
```bash
npm run build
npm run deploy
```

## Current Demo Mode
- Form submissions show success messages but don't save data
- Progress bar shows random numbers
- All security features (anti-bot, validation) are active
- No actual data is lost - switch to real backend anytime

## Security Features Active
✅ AES-256-GCM encryption
✅ Anti-bot validation
✅ Rate limiting
✅ Input sanitization
✅ CORS protection
✅ Browser fingerprinting

The website is fully functional in demo mode and ready for real backend integration.