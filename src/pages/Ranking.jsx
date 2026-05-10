import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/ranking.css";
import "../styles/footer.css";
import { FaGithub, FaLinkedin, FaTwitter, FaTrophy, FaMedal, FaAward } from "react-icons/fa";
import { studentApi } from "../api/studentApi";

const Ranking = () => {
  const [selectedDomain, setSelectedDomain] = useState("Full Stack Development");
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  const domains = [
    "Full Stack Development",
    "Machine Learning",
    "Data Science",
    "Mobile Development",
    "Cloud Computing",
    "AI & Deep Learning",
  ];

  useEffect(() => {
    fetchRankings();
  }, [selectedDomain]);

  const fetchRankings = async () => {
    try {
      setLoading(true);
      const res = await studentApi.getRankings(selectedDomain);
      if (res.success) {
        setRankings(res.data);
      }
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch rankings", err);
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <FaTrophy style={{ color: "#fbbf24" }} />;
    if (rank === 2) return <FaMedal style={{ color: "#94a3b8" }} />;
    if (rank === 3) return <FaAward style={{ color: "#fb923c" }} />;
    return null;
  };

  return (
    <>
      <Sidebar />
      <div className="main">
        <Topbar />

        <div className="content">
          <h1 className="page-title">Domain Rankings</h1>
          <p className="page-subtitle">
            Top 50 students ranked by verified skills, projects, and coding proficiency
          </p>

          {/* Domain Filter */}
          <div className="domain-filter">
            {domains.map((domain, index) => (
              <button
                key={index}
                className={`domain-btn ${selectedDomain === domain ? "active" : ""}`}
                onClick={() => setSelectedDomain(domain)}
              >
                {domain}
              </button>
            ))}
          </div>

          {/* Top 3 Podium */}
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Fetching the best talent...</p>
            </div>
          ) : rankings.length > 0 ? (
            <>
              <div className="podium">
                {rankings.slice(0, 3).map((student) => (
                  <div
                    key={student.rank}
                    className={`podium-card podium-${student.rank}`}
                  >
                    <div className="podium-rank">
                      {getRankIcon(student.rank)}
                      <span className="rank-number">#{student.rank}</span>
                    </div>
                    <div className="podium-avatar">
                      {student.name.charAt(0)}
                    </div>
                    <h3>{student.name}</h3>
                    <p className="podium-score">{student.score}%</p>
                    <div className="podium-stats">
                      <span>{student.projects} Projects</span>
                      <span>{student.skills} Skills</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ranking Table */}
              <div className="ranking-table-container">
                <table className="ranking-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Name</th>
                      <th>Score</th>
                      <th>Projects</th>
                      <th>Skills</th>
                      <th>GitHub</th>
                      <th>LinkedIn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankings.map((student) => (
                      <tr key={student.rank} className={student.rank <= 3 ? "top-three" : ""}>
                        <td className="rank-cell">
                          {student.rank <= 3 && getRankIcon(student.rank)}
                          <span className="rank-text">#{student.rank}</span>
                        </td>
                        <td className="name-cell">
                          <div className="student-avatar">{student.name.charAt(0)}</div>
                          <span>{student.name}</span>
                        </td>
                        <td>
                          <span className="score-badge">{student.score}%</span>
                        </td>
                        <td>{student.projects}</td>
                        <td>{student.skills}</td>
                        <td>
                          <a
                            href={student.github ? `https://github.com/${student.github}` : "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="profile-link"
                          >
                            <FaGithub /> View
                          </a>
                        </td>
                        <td>
                          <a
                            href={student.linkedin ? student.linkedin : "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="profile-link"
                          >
                            <FaLinkedin /> View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="empty-state glassy-card">
              <h3>No rankings found for this domain yet.</h3>
              <p>Be the first to upload your resume and join the leaderboard!</p>
            </div>
          )}

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

export default Ranking;
