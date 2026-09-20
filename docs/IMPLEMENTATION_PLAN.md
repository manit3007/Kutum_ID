# Implementation Plan

This document outlines the step-by-step roadmap to build the MVP for the Gujarat Kutumb ID platform.

## Pre-requisites & Rules
- Do NOT use real citizen data. Use synthetic data.
- Do NOT use real government APIs. Use mock integration adapters.
- Prioritize a complete working vertical slice over advanced infrastructure.

## Phase 1: Foundation (Steps 1-2)
1. **Define Data Model**: Create the PostgreSQL database schema based on `DATABASE.md`. Setup TypeORM or Prisma for database access.
2. **Create Synthetic Dataset (Seed)**: Generate 500-2,000 synthetic families. Cover all edge cases (split families, duplicates, migrants).

## Phase 2: Core Platform (Steps 3-6)
3. **Design System & UI Scaffold**: Initialize Vite + React + Tailwind frontend. Setup routing for Citizen and Officer portals.
4. **Authentication & Roles**: Implement JWT based RBAC (Citizen, Officer, Admin).
5. **Family Registry**: Build the Citizen onboarding flow (find/create family, add members, confirm attributes).
6. **Dynamic Profile**: Display verified attributes, source data, timestamps.

## Phase 3: Intelligence Engines (Steps 7-9)
7. **Deprivation Engine**: Implement logic for the 7 deprivation parameters.
8. **Exclusion Engine**: Implement logic for the 10 auto-exclusion parameters.
9. **Eligibility Engine**: Build the configurable rules engine for scheme evaluations.

## Phase 4: Citizen Experience (Steps 10-11)
10. **Suvidha Dashboard**: Connect the Eligibility Engine to the UI to show citizens their entitlements. Include application flow reusing verified data.
11. **Benefit Index (Wallet)**: Display the family's current benefit footprint based on mock departmental integration.

## Phase 5: Governance & Operations (Steps 12-16)
12. **Officer Dashboard**: Build KPI views, deprivation stats, and eligibility metrics.
13. **Life-Event Simulation**: Build UI tools/APIs to simulate Birth, Death, Marriage, and Migration, showing real-time eligibility recalculations.
14. **Duplicate Detection**: Implement probabilistic matching and present cases in the Officer Dashboard for review.
15. **Periodic Survey**: Add workflow for citizen self-survey to update attributes like house/toilet conditions.
16. **Privacy/Audit Dashboard**: Add view to show API access logs, field-level access tracking.

## Phase 6: Final Polish (Steps 17-18)
17. **End-to-End Demo Connection**: Ensure seamless flow from family creation -> deprivation check -> suvidha application -> DBT payment simulation.
18. **UI Polish & Testing**: Ensure premium look and feel, fix bugs, prepare for demo presentation.
