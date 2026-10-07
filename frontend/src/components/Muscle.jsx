import React, { useState } from 'react';S

const Muscle = () => {
  const [muscle, setMuscle] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWorkoutPlan = async () => {
    setLoading(true);
    setError('');
    setExercises([]);

    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
        method: 'GET',
        headers: {
          'X-Api-Key': 'YOUR_API_NINJAS_KEY',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch exercises');

      const data = await response.json();
      setExercises(data);
    } catch (err) {
      setError('Something went wrong! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Personalized Workout Plan</h2>
      <p>Select a muscle group to get started:</p>

      <select value={muscle} onChange={(e) => setMuscle(e.target.value)}>
        <option value="">-- Select Muscle Group --</option>
        <option value="biceps">Biceps</option>
        <option value="triceps">Triceps</option>
        <option value="chest">Chest</option>
        <option value="back">Back</option>
        <option value="legs">Legs</option>
        <option value="shoulders">Shoulders</option>
        <option value="abdominals">Abs</option>
        <option value="calves">Calves</option>
        <option value="glutes">Glutes</option>
      </select>

      <button onClick={fetchWorkoutPlan} style={{ marginLeft: '10px' }}>
        Get Plan
      </button>

      {loading && <p>Loading exercises...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {exercises.map((exercise, idx) => (
          <li key={idx} style={{ marginBottom: '10px' }}>
            <strong>{exercise.name}</strong> – {exercise.type} | Equipment: {exercise.equipment}
            <br />
            <em>{exercise.instructions}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Muscle;
