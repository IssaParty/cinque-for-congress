import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyPlanPage = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 1600, height: 1000 });

  // Update dimensions on window resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: Math.max(1600, window.innerWidth - 50),
        height: Math.max(1000, window.innerHeight - 150)
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
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>My Plan for Colorado's 2nd District</h1>
        <p style={styles.pageSubtitle}>
          To liberate this country from corporate greed we must take a multi-industry approach not just targeting Big Tech in Colorado. My plan cracks down on monopolies, reins in executive power, and resets the playing field so individuals have the freedom to make decisions about their own lives. True freedom means a high quality of decision-making, and that leads to a high quality of life.
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
  );
};

const styles = {
  myPlanPage: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    padding: '1rem'
  },
  pageHeader: {
    textAlign: 'center',
    marginBottom: '1rem',
    maxWidth: '1000px',
    margin: '0 auto 1rem',
    padding: '1rem'
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif'
  },
  pageSubtitle: {
    fontSize: '1.2rem',
    color: '#4a5568',
    lineHeight: '1.6',
    maxWidth: '900px',
    margin: '0 auto'
  },
  networkContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '1rem',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    margin: '0 auto',
    width: '98%',
    height: 'calc(100vh - 200px)',
    minHeight: '800px',
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
  }
};

export default MyPlanPage;