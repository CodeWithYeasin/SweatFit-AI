import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  // Check if user is logged in by verifying the access token
  const isLoggedIn = localStorage.getItem("accessToken") !== null;

  // Handle profile click
  const handleProfileClick = () => {
    navigate("/profile");
  };

  // Handle dashboard click
  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      // Optionally, you can make an API call to invalidate the token on the server side
      // await axios.post('/api/logout', { token: localStorage.getItem("accessToken") });

      // Clear tokens and any other user-related data
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Redirect to login page
      navigate("/login");

      // Optionally, refresh the page to ensure the UI updates correctly
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, show a user-friendly error message
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <span>SweatFit AI</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li>
          <Link to="/chat">Chatbot</Link>
        </li>
        <li>
          <Link to="/aitrainer">AI Trainer</Link>
        </li>
      </ul>

      {/* Profile/Dashboard/Logout Section */}
      <div className="profile-section">
        {isLoggedIn ? (
          // Show all three buttons if logged in
          <>
            <button className="nav-btn" onClick={handleDashboardClick}>
              Dashboard
            </button>
            <button className="nav-btn" onClick={handleProfileClick}>
              <FaUserCircle className="icon" /> Profile
            </button>
            <button className="nav-btn logout-btn" onClick={handleLogout}>
              <FaSignOutAlt className="icon" /> Logout
            </button>
          </>
        ) : (
          // Show only login button if not logged in
          <button className="nav-btn login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
