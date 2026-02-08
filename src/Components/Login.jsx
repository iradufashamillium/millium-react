import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(); // Call the login function to enter home page
    } else {
      alert('Account created! You can now login.');
      setIsLogin(true);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="Enter your name" required />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="auth-button">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="auth-toggle">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={toggleForm} className="toggle-link">
            {isLogin ? 'Sign up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
