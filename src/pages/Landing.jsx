import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRocket, FaCheckCircle, FaGithub, FaLinkedin } from "react-icons/fa";
import "../styles/landing.css";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🎯",
      title: "AI Resume Optimization",
      description: "Get maximum ATS scores with AI-driven resume rewriting for specific roles"
    },
    {
      icon: "✅",
      title: "Real-Time Skill Verification",
      description: "Verify skills via GitHub commits and LinkedIn data for authentic profiles"
    },
    {
      icon: "🏆",
      title: "Dynamic Domain Rankings",
      description: "Automatic ranking by technology domain (Top 50 in FSD, ML, etc.)"
    },
    {
      icon: "📜",
      title: "Certificate Portal",
      description: "Validate global certifications and track placement readiness"
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div className="landing-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Smart <span className="gradient-text">Hire</span>
          </h1>
          <p className="hero-tagline">AI-Driven Placement Platform for Aditya University</p>
          <p className="hero-description">
            Bridge the gap between student potential and industry requirements with verified skills,
            AI-optimized resumes, and data-driven rankings.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary glassy-btn" onClick={() => navigate("/register")}>
              <FaRocket /> Get Started
            </button>
            <button className="btn-secondary glassy-btn" onClick={() => navigate("/login")}>
              Sign In
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card">
            <FaCheckCircle className="card-icon" />
            <h3>85%</h3>
            <p>Verified Skill Score</p>
          </div>
          <div className="floating-card secondary">
            <FaRocket className="card-icon" style={{ color: '#a855f7' }} />
            <h3>120+</h3>
            <p>Top Recruiters</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="section-title">Why Smart Hire?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card glassy-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <p>© 2026 Smart Hire | Built with ❤️ for Aditya University</p>
          <div className="footer-links">
            <FaGithub />
            <FaLinkedin />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
