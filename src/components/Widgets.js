import React from "react";

// Styles
import "../styles/Widgets.css";

const Widgets = ({ isDarkMode, children }) => {
  // Check the number of children
  const childrenCount = React.Children.count(children);

  return (
    <div className="widgets-section">
      <h2>Widgets</h2>
      <div
        className="widgets-content"
        style={{
          justifyContent: childrenCount > 1 ? "space-between" : "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Widgets;
