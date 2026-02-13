import React, { useState } from 'react';
import Hero from './Hero';
import FeatureCards from './FeatureCards';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Hero />
      <div className="search-container" style={{ padding: '20px 0', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search features..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px 15px',
            width: '300px',
            borderRadius: '25px',
            border: '1px solid #ddd',
            fontSize: '16px',
            outline: 'none',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        />
      </div>
      <FeatureCards searchTerm={searchTerm} />
    </>
  );
};

export default Home;
