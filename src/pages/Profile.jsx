import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Heatmap from "../components/Heatmap";
import { studentApi } from "../api/studentApi";
import "../styles/profile.css";
import "../styles/footer.css";

import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEdit,
  FaSave,
  FaCode,
  FaUserGraduate,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendar,
} from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks, SiCodechef, SiHackerrank } from "react-icons/si";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    rollNumber: "",
    branch: "",
    year: "",
    github: "",
    linkedin: "",
    leetcode: "",
    gfg: "",
    codechef: "",
    hackerrank: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await studentApi.getProfile();
      if (res.success) {
        const data = res.data;
        setProfileData({
          name: data.user.name,
          email: data.user.email,
          phone: data.phone || "",
          location: data.location || "",
          rollNumber: data.user.studentId || "",
          branch: data.branch || "",
          year: data.year || "",
          github: data.githubUsername ? `https://github.com/${data.githubUsername}` : "",
          linkedin: data.linkedinUrl || "",
          leetcode: data.leetcodeUsername || "",
          gfg: data.gfgUsername || "",
          codechef: data.codechefUsername || "",
          hackerrank: data.hackerRankUsername || "",
        });
      }
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch profile", err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const res = await studentApi.updateProfile(profileData);
      if (res.success) {
        localStorage.setItem("userName", profileData.name);
        setIsEditing(false);
        alert("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Error updating profile. Please try again.");
    }
  };

  const githubUsername = profileData.github?.split("/").pop() || "";

  return (
    <>
      <Sidebar />
      <div className="main">
        <Topbar />

        <div className="content">
          <div className="profile-header">
            <h1 className="page-title">My Profile</h1>
            <button
              className="edit-btn glassy-btn"
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            >
              {isEditing ? (
                <>
                  <FaSave /> Save Changes
                </>
              ) : (
                <>
                  <FaEdit /> Edit Profile
                </>
              )}
            </button>
          </div>

          <p className="page-subtitle">
            Manage your personal details and coding profiles for skill verification
          </p>

          {/* Profile Grid */}
          <div className="profile-grid">

            {/* Personal Information */}
            <div className="profile-card">
              <h3>Personal Information</h3>

              <div className="profile-field">
                <label>
                  <FaUserGraduate /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="profile-input"
                />
              </div>

              <div className="profile-field">
                <label>
                  <FaEnvelope /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="profile-input"
                />
              </div>

              <div className="profile-field">
                <label>
                  <FaPhone /> Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="profile-input"
                />
              </div>

              <div className="profile-field">
                <label>
                  <FaMapMarkerAlt /> Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="profile-input"
                />
              </div>
            </div>

            {/* Academic Details */}
            <div className="profile-card">
              <h3>Academic Details</h3>

              <div className="profile-field">
                <label>
                  <FaUserGraduate /> Roll Number
                </label>
                <input
                  type="text"
                  name="rollNumber"
                  value={profileData.rollNumber}
                  onChange={handleChange}
                  disabled
                  className="profile-input"
                />
              </div>

              <div className="profile-field">
                <label>
                  <FaCode /> Branch
                </label>
                <input
                  type="text"
                  name="branch"
                  value={profileData.branch}
                  onChange={handleChange}
                  disabled
                  className="profile-input"
                />
              </div>

              <div className="profile-field">
                <label>
                  <FaCalendar /> Year
                </label>
                <input
                  type="text"
                  name="year"
                  value={profileData.year}
                  onChange={handleChange}
                  disabled
                  className="profile-input"
                />
              </div>
            </div>

          </div>

          {/* Coding Profiles */}
          <div className="coding-profiles-section">
            <h2>Coding Profiles</h2>
            <p className="section-subtitle">
              Link your coding profiles for real-time skill verification
            </p>

            <div className="coding-grid">

              {/* GitHub */}
              <div className="coding-card">
                <div className="coding-header">
                  <FaGithub className="coding-icon github" />
                  <h4>GitHub</h4>
                </div>
                <input
                  type="url"
                  name="github"
                  value={profileData.github}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="https://github.com/username"
                  className="profile-input"
                />
                {profileData.github && (
                  <a
                    href={profileData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-profile-btn"
                  >
                    View Profile →
                  </a>
                )}
              </div>

              {/* LinkedIn */}
              <div className="coding-card">
                <div className="coding-header">
                  <FaLinkedin className="coding-icon linkedin" />
                  <h4>LinkedIn</h4>
                </div>
                <input
                  type="url"
                  name="linkedin"
                  value={profileData.linkedin}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="https://linkedin.com/in/username"
                  className="profile-input"
                />
                {profileData.linkedin && (
                  <a
                    href={profileData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-profile-btn"
                  >
                    View Profile →
                  </a>
                )}
              </div>

              {/* LeetCode */}
              <div className="coding-card">
                <div className="coding-header">
                  <SiLeetcode className="coding-icon leetcode" />
                  <h4>LeetCode</h4>
                </div>
                <input
                  type="url"
                  name="leetcode"
                  value={profileData.leetcode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="https://leetcode.com/username"
                  className="profile-input"
                />
                {profileData.leetcode && (
                  <a
                    href={profileData.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-profile-btn"
                  >
                    View Profile →
                  </a>
                )}
              </div>

              {/* GeeksforGeeks */}
              <div className="coding-card">
                <div className="coding-header">
                  <SiGeeksforgeeks className="coding-icon gfg" />
                  <h4>GeeksforGeeks</h4>
                </div>
                <input
                  type="url"
                  name="gfg"
                  value={profileData.gfg}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="https://auth.geeksforgeeks.org/user/username"
                  className="profile-input"
                />
                {profileData.gfg && (
                  <a
                    href={profileData.gfg}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-profile-btn"
                  >
                    View Profile →
                  </a>
                )}
              </div>

              {/* CodeChef */}
              <div className="coding-card">
                <div className="coding-header">
                  <SiCodechef className="coding-icon codechef" />
                  <h4>CodeChef</h4>
                </div>
                <input
                  type="url"
                  name="codechef"
                  value={profileData.codechef}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="https://www.codechef.com/users/username"
                  className="profile-input"
                />
                {profileData.codechef && (
                  <a
                    href={profileData.codechef}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-profile-btn"
                  >
                    View Profile →
                  </a>
                )}
              </div>

              {/* HackerRank */}
              <div className="coding-card">
                <div className="coding-header">
                  <SiHackerrank className="coding-icon hackerrank" />
                  <h4>HackerRank</h4>
                </div>
                <input
                  type="url"
                  name="hackerrank"
                  value={profileData.hackerrank}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="https://www.hackerrank.com/username"
                  className="profile-input"
                />
                {profileData.hackerrank && (
                  <a
                    href={profileData.hackerrank}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-profile-btn"
                  >
                    View Profile →
                  </a>
                )}
              </div>

            </div>
          </div>

          {/* GitHub Activity Heatmap */}
          <div className="heatmap-wrapper">
            <Heatmap username={githubUsername} />
          </div>

          {/* ================= FOOTER ================= */}
          <div className="footer">
            <div className="footer-container">

              <div className="footer-col">
                <h2 className="footer-logo">Smart Hire</h2>
                <p>Your AI-Driven Placement Platform 🚀</p>
              </div>

              <div className="footer-col">
                <h4>Quick Links</h4>
                <p>Dashboard</p>
                <p>Resume Analyzer</p>
                <p>Profile</p>
                <p>Learning</p>
              </div>

              <div className="footer-col">
                <h4>Coding Profiles</h4>
                <p>LeetCode</p>
                <p>GeeksforGeeks</p>
                <p>CodeChef</p>
                <p>HackerRank</p>
              </div>

              <div className="footer-col">
                <h4>Connect</h4>
                <div className="footer-icons">
                  <FaGithub />
                  <FaLinkedin />
                  <FaTwitter />
                </div>
              </div>

            </div>

            <div className="footer-bottom">
              © 2026 Smart Hire | Built with ❤️ for Aditya University
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;
