// React and Hooks
import React, { useState } from "react";
import PropTypes from "prop-types";

// Material UI components
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Data and styles
import jobData from "../data/jobData";
import "../styles/Experience.css";

const Experience = ({ isDarkMode }) => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleImageError = (e) => {
    e.target.src = "default-logo.png"; // Fallback image path
  };

  return (
    <div
      className={`experience-container ${isDarkMode ? "dark-mode" : ""}`}
      data-testid="experience"
    >
      <h2>Experience</h2>
      <div className="experience-accordion-list">
        {Object.keys(jobData).map((key) => (
          <Accordion
            key={key}
            expanded={expanded === key}
            onChange={handleChange(key)}
            className={`experience-accordion-item ${
              expanded === key ? "expanded" : ""
            }`}
          >
            <AccordionSummary
              expandIcon={
                <ArrowDropDownIcon
                  style={{ color: isDarkMode ? "white" : "inherit" }}
                />
              }
              aria-controls={`${key}-content`}
              id={`${key}-header`}
            >
              <div className="experience-accordion-summary">
                <img
                  src={jobData[key].logo}
                  alt={`${jobData[key].company} Logo`}
                  className="experience-company-logo"
                  onError={handleImageError}
                />
                <div className="experience-summary-text">
                  <Typography variant="h6" component="span" className="title">
                    {jobData[key].title}
                  </Typography>
                  <Typography variant="body2" component="span" className="date">
                    {jobData[key].dateRange}
                  </Typography>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" className="description">
                {jobData[key].description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

Experience.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default Experience;
