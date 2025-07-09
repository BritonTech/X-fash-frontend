import React, { useEffect } from 'react';
import './Privacy.css';
import logo from '../../Assets/banner_kids.png'
import Navbar from '../../Components/Navbar/Navbar';

const Privacy = ({ onFinish }) => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     onFinish();
  //   }, 4000);
  //   return () => clearTimeout(timer);
  // }, [onFinish]);

  return (
    <div className="privacy-screen">
      <Navbar />
      <div className="privacy-logo-box">
        <h1 className="privacy-brand-name fade-slide delay-1">Privacy Policy</h1>
        <p className="privacy-tagline fade-slide delay-2">We collect basic details like your name, email, address, and payment info to process orders and provide better service.</p>
        <p className="privacy-tagline fade-slide delay-2">At X-Fash, your privacy matters to us.</p>

        <h4 className="privacy-brand-list fade-slide delay-1">What We Collect:</h4>
        <ul>
          <li className="privacy-tagline fade-slide delay-2" >Contact & delivery info</li>
          <li className="privacy-tagline fade-slide delay-2">Payment details (securely handled)</li>
          <li className="privacy-tagline fade-slide delay-2">Browsing data (via cookies)</li>
        </ul>
        <h4 className="privacy-brand-list fade-slide delay-1">How We Use It:</h4>
        <ul>
          <li className="privacy-tagline fade-slide delay-2">To process orders and updates</li>
          <li className="privacy-tagline fade-slide delay-2">To improve your shopping experience</li>
          <li className="privacy-tagline fade-slide delay-2">To send promotions (only if you opt-in)</li>
        </ul>
        <h4 className="privacy-brand-list fade-slide delay-1">What We Don’t Do:</h4>
        <ul>
          <li className="privacy-tagline fade-slide delay-2">❌ We don’t sell your data</li>
          <li className="privacy-tagline fade-slide delay-2">❌ We don’t spam</li>
        </ul>
        <h4 className="privacy-brand-list fade-slide delay-1">Your Rights:</h4>
        <ul>
          <li className="privacy-tagline fade-slide delay-2">You can access, edit, or delete your data anytime. Just contact us at support@xfash.com.</li>
          <li className="privacy-tagline fade-slide delay-2">We use secure systems to protect your data. By using X-Fash, you agree to this policy.</li>
        </ul>
      </div>
    </div>
  );
};

export default Privacy;
