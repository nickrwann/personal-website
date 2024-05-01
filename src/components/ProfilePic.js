// React
import React from 'react';

// Styles and assets
import '../styles/ProfilePic.css';
import profilePic from '../assets/profile.jpg';

const ProfilePic = () => {
    return (
        <div className="section">
            <div className="profile-container">
                <img src={profilePic} alt="Profile" className="profile-pic" />
            </div>
        </div>
    );
}

export default ProfilePic;
