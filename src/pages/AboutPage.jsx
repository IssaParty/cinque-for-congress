import React, { useState, useEffect } from 'react';
import ImageSlider from '../components/ImageSlider';

const AboutPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsive design
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Selected campaign photos featuring Cinque in suits and with community members
  const sliderImages = [
    {
      src: '/images/PHOTO-2025-09-14-16-58-19.jpeg',
      alt: 'Cinque Mason speaking at podium during official event'
    },
    {
      src: '/images/PHOTO-2025-09-14-16-58-32(1).jpeg',
      alt: 'Cinque Mason with community member in traditional African clothing'
    },
    {
      src: '/images/WhatsApp Image 2025-10-12 at 17.09.27 (2).jpeg',
      alt: 'Cinque Mason at Boulder County building in professional attire'
    },
    {
      src: '/images/WhatsApp Image 2025-10-12 at 17.09.26 (1).jpeg',
      alt: 'Cinque Mason in gray suit with blue shirt'
    },
    {
      src: '/images/PHOTO-2025-09-14-16-58-25.jpeg',
      alt: 'Cinque Mason working with community group on environmental project'
    },
    {
      src: '/images/PHOTO-2025-09-14-17-00-14.jpeg',
      alt: 'Cinque Mason connecting with animals and nature in the community'
    }
  ];

  return (
    <main style={isMobile ? styles.contentPageMobile : styles.contentPage}>
        <div style={isMobile ? styles.pageContainerMobile : styles.pageContainer}>
          <h1 style={isMobile ? styles.pageTitleMobile : styles.pageTitle}>About Cinque Mason</h1>
        <div style={styles.pageContent}>
          <section style={styles.contentSection}>
            <h2 style={isMobile ? styles.contentSubtitleMobile : styles.contentSubtitle}>Roots in Colorado</h2>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              My name is Cinque Dominic Mason. I was born and raised in Denver, where my education ranged from expeditionary schools that taught survival skills and land navigation to a private high school where I played basketball. I later earned a degree in Communications & International Development from Colorado State University, where I ran for student body president and worked to ensure that students' basic needs were met.
            </p>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              Closer to home, I've worked as a rancher across three states, a sheep shearer traveling county to county in Colorado, and today as a construction and handyman worker while living in Boulder. I also hold a Master's in Business Administration from CU Boulder — but I've never been drawn to the corporate lifestyle. My purpose has always been service.
            </p>

            <div style={styles.sliderContainer}>
              <ImageSlider images={sliderImages} autoplaySpeed={5500} />
            </div>
          </section>

          <section style={styles.contentSection}>
            <h2 style={isMobile ? styles.contentSubtitleMobile : styles.contentSubtitle}>A Global Perspective</h2>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              My commitment to humanitarian work has taken me far beyond Colorado. I've partnered with Indian universities on development research, supported feeding programs in Ethiopia, built NGO capacity in Mali during dictatorship, and worked alongside refugees across North and West Africa. I've seen firsthand the costs of war in places like Kashmir, and the lasting damage of colonialism and unchecked consumerism across the globe.
            </p>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              These experiences taught me a clear truth: diplomacy, education, and capacity-building are far more powerful than militarization, coercion, or greed.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={isMobile ? styles.contentSubtitleMobile : styles.contentSubtitle}>Why I'm Running</h2>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              From construction sites to global conflict zones, I've learned that people everywhere share a common desire: to give back, to serve, and to build a better future for their communities. But here at home, that future is being sabotaged.
            </p>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              We live in the richest country in history, yet our elders are crushed by medical bills, housing is out of reach for my generation, and even basic supplies are unaffordable. Meanwhile, our government spends trillions on war, props up corporate monopolies, and leaves working people behind.
            </p>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              This isn't the American Dream. This is a system designed to milk us for profit and it's time we say enough.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={isMobile ? styles.contentSubtitleMobile : styles.contentSubtitle}>My Vision</h2>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              America's greatness has always come from its ability to evolve without bloodshed to amend, reform, and reimagine. As Jefferson once wrote, "The earth belongs always to the living generation." No constitution, law, or institution should be static forever. Democracy must grow with the people it serves.
            </p>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              That is the foundation of my vision: a government accountable to people, not corporations. A democracy rooted in service, not exploitation. A nation that leads with diplomacy, not domination.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={isMobile ? styles.contentSubtitleMobile : styles.contentSubtitle}>My Mission</h2>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              This campaign is about reclaiming our future, we must stop focusing on these flawed metrics of wealth and start focusing on quality of life.:
            </p>
            <ul style={isMobile ? styles.contentListMobile : styles.contentList}>
              <li>Cracking down on corporate power and restoring real representation.</li>
              <li>Cutting the defense budget and ending endless wars abroad.</li>
              <li>Reducing executive power and giving the power of our lives back to us not to the whims of a political party or agenda within the whitehouse.</li>
            </ul>
            <p style={isMobile ? styles.contentTextMobile : styles.contentText}>
              The government is not broken beyond repair. It is always evolving and this time, it must evolve in the hands of the people.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

const styles = {
  contentPage: {
    padding: '4rem 2rem',
    minHeight: '70vh',
    flex: 1
  },
  pageContainer: {
    maxWidth: '900px',
    margin: '0 auto'
  },
  pageTitle: {
    color: '#0E3A60',
    marginBottom: '2rem',
    fontSize: '2.5rem',
    fontFamily: 'Merriweather, serif'
  },
  pageContent: {},
  contentSection: {
    marginBottom: '2rem'
  },
  contentSubtitle: {
    color: '#2E6FB3',
    marginTop: '2rem',
    marginBottom: '1rem',
    fontFamily: 'Merriweather, serif',
    fontWeight: '600'
  },
  contentText: {
    color: '#1a1a1a',
    lineHeight: '1.8',
    marginBottom: '1rem',
    fontFamily: 'Open Sans, sans-serif'
  },
  contentList: {
    color: '#1a1a1a',
    lineHeight: '1.8',
    marginBottom: '1rem',
    paddingLeft: '2rem',
    fontFamily: 'Open Sans, sans-serif'
  },
  sliderContainer: {
    marginTop: '2rem',
    marginBottom: '2rem'
  },

  // Mobile styles
  contentPageMobile: {
    padding: '2rem 1rem',
    minHeight: '70vh',
    flex: 1
  },
  pageContainerMobile: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: '0 0.5rem'
  },
  pageTitleMobile: {
    color: '#0E3A60',
    marginBottom: '1.5rem',
    fontSize: '2rem',
    fontFamily: 'Merriweather, serif',
    textAlign: 'center',
    lineHeight: '1.2'
  },
  contentSubtitleMobile: {
    color: '#2E6FB3',
    marginTop: '1.5rem',
    marginBottom: '0.8rem',
    fontFamily: 'Merriweather, serif',
    fontSize: '1.3rem',
    fontWeight: '600'
  },
  contentTextMobile: {
    color: '#1a1a1a',
    lineHeight: '1.7',
    marginBottom: '1rem',
    fontSize: '1rem',
    fontFamily: 'Open Sans, sans-serif'
  },
  contentListMobile: {
    color: '#1a1a1a',
    lineHeight: '1.7',
    marginBottom: '1rem',
    paddingLeft: '1.5rem',
    fontSize: '1rem',
    fontFamily: 'Open Sans, sans-serif'
  }
};

export default AboutPage;