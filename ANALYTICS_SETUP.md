# 📊 Campaign Website Analytics Setup Guide

## Overview
This guide helps you set up comprehensive visitor tracking for your campaign website to monitor:
- **Daily visitor counts**
- **Cumulative total visitors**
- **Geographic data (country, state, city)**
- **Form interactions and conversions**
- **Page engagement metrics**

## Method 1: Google Analytics 4 (Primary - Recommended)

### Step 1: Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com)
2. Click "Start measuring"
3. Create an account named "Cinque for Congress"
4. Create a property named "Campaign Website"
5. Select "Web" as your platform
6. Enter your website URL: `https://cinqueforcongress.com`

### Step 2: Get Your Measurement ID
1. In your Google Analytics dashboard
2. Go to Admin (gear icon) → Property Settings
3. Copy your **Measurement ID** (starts with G-XXXXXXXXXX)

### Step 3: Add Measurement ID to Website
1. Edit your `.env` file
2. Replace `G-XXXXXXXXXX` with your actual Measurement ID:
   ```
   REACT_APP_GA_MEASUREMENT_ID=G-1234567890
   ```

### Step 4: Deploy with Analytics
```bash
npm run build
npm run deploy
```

## What You'll Get in Google Analytics

### 📈 **Visitor Metrics:**
- **Real-time users** currently on your site
- **Daily active users** (unique visitors per day)
- **Total users** (cumulative visitors)
- **New vs. returning visitors**
- **Session duration** and **bounce rate**

### 🌍 **Geographic Data:**
- **Country breakdown** of visitors
- **State/region data** (for US visitors)
- **City-level data** (for detailed targeting)
- **Language preferences**

### 📱 **Device & Technology:**
- **Desktop vs. mobile** usage
- **Operating systems** (Windows, iOS, Android)
- **Browser types** (Chrome, Safari, Firefox)
- **Screen resolutions**

### 🎯 **Campaign-Specific Tracking:**
- **Form submissions** (Join Us, Contact forms)
- **Page popularity** (which pages get most traffic)
- **Referral sources** (how people find your site)
- **Social media traffic**

## Method 2: Alternative Privacy-First Tracking

If you prefer not to use Google Analytics, the website also includes:

### Local Storage Analytics (Already Implemented):
- Tracks visits in browser storage
- Privacy-friendly (data stays local)
- Provides backup analytics data
- Respects user privacy completely

### Simple Manual Tracking:
- Check your web host's access logs
- Use GitHub Pages traffic insights
- Monitor social media link clicks

## Privacy Compliance

### ✅ **Already Configured For You:**
- **IP anonymization** enabled
- **No advertising features** activated
- **GDPR-compliant** settings
- **Campaign-specific** event tracking only

### 📋 **What's Being Tracked:**
- Page views and session data
- Geographic location (country/state only)
- Form interactions (join, contact)
- Referral sources
- Device types (for mobile optimization)

### 🚫 **What's NOT Tracked:**
- Personal identifying information
- Email addresses or names
- Detailed behavioral profiles
- Advertising-related data

## Reading Your Analytics Data

### Daily Visitors:
1. Go to Reports → Audience → Overview
2. Select date range (Today, Yesterday, Last 7 days)
3. See "Users" metric for unique daily visitors

### Cumulative Total:
1. Reports → Audience → Overview
2. Select "All time" date range
3. "Total Users" shows all-time visitors

### Geographic Breakdown:
1. Reports → Audience → Demographics
2. Click "Location"
3. View by Country → State → City

### Top Pages:
1. Reports → Behavior → Site Content
2. "All Pages" shows most visited pages

## Campaign Optimization Tips

### 📊 **Use Analytics to:**
- **Identify peak traffic times** for social media posts
- **See which pages** convert best for volunteers
- **Track geographic support** across Colorado's 2nd District
- **Monitor mobile usage** for responsive design
- **Measure campaign event impact** on website traffic

### 🎯 **Key Metrics to Watch:**
- **Join Us form completions** (conversion rate)
- **Colorado visitors** (your target audience)
- **Mobile traffic percentage** (should be 50%+)
- **Time on Policy/Vision pages** (engagement)
- **Referrals from social media**

## Troubleshooting

### Analytics Not Working?
1. Check that your Measurement ID is correct in `.env`
2. Make sure you've deployed after adding the ID
3. Wait 24-48 hours for data to appear
4. Check browser developer tools for any JavaScript errors

### Privacy Concerns?
- All tracking is anonymized and campaign-focused
- No personal data is collected or stored
- Users can opt out via browser settings
- Complies with political campaign regulations

## Cost
- **Google Analytics 4**: Completely FREE
- **No limits** on data or users for campaign websites
- **Advanced features** available at no cost

## Support
- Google Analytics Help: [support.google.com/analytics](https://support.google.com/analytics)
- Campaign analytics best practices available online
- This setup is optimized specifically for political campaigns

---

**Next Steps:** After setting up analytics, you'll have comprehensive data about your website visitors within 24-48 hours. Use this data to optimize your campaign strategy and understand your supporter base better.