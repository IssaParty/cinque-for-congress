import React, { useEffect } from 'react';

const TwitterEmbed = ({ username, tweetLimit = 2 }) => {
  useEffect(() => {
    // Load Twitter Widget script if not already loaded
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.onload = () => {
        if (window.twttr && window.twttr.widgets) {
          window.twttr.widgets.load();
        }
      };
      document.body.appendChild(script);
    } else {
      // If already loaded, just reload widgets
      window.twttr.widgets.load();
    }
  }, []);

  return (
    <div style={styles.container}>
      <a
        className="twitter-timeline"
        href={`https://twitter.com/${username}?ref_src=twsrc%5Etfw`}
        data-tweet-limit={tweetLimit}
        data-chrome="noheader nofooter noborders transparent noscrollbar"
        data-theme="light"
        data-link-color="#2E6FB3"
        style={styles.timeline}
      >
        Loading tweets...
      </a>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    minHeight: '400px'
  },

  timeline: {
    width: '100%',
    height: '400px'
  }
};

export default TwitterEmbed;