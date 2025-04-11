import React from 'react';
import './Footer.css';
import agencyLogo from '../public/images/logo1.jpg'; // Adjust the path as necessary



const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src={agencyLogo} alt="Agency Logo" className="agency-logo" />
        </div>
        <div className="footer-middle">
          <h3>Contact Us</h3>
          <p>
            <a href="https://wa.me/9779844554630" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/color/48/000000/whatsapp.png" alt="WhatsApp" className="contact-icon" /> +977 9844554630
            </a>
          </p>
          <p>
            <a href="mailto:suraj@gmail.com">
              <img src="https://img.icons8.com/color/48/000000/gmail.png" alt="Email" className="contact-icon" /> suraj@gmail.com
            </a>
          </p>
          <p>
            <a href="https://www.instagram.com/strides.media.co" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/color/48/000000/instagram-new.png" alt="Instagram" className="contact-icon" /> @strides.media.co
            </a>
          </p>
        </div>
        <div className="footer-right">
          <p>&copy; 2021 Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;