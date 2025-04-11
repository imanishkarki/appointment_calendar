import React from 'react';
import './Review.css';

const Review = () => {
  return (
    <div className="review-section">
      <h2 className="review-title">Reviews</h2>
      <div className="review-photos">
        <div className="review-row">
          <div className="review-photo"><img src="images\testimonial.png" alt="Review 1" /></div>
          <div className="review-photo"><img src="images\testimonial.png" alt="Review 2" /></div>
          <div className="review-photo"><img src="images\testimonial.png" alt="Review 3" /></div>
        </div>
        <div className="review-row">
          <div className="review-photo"><img src="images\testimonial.png" alt="Review 4" /></div>
          <div className="review-photo"><img src="images\testimonial.png" alt="Review 5" /></div>
        </div>
      </div>
    </div>
  );
};

export default Review;