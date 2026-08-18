import { Router } from "express";
import { sampleLocations } from "../data/sampleLocations.js";
import { scoreLocations, DEFAULT_WEIGHTS } from "../services/scoring.js";

const router = Router();

// GET /api/recommendations/factors — expose the default weights so the
// client can build weight controls without hardcoding factor names twice.
router.get("/factors", (req, res) => {
  res.json({ weights: DEFAULT_WEIGHTS });
});

// POST /api/recommendations
// body: { businessType?: string, weights?: Partial<typeof DEFAULT_WEIGHTS> }
//
// businessType is accepted but NOT yet used to alter scoring — there's no
// validated logic yet for how business type should change factor weights.
// Echoed back only so the UI can display what was requested. Wiring
// businessType-specific weighting is real product logic that depends on
// the Stages 1-9 spec, not something to guess at here.
router.post("/", (req, res) => {
  const { businessType, weights } = req.body || {};

  const results = scoreLocations(sampleLocations, weights || {});

  res.json({
    businessType: businessType || null,
    dataDisclaimer:
      "Sample/illustrative data only — not sourced from a real data provider.",
    results,
  });
});

export default router;
