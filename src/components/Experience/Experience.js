// React and Hooks
import React, { useState } from 'react';

// Material UI components
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Data and styles
import jobData from '../../data/jobData';
import './Experience.css';

const Experience = ({ isDarkMode }) => {
    const [expanded, setExpanded] = useState(null);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

    return (
      <div className={isDarkMode ? 'Experience dark' : 'Experience'}>
          <h2>Work Experience</h2>
          <div className="AccordionsContainer">
              {Object.keys(jobData).map((key) => (
                  <Accordion
                      key={key}
                      expanded={expanded === key}
                      onChange={handleChange(key)}
                      className={expanded === key ? 'MuiAccordion-root expanded' : 'MuiAccordion-root'}
                  >
                      <AccordionSummary
                          expandIcon={<ArrowDropDownIcon style={{ color: isDarkMode ? 'white' : 'inherit' }} />}
                          aria-controls={`${key}-content`}
                          id={`${key}-header`}
                      >
                          <div className="Experience-summary">
                              <img src={jobData[key].logo} alt="Company Logo" className="Experience-icon" />
                              <div className="Experience-summary-text">
                                  <Typography variant="h6" component="span" className="title">{jobData[key].title}</Typography>
                                  <Typography variant="body2" component="span" className="date">{jobData[key].dateRange}</Typography>
                              </div>
                          </div>
                      </AccordionSummary>
                      <AccordionDetails>
                          <Typography variant="p">{jobData[key].description}</Typography>
                      </AccordionDetails>
                  </Accordion>
              ))}
          </div>
      </div>
  );  
};

export default Experience;
