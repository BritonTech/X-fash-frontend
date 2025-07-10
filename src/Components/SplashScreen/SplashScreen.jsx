import React, { useEffect } from 'react';
import './SplashScreen.css';
import logo from '../../Assets/banner_kids.png'
import welcomeVideo from '../../Assets/welcome.mp4';


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
        <video
          src={welcomeVideo}
          className="welcome-logo fade-slide"
          autoPlay
          muted
          loop
          playsInline
        />
{/* 
        <h1 className="brand-name fade-slide delay-1 gradient-text">MyFashion</h1>
        <p className="tagline fade-slide delay-2 gradient-text">
          Elevating your style, one outfit at a time.
        </p> */}

      </div>
    </div>
  );
};

export default SplashScreen;
