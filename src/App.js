import React, { useState } from 'react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Header Component
  const Header = () => {
    const toggleMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };

    const navStyle = mobileMenuOpen 
      ? { ...styles.navMenu, ...styles.navMenuActive }
      : styles.navMenu;

    return (
      <header style={styles.header}>
        <nav style={styles.nav}>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('home');
              setMobileMenuOpen(false);
            }}
            style={styles.logo}
          >
            CINQUE <span style={{color: '#d4a017'}}>MASON</span>
          </a>
          <ul style={navStyle}>
            <li style={styles.navItem}>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('home');
                  setMobileMenuOpen(false);
                }}
                style={styles.navLink}
              >
                Home
              </a>
            </li>
            <li style={styles.navItem}>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('about');
                  setMobileMenuOpen(false);
                }}
                style={styles.navLink}
              >
                About
              </a>
            </li>
            <li style={styles.navItem}>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('policies');
                  setMobileMenuOpen(false);
                }}
                style={styles.navLink}
              >
                Policies
              </a>
            </li>
            <li style={styles.navItem}>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('vision');
                  setMobileMenuOpen(false);
                }}
                style={styles.navLink}
              >
                Vision
              </a>
            </li>
            <li style={styles.navItem}>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('my-plan');
                  setMobileMenuOpen(false);
                }}
                style={styles.navLink}
              >
                My Plan
              </a>
            </li>
            <li style={styles.navItem}>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('join');
                  setMobileMenuOpen(false);
                }}
                style={styles.navLink}
              >
                Join Us
              </a>
            </li>
          </ul>
          <a 
            href="https://secure.actblue.com/donate/cinqueforcongress" 
            style={styles.donateBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            DONATE
          </a>
          <button 
            style={styles.menuToggle}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span style={styles.menuToggleSpan}></span>
            <span style={styles.menuToggleSpan}></span>
            <span style={styles.menuToggleSpan}></span>
          </button>
        </nav>
      </header>
    );
  };

  // Footer Component
  const Footer = () => {
    return (
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Campaign Headquarters</h4>
            <p style={styles.footerText}>
              Boulder, Colorado<br/>
              Email: info@cinqueforcongress.com<br/>
              Phone: Coming Soon
            </p>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Learn More</h4>
            <ul style={styles.footerLinks}>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('about');
                    window.scrollTo(0, 0);
                  }} 
                  style={styles.footerLink}
                >
                  About Cinque Mason
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('policies');
                    window.scrollTo(0, 0);
                  }} 
                  style={styles.footerLink}
                >
                  Full Policy Platform
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('vision');
                    window.scrollTo(0, 0);
                  }} 
                  style={styles.footerLink}
                >
                  Vision for CD2
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('press');
                    window.scrollTo(0, 0);
                  }} 
                  style={styles.footerLink}
                >
                  Press & Media
                </a>
              </li>
            </ul>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Campaign Principles</h4>
            <p style={styles.footerText}>
              • No corporate PAC money<br/>
              • Full transparency<br/>
              • Regular town halls<br/>
              • Quarterly progress reports
            </p>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Connect</h4>
            <div style={styles.socialLinks}>
              <a href="https://www.facebook.com/cinqueforcongress" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                f
              </a>
              <a href="https://www.x.com/cinqueforcongress" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                X
              </a>
              <a href="https://www.instagram.com/cinqueforcongress/" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                i
              </a>
              <a href="https://www.tiktok.com/@cinqueforcongress" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                T
              </a>
              <a href="https://chat.whatsapp.com/IRPYqxwe3J3F6H2Wx8xBk8" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                W
              </a>
            </div>
          </div>
        </div>
        <div style={styles.disclaimer}>
          <strong>PAID FOR BY CINQUE MASON FOR CONGRESS</strong><br/>
          Boulder, Colorado<br/>
          No corporate funds accepted. Contributions are not tax deductible.<br/>
          Federal law requires disclosure of contributions exceeding $200.
        </div>
      </footer>
    );
  };

  // Home Page Component
  const HomePage = () => {
    return (
      <main>
        <section style={styles.heroPlatform}>
          <div style={styles.heroPlatformContent}>
            <div style={styles.heroSection}>
              <h1 style={styles.heroTitle}>CINQUE MASON FOR CONGRESS</h1>
              <p style={styles.district}>Colorado's 2nd District</p>
              <p style={styles.tagline}>
                Independent candidate committed to breaking corporate influence,<br/>
                restoring democratic governance, and protecting our environment.
              </p>
              <div style={styles.ctaButtons}>
                <button 
                  onClick={() => setCurrentPage('join')}
                  style={styles.btnPrimary}
                >
                  Join Campaign
                </button>
              </div>
            </div>

            <div style={styles.platformOverview}>
              <h2 style={styles.platformTitle}>Platform Overview</h2>
              <p style={styles.platformIntro}>
                No corporate donations. No special interests. Just real representation for Colorado's 2nd District.
              </p>
              <div style={styles.platformGrid}>
                <article style={styles.platformCard}>
                  <h3 style={styles.platformCardTitle}>Corporate Reform</h3>
                  <p style={styles.platformCardText}>Enforce antitrust laws, break up monopolies, and eliminate corporate influence in elections.</p>
                </article>
                <article style={styles.platformCard}>
                  <h3 style={styles.platformCardTitle}>Democratic Governance</h3>
                  <p style={styles.platformCardText}>Reduce executive overreach, implement transparent budgets, and explore direct democracy initiatives.</p>
                </article>
                <article style={styles.platformCard}>
                  <h3 style={styles.platformCardTitle}>Environmental Protection</h3>
                  <p style={styles.platformCardText}>Establish waste management as a fundamental right and protect our water resources.</p>
                </article>
                <article style={styles.platformCard}>
                  <h3 style={styles.platformCardTitle}>Economic Justice</h3>
                  <p style={styles.platformCardText}>Address housing affordability, healthcare access, and the rising cost of living.</p>
                </article>
                <article style={styles.platformCard}>
                  <h3 style={styles.platformCardTitle}>Peace & Diplomacy</h3>
                  <p style={styles.platformCardText}>Prioritize diplomatic solutions, audit military spending, and reinvest in domestic infrastructure.</p>
                </article>
                <article style={styles.platformCard}>
                  <h3 style={styles.platformCardTitle}>Community First</h3>
                  <p style={styles.platformCardText}>Support local agriculture, small businesses, and community-driven solutions.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.getInvolved}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Get Involved</h2>
            <div style={styles.actionGrid}>
              <article style={styles.actionItem}>
                <div style={styles.actionIcon}>✊</div>
                <h3 style={styles.actionItemTitle}>Volunteer</h3>
                <p style={styles.actionItemText}>Join our grassroots movement and help build change from the ground up</p>
                <button 
                  onClick={() => setCurrentPage('join')}
                  style={styles.actionBtn}
                >
                  Sign Up
                </button>
              </article>
              <article style={styles.actionItem}>
                <div style={styles.actionIcon}>💰</div>
                <h3 style={styles.actionItemTitle}>Donate</h3>
                <p style={styles.actionItemText}>Support the campaign with a contribution - no amount is too small</p>
                <a 
                  href="https://secure.actblue.com/donate/cinqueforcongress" 
                  style={styles.actionBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contribute
                </a>
              </article>
              <article style={styles.actionItem}>
                <div style={styles.actionIcon}>🏠</div>
                <h3 style={styles.actionItemTitle}>Request an Event</h3>
                <p style={styles.actionItemText}>Organize a meet-and-greet or town hall in your community</p>
                <button 
                  onClick={() => setCurrentPage('request-event')}
                  style={styles.actionBtn}
                >
                  Learn More
                </button>
              </article>
              <article style={styles.actionItem}>
                <div style={styles.actionIcon}>📢</div>
                <h3 style={styles.actionItemTitle}>Spread the Word</h3>
                <p style={styles.actionItemText}>Share our message with friends, family, and neighbors</p>
                <a href="#" style={styles.actionBtn}>Get Materials</a>
              </article>
            </div>
          </div>
        </section>

        <section style={styles.newsletter}>
          <h2 style={styles.newsletterTitle}>Stay Informed</h2>
          <p style={styles.newsletterText}>Receive campaign updates and policy positions</p>
          <div style={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              style={styles.newsletterInput}
              id="newsletter-email"
            />
            <button 
              onClick={() => {
                const email = document.getElementById('newsletter-email').value;
                if (email) {
                  window.location.href = `mailto:info@cinqueforcongress.com?subject=Newsletter Subscription&body=Please add this email to the newsletter: ${email}`;
                  document.getElementById('newsletter-email').value = '';
                }
              }}
              style={styles.newsletterButton}
            >
              Subscribe
            </button>
          </div>
          <p style={styles.newsletterDisclaimer}>
            By subscribing, you consent to receive campaign communications.
          </p>
        </section>
      </main>
    );
  };

  // Join Page Component  
  const JoinPage = () => {
    return (
      <main style={styles.formPage}>
        <div style={styles.formContainer}>
          <h1 style={styles.formTitle}>Join Our Campaign</h1>
          <p style={styles.formIntro}>Together, we can bring real change to Colorado's 2nd District</p>
          
          <div style={styles.formInstructions}>
            <h3>How to Volunteer:</h3>
            <p>Send an email to <a href="mailto:info@cinqueforcongress.com?subject=VOLUNTEER SIGN UP" style={styles.emailLink}>info@cinqueforcongress.com</a> with:</p>
            <ul style={styles.instructionList}>
              <li>Your name and contact information</li>
              <li>Your ZIP code</li>
              <li>Areas of interest (canvassing, phone banking, events, social media)</li>
              <li>Your availability</li>
            </ul>
            <a 
              href="mailto:info@cinqueforcongress.com?subject=VOLUNTEER SIGN UP&body=Name:%0D%0AEmail:%0D%0APhone:%0D%0AZIP Code:%0D%0AVolunteer Interests:%0D%0AMessage:" 
              style={styles.btnPrimary}
            >
              Email to Volunteer
            </a>
          </div>
        </div>
      </main>
    );
  };

  // Request Event Page Component
  const RequestEventPage = () => {
    return (
      <main style={styles.formPage}>
        <div style={styles.formContainer}>
          <h1 style={styles.formTitle}>Request an Event</h1>
          <p style={styles.formIntro}>Invite Cinque Mason to speak at your event or organize a campaign gathering</p>
          
          <div style={styles.formInstructions}>
            <h3>How to Request an Event:</h3>
            <p>Send an email to <a href="mailto:info@cinqueforcongress.com?subject=An Event Has Been Requested" style={styles.emailLink}>info@cinqueforcongress.com</a> with:</p>
            <ul style={styles.instructionList}>
              <li>Your name and organization</li>
              <li>Contact information</li>
              <li>Event type (Town Hall, Meet & Greet, Fundraiser, etc.)</li>
              <li>Proposed date and venue</li>
              <li>Expected attendance</li>
              <li>Event details and special requests</li>
            </ul>
            <a 
              href="mailto:info@cinqueforcongress.com?subject=An Event Has Been Requested&body=Organizer Name:%0D%0AOrganization:%0D%0AEmail:%0D%0APhone:%0D%0AEvent Type:%0D%0AProposed Date:%0D%0AExpected Attendance:%0D%0AVenue:%0D%0AEvent Details:" 
              style={styles.btnPrimary}
            >
              Email Event Request
            </a>
          </div>
        </div>
      </main>
    );
  };

  // About Page Component
  const AboutPage = () => {
    return (
      <main style={styles.contentPage}>
        <div style={styles.pageContainer}>
          <h1 style={styles.pageTitle}>About Cinque Mason</h1>
          <div style={styles.pageContent}>
            <section style={styles.contentSection}>
              <h2 style={styles.contentSubtitle}>Background</h2>
              <p style={styles.contentText}>
                I am a Colorado native, raised in Denver and currently residing in Boulder. My educational journey includes a degree in Communications & International Development from Colorado State University and an MBA from CU Boulder.
              </p>
            </section>
            
            <section style={styles.contentSection}>
              <h2 style={styles.contentSubtitle}>Professional Experience</h2>
              <ul style={styles.contentList}>
                <li>International development work in India, Mali, and Ethiopia</li>
                <li>Agricultural work as a rancher and sheep shearer across Colorado</li>
                <li>Current employment in construction and skilled trades in Boulder</li>
                <li>Student advocacy leadership at CSU</li>
              </ul>
            </section>
            
            <section style={styles.contentSection}>
              <h2 style={styles.contentSubtitle}>Global Perspective</h2>
              <p style={styles.contentText}>
                My humanitarian work across Africa and Asia has provided firsthand insight into the consequences of foreign policy decisions and the importance of diplomatic solutions over military intervention.
              </p>
            </section>
            
            <section style={styles.contentSection}>
              <h2 style={styles.contentSubtitle}>Vision for Service</h2>
              <p style={styles.contentText}>
                My diverse experience has shown me that real change requires breaking free from corporate influence and returning power to the people. I am committed to representing CD2 with integrity, transparency, and accountability.
              </p>
            </section>
          </div>
        </div>
      </main>
    );
  };

  // Policies Page Component
  const PoliciesPage = () => {
    return (
      <main style={styles.contentPage}>
        <div style={styles.pageContainer}>
          <h1 style={styles.pageTitle}>Full Policy Platform</h1>
          <div style={styles.pageContent}>
            {[
              {
                title: "1. Corporate Reform",
                items: [
                  "Enforce antitrust laws to break up monopolies",
                  "Ban corporate purchasing of single-family homes",
                  "Eliminate corporate influence in elections",
                  "Strengthen Sherman Antitrust Act enforcement"
                ]
              },
              {
                title: "2. Housing Affordability",
                items: [
                  "Restrict institutional investors in residential markets",
                  "Increase housing supply through targeted development",
                  "Protect local communities from predatory speculation"
                ]
              },
              {
                title: "3. Healthcare Access",
                items: [
                  "Break pharmaceutical monopolies",
                  "Make publicly-funded research patents open-source",
                  "Ensure affordable access to essential medications"
                ]
              },
              {
                title: "4. Environmental Protection",
                items: [
                  "Establish waste management as a fundamental right",
                  "Protect water resources and pollinator habitats",
                  "Hold corporations accountable for environmental damage"
                ]
              },
              {
                title: "5. Agricultural Reform",
                items: [
                  "Support family farms over industrial agriculture",
                  "Enable direct farmer-to-consumer sales",
                  "Redirect subsidies to sustainable farming practices"
                ]
              }
            ].map((policy, index) => (
              <section key={index} style={styles.policySection}>
                <h2 style={styles.policyTitle}>{policy.title}</h2>
                <ul style={styles.policyList}>
                  {policy.items.map((item, i) => (
                    <li key={i} style={styles.policyItem}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </main>
    );
  };

  // Vision Page Component
  const VisionPage = () => {
    return (
      <main style={styles.contentPage}>
        <div style={styles.pageContainer}>
          <h1 style={styles.pageTitle}>Vision for CD2</h1>
          <div style={styles.pageContent}>
            <p style={styles.visionIntro}>Colorado's 2nd District deserves representation that prioritizes:</p>
            
            <div style={styles.visionGrid}>
              {[
                {
                  title: "Working Families Over Corporate Profits",
                  text: "Every decision should be made with working families in mind, not corporate bottom lines. We need policies that support fair wages, affordable healthcare, and genuine economic opportunity."
                },
                {
                  title: "Environmental Sustainability Over Short-Term Gains",
                  text: "Our natural resources and environment are not commodities to be exploited. We must protect our water, air, and land for future generations while building a sustainable economy."
                },
                {
                  title: "Community Solutions Over Federal Mandates",
                  text: "Local communities know their needs best. We should empower grassroots solutions and community-driven initiatives rather than imposing one-size-fits-all federal programs."
                },
                {
                  title: "Peace & Diplomacy Over Military Intervention",
                  text: "America's strength comes from our values and diplomacy, not military might. We must prioritize peaceful solutions and invest in education, infrastructure, and humanitarian aid."
                }
              ].map((item, index) => (
                <div key={index} style={styles.visionItem}>
                  <h2 style={styles.visionItemTitle}>{item.title}</h2>
                  <p style={styles.visionItemText}>{item.text}</p>
                </div>
              ))}
            </div>
            
            <div style={styles.callToAction}>
              <h2 style={styles.ctaTitle}>Join the Movement</h2>
              <p style={styles.ctaText}>
                This campaign represents a fundamental shift from politics as usual. Together, we can restore democratic governance, break corporate strangleholds on our economy, build sustainable communities, and create a government that serves its people.
              </p>
              <button 
                onClick={() => setCurrentPage('join')}
                style={styles.btnPrimary}
              >
                Get Involved
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  };

  // My Plan Page Component with Interactive Network
  const MyPlanPage = () => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [hoveredNode, setHoveredNode] = useState(null);
    
    // Policy data from the Excel file
    const policyNodes = [
      // Thematic Areas (larger nodes)
      { id: 'area-1', type: 'area', name: 'Innovation & Knowledge', color: '#FF6B6B', x: 200, y: 150 },
      { id: 'area-2', type: 'area', name: 'Healthcare & Science', color: '#4ECDC4', x: 400, y: 100 },
      { id: 'area-3', type: 'area', name: 'Education & Diplomacy', color: '#45B7D1', x: 600, y: 150 },
      { id: 'area-4', type: 'area', name: 'Economy & Corporate Power', color: '#96CEB4', x: 800, y: 100 },
      { id: 'area-5', type: 'area', name: 'Governance & Justice', color: '#FFEAA7', x: 200, y: 300 },
      { id: 'area-6', type: 'area', name: 'Fiscal Reform', color: '#DDA0DD', x: 400, y: 350 },
      { id: 'area-7', type: 'area', name: 'Regional Renewal & Ecology', color: '#98D8C8', x: 600, y: 300 },
      { id: 'area-8', type: 'area', name: 'Transportation & Infrastructure', color: '#F7DC6F', x: 800, y: 350 },
      { id: 'area-9', type: 'area', name: 'Media & Democracy', color: '#85C1E2', x: 300, y: 450 },
      { id: 'area-10', type: 'area', name: 'Civil Rights & Sovereignty', color: '#F8B739', x: 500, y: 500 },
      { id: 'area-11', type: 'area', name: 'Public Health & Community', color: '#BB8FCE', x: 700, y: 450 },
      
      // Key Initiatives (smaller nodes)
      { id: 'init-1', type: 'initiative', name: 'Patent Reform', area: 1, color: '#FF9999', x: 150, y: 200 },
      { id: 'init-2', type: 'initiative', name: 'Transportation Act', area: 8, color: '#FFE066', x: 850, y: 400 },
      { id: 'init-5', type: 'initiative', name: 'Trust Busting', area: 4, color: '#B4E7CE', x: 750, y: 150 },
      { id: 'init-9', type: 'initiative', name: 'Healthcare Reform', area: 2, color: '#7EDDD8', x: 450, y: 150 },
      { id: 'init-12', type: 'initiative', name: 'Redefine Defense', area: 5, color: '#FFF3B2', x: 250, y: 350 },
      { id: 'init-16', type: 'initiative', name: 'Democratize Cabinet', area: 5, color: '#FFF8DC', x: 150, y: 350 },
      { id: 'init-20', type: 'initiative', name: 'Crime as Public Health', area: 11, color: '#DCC7E8', x: 650, y: 500 },
      { id: 'init-32', type: 'initiative', name: 'Tribal Nations Rights', area: 10, color: '#FFCF8C', x: 550, y: 550 },
      { id: 'init-38', type: 'initiative', name: 'Agricultural Liberation', area: 7, color: '#C8E8E3', x: 650, y: 350 },
      { id: 'init-42', type: 'initiative', name: 'National Necessities', area: 4, color: '#C5E7CE', x: 850, y: 150 },
      { id: 'init-54', type: 'initiative', name: 'High-Speed Rail', area: 8, color: '#FFE599', x: 750, y: 400 }
    ];
    
    // Connections between initiatives
    const connections = [
      { from: 'init-1', to: 'init-2' },
      { from: 'init-1', to: 'area-1' },
      { from: 'init-2', to: 'init-54' },
      { from: 'init-2', to: 'area-8' },
      { from: 'init-5', to: 'init-42' },
      { from: 'init-5', to: 'area-4' },
      { from: 'init-9', to: 'init-20' },
      { from: 'init-9', to: 'area-2' },
      { from: 'init-12', to: 'init-16' },
      { from: 'init-12', to: 'area-5' },
      { from: 'init-16', to: 'area-5' },
      { from: 'init-20', to: 'area-11' },
      { from: 'init-32', to: 'area-10' },
      { from: 'init-38', to: 'area-7' },
      { from: 'init-42', to: 'area-4' },
      { from: 'init-54', to: 'area-8' },
      { from: 'area-1', to: 'area-2' },
      { from: 'area-2', to: 'area-11' },
      { from: 'area-3', to: 'area-5' },
      { from: 'area-4', to: 'area-6' },
      { from: 'area-5', to: 'area-10' },
      { from: 'area-6', to: 'area-4' },
      { from: 'area-7', to: 'area-11' },
      { from: 'area-8', to: 'area-7' }
    ];
    
    const handleNodeClick = (node) => {
      setSelectedNode(selectedNode?.id === node.id ? null : node);
    };
    
    const isNodeConnected = (nodeId) => {
      if (!selectedNode) return true;
      if (selectedNode.id === nodeId) return true;
      return connections.some(conn => 
        (conn.from === selectedNode.id && conn.to === nodeId) ||
        (conn.to === selectedNode.id && conn.from === nodeId)
      );
    };
    
    const getNodeOpacity = (nodeId) => {
      if (!selectedNode && !hoveredNode) return 1;
      const activeNode = hoveredNode || selectedNode;
      if (activeNode.id === nodeId) return 1;
      if (isNodeConnected(nodeId)) return 0.8;
      return 0.2;
    };
    
    const getLineOpacity = (conn) => {
      if (!selectedNode && !hoveredNode) return 0.3;
      const activeNode = hoveredNode || selectedNode;
      return (conn.from === activeNode.id || conn.to === activeNode.id) ? 0.8 : 0.1;
    };
    
    return (
      <main style={styles.myPlanPage}>
        <div style={styles.myPlanContainer}>
          <h1 style={styles.myPlanTitle}>My Policy Network Plan</h1>
          <p style={styles.myPlanSubtitle}>
            Interactive visualization of interconnected policy initiatives. Click or hover on nodes to explore connections.
          </p>
          
          <div style={styles.networkContainer}>
            <svg width="100%" height="600" viewBox="0 0 1000 600">
              {/* Draw connections first (behind nodes) */}
              {connections.map((conn, index) => {
                const fromNode = policyNodes.find(n => n.id === conn.from);
                const toNode = policyNodes.find(n => n.id === conn.to);
                if (!fromNode || !toNode) return null;
                
                return (
                  <line
                    key={index}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="#666"
                    strokeWidth="2"
                    opacity={getLineOpacity(conn)}
                    style={{ transition: 'opacity 0.3s' }}
                  />
                );
              })}
              
              {/* Draw nodes */}
              {policyNodes.map(node => (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.type === 'area' ? 35 : 25}
                    fill={node.color}
                    stroke="#fff"
                    strokeWidth="2"
                    opacity={getNodeOpacity(node.id)}
                    style={{ 
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      transform: (hoveredNode?.id === node.id || selectedNode?.id === node.id) 
                        ? 'scale(1.2)' 
                        : 'scale(1)',
                      transformOrigin: `${node.x}px ${node.y}px`
                    }}
                    onClick={() => handleNodeClick(node)}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                  />
                  <text
                    x={node.x}
                    y={node.y + (node.type === 'area' ? 50 : 40)}
                    textAnchor="middle"
                    style={{
                      fontSize: node.type === 'area' ? '12px' : '10px',
                      fill: '#333',
                      fontWeight: node.type === 'area' ? 'bold' : 'normal',
                      pointerEvents: 'none',
                      opacity: getNodeOpacity(node.id)
                    }}
                  >
                    {node.name}
                  </text>
                </g>
              ))}
            </svg>
            
            {/* Info box */}
            {(hoveredNode || selectedNode) && (
              <div style={{
                ...styles.networkInfoBox,
                opacity: hoveredNode || selectedNode ? 1 : 0
              }}>
                <h3>{(hoveredNode || selectedNode).name}</h3>
                <p style={{ fontSize: '14px', margin: '5px 0' }}>
                  {(hoveredNode || selectedNode).type === 'area' ? 'Thematic Area' : 'Policy Initiative'}
                </p>
                <p style={{ fontSize: '12px', color: '#666' }}>
                  {selectedNode ? 'Click to deselect' : 'Click to lock selection'}
                </p>
              </div>
            )}
          </div>
          
          <div style={styles.myPlanContent}>
            <h2 style={styles.myPlanSectionTitle}>Policy Framework</h2>
            
            <div style={styles.policyGrid}>
              <div style={styles.policyCategory}>
                <h3 style={styles.policyCategoryTitle}>Economic Justice</h3>
                <ul style={styles.policyList}>
                  <li>Break up monopolies in healthcare, defense, and real estate</li>
                  <li>Regulate Wall Street price speculation</li>
                  <li>National Necessities Act for essential goods</li>
                  <li>Trust busting initiative across all sectors</li>
                </ul>
              </div>
              
              <div style={styles.policyCategory}>
                <h3 style={styles.policyCategoryTitle}>Democratic Reform</h3>
                <ul style={styles.policyList}>
                  <li>Democratize the presidential cabinet</li>
                  <li>Reduce executive branch power</li>
                  <li>County-level direct democracy</li>
                  <li>Elected UN Ambassador</li>
                </ul>
              </div>
              
              <div style={styles.policyCategory}>
                <h3 style={styles.policyCategoryTitle}>Environmental & Regional</h3>
                <ul style={styles.policyList}>
                  <li>National Waste Justice Act</li>
                  <li>Appalachian Regeneration Compact</li>
                  <li>Agricultural Liberation Act</li>
                  <li>National Bug Refuges</li>
                </ul>
              </div>
              
              <div style={styles.policyCategory}>
                <h3 style={styles.policyCategoryTitle}>Social Infrastructure</h3>
                <ul style={styles.policyList}>
                  <li>National High-Speed Rail</li>
                  <li>After School Care Act</li>
                  <li>Public Broadcasting expansion</li>
                  <li>Abolish toll lanes</li>
                </ul>
              </div>
              
              <div style={styles.policyCategory}>
                <h3 style={styles.policyCategoryTitle}>Healthcare & Science</h3>
                <ul style={styles.policyList}>
                  <li>National Herbal Institute</li>
                  <li>Roll VA into Medicaid</li>
                  <li>Crime as public health issue</li>
                  <li>Patent process liberalization</li>
                </ul>
              </div>
              
              <div style={styles.policyCategory}>
                <h3 style={styles.policyCategoryTitle}>Rights & Sovereignty</h3>
                <ul style={styles.policyList}>
                  <li>Tribal Nations Representation Act</li>
                  <li>State compacts for civil rights</li>
                  <li>Whistleblower Protection Reform</li>
                  <li>International Justice Alignment</li>
                </ul>
              </div>
            </div>
            
            <div style={styles.myPlanCTA}>
              <h3>Join the Movement for Systematic Change</h3>
              <p>These interconnected policies work together to create real, lasting change for Colorado's 2nd District and America.</p>
              <button onClick={() => setCurrentPage('join')} style={styles.btnPrimary}>
                Get Involved
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  };

  // Press Page Component
  const PressPage = () => {
    return (
      <main style={styles.contentPage}>
        <div style={styles.pageContainer}>
          <h1 style={styles.pageTitle}>Press & Media</h1>
          <div style={styles.pageContent}>
            <section style={styles.contentSection}>
              <h2 style={styles.contentSubtitle}>Media Inquiries</h2>
              <p style={styles.contentText}>
                For press inquiries, please contact: <a href="mailto:info@cinqueforcongress.com" style={styles.emailLink}>info@cinqueforcongress.com</a>
              </p>
            </section>
            
            <section style={styles.contentSection}>
              <h2 style={styles.contentSubtitle}>Press Releases</h2>
              <p style={styles.contentText}>Coming soon...</p>
            </section>
            
            <section style={styles.contentSection}>
              <h2 style={styles.contentSubtitle}>Campaign Photos</h2>
              <p style={styles.contentText}>High-resolution photos available upon request.</p>
            </section>
          </div>
        </div>
      </main>
    );
  };

  // Page Router
  const renderPage = () => {
    switch(currentPage) {
      case 'about':
        return <AboutPage />;
      case 'policies':
        return <PoliciesPage />;
      case 'vision':
        return <VisionPage />;
      case 'my-plan':
        return <MyPlanPage />;
      case 'join':
        return <JoinPage />;
      case 'request-event':
        return <RequestEventPage />;
      case 'press':
        return <PressPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div style={styles.app}>
      <Header />
      {renderPage()}
      <Footer />
    </div>
  );
};

// Styles object - Part 1 of 2
const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  
  // Header Styles
  header: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  nav: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1.2rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2d5016',
    textDecoration: 'none',
    fontFamily: 'Arial, sans-serif'
  },
  navMenu: {
    display: 'flex',
    listStyle: 'none',
    gap: '2.5rem',
    alignItems: 'center',
    margin: 0,
    padding: 0
  },
  navMenuActive: {
    display: 'flex',
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    padding: '1rem',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    borderTop: '2px solid #d4a017'
  },
  navItem: {
    listStyle: 'none'
  },
  navLink: {
    textDecoration: 'none',
    color: '#1a1a1a',
    fontWeight: '500',
    fontSize: '0.95rem',
    transition: 'color 0.3s',
    fontFamily: 'Arial, sans-serif',
    cursor: 'pointer'
  },
  donateBtn: {
    backgroundColor: '#d4a017',
    color: '#1e3a5f',
    padding: '0.6rem 1.8rem',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s',
    borderRadius: '4px',
    fontFamily: 'Arial, sans-serif'
  },
  menuToggle: {
    display: 'none',
    flexDirection: 'column',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0
  },
  menuToggleSpan: {
    width: '25px',
    height: '3px',
    backgroundColor: '#2d5016',
    margin: '3px 0',
    transition: '0.3s',
    display: 'block'
  },
  
  // Hero Section
  heroPlatform: {
    background: 'linear-gradient(135deg, #1e3a5f 0%, #2e5c8a 100%)',
    color: '#ffffff',
    padding: '5rem 2rem 6rem',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center'
  },
  heroPlatformContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%'
  },
  heroSection: {
    textAlign: 'center',
    marginBottom: '4rem'
  },
  heroTitle: {
    fontSize: '3.5rem',
    marginBottom: '0.5rem',
    fontWeight: '700',
    letterSpacing: '-1px',
    fontFamily: 'Arial, sans-serif'
  },
  district: {
    fontSize: '1.8rem',
    color: '#ffd700',
    marginBottom: '1.5rem',
    fontWeight: '500'
  },
  tagline: {
    fontSize: '1.3rem',
    marginBottom: '2.5rem',
    lineHeight: '1.8',
    fontWeight: '400',
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  ctaButtons: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
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
  
  // Platform Overview
  platformOverview: {
    paddingTop: '3rem',
    borderTop: '2px solid rgba(255,255,255,0.2)'
  },
  platformTitle: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#ffd700',
    fontFamily: 'Arial, sans-serif'
  },
  platformIntro: {
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto 3rem',
    fontSize: '1.2rem',
    color: 'rgba(255,255,255,0.95)'
  },
  platformGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  },
  platformCard: {
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    padding: '2rem',
    borderLeft: '4px solid #d4a017',
    borderRadius: '8px',
    transition: 'all 0.3s'
  },
  platformCardTitle: {
    color: '#ffd700',
    marginBottom: '1rem',
    fontSize: '1.4rem',
    fontFamily: 'Arial, sans-serif'
  },
  platformCardText: {
    color: 'rgba(255,255,255,0.9)',
    lineHeight: '1.7'
  },
  
  // Get Involved Section
  getInvolved: {
    padding: '5rem 2rem',
    backgroundColor: '#fafafa'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  sectionTitle: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#2d5016',
    fontFamily: 'Arial, sans-serif'
  },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  actionItem: {
    textAlign: 'center',
    padding: '2.5rem 2rem',
    backgroundColor: '#ffffff',
    border: '2px solid #d4a017',
    borderRadius: '8px',
    transition: 'all 0.3s'
  },
  actionIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#2d5016'
  },
  actionItemTitle: {
    color: '#2d5016',
    marginBottom: '1rem',
    fontSize: '1.5rem',
    transition: 'color 0.3s',
    fontFamily: 'Arial, sans-serif'
  },
  actionItemText: {
    color: '#4a4a4a',
    marginBottom: '1.5rem',
    transition: 'color 0.3s'
  },
  actionBtn: {
    padding: '0.7rem 2rem',
    backgroundColor: '#2d5016',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: '600',
    display: 'inline-block',
    transition: 'all 0.3s',
    fontFamily: 'Arial, sans-serif',
    cursor: 'pointer',
    border: 'none'
  },
  
  // Newsletter Section
  newsletter: {
    backgroundColor: '#2d5016',
    color: '#ffffff',
    padding: '3rem 2rem',
    textAlign: 'center'
  },
  newsletterTitle: {
    fontSize: '2rem',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif'
  },
  newsletterText: {
    marginBottom: '1rem'
  },
  newsletterForm: {
    display: 'flex',
    gap: '1rem',
    maxWidth: '500px',
    margin: '2rem auto',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  newsletterInput: {
    flex: '1',
    minWidth: '250px',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  newsletterButton: {
    padding: '0.8rem 2rem',
    backgroundColor: '#d4a017',
    color: '#1e3a5f',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontSize: '1rem'
  },
  newsletterDisclaimer: {
    fontSize: '0.85rem',
    marginTop: '1rem',
    opacity: '0.9'
  },
  emailLink: {
    color: '#ffd700',
    textDecoration: 'none'
  },
  
  // Footer Styles
  footer: {
    backgroundColor: '#1e3a5f',
    color: '#ffffff',
    paddingTop: '3rem',
    marginTop: 'auto'
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  },
  footerSection: {},
  footerTitle: {
    color: '#ffd700',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif'
  },
  footerText: {
    color: 'rgba(255,255,255,0.9)',
    lineHeight: '1.8'
  },
  footerLinks: {
    listStyle: 'none',
    padding: 0
  },
  footerLink: {
    color: 'rgba(255,255,255,0.9)',
    textDecoration: 'none',
    lineHeight: '1.8',
    cursor: 'pointer'
  },
  socialLinks: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  socialLink: {
    width: '40px',
    height: '40px',
    backgroundColor: '#2d5016',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    textDecoration: 'none',
    transition: 'background 0.3s',
    fontWeight: 'bold'
  },
  disclaimer: {
    backgroundColor: '#1a1a1a',
    color: '#999',
    textAlign: 'center',
    padding: '1.5rem 2rem',
    fontSize: '0.85rem',
    lineHeight: '1.6'
  },
  
  // Form Pages
  formPage: {
    padding: '4rem 2rem',
    minHeight: '70vh',
    backgroundColor: '#fafafa',
    flex: 1
  },
  formContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '3rem',
    borderRadius: '8px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
  },
  formTitle: {
    color: '#2d5016',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif'
  },
  formIntro: {
    color: '#4a4a4a',
    marginBottom: '2rem',
    fontSize: '1.1rem'
  },
  formInstructions: {
    marginTop: '2rem'
  },
  instructionList: {
    marginTop: '1rem',
    marginBottom: '2rem',
    paddingLeft: '1.5rem',
    color: '#4a4a4a',
    lineHeight: '1.8'
  },
  
  // Content Pages
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
  },
  
  // Policy Page
  policySection: {
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: '#fafafa',
    borderLeft: '4px solid #d4a017',
    borderRadius: '4px'
  },
  policyTitle: {
    color: '#1e3a5f',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif'
  },
  policyList: {
    paddingLeft: '1.5rem',
    color: '#4a4a4a',
    lineHeight: '1.8'
  },
  policyItem: {
    marginBottom: '0.5rem'
  },
  
  // Vision Page
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
  
  // My Plan Page Styles
  myPlanPage: {
    padding: '4rem 2rem',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)'
  },
  myPlanContainer: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  myPlanTitle: {
    fontSize: '3rem',
    color: '#2d5016',
    textAlign: 'center',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif'
  },
  myPlanSubtitle: {
    fontSize: '1.2rem',
    color: '#4a4a4a',
    textAlign: 'center',
    marginBottom: '3rem'
  },
  networkContainer: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    marginBottom: '3rem',
    position: 'relative'
  },
  networkInfoBox: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'rgba(255,255,255,0.95)',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    minWidth: '200px',
    transition: 'opacity 0.3s'
  },
  myPlanContent: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '3rem',
    boxShadow: '0 5px 20px rgba(0,0,0,0.08)'
  },
  myPlanSectionTitle: {
    fontSize: '2rem',
    color: '#2d5016',
    marginBottom: '2rem',
    fontFamily: 'Arial, sans-serif'
  },
  policyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem'
  },
  policyCategory: {
    background: '#fafafa',
    padding: '1.5rem',
    borderRadius: '8px',
    borderLeft: '4px solid #d4a017'
  },
  policyCategoryTitle: {
    color: '#1e3a5f',
    marginBottom: '1rem',
    fontSize: '1.3rem',
    fontFamily: 'Arial, sans-serif'
  },
  myPlanCTA: {
    textAlign: 'center',
    padding: '2rem',
    background: 'linear-gradient(135deg, #2d5016 0%, #3a6b35 100%)',
    borderRadius: '8px',
    color: '#ffffff'
  }
};

// Add responsive styles
if (typeof window !== 'undefined' && window.innerWidth <= 768) {
  styles.navMenu.display = 'none';
  styles.menuToggle.display = 'flex';
  styles.heroTitle.fontSize = '2rem';
  styles.platformGrid.gridTemplateColumns = '1fr';
  styles.actionGrid.gridTemplateColumns = '1fr';
}

export default App;
