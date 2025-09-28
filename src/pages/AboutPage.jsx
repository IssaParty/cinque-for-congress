import React from 'react';

const AboutPage = () => {
  return (
    <main style={styles.contentPage}>
      <div style={styles.pageContainer}>
        <h1 style={styles.pageTitle}>About Cinque Mason</h1>
        <div style={styles.pageContent}>
          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Roots in Colorado</h2>
            <p style={styles.contentText}>
              My name is Cinque Dominic Mason. I was born and raised in Denver, where my education ranged from expeditionary schools that taught survival skills and land navigation to a private high school where I played basketball. I later earned a degree in Communications & International Development from Colorado State University, where I ran for student body president and worked to ensure that students' basic needs were met.
            </p>
            <p style={styles.contentText}>
              Closer to home, I've worked as a rancher across three states, a sheep shearer traveling county to county in Colorado, and today as a construction and handyman worker while living in Boulder. I also hold a Master's in Business Administration from CU Boulder — but I've never been drawn to the corporate lifestyle. My purpose has always been service.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>A Global Perspective</h2>
            <p style={styles.contentText}>
              My commitment to humanitarian work has taken me far beyond Colorado. I've partnered with Indian universities on development research, supported feeding programs in Ethiopia, built NGO capacity in Mali during dictatorship, and worked alongside refugees across North and West Africa. I've seen firsthand the costs of war in places like Kashmir, and the lasting damage of colonialism and unchecked consumerism across the globe.
            </p>
            <p style={styles.contentText}>
              These experiences taught me a clear truth: diplomacy, education, and capacity-building are far more powerful than militarization, coercion, or greed.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Why I'm Running</h2>
            <p style={styles.contentText}>
              From construction sites to global conflict zones, I've learned that people everywhere share a common desire: to give back, to serve, and to build a better future for their communities. But here at home, that future is being sabotaged.
            </p>
            <p style={styles.contentText}>
              We live in the richest country in history, yet our elders are crushed by medical bills, housing is out of reach for my generation, and even basic supplies are unaffordable. Meanwhile, our government spends trillions on war, props up corporate monopolies, and leaves working people behind.
            </p>
            <p style={styles.contentText}>
              This isn't the American Dream. This is a system designed to milk us for profit and it's time we say enough.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>My Vision</h2>
            <p style={styles.contentText}>
              America's greatness has always come from its ability to evolve without bloodshed to amend, reform, and reimagine. As Jefferson once wrote, "The earth belongs always to the living generation." No constitution, law, or institution should be static forever. Democracy must grow with the people it serves.
            </p>
            <p style={styles.contentText}>
              That is the foundation of my vision: a government accountable to people, not corporations. A democracy rooted in service, not exploitation. A nation that leads with diplomacy, not domination.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>My Mission</h2>
            <p style={styles.contentText}>
              This campaign is about reclaiming our future, we must stop focusing on these flawed metrics of wealth and start focusing on quality of life.:
            </p>
            <ul style={styles.contentList}>
              <li>Cracking down on corporate power and restoring real representation.</li>
              <li>Cutting the defense budget and ending endless wars abroad.</li>
              <li>Reducing executive power and giving the power of our lives back to us not to the whims of a political party or agenda within the whitehouse.</li>
            </ul>
            <p style={styles.contentText}>
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
    color: '#2d5016',
    marginBottom: '2rem',
    fontSize: '2.5rem',
    fontFamily: 'Arial, sans-serif'
  },
  pageContent: {},
  contentSection: {
    marginBottom: '2rem'
  },
  contentSubtitle: {
    color: '#1e3a5f',
    marginTop: '2rem',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif'
  },
  contentText: {
    color: '#4a4a4a',
    lineHeight: '1.8',
    marginBottom: '1rem'
  },
  contentList: {
    color: '#4a4a4a',
    lineHeight: '1.8',
    marginBottom: '1rem',
    paddingLeft: '2rem'
  }
};

export default AboutPage;