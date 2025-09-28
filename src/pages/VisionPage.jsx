import React from 'react';
import { Link } from 'react-router-dom';

const VisionPage = () => {
  return (
    <main style={styles.contentPage}>
      <div style={styles.pageContainer}>
        <h1 style={styles.pageTitle}>What I Stand For</h1>
        <div style={styles.pageContent}>
          <p style={styles.visionIntro}>
            I am running for Congress in Colorado's 2nd District as an anti-corporate, pro-human, pro-environment candidate. I believe:
          </p>
          <ul style={styles.standForList}>
            <li>Corporate power is strangling democracy, and it's time to put people back in charge.</li>
            <li>America should lead by example, not by war, cutting defense waste and investing in diplomacy, education, and peace.</li>
            <li>Social welfare should be efficient, practical, and empowering, with direct democracy tools giving people real voice over laws.</li>
            <li>The environment is not optional — clean water, waste management, and pollinator survival are matters of life and death.</li>
            <li>Cost of living must come down — from healthcare to housing to groceries, people deserve relief from corporate speculation.</li>
          </ul>
          <p style={styles.visionIntro}>
            I refuse corporate money, I refuse to serve lobbyists, and I refuse to vote for wars of profit. I work only for the people of Colorado's 2nd District.
          </p>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Corporate Greed: The All-Prevailing Problem</h2>
            <p style={styles.contentText}>
              Our lives were once driven by innovation — by people building in their garages and communities, creating the best products because they solved real problems. Today, it's dominated by speculation — by investors gaming stock prices and corporations buying each other out until there's no real competition left.
            </p>
            <p style={styles.contentText}>
              Unchecked, this destroys the marketplace. It allows buyouts on a national scale, single-entity price control (illegal under the Sherman Antitrust Act of 1890), and bureaucratic stagnation. Innovation dies. Alternatives vanish. And when an industry collapses, it drags everyone down with it.
            </p>
            <p style={styles.contentText}>
              When only a handful of companies own an entire sector, the whole market becomes fragile. A shock to the cost of basic commodities should be absorbed through alternatives. But if there are no alternatives — because three companies own it all — the system collapses. Their failure becomes our liability.
            </p>
            <p style={styles.contentText}>
              These corporations have speculated on every part of our lives: wood, nails, drywall, eggs, butter — the essentials of shelter, food, and health. They've driven Americans into unsustainable debt just to afford life, not luxuries. And when their bets fail, they lay off workers, trigger recessions like 2008, and leave us holding the bag.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Bailouts and Debt</h2>
            <p style={styles.contentText}>
              When collapse hits, Washington steps in under the philosophy of "too big to fail." Instead of letting bad actors fail, government forces taxpayers to cover corporate losses while corporations keep their profits. They socialize the risk and privatize the reward.
            </p>
            <p style={styles.contentText}>
              This cycle fuels ballooning national debt. Eventually, future generations will pay the price. And if the government defaults, the IMF model dictates cuts to welfare, privatization of public goods, and higher taxes. That means even more corporate ownership of our country.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Corporate Militarism</h2>
            <p style={styles.contentText}>
              This philosophy extends abroad. In the name of "protecting American interests" (War Powers Resolution of 1973, NDAA 2001), our military has been used to secure resources for corporations — from oil in the Middle East to minerals in developing nations. This has turned our servicemen and women into, effectively, foot soldiers for Wall Street.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Legislative Buyouts</h2>
            <p style={styles.contentText}>
              The Supreme Court's Citizens United v. FEC (2010) opened the floodgates for unlimited corporate spending in elections. The result: laws written for corporations, not people. Tax breaks, deregulation, higher barriers for small businesses, and one-sided trade deals — all bought and paid for.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>The Revolving Door</h2>
            <p style={styles.contentText}>
              Too often, elected officials step out of public office and straight into lobbying jobs, cashing in on their connections to make deals for corporations at taxpayer expense. This "revolving door" is why too many politicians refuse to hold industry accountable.
            </p>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Trust Busting</h2>
            <p style={styles.contentText}>
              The corporate takeover can and must be stopped. America has a proud tradition of trust-busting:
            </p>
            <ul style={styles.contentList}>
              <li>Sherman Antitrust Act (1890) – prohibits monopolies</li>
              <li>Clayton Antitrust Act (1914) – bans price fixing and predatory pricing</li>
              <li>FTC Act (1914) – created a regulator for antitrust enforcement</li>
              <li>Robinson-Patman Act (1936) – prohibits price discrimination</li>
              <li>Hart-Scott-Rodino Act (1976) – forces review of major acquisitions</li>
            </ul>
            <p style={styles.contentText}>
              Even today, leaders like Lina Khan, Tim Wu, and yes, Congressman Joe Neguse with his antitrust bills, show this work is alive. But it must go much further.
            </p>
            <p style={styles.contentText}>
              CD2 can lead the charge in breaking up monopolies across agriculture, real estate, manufacturing, fast food, construction, defense, energy, technology, finance, and healthcare.
            </p>
            <p style={styles.contentText}>
              Because economic freedom is political freedom. And until we take back our economy, we won't take back our democracy.
            </p>
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
  },
  standForList: {
    color: '#1e3a5f',
    lineHeight: '1.8',
    marginBottom: '2rem',
    paddingLeft: '2rem',
    fontSize: '1.1rem',
    fontWeight: 'bold'
  }
};

export default VisionPage;