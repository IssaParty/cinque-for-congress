import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyPlanPage = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1600, height: 1000 });
  const [isMobile, setIsMobile] = useState(false);

  // Update dimensions and mobile state on window resize
  useEffect(() => {
    const updateDimensions = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      setDimensions({
        width: Math.max(isMobileView ? 350 : 1200, window.innerWidth - (isMobileView ? 20 : 100)),
        height: isExpanded ? Math.max(600, window.innerHeight - (isMobileView ? 200 : 300)) : (isMobileView ? 200 : 300)
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isExpanded]);

  // Colorblind-friendly palette
  const colors = {
    thematic: {
      economy: '#1f77b4',      // Blue
      governance: '#ff7f0e',   // Orange
      environment: '#2ca02c',  // Green
      social: '#d62728',       // Red
      health: '#9467bd',       // Purple
      infrastructure: '#8c564b', // Brown
      rights: '#e377c2',       // Pink
      innovation: '#17becf',   // Cyan
      defense: '#bcbd22',      // Olive
      media: '#7f7f7f',        // Gray
      fiscal: '#ffbb78'        // Light Orange
    },
    initiatives: {
      economy: '#aec7e8',
      governance: '#ffbb78',
      environment: '#98df8a',
      social: '#ff9896',
      health: '#c5b0d5',
      infrastructure: '#c49c94',
      rights: '#f7b6d3',
      innovation: '#9edae5',
      defense: '#dbdb8d',
      media: '#c7c7c7',
      fiscal: '#fdd9b5'
    }
  };

  // Enhanced policy nodes with descriptions
  const policyNodes = [
    // Thematic Areas (Central Nodes)
    {
      id: 'thematic-economy',
      type: 'thematic',
      name: 'Economic Justice',
      category: 'economy',
      color: colors.thematic.economy,
      x: dimensions.width * 0.7,
      y: dimensions.height * 0.3,
      description: 'Breaking up monopolies, regulating speculation, and ensuring fair economic practices for all Americans.'
    },
    {
      id: 'thematic-governance',
      type: 'thematic',
      name: 'Democratic Reform',
      category: 'governance',
      color: colors.thematic.governance,
      x: dimensions.width * 0.5,
      y: dimensions.height * 0.15,
      description: 'Reforming government structures to increase transparency, accountability, and direct democracy.'
    },
    {
      id: 'thematic-environment',
      type: 'thematic',
      name: 'Environmental Protection',
      category: 'environment',
      color: colors.thematic.environment,
      x: dimensions.width * 0.8,
      y: dimensions.height * 0.6,
      description: 'Protecting our natural resources and addressing climate change through comprehensive environmental policies.'
    },
    {
      id: 'thematic-social',
      type: 'thematic',
      name: 'Social Infrastructure',
      category: 'social',
      color: colors.thematic.social,
      x: dimensions.width * 0.3,
      y: dimensions.height * 0.4,
      description: 'Building robust social programs that support families, communities, and vulnerable populations.'
    },
    {
      id: 'thematic-health',
      type: 'thematic',
      name: 'Healthcare Reform',
      category: 'health',
      color: colors.thematic.health,
      x: dimensions.width * 0.6,
      y: dimensions.height * 0.7,
      description: 'Ensuring affordable, accessible healthcare for all through systemic healthcare reform.'
    },
    {
      id: 'thematic-infrastructure',
      type: 'thematic',
      name: 'Infrastructure & Transportation',
      category: 'infrastructure',
      color: colors.thematic.infrastructure,
      x: dimensions.width * 0.2,
      y: dimensions.height * 0.7,
      description: 'Modernizing American infrastructure with sustainable transportation and communication networks.'
    },
    {
      id: 'thematic-rights',
      type: 'thematic',
      name: 'Civil Rights & Justice',
      category: 'rights',
      color: colors.thematic.rights,
      x: dimensions.width * 0.4,
      y: dimensions.height * 0.8,
      description: 'Protecting civil liberties and ensuring equal justice under law for all communities.'
    },
    {
      id: 'thematic-innovation',
      type: 'thematic',
      name: 'Innovation & Technology',
      category: 'innovation',
      color: colors.thematic.innovation,
      x: dimensions.width * 0.8,
      y: dimensions.height * 0.2,
      description: 'Promoting technological advancement while protecting privacy and workers rights.'
    },

    // Policy Initiatives (Connected Nodes)
    {
      id: 'init-antitrust',
      type: 'initiative',
      name: 'Antitrust Enforcement',
      category: 'economy',
      color: colors.initiatives.economy,
      x: dimensions.width * 0.9,
      y: dimensions.height * 0.35,
      description: 'Break up monopolies in healthcare, defense, real estate, and technology sectors.'
    },
    {
      id: 'init-housing',
      type: 'initiative',
      name: 'Housing Justice Act',
      category: 'economy',
      color: colors.initiatives.economy,
      x: dimensions.width * 0.65,
      y: dimensions.height * 0.45,
      description: 'Ban corporate purchasing of single-family homes and protect communities from speculation.'
    },
    {
      id: 'init-cabinet',
      type: 'initiative',
      name: 'Democratize Cabinet',
      category: 'governance',
      color: colors.initiatives.governance,
      x: dimensions.width * 0.35,
      y: dimensions.height * 0.1,
      description: 'Make presidential cabinet positions elected by the people, not appointed.'
    },
    {
      id: 'init-democracy',
      type: 'initiative',
      name: 'Direct Democracy',
      category: 'governance',
      color: colors.initiatives.governance,
      x: dimensions.width * 0.6,
      y: dimensions.height * 0.05,
      description: 'Implement county-level direct democracy initiatives for local decision-making.'
    },
    {
      id: 'init-waste',
      type: 'initiative',
      name: 'Waste Justice Act',
      category: 'environment',
      color: colors.initiatives.environment,
      x: dimensions.width * 0.95,
      y: dimensions.height * 0.65,
      description: 'Establish waste management as a fundamental right and environmental justice priority.'
    },
    {
      id: 'init-agriculture',
      type: 'initiative',
      name: 'Agricultural Liberation',
      category: 'environment',
      color: colors.initiatives.environment,
      x: dimensions.width * 0.75,
      y: dimensions.height * 0.75,
      description: 'Support family farms over industrial agriculture and enable direct farmer-to-consumer sales.'
    }
  ];

  // Enhanced connections for spider web effect
  const connections = [
    // Central thematic connections
    { from: 'thematic-economy', to: 'thematic-governance' },
    { from: 'thematic-governance', to: 'thematic-social' },
    { from: 'thematic-social', to: 'thematic-rights' },
    { from: 'thematic-rights', to: 'thematic-health' },
    { from: 'thematic-health', to: 'thematic-environment' },
    { from: 'thematic-environment', to: 'thematic-innovation' },
    { from: 'thematic-innovation', to: 'thematic-economy' },
    { from: 'thematic-infrastructure', to: 'thematic-social' },
    { from: 'thematic-infrastructure', to: 'thematic-environment' },

    // Initiative to thematic connections
    { from: 'init-antitrust', to: 'thematic-economy' },
    { from: 'init-housing', to: 'thematic-economy' },
    { from: 'init-cabinet', to: 'thematic-governance' },
    { from: 'init-democracy', to: 'thematic-governance' },
    { from: 'init-waste', to: 'thematic-environment' },
    { from: 'init-agriculture', to: 'thematic-environment' }
  ];

  const handleNodeClick = (node) => {
    setSelectedNode(selectedNode?.id === node.id ? null : node);
  };

  const toggleDiagram = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setSelectedNode(null);
      setHoveredNode(null);
    }
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
    if (activeNode && activeNode.id === nodeId) return 1;
    if (isNodeConnected(nodeId)) return 0.8;
    return 0.3;
  };

  const getLineOpacity = (conn) => {
    if (!selectedNode && !hoveredNode) return 0.4;
    const activeNode = hoveredNode || selectedNode;
    if (activeNode && (conn.from === activeNode.id || conn.to === activeNode.id)) return 0.9;
    return 0.1;
  };

  const getNodeRadius = (node) => {
    return node.type === 'thematic' ? 45 : 30;
  };

  return (
    <>
      
      <div style={isMobile ? styles.myPlanPageMobile : styles.myPlanPage}>
      <style>
        {`
          @keyframes glossyShine {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <div style={isMobile ? styles.pageHeaderMobile : styles.pageHeader}>
        <h1 style={isMobile ? styles.pageTitleMobile : styles.pageTitle}>My Plan for Colorado's 2nd District</h1>
        <p style={isMobile ? styles.pageSubtitleMobile : styles.pageSubtitle}>
          To liberate this country from corporate greed we must take a multi-industry approach not just targeting Big Tech in Colorado. My plan cracks down on monopolies, reins in executive power, and resets the playing field so individuals have the freedom to make decisions about their own lives. True freedom means a high quality of decision-making, and that leads to a high quality of life.
        </p>
      </div>

      {/* COMMENTED OUT: Policy Spider Web Visualization - Code preserved for future use */}
      {false && (
        <div style={styles.diagramSection}>
          <div style={styles.diagramHeader} onClick={toggleDiagram}>
            <h2 style={styles.diagramTitle}>
              Policy Network Visualization
              <span style={styles.expandIcon}>
                {isExpanded ? '▼' : '▶'}
              </span>
            </h2>
            <p style={styles.diagramSubtitle}>
              {isExpanded
                ? 'Click to collapse the interactive policy network'
                : 'Click to explore the interconnected policy framework'
              }
            </p>
          </div>

          <div style={{
            ...styles.networkContainer,
            height: isExpanded ? dimensions.height : 0,
            overflow: 'hidden',
            transition: 'all 0.5s ease-in-out'
          }}>
            <svg
              width="100%"
              height={dimensions.height}
              viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
              style={styles.svg}
            >
            {/* Connection lines */}
            {connections.map((conn, index) => {
              const fromNode = policyNodes.find(n => n.id === conn.from);
              const toNode = policyNodes.find(n => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              const isActive = hoveredNode && (conn.from === hoveredNode.id || conn.to === hoveredNode.id);

              return (
                <line
                  key={index}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isActive ? '#333' : '#666'}
                  strokeWidth={isActive ? 3 : 2}
                  opacity={getLineOpacity(conn)}
                  style={{ transition: 'all 0.3s ease' }}
                />
              );
            })}

            {/* Node circles */}
            {policyNodes.map(node => {
              const radius = getNodeRadius(node);
              const isActive = hoveredNode?.id === node.id || selectedNode?.id === node.id;

              return (
                <g key={node.id}>
                  {/* Node border/glow effect */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={radius + (isActive ? 5 : 2)}
                    fill="none"
                    stroke={isActive ? '#333' : '#fff'}
                    strokeWidth={isActive ? 3 : 2}
                    opacity={getNodeOpacity(node.id) * 0.8}
                    style={{ transition: 'all 0.3s ease' }}
                  />

                  {/* Main node */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={radius}
                    fill={node.color}
                    stroke="#fff"
                    strokeWidth="3"
                    opacity={getNodeOpacity(node.id)}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      filter: isActive ? 'brightness(1.1)' : 'none'
                    }}
                    onClick={() => handleNodeClick(node)}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                  />

                  {/* Node labels */}
                  <text
                    x={node.x}
                    y={node.y + radius + 20}
                    textAnchor="middle"
                    style={{
                      fontSize: node.type === 'thematic' ? '14px' : '12px',
                      fill: '#333',
                      fontWeight: node.type === 'thematic' ? 'bold' : 'normal',
                      pointerEvents: 'none',
                      opacity: getNodeOpacity(node.id),
                      fontFamily: 'Arial, sans-serif'
                    }}
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Enhanced info box */}
          {(hoveredNode || selectedNode) && (
            <div style={{
              ...styles.infoBox,
              opacity: hoveredNode || selectedNode ? 1 : 0
            }}>
              <h3 style={styles.infoTitle}>
                {(hoveredNode || selectedNode).name}
              </h3>
              <p style={styles.infoType}>
                {(hoveredNode || selectedNode).type === 'thematic' ? 'Policy Area' : 'Initiative'}
              </p>
              <p style={styles.infoDescription}>
                {(hoveredNode || selectedNode).description}
              </p>
              <p style={styles.infoHint}>
                {selectedNode ? 'Click to deselect • Hover others to explore connections' : 'Click to pin selection'}
              </p>
            </div>
          )}
          </div>
        </div>
      )}

      {/* NEW CONTENT: Governmental Reform Pillars */}
      <div style={isMobile ? styles.pillarsSectionMobile : styles.pillarsSection}>
        <h2 style={isMobile ? styles.pillarsTitleMobile : styles.pillarsTitle}>Governmental Reform Pillars</h2>

        <div style={styles.keyPillarsSection}>
          <h3 style={styles.sectionSubtitle}>Key Pillars</h3>
          <div style={styles.pillarsList}>
            <div style={styles.pillarItem}>
              <h4 style={styles.pillarTitle}>Corporate Fairness & Housing</h4>
              <p style={styles.pillarText}>Break up REITs, Big Ag, healthcare monopolies, and ski resort conglomerates; ban corporate speculation on homes; cancel student debt.</p>
            </div>

            <div style={styles.pillarItem}>
              <h4 style={styles.pillarTitle}>Fair Cost of Living</h4>
              <p style={styles.pillarText}>Cap drug prices, stop gouging on essentials, abolish toll lanes, crack down on towing and parking profiteering.</p>
            </div>

            <div style={styles.pillarItem}>
              <h4 style={styles.pillarTitle}>Healthcare & Well-Being</h4>
              <p style={styles.pillarText}>End speculation on medical debt, treat food/water/healthcare as rights, investigate chronic illness causes, create a National Herbal Institute.</p>
            </div>

            <div style={styles.pillarItem}>
              <h4 style={styles.pillarTitle}>Environment & Agriculture</h4>
              <p style={styles.pillarText}>Make clean air/water/soil civil rights; hold polluters accountable; push regenerative farming; support urban/rural food infrastructure.</p>
            </div>

            <div style={styles.pillarItem}>
              <h4 style={styles.pillarTitle}>Civic Protections & Justice</h4>
              <p style={styles.pillarText}>Protect dissent, repeal the Patriot Act, end profit-driven prisons, investigate CPS failures, shift DOJ toward rehabilitation.</p>
            </div>

            <div style={styles.pillarItem}>
              <h4 style={styles.pillarTitle}>Education & Youth</h4>
              <p style={styles.pillarText}>Free nationwide after-school care, expand trade/service programs, apply best practices from global education models.</p>
            </div>

            <div style={styles.pillarItem}>
              <h4 style={styles.pillarTitle}>Immigration & Human Rights</h4>
              <p style={styles.pillarText}>Protect visa holders, move visa oversight to Congress, respect contributions of visitors, students, and workers.</p>
            </div>

            <div style={styles.pillarItem}>
              <h4 style={styles.pillarTitle}>Native Sovereignty</h4>
              <p style={styles.pillarText}>Establish a Tribal Congress, modernize treaties, guarantee tribal representation, prioritize Missing & Murdered Indigenous Women.</p>
            </div>

            <div style={styles.pillarItem}>
              <h4 style={styles.pillarTitle}>Defense & Diplomacy</h4>
              <p style={styles.pillarText}>Return war/tariff powers to Congress, democratize Cabinet posts, end ties with dictatorships and theocracies.</p>
            </div>

            <div style={styles.pillarItem}>
              <h4 style={styles.pillarTitle}>Transparency & Democracy</h4>
              <p style={styles.pillarText}>Public digital ledger for government spending; pilot direct democracy in CD2.</p>
            </div>

            <div style={styles.pillarItem}>
              <h4 style={styles.pillarTitle}>Infrastructure & Transit</h4>
              <p style={styles.pillarText}>Study national high-speed rail, abolish interstate toll lanes.</p>
            </div>

            <div style={styles.pillarItem}>
              <h4 style={styles.pillarTitle}>Public Broadcasting</h4>
              <p style={styles.pillarText}>Fully fund PBS, NPR, and local media for independent information.</p>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Section */}
        <div style={styles.detailedSection}>
          <h3 style={styles.sectionSubtitle}>More Elaborate Breakdown</h3>

          <div style={styles.detailsGrid}>
            <div style={styles.detailSection}>
              <h4 style={styles.detailTitle}>Corporate Crackdown & Economic Fairness</h4>
              <ul style={styles.detailList}>
                <li>Break up REITs, ski resort conglomerates, Big Ag, biotech, and healthcare monopolies.</li>
                <li>Ban trillion-dollar corporations and private equity speculation on single-family homes.</li>
                <li>Force monopolists to sell and increase supply of housing.</li>
                <li>Open-source publicly funded patents.</li>
                <li>Cap student loan interest at inflation; cancel student debt and create free higher education.</li>
              </ul>
            </div>

            <div style={styles.detailSection}>
              <h4 style={styles.detailTitle}>Fair Cost of Living</h4>
              <ul style={styles.detailList}>
                <li>Conduct a National Necessities Study on housing materials, food, and medicine to prevent price gouging.</li>
                <li>Impose price caps on essential medicines.</li>
                <li>Crack down on towing and parking lot profiteering.</li>
                <li>Abolish interstate toll lanes.</li>
              </ul>
            </div>

            <div style={styles.detailSection}>
              <h4 style={styles.detailTitle}>Healthcare & Public Well-Being</h4>
              <ul style={styles.detailList}>
                <li>Stop speculation on medical debt.</li>
                <li>Recognize food, water, and healthcare as foundations of freedom.</li>
                <li>Investigate chronic illness causes (environmental, food, chemical) and provide alternatives.</li>
                <li>Establish a National Herbal Institute in Colorado with national branches.</li>
                <li>Until the cost of healthcare is reasonable for all, require all law makers and their families to use medicaid and medicaid only.</li>
              </ul>
            </div>

            <div style={styles.detailSection}>
              <h4 style={styles.detailTitle}>Environmental Protection & Regeneration</h4>
              <ul style={styles.detailList}>
                <li>Treat clean air, water, and soil as civil rights.</li>
                <li>Invest in recycling, waste-to-resource, pollinator protection, and regenerative farming.</li>
                <li>Reassess dams and water storage in the Southwest.</li>
                <li>Hold corporations accountable for forever chemicals and toxic waste.</li>
                <li>Empower towns to push back on destructive suburban sprawl.</li>
              </ul>
            </div>

            <div style={styles.detailSection}>
              <h4 style={styles.detailTitle}>Rural Renewal & Agriculture</h4>
              <ul style={styles.detailList}>
                <li>Allow on-farm processing and direct-to-consumer sales; reframe USDA accordingly.</li>
                <li>Redirect subsidies to heritage and regenerative farms.</li>
                <li>Build food infrastructure for rural and urban food deserts.</li>
                <li>Invest in rural after-school programs and urban farming/ranching programs.</li>
              </ul>
            </div>

            <div style={styles.detailSection}>
              <h4 style={styles.detailTitle}>Civic Protections & Justice</h4>
              <ul style={styles.detailList}>
                <li>Protect dissent and repeal the Patriot Act.</li>
                <li>Tie reelection eligibility to fiscal discipline.</li>
                <li>Repeal laws rooted in racial, religious, gender, cultural, or corporate supremacy.</li>
                <li>Shift DOJ toward rehabilitation, not profit-driven imprisonment.</li>
                <li>Investigate CPS failures and environmental drivers of crime and addiction.</li>
              </ul>
            </div>

            <div style={styles.detailSection}>
              <h4 style={styles.detailTitle}>Education & Youth Empowerment</h4>
              <ul style={styles.detailList}>
                <li>Launch a federal after-school care program nationwide.</li>
                <li>Expand trade and service-learning programs in urban areas.</li>
                <li>Commission a global review of best education practices and apply state-by-state reforms.</li>
              </ul>
            </div>

            <div style={styles.detailSection}>
              <h4 style={styles.detailTitle}>Immigration & Human Rights</h4>
              <ul style={styles.detailList}>
                <li>Protect visa holders from political bargaining.</li>
                <li>Place visa oversight under Congress, not the executive branch.</li>
                <li>Respect visitors, students, and workers for their contributions.</li>
              </ul>
            </div>

            <div style={styles.detailSection}>
              <h4 style={styles.detailTitle}>Native Representation & Tribal Sovereignty</h4>
              <ul style={styles.detailList}>
                <li>Establish a tribally elected Tribal Congress to replace much of the BIA.</li>
                <li>Modernize treaties to guarantee sovereignty and fair resources.</li>
                <li>Prioritize Missing and Murdered Indigenous Women.</li>
                <li>Annul outdated, discriminatory laws.</li>
                <li>Guarantee tribes direct representation in Congress.</li>
              </ul>
            </div>

            <div style={styles.detailSection}>
              <h4 style={styles.detailTitle}>Defense Reduction & Diplomacy</h4>
              <ul style={styles.detailList}>
                <li>End transactional treaties and weaponized democracies.</li>
                <li>Cut military ties with theocracies and dictatorships.</li>
                <li>Return war powers and tariff authority to Congress.</li>
                <li>Democratize the Cabinet with public elections for key posts.</li>
              </ul>
            </div>

            <div style={styles.detailSection}>
              <h4 style={styles.detailTitle}>Transparency & Direct Democracy</h4>
              <ul style={styles.detailList}>
                <li>Create a secure public digital ledger for government spending.</li>
                <li>Pilot direct democracy capabilities in Colorado's 2nd District.</li>
              </ul>
            </div>

            <div style={styles.detailSection}>
              <h4 style={styles.detailTitle}>Infrastructure Fairness</h4>
              <ul style={styles.detailList}>
                <li>Commission a national study on high-speed rail across the lower 48.</li>
                <li>Abolish toll lanes nationwide.</li>
              </ul>
            </div>

            <div style={styles.detailSection}>
              <h4 style={styles.detailTitle}>Public Broadcasting & Democracy</h4>
              <ul style={styles.detailList}>
                <li>Expand budgets for PBS, NPR, and local independent media.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      </div>
      
    </>
  );
};

const styles = {
  myPlanPage: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, rgba(212, 160, 23, 0.1), rgba(45, 80, 22, 0.05))',
    padding: '1rem'
  },
  pageHeader: {
    textAlign: 'center',
    marginBottom: '2rem',
    maxWidth: '75%',
    margin: '0 auto 2rem',
    padding: '2rem'
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif'
  },
  pageSubtitle: {
    fontSize: '1.4rem',
    color: '#4a5568',
    lineHeight: '2.0',
    width: '100%',
    margin: '0 auto',
    letterSpacing: '0.5px',
    wordSpacing: '2px',
    textAlign: 'justify'
  },
  pillarsSection: {
    maxWidth: '75%',
    margin: '0 auto 3rem',
    backgroundColor: '#ffffff',
    padding: '3rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    border: '1px solid rgba(212, 160, 23, 0.2)'
  },
  pillarsTitle: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: '2rem',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  },
  keyPillarsSection: {
    marginBottom: '3rem'
  },
  sectionSubtitle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: '2rem',
    fontFamily: 'Arial, sans-serif',
    borderBottom: '2px solid #d4a017',
    paddingBottom: '0.5rem'
  },
  pillarsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  pillarItem: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
    borderLeft: '4px solid #d4a017',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
    }
  },
  pillarTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: '0.8rem',
    fontFamily: 'Arial, sans-serif'
  },
  pillarText: {
    fontSize: '1rem',
    color: '#4a5568',
    lineHeight: '1.6',
    margin: 0
  },
  detailedSection: {
    marginTop: '3rem'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '2rem'
  },
  detailSection: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  detailTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif',
    borderBottom: '1px solid #d4a017',
    paddingBottom: '0.5rem'
  },
  detailList: {
    margin: 0,
    paddingLeft: '1.2rem',
    color: '#4a5568',
    lineHeight: '1.7'
  },
  diagramSection: {
    margin: '2rem auto',
    maxWidth: '95%',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease'
  },
  diagramHeader: {
    padding: '1.5rem 2rem',
    cursor: 'pointer',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px 10px 0 0',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#e9ecef'
    }
  },
  diagramTitle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#2d5016',
    margin: '0 0 0.5rem 0',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  diagramSubtitle: {
    fontSize: '1rem',
    color: '#6c757d',
    margin: 0,
    fontStyle: 'italic'
  },
  expandIcon: {
    fontSize: '1.2rem',
    color: '#d4a017',
    transition: 'transform 0.3s ease',
    marginLeft: '1rem'
  },
  networkContainer: {
    backgroundColor: '#ffffff',
    padding: '1rem',
    position: 'relative',
    borderRadius: '0 0 10px 10px'
  },
  svg: {
    display: 'block',
    margin: '0 auto'
  },
  infoBox: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'rgba(255,255,255,0.98)',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    maxWidth: '300px',
    transition: 'all 0.3s ease',
    border: '2px solid #e2e8f0'
  },
  infoTitle: {
    margin: '0 0 8px 0',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#2d3748'
  },
  infoType: {
    margin: '0 0 12px 0',
    fontSize: '12px',
    fontWeight: '600',
    color: '#4a5568',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  infoDescription: {
    margin: '0 0 12px 0',
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#4a5568'
  },
  infoHint: {
    margin: 0,
    fontSize: '11px',
    color: '#718096',
    fontStyle: 'italic'
  },
  ctaSection: {
    textAlign: 'center',
    padding: '3rem 2rem',
    backgroundColor: '#2d5016',
    borderRadius: '16px',
    color: '#ffffff',
    maxWidth: '800px',
    margin: '0 auto'
  },
  ctaTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif'
  },
  ctaText: {
    fontSize: '1.8rem',
    lineHeight: '2.2',
    marginBottom: '2rem',
    fontWeight: 'bold',
    fontStyle: 'italic',
    letterSpacing: '1px',
    width: '100%',
    display: 'block'
  },
  glossyName: {
    background: 'linear-gradient(45deg, #d4a017, #f5d76e, #d4a017)',
    backgroundSize: '200% 200%',
    animation: 'glossyShine 2s ease-in-out infinite',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 0 20px rgba(212, 160, 23, 0.5)',
    filter: 'drop-shadow(0 0 10px rgba(212, 160, 23, 0.3))'
  },
  ctaButton: {
    display: 'inline-block',
    padding: '1rem 2.5rem',
    backgroundColor: '#d4a017',
    color: '#1e3a5f',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(212, 160, 23, 0.3)'
  },
  policyContent: {
    padding: '4rem 2rem',
    backgroundColor: '#ffffff'
  },
  pageContainer: {
    maxWidth: '900px',
    margin: '0 auto'
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

  // Mobile styles
  myPlanPageMobile: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, rgba(212, 160, 23, 0.1), rgba(45, 80, 22, 0.05))',
    padding: '0.5rem'
  },
  pageHeaderMobile: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    maxWidth: '100%',
    margin: '0 auto 1.5rem',
    padding: '1rem'
  },
  pageTitleMobile: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: '0.8rem',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.2'
  },
  pageSubtitleMobile: {
    fontSize: '1rem',
    color: '#1e3a5f',
    lineHeight: '1.6',
    fontFamily: 'Arial, sans-serif'
  },
  pillarsSectionMobile: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: '1rem 0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  pillarsTitleMobile: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: '#2d5016',
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontFamily: 'Arial, sans-serif'
  }
};

export default MyPlanPage;