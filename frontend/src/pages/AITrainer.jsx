import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AITrainer.css';

// Placeholder images (replace with your own direct image URLs or local assets)
const selfTrackingImage = 'https://media.istockphoto.com/id/1290566152/vector/smartwatch-app-and-fitness-tracker-technology.jpg?s=2048x2048&w=is&k=20&c=JYyaDtawVpdMZE7-VzMShs92iEzy3pQDIangpBSHvhg=';
const workoutImage = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';
const dietImage = 'https://media.istockphoto.com/id/1938638593/photo/weekly-nutrition-plan.jpg?s=2048x2048&w=is&k=20&c=XvzT7XyCfwJURt49pBjSeIGVtXTfITqkghK0euFjSQA=';

export default function AITrainer() {
  const navigate = useNavigate();

  return (
    <div className="ai-trainer-container">
      <h1 className="page-title">AI Trainer</h1>
      <p className="page-subtitle">
        Your personal assistant for fitness and nutrition.
      </p>

      <div className="boxes-container">
        {/* Self Tracking Box */}
        <div className="box">
          <img src={selfTrackingImage} alt="Self Tracking" className="box-image" />
          <h2>Self Tracking</h2>
          <button className="btn btn-primary" onClick={() => navigate('/selftracking')}>
            Track Now
          </button>
        </div>

        {/* Workout Plan Box */}
        <div className="box">
          <img src={workoutImage} alt="Workout Plan" className="box-image" />
          <h2>Workout Plan</h2>
          <button className="btn btn-primary" onClick={() => navigate('/workoutplan')}>
            View Plan
          </button>
        </div>

        {/* Diet Plan Box */}
        <div className="box">
          <img src={dietImage} alt="Diet Plan" className="box-image" />
          <h2>Diet Plan</h2>
          <button className="btn btn-primary" onClick={() => navigate('/dietplan')}>
            See Diet
          </button>
        </div>
      </div>
    </div>
  );
}