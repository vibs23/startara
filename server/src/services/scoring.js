/**
 * Rule-based, transparent scoring engine — POC ONLY.
 *
 * This is deliberately NOT the "explainable AI reasoning" the product
 * vision describes. It's a weighted average with a human-readable
 * breakdown, built to prove out one thing: that ranked recommendations
 * can be shown with a transparent, factor-by-factor rationale instead of
 * a black-box number. The real explainability layer (LLM-generated
 * reasoning grounded in sourced data) is separate, unbuilt work that
 * depends on the data-provenance and neutrality/bias standards still
 * flagged as open in the README.
 */

export const DEFAULT_WEIGHTS = {
  demandDensity: 0.25,
  demographicFit: 0.2,
  competitionScore: 0.2, // derived: 100 - competitionLevel
  accessibility: 0.15,
  costEfficiency: 0.2,
};

const FACTOR_LABELS = {
  demandDensity: "Demand density",
  demographicFit: "Demographic fit",
  competitionScore: "Competitive openness",
  accessibility: "Accessibility",
  costEfficiency: "Cost efficiency",
};

function normalizeWeights(weights) {
  const total = Object.values(weights).reduce((sum, w) => sum + w, 0);
  if (total <= 0) return DEFAULT_WEIGHTS;
  const normalized = {};
  for (const key of Object.keys(weights)) {
    normalized[key] = weights[key] / total;
  }
  return normalized;
}

function rationaleFor(factorKey, value) {
  const label = FACTOR_LABELS[factorKey];
  if (value >= 75) return `${label} is a strong advantage here.`;
  if (value >= 55) return `${label} is moderately favorable.`;
  if (value >= 35) return `${label} is a mild drag on this location's score.`;
  return `${label} is a significant weakness for this location.`;
}

/**
 * Scores and ranks a list of locations against a set of factor weights.
 * Returns each location with its total score and a per-factor
 * breakdown so the ranking is auditable, not just a bare number.
 */
export function scoreLocations(locations, weightOverrides = {}) {
  const weights = normalizeWeights({ ...DEFAULT_WEIGHTS, ...weightOverrides });

  const scored = locations.map((loc) => {
    const factors = {
      demandDensity: loc.demandDensity,
      demographicFit: loc.demographicFit,
      competitionScore: 100 - loc.competitionLevel,
      accessibility: loc.accessibility,
      costEfficiency: loc.costEfficiency,
    };

    const breakdown = Object.entries(factors).map(([key, value]) => ({
      factor: key,
      label: FACTOR_LABELS[key],
      value,
      weight: weights[key],
      contribution: Math.round(value * weights[key] * 100) / 100,
      rationale: rationaleFor(key, value),
    }));

    const totalScore =
      Math.round(
        breakdown.reduce((sum, f) => sum + f.contribution, 0) * 100
      ) / 100;

    return {
      id: loc.id,
      name: loc.name,
      score: totalScore,
      breakdown,
    };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .map((loc, index) => ({ rank: index + 1, ...loc }));
}
