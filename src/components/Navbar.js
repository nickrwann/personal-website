// React
import React from 'react';

// Styles and assets
import '../styles/Navbar.css';
import sunIcon from '../assets/icons/sun.svg';
import moonIcon from '../assets/icons/moon.svg';

const Navbar = ({ onToggleTheme, isDarkMode }) => {
    return (
        <nav className="navbar" data-testid="navbar">
            <span className="logo">NW</span>
            <button 
                onClick={onToggleTheme} 
                className="theme-toggle-button" 
                style={{ backgroundImage: `url(${isDarkMode ? moonIcon : sunIcon})` }}
            >
            </button>
        </nav>
    );
};

export default Navbar;
