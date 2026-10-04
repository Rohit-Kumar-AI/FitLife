import { useEffect, useMemo, useState } from "react";
import "./Workout.css";

const WORKOUTS = [
  {
    type: "Strength",
    icon: "💪",
    description: "Build strength and muscle with foundational movements.",
    exercises: ["Push Ups", "Squats", "Lunges", "Plank"],
  },
  {
    type: "Cardio",
    icon: "🏃",
    description: "Improve endurance and keep your heart rate moving.",
    exercises: ["Jumping Jacks", "High Knees", "Mountain Climbers", "Burpees"],
  },
  {
    type: "Flexibility",
    icon: "🧘",
    description: "Improve mobility, balance and everyday movement quality.",
    exercises: [
      "Neck Stretch",
      "Shoulder Stretch",
      "Hamstring Stretch",
      "Quad Stretch",
    ],
  },
  {
    type: "HIIT",
    icon: "🔥",
    description: "Fast, high-intensity intervals for a quick challenge.",
    exercises: ["Burpees", "Squat Jumps", "Mountain Climbers", "High Knees"],
  },
];

const EXERCISE_DURATION = 30;

function Workout({ addWorkout }) {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXERCISE_DURATION);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentExercise = useMemo(() => {
    if (!selectedWorkout) return null;
    return selectedWorkout.exercises[exerciseIndex];
  }, [selectedWorkout, exerciseIndex]);

  useEffect(() => {
    if (!selectedWorkout || isPaused || isComplete) return;

    const timer = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedWorkout, isPaused, isComplete, exerciseIndex]);

  useEffect(() => {
    if (!selectedWorkout || isPaused || isComplete) return;

    if (timeLeft === 0) {
      if (exerciseIndex < selectedWorkout.exercises.length - 1) {
        setExerciseIndex((current) => current + 1);
        setTimeLeft(EXERCISE_DURATION);
      } else {
        finishWorkout();
      }
    }
  }, [timeLeft, selectedWorkout, isPaused, isComplete, exerciseIndex]);

  const startWorkout = (workout) => {
    setSelectedWorkout(workout);
    setExerciseIndex(0);
    setTimeLeft(EXERCISE_DURATION);
    setIsPaused(false);
    setIsComplete(false);
  };

  const exitWorkout = () => {
    setSelectedWorkout(null);
    setExerciseIndex(0);
    setTimeLeft(EXERCISE_DURATION);
    setIsPaused(false);
    setIsComplete(false);
  };

  const nextExercise = () => {
    if (!selectedWorkout) return;

    if (exerciseIndex < selectedWorkout.exercises.length - 1) {
      setExerciseIndex((current) => current + 1);
      setTimeLeft(EXERCISE_DURATION);
      setIsPaused(false);
    } else {
      finishWorkout();
    }
  };

  const finishWorkout = () => {
    if (!selectedWorkout) return;

    setIsComplete(true);
    setIsPaused(true);

    if (addWorkout) {
      addWorkout({
        type: selectedWorkout.type,
        exercises: selectedWorkout.exercises.length,
        date: new Date().toISOString(),
      });
    }
  };

  const restartWorkout = () => {
    if (!selectedWorkout) return;

    setExerciseIndex(0);
    setTimeLeft(EXERCISE_DURATION);
    setIsPaused(false);
    setIsComplete(false);
  };

  const progress = selectedWorkout
    ? ((EXERCISE_DURATION - timeLeft) / EXERCISE_DURATION) * 100
    : 0;

  const circumference = 2 * Math.PI * 92;
  const dashOffset =
    circumference - (progress / 100) * circumference;

  if (selectedWorkout) {
    return (
      <main className="workout-page page-shell">
        <div className="page-header workout-header">
          <span className="eyebrow">WORKOUTS</span>
          <h1>Train with purpose.</h1>
          <p>
            Pick a session, start the timer, and build a routine you can
            repeat consistently.
          </p>
        </div>

        <section className="active-workout-card soft-card">
          <div className="workout-topbar">
            <button className="exit-button" onClick={exitWorkout}>
              ← Exit
            </button>

            <span>
              Exercise {exerciseIndex + 1} of{" "}
              {selectedWorkout.exercises.length}
            </span>
          </div>

          {isComplete ? (
            <div className="workout-complete">
              <div className="complete-icon">✓</div>

              <span className="section-kicker">WORKOUT COMPLETE</span>

              <h2>Great work!</h2>

              <p>
                You completed all {selectedWorkout.exercises.length}{" "}
                exercises in your {selectedWorkout.type.toLowerCase()}{" "}
                workout.
              </p>

              <div className="complete-actions">
                <button
                  className="primary-button"
                  onClick={restartWorkout}
                >
                  Do it again
                </button>

                <button
                  className="secondary-button"
                  onClick={exitWorkout}
                >
                  Back to workouts
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="active-workout-content">
                <span className="active-workout-type">
                  {selectedWorkout.type.toUpperCase()}
                </span>

                <h2>{currentExercise}</h2>

                <div className="timer-circle">
                  <svg
                    className="timer-svg"
                    viewBox="0 0 200 200"
                  >
                    <circle
                      className="timer-background"
                      cx="100"
                      cy="100"
                      r="92"
                    />

                    <circle
                      className="timer-progress"
                      cx="100"
                      cy="100"
                      r="92"
                      style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: dashOffset,
                      }}
                    />
                  </svg>

                  <div className="timer-content">
                    <strong>{timeLeft}</strong>
                    <span>seconds</span>
                  </div>
                </div>

                <div className="timer-actions">
                  <button
                    className="secondary-button"
                    onClick={() => setIsPaused((current) => !current)}
                  >
                    {isPaused ? "Resume" : "Pause"}
                  </button>

                  <button
                    className="primary-button"
                    onClick={nextExercise}
                  >
                    {exerciseIndex ===
                    selectedWorkout.exercises.length - 1
                      ? "Finish workout"
                      : "Next exercise"}
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="workout-page page-shell">
      <div className="page-header workout-header">
        <span className="eyebrow">WORKOUTS</span>
        <h1>Train with purpose.</h1>
        <p>
          Pick a session, start the timer, and build a routine you can
          repeat consistently.
        </p>
      </div>

      <section className="workout-grid">
        {WORKOUTS.map((workout) => (
          <button
            className="workout-option-card soft-card"
            key={workout.type}
            onClick={() => startWorkout(workout)}
          >
            <div className="workout-card-top">
              <div className="workout-icon">{workout.icon}</div>

              <span className="exercise-count">
                {workout.exercises.length} exercises
              </span>
            </div>

            <div className="workout-card-content">
              <h2>{workout.type}</h2>

              <p>{workout.description}</p>

              <span className="view-session">
                View session →
              </span>
            </div>
          </button>
        ))}
      </section>
    </main>
  );
}

export default Workout;