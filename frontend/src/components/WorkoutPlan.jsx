import React, { useState } from 'react';
import { jsPDF } from 'jspdf'; // Import jsPDF

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Workout = () => {
  const [form, setForm] = useState({
    gender: '',
    age: '',
    level: '',
    equipment: '',
    goal: '',
    workoutDays: 5,
    focus: '',
  });

  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const generatePlan = async () => {
    const { level, equipment, goal, workoutDays, focus } = form;

    setLoading(true);
    setPlan([]);

    try {
      const workoutPlan = [];
      const focusMap = {
        fullbody: ['chest', 'back', 'legs', 'shoulders', 'biceps', 'triceps', 'abdominals'],
        upper: ['chest', 'shoulders', 'biceps', 'triceps'],
        lower: ['legs', 'glutes', 'calves'],
        abs: ['abdominals'],
        mix: ['chest', 'back', 'legs', 'abdominals', 'shoulders'],
      };

      const selectedMuscles = focusMap[focus] || focusMap['mix'];

      for (let i = 0; i < workoutDays; i++) {
        const muscle = selectedMuscles[i % selectedMuscles.length];
        const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
          method: 'GET',
          headers: {
            'X-Api-Key': 'YOUR_API_NINJAS_KEY',
          },
        });

        const data = await response.json();

        const filtered = data.filter(ex =>
          (ex.difficulty === level || !level) &&
          (ex.equipment.toLowerCase().includes(equipment.toLowerCase()) || equipment === 'bodyweight')
        );

        const exercises = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);

        workoutPlan.push({
          day: days[i],
          muscle,
          exercises,
        });
      }

      setPlan(workoutPlan);
    } catch (err) {
      console.error('Error fetching exercises', err);
      alert('Failed to create plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to generate and save PDF
  const saveAsPDF = () => {
    const doc = new jsPDF();
    let yOffset = 10;

    doc.setFontSize(18);
    doc.text('Your Personalized Workout Plan', 10, yOffset);
    yOffset += 10;

    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 10, yOffset);
    yOffset += 10;

    plan.forEach((dayPlan, index) => {
      if (yOffset > 270) {
        doc.addPage();
        yOffset = 10;
      }

      doc.setFontSize(14);
      doc.text(`${dayPlan.day} - ${dayPlan.muscle.toUpperCase()}`, 10, yOffset);
      yOffset += 8;

      doc.setFontSize(10);
      dayPlan.exercises.forEach((ex, i) => {
        const exerciseText = `${i + 1}. ${ex.name} (${ex.type}) - ${ex.equipment}`;
        const instructions = ex.instructions;

        // Split text to fit within page width
        const exerciseLines = doc.splitTextToSize(exerciseText, 180);
        const instructionLines = doc.splitTextToSize(`Instructions: ${instructions}`, 180);

        doc.text(exerciseLines, 10, yOffset);
        yOffset += exerciseLines.length * 6;

        doc.text(instructionLines, 10, yOffset);
        yOffset += instructionLines.length * 6 + 4;

        if (yOffset > 270) {
          doc.addPage();
          yOffset = 10;
        }
      });

      yOffset += 5;
    });

    doc.save('workout_plan.pdf');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <style>{`
        .workout-container {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        h2 {
          color: #333;
          text-align: center;
          padding: 20px 0;
          margin: 0;
          background-color: #fff;
          border-radius: 10px 10px 0 0;
          border-bottom: 2px solid #4CAF50;
        }

        select, input {
          width: 100%;
          padding: 12px;
          margin: 8px 0;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
          background-color: #fff;
          box-sizing: border-box;
          transition: border-color 0.3s;
        }

        select:focus, input:focus {
          outline: none;
          border-color: #4CAF50;
          box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
        }

        button {
          background-color: #4CAF50;
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          margin-top: 10px;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #45a049;
        }

        .loading {
          text-align: center;
          color: #666;
          padding: 20px;
          font-style: italic;
        }

        .day-plan {
          background-color: #fff;
          transition: transform 0.2s;
        }

        .day-plan:hover {
          transform: translateY(-2px);
        }

        h3 {
          color: #4CAF50;
          margin: 0 0 15px 0;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          margin: 15px 0;
          padding: 10px;
          background-color: #fafafa;
          border-radius: 5px;
        }

        strong {
          color: #333;
          font-size: 1.1em;
        }

        small {
          color: #777;
          display: block;
          margin-top: 5px;
          line-height: 1.4;
        }
      `}</style>

      <div className="workout-container">
        <h2>Get Your Personalized Workout Plan</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' }}>
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
          />

          <select name="level" value={form.level} onChange={handleChange}>
            <option value="">Fitness Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Advanced</option>
          </select>

          <select name="equipment" value={form.equipment} onChange={handleChange}>
            <option value="">Equipment Access</option>
            <option value="bodyweight">Bodyweight Only</option>
            <option value="dumbbell">Dumbbells</option>
            <option value="barbell">Barbell</option>
            <option value="machine">Machines</option>
          </select>

          <select name="goal" value={form.goal} onChange={handleChange}>
            <option value="">Primary Goal</option>
            <option value="fat_loss">Fat Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="endurance">Endurance</option>
            <option value="flexibility">Flexibility</option>
          </select>

          <select name="focus" value={form.focus} onChange={handleChange}>
            <option value="">Focus Area</option>
            <option value="fullbody">Full Body</option>
            <option value="upper">Upper Body</option>
            <option value="lower">Lower Body</option>
            <option value="abs">Abs</option>
            <option value="mix">Mix</option>
          </select>

          <input
            name="workoutDays"
            type="number"
            placeholder="Workout Days/Week (3-7)"
            value={form.workoutDays}
            min={3}
            max={7}
            onChange={handleChange}
          />

          <button onClick={generatePlan}>Generate Plan</button>
        </div>

        {loading && <p className="loading">Generating your personalized plan...</p>}

        {plan.length > 0 && (
          <div style={{ marginTop: '30px', padding: '0 20px 20px' }}>
            <button onClick={saveAsPDF}>Save as PDF</button>
            {plan.map((dayPlan, i) => (
              <div key={i} className="day-plan" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3>{dayPlan.day} - {dayPlan.muscle.toUpperCase()}</h3>
                <ul>
                  {dayPlan.exercises.map((ex, j) => (
                    <li key={j}>
                      <strong>{ex.name}</strong> ({ex.type}) – {ex.equipment}
                      <br />
                      <small>{ex.instructions}</small>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workout;