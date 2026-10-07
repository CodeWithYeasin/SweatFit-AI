import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SelfTracking.css';

const SelfTracking = () => {
  const [foodInput, setFoodInput] = useState('');
  const [exerciseInput, setExerciseInput] = useState('');
  const [foods, setFoods] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApiError = (error, defaultMessage = 'Something went wrong. Please try again.') => {
    console.error(error);
    if (error.response?.status === 401) {
      setError('Session expired. Please log in again.');
      // Optional: Redirect to login or clear token
      // localStorage.removeItem('token');
      // navigate('/login');
    } else {
      setError(error.message || defaultMessage);
    }
  };

  const calculateAll = async () => {
    const token = localStorage.getItem('accessToken')?.trim();
    if (!token) {
      setError('Please log in first.');
      return;
    }

    if (!foodInput.trim() || !exerciseInput.trim()) {
      setError('Please provide both food and exercise inputs.');
      return;
    }

    setLoading(true);
    setError('');

    const baseHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    try {
      // Fetch food data
      const foodRes = await axios.post(
        'https://trackapi.nutritionix.com/v2/natural/nutrients',
        { query: foodInput },
        {
          headers: {
            ...baseHeaders,
            'x-app-id': 'YOUR_NUTRITIONIX_APP_ID',
            'x-app-key': 'YOUR_NUTRITIONIX_API_KEY',
          }
        }
      );

      setFoods(foodRes.data.foods || []);

      // Fetch exercise data
      const exRes = await axios.post(
        'https://trackapi.nutritionix.com/v2/natural/exercise',
        {
          query: exerciseInput,
          gender: 'male',
          weight_kg: 70,
          height_cm: 175,
          age: 25
        },
        {
          headers: {
            ...baseHeaders,
            'x-app-id': 'YOUR_NUTRITIONIX_APP_ID',
            'x-app-key': 'YOUR_NUTRITIONIX_API_KEY',
          }
        }
      );

      setExercises(exRes.data.exercises || []);

      // Send data to backend
      await sendToBackend(foodRes.data.foods, exRes.data.exercises);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const sendToBackend = async (foods, exercises) => {
    const token = localStorage.getItem('accessToken')?.trim();
    if (!token) {
      setError('Authentication token missing');
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    try {
      // Send food data
      const foodResponse = await axios.post(
        'http://localhost:8000/api/selftracking/track-food/',
        foods.map(food => ({
          food_name: food.food_name,
          serving_qty: food.serving_qty,
          serving_unit: food.serving_unit,
          calories: food.nf_calories,
          serving_weight_grams: food.serving_weight_grams,
          food_group: food.tags?.food_group || '',
        })),
        { headers }
      );

      // Send exercise data
      const exerciseResponse = await axios.post(
        'http://localhost:8000/api/selftracking/track-exercise/',
        exercises.map(exercise => ({
          exercise_name: exercise.name,
          duration_min: exercise.duration_min,
          calories_burned: exercise.nf_calories,
        })),
        { headers }
      );
    } catch (err) {
      handleApiError(err, 'Failed to save data. Please try again.');
      throw err; // Re-throw to prevent marking as successful
    }
  };

  const totalCaloriesIntake = foods.reduce((sum, food) => sum + (food.nf_calories || 0), 0);
  const totalCaloriesBurned = exercises.reduce((sum, ex) => sum + (ex.nf_calories || 0), 0);
  const netCalories = totalCaloriesIntake - totalCaloriesBurned;

  return (
    <div className="nutritionix-wrapper">
      <h2>Calorie Tracker</h2>

      {error && <p className="error">{error}</p>}

      <div className="input-group">
        <label>What and how much did you eat?</label>
        <textarea
          placeholder='e.g., I ate 2 eggs and a slice of toast'
          value={foodInput}
          onChange={(e) => setFoodInput(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>What exercise and how long?</label>
        <textarea
          placeholder='e.g., Ran 30 minutes, 20 min cycling'
          value={exerciseInput}
          onChange={(e) => setExerciseInput(e.target.value)}
        />
      </div>

      <button onClick={calculateAll} disabled={loading}>
        {loading ? 'Calculating...' : 'Calculate Calories'}
      </button>

      {(foods.length > 0 || exercises.length > 0) && (
        <>
          {foods.length > 0 && (
            <div className="result-section">
              <h3>Food Summary</h3>
              <table className="result-table">
                <thead>
                  <tr>
                    <th>Qty</th><th>Unit</th><th>Food</th><th>Calories</th><th>Weight</th><th>Group</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((food, i) => (
                    <tr key={i}>
                      <td>{food.serving_qty}</td>
                      <td>{food.serving_unit}</td>
                      <td>{food.food_name}</td>
                      <td>{food.nf_calories} kcal</td>
                      <td>{food.serving_weight_grams} g</td>
                      <td>{food.tags?.food_group || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p><strong>Total Intake Calories:</strong> {totalCaloriesIntake.toFixed(2)} kcal</p>
            </div>
          )}

          {exercises.length > 0 && (
            <div className="result-section">
              <h3>Exercise Summary</h3>
              <table className="result-table">
                <thead>
                  <tr>
                    <th>Exercise</th><th>Duration</th><th>Calories Burned</th>
                  </tr>
                </thead>
                <tbody>
                  {exercises.map((ex, i) => (
                    <tr key={i}>
                      <td>{ex.name}</td>
                      <td>{ex.duration_min} min</td>
                      <td>{ex.nf_calories} kcal</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p><strong>Total Burned Calories:</strong> {totalCaloriesBurned.toFixed(2)} kcal</p>
            </div>
          )}

          <div className="net-calories">
            <h3>Net Calorie Balance</h3>
            <p><strong>{netCalories.toFixed(2)} kcal</strong> (Intake - Burned)</p>
          </div>
        </>
      )}
    </div>
  );
};

export default SelfTracking;