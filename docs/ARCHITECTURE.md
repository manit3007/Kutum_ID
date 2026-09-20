# Gujarat Kutumb ID (Family ID) — Architecture

## 1. System Overview

The **Gujarat Kutumb ID** is a dynamic family and beneficiary management platform. It serves as an interoperability layer, providing a single source of truth for family composition and verified attributes without unnecessarily replicating department-owned data. 

### Core Subsystems
1. **Family Registry**: Maintains verified family profiles, Member IDs, and relationships.
2. **Dynamic Data Layer**: Processes department updates, life events (birth, death, marriage, migration), and periodic surveys.
3. **Intelligence Engines**:
   - **Deprivation Engine**: Calculates 7 deprivation indicators dynamically.
   - **Exclusion Engine**: Evaluates 10 auto-exclusion parameters.
   - **Eligibility Engine**: Configurable rule engine for government schemes.
   - **Duplicate Engine**: Detects potential duplicates using deterministic and probabilistic matching.
4. **Suvidha**: Citizen-facing benefit discovery and application portal.
5. **Benefit Management**: Central index of family benefits and DBT payment statuses.

## 2. Technical Stack (MVP)
- **Frontend**: React, TypeScript, Vite, Tailwind CSS (Modern, premium UI)
- **Backend**: Node.js with Express/NestJS (TypeScript)
- **Database**: PostgreSQL (Relational structure is critical for MVP)
- **Shared**: Monorepo or shared typing library (zod, TS interfaces)

## 3. Project Directory Structure

```text
/ (Project Root)
├── /frontend               # Citizen and Officer Portals
│   ├── /src
│   │   ├── /assets
│   │   ├── /components     # Reusable UI components (Design System)
│   │   ├── /features       # Domain-specific modules (auth, family, suvidha)
│   │   ├── /hooks
│   │   ├── /pages          # Route components
│   │   ├── /services       # API clients
│   │   ├── /store          # State management (Zustand/Redux)
│   │   ├── /styles         # Global CSS, Tailwind config
│   │   └── /utils
│   ├── index.html
│   └── vite.config.ts
│
├── /backend                # API Services and Engines
│   ├── /src
│   │   ├── /config         # Env, DB setup
│   │   ├── /controllers    # Route handlers
│   │   ├── /engines        # Rules (Deprivation, Exclusion, Eligibility, Deduplication)
│   │   ├── /middlewares    # Auth, Validation, Audit Logging
│   │   ├── /models         # DB schema/ORM entities
│   │   ├── /routes         # API routing
│   │   ├── /services       # Business logic (Family, Member, Scheme)
│   │   └── /utils          # Helpers, Tokenization
│   ├── app.ts
│   └── package.json
│
├── /database               # Database Scripts and Migrations
│   ├── /migrations         # Schema changes
│   ├── /seeds              # Synthetic data (500-2000 families, edge cases)
│   └── schema.sql          # Initial schema definition
│
├── /shared                 # Shared Types and Utilities
│   ├── /types              # TypeScript interfaces (Family, Scheme, Events)
│   ├── /constants          # Enums, standard status codes
│   └── /schemas            # Zod validation schemas
│
└── /docs                   # Project Documentation
    ├── ARCHITECTURE.md
    ├── DATABASE.md
    ├── API.md
    ├── UI_UX.md
    └── IMPLEMENTATION_PLAN.md
```

## 4. Integration Architecture
- **API Gateway**: Handles authentication, purpose validation, field-level access, and audit logging.
- **Event Bus (Conceptual for MVP)**: Modules trigger events (e.g., `member_died`) that other modules (e.g., Eligibility Engine, Benefit Index) listen to.
- **Mock Integrations**: Clean adapter patterns for external systems (e.g., WCD, Health, Agriculture, IFMS/Khajane, PFMS). All external systems are mocked in the MVP using synthetic data.
