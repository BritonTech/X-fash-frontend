import React, { useEffect } from 'react';
import './SplashScreen.css';
import logo from '../../Assets/banner_kids.png'

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <div className="animated-gradient-border logo-box ">
        <img src={logo} alt="Logo" className="logo fade-slide" />
        <h1 className="brand-name fade-slide delay-1">MyFashion</h1>
        <p className="tagline fade-slide delay-2">Elevating your style, one outfit at a time.</p>
      </div>
    </div>
  );
};

export default SplashScreen;
