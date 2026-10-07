import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import "../styles/Login.css";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration < now) {
        refreshToken();
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const response = await axios.post("http://localhost:8000/api/token/refresh/", {
        refresh: refreshToken,
      });
      localStorage.setItem("accessToken", response.data.access);
    } catch (error) {
      console.error("Failed to refresh token", error);
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (isSignUp && formData.password !== formData.confirm_password) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (!formData.email || !formData.password) {
      setErrorMessage("Email and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      let response;
      if (isSignUp) {
        response = await axios.post("http://localhost:8000/api/users/signup/", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await axios.post("http://localhost:8000/api/users/signin/", {
          email: formData.email,
          password: formData.password,
        });
      }

      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An unexpected error occurred.";
      setErrorMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
    setFormData({ username: "", email: "", password: "", confirm_password: "" });
    setErrorMessage("");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">{isSignUp ? "Create an Account" : "Welcome Back"}</h1>
        <p className="login-subtitle">
          {isSignUp
            ? "Start your fitness journey with Sweatfit.ai!"
            : "Sign in to continue your fitness journey."}
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          {isSignUp && (
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {isSignUp && (
            <div className="input-group">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="Confirm your password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? <span>Processing...</span> : <span>{isSignUp ? "Create Account" : "Sign In"}</span>}
          </button>

          <p className="login-toggle">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={toggleForm}
              className="toggle-link"
              disabled={isLoading}
            >
              {isSignUp ? "Sign In" : "Create Account"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
