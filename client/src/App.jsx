import { useEffect, useState } from "react";
import "./App.css";

const FACTOR_DEFAULTS = {
  demandDensity: 25,
  demographicFit: 20,
  competitionScore: 20,
  accessibility: 15,
  costEfficiency: 20,
};

function App() {
  const [businessType, setBusinessType] = useState("");
  const [weights, setWeights] = useState(FACTOR_DEFAULTS);
  const [results, setResults] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runRecommendation = async () => {
    setLoading(true);
    setError(null);
    try {
      const normalizedWeights = Object.fromEntries(
        Object.entries(weights).map(([k, v]) => [k, v / 100])
      );
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessType, weights: normalizedWeights }),
      });
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runRecommendation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-shell">
      <h1>Stratara — Ranking POC</h1>
      <p className="tagline">
        Proof-of-concept: ranked, explainable location scoring. Not the
        product — see disclaimer below.
      </p>

      <div className="disclaimer">
        ⚠ Demo data only. Locations, scores, and rationale below are
        illustrative and fabricated for this POC — not sourced from any real
        market-data provider. Business type is not yet wired into scoring
        logic (that depends on the still-unsourced MVP boundary spec).
      </div>

      <div className="controls">
        <label>
          Business type (not yet used in scoring)
          <input
            type="text"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            placeholder="e.g. coffee shop"
          />
        </label>

        <div className="weights">
          <h3>Factor weights</h3>
          {Object.entries(weights).map(([key, value]) => (
            <label key={key} className="weight-row">
              <span>{key}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) =>
                  setWeights((w) => ({ ...w, [key]: Number(e.target.value) }))
                }
              />
              <span className="weight-value">{value}</span>
            </label>
          ))}
        </div>

        <button onClick={runRecommendation} disabled={loading}>
          {loading ? "Scoring..." : "Re-run ranking"}
        </button>
      </div>

      {error && <p className="error">Error: {error}</p>}

      {results && (
        <div className="results">
          <p className="results-disclaimer">{results.dataDisclaimer}</p>
          <ol className="ranking-list">
            {results.results.map((loc) => (
              <li key={loc.id} className="ranking-item">
                <button
                  className="ranking-header"
                  onClick={() =>
                    setExpandedId(expandedId === loc.id ? null : loc.id)
                  }
                >
                  <span className="rank">#{loc.rank}</span>
                  <span className="name">{loc.name}</span>
                  <span className="score">{loc.score}</span>
                  <span className="toggle">
                    {expandedId === loc.id ? "▲" : "▼"}
                  </span>
                </button>

                {expandedId === loc.id && (
                  <div className="breakdown">
                    {loc.breakdown.map((f) => (
                      <div key={f.factor} className="factor-row">
                        <div className="factor-label">
                          {f.label} ({f.value}/100, weight {Math.round(f.weight * 100)}%)
                        </div>
                        <div className="factor-rationale">{f.rationale}</div>
                        <div className="factor-contribution">
                          contributes {f.contribution} pts
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
