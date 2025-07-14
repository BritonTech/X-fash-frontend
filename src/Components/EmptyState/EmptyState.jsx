// src/components/EmptyState.js
import React from 'react';
import './EmptyState.css';

const EmptyState = ({ message }) => {
  return (
    <div className="empty-state">
      <div className="empty">
        <video
          src={require('../assets/empty-state.mp4')}
          autoPlay
          loop
          muted
          playsInline
          className="empty-animation"
        />
      </div>
      <p className="empty-state-text">{message}</p>
    </div>
  );
};

export default EmptyState;
