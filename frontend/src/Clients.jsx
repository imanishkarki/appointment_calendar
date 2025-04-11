import React from 'react';
import './Clients.css';

const Clients = () => {
  // List of client logos (relative paths to the public directory)
  const clientLogos = [
    'images/logo1.jpg',
    'images/logo2.png',
    'images/logo3.png',
    'images/logo1.jpg', // Repeating the logos to have 9 logos
    'images/logo2.png',
    'images/logo3.png',
    'images/logo1.jpg',
    'images/logo2.png',
    'images/logo3.png',
  ];

  return (
    <div className="clients">
      <h2>Our Clients</h2>
      <div className="logo-slider">
        <div className="slider-track">
          {clientLogos.map((logo, index) => (
            <div key={index} className="slide">
              <img src={logo} alt={`Client ${index + 1}`} />
            </div>
          ))}
          {/* Duplicate the logos for continuous sliding effect */}
          {clientLogos.map((logo, index) => (
            <div key={index + clientLogos.length} className="slide">
              <img src={logo} alt={`Client ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;