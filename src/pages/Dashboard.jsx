import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Card from "../components/Card";
import Heatmap from "../components/Heatmap";
import { studentApi } from "../api/studentApi";
import { useAuth } from "../hooks/useAuth";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import "../styles/dashboard.css";
import "../styles/footer.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    placementReadiness: 0,
    verifiedSkillScore: 0,
    codingScore: 0,
    atsScore: 0,
    certificates: 0,
    internships: []
  });
  const [loading, setLoading] = useState(true);

  const githubUsername = user?.githubUsername || localStorage.getItem("github")?.split("/").pop() || "";

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await studentApi.getDashboardStats();
      if (res.success) {
        setStats(res.data);
      }
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch stats', err);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-20 text-center text-white/50">Loading Smart Hire Platform...</div>;
  }

  const currentScores = stats.currentScores || {};

  return (
    <>
      <Sidebar />

      <div className="main">
        <Topbar />

        <div className="content">
          <h1 className="page-title">Student Dashboard</h1>
          <p className="page-subtitle">
            Track your placement readiness and AI-optimized resume performance
          </p>

          {/* Key Metrics Cards */}
          <div className="cards">
            <Card title="ATS Score" value={`${Math.round(currentScores.atsScore || 0)}%`} color="#4ade80" />
            <Card title="Verified Skill Score" value={`${Math.round(currentScores.verifiedSkillScore || 0)}%`} color="#60a5fa" />
            <Card title="Coding Proficiency" value={`${Math.round(currentScores.codingScore || 0)}%`} color="#f472b6" />
            <Card title="Placement Readiness" value={`${Math.round(stats.currentScores?.placementReadiness || 0)}%`} color="#a78bfa" />
          </div>

          {/* Placement Readiness Box */}
          <div className="readiness-box">
            <h2>Placement Readiness Score</h2>
            <h1>{Math.round(stats.currentScores?.placementReadiness || 0)}%</h1>
            <p>Based on ATS + Verified Skills + Projects + Coding Proficiency</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${stats.currentScores?.placementReadiness || 0}%` }}></div>
            </div>
          </div>

          {/* GitHub Activity Heatmap */}
          <div className="heatmap-section">
            <Heatmap username={githubUsername} />
          </div>

          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <h3>Domain Rank</h3>
                <p className="stat-value">{stats.rank || "N/A"}</p>
                <p className="stat-label">Full Stack Development</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📜</div>
              <div className="stat-content">
                <h3>Certifications</h3>
                <p className="stat-value">{stats.certificates || 0}</p>
                <p className="stat-label">Verified Certificates</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">💼</div>
              <div className="stat-content">
                <h3>Job Matches</h3>
                <p className="stat-value">{stats.internships?.length || 0}</p>
                <p className="stat-label">Active Opportunities</p>
              </div>
            </div>
          </div>
        </div>
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
          <p>© 2026 Smart Hire | Built with ❤️ for Aditya University</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
