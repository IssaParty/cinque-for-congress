# 🔒 SECURE GOOGLE APPS SCRIPT SETUP

## 🚨 CRITICAL: Your Previous Script Was Exposed

Your old Google Apps Script URL was exposed in the public GitHub repository. You MUST create a new one to secure your campaign data.

## ✅ STEP-BY-STEP SETUP

### 1. Create New Google Apps Script

1. **Go to:** [script.google.com](https://script.google.com)
2. **Click:** "New Project"
3. **Replace** the default `Code.gs` content with the code from `NEW_APPS_SCRIPT.js`
4. **Update Line 21:** Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your actual Google Sheet ID:
   ```javascript
   const SHEET_ID = '1E_hlG4vVeEVM-N7sr2wuDO0liXuuqLBjFFH8U0hwPl4';
   ```

### 2. Deploy the Script

1. **Click:** "Deploy" → "New deployment"
2. **Settings:**
   - **Type:** Web app
   - **Execute as:** Me (your Google account)
   - **Who has access:** Anyone
3. **Click:** "Deploy"
4. **COPY** the new web app URL (it will be different from your old one)

### 3. Update Your Environment File

1. **Create** a new `.env` file locally (DO NOT commit to git):
   ```bash
   cp .env.example .env
   ```

2. **Edit** `.env` with your NEW script URL:
   ```
   REACT_APP_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_NEW_SCRIPT_ID_HERE/exec
   REACT_APP_GOOGLE_SHEET_ID=1E_hlG4vVeEVM-N7sr2wuDO0liXuuqLBjFFH8U0hwPl4
   REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### 4. Test the New Script

1. **In Google Apps Script, click:** "Run" → "testSetup"
2. **Check logs** for success messages
3. **Test form submission** from your website

### 5. Deploy Website Updates

```bash
npm run build
npm run deploy
```

## 🛡️ SECURITY FEATURES ADDED

### ✅ **Rate Limiting**
- Maximum 10 submissions per hour per user
- Prevents spam and abuse

### ✅ **Input Validation**
- Sanitizes all input data
- Validates email formats, ZIP codes, phone numbers
- Prevents injection attacks

### ✅ **Spam Detection**
- Blocks suspicious content (URLs, spam keywords)
- Filters out temporary email addresses
- Detects repeated characters

### ✅ **Enhanced Logging**
- Tracks all submissions with timestamps
- Logs execution times and errors
- Helps with debugging and monitoring

### ✅ **Data Organization**
- Automatically creates separate sheets for:
  - **Volunteers** (join_us submissions)
  - **Endorsements** (endorsement submissions)
  - **Other** (fallback for other types)

## 🚨 SECURITY REMINDERS

### ❌ **NEVER DO:**
- Commit `.env` files to git
- Share your Google Apps Script URL publicly
- Give edit access to your Google Sheet unnecessarily

### ✅ **ALWAYS DO:**
- Keep your Google Apps Script URL private
- Monitor your Google Apps Script execution logs
- Regularly review form submissions for suspicious activity
- Keep your local `.env` file secure

## 📊 MONITORING YOUR SCRIPT

### **Check Execution Logs:**
1. Go to your Google Apps Script project
2. Click "Executions" in the sidebar
3. Monitor for errors or unusual activity

### **View Submissions:**
- Your Google Sheet will be automatically organized
- Each form type gets its own sheet tab
- All submissions include timestamps and metadata

## 🔧 TROUBLESHOOTING

### **If Forms Aren't Working:**
1. Check Google Apps Script execution logs for errors
2. Verify the SHEET_ID is correct in your script
3. Ensure the script is deployed as "Anyone can access"
4. Check that your `.env` file has the correct new URL

### **If You See Rate Limiting Errors:**
- This is working as intended to prevent spam
- Users can submit again after an hour
- You can adjust `MAX_SUBMISSIONS_PER_HOUR` in the script if needed

---

## 🎯 RESULT

After completing these steps:
- ✅ Your old exposed script URL will be replaced
- ✅ Enhanced security prevents spam and abuse
- ✅ Better organization with automatic sheet management
- ✅ Detailed logging for monitoring and debugging
- ✅ Forms will work reliably with improved error handling

**Your campaign data will be much more secure!**