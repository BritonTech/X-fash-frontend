// src/components/EmptyState.js
import React from 'react';
import './EmptyState.css';
import emptysearch from '../../Assets/empty.mp4'

const EmptyState = ({ message }) => {
  return (
    <div className="empty-state">
      <div className="empty">
        <video
          src={emptysearch}
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
