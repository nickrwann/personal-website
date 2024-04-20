import React from 'react';
import './ProfilePic.css';
import profilePic from '../../assets/profile.jpg';

const ProfilePic = () => {
    return (
        <div className="profile-container">
            <img src={profilePic} alt="Profile" className="profile-pic" />
        </div>
    );
}

export default ProfilePic;
