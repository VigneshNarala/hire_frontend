import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaFileAlt,
  FaBook,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import "../styles/sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // redirect to home/login
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Resume", path: "/resume", icon: <FaFileAlt /> },
    { name: "Learning", path: "/learning", icon: <FaBook /> },
    { name: "Ranking", path: "/ranking", icon: <FaChartBar /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  return (
    <div className="sidebar-glass">
      {/* TOP PART */}
      <div className="sidebar-header">
        <h2 className="logo">Smart Hire</h2>
        <p className="tagline">Placement Platform</p>
      </div>

      <div className="menu">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`menu-item ${
              location.pathname === item.path ? "active" : ""
            }`}
            onClick={() => navigate(item.path)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {/* LOGOUT */}
      <div className="logout-btn glassy-btn" onClick={handleLogout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
