import "./Navbar.css";

const links = [
  ["home", "Dashboard"],
  ["workout", "Workouts"],
  ["diet", "Nutrition"],
  ["progress", "Progress"],
  ["achievements", "Achievements"],
  ["profile", "Profile"],
];

function Navbar({ page, setPage, darkMode, setDarkMode }) {
  return (
    <header className="navbar-wrap">
      <nav className="navbar page-shell">
        <button className="brand" onClick={() => setPage("home")}>
          <span className="brand-mark">F</span>
          <span>
            <strong>FitLife</strong>
            <small>Personal fitness</small>
          </span>
        </button>

        <div className="navbar-links">
          {links.map(([id, label]) => (
            <button
              key={id}
              className={`nav-link ${page === id ? "active" : ""}`}
              onClick={() => setPage(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          className="theme-toggle"
          onClick={() => setDarkMode((value) => !value)}
          title={darkMode ? "Light mode" : "Dark mode"}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <span>{darkMode ? "☀" : "☾"}</span>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
