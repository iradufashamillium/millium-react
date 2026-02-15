import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.user);
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setMessage(data.message || 'Invalid email or password');
      }
    } catch (error) {
      setMessage('Network error: Unable to connect to server');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        {message && (
          <p className="error-message">{message}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="auth-toggle">
          Don't have an account? <Link to="/signup" className="toggle-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
