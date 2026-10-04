import { useState } from "react";
import "./Diet.css";

const meals = {
  Breakfast: {
    icon: "🥣",
    description: "Start the day with slow-release energy and a balanced meal.",
    calories: "450 kcal",
    protein: "20 g",
    carbs: "55 g",
    ingredients: ["Oats", "Banana", "Milk", "Almonds", "Honey"],
  },
  Lunch: {
    icon: "🥗",
    description: "A balanced lunch designed to keep you energized through the day.",
    calories: "650 kcal",
    protein: "32 g",
    carbs: "75 g",
    ingredients: ["Brown Rice", "Grilled Chicken", "Mixed Vegetables", "Curd"],
  },
  Snack: {
    icon: "🍎",
    description: "A light, practical snack to keep your energy steady.",
    calories: "200 kcal",
    protein: "8 g",
    carbs: "28 g",
    ingredients: ["Apple", "Peanut Butter", "Almonds"],
  },
  Dinner: {
    icon: "🍽️",
    description: "A filling dinner to close the day with balanced nutrition.",
    calories: "550 kcal",
    protein: "28 g",
    carbs: "60 g",
    ingredients: ["Chapati", "Paneer", "Dal", "Mixed Vegetables", "Salad"],
  },
};

function Diet({ todayMeals, addMeal, removeMeal }) {
  const [selectedMeal, setSelectedMeal] = useState(null);

  const totals = todayMeals.reduce(
    (acc, name) => {
      const meal = meals[name];
      acc.calories += Number(meal.calories.replace(" kcal", ""));
      acc.protein += Number(meal.protein.replace(" g", ""));
      acc.carbs += Number(meal.carbs.replace(" g", ""));
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0 }
  );

  return (
    <main className="diet-page page-shell">
      <div className="page-header">
        <span className="eyebrow">NUTRITION</span>
        <h1>Fuel your day better.</h1>
        <p>Choose a meal, review its nutrition, and keep your daily intake organized.</p>
      </div>

      {!selectedMeal ? (
        <>
          <section className="meal-grid">
            {Object.entries(meals).map(([name, meal]) => (
              <article className="meal-card soft-card" key={name}>
                <div className="meal-card-top">
                  <span className="large-meal-icon">{meal.icon}</span>
                  <span className="meal-tag">{name}</span>
                </div>
                <h2>{name}</h2>
                <p>{meal.description}</p>

                <div className="meal-pills">
                  <span>{meal.calories}</span>
                  <span>{meal.protein} protein</span>
                  <span>{meal.carbs} carbs</span>
                </div>

                <button className="primary-btn" onClick={() => setSelectedMeal(name)}>
                  View meal
                </button>
              </article>
            ))}
          </section>

          {todayMeals.length > 0 && (
            <section className="nutrition-summary-card soft-card">
              <div className="summary-title">
                <div>
                  <span className="section-kicker">TODAY</span>
                  <h2>Today's nutrition</h2>
                </div>
                <span>{todayMeals.length} logged meal{todayMeals.length > 1 ? "s" : ""}</span>
              </div>

              <div className="summary-metrics">
                <div><span>Calories</span><strong>{totals.calories}</strong><small>kcal</small></div>
                <div><span>Protein</span><strong>{totals.protein}</strong><small>g</small></div>
                <div><span>Carbs</span><strong>{totals.carbs}</strong><small>g</small></div>
              </div>

              <div className="logged-meals">
                {todayMeals.map((name, index) => (
                  <div className="logged-meal" key={`${name}-${index}`}>
                    <span className="logged-icon">{meals[name].icon}</span>
                    <div>
                      <strong>{name}</strong>
                      <span>{meals[name].calories} · {meals[name].protein} protein</span>
                    </div>
                    <button className="danger-btn" onClick={() => removeMeal(index, meals[name])}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="meal-details-card soft-card">
          <button className="ghost-btn" onClick={() => setSelectedMeal(null)}>
            ← Back to meals
          </button>

          <div className="meal-detail-head">
            <span className="large-meal-icon">{meals[selectedMeal].icon}</span>
            <div>
              <span className="meal-tag">{selectedMeal}</span>
              <h2>{selectedMeal} meal</h2>
              <p>{meals[selectedMeal].description}</p>
            </div>
          </div>

          <div className="detail-nutrition">
            <div><span>Calories</span><strong>{meals[selectedMeal].calories}</strong></div>
            <div><span>Protein</span><strong>{meals[selectedMeal].protein}</strong></div>
            <div><span>Carbs</span><strong>{meals[selectedMeal].carbs}</strong></div>
          </div>

          <div className="ingredient-box">
            <h3>Ingredients</h3>
            <div className="ingredient-list">
              {meals[selectedMeal].ingredients.map((item) => (
                <span key={item}>✓ {item}</span>
              ))}
            </div>
          </div>

          <button
            className="primary-btn"
            onClick={() => {
              addMeal(selectedMeal, meals[selectedMeal]);
              setSelectedMeal(null);
            }}
          >
            Add to today's meals
          </button>
        </section>
      )}
    </main>
  );
}

export default Diet;
