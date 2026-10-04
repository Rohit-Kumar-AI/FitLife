import { useEffect, useState } from "react";
import "./Workout.css";

const workouts = {
  Strength: {
    icon: "💪",
    color: "strength",
    description: "Build strength and muscle with foundational movements.",
    exercises: [
      { name: "Push Ups", duration: "3 sets × 12 reps" },
      { name: "Squats", duration: "3 sets × 15 reps" },
      { name: "Lunges", duration: "3 sets × 10 reps" },
      { name: "Plank", duration: "3 × 30 sec" },
    ],
  },
  Cardio: {
    icon: "🏃",
    color: "cardio",
    description: "Improve endurance and keep your heart rate moving.",
    exercises: [
      { name: "Jumping Jacks", duration: "3 × 30 sec" },
      { name: "High Knees", duration: "3 × 30 sec" },
      { name: "Mountain Climbers", duration: "3 × 20 reps" },
      { name: "Burpees", duration: "3 × 10 reps" },
    ],
  },
  Flexibility: {
    icon: "🧘",
    color: "flexibility",
    description: "Improve mobility, balance and everyday movement quality.",
    exercises: [
      { name: "Hamstring Stretch", duration: "30 sec" },
      { name: "Shoulder Stretch", duration: "30 sec" },
      { name: "Quad Stretch", duration: "30 sec" },
      { name: "Child's Pose", duration: "45 sec" },
    ],
  },
  HIIT: {
    icon: "🔥",
    color: "hiit",
    description: "Fast, high-intensity intervals for a quick challenge.",
    exercises: [
      { name: "Burpees", duration: "30 sec" },
      { name: "Jump Squats", duration: "30 sec" },
      { name: "High Knees", duration: "30 sec" },
      { name: "Mountain Climbers", duration: "30 sec" },
    ],
  },
};

function Workout({ addWorkout }) {
  const [selected, setSelected] = useState(null);
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const exercises = selected ? workouts[selected].exercises : [];

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          setRunning(false);
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  const chooseWorkout = (name) => {
    setSelected(name);
    setCurrent(0);
    setTimeLeft(30);
    setRunning(false);
    setStarted(false);
    setCompleted(false);
  };

  const begin = () => {
    setStarted(true);
    setTimeLeft(30);
    setRunning(true);
  };

  const next = () => {
    if (current < exercises.length - 1) {
      setCurrent((value) => value + 1);
      setTimeLeft(30);
      setRunning(true);
      return;
    }

    setRunning(false);
    setCompleted(true);

    addWorkout({
      type: selected,
      exercises: exercises.length,
      date: new Date().toISOString(),
    });
  };

  const exit = () => {
    setSelected(null);
    setCurrent(0);
    setTimeLeft(30);
    setRunning(false);
    setStarted(false);
    setCompleted(false);
  };

  return (
    <main className="workout-page page-shell">
      <div className="page-header">
        <span className="eyebrow">WORKOUTS</span>
        <h1>Train with purpose.</h1>
        <p>Pick a session, start the timer, and build a routine you can repeat consistently.</p>
      </div>

      {!selected && (
        <div className="workout-grid">
          {Object.entries(workouts).map(([name, data]) => (
            <button
              className={`workout-tile ${data.color}`}
              key={name}
              onClick={() => chooseWorkout(name)}
            >
              <div className="workout-tile-top">
                <span className="workout-big-icon">{data.icon}</span>
                <span>4 exercises</span>
              </div>
              <h2>{name}</h2>
              <p>{data.description}</p>
              <span className="workout-link">View session →</span>
            </button>
          ))}
        </div>
      )}

      {selected && !started && !completed && (
        <section className="session-card soft-card">
          <button className="ghost-btn" onClick={exit}>← Back to workouts</button>

          <div className="session-heading">
            <div>
              <span className="eyebrow">{selected.toUpperCase()}</span>
              <h2>{selected} session</h2>
              <p>{workouts[selected].description}</p>
            </div>
            <span className="session-count">{exercises.length} exercises</span>
          </div>

          <div className="exercise-list">
            {exercises.map((exercise, index) => (
              <div className="exercise-row" key={exercise.name}>
                <div className="exercise-number">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <strong>{exercise.name}</strong>
                  <span>{exercise.duration}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="primary-btn" onClick={begin}>Begin workout</button>
        </section>
      )}

      {selected && started && !completed && (
        <section className="timer-panel soft-card">
          <div className="timer-head">
            <button className="ghost-btn" onClick={exit}>← Exit</button>
            <span>Exercise {current + 1} of {exercises.length}</span>
          </div>

          <div className="timer-stage">
            <span className="eyebrow">{selected.toUpperCase()}</span>
            <h2>{exercises[current].name}</h2>

            <div className="timer-ring">
              <div>
                <strong>{timeLeft}</strong>
                <span>seconds</span>
              </div>
            </div>

            <div className="timer-actions">
              <button
                className={running ? "secondary-btn" : "primary-btn"}
                onClick={() => setRunning((value) => !value)}
              >
                {running ? "Pause" : timeLeft === 0 ? "Resume" : "Start"}
              </button>
              <button className="primary-btn" onClick={next}>
                {current === exercises.length - 1 ? "Complete workout" : "Next exercise"}
              </button>
            </div>
          </div>
        </section>
      )}

      {completed && (
        <section className="completion-card soft-card">
          <div className="completion-icon">✓</div>
          <span className="eyebrow">SESSION COMPLETE</span>
          <h2>Nice work.</h2>
          <p>You completed your {selected} workout and added it to your progress.</p>
          <button className="primary-btn" onClick={exit}>Choose another workout</button>
        </section>
      )}
    </main>
  );
}

export default Workout;
