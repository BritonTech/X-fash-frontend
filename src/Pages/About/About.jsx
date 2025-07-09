import React, { useEffect } from 'react';
import './About.css'
import logo from '../../Assets/banner_kids.png'
import Navbar from '../../Components/Navbar/Navbar';
const SplashScreen = ({ onFinish }) => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     onFinish();
  //   }, 4000);
  //   return () => clearTimeout(timer);
  // }, [onFinish]);

  return (
    <div>
      <Navbar />
      <div className="about-splash-screen">
        <div className="about-logo-box">
          {/* <img src={logo} alt="Logo" className="about-logo fade-slide" /> */}
          <h1 className="brand-name fade-slide delay-1">About</h1>
          <p className="about-tagline fade-slide delay-1">X-Fash is your plug for 🔥 trendy outfits, bold streetwear, and everyday drip all at affordable prices.</p>
          <p className="about-tagline fade-slide delay-2">Whether it’s classy, casual, official, or edgy, we’ve got fits that speak your vibe.</p>
          <p className="about-tagline fade-slide delay-2">We style men, women & youth with confidence, culture, and creativity.</p>


          <ul>
            <li className="about-tagline fade-slide delay-2">✨ New arrivals weekly</li>
            <li className="about-tagline fade-slide delay-2">🚚 Fast delivery</li>
            <li className="about-tagline fade-slide delay-2">💳 Secure checkout</li>
          </ul>
          <p className="about-tagline fade-slide delay-2">✨👗Dress bold. 💃 Walk proud. 🚶‍♂️ Slay every day. 🔥👑</p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
