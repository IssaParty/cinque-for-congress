# Twitter API Integration Guide

## Step 1: Get Twitter Developer Access
1. Visit [developer.twitter.com](https://developer.twitter.com)
2. Click "Apply for access"
3. Fill out application with your campaign use case
4. Wait for approval (typically 1-7 days)

## Step 2: Create App and Get Credentials
1. In Twitter Developer Portal, create a new App
2. Copy your **Bearer Token**
3. Save your **API Key** and **API Secret**

## Step 3: Update Your Code

### Option A: Direct Browser Integration (Has CORS Issues)
Add to `src/utils/socialMediaAPI.js`:

```javascript
const config = {
  twitter: {
    apiBaseUrl: 'https://api.twitter.com/2',
    username: 'CinqueForCD2',
    bearerToken: 'YOUR_BEARER_TOKEN_HERE', // Add your token
  }
};

export const fetchTwitterPosts = async (username, count = 2) => {
  try {
    const response = await fetch(
      `${config.twitter.apiBaseUrl}/users/by/username/${username}/tweets?tweet.fields=created_at,author_id&max_results=${count}`,
      {
        headers: {
          'Authorization': `Bearer ${config.twitter.bearerToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Twitter posts');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Twitter API Error:', error);
    throw error;
  }
};
```

### Option B: Backend Proxy (Recommended)
Create a simple backend service to proxy API calls and avoid CORS issues.

## Step 4: Environment Variables
Create `.env.local` file in your project root:

```
REACT_APP_TWITTER_BEARER_TOKEN=your_bearer_token_here
```

Update code to use environment variable:
```javascript
bearerToken: process.env.REACT_APP_TWITTER_BEARER_TOKEN,
```

## Pricing
- **Basic Plan**: $100/month for 10,000 tweet reads
- **Pro Plan**: $5,000/month for 1 million tweet reads
- **Academic**: Free (if you qualify as researcher)

## Alternative: Twitter Embed Widget (FREE)
Instead of API, use Twitter's embed widget:
```html
<a class="twitter-timeline"
   href="https://twitter.com/CinqueForCD2?ref_src=twsrc%5Etfw"
   data-tweet-limit="2">
   Tweets by CinqueForCD2
</a>
<script async src="https://platform.twitter.com/widgets.js"></script>
```