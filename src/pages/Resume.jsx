import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/resume.css";
import "../styles/footer.css";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import {
  FaUpload,
  FaCheckCircle,
  FaTimesCircle,
  FaLightbulb,
  FaMagic,
  FaFilePdf,
  FaExclamationTriangle,
} from "react-icons/fa";

// Comprehensive skill database
const SKILLS_DATABASE = {
  programming: ['JavaScript', 'Python', 'Java', 'C++', 'C#', 'TypeScript', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'PHP', 'Scala', 'R', 'MATLAB'],
  frontend: ['React', 'Angular', 'Vue.js', 'HTML', 'CSS', 'Sass', 'Bootstrap', 'Tailwind', 'Next.js', 'Redux', 'jQuery', 'Webpack'],
  backend: ['Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'ASP.NET', 'Laravel', 'FastAPI', 'GraphQL', 'REST API'],
  database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Cassandra', 'DynamoDB', 'Oracle', 'SQL Server', 'Firebase', 'Elasticsearch'],
  cloud: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Lambda', 'EC2', 'S3', 'CloudFormation'],
  aiml: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'NLP', 'Computer Vision', 'Deep Learning', 'Machine Learning', 'Neural Networks', 'OpenCV'],
  devops: ['Jenkins', 'GitLab CI', 'CircleCI', 'Ansible', 'Chef', 'Puppet', 'Prometheus', 'Grafana', 'ELK Stack'],
  mobile: ['React Native', 'Flutter', 'iOS', 'Android', 'Xamarin', 'Ionic'],
  tools: ['Git', 'Jira', 'Confluence', 'Postman', 'VS Code', 'IntelliJ', 'Figma', 'Tableau']
};

const SEMANTIC_CLUSTERS = {
  'Cloud Architecture': ['AWS', 'scalability', 'microservices', 'Kubernetes', 'distributed', 'serverless'],
  'Full Stack': ['frontend', 'backend', 'API', 'database', 'React', 'Node.js'],
  'Data Science': ['Python', 'machine learning', 'data analysis', 'visualization', 'statistics'],
  'DevOps': ['CI/CD', 'automation', 'deployment', 'monitoring', 'infrastructure'],
  'Mobile Development': ['iOS', 'Android', 'React Native', 'Flutter', 'mobile app'],
  'Project Management': ['Agile', 'Scrum', 'team', 'leadership', 'stakeholder']
};

const Resume = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const analyzeResume = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('targetRole', 'FSD'); // Default role, could be selectable

      const res = await studentApi.uploadResume(formData);
      if (res.success) {
        const data = res.data;
        const metrics = data.resume.feedback?.metrics || {};
        
        // Map backend response to the frontend result state
        setResult({
          score: Math.round(data.scores.placementReadiness),
          parseRate: Math.round(metrics.parseRate || 0),
          breakdown: {
            keyword: Math.round(metrics.keywordScore || 0),
            semantic: Math.round(metrics.semanticScore || 0),
            experience: Math.round(metrics.experienceScore || 0),
            education: Math.round(metrics.educationScore || 0),
            contact: Math.round(metrics.contactScore || 0),
            structure: Math.round(metrics.structureScore || 0)
          },
          keywords: metrics.detectedSkills || [],
          missing: data.resume.feedback?.missing || [],
          suggestions: data.suggestions || [],
          parsingIssues: metrics.parsingIssues || [],
          contactInfo: metrics.contactInfo || { email: true, phone: true },
          semanticMatches: metrics.semanticMatches || [],
          redFlags: metrics.redFlags || [],
          certifications: metrics.certifications || [],
          bulletQuality: metrics.bulletQuality || { total: 0, withMetrics: 0, avgWords: 0 },
          atsRating: data.scores.placementReadiness >= 80 ? "Excellent" : "Good",
          role: "Full Stack Developer"
        });
      }
      setIsAnalyzing(false);
    } catch (err) {
      console.error("Analysis failed", err);
      setIsAnalyzing(false);
      const errorMsg = err.response?.data?.message || "Resume analysis failed. Please try again.";
      alert(errorMsg);
    }
  };

  // Analysis Functions
  const detectSkills = (text) => {
    const found = [];
    Object.values(SKILLS_DATABASE).flat().forEach(skill => {
      const regex = new RegExp('\\b' + skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
      if (regex.test(text)) found.push(skill);
    });
    return [...new Set(found)];
  };

  const detectParsingIssues = (text) => {
    const issues = [];
    const lines = text.split('\n');
    const avgLineLength = lines.reduce((sum, line) => sum + line.length, 0) / lines.length;

    if (avgLineLength < 40) {
      issues.push({
        type: 'critical',
        message: 'Multi-column layout detected',
        fix: 'Use single-column format',
        penalty: 25
      });
    }

    if (text.includes('|') || text.match(/\t{2,}/)) {
      issues.push({
        type: 'critical',
        message: 'Table formatting detected',
        fix: 'Convert tables to bullet points',
        penalty: 20
      });
    }

    if (text.match(/[█▓▒░●○◆◇■□]/)) {
      issues.push({
        type: 'critical',
        message: 'Graphic elements detected',
        fix: 'Replace with text descriptions',
        penalty: 15
      });
    }

    return issues;
  };

  const detectCertifications = (text) => {
    const certs = [];
    const certPatterns = ['AWS Certified', 'Google Cloud', 'Microsoft Certified', 'PMP', 'Scrum Master', 'CISSP', 'CompTIA'];
    certPatterns.forEach(cert => {
      if (text.includes(cert.toLowerCase())) certs.push(cert);
    });
    return certs;
  };

  const validateSemanticClusters = (text) => {
    const matches = [];
    Object.entries(SEMANTIC_CLUSTERS).forEach(([cluster, keywords]) => {
      let matchCount = 0;
      keywords.forEach(keyword => {
        if (text.includes(keyword.toLowerCase())) matchCount++;
      });
      if (matchCount >= 3) {
        matches.push({ cluster, strength: Math.round((matchCount / keywords.length) * 100) });
      }
    });
    return matches;
  };

  const detectRedFlags = (text, originalText) => {
    const flags = [];
    const words = text.split(/\s+/);
    const wordFreq = {};

    words.forEach(word => {
      if (word.length > 3) wordFreq[word] = (wordFreq[word] || 0) + 1;
    });

    Object.entries(wordFreq).forEach(([word, count]) => {
      if (count > 10) {
        flags.push({
          type: 'critical',
          message: `Keyword stuffing: "${word}" appears ${count} times`,
          penalty: 15
        });
      }
    });

    return flags;
  };

  const detectContactInfo = (text) => {
    return {
      email: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(text),
      phone: /\(?\d{3}\)?[-\s.]?\d{3}[-\s.]?\d{4}/.test(text),
      linkedin: /linkedin\.com/.test(text),
      github: /github\.com/.test(text),
      portfolio: /(portfolio|website|blog)/.test(text)
    };
  };

  const detectExperienceYears = (text) => {
    const matches = text.match(/\d+\+?\s*(years?|yrs?)\s*(of)?\s*experience/gi);
    if (matches && matches.length > 0) {
      const nums = matches[0].match(/\d+/);
      return nums ? parseInt(nums[0]) : 0;
    }

    const dateRanges = text.match(/\d{4}\s*[-–]\s*(\d{4}|present|current)/gi);
    if (dateRanges && dateRanges.length > 0) {
      let totalYears = 0;
      dateRanges.forEach(range => {
        const years = range.match(/\d{4}/g);
        if (years && years.length >= 1) {
          const start = parseInt(years[0]);
          const end = years[1] ? parseInt(years[1]) : 2026;
          totalYears += (end - start);
        }
      });
      return Math.min(totalYears, 20);
    }

    return 0;
  };

  const detectEducation = (text) => {
    const degrees = [];
    if (/ph\.?d|doctorate/i.test(text)) degrees.push('phd');
    if (/master|m\.?s\.?|m\.?b\.?a/i.test(text)) degrees.push('master');
    if (/bachelor|b\.?s\.?|b\.?a\.?|b\.?tech/i.test(text)) degrees.push('bachelor');
    if (/associate|a\.?s\.?/i.test(text)) degrees.push('associate');
    return degrees;
  };

  const analyzeStructure = (text) => {
    return {
      hasExperience: /experience|work history|employment/i.test(text),
      hasEducation: /education|academic|degree/i.test(text),
      hasSkills: /skills|technical|competencies/i.test(text),
      hasSummary: /summary|profile|about/i.test(text),
      hasObjective: /objective|goal/i.test(text),
      hasReferences: /references|recommendations/i.test(text),
      hasCertifications: /certifications|certificates/i.test(text),
      hasProjects: /projects|portfolio/i.test(text)
    };
  };

  const analyzeBulletPoints = (text) => {
    const bullets = text.match(/[•●◆■□-]\s+.+/g) || [];
    const wordCounts = bullets.map(bullet => bullet.split(/\s+/).length);
    const avg = wordCounts.reduce((sum, count) => sum + count, 0) / wordCounts.length || 0;
    const hasMetrics = bullets.filter(bullet => 
      /\d+%|\$\d+|\d+x|\d+ (users|customers|clients|projects)/i.test(bullet)
    ).length;

    return {
      total: bullets.length,
      avgWords: Math.round(avg),
      withMetrics: hasMetrics
    };
  };

  const generateSuggestions = (data) => {
    const suggestions = [];

    if (data.parsingIssues.length > 0) {
      data.parsingIssues.forEach(issue => {
        suggestions.push(`${issue.message} - ${issue.fix}`);
      });
    }

    if (data.skillCount < 20) {
      suggestions.push("Add more relevant technical skills (aim for 20-35 skills)");
    } else if (data.skillCount > 35) {
      suggestions.push("Too many skills listed - focus on most relevant ones");
    }

    if (!data.contactInfo.email) suggestions.push("Add email address");
    if (!data.contactInfo.phone) suggestions.push("Add phone number");
    if (!data.contactInfo.linkedin) suggestions.push("Add LinkedIn profile URL");

    if (!data.structure.hasExperience) suggestions.push("Add Work Experience section");
    if (!data.structure.hasSkills) suggestions.push("Add Skills section");

    if (data.bulletQuality.withMetrics < data.bulletQuality.total * 0.5) {
      suggestions.push("Add more quantifiable metrics (e.g., 'improved performance by 40%')");
    }

    if (data.bulletQuality.avgWords < 12) {
      suggestions.push("Expand bullet points - add more context (aim for 12-28 words)");
    }

    if (data.wordCount < 400) {
      suggestions.push("Resume too short - add more detail (aim for 400-700 words)");
    } else if (data.wordCount > 700) {
      suggestions.push("Resume too long - focus on most relevant information");
    }

    if (data.redFlags.length > 0) {
      data.redFlags.forEach(flag => {
        suggestions.push(`Fix: ${flag.message}`);
      });
    }

    return suggestions.slice(0, 8);
  };

  const rewriteResume = () => {
    alert("AI Resume Rewriting in progress... (Backend integration pending)");
  };

  return (
    <>
      <Sidebar />
      <div className="main">
        <Topbar />

        <div className="content">
          <h1 className="page-title">AI Resume Analyzer</h1>
          <p className="page-subtitle">
            Enterprise-grade ATS optimization | Compatible with Workday, Greenhouse, Lever
          </p>

          {/* UPLOAD */}
          <div className="resume-upload">
            <div className="upload-icon-container">
              <FaUpload className="upload-big-icon" />
            </div>
            <h3>Upload Your Resume</h3>
            <p>PDF, DOC, DOCX, TXT formats supported</p>

            <div className="upload-row">
              <label className="file-label glassy-btn">
                <FaFilePdf />
                Choose File
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleUpload}
                  className="file-input"
                />
              </label>

              <span className="file-name">
                {file ? file.name : "No file chosen"}
              </span>

              <button
                className="analyze-btn glassy-btn"
                onClick={analyzeResume}
                disabled={!file || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <span className="spinner"></span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FaMagic />
                    Analyze Resume
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RESULT */}
          {result && (
            <>
              {/* Parsing Issues */}
              {result.parsingIssues.length > 0 && (
                <div className="parsing-issues">
                  <h3><FaExclamationTriangle /> Critical Parsing Issues</h3>
                  {result.parsingIssues.map((issue, i) => (
                    <div key={i} className={`issue-item issue-${issue.type}`}>
                      <strong>{issue.message}</strong>
                      <div className="issue-fix">Fix: {issue.fix}</div>
                      <div className="issue-penalty">Penalty: -{issue.penalty} points</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="resume-grid">
                {/* ATS Score */}
                <div className="score-card">
                  <h3>ATS Score</h3>
                  <h2>{result.score}%</h2>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${result.score}%`,
                        background: result.score >= 80 ? '#4ade80' : result.score >= 60 ? '#60a5fa' : '#f472b6'
                      }}
                    ></div>
                  </div>
                  <p className="ats-rating">
                    Rating: <span style={{ color: result.score >= 80 ? '#4ade80' : result.score >= 60 ? '#60a5fa' : '#f472b6' }}>
                      {result.atsRating}
                    </span>
                  </p>
                  <p className="parse-rate">Parse Rate: {result.parseRate}%</p>
                  <button className="rewrite-btn glassy-btn" onClick={rewriteResume}>
                    <FaMagic /> AI Rewrite Resume
                  </button>
                </div>

                {/* Score Breakdown */}
                <div className="result-card">
                  <h3><FaCheckCircle /> Score Breakdown</h3>
                  <div className="breakdown-list">
                    <div className="breakdown-item">
                      <span>Keyword Match (45%)</span>
                      <strong>{result.breakdown.keyword}/45</strong>
                    </div>
                    <div className="breakdown-item">
                      <span>Semantic Context (20%)</span>
                      <strong>{result.breakdown.semantic}/20</strong>
                    </div>
                    <div className="breakdown-item">
                      <span>Experience (12%)</span>
                      <strong>{result.breakdown.experience}/12</strong>
                    </div>
                    <div className="breakdown-item">
                      <span>Structure (10%)</span>
                      <strong>{result.breakdown.structure}/10</strong>
                    </div>
                    <div className="breakdown-item">
                      <span>Education (8%)</span>
                      <strong>{result.breakdown.education}/8</strong>
                    </div>
                    <div className="breakdown-item">
                      <span>Contact Info (5%)</span>
                      <strong>{result.breakdown.contact}/5</strong>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="result-card">
                  <h3><FaCheckCircle /> Contact Information</h3>
                  <div className="contact-grid">
                    <div className={`contact-badge ${result.contactInfo.email ? 'present' : 'missing'}`}>
                      {result.contactInfo.email ? '✓' : '✗'} Email
                    </div>
                    <div className={`contact-badge ${result.contactInfo.phone ? 'present' : 'missing'}`}>
                      {result.contactInfo.phone ? '✓' : '✗'} Phone
                    </div>
                    <div className={`contact-badge ${result.contactInfo.linkedin ? 'present' : 'missing'}`}>
                      {result.contactInfo.linkedin ? '✓' : '✗'} LinkedIn
                    </div>
                    <div className={`contact-badge ${result.contactInfo.github ? 'present' : 'missing'}`}>
                      {result.contactInfo.github ? '✓' : '✗'} GitHub
                    </div>
                  </div>
                </div>

                {/* Matched Keywords */}
                <div className="result-card">
                  <h3><FaCheckCircle /> Matched Keywords ({result.keywords.length})</h3>
                  <div className="tags-container">
                    {result.keywords.map((k, i) => (
                      <span key={i} className="tag good">{k}</span>
                    ))}
                  </div>
                  <p style={{ marginTop: '10px', fontSize: '13px', opacity: 0.7 }}>
                    Optimal range: 20-35 skills
                  </p>
                </div>

                {/* Missing Keywords */}
                <div className="result-card">
                  <h3><FaTimesCircle /> Suggested Keywords</h3>
                  <div className="tags-container">
                    {result.missing.map((k, i) => (
                      <span key={i} className="tag bad">{k}</span>
                    ))}
                  </div>
                </div>

                {/* Semantic Clusters */}
                {result.semanticMatches.length > 0 && (
                  <div className="result-card">
                    <h3><FaCheckCircle /> Semantic Clusters</h3>
                    {result.semanticMatches.map((match, i) => (
                      <div key={i} style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <strong>{match.cluster}</strong>
                          <span>{match.strength}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${match.strength}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
                <div className="result-card suggestions-card">
                  <h3><FaLightbulb /> AI Suggestions</h3>
                  <ul>
                    {result.suggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* AI Rewrite CTA */}
              <div className="rewrite-cta">
                <h3>🚀 Want a higher ATS score?</h3>
                <p>Let our AI rewrite your resume optimized for {result.role} roles</p>
                <button className="rewrite-cta-btn glassy-btn" onClick={rewriteResume}>
                  <FaMagic /> AI Rewrite Now
                </button>
              </div>
            </>
          )}

          {/* FOOTER */}
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

export default Resume;
