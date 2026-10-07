import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import the Navbar component for site-wide navigation
import SweatfitAI from "../images/Sweatfitai-rmbg.png"; // Import hero image asset
import "../styles/Home.css"; // Import CSS specific to this Home component

export default function Home() {
  return (
    <div className="home-container"> {/* Root container for the home page layout */}
      
      {/* Navigation Bar */}
      <Navbar /> {/* Renders the site-wide navigation bar at the top */}

      {/* Hero Section */}
      <section className="hero-section"> {/* Top section introducing the platform */}
        <div className="hero-content"> {/* Text content container */}
          <h1 className="hero-title">Welcome to SweatFit AI</h1> {/* Main headline */}
          <p className="hero-subtitle">
            Unleash your fitness potential with AI-powered tracking and personalized guidance.
          </p> {/* Supporting text */}
          <div className="hero-buttons"> {/* Button container for hero actions */}
            <Link to="/chat"> {/* Link to chatbot page */}
              <button className="btn btn-secondary">Start Chatting</button> {/* Call-to-action button */}
            </Link>
          </div>
        </div>
        <div className="hero-image"> {/* Image container */}
          <img
            src={SweatfitAI} alt="SweatFit AI" className="hero-img"
          /> {/* Renders hero image */}
        </div>
        <div className="hero-image"> {/* Empty image container (potentially unnecessary or placeholder) */}
 
</div>
      </section>

      {/* Features Section */}
      <section className="features-section"> {/* Section to highlight platform features */}
        <h2 className="section-title">Why Choose SweatFit AI?</h2> {/* Section heading */}
        <div className="features-grid"> {/* Grid layout for feature cards */}
          <div className="feature-card"> {/* Feature card 1 */}
            <i className="feature-icon fas fa-robot"></i> {/* Icon representing AI */}
            <h3 className="feature-title">AI-Powered Insights</h3>
            <p className="feature-description">
              Get real-time feedback and personalized recommendations tailored to your fitness goals.
            </p>
          </div>
          <div className="feature-card"> {/* Feature card 2 */}
            <i className="feature-icon fas fa-dumbbell"></i> {/* Icon for workouts */}
            <h3 className="feature-title">Custom Workouts</h3>
            <p className="feature-description">
              Access dynamic workout plans designed to keep you motivated and on track.
            </p>
          </div>
          <div className="feature-card"> {/* Feature card 3 */}
            <i className="feature-icon fas fa-comments"></i> {/* Icon for chatbot */}
            <h3 className="feature-title">24/7 Chatbot Support</h3>
            <p className="feature-description">
              Stay connected with our intelligent chatbot for instant answers to your fitness queries.
            </p>
          </div>
        </div>
      </section>

      {/* AI Trainer Feature Section */}
      <section className="ai-trainer-section"> {/* Section describing the AI trainer */}
        <h2 className="section-title">Meet Your Personalized AI Trainer</h2> {/* Section heading */}
        <p className="section-subtitle">
          Track your daily calories, log exercises, and get insights into your progress—all powered by AI.
        </p> {/* Supporting info */}
        <div className="ai-trainer-cards"> {/* Container for trainer features */}
          <div className="ai-trainer-card"> {/* Card 1: Calorie Tracking */}
            <i className="card-icon fas fa-utensils"></i> {/* Icon for food tracking */}
            <h3 className="card-title">Track Daily Calories</h3>
            <p className="card-description">
              Log your meals and let the AI calculate your daily calorie intake.
            </p>
          </div>
          <div className="ai-trainer-card"> {/* Card 2: Exercise Logging */}
            <i className="card-icon fas fa-running"></i> {/* Icon for exercise */}
            <h3 className="card-title">Log Exercises</h3>
            <p className="card-description">
              Input your workouts and get an estimate of calories burned.
            </p>
          </div>
          <div className="ai-trainer-card"> {/* Card 3: Progress Tracking */}
            <i className="card-icon fas fa-chart-line"></i> {/* Icon for analytics */}
            <h3 className="card-title">Progress Tracking</h3>
            <p className="card-description">
              Monitor your fitness journey with detailed analytics and insights.
            </p>
          </div>
        </div>
        <div className="ai-trainer-cta"> {/* Call-to-action for AI trainer */}
          <Link to="/aitrainer"> {/* Link to AI trainer page */}
            <button className="btn btn-primary">Try AI Trainer</button> {/* CTA button */}
          </Link>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section"> {/* Final promotional section */}
        <div className="cta-content"> {/* Container for text and CTA */}
          <h2 className="cta-title">Ready to Transform Your Fitness Journey?</h2> {/* Main CTA headline */}
          <p className="cta-subtitle">
            Join thousands of users who are achieving their goals with SweatFit AI.
          </p> {/* CTA subtext */}
          <Link to="/chatbot"> {/* Link to chatbot start page */}
            <button className="btn btn-primary cta-btn">Get Started Now</button> {/* Final CTA button */}
          </Link>
        </div>
      </section>
    </div>
  );
}
