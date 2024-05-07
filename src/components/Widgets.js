// React
import React from "react";

// Styles
import "../styles/Widgets.css";

const Widgets = ({ isDarkMode, children }) => {
  return (
    <div className="section">
      <h2>Widgets</h2>
      {children}
    </div>
  );
};

export default Widgets;
