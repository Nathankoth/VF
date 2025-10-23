import React from 'react';

const MinimalApp = () => {
  console.log('MINIMAL-APP: Component rendering');
  
  // Global error handler
  window.onerror = function(msg, src, line, col, err) {
    console.error('MINIMAL-ONERROR', { msg, src, line, col, err });
  };

  return (
    <div style={{padding: 40, fontFamily: 'system-ui, Arial', background: '#fff', color: '#000'}}>
      <h1>Minimal App Test</h1>
      <p>If you see this, React is working correctly.</p>
      <p>This bypasses all complex components and providers.</p>
    </div>
  );
};

export default MinimalApp;
