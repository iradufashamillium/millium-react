import React from 'react';
import './FeatureCards.css';

const FeatureCards = ({ searchTerm = '' }) => {
  const features = [
    {
      title: 'Number of Users',
      description: 'Join our growing community of active users worldwide.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      title: 'Number of Images',
      description: 'Manage and organize your extensive collection of high-quality images.',
      icon: (
        <svg xmlns="https://scontent.fnbo18-1.fna.fbcdn.net/v/t39.30808-6/558918207_122198232710321146_2277505476922697909_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=u0X9WzcL__YQ7kNvwEIvCYo&_nc_oc=AdkxE7kvN3KFAff3JEtUTgn05Fw3KjFmyNyyPYGw4D4_MzhXIjh3ekfhW0H4hFMB2Lg&_nc_zt=23&_nc_ht=scontent.fnbo18-1.fna&_nc_gid=nDi7AeYQ_n2D57DOp1xY1g&oh=00_Afve5j7Ttrv7-_d4B1GGTgWTfLp0qQPTEyEh52JkmW_FMQ&oe=698D5204" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      )
    },
    {
      title: 'Information',
      description: 'Access detailed documentation and resources to help you build your project.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      )
    }
  ];

  const filteredFeatures = features.filter(feature => 
    feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

 return (
    <section className="feature-cards-section">
      <div className="container">
        {filteredFeatures.length > 0 ? (
          <div className="cards-grid">
            {filteredFeatures.map((feature, index) => (
              <div key={index} className="card">
                <div className="card-icon">{feature.icon}</div>
                <h3 className="card-title">{feature.title}</h3>
                <p className="card-description">{feature.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results" style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '15px', opacity: 0.5 }}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <h3>No results found</h3>
            <p>We couldn't find anything matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureCards; 
