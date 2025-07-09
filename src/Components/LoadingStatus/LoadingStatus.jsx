import React from 'react';
import './LoadingStatus.css'; // CSS file we'll create below

const LoadingMessage = () => {
  return (
    <p className="loading-text">
      Loading products
      <span className="dot dot1">.</span>
      <span className="dot dot2">.</span>
      <span className="dot dot3">.</span>
    </p>
  );
};

export default LoadingMessage;
