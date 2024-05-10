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
          </Widgets>
        </div>
        <div>
          {/* LightWidget WIDGET */}
          <script src="https://cdn.lightwidget.com/widgets/lightwidget.js"></script>
          <iframe
            src="//lightwidget.com/widgets/01e9a775569a566c90f475218a35d958.html"
            scrolling="no"
            allowTransparency="true"
            className="lightwidget-widget"
            style={{
              width: "100%",
              border: "0",
              overflow: "visible",
              minHeight: "1000px", // Example minimum height
            }}
          ></iframe>
        </div>
      </main>
    </div>
  );
};

export default App;
