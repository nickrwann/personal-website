// React
import React from "react";

// Styles and assets
import "../styles/ProfilePic.css";
import profilePic from "../assets/images/profile.jpg";

const ProfilePic = () => (
  <div data-testid="profile-pic" className="profile-pic-container">
    <img src={profilePic} alt="Profile" className="profile-pic-image" />
  </div>
);

export default ProfilePic;
