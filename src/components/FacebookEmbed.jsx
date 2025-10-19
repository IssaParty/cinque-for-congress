import React, { useEffect } from 'react';

const FacebookEmbed = ({ pageUrl, height = 400 }) => {
  useEffect(() => {
    // Load Facebook SDK if not already loaded
    if (!window.FB) {
      // Add Facebook SDK script
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);

      // Initialize Facebook SDK when loaded
      window.fbAsyncInit = function() {
        window.FB.init({
          xfbml: true,
          version: 'v18.0'
        });
      };
    } else {
      // If already loaded, just parse XFBML
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <div style={styles.container}>
      <div
        className="fb-page"
        data-href={pageUrl}
        data-tabs="timeline"
        data-width="340"
        data-height={height}
        data-small-header="true"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="false"
      >
        <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
          <a href={pageUrl}>Loading Facebook posts...</a>
        </blockquote>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
};

export default FacebookEmbed;