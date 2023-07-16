import React from 'react';
import '../styles/about.css';

const About = () => {
  return (
    <>
   
    <div className="about-us-container">
      <h2>About Us</h2>
      <p>
        Welcome to our Room of Requirements application! We aim to provide a flexible and convenient
        solution for individuals and teams in need of a workspace. Whether you're a freelancer,
        a remote worker, or a small company, our platform connects you with available workspaces
        in various locations.
      </p>
      <p>
        Our mission is to create a seamless experience for finding and booking workspaces.
        With our user-friendly interface, you can easily explore the available options, view
        amenities, check availability, and make reservations in just a few clicks.
      </p>
      <p>
        We understand the importance of a productive and comfortable workspace, and that's why
        we carefully curate our listings to ensure they meet high standards. From modern offices
        to cozy coworking spaces, we offer a diverse range of options to suit your preferences.
      </p>
      <p>
        Feel free to explore our application, browse through the listings, and find the perfect
        workspace for your needs. If you have any questions or feedback, please don't hesitate to
        contact us. We're here to help you make the most out of your work environment.
      </p>
    </div>
    <footer className="footer">
      <p>&copy; 2023 Room of Requirements Application. All rights reserved.</p>
    </footer>
    </>
  );
};

export default About;