import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  // List of YouTube video IDs
  const videoIds = [
    'Zy6cxNDygYg',
    'trRBfaUTYmE',
    'VIDEO_ID_3',
    'VIDEO_ID_4',
    'VIDEO_ID_5',
    'VIDEO_ID_6',
    'VIDEO_ID_7',
    'VIDEO_ID_8',
  ];

  return (
    <div className="testimonials">
      <h2>Testimonials</h2>
      <div className="video-grid">
        {videoIds.map((videoId, index) => (
          <div key={index} className="video-item">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`YouTube video player ${index}`}
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;