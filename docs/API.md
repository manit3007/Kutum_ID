# API Architecture

The system uses a RESTful API design. All APIs route through a Gateway that enforces authentication, authorization, purpose validation, and audit logging.

## Core API Endpoints

### 1. Citizen & Family Onboarding
- `POST /api/v1/families`: Submit a family declaration (citizen flow).
- `GET /api/v1/families/{familyId}`: Get full family profile (includes members and attributes).
- `POST /api/v1/families/{familyId}/members`: Add a new member to a family.
- `PATCH /api/v1/families/{familyId}/members/{memberId}`: Update relationship or member status.
- `GET /api/v1/families/search`: Search candidate families (by ration card, name, or phone).

### 2. Events & Dynamic Updates
- `POST /api/v1/events/birth`: Report birth event.
- `POST /api/v1/events/death`: Report death event.
- `POST /api/v1/events/marriage`: Report marriage event (triggers split/merge rules).
- `POST /api/v1/events/migration`: Report migration/address change.
- `POST /api/v1/surveys`: Submit periodic survey responses.

### 3. Intelligence Engines
- `GET /api/v1/families/{familyId}/deprivation`: Retrieve the 7 deprivation indicators and score.
- `GET /api/v1/families/{familyId}/exclusions`: Retrieve exclusion parameters status.
- `POST /api/v1/engines/duplicates/scan`: Trigger deduplication scan on a record.

### 4. Suvidha (Citizen Portal)
- `GET /api/v1/schemes`: List all government schemes.
- `GET /api/v1/schemes/{schemeId}/eligibility/{familyId}`: Check eligibility for a specific scheme.
- `GET /api/v1/suvidha/entitlements/{familyId}`: Suvidha core dashboard API — returns all potentially eligible schemes based on verified family data.
- `POST /api/v1/suvidha/apply`: Apply for a scheme leveraging existing verified data.

### 5. Benefits & DBT
- `GET /api/v1/families/{familyId}/benefits`: Get Benefit Index for a family.
- `POST /api/v1/benefits/webhook`: Endpoint for departments/IFMS to push benefit status updates.

### 6. Admin / Officer Dashboard
- `GET /api/v1/dashboard/metrics`: Key KPIs (total families, pending verifications, eligible-not-enrolled).
- `GET /api/v1/duplicate-cases`: Fetch unresolved duplicate records.
- `POST /api/v1/corrections`: Submit or resolve citizen correction requests.

## Security & Privacy (Privacy-by-Design)
- **Role-Based Access Control (RBAC)**: Enforced via JWT tokens. Roles include `CITIZEN`, `OFFICER_WCD`, `OFFICER_AGRI`, `SYSTEM_ADMIN`.
- **Purpose Validation**: Every read/write request must supply a `purpose` header.
- **Field-Level Policies**: Officers can only fetch data attributes they are authorized for. E.g. Agriculture officer can view land records but not complete health histories.
- **Audit Logging**: Every API hit stores the `actor_id`, `role`, `fields_accessed`, and `purpose` in `audit_logs`.
