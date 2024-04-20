import React from 'react';
import './Summary.css';

// Import icon images
import githubIcon from '../../assets/icons/github.svg';
import instagramIcon from '../../assets/icons/instagram.svg';
import linkedinIcon from '../../assets/icons/linkedin-2.svg';

const Summary = ({ isDarkMode }) => {
    return (
        <div className="summary">
            <h1>Hi, I'm Nick</h1>
            <p>
                I'm an Aggie Software Engineer at Dell Technologies, innovating system optimizations and 
                tackling user-centric problems in cutting-edge tech projects.
                When I'm not doing this, you'll find me at the gym, gaming, or traveling to new places.
            </p>
            <div className="icon-row">
                <a href="https://github.com/nickrwann/" target="_blank" rel="noopener noreferrer">
                    <img src={githubIcon} alt="GitHub" className={isDarkMode ? 'inverted' : ''} />
                </a>
                <a href="https://www.instagram.com/_nickwinner_" target="_blank" rel="noopener noreferrer">
                    <img src={instagramIcon} alt="Instagram" className={isDarkMode ? 'inverted' : ''} />
                </a>
                <a href="https://www.linkedin.com/in/nick-wanner" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinIcon} alt="LinkedIn" className={isDarkMode ? 'inverted' : ''} />
                </a>
            </div>
        </div>
    );
};

export default Summary;
