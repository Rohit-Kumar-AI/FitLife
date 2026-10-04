import "./Home.css";

function Home({
  setPage,
  nutrition,
  water,
  addWater,
  resetWater,
  sleep,
  addSleep,
  removeSleep,
  resetSleep,
  steps,
  addSteps,
  resetSteps,
}) {
  const dailyStepGoal = 10000;
  const waterGoal = 3;
  const sleepGoal = 8;
  const calorieGoal = 2000;

  const safeSteps = Math.max(Number(steps) || 0, 0);
  const safeWater = Math.max(Number(water) || 0, 0);
  const safeSleep = Math.max(Number(sleep) || 0, 0);

  const calories = Math.max(Number(nutrition?.calories) || 0, 0);

  const stepPercent = Math.min(
    Math.round((safeSteps / dailyStepGoal) * 100),
    100
  );

  const waterPercent = Math.min(
    Math.round((safeWater / waterGoal) * 100),
    100
  );

  const sleepPercent = Math.min(
    Math.round((safeSleep / sleepGoal) * 100),
    100
  );

  const caloriePercent = Math.min(
    Math.round((calories / calorieGoal) * 100),
    100
  );

  const today = new Date();

  const dateText = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <main className="home-page page-shell">

      <section className="dashboard-hero">

        <div className="hero-copy">

          <span className="hero-eyebrow">
            TODAY · {dateText.toUpperCase()}
          </span>

          <h1>
            Good morning, Rohit 👋
          </h1>

          <p>
            Keep the momentum going. A few small actions today can make a big
            difference to your routine.
          </p>

          <div className="hero-actions">

            <button
              className="primary-button"
              onClick={() => setPage("workout")}
            >
              Start workout
            </button>

            <button
              className="secondary-button"
              onClick={() => setPage("diet")}
            >
              Log a meal
            </button>

          </div>

        </div>

        <div className="hero-goal">

          <div
            className="goal-orbit"
            style={{
              "--goal-progress": `${stepPercent}%`,
            }}
          >
            <div>
              <strong>{stepPercent}%</strong>
              <span>daily goal</span>
            </div>
          </div>

          <div className="hero-goal-copy">

            <strong>Today's activity</strong>

            <span>
              {safeSteps.toLocaleString()} of{" "}
              {dailyStepGoal.toLocaleString()} steps
            </span>

            <small>
              {stepPercent >= 100
                ? "Daily goal completed. Great work!"
                : "Stay active and keep moving."}
            </small>

          </div>

        </div>

      </section>

      <section className="section-block">

        <div className="section-heading">

          <div>
            <span className="section-kicker">
              OVERVIEW
            </span>

            <h2>
              Today's activity
            </h2>
          </div>

          <span className="section-note">
            Updates automatically
          </span>

        </div>

        <div className="metrics-grid">

          {/* Calories */}

          <div className="metric-card soft-card">

            <div className="metric-top">

              <span className="metric-icon">
                🔥
              </span>

              <span className="metric-label">
                Calories
              </span>

            </div>

            <div className="metric-value">
              {calories} kcal
            </div>

            <div className="metric-detail">
              {caloriePercent}% of {calorieGoal} kcal
            </div>

            <div className="metric-track">
              <span
                style={{
                  width: `${caloriePercent}%`,
                }}
              />
            </div>

            <button
              className="card-action"
              onClick={() => setPage("diet")}
            >
              Add meal
            </button>

          </div>

          {/* Water */}

          <div className="metric-card soft-card">

            <div className="metric-top">

              <span className="metric-icon">
                💧
              </span>

              <span className="metric-label">
                Water
              </span>

            </div>

            <div className="metric-value">
              {safeWater.toFixed(2)} L
            </div>

            <div className="metric-detail">
              {waterPercent}% of {waterGoal} L
            </div>

            <div className="metric-track">
              <span
                style={{
                  width: `${waterPercent}%`,
                }}
              />
            </div>

            <div className="mini-actions">

              <button
                className="mini-primary"
                onClick={addWater}
              >
                +250 ml
              </button>

              <button
                className="mini-secondary"
                onClick={resetWater}
              >
                Reset
              </button>

            </div>

          </div>

          {/* Steps */}

          <div className="metric-card soft-card">

            <div className="metric-top">

              <span className="metric-icon">
                🏋️
              </span>

              <span className="metric-label">
                Steps
              </span>

            </div>

            <div className="metric-value">
              {safeSteps.toLocaleString()}
            </div>

            <div className="metric-detail">
              {stepPercent}% of {dailyStepGoal.toLocaleString()}
            </div>

            <div className="metric-track">
              <span
                style={{
                  width: `${stepPercent}%`,
                }}
              />
            </div>

            <div className="mini-actions">

              <button
                className="mini-primary"
                onClick={addSteps}
              >
                +500
              </button>

              <button
                className="mini-secondary"
                onClick={resetSteps}
              >
                Reset
              </button>

            </div>

          </div>

          {/* Sleep */}

          <div className="metric-card soft-card">

            <div className="metric-top">

              <span className="metric-icon">
                😴
              </span>

              <span className="metric-label">
                Sleep
              </span>

            </div>

            <div className="metric-value">
              {safeSleep.toFixed(1)} hrs
            </div>

            <div className="metric-detail">
              {sleepPercent}% of {sleepGoal} hrs
            </div>

            <div className="metric-track">
              <span
                style={{
                  width: `${sleepPercent}%`,
                }}
              />
            </div>

            <div className="mini-actions">

              <button
                className="mini-primary"
                onClick={addSleep}
              >
                +30 min
              </button>

              <button
                className="mini-secondary"
                onClick={removeSleep}
              >
                −30 min
              </button>

              <button
                className="mini-secondary"
                onClick={resetSleep}
              >
                Reset
              </button>

            </div>

          </div>

        </div>

      </section>

      <section className="section-block">

        <div className="section-heading">

          <div>
            <span className="section-kicker">
              QUICK ACTIONS
            </span>

            <h2>
              Keep your routine moving
            </h2>
          </div>

        </div>

        <div className="quick-grid">

          <button
            className="quick-card soft-card"
            onClick={() => setPage("workout")}
          >

            <span className="quick-icon">
              🏋️
            </span>

            <div>
              <strong>
                Start a workout
              </strong>

              <small>
                Pick a session and start training.
              </small>
            </div>

            <span className="arrow">
              →
            </span>

          </button>

          <button
            className="quick-card soft-card"
            onClick={() => setPage("diet")}
          >

            <span className="quick-icon">
              🥗
            </span>

            <div>
              <strong>
                Track nutrition
              </strong>

              <small>
                Log meals and monitor your daily intake.
              </small>
            </div>

            <span className="arrow">
              →
            </span>

          </button>

          <button
            className="quick-card soft-card"
            onClick={() => setPage("progress")}
          >

            <span className="quick-icon">
              📈
            </span>

            <div>
              <strong>
                View progress
              </strong>

              <small>
                See your workouts and consistency.
              </small>
            </div>

            <span className="arrow">
              →
            </span>

          </button>

        </div>

      </section>

    </main>
  );
}

export default Home;