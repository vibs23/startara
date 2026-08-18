import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then(setHealth)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="app-shell">
      <h1>Stratara</h1>
      <p className="tagline">
        AI-powered commercial expansion intelligence platform.
      </p>

      <div className="status-card">
        <h2>Build status</h2>
        <p>
          This is a scaffold, not a product yet. No feature pages exist
          because the Stages 1-9 MVP boundary spec hasn't been sourced into
          this repo. Everything below is infrastructure verification, not
          Stratara functionality.
        </p>

        <h3>Backend connectivity</h3>
        {error && <p className="error">API unreachable: {error}</p>}
        {!error && !health && <p>Checking API...</p>}
        {health && (
          <pre className="health-json">{JSON.stringify(health, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}

export default App;
