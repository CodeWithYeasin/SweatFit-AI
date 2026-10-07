import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard"
import Chatbot2 from "./pages/Chatbot2";
import Test from "./pages/Test";
import AITrainer from "./pages/AITrainer";
import SelfTracking from "./components/SelfTracking";
import WorkoutPlan from "./components/WorkoutPlan";
import DietPlan from "./components/DietPlan";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chatbot2 />} />
        <Route path="/test" element={<Test />} />
        <Route path="/aitrainer" element={<AITrainer />} />
        <Route path="/selftracking" element={<SelfTracking />} />
        <Route path="/workoutplan" element={<WorkoutPlan />} />
        <Route path="/dietplan" element={<DietPlan />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
