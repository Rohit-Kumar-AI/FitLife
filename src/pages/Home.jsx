import "./Home.css";

function MetricCard({ icon, label, value, detail, progress, children }) {
  return (
    <article className="metric-card soft-card">
      <div className="metric-top">
        <span className="metric-icon">{icon}</span>
        <span className="metric-label">{label}</span>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-detail">{detail}</div>
      <div className="metric-track">
        <span style={{ width: `${progress}%` }} />
      </div>
      {children}
    </article>
  );
}

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
  const calorieGoal = 2000;
  const waterGoal = 3;
  const stepGoal = 10000;
  const sleepGoal = 8;

  const calories = nutrition?.calories || 0;
  const calorieProgress = Math.min((calories / calorieGoal) * 100, 100);
  const waterProgress = Math.min((water / waterGoal) * 100, 100);
  const stepProgress = Math.min((steps / stepGoal) * 100, 100);
  const sleepProgress = Math.min((sleep / sleepGoal) * 100, 100);

  return (
    <main className="home-page page-shell">
      <section className="dashboard-hero">
        <div className="hero-copy">
          <span className="hero-eyebrow">TODAY · THURSDAY, OCT 1</span>
          <h1>Good morning, Rohit 👋</h1>
          <p>
            Keep the momentum going. A few small actions today can make a big
            difference to your routine.
          </p>

          <div className="hero-actions">
            <button className="primary-btn" onClick={() => setPage("workout")}>
              Start workout
            </button>
            <button className="secondary-btn" onClick={() => setPage("diet")}>
              Log a meal
            </button>
          </div>
        </div>

        <div className="hero-goal">
          <div className="goal-orbit">
            <div>
              <strong>{Math.round(stepProgress)}%</strong>
              <span>daily goal</span>
            </div>
          </div>
          <div className="hero-goal-copy">
            <strong>Today's activity</strong>
            <span>{steps.toLocaleString()} of {stepGoal.toLocaleString()} steps</span>
            <small>Stay active and keep moving.</small>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="section-kicker">OVERVIEW</span>
            <h2>Today's activity</h2>
          </div>
          <span className="section-note">Updates automatically</span>
        </div>

        <div className="metrics-grid">
          <MetricCard
            icon="🔥"
            label="Calories"
            value={`${calories} kcal`}
            detail={`${Math.round(calorieProgress)}% of ${calorieGoal} kcal`}
            progress={calorieProgress}
          >
            <button className="card-action" onClick={() => setPage("diet")}>
              Add meal
            </button>
          </MetricCard>

          <MetricCard
            icon="💧"
            label="Water"
            value={`${water.toFixed(2)} L`}
            detail={`${Math.round(waterProgress)}% of ${waterGoal} L`}
            progress={waterProgress}
          >
            <div className="mini-actions">
              <button className="mini-primary" onClick={addWater}>+250 ml</button>
              <button className="mini-secondary" onClick={resetWater}>Reset</button>
            </div>
          </MetricCard>

          <MetricCard
            icon="👣"
            label="Steps"
            value={steps.toLocaleString()}
            detail={`${Math.round(stepProgress)}% of ${stepGoal.toLocaleString()}`}
            progress={stepProgress}
          >
            <div className="mini-actions">
              <button className="mini-primary" onClick={addSteps}>+500</button>
              <button className="mini-secondary" onClick={resetSteps}>Reset</button>
            </div>
          </MetricCard>

          <MetricCard
            icon="😴"
            label="Sleep"
            value={`${sleep.toFixed(1)} hrs`}
            detail={`${Math.round(sleepProgress)}% of ${sleepGoal} hrs`}
            progress={sleepProgress}
          >
            <div className="mini-actions">
              <button className="mini-primary" onClick={addSleep}>+30 min</button>
              <button className="mini-secondary" onClick={removeSleep}>−30 min</button>
              <button className="mini-secondary" onClick={resetSleep}>Reset</button>
            </div>
          </MetricCard>
        </div>
      </section>

      <section className="quick-grid">
        <button className="quick-card soft-card" onClick={() => setPage("workout")}>
          <span className="quick-icon">💪</span>
          <span>
            <strong>Start a workout</strong>
            <small>Choose strength, cardio, HIIT or flexibility</small>
          </span>
          <span className="arrow">→</span>
        </button>

        <button className="quick-card soft-card" onClick={() => setPage("diet")}>
          <span className="quick-icon">🥗</span>
          <span>
            <strong>Plan today's meals</strong>
            <small>Track calories, protein and carbohydrates</small>
          </span>
          <span className="arrow">→</span>
        </button>

        <button className="quick-card soft-card" onClick={() => setPage("progress")}>
          <span className="quick-icon">📈</span>
          <span>
            <strong>View your progress</strong>
            <small>Check weekly activity and workout streak</small>
          </span>
          <span className="arrow">→</span>
        </button>
      </section>
    </main>
  );
}

export default Home;
