import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './Experience.css';

import dellLogo from '../../assets/logos/dell-logo.jpg';
import tamuLogo from '../../assets/logos/tamu-logo-2.jpg';
import thoughtTraceLogo from '../../assets/logos/thoughttrace-logo.png';

    const Experience = ({ isDarkMode }) => {
    const [expanded, setExpanded] = useState(null);

    const jobData = {
        job1: {
          title: 'Software Engineer',
          description: 'Led a team of consultants to provide technical solutions, improving client systems and processes. Key projects involved systems integration and automation.',
          dateRange: 'January 2021 - Present',
          logo: dellLogo
        },
        job2: {
          title: 'Software Engineer Intern',
          description: 'Developed and implemented technology strategies that significantly increased operational efficiency and profitability.',
          dateRange: 'June 2020 - August 2020',
          logo: dellLogo
        },
        job3: {
            title: 'Electrical Engineering Peer Teacher',
            description: 'Assisted in the creation of workflow automation scripts and contributed to the development of a new internal knowledge base.',
            dateRange: 'June 2019 - August 2019',
            logo: tamuLogo
        },
        job4: {
            title: 'Datascience Intern',
            description: 'Assisted in the creation of workflow automation scripts and contributed to the development of a new internal knowledge base.',
            dateRange: 'June 2018 - August 2018',
            logo: thoughtTraceLogo
        }
        // Add more job entries as needed
      };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div className={isDarkMode ? 'Experience dark' : 'Experience'}>
    <   h1>Work Experience</h1>
    {   Object.keys(jobData).map((key) => (
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
                <img src={jobData[key].logo} alt="Company Logo" className="Experience-icon" /> {/* Dynamic company logo */}
                <div className="Experience-summary-text">
                <Typography variant="h6" component="span">{jobData[key].title}</Typography>
                <Typography variant="body2" component="span">{jobData[key].dateRange}</Typography>
                </div>
            </div>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>{jobData[key].description}</Typography>
            </AccordionDetails>
        </Accordion>
        ))}

    </div>
  );
};

export default Experience;



