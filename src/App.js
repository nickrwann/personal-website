import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import ProfilePic from './components/ProfilePic/ProfilePic';
import Summary from './components/Summary/Summary';
import Experience from './components/Experience/Experience';

const App = () => {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <Navbar onToggleTheme={toggleTheme} isDarkMode={darkMode} />
            <main>
              <ProfilePic />
              <Summary isDarkMode={darkMode} />
              <Experience isDarkMode={darkMode} />
            </main>
        </div>
    );
};

export default App;
