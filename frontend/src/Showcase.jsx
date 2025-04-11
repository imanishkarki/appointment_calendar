import React, { useEffect, useState } from 'react';
import './Showcase.css';
import googleLogo from '../public/images/google.jpg'; // Adjust the path as necessary
import instagramLogo from '../public/images/instagram.png'; // Adjust the path as necessary
import youtubeLogo from '../public/images/youtube.webp'; // Adjust the path as necessary


const AnimatedNumber = ({ value, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    const incrementTime = (duration * 1000) / end;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
};

const Showcase = () => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prevKey) => prevKey + 1);
    }, 18000); // Trigger the effect every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="showcase-section">
      <div className="showcase-left">
        <div className="logo-row">
          <img src={youtubeLogo} alt="YouTube" className="logo youtube" />
          <img src={instagramLogo} alt="Instagram" className="logo instagram" />
        </div>
        <div className="showcase-text">
          <h1 key={`views-${key}`}>
            <AnimatedNumber value="100" duration="4" /> Million + Views
          </h1>
          <h2 key={`shorts-${key}`}>
            <AnimatedNumber value="1000" duration="4" /> + Shorts Edited
          </h2>
          <h2 key={`podcasts-${key}`}>
            <AnimatedNumber value="300" duration="4" /> + Podcast Ep.
          </h2>
          <h2 key={`thumbnails-${key}`}>
            <AnimatedNumber value="800" duration="4" /> + Thumbnails
          </h2>
        </div>
      </div>
      <div className="showcase-right">
        <img src={googleLogo} alt="Google" className="logo google" />
        <h2 className="clicks-text">1.5 Million + Clicks</h2>
      </div>
    </div>
  );
};

export default Showcase;