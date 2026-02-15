import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Welcome to Millium React</h1>
        <p>A modern web application built with React and Vite</p>
      </section>

      <section className="features-section">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Fast Performance</h3>
            <p>Built with Vite for lightning-fast development and optimized production builds</p>
          </div>
          <div className="feature-card">
            <h3>Modern Stack</h3>
            <p>Powered by React 18 with the latest features and best practices</p>
          </div>
          <div className="feature-card">
            <h3>Secure Backend</h3>
            <p>Node.js and MySQL backend with authentication and data protection</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
