import "./Achievements.css";

function Achievements({ workoutHistory, steps, water, sleep, todayMeals }) {
  const workoutCount = workoutHistory.length;

  const achievements = [
    ["🏆", "First workout", "Complete your first workout.", workoutCount >= 1],
    ["🔥", "3 workouts", "Complete three workouts.", workoutCount >= 3],
    ["💪", "5 workouts", "Complete five workouts.", workoutCount >= 5],
    ["🏃", "10 workouts", "Complete ten workouts.", workoutCount >= 10],
    ["💧", "Hydration goal", "Reach 3 liters of water in a day.", water >= 3],
    ["👣", "10K steps", "Reach 10,000 steps in a day.", steps >= 10000],
    ["😴", "Good sleep", "Reach 8 hours of sleep in a day.", sleep >= 8],
    ["🥗", "Healthy start", "Log your first meal.", todayMeals.length >= 1],
  ];

  const unlocked = achievements.filter((item) => item[3]).length;
  const progress = (unlocked / achievements.length) * 100;

  return (
    <main className="achievements-page page-shell">
      <div className="page-header">
        <span className="eyebrow">ACHIEVEMENTS</span>
        <h1>Small wins. Big momentum.</h1>
        <p>Unlock milestones as your routine becomes more consistent.</p>
      </div>

      <section className="achievement-banner soft-card">
        <div>
          <span className="section-kicker">YOUR COLLECTION</span>
          <h2>{unlocked} of {achievements.length} unlocked</h2>
          <p>Keep building your streak and daily habits.</p>
        </div>
        <div className="achievement-meter">
          <div><span style={{ width: `${progress}%` }} /></div>
          <strong>{Math.round(progress)}%</strong>
        </div>
      </section>

      <section className="achievement-grid">
        {achievements.map(([icon, title, description, isUnlocked]) => (
          <article className={`achievement-item soft-card ${isUnlocked ? "unlocked" : "locked"}`} key={title}>
            <div className="achievement-symbol">{icon}</div>
            <div className="achievement-copy">
              <div className="achievement-status">{isUnlocked ? "UNLOCKED" : "LOCKED"}</div>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
            <span className="achievement-check">{isUnlocked ? "✓" : "○"}</span>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Achievements;
