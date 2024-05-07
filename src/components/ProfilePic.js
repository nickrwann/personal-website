// React
import React from "react";

// Styles and assets
import "../styles/ProfilePic.css";
import profilePic from "../assets/images/profile.jpg";

const ProfilePic = () => {
  return (
    <div data-testid="profile-pic">
      <div className="profile-container">
        <img src={profilePic} alt="Profile" className="profile-pic" />
      </div>
    </div>
  );
};

export default ProfilePic;
