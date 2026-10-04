import "./Progress.css";

function parseWorkoutDate(workout) {
  if (!workout?.date) return null;

  const date = new Date(workout.date);

  return Number.isNaN(date.getTime()) ? null : date;
}

function getDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

function Progress({ workoutHistory }) {
  const today = new Date();

  const startToday = new Date(today);
  startToday.setHours(0, 0, 0, 0);

  const dayIndex = startToday.getDay();
  const mondayOffset = dayIndex === 0 ? 6 : dayIndex - 1;

  const startWeek = new Date(startToday);
  startWeek.setDate(startWeek.getDate() - mondayOffset);

  const endWeek = new Date(startWeek);
  endWeek.setDate(endWeek.getDate() + 6);
  endWeek.setHours(23, 59, 59, 999);

  const weeklyWorkouts = workoutHistory.filter((workout) => {
    const date = parseWorkoutDate(workout);

    return date && date >= startWeek && date <= endWeek;
  });

  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const weeklyActivity = dayNames.map((day) => ({
    day,
    count: 0,
    width: 0,
  }));

  weeklyWorkouts.forEach((workout) => {
    const date = parseWorkoutDate(workout);

    if (!date) return;

    const name = date.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const row = weeklyActivity.find((item) => item.day === name);

    if (row) {
      row.count += 1;
      row.width = Math.min(row.count * 28, 100);
    }
  });

  const dates = [
    ...new Set(
      workoutHistory
        .map(parseWorkoutDate)
        .filter(Boolean)
        .map(getDateKey)
    ),
  ].sort().reverse();

  let streak = 0;

  if (dates.length) {
    const yesterday = new Date(startToday);
    yesterday.setDate(yesterday.getDate() - 1);

    const latest = dates[0];
    const todayKey = getDateKey(startToday);
    const yesterdayKey = getDateKey(yesterday);

    if (latest === todayKey || latest === yesterdayKey) {
      streak = 1;

      for (let i = 0; i < dates.length - 1; i += 1) {
        const a = new Date(dates[i]);
        const b = new Date(dates[i + 1]);

        const diff = Math.round((a - b) / 86400000);

        if (diff === 1) {
          streak += 1;
        } else {
          break;
        }
      }
    }
  }

  const typeCounts = {};

  workoutHistory.forEach((workout) => {
    if (!workout?.type) return;

    typeCounts[workout.type] =
      (typeCounts[workout.type] || 0) + 1;
  });

  const typeEntries = Object.entries(typeCounts);

  const weeklyGoal = 5;

  const goalProgress = Math.min(
    (weeklyWorkouts.length / weeklyGoal) * 100,
    100
  );

  return (
    <main className="progress-page page-shell">
      <div className="page-header">
        <span className="eyebrow">PROGRESS</span>

        <h1>See the work add up.</h1>

        <p>
          Track your consistency, weekly activity, and workout history
          in one place.
        </p>
      </div>

      <section className="progress-stat-grid">
        <div className="progress-stat soft-card">
          <span>ALL TIME</span>
          <strong>{workoutHistory.length}</strong>
          <small>total workouts</small>
        </div>

        <div className="progress-stat soft-card">
          <span>THIS WEEK</span>
          <strong>{weeklyWorkouts.length}</strong>
          <small>completed sessions</small>
        </div>

        <div className="progress-stat soft-card">
          <span>CURRENT STREAK</span>
          <strong>{streak}</strong>
          <small>consecutive workout days</small>
        </div>

        <div className="progress-stat soft-card">
          <span>WEEKLY GOAL</span>
          <strong>{Math.round(goalProgress)}%</strong>
          <small>
            {weeklyWorkouts.length} of {weeklyGoal} workouts
          </small>
        </div>
      </section>

      <section className="progress-main-grid">
        <div className="progress-card soft-card activity-card">
          <div className="card-heading">
            <div>
              <span className="section-kicker">ACTIVITY</span>
              <h2>This week</h2>
            </div>

            <span>Mon — Sun</span>
          </div>

          <div className="weekly-list">
            {weeklyActivity.map((day) => (
              <div className="weekly-row" key={day.day}>
                <span className="weekly-day">
                  {day.day.slice(0, 3)}
                </span>

                <div className="activity-track">
                  <span
                    style={{
                      width: `${day.width}%`,
                    }}
                  />
                </div>

                <strong className="weekly-count">
                  {day.count}
                </strong>
              </div>
            ))}
          </div>
        </div>

        <div className="goal-panel soft-card">
          <div className="goal-header">
            <div>
              <span className="section-kicker">TARGET</span>
              <h2>Weekly workout goal</h2>
            </div>
          </div>

          <div className="goal-content">
            <div
              className="goal-circle"
              style={{
                "--goal-progress": `${goalProgress * 3.6}deg`,
              }}
            >
              <div className="goal-circle-inner">
                <strong>{Math.round(goalProgress)}%</strong>
                <span>complete</span>
              </div>
            </div>

            <div className="goal-details">
              <div className="goal-number">
                <strong>{weeklyWorkouts.length}</strong>
                <span>/ {weeklyGoal}</span>
              </div>

              <p>
                {goalProgress >= 100
                  ? "You reached this week's target."
                  : `${weeklyGoal - weeklyWorkouts.length} workout${
                      weeklyGoal - weeklyWorkouts.length === 1
                        ? ""
                        : "s"
                    } remaining this week.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {typeEntries.length > 0 && (
        <section className="progress-card soft-card">
          <div className="card-heading">
            <div>
              <span className="section-kicker">BREAKDOWN</span>
              <h2>Workout mix</h2>
            </div>
          </div>

          <div className="type-list">
            {typeEntries.map(([type, count]) => {
              const percentage = workoutHistory.length
                ? (count / workoutHistory.length) * 100
                : 0;

              return (
                <div className="type-row" key={type}>
                  <div className="type-info">
                    <strong>{type}</strong>

                    <span>
                      {count} session{count > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="activity-track type-track">
                    <span
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <b>{Math.round(percentage)}%</b>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="progress-card soft-card">
        <div className="card-heading">
          <div>
            <span className="section-kicker">HISTORY</span>
            <h2>Recent workouts</h2>
          </div>

          <span>Latest 10</span>
        </div>

        {workoutHistory.length === 0 ? (
          <div className="empty-state">
            <span>🏁</span>

            <strong>No workouts yet</strong>

            <p>
              Complete your first workout to start building your
              progress history.
            </p>
          </div>
        ) : (
          <div className="history-list">
            {[...workoutHistory]
              .reverse()
              .slice(0, 10)
              .map((workout, index) => {
                const date = parseWorkoutDate(workout);

                const formatted = date
                  ? date.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "Unknown date";

                return (
                  <div
                    className="history-row"
                    key={`${workout.type}-${index}`}
                  >
                    <span className="history-icon">✓</span>

                    <div>
                      <strong>{workout.type}</strong>

                      <span>
                        {workout.exercises} exercises · {formatted}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </section>
    </main>
  );
}

export default Progress;