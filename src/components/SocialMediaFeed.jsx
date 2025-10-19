import React, { useState, useEffect } from 'react';
import { fetchTwitterPosts, fetchFacebookPosts } from '../utils/socialMediaAPI';

// Add CSS for loading animation
const spinKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject styles into document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = spinKeyframes;
  document.head.appendChild(style);
}

const SocialMediaFeed = ({ platform, username, postCount = 2 }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSocialPosts = async () => {
      try {
        setLoading(true);

        if (platform === 'twitter') {
          const posts = await fetchTwitterPosts(username, postCount);
          setPosts(posts);
        } else if (platform === 'facebook') {
          const posts = await fetchFacebookPosts(username, postCount);
          setPosts(posts);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSocialPosts();
  }, [platform, username, postCount]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text, maxLength = 280) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>Loading {platform} posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <p style={styles.errorText}>Unable to load {platform} posts at this time.</p>
      </div>
    );
  }

  return (
    <div style={styles.feedContainer}>
      {posts.map((post) => (
        <div key={post.id} style={styles.postContainer}>
          <div style={styles.postHeader}>
            <div style={styles.authorInfo}>
              <strong style={styles.authorName}>
                {platform === 'twitter' ? `@${post.author_username}` : post.author_name}
              </strong>
              <span style={styles.postDate}>{formatDate(post.created_at || post.created_time)}</span>
            </div>
            <div style={styles.platformIcon}>
              {platform === 'twitter' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1DA1F2">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              )}
            </div>
          </div>
          <div style={styles.postContent}>
            <p style={styles.postText}>
              {truncateText(post.text || post.message)}
            </p>
          </div>
          <div style={styles.postFooter}>
            <a
              href={platform === 'twitter'
                ? `https://twitter.com/${username}/status/${post.id}`
                : `https://facebook.com/${post.id}`
              }
              target="_blank"
              rel="noopener noreferrer"
              style={styles.viewPostLink}
            >
              View on {platform === 'twitter' ? 'Twitter' : 'Facebook'} →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  feedContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },

  postContainer: {
    border: '1px solid #E1E8ED',
    borderRadius: '8px',
    padding: '1rem',
    backgroundColor: '#ffffff'
  },

  postHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.75rem'
  },

  authorInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },

  authorName: {
    color: '#0E3A60',
    fontSize: '0.9rem',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: '600'
  },

  postDate: {
    color: '#657786',
    fontSize: '0.8rem',
    fontFamily: 'Open Sans, sans-serif'
  },

  platformIcon: {
    flexShrink: 0
  },

  postContent: {
    marginBottom: '0.75rem'
  },

  postText: {
    color: '#14171A',
    fontSize: '0.9rem',
    lineHeight: '1.5',
    margin: '0',
    fontFamily: 'Open Sans, sans-serif'
  },

  postFooter: {
    borderTop: '1px solid #F7F9FA',
    paddingTop: '0.75rem'
  },

  viewPostLink: {
    color: '#2E6FB3',
    fontSize: '0.8rem',
    textDecoration: 'none',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: '500'
  },

  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    textAlign: 'center'
  },

  loadingSpinner: {
    width: '32px',
    height: '32px',
    border: '3px solid #E1E8ED',
    borderTop: '3px solid #2E6FB3',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem'
  },

  loadingText: {
    color: '#657786',
    fontSize: '0.9rem',
    fontFamily: 'Open Sans, sans-serif',
    margin: '0'
  },

  errorContainer: {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#FFF5F5',
    border: '1px solid #FED7D7',
    borderRadius: '8px'
  },

  errorText: {
    color: '#C53030',
    fontSize: '0.9rem',
    fontFamily: 'Open Sans, sans-serif',
    margin: '0'
  }
};

export default SocialMediaFeed;