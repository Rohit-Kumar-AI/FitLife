import { useEffect, useState } from "react";
import "./Profile.css";

const defaultProfile = {
  name: "Rohit Kumar",
  age: "20",
  gender: "Male",
  height: "175",
  weight: "68",
  goal: "Build Muscle",
  activity: "Moderate",
};

function Profile() {
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("fitlife_profile");
      return saved ? JSON.parse(saved) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  useEffect(() => {
    localStorage.setItem("fitlife_profile", JSON.stringify(profile));
  }, [profile]);

  const change = (event) =>
    setProfile({ ...profile, [event.target.name]: event.target.value });

  const height = Number(profile.height);
  const weight = Number(profile.weight);
  const bmi = height > 0 && weight > 0 ? weight / ((height / 100) ** 2) : 0;

  const status =
    bmi === 0 ? "Enter details" :
    bmi < 18.5 ? "Underweight" :
    bmi < 25 ? "Normal" :
    bmi < 30 ? "Overweight" : "Obesity";

  const healthyRange = height > 0
    ? `${(18.5 * (height / 100) ** 2).toFixed(1)} – ${(24.9 * (height / 100) ** 2).toFixed(1)} kg`
    : "0 – 0 kg";

  const bmiPosition = Math.min(Math.max((bmi / 40) * 100, 0), 100);

  return (
    <main className="profile-page page-shell">
      <div className="page-header">
        <span className="eyebrow">PROFILE</span>
        <h1>Your personal dashboard.</h1>
        <p>Keep your basic fitness information up to date so FitLife can stay personalized.</p>
      </div>

      {editing ? (
        <section className="profile-edit soft-card">
          <div className="profile-card-title">
            <div>
              <span className="section-kicker">SETTINGS</span>
              <h2>Edit profile</h2>
            </div>
          </div>

          <div className="profile-form">
            <label>Name<input name="name" value={profile.name} onChange={change} /></label>
            <label>Age<input name="age" type="number" min="1" value={profile.age} onChange={change} /></label>
            <label>Gender<select name="gender" value={profile.gender} onChange={change}><option>Male</option><option>Female</option><option>Other</option></select></label>
            <label>Height (cm)<input name="height" type="number" min="1" value={profile.height} onChange={change} /></label>
            <label>Weight (kg)<input name="weight" type="number" min="1" value={profile.weight} onChange={change} /></label>
            <label>Fitness goal<select name="goal" value={profile.goal} onChange={change}><option>Build Muscle</option><option>Lose Weight</option><option>Maintain Weight</option><option>Improve Fitness</option></select></label>
            <label>Activity level<select name="activity" value={profile.activity} onChange={change}><option>Low</option><option>Moderate</option><option>High</option></select></label>
          </div>

          <div className="profile-actions">
            <button className="primary-btn" onClick={() => setEditing(false)}>Save changes</button>
            <button className="ghost-btn" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </section>
      ) : (
        <>
          <section className="profile-top-grid">
            <div className="identity-card soft-card">
              <div className="avatar">RK</div>
              <div>
                <span className="section-kicker">PROFILE</span>
                <h2>{profile.name}</h2>
                <p>B.Tech CSE (AI)</p>
              </div>
              <button className="secondary-btn" onClick={() => setEditing(true)}>Edit profile</button>
            </div>

            <div className="details-card soft-card">
              <div className="profile-card-title">
                <div>
                  <span className="section-kicker">PERSONAL INFO</span>
                  <h2>Details</h2>
                </div>
              </div>

              <div className="details-grid">
                <div><span>Age</span><strong>{profile.age} years</strong></div>
                <div><span>Gender</span><strong>{profile.gender}</strong></div>
                <div><span>Height</span><strong>{profile.height} cm</strong></div>
                <div><span>Weight</span><strong>{profile.weight} kg</strong></div>
                <div><span>Goal</span><strong>{profile.goal}</strong></div>
                <div><span>Activity</span><strong>{profile.activity}</strong></div>
              </div>
            </div>
          </section>

          <section className="bmi-card soft-card">
            <div className="profile-card-title">
              <div>
                <span className="section-kicker">BODY METRICS</span>
                <h2>BMI snapshot</h2>
              </div>
              <span className="bmi-badge">{status}</span>
            </div>

            <div className="bmi-summary">
              <div className="bmi-number"><strong>{bmi.toFixed(1)}</strong><span>Current BMI</span></div>
              <div><span>Healthy range</span><strong>{healthyRange}</strong></div>
              <div><span>Weight</span><strong>{profile.weight} kg</strong></div>
            </div>

            <div className="bmi-scale">
              <span className="bmi-fill" />
              <span className="bmi-marker" style={{ left: `${bmiPosition}%` }} />
            </div>
            <div className="bmi-labels"><span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obesity</span></div>
          </section>
        </>
      )}
    </main>
  );
}

export default Profile;
