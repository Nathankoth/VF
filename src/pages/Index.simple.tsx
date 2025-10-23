import React from 'react';

const Index = () => {
  console.log('INDEX-COMPONENT: Rendering Index page');
  
  return (
    <div style={{padding: 40, fontFamily: 'system-ui, Arial', background: '#fff', color: '#000', minHeight: '100vh'}}>
      <h1>VistaForge - AI-Powered Real Estate Visualization</h1>
      <p>Welcome to VistaForge! This is a simplified version to test rendering.</p>
      <div style={{marginTop: 20}}>
        <h2>Features:</h2>
        <ul>
          <li>AI-powered 3D visualization</li>
          <li>Market analysis tools</li>
          <li>Investment calculators</li>
          <li>Property search</li>
        </ul>
      </div>
      <div style={{marginTop: 20}}>
        <button style={{padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Index;
