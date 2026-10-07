import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf'; // Import jsPDF

const DietPlan = () => {
  // Spoonacular API key - replace with your own
  const API_KEY = 'YOUR_SPOONACULAR_API_KEY';

  const [maxCalories, setMaxCalories] = useState(2000);
  const [diet, setDiet] = useState('');
  const [exclude, setExclude] = useState('');
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateMealPlan = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        'https://api.spoonacular.com/mealplanner/generate',
        {
          params: {
            apiKey: API_KEY,
            timeFrame: 'day',
            targetCalories: maxCalories,
            diet: diet,
            exclude: exclude,
          },
        }
      );

      setMealPlan(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate meal plan. Please check your API key and try again.');
      console.error('Error generating meal plan:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateMealPlan();
  };

  // Function to generate and save PDF
  const saveAsPDF = () => {
    const doc = new jsPDF();
    let yOffset = 10;

    doc.setFontSize(18);
    doc.text('Your Daily Meal Plan', 10, yOffset);
    yOffset += 10;

    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 10, yOffset);
    yOffset += 10;

    if (mealPlan) {
      doc.setFontSize(14);
      doc.text(`Total Calories: ${mealPlan.nutrients.calories} kcal`, 10, yOffset);
      yOffset += 8;

      doc.setFontSize(10);
      doc.text(`Protein: ${mealPlan.nutrients.protein}g | Fat: ${mealPlan.nutrients.fat}g | Carbs: ${mealPlan.nutrients.carbohydrates}g`, 10, yOffset);
      yOffset += 10;

      mealPlan.meals.forEach((meal, index) => {
        if (yOffset > 270) {
          doc.addPage();
          yOffset = 10;
        }

        doc.setFontSize(12);
        doc.text(`${index + 1}. ${meal.title}`, 10, yOffset);
        yOffset += 6;

        doc.setFontSize(10);
        const mealDetails = [
          `Ready in: ${meal.readyInMinutes} minutes`,
          `Servings: ${meal.servings}`,
          `Recipe URL: ${meal.sourceUrl}`,
        ];

        mealDetails.forEach((line) => {
          const splitText = doc.splitTextToSize(line, 180);
          doc.text(splitText, 10, yOffset);
          yOffset += splitText.length * 6;
        });

        yOffset += 5;
      });
    }

    doc.save('meal_plan.pdf');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Daily Meal Plan Generator</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="maxCalories" style={styles.label}>
            Max Daily Calories:
          </label>
          <input
            type="number"
            id="maxCalories"
            value={maxCalories}
            onChange={(e) => setMaxCalories(e.target.value)}
            min="1000"
            max="5000"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="diet" style={styles.label}>
            Diet Preference:
          </label>
          <select
            id="diet"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            style={styles.input}
          >
            <option value="">None</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="glutenFree">Gluten Free</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="mediterranean">Mediterranean</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="exclude" style={styles.label}>
            Exclude Ingredients:
          </label>
          <input
            type="text"
            id="exclude"
            value={exclude}
            onChange={(e) => setExclude(e.target.value)}
            placeholder="e.g., nuts, shellfish"
            style={styles.input}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={loading ? styles.buttonDisabled : styles.button}
        >
          {loading ? 'Generating...' : 'Generate Meal Plan'}
        </button>
      </form>

      {error && <div style={styles.error}>{error}</div>}

      {mealPlan && (
        <div style={styles.results}>
          <button
            onClick={saveAsPDF}
            style={styles.button}
          >
            Save as PDF
          </button>
          <h3 style={styles.subHeader}>
            Your Daily Meal Plan ({mealPlan.nutrients.calories} calories)
          </h3>

          <div style={styles.nutrients}>
            <p><strong>Protein:</strong> {mealPlan.nutrients.protein}g</p>
            <p><strong>Fat:</strong> {mealPlan.nutrients.fat}g</p>
            <p><strong>Carbs:</strong> {mealPlan.nutrients.carbohydrates}g</p>
          </div>

          <div style={styles.mealsContainer}>
            {mealPlan.meals.map((meal) => (
              <div key={meal.id} style={styles.meal}>
                <h4 style={styles.mealTitle}>{meal.title}</h4>
                <p>Ready in {meal.readyInMinutes} minutes</p>
                <p>Servings: {meal.servings}</p>
                <a
                  href={meal.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  View Recipe
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  header: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '25px',
  },
  subHeader: {
    color: '#2c3e50',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '30px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    padding: '10px 15px',
    backgroundColor: '#cccccc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'not-allowed',
    fontSize: '16px',
    marginTop: '10px',
  },
  error: {
    color: '#d32f2f',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#fde0e0',
    borderRadius: '4px',
    textAlign: 'center',
  },
  results: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  nutrients: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    justifyContent: 'center',
  },
  mealsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '15px',
  },
  meal: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    marginTop: '15px',
    borderRadius: '4px',
    borderLeft: '4px solid #4CAF50',
  },
  mealTitle: {
    marginTop: '0',
    color: '#2c3e50',
  },
  link: {
    color: '#4CAF50',
    textDecoration: 'none',
    fontWeight: 'bold',
    display: 'inline-block',
    marginTop: '10px',
  },
};

export default DietPlan;