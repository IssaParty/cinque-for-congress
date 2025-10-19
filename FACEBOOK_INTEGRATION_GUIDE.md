# Facebook API Integration Guide

## Step 1: Create Facebook Developer Account
1. Visit [developers.facebook.com](https://developers.facebook.com)
2. Click "Get Started"
3. Create developer account using your personal Facebook account

## Step 2: Create App
1. In Facebook Developer Console, click "Create App"
2. Choose "Business" type
3. Fill in app details
4. Get your **App ID** and **App Secret**

## Step 3: Get Page Access Token
1. Go to Graph API Explorer: [developers.facebook.com/tools/explorer](https://developers.facebook.com/tools/explorer)
2. Select your app
3. Generate **User Access Token** with `pages_read_engagement` permission
4. Use token to get **Page Access Token** for your page

## Step 4: Find Your Page ID
Visit: `https://graph.facebook.com/v18.0/me/accounts?access_token=YOUR_USER_TOKEN`
Find your page and copy the `id` field.

## Step 5: Update Your Code

Add to `src/utils/socialMediaAPI.js`:

```javascript
const config = {
  facebook: {
    apiBaseUrl: 'https://graph.facebook.com/v18.0',
    pageId: 'YOUR_PAGE_ID_HERE', // Replace with your page ID
    accessToken: 'YOUR_PAGE_ACCESS_TOKEN_HERE', // Add your page token
  }
};

export const fetchFacebookPosts = async (pageId, count = 2) => {
  try {
    const response = await fetch(
      `${config.facebook.apiBaseUrl}/${pageId}/posts?fields=message,created_time,id&limit=${count}&access_token=${config.facebook.accessToken}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Facebook posts');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Facebook API Error:', error);
    throw error;
  }
};
```

## Step 6: Environment Variables
Create `.env.local` file:

```
REACT_APP_FACEBOOK_PAGE_ID=your_page_id_here
REACT_APP_FACEBOOK_ACCESS_TOKEN=your_page_access_token_here
```

Update code:
```javascript
pageId: process.env.REACT_APP_FACEBOOK_PAGE_ID,
accessToken: process.env.REACT_APP_FACEBOOK_ACCESS_TOKEN,
```

## Pricing
- **Basic API Access**: FREE
- **Rate Limits**: 200 calls per hour (sufficient for small campaigns)
- **App Review**: Required for some permissions (free process)

## Alternative: Facebook Page Plugin (FREE & EASIER)
Use Facebook's official page plugin:
```html
<div class="fb-page"
     data-href="https://www.facebook.com/your-page"
     data-tabs="timeline"
     data-width="340"
     data-height="500"
     data-small-header="false"
     data-adapt-container-width="true"
     data-hide-cover="false"
     data-show-facepile="false">
</div>
```