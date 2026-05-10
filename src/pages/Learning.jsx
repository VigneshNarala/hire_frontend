import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { studentApi } from "../api/studentApi";
import "../styles/learning.css";
import "../styles/footer.css";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import {
  FaCode,
  FaBrain,
  FaDatabase,
  FaMobileAlt,
  FaCloud,
  FaRobot,
  FaLock,
  FaChartLine,
} from "react-icons/fa";

const Learning = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const res = await studentApi.getLearningProgress();
      if (res.success) {
        setProgress(res.data);
      }
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch progress", err);
      setLoading(false);
    }
  };
  const domains = [
    {
      icon: <FaCode />,
      title: "Full Stack Development",
      description: "Master MERN stack, REST APIs, and modern web technologies",
      courses: 12,
      color: "#60a5fa",
    },
    {
      icon: <FaBrain />,
      title: "Machine Learning",
      description: "Learn AI/ML algorithms, deep learning, and model deployment",
      courses: 10,
      color: "#a78bfa",
    },
    {
      icon: <FaDatabase />,
      title: "Data Science",
      description: "Analytics, visualization, statistical modeling, and big data",
      courses: 8,
      color: "#f472b6",
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Development",
      description: "Build native and cross-platform mobile apps with React Native",
      courses: 7,
      color: "#4ade80",
    },
    {
      icon: <FaCloud />,
      title: "Cloud Computing",
      description: "AWS, Azure, Docker, Kubernetes, and DevOps practices",
      courses: 9,
      color: "#fbbf24",
    },
    {
      icon: <FaRobot />,
      title: "AI & Deep Learning",
      description: "Neural networks, NLP, computer vision, and transformers",
      courses: 11,
      color: "#fb923c",
    },
    {
      icon: <FaLock />,
      title: "Cybersecurity",
      description: "Ethical hacking, penetration testing, and network security",
      courses: 6,
      color: "#ef4444",
    },
    {
      icon: <FaChartLine />,
      title: "Business Analytics",
      description: "Data-driven decision making, dashboards, and BI tools",
      courses: 5,
      color: "#14b8a6",
    },
  ];

  return (
    <>
      <Sidebar />
      <div className="main">
        <Topbar />

        <div className="content">
          <h1 className="page-title">Learning Tracks</h1>
          <p className="page-subtitle">
            Structured learning paths aligned with placement requirements and industry skills
          </p>

          {/* Domain Cards */}
          <div className="learning-grid">
            {domains.map((domain, index) => (
              <div key={index} className="learning-card" style={{ borderColor: domain.color }}>
                <div className="learning-icon" style={{ color: domain.color }}>
                  {domain.icon}
                </div>

                <h3 className="learning-title">{domain.title}</h3>
                <p className="learning-desc">{domain.description}</p>

                <div className="learning-footer">
                  <span className="course-count">{domain.courses} Courses</span>
                  <button className="explore-btn" style={{ borderColor: domain.color, color: domain.color }}>
                    Explore →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Section */}
          <div className="progress-section">
            <h2>Your Learning Progress</h2>

            <div className="progress-cards">
              {progress.map((item, i) => (
                <div key={i} className="progress-card">
                  <div className="progress-header">
                    <h4>{item.title}</h4>
                    <span className="progress-percent">{item.percent}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${item.percent}%`, background: item.color }}></div>
                  </div>
                  <p className="progress-label">{item.completed} of {item.total} courses completed</p>
                </div>
              ))}
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
              © 2026 Smart Hire | Built with ❤️ for Aditya University
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Learning;
