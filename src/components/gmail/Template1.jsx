import React from 'react';
import './WelcomeSection.css';

const WelcomeSection = ({ userName = "Anna" }) => {
  return (
    <div className="welcome-container">
      {/* Header Section */}
      <div className="header-section">
        <img 
          className="nolcha-logo" 
          src="https://api.builder.io/api/v1/image/assets/TEMP/4b3f60dae3c7e257b6dc565e18b4f8ca889eb437?width=349" 
          alt="Nolcha Logo" 
        />
        <div className="welcome-title">Welcome to the Nolcha 🌟</div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="greeting-text">
          Hi <span className="user-name">{userName}</span>,
        </div>
        
        <div className="welcome-description">
          Congratulations and welcome to the <span className="highlight">Nolcha Inner Circle!</span>
          <br />
          You're now part of a <span className="highlight">private</span> membership community crafted for 
          founders, investors, creators, and cultural leaders who are shaping tomorrow's world.
        </div>
      </div>

      {/* Info Card */}
      <div className="info-card">
        <div className="card-title">Here is what to expect:</div>
        
        <div className="benefits-list">
          <div className="benefit-item">
            ✓ <span className="benefit-highlight">Exclusive access</span> to events & experiences
          </div>
          <div className="benefit-item">
            ✓ A <span className="benefit-highlight">trusted network</span> of bold builders
          </div>
          <div className="benefit-item">
            ✓ Opportunities to <span className="benefit-highlight">amplify your impact</span>
          </div>
        </div>
        
        <div className="ready-text">Ready to dive in?</div>
        
        <button className="membership-button">
          Access your membership
        </button>
      </div>

      {/* Background Gallery */}
      <div className="background-gallery">
        <img src="/landing/background.png" className="mx-auto w-full" />
      </div>
    </div>
  );
};

export default WelcomeSection;
