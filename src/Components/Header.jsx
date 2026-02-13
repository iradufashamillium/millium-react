import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <>
      <div 
        className={`menu-overlay ${isMenuOpen ? 'show' : ''}`} 
        onClick={() => setIsMenuOpen(false)}
      ></div>

      <header className="sticky-header">
        <button className="menubar-icon" onClick={toggleMenu} aria-label="Toggle Menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <Link to="/" className="header-title-link" onClick={() => setIsMenuOpen(false)}>
          <h1 className="header-title">
            WELCOME TO MY REACT PROJECT
          </h1>
        </Link>
      </header>

      <nav className={`sidebar-nav ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button className="close-btn" onClick={() => setIsMenuOpen(false)}>&times;</button>
        </div>
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} onClick={() => setIsMenuOpen(false)} className="nav-link">
                {item.name}
              </Link>
            </li>
          ))}
          <li className="logout-li">
            <button onClick={handleLogout} className="nav-link logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
