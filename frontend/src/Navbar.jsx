import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <a href="#">AgencyLogo</a>
      </div>
      <ul className="navbar__links">
        <li className="navbar__item"><a href="#">Home</a></li>
        <li className="navbar__item"><a href="#">About</a></li>
        <li className="navbar__item"><a href="#">Services</a></li>
        <li className="navbar__item"><a href="#">Portfolio</a></li>
        <li className="navbar__item"><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;