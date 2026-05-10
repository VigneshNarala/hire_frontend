import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import "../styles/topbar.css";

const Topbar = () => {
  const userName = localStorage.getItem("userName") || "Student";
  const userAvatar = localStorage.getItem("avatar");

  return (
    <div className="topbar">
      {/* Search Bar */}
      <input
        type="text"
        className="search"
        placeholder="Search courses, rankings, students..."
      />

      {/* Right Section */}
      <div className="topbar-right">
        {/* Notification */}
        <div className="notification-icon">
          <FaBell />
          <span className="notification-badge">3</span>
        </div>

        {/* User Info */}
        <div className="user-info">
          <div className="avatar">
            {userAvatar ? (
              <img src={userAvatar} alt="avatar" />
            ) : (
              userName.charAt(0).toUpperCase()
            )}
          </div>
          <div className="user-details">
            <p className="user-name">{userName}</p>
            <p className="user-role">Student</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
