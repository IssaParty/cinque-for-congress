import React from 'react';
import { Link } from 'react-router-dom';

const VisionPage = () => {
  return (
    <main style={styles.contentPage}>
      <div style={styles.pageContainer}>
        <h1 style={styles.pageTitle}>My Vision for America's Future</h1>
        <div style={styles.pageContent}>
          <p style={styles.visionIntro}>
            We stand at a crossroads. Corporate power has grown so dominant that it threatens the very foundation of our democracy.
            But this moment also presents an unprecedented opportunity to build something better—an economy and political system that
            serves people, not just profit.
          </p>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>The Corporate Problem</h2>
            <p style={styles.contentText}>
              For decades, we've been told that what's good for corporations is good for America. This lie has led us to where we are today:
              a handful of massive corporations control our economy, manipulate our politics, and extract wealth from working communities
              while leaving behind environmental destruction and economic inequality.
            </p>
            <p style={styles.contentText}>
              Corporate consolidation has reached levels not seen since the Gilded Age. A few tech giants control the flow of information.
              Wall Street banks control the flow of capital. Pharmaceutical companies control access to life-saving medications.
              And all of them use their power to write the rules in their favor, creating a system where the rich get richer and
              everyone else struggles to get by.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Breaking Corporate Power</h2>
            <p style={styles.contentText}>
              The solution isn't to regulate these monopolies—it's to break them up entirely. Just as Teddy Roosevelt took on the trusts
              of his era, we must take on the corporate giants of ours. This means:
            </p>
            <ul style={styles.contentList}>
              <li>Breaking up Big Tech companies that have become too powerful to control</li>
              <li>Separating commercial banking from investment banking to prevent another financial crisis</li>
              <li>Dismantling agricultural monopolies that have destroyed family farming</li>
              <li>Ending pharmaceutical companies' stranglehold on life-saving medications</li>
              <li>Stopping corporate consolidation in media to restore diverse, independent journalism</li>
            </ul>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Democratizing the Economy</h2>
            <p style={styles.contentText}>
              Breaking up monopolies is just the beginning. We need to fundamentally reshape our economy so that working people have
              real power and ownership. This vision includes:
            </p>
            <ul style={styles.contentList}>
              <li><strong>Worker Cooperatives:</strong> Support businesses owned and controlled by their workers, sharing profits and decision-making power</li>
              <li><strong>Public Banking:</strong> Create state and municipal banks that serve community needs rather than Wall Street profits</li>
              <li><strong>Universal Basic Services:</strong> Guarantee healthcare, education, housing, and transportation as public services, not private commodities</li>
              <li><strong>Shortened Work Week:</strong> Reduce standard work hours to 32 per week, allowing people time for family, community, and personal fulfillment</li>
              <li><strong>Profit Sharing:</strong> Require large corporations to share profits with workers who create that wealth</li>
            </ul>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Climate Justice and Corporate Accountability</h2>
            <p style={styles.contentText}>
              The climate crisis is fundamentally a crisis of corporate power. Oil companies have known about climate change for decades
              but chose profits over the planet. Now they're spending millions to delay action while communities suffer from extreme weather,
              pollution, and environmental degradation.
            </p>
            <p style={styles.contentText}>
              Real climate action requires taking on corporate power directly:
            </p>
            <ul style={styles.contentList}>
              <li>Nationalizing energy utilities to rapidly transition to renewable energy</li>
              <li>Holding fossil fuel companies legally and financially accountable for climate damage</li>
              <li>Ending corporate subsidies for polluting industries</li>
              <li>Creating millions of good-paying union jobs in renewable energy and environmental restoration</li>
              <li>Ensuring that frontline communities lead the just transition to a clean economy</li>
            </ul>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Rebuilding Democracy</h2>
            <p style={styles.contentText}>
              Corporate money has corrupted our political system at every level. Billionaires and corporations spend unlimited amounts
              to elect politicians who will protect their interests, while ordinary people's voices are drowned out.
              To restore democracy, we must:
            </p>
            <ul style={styles.contentList}>
              <li>Eliminate corporate money from politics entirely through constitutional amendment</li>
              <li>Implement public campaign financing so candidates aren't beholden to wealthy donors</li>
              <li>Create binding citizen assemblies that give people direct say in major policy decisions</li>
              <li>Expand voting access and implement ranked choice voting to break the two-party monopoly</li>
              <li>End gerrymandering and ensure fair representation for all communities</li>
            </ul>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>International Solidarity Over Corporate Empire</h2>
            <p style={styles.contentText}>
              American foreign policy has too often served corporate interests rather than human rights and international law.
              We've supported dictators who protect American business interests, launched wars that enrich defense contractors,
              and imposed economic policies that benefit Wall Street at the expense of working people worldwide.
            </p>
            <p style={styles.contentText}>
              A truly progressive foreign policy would prioritize:
            </p>
            <ul style={styles.contentList}>
              <li>Ending military interventions and closing overseas bases</li>
              <li>Supporting self-determination for all peoples, including Palestinians</li>
              <li>Redirecting military spending to international development and humanitarian aid</li>
              <li>Holding American corporations accountable for human rights abuses abroad</li>
              <li>Working with other nations to combat climate change and global inequality</li>
            </ul>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Building the Movement</h2>
            <p style={styles.contentText}>
              None of this will be easy. Corporate power won't give up without a fight. But throughout history, ordinary people have
              come together to challenge entrenched power and win. The labor movement gave us the 40-hour work week and workplace safety.
              The civil rights movement ended legal segregation. The environmental movement forced corporations to clean up their pollution.
            </p>
            <p style={styles.contentText}>
              Today's movement must be bigger and broader than any that came before, because the challenges we face are unprecedented.
              But so is our opportunity. By connecting struggles for economic justice, racial equity, climate action, and democratic
              reform, we can build the power needed to transform our society.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>What This Means for Colorado's 2nd District</h2>
            <p style={styles.contentText}>
              Our district embodies both the problems and possibilities of this moment. We have:
            </p>
            <ul style={styles.contentList}>
              <li><strong>Tech workers</strong> who understand how Silicon Valley monopolies threaten innovation and worker rights</li>
              <li><strong>Small farmers</strong> who've been squeezed out by agricultural giants</li>
              <li><strong>College students</strong> drowning in debt while universities become corporate institutions</li>
              <li><strong>Outdoor workers</strong> seeing climate change destroy the landscapes they love</li>
              <li><strong>Immigrant communities</strong> facing deportation while their labor is exploited by corporations</li>
              <li><strong>Working families</strong> struggling with housing costs while private equity firms buy up homes</li>
            </ul>
            <p style={styles.contentText}>
              These communities have the knowledge, skills, and motivation to lead a transformation that could serve as a model for the nation.
              But they need a representative who will fight for systemic change, not just tinker around the edges.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>The Choice We Face</h2>
            <p style={styles.contentText}>
              We can continue down the current path—where a few corporations control more and more of our economy and politics,
              where inequality grows while the planet burns, where democracy becomes a hollow shell controlled by the wealthy.
              Or we can choose a different future.
            </p>
            <p style={styles.contentText}>
              This election isn't just about choosing a representative. It's about choosing what kind of society we want to build.
              Do we want a democracy that serves people, or one that serves corporations? Do we want an economy that works for everyone,
              or just for the wealthy few?
            </p>
            <p style={styles.contentText}>
              I believe we can choose justice over greed, democracy over oligarchy, community over corporate power.
              But it will take all of us working together to make that choice real.
            </p>
          </section>

          <div style={styles.callToAction}>
            <h2 style={styles.ctaTitle}>Join the Movement</h2>
            <p style={styles.ctaText}>
              This campaign represents a fundamental shift from politics as usual. Together, we can restore democratic governance, break corporate strangleholds on our economy, build sustainable communities, and create a government that serves its people.
            </p>
            <Link to="/join" style={styles.btnPrimary}>
              Get Involved
            </Link>
          </div>
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
  visionIntro: {
    fontSize: '1.2rem',
    color: '#1e3a5f',
    marginBottom: '2rem',
    textAlign: 'center'
  },
  visionGrid: {
    display: 'grid',
    gap: '2rem',
    margin: '2rem 0'
  },
  visionItem: {
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    borderTop: '4px solid #2d5016',
    boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
  },
  visionItemTitle: {
    color: '#2d5016',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif'
  },
  visionItemText: {
    color: '#4a4a4a',
    lineHeight: '1.8'
  },
  callToAction: {
    textAlign: 'center',
    marginTop: '3rem',
    padding: '2rem',
    backgroundColor: '#fafafa',
    borderRadius: '8px'
  },
  ctaTitle: {
    color: '#2d5016',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif'
  },
  ctaText: {
    color: '#4a4a4a',
    lineHeight: '1.8',
    marginBottom: '1.5rem'
  },
  btnPrimary: {
    padding: '0.9rem 2.5rem',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s',
    display: 'inline-block',
    borderRadius: '4px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.1rem',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: '#d4a017',
    color: '#1e3a5f',
    boxShadow: '0 4px 15px rgba(212, 160, 23, 0.3)'
  },
  contentSection: {
    marginBottom: '3rem'
  },
  contentSubtitle: {
    color: '#1e3a5f',
    marginTop: '2rem',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.8rem',
    fontWeight: 'bold'
  },
  contentText: {
    color: '#4a4a4a',
    lineHeight: '1.8',
    marginBottom: '1rem',
    fontSize: '1.1rem'
  },
  contentList: {
    color: '#4a4a4a',
    lineHeight: '1.8',
    marginBottom: '1rem',
    paddingLeft: '2rem',
    fontSize: '1rem'
  }
};

export default VisionPage;