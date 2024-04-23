// React
import React from 'react';

// Styles and icons
import './Widgets.css';
import NowPlaying from '../NowPlaying/NowPlaying';

const Widgets = ({ isDarkMode }) => {
    return (
        <div className="section">
            <h2>Widgets</h2>
            <NowPlaying isDarkMode={isDarkMode} />
        </div>
    );
};

export default Widgets;
