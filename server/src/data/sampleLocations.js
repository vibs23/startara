/**
 * SAMPLE / ILLUSTRATIVE DATA ONLY.
 *
 * These figures are fabricated for demo purposes — they are NOT sourced
 * from any real market-data provider, census data, or commercial
 * database. Do not present this data, or scores derived from it, to any
 * external user as a real recommendation. This exists solely to prove
 * out the ranking + explainability mechanic before real data sourcing,
 * licensing, and provenance questions have been worked through (see
 * README "Blocking on" list — data-provenance standards are explicitly
 * flagged there as unresolved).
 *
 * Each factor is a 0-100 illustrative score:
 * - demandDensity: how large/dense the target customer base is assumed to be
 * - demographicFit: how well local demographics are assumed to match a
 *   typical customer profile for the business type
 * - competitionLevel: how saturated the market is assumed to be (higher =
 *   MORE competition, i.e. worse — inverted during scoring)
 * - accessibility: assumed foot traffic / transit / visibility
 * - costEfficiency: assumed affordability of rent/operating costs (higher =
 *   cheaper, i.e. better)
 */
export const sampleLocations = [
  {
    id: "austin-tx",
    name: "Austin, TX",
    demandDensity: 78,
    demographicFit: 82,
    competitionLevel: 70,
    accessibility: 74,
    costEfficiency: 55,
  },
  {
    id: "columbus-oh",
    name: "Columbus, OH",
    demandDensity: 62,
    demographicFit: 68,
    competitionLevel: 45,
    accessibility: 66,
    costEfficiency: 78,
  },
  {
    id: "raleigh-nc",
    name: "Raleigh, NC",
    demandDensity: 65,
    demographicFit: 74,
    competitionLevel: 50,
    accessibility: 60,
    costEfficiency: 72,
  },
  {
    id: "san-jose-ca",
    name: "San Jose, CA",
    demandDensity: 88,
    demographicFit: 80,
    competitionLevel: 90,
    accessibility: 70,
    costEfficiency: 20,
  },
  {
    id: "tampa-fl",
    name: "Tampa, FL",
    demandDensity: 70,
    demographicFit: 71,
    competitionLevel: 60,
    accessibility: 68,
    costEfficiency: 65,
  },
  {
    id: "boise-id",
    name: "Boise, ID",
    demandDensity: 48,
    demographicFit: 60,
    competitionLevel: 30,
    accessibility: 55,
    costEfficiency: 82,
  },
  {
    id: "pittsburgh-pa",
    name: "Pittsburgh, PA",
    demandDensity: 55,
    demographicFit: 58,
    competitionLevel: 40,
    accessibility: 62,
    costEfficiency: 75,
  },
  {
    id: "denver-co",
    name: "Denver, CO",
    demandDensity: 74,
    demographicFit: 76,
    competitionLevel: 72,
    accessibility: 71,
    costEfficiency: 48,
  },
];
