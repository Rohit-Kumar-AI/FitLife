import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Workout from "./pages/Workout";
import Diet from "./pages/Diet";
import Progress from "./pages/Progress";
import Achievements from "./pages/Achievements";
import Profile from "./pages/Profile";

function getStoredData(key, defaultValue) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function getTodayKey() {
  const today = new Date();

  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(today.getDate()).padStart(2, "0")}`;
}

const defaultDailyData = {
  calories: 0,
  protein: 0,
  carbs: 0,
  todayMeals: [],
  water: 0,
  sleep: 0,
  steps: 0,
};

function getInitialDailyData() {
  const today = getTodayKey();
  const saved = getStoredData("fitlife_daily_data", null);

  if (saved?.date === today && saved?.data) {
    return saved.data;
  }

  const nutrition = getStoredData("fitlife_nutrition", {
    calories: 0,
    protein: 0,
    carbs: 0,
  });

  const meals = getStoredData("fitlife_today_meals", []);
  const water = getStoredData("fitlife_water", 0);
  const sleep = getStoredData("fitlife_sleep", 0);
  const steps = getStoredData("fitlife_steps", 0);

  const hasLegacyData =
    nutrition.calories > 0 ||
    nutrition.protein > 0 ||
    nutrition.carbs > 0 ||
    meals.length > 0 ||
    water > 0 ||
    sleep > 0 ||
    steps > 0;

  if (hasLegacyData && !saved) {
    return {
      ...defaultDailyData,
      calories: nutrition.calories,
      protein: nutrition.protein,
      carbs: nutrition.carbs,
      todayMeals: meals,
      water,
      sleep,
      steps,
    };
  }

  return defaultDailyData;
}

function App() {
  const [page, setPage] = useState("home");

  const [darkMode, setDarkMode] = useState(() =>
    getStoredData("fitlife_dark_mode", false)
  );

  const [workoutHistory, setWorkoutHistory] = useState(() =>
    getStoredData("fitlife_workout_history", [])
  );

  const [dailyData, setDailyData] = useState(getInitialDailyData);

  const [currentDate, setCurrentDate] = useState(getTodayKey);

  // Dark mode
  useEffect(() => {
    localStorage.setItem("fitlife_dark_mode", JSON.stringify(darkMode));
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // Permanent workout history
  useEffect(() => {
    localStorage.setItem(
      "fitlife_workout_history",
      JSON.stringify(workoutHistory)
    );
  }, [workoutHistory]);

  // Save daily data
  useEffect(() => {
    localStorage.setItem(
      "fitlife_daily_data",
      JSON.stringify({
        date: currentDate,
        data: dailyData,
      })
    );

    // Keep old keys for compatibility
    localStorage.setItem(
      "fitlife_nutrition",
      JSON.stringify({
        calories: dailyData.calories,
        protein: dailyData.protein,
        carbs: dailyData.carbs,
      })
    );

    localStorage.setItem(
      "fitlife_today_meals",
      JSON.stringify(dailyData.todayMeals)
    );

    localStorage.setItem("fitlife_water", JSON.stringify(dailyData.water));
    localStorage.setItem("fitlife_sleep", JSON.stringify(dailyData.sleep));
    localStorage.setItem("fitlife_steps", JSON.stringify(dailyData.steps));
  }, [dailyData, currentDate]);

  // Automatically detect a new day
  useEffect(() => {
    const checkNewDay = () => {
      const today = getTodayKey();

      if (today !== currentDate) {
        setCurrentDate(today);
        setDailyData({ ...defaultDailyData });
      }
    };

    checkNewDay();

    const interval = setInterval(checkNewDay, 60 * 1000);

    return () => clearInterval(interval);
  }, [currentDate]);

  // Workout
  const addWorkout = (workout) => {
    setWorkoutHistory((current) => [...current, workout]);
  };

  // Meals
  const addMeal = (name, data) => {
    const calories = Number(data.calories.replace(" kcal", ""));
    const protein = Number(data.protein.replace(" g", ""));
    const carbs = Number(data.carbs.replace(" g", ""));

    setDailyData((current) => ({
      ...current,
      todayMeals: [...current.todayMeals, name],
      calories: current.calories + calories,
      protein: current.protein + protein,
      carbs: current.carbs + carbs,
    }));
  };

  const removeMeal = (index, data) => {
    const calories = Number(data.calories.replace(" kcal", ""));
    const protein = Number(data.protein.replace(" g", ""));
    const carbs = Number(data.carbs.replace(" g", ""));

    setDailyData((current) => ({
      ...current,
      todayMeals: current.todayMeals.filter((_, i) => i !== index),
      calories: Math.max(current.calories - calories, 0),
      protein: Math.max(current.protein - protein, 0),
      carbs: Math.max(current.carbs - carbs, 0),
    }));
  };

  // Water
  const addWater = () => {
    setDailyData((current) => ({
      ...current,
      water: Math.min(
        Number((current.water + 0.25).toFixed(2)),
        5
      ),
    }));
  };

  const resetWater = () => {
    setDailyData((current) => ({
      ...current,
      water: 0,
    }));
  };

  // Sleep
  const addSleep = () => {
    setDailyData((current) => ({
      ...current,
      sleep: Math.min(
        Number((current.sleep + 0.5).toFixed(1)),
        12
      ),
    }));
  };

  const removeSleep = () => {
    setDailyData((current) => ({
      ...current,
      sleep: Math.max(
        Number((current.sleep - 0.5).toFixed(1)),
        0
      ),
    }));
  };

  const resetSleep = () => {
    setDailyData((current) => ({
      ...current,
      sleep: 0,
    }));
  };

  // Steps
  const addSteps = () => {
    setDailyData((current) => ({
      ...current,
      steps: current.steps + 500,
    }));
  };

  const resetSteps = () => {
    setDailyData((current) => ({
      ...current,
      steps: 0,
    }));
  };

  return (
    <div className="app">
      <Navbar
        page={page}
        setPage={setPage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {page === "home" && (
        <Home
          setPage={setPage}
          nutrition={dailyData}
          water={dailyData.water}
          addWater={addWater}
          resetWater={resetWater}
          sleep={dailyData.sleep}
          addSleep={addSleep}
          removeSleep={removeSleep}
          resetSleep={resetSleep}
          steps={dailyData.steps}
          addSteps={addSteps}
          resetSteps={resetSteps}
        />
      )}

      {page === "workout" && (
        <Workout addWorkout={addWorkout} />
      )}

      {page === "diet" && (
        <Diet
          todayMeals={dailyData.todayMeals}
          addMeal={addMeal}
          removeMeal={removeMeal}
        />
      )}

      {page === "progress" && (
        <Progress workoutHistory={workoutHistory} />
      )}

      {page === "achievements" && (
        <Achievements
          workoutHistory={workoutHistory}
          steps={dailyData.steps}
          water={dailyData.water}
          sleep={dailyData.sleep}
          todayMeals={dailyData.todayMeals}
        />
      )}

      {page === "profile" && <Profile />}
    </div>
  );
}

export default App;