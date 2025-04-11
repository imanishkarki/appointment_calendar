import React from 'react';
import Navbar from './Navbar'; // Assuming you have a Navbar component
import Calendar from './Calendar'; // Assuming you have a Calendar component
import Testimonials from './Testimonials';
import Clients from './Clients';
import Review from './Review'; // Assuming you have a Review component
import Showcase from './Showcase'; // Importing the new Showcase component
import Footer from './Footer'; // Importing the new Footer component
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Clients />
        <Testimonials />
        <Review />
        <Showcase /> {/* Adding the new Showcase component */}
        <Calendar />
      </div>
      <Footer /> {/* Adding the new Footer component */}
    </div>
  );
};

export default App;