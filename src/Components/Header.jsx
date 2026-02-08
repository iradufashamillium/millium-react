import React, { useState } from 'react';
import './Header.css';

const Header = ({ onLogout, setView, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Team', id: 'team' },
    { name: 'Contact', id: 'contact' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (view) => {
    setView(view);
    setIsMenuOpen(false); // Close menu after selection
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

        <h1 className="header-title" onClick={() => handleNavClick('home')}>
          WELCOME TO MY REACT PROJECT
        </h1>
      </header>

      <nav className={`sidebar-nav ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button className="close-btn" onClick={() => setIsMenuOpen(false)}>&times;</button>
        </div>
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.id} className={currentView === item.id ? 'active' : ''}>
              <button onClick={() => handleNavClick(item.id)} className="nav-link">
                {item.name}
              </button>
            </li>
          ))}
          <li className="logout-li">
            <button onClick={onLogout} className="nav-link logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
