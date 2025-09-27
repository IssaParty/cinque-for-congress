import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyPlanPage = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 1400, height: 800 });
  const [showVisualization, setShowVisualization] = useState(false);

  // Update dimensions on window resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: Math.max(1400, window.innerWidth - 100),
        height: Math.max(800, window.innerHeight - 200)
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

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
    },
    {
      id: 'init-education',
      type: 'initiative',
      name: 'Education Reform',
      category: 'social',
      color: colors.initiatives.social,
      x: dimensions.width * 0.15,
      y: dimensions.height * 0.5,
      description: 'Comprehensive education reform including after-school care and student debt relief.'
    },
    {
      id: 'init-childcare',
      type: 'initiative',
      name: 'Universal Childcare',
      category: 'social',
      color: colors.initiatives.social,
      x: dimensions.width * 0.25,
      y: dimensions.height * 0.25,
      description: 'Provide universal childcare and after-school programs for working families.'
    },
    {
      id: 'init-medicare',
      type: 'initiative',
      name: 'Medicare Expansion',
      category: 'health',
      color: colors.initiatives.health,
      x: dimensions.width * 0.5,
      y: dimensions.height * 0.85,
      description: 'Expand Medicare coverage and integrate VA services for comprehensive healthcare.'
    },
    {
      id: 'init-pharma',
      type: 'initiative',
      name: 'Pharmaceutical Reform',
      category: 'health',
      color: colors.initiatives.health,
      x: dimensions.width * 0.7,
      y: dimensions.height * 0.8,
      description: 'Break pharmaceutical monopolies and make publicly-funded research patents open-source.'
    },
    {
      id: 'init-rail',
      type: 'initiative',
      name: 'High-Speed Rail',
      category: 'infrastructure',
      color: colors.initiatives.infrastructure,
      x: dimensions.width * 0.1,
      y: dimensions.height * 0.8,
      description: 'Build a national high-speed rail network to connect communities and reduce emissions.'
    },
    {
      id: 'init-broadband',
      type: 'initiative',
      name: 'Public Broadband',
      category: 'infrastructure',
      color: colors.initiatives.infrastructure,
      x: dimensions.width * 0.05,
      y: dimensions.height * 0.6,
      description: 'Provide universal broadband access as a public utility and human right.'
    },
    {
      id: 'init-tribal',
      type: 'initiative',
      name: 'Tribal Sovereignty Act',
      category: 'rights',
      color: colors.initiatives.rights,
      x: dimensions.width * 0.3,
      y: dimensions.height * 0.9,
      description: 'Strengthen tribal nation sovereignty and representation in federal government.'
    },
    {
      id: 'init-criminal',
      type: 'initiative',
      name: 'Criminal Justice Reform',
      category: 'rights',
      color: colors.initiatives.rights,
      x: dimensions.width * 0.45,
      y: dimensions.height * 0.95,
      description: 'Treat crime as a public health issue and reform the criminal justice system.'
    },
    {
      id: 'init-patents',
      type: 'initiative',
      name: 'Patent Reform',
      category: 'innovation',
      color: colors.initiatives.innovation,
      x: dimensions.width * 0.9,
      y: dimensions.height * 0.1,
      description: 'Reform patent system to prevent monopolization and encourage true innovation.'
    },
    {
      id: 'init-privacy',
      type: 'initiative',
      name: 'Digital Privacy Rights',
      category: 'innovation',
      color: colors.initiatives.innovation,
      x: dimensions.width * 0.85,
      y: dimensions.height * 0.05,
      description: 'Protect digital privacy and regulate big tech data collection practices.'
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
    { from: 'init-agriculture', to: 'thematic-environment' },
    { from: 'init-education', to: 'thematic-social' },
    { from: 'init-childcare', to: 'thematic-social' },
    { from: 'init-medicare', to: 'thematic-health' },
    { from: 'init-pharma', to: 'thematic-health' },
    { from: 'init-rail', to: 'thematic-infrastructure' },
    { from: 'init-broadband', to: 'thematic-infrastructure' },
    { from: 'init-tribal', to: 'thematic-rights' },
    { from: 'init-criminal', to: 'thematic-rights' },
    { from: 'init-patents', to: 'thematic-innovation' },
    { from: 'init-privacy', to: 'thematic-innovation' },

    // Cross-initiative connections
    { from: 'init-antitrust', to: 'init-pharma' },
    { from: 'init-housing', to: 'init-education' },
    { from: 'init-cabinet', to: 'init-democracy' },
    { from: 'init-waste', to: 'init-agriculture' },
    { from: 'init-rail', to: 'init-broadband' },
    { from: 'init-tribal', to: 'init-criminal' },
    { from: 'init-patents', to: 'init-privacy' },
    { from: 'init-medicare', to: 'init-childcare' }
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
    <div style={styles.myPlanPage}>
      <div style={styles.policyContent}>
        <div style={styles.pageContainer}>
          <h1 style={styles.pageTitle}>My Plan for Colorado's 2nd District</h1>
          <p style={styles.pageSubtitle}>
            A comprehensive policy agenda that puts people over profit and democracy over corporate power
          </p>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Free Palestine</h2>
            <p style={styles.contentText}>
              The United States must end its unconditional military aid to Israel and stop supporting policies that violate Palestinian human rights. I support:
            </p>
            <ul style={styles.contentList}>
              <li>Immediate cessation of all military aid to Israel until they comply with international law</li>
              <li>Recognition of Palestinian statehood and the right to self-determination</li>
              <li>Support for the Boycott, Divestment, and Sanctions (BDS) movement</li>
              <li>Investigations into war crimes and holding all perpetrators accountable</li>
              <li>Humanitarian aid to Gaza and the West Bank without conditions</li>
            </ul>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Corporate Accountability</h2>
            <p style={styles.contentText}>
              Corporations have rigged the system in their favor for too long. It's time to break up monopolies and ensure they serve the public interest:
            </p>
            <ul style={styles.contentList}>
              <li>Break up Big Tech monopolies including Amazon, Google, Facebook, and Apple</li>
              <li>Cap CEO salaries at 20 times the median worker salary</li>
              <li>Eliminate corporate subsidies and tax loopholes</li>
              <li>Strengthen antitrust enforcement and create new regulations for platform companies</li>
              <li>Ban corporate stock buybacks and require worker representation on corporate boards</li>
              <li>Implement a wealth tax on billionaires and close offshore tax havens</li>
            </ul>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Democratic Reform</h2>
            <p style={styles.contentText}>
              Our democracy has been captured by special interests. We need fundamental reforms to restore power to the people:
            </p>
            <ul style={styles.contentList}>
              <li>Implement ranked choice voting in all federal elections</li>
              <li>End gerrymandering through independent redistricting commissions</li>
              <li>Overturn Citizens United through constitutional amendment</li>
              <li>Establish public campaign financing and eliminate corporate PAC money</li>
              <li>Expand voting access with automatic registration and national holiday for elections</li>
              <li>Create binding national referendums for major policy decisions</li>
            </ul>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Medicare for All</h2>
            <p style={styles.contentText}>
              Healthcare is a human right, not a commodity. We need a single-payer system that covers everyone:
            </p>
            <ul style={styles.contentList}>
              <li>Eliminate private insurance companies and create a universal healthcare system</li>
              <li>Include dental, vision, mental health, and prescription drugs</li>
              <li>Lower costs by eliminating profit motive and administrative waste</li>
              <li>Negotiate prescription drug prices and allow Medicare to manufacture generic drugs</li>
              <li>Expand community health centers and invest in preventive care</li>
              <li>Support healthcare workers with debt forgiveness and better working conditions</li>
            </ul>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Climate Action</h2>
            <p style={styles.contentText}>
              The climate crisis requires immediate, transformational action to transition away from fossil fuels:
            </p>
            <ul style={styles.contentList}>
              <li>Transition to 100% renewable energy by 2030 through massive federal investment</li>
              <li>Create millions of good-paying green jobs in solar, wind, and battery technology</li>
              <li>End all fossil fuel subsidies and ban new drilling permits</li>
              <li>Invest in public transportation, electric vehicle infrastructure, and energy efficiency</li>
              <li>Support a just transition for fossil fuel workers with retraining and guaranteed employment</li>
              <li>Rejoin the Paris Climate Agreement and lead international climate action</li>
            </ul>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Workers' Rights</h2>
            <p style={styles.contentText}>
              Working people built this country and deserve dignity, fair wages, and power in the workplace:
            </p>
            <ul style={styles.contentList}>
              <li>Raise the federal minimum wage to $20/hour and index it to inflation</li>
              <li>Strengthen unions by passing the PRO Act and eliminating right-to-work laws</li>
              <li>Guarantee paid family and medical leave for all workers</li>
              <li>Create a federal jobs guarantee for infrastructure and green energy projects</li>
              <li>End employment at-will and require just cause for termination</li>
              <li>Reduce the standard work week to 32 hours with no loss in pay</li>
            </ul>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Housing Justice</h2>
            <p style={styles.contentText}>
              Housing is a human right. We need bold action to end the housing crisis and ensure everyone has a safe, affordable home:
            </p>
            <ul style={styles.contentList}>
              <li>Build 12 million units of public housing over 10 years</li>
              <li>Implement national rent control to cap increases at 3% annually</li>
              <li>Tax vacant properties and foreign speculation to discourage speculation</li>
              <li>Provide down payment assistance and low-interest loans for first-time homebuyers</li>
              <li>End homelessness through Housing First programs and supportive services</li>
              <li>Protect tenants from eviction and guarantee right to counsel in housing court</li>
            </ul>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Education</h2>
            <p style={styles.contentText}>
              Education should be accessible to all, from pre-K through college, without putting families into debt:
            </p>
            <ul style={styles.contentList}>
              <li>Make public college and trade schools tuition-free for all students</li>
              <li>Cancel all existing student debt through federal action</li>
              <li>Invest in universal pre-K and after-school programs</li>
              <li>Increase teacher pay and reduce class sizes in public schools</li>
              <li>Expand funding for school meal programs and mental health support</li>
              <li>End the school-to-prison pipeline and eliminate zero-tolerance policies</li>
            </ul>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Criminal Justice Reform</h2>
            <p style={styles.contentText}>
              Our criminal justice system perpetuates inequality and fails to create safety. We need comprehensive reform:
            </p>
            <ul style={styles.contentList}>
              <li>End the war on drugs and decriminalize all drug use</li>
              <li>Close private prisons and reduce the prison population by 50%</li>
              <li>Eliminate cash bail and end mandatory minimum sentences</li>
              <li>Legalize marijuana federally and expunge all related convictions</li>
              <li>Invest in community-based violence prevention and restorative justice</li>
              <li>Demilitarize police and redirect funding to education, healthcare, and social services</li>
            </ul>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Immigration Justice</h2>
            <p style={styles.contentText}>
              America should welcome immigrants and refugees with dignity while addressing the root causes of migration:
            </p>
            <ul style={styles.contentList}>
              <li>Provide a path to citizenship for all undocumented immigrants</li>
              <li>End family separation and close detention centers</li>
              <li>Increase refugee admissions and eliminate country caps</li>
              <li>Stop funding military interventions that create refugee crises</li>
              <li>Protect DACA recipients and their families</li>
              <li>End workplace raids and protect immigrant workers' rights</li>
            </ul>
          </section>

          <section style={styles.contentSection}>
            <h2 style={styles.contentSubtitle}>Anti-War and Foreign Policy</h2>
            <p style={styles.contentText}>
              America must end its endless wars and focus on diplomacy, human rights, and international cooperation:
            </p>
            <ul style={styles.contentList}>
              <li>Cut the military budget by 50% and redirect funds to domestic priorities</li>
              <li>Close overseas military bases and end regime change operations</li>
              <li>Withdraw from NATO and other military alliances that fuel conflict</li>
              <li>End arms sales to human rights violators</li>
              <li>Support international law and the International Criminal Court</li>
              <li>Invest in diplomacy and conflict prevention rather than military solutions</li>
            </ul>
          </section>

          <button
            onClick={() => setShowVisualization(!showVisualization)}
            style={styles.visualizationButton}
          >
            {showVisualization ? 'Hide' : 'Show'} Policy Network Visualization
          </button>
        </div>
      </div>

      {showVisualization && (
        <div>
          <div style={styles.pageHeader}>
            <h2 style={styles.pageTitle}>Policy Network Visualization</h2>
            <p style={styles.pageSubtitle}>
              An interconnected approach to transforming Colorado's 2nd District and America
            </p>
          </div>

          <div style={styles.networkContainer}>
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

      {/* Policy Categories Summary */}
      <div style={styles.policySummary}>
        <h2 style={styles.summaryTitle}>Policy Framework Overview</h2>
        <div style={styles.categoryGrid}>
          {Object.entries(colors.thematic).map(([category, color]) => {
            const categoryNodes = policyNodes.filter(node => node.category === category);
            const thematicNode = categoryNodes.find(node => node.type === 'thematic');
            const initiatives = categoryNodes.filter(node => node.type === 'initiative');

            if (!thematicNode) return null;

            return (
              <div key={category} style={styles.categoryCard}>
                <div style={{...styles.categoryHeader, borderColor: color}}>
                  <div style={{...styles.categoryDot, backgroundColor: color}}></div>
                  <h3 style={styles.categoryTitle}>{thematicNode.name}</h3>
                </div>
                <p style={styles.categoryDescription}>{thematicNode.description}</p>
                <ul style={styles.initiativeList}>
                  {initiatives.map(initiative => (
                    <li key={initiative.id} style={styles.initiativeItem}>
                      {initiative.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Join the Movement</h2>
        <p style={styles.ctaText}>
          These interconnected policies work together to create systemic change for Colorado's 2nd District and America.
        </p>
        <Link to="/join" style={styles.ctaButton}>
          Get Involved
        </Link>
      </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  myPlanPage: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    padding: '2rem 1rem'
  },
  pageHeader: {
    textAlign: 'center',
    marginBottom: '2rem',
    maxWidth: '800px',
    margin: '0 auto 2rem'
  },
  pageTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif'
  },
  pageSubtitle: {
    fontSize: '1.3rem',
    color: '#4a5568',
    lineHeight: '1.6'
  },
  networkContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    margin: '0 auto 3rem',
    position: 'relative',
    overflow: 'hidden'
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
  policySummary: {
    maxWidth: '1200px',
    margin: '0 auto 3rem'
  },
  summaryTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2d5016',
    textAlign: 'center',
    marginBottom: '2rem',
    fontFamily: 'Arial, sans-serif'
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem'
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    border: '1px solid #e2e8f0'
  },
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid'
  },
  categoryDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    marginRight: '0.75rem'
  },
  categoryTitle: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#2d3748'
  },
  categoryDescription: {
    margin: '0 0 1rem 0',
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#4a5568'
  },
  initiativeList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  initiativeItem: {
    padding: '0.25rem 0',
    fontSize: '13px',
    color: '#4a5568',
    borderLeft: '3px solid #e2e8f0',
    paddingLeft: '0.75rem',
    marginBottom: '0.25rem'
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
    fontSize: '1.1rem',
    lineHeight: '1.6',
    marginBottom: '2rem'
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
  visualizationButton: {
    padding: '1rem 2rem',
    backgroundColor: '#2d5016',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    margin: '2rem auto',
    display: 'block'
  }
};

export default MyPlanPage;