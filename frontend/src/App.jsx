import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Chatbot2 from "./pages/Chatbot2";
import AITrainer from "./pages/AITrainer";
import SelfTracking from "./components/SelfTracking";
import WorkoutPlan from "./components/WorkoutPlan";
import DietPlan from "./components/DietPlan";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import "./App.css"; // Adjusted path to match the second version

// Wrapper component to handle navigation and layout
function AppWithSidenav() {
  // You might want to add authentication logic here
  // Replace with actual auth check

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<Chatbot2 />} />
            <Route path="/aitrainer" element={<AITrainer />} />
            <Route path="/selftracking" element={<SelfTracking />} />
            <Route path="/workoutplan" element={<WorkoutPlan />} />
            <Route path="/dietplan" element={<DietPlan />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWithSidenav />
    </Router>
  );
}