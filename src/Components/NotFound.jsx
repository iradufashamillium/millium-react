import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-glitch" data-text="404">404</div>
        <h2>Oops! Page Not Found</h2>
        <p>The link you followed may be broken, or the page may have been removed.</p>
        <div className="not-found-actions">
          <button onClick={() => navigate('/')} className="back-home-btn">
            Return to Dashboard
          </button>
          <button onClick={() => navigate(-1)} className="go-back-btn">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
