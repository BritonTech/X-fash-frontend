// src/components/EmptyState.js
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import './EmptyState.css'

const EmptyState = ({ message, animationUrl }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchAnimation = async () => {
      const res = await fetch(animationUrl);
      const data = await res.json();
      setAnimationData(data);
    };
    fetchAnimation();
  }, [animationUrl]);

  return (
    <div className="empty-state">
      <div className="empty">
        {animationData && <Lottie animationData={animationData} loop={true} />}
      </div>
      <p className="empty-state-text">{message}</p>
    </div>
  );
};

export default EmptyState;
