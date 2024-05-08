import React, { useState, useEffect } from "react";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import ProfilePic from "./components/ProfilePic";
import Summary from "./components/Summary";
import Experience from "./components/Experience";
import Widgets from "./components/Widgets";
import NowPlaying from "./components/NowPlaying";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : "light-mode"}`}>
      <Navbar onToggleTheme={toggleTheme} isDarkMode={darkMode} />
      <main>
        <div className="section">
          <ProfilePic />
        </div>
        <div className="section">
          <Summary isDarkMode={darkMode} />
        </div>
        <div className="section">
          <Experience isDarkMode={darkMode} />
        </div>
        <div className="section">
          <Widgets isDarkMode={darkMode}>
            <NowPlaying isDarkMode={darkMode} />
            <NowPlaying isDarkMode={darkMode} />
          </Widgets>
        </div>
      </main>
    </div>
  );
};

export default App;
