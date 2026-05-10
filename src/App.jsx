import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import "./App.css";
import "./styles/layout.css";

// Lazy load pages for better performance
const Landing = lazy(() => import("./pages/Landing"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Resume = lazy(() => import("./pages/Resume"));
const Learning = lazy(() => import("./pages/Learning"));
const Ranking = lazy(() => import("./pages/Ranking"));
const Profile = lazy(() => import("./pages/Profile"));

// Loading component
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="spinner"></div>
  </div>
);

// Protected Route
const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("authToken");
  return isAuth ? children : <Navigate to="/login" replace />;
};

// Error Boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container flex-center">
          <div className="glassy-card" style={{ padding: "40px", textAlign: "center", maxWidth: "500px" }}>
            <h1 style={{ fontSize: "48px", margin: "0 0 16px 0" }}>⚠️</h1>
            <h2>Something went wrong</h2>
            <p style={{ margin: "16px 0", opacity: 0.7 }}>Please refresh or contact support</p>
            <button className="btn-primary" onClick={() => window.location.reload()}>
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Auth Pages (Login/Register)
const AuthPage = ({ type }) => {
  const isLogin = type === "login";
  
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("authToken", "temp-token");
    localStorage.setItem("userName", "Vignesh Narala");
    window.location.href = "/dashboard";
  };

  return (
    <div className="landing-page">
      <div className="landing-hero">
        <div className="glassy-card" style={{ padding: "48px", maxWidth: "450px", width: "100%", margin: "auto 20px" }}>
          <h1 style={{ marginBottom: "8px", textAlign: "center" }}>
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p style={{ marginBottom: "32px", textAlign: "center", opacity: 0.7 }}>
            {isLogin ? "Sign in to Smart Hire" : "Join Smart Hire"}
          </p>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>Full Name</label>
                <input type="text" className="profile-input" placeholder="Enter your name" required />
              </div>
            )}
            
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>Email</label>
              <input type="email" className="profile-input" placeholder="your.email@adityauniversity.in" required />
            </div>

            {!isLogin && (
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>Roll Number</label>
                <input type="text" className="profile-input" placeholder="AU2021001234" required />
              </div>
            )}

            <div style={{ marginBottom: "32px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>Password</label>
              <input type="password" className="profile-input" placeholder="Enter password" required />
            </div>

            <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p style={{ marginTop: "16px", textAlign: "center", fontSize: "14px", opacity: 0.6 }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <a href={isLogin ? "/register" : "/login"} style={{ color: "#60a5fa", fontWeight: "600" }}>
              {isLogin ? "Register" : "Sign In"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

// Main App
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<AuthPage type="login" />} />
            <Route path="/register" element={<AuthPage type="register" />} />
            
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/resume" element={<ProtectedRoute><Resume /></ProtectedRoute>} />
            <Route path="/learning" element={<ProtectedRoute><Learning /></ProtectedRoute>} />
            <Route path="/ranking" element={<ProtectedRoute><Ranking /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
