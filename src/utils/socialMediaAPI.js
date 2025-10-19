// Social Media API Configuration
// This file contains the setup for connecting to real Twitter and Facebook APIs

const config = {
  twitter: {
    // To connect to real Twitter API, you'll need:
    // 1. Twitter Developer Account
    // 2. API v2 Bearer Token
    // 3. Set up CORS proxy or backend service
    apiBaseUrl: 'https://api.twitter.com/2',
    username: 'CinqueForCD2',
    // bearerToken: 'YOUR_TWITTER_BEARER_TOKEN', // Add this when ready
  },
  facebook: {
    // To connect to real Facebook API, you'll need:
    // 1. Facebook Developer Account
    // 2. Page Access Token
    // 3. App ID and App Secret
    apiBaseUrl: 'https://graph.facebook.com/v18.0',
    pageId: 'YOUR_FACEBOOK_PAGE_ID', // Replace with actual page ID
    // accessToken: 'YOUR_PAGE_ACCESS_TOKEN', // Add this when ready
  }
};

// Real Twitter API fetch function (for future implementation)
export const fetchTwitterPosts = async (username, count = 2) => {
  // Uncomment and configure when ready to use real API
  /*
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
  */

  // For now, return mock data
  return getMockTwitterPosts(count);
};

// Real Facebook API fetch function (for future implementation)
export const fetchFacebookPosts = async (pageId, count = 2) => {
  // Uncomment and configure when ready to use real API
  /*
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
  */

  // For now, return mock data
  return getMockFacebookPosts(count);
};

// Mock data functions (currently being used)
export const getMockTwitterPosts = (count = 2) => {
  const mockPosts = [
    {
      id: '1',
      text: 'Excited to meet with local healthcare workers today to discuss our plan for universal healthcare in Congressional District 2. Every person deserves quality care regardless of their ability to pay. #HealthcareForAll #CinqueForCD2',
      created_at: '2025-10-18T14:30:00Z',
      author_name: 'Cinque Mason',
      author_username: 'CinqueForCD2'
    },
    {
      id: '2',
      text: 'Just wrapped up a town hall in Burlington. The energy and passion from our community is incredible. Together, we\'re building a movement for working families! Thank you to everyone who came out tonight. 🙏',
      created_at: '2025-10-17T20:15:00Z',
      author_name: 'Cinque Mason',
      author_username: 'CinqueForCD2'
    },
    {
      id: '3',
      text: 'Climate change is not a distant threat - it\'s happening right now in Vermont. From extreme weather to changing agricultural patterns, we need bold action on clean energy and environmental justice. Our planet can\'t wait.',
      created_at: '2025-10-16T11:45:00Z',
      author_name: 'Cinque Mason',
      author_username: 'CinqueForCD2'
    }
  ];

  return mockPosts.slice(0, count);
};

export const getMockFacebookPosts = (count = 2) => {
  const mockPosts = [
    {
      id: '1',
      message: 'This week I had the privilege of speaking with educators across Congressional District 2. Our teachers deserve better pay, smaller class sizes, and the resources they need to help our children succeed. Education is the foundation of our democracy, and we must invest in it accordingly.',
      created_time: '2025-10-18T16:45:00Z',
      author_name: 'Cinque Mason for Congress'
    },
    {
      id: '2',
      message: 'Climate change is real, and it\'s happening now. Vermont is already seeing the effects - from flooding to changing seasons affecting our maple syrup industry. We need bold action on clean energy, green jobs, and protecting our environment for future generations. The time for half-measures is over.',
      created_time: '2025-10-17T12:30:00Z',
      author_name: 'Cinque Mason for Congress'
    },
    {
      id: '3',
      message: 'Housing is a human right, not a commodity. Too many working families in Vermont are struggling to find affordable homes. We need to build more affordable housing, protect tenants from exploitation, and ensure that everyone has a safe place to call home.',
      created_time: '2025-10-16T09:15:00Z',
      author_name: 'Cinque Mason for Congress'
    }
  ];

  return mockPosts.slice(0, count);
};

export default config;