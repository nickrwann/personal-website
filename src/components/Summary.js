// React
import React from "react";

// Styles and icons
import "../styles/Summary.css";
import githubIcon from "../assets/icons/github.svg";
import instagramIcon from "../assets/icons/instagram.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";

const Summary = ({ isDarkMode }) => {
  const iconClassName = isDarkMode ? "summary-icon inverted" : "summary-icon";

  return (
    <div className="summary-section" data-testid="summary">
      <h2>Hi, I'm Nick!</h2>
      <p>
        I'm an Aggie Software Engineer at Dell Technologies, innovating system
        optimizations and tackling user-centric problems in cutting-edge tech
        projects. When I'm not doing this, you'll find me at the gym, gaming, or
        traveling to new places.
      </p>
      <div className="summary-icon-row">
        <a
          href="https://www.linkedin.com/in/nick-wanner"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={linkedinIcon}
            alt="Visit Nick's LinkedIn profile"
            className={iconClassName}
          />
        </a>
        <a
          href="https://github.com/nickrwann/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={githubIcon}
            alt="Visit Nick's GitHub"
            className={iconClassName}
          />
        </a>
        <a
          href="https://www.instagram.com/_nickwinner_"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={instagramIcon}
            alt="Visit Nick's Instagram"
            className={iconClassName}
          />
        </a>
      </div>
    </div>
  );
};

export default Summary;
