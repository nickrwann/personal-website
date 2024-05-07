// React
import React from 'react';

// Styles and icons
import '../styles/Widgets.css';
import NowPlaying from './NowPlaying';

const Widgets = ({ isDarkMode }) => {
    return (
        <div className="section">
            <h2>Widgets</h2>
            <NowPlaying isDarkMode={isDarkMode} />
        </div>
    );
};

export default Widgets;
