# Stratara (Project Atlas)

AI-powered commercial expansion intelligence platform. Stratara is **not** a
property listing site — it is a decision-intelligence layer that helps
businesses find and evaluate locations to start or expand, delivering
ranked, scored recommendations with explainable reasoning.

Owned by V Infinite Consultants (sole owner: Vibhas Behl).

## Status

Infrastructure scaffold only — no product/feature code yet.

- **Stack:** MERN (MongoDB, Express, React, Node). Chosen by founder call.
  Trade-off worth flagging: Mongo is flexible for early-stage schema churn,
  but a scoring/ranking engine with weighted criteria may push toward more
  relational modeling later (e.g. Postgres) once the scoring logic is
  actually specified — not a blocker now, just a known future fork.
- **What exists:** `server/` (Express API, one health-check route, no DB
  required to boot) and `client/` (React via Vite, one placeholder page
  that calls the health-check endpoint). Both install and build clean.
- **What doesn't exist:** any Stratara feature — journey stages, scoring
  logic, data models, auth. All blocked on the item below.
- **Sync model:** cloud build session can't push to this repo directly
  (known Anthropic git-proxy issue, tracked upstream). Changes are
  delivered as files and committed/pushed manually from local Terminal
  until that's resolved.

**Blocking on, before real feature code starts:**

- [ ] MVP boundary spec (Stages 1–9 of the 16-stage user journey) — not
      yet available in this repo or the linked Claude Project. Needs to be
      sourced or re-scoped before the scoring/recommendation engine can be
      built against anything concrete.
- [ ] Explicit position on liability / bias-fairness / data-provenance
      standards referenced in the prior gaps analysis, before any
      customer-facing ranking output ships.

## Context note

The concierge MVP validation step (manual validation of demand and scoring
quality before building software) was deliberately skipped in favor of
building the customer-facing MVP directly. That's a founder call, not an
oversight — flagging it here so it's visible in the repo history, not just
buried in chat.

## Non-goals

- Not a property listing/marketplace product.
- Not scoped to be a "build everything" MVP — see MVP boundary doc (Stages
  1–9) once sourced, and resist scope creep beyond it.
