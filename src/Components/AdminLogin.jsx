import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.user.role === 'admin') {
          onLogin(data.user);
          navigate('/admin');
        } else {
          setError('Access denied. Admin credentials required.');
        }
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login as Admin</button>
      </form>
    </div>
  );
};

export default AdminLogin;
