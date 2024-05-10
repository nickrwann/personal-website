import React from "react";

// Import Styles
import "../styles/Widgets.css";

const Widgets = ({ isDarkMode, children }) => {
  // Count the number of children components
  const childrenCount = React.Children.count(children);

  // Determine layout style based on the number of child components
  const justifyContentStyle = childrenCount > 1 ? "space-between" : "center";

  return (
    <div className="widgets-section">
      <h2>Widgets</h2>
      <div
        className="widgets-content"
        style={{
          justifyContent: justifyContentStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Widgets;
