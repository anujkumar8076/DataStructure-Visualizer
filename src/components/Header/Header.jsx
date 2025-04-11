import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
  };

  return (
    <header className={`header ${darkMode ? 'dark' : ''}`}>
      <div className="header-container">
        <h1 className="logo">DATA STRUCTURE VISUALIZATION</h1>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
        </button>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/quiz" onClick={() => setMenuOpen(false)}>Quiz</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {darkMode ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
