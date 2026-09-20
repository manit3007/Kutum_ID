# Gujarat Kutumb ID - System Architecture Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Database Schema](#database-schema)
3. [Backend Architecture](#backend-architecture)
4. [Frontend Architecture](#frontend-architecture)
5. [Key Features & Workflows](#key-features--workflows)
6. [Technology Stack](#technology-stack)
7. [Data Flow](#data-flow)
8. [Security Considerations](#security-considerations)
9. [Deployment Architecture](#deployment-architecture)

---

## System Overview

**Gujarat Kutumb ID** is a Family Registry and Beneficiary Management System designed for the Gujarat Government. It serves as a unified platform to:

- **Register families** and their members with comprehensive demographic data
- **Verify family attributes** through administrative workflows
- **Evaluate eligibility** for government schemes based on family attributes
- **Track benefits** and disbursements (DBT - Direct Benefit Transfer)
- **Detect duplicate records** to prevent fraud
- **Audit all actions** for transparency and accountability

### User Roles

1. **Citizen**: Register family, view benefits, apply for schemes, track applications
2. **Admin**: Verify families, review duplicates, manage schemes, audit logs

---

## Database Schema

The database uses **Prisma ORM** with SQLite (for local development) and supports PostgreSQL (for production).

### Core Entities

#### 1. Family
Represents a household unit in the registry.

```
Fields:
- family_id (PK): Unique identifier (e.g., GJ-FAM-001245)
- status: ACTIVE, PENDING_VERIFICATION, SPLIT
- address, district, taluka, village_or_ward: Location details
- household_type: KUCCHA, PUCCA, SEMI_PUCCA
- verification_status: VERIFIED, PENDING, REJECTED
- creation_date, last_verified_date: Timestamps

Relations:
- members: FamilyMembership[]
- attributes: FamilyAttribute[]
- benefits: Benefit[]
- life_events: LifeEvent[]
```

#### 2. Member
Represents an individual person.

```
Fields:
- member_id (PK): Unique identifier (e.g., GJ-MEM-1001)
- name, date_of_birth, gender: Demographics
- life_status: ALIVE, DECEASED
- contact_reference, identity_reference: External references

Relations:
- memberships: FamilyMembership[]
- benefits: Benefit[]
- life_events: LifeEvent[]
```

#### 3. FamilyMembership
Many-to-many relationship between Family and Member with temporal tracking.

```
Fields:
- id (PK): UUID
- family_id, member_id: Foreign keys
- relationship: HEAD, SPOUSE, SON, DAUGHTER, etc.
- membership_start_date, membership_end_date: Temporal tracking
- residency_status: RESIDENT, NON_RESIDENT
- source: CITIZEN_DECLARATION, ADMIN_ENTRY, etc.
- verification_status: VERIFIED, PENDING, REJECTED

Relations:
- family: Family
- member: Member
```

#### 4. FamilyAttribute
Key-value pairs storing family characteristics for eligibility evaluation.

```
Fields:
- id (PK): UUID
- family_id: Foreign key
- attribute_key: CASTE, BPL, HOUSE_STATUS, INCOME, TOILET_STATUS, LAND_HOLDING
- attribute_value: String value (parsed as needed)
- source_department: Social Welfare, Food Dept, Survey, Revenue
- source_record_id: Reference to external system
- confidence_score: Probabilistic confidence (0-1)
- verification_status: VERIFIED, PENDING, REJECTED
- effective_date, last_updated: Temporal tracking

Relations:
- family: Family
```

#### 5. Scheme
Government welfare schemes.

```
Fields:
- scheme_id (PK): Unique identifier (e.g., SCH_PENSION_01)
- department: Social Security, Education, Food & Civil Supplies, etc.
- name, description: Scheme details
- status: ACTIVE, INACTIVE

Relations:
- benefits: Benefit[]
```

#### 6. EligibilityResult
Cached eligibility evaluation results.

```
Fields:
- id (PK): UUID
- family_id, member_id, scheme_id: References
- status: ELIGIBLE, INELIGIBLE, NEEDS_REVIEW
- reasons: JSON stringified explanation
- calculated_at: Timestamp
```

#### 7. Benefit
Active benefits/disbursements for families/members.

```
Fields:
- benefit_id (PK): UUID
- family_id, member_id, scheme_id: References
- department: Source department
- benefit_status: ACTIVE, SANCTIONED, STOPPED
- start_date, end_date: Validity period
- amount: Benefit amount
- payment_reference: DBT reference

Relations:
- family: Family
- member: Member
- scheme: Scheme
```

#### 8. LifeEvent
Life events that trigger eligibility recalculation.

```
Fields:
- event_id (PK): UUID
- event_type: BIRTH, DEATH, MARRIAGE, MIGRATION
- family_id, member_id: References
- event_date: When the event occurred
- status: REPORTED, VERIFIED, PROCESSED
- evidence_reference: Supporting document reference
- created_at: Timestamp

Relations:
- family: Family
- member: Member
```

#### 9. AuditLog
Audit trail for all administrative actions.

```
Fields:
- log_id (PK): UUID
- actor_id, actor_role: Who performed the action
- action: VERIFY_FAMILY, UPDATE_ATTRIBUTE, etc.
- entity_type, entity_id: What was affected
- fields_accessed: JSON stringified field list
- purpose: Reason for access
- timestamp: When the action occurred
```

#### 10. User
System users for authentication.

```
Fields:
- id (PK): UUID
- username: Unique username
- password_hash: Bcrypt hashed password
- role: CITIZEN, ADMIN
- family_id: Linked family (for citizens)
```

---

## Backend Architecture

### Technology Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **Authentication**: JWT + Passport.js (Google OAuth)
- **Password Hashing**: bcryptjs

### Project Structure

```
backend/
├── src/
│   ├── app.ts                 # Express app setup & middleware
│   ├── middleware/
│   │   ├── auth.ts           # JWT authentication & role-based access
│   │   └── passport.ts       # Passport.js OAuth configuration
│   ├── routes/
│   │   ├── auth.ts           # Login, Register, OAuth endpoints
│   │   ├── family.ts         # Family CRUD, verification, search
│   │   └── suvidha.ts        # Suvidha portal endpoints
│   └── engines/
│       ├── eligibility.ts     # Scheme eligibility evaluation
│       ├── deduplication.ts  # Duplicate detection logic
│       ├── deprivation.ts    # Deprivation index calculation
│       └── exclusion.ts      # Exclusion rule evaluation
├── prisma/
│   ├── schema.prisma         # Database schema definition
│   └── seed.ts               # Database seeding
└── .env                      # Environment variables
```

### API Endpoints

#### Authentication (`/api/v1/auth`)
- `POST /login` - Username/password login, returns JWT
- `POST /register` - User registration
- `GET /google` - Initiate Google OAuth
- `GET /google/callback` - OAuth callback handler

#### Family Management (`/api/v1/families`)
- `GET /:id` - Get family profile with members, attributes, benefits
- `GET /search` - Search families by ID
- `POST /` - Create new family declaration
- `POST /:id/verify` - Verify/reject family (Admin only)

#### Suvidha Portal (`/api/v1/suvidha`)
- Scheme discovery and application endpoints

### Middleware Chain

1. **CORS** - Cross-origin resource sharing
2. **Express JSON Parser** - Parse request bodies
3. **Session Middleware** - For Passport.js OAuth
4. **Passport Initialize/Session** - OAuth state management
5. **Authentication Middleware** - JWT verification
6. **Role-Based Access Control** - Check user permissions

### Business Logic Engines

#### 1. Eligibility Engine (`engines/eligibility.ts`)
Evaluates family eligibility for schemes based on attributes.

**Logic Flow:**
```
Input: Family object, Scheme object
↓
Extract attributes into key-value map
↓
Apply scheme-specific rules:
  - SCH_PENSION_01: Age >= 60 AND income <= 10000
  - SCH_PDS_01: BPL === 'YES'
  - SCH_HOUSING_01: HOUSE_STATUS === 'KUCCHA' AND BPL === 'YES'
↓
Output: { isEligible: boolean, reasons: string[] }
```

#### 2. Deduplication Engine (`engines/deduplication.ts`)
Detects duplicate family records using probabilistic matching.

**Logic Flow:**
```
Input: New family, New members
↓
Fetch all existing families with members
↓
Compare member names (case-insensitive) and DOB
↓
Calculate match confidence: (matches / total members) * 100
↓
Output: Array of potential duplicates with confidence scores
```

#### 3. Deprivation Engine (`engines/deprivation.ts`)
Calculates deprivation index based on SECC (Socio-Economic Caste Census) indicators.

**Indicators:**
- D1: Kuccha house
- D2: Female-headed household (no adult males 16-59)
- D3: SC/ST caste
- D4: Disabled member with no able-bodied adult
- D5: No literate adult above 25
- D6: Landless + manual labor
- D7: No adults in household

**Logic Flow:**
```
Input: Family object
↓
Extract attributes and member demographics
↓
Evaluate each indicator (true/false)
↓
Calculate score (count of true indicators)
↓
Determine deprivation: score >= 3
↓
Output: { score, indicators: {d1,d2,d3,d4,d5,d6,d7}, isDeprived }
```

---

## Frontend Architecture

### Technology Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **Styling**: TailwindCSS with custom design system
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Date Utilities**: date-fns

### Project Structure

```
frontend/
├── src/
│   ├── main.tsx              # Application entry point
│   ├── App.tsx               # Route configuration
│   ├── index.css             # Global styles & design system
│   ├── components/
│   │   ├── layouts/
│   │   │   ├── CitizenLayout.tsx  # Citizen dashboard layout
│   │   │   └── AdminLayout.tsx    # Admin dashboard layout
│   │   └── ProtectedRoute.tsx     # Route guard component
│   ├── pages/
│   │   ├── Login.tsx         # Login page
│   │   ├── Register.tsx     # Registration page
│   │   ├── OAuthCallback.tsx # OAuth callback handler
│   │   ├── citizen/
│   │   │   ├── CitizenDashboard.tsx   # Family profile view
│   │   │   ├── SuvidhaPortal.tsx      # Scheme discovery
│   │   │   ├── Applications.tsx        # Application tracking
│   │   │   └── BenefitWallet.tsx     # Benefit/disbursement view
│   │   └── admin/
│   │       ├── AdminDashboard.tsx     # Overview & KPIs
│   │       ├── FamilyVerification.tsx # Family verification queue
│   │       ├── DuplicateReview.tsx    # Duplicate resolution
│   │       ├── AuditLogs.tsx          # Audit log viewer
│   │       └── LifeEventSimulator.tsx # Life event simulation
│   └── utils/
│       └── api.ts           # API client wrapper
└── package.json
```

### Design System

The frontend uses a custom design system defined in `index.css`:

**Color Palette (Blue Theme):**
- Primary: `#2563eb` (blue-600)
- Primary Hover: `#1d4ed8` (blue-700)
- Background: `#f8fafc` (slate-50)
- Text: `#1e293b` (slate-800)
- Text Secondary: `#64748b` (slate-500)

**Component Classes:**
- `.card` - White card with shadow and rounded corners
- `.btn-primary` - Primary action button (blue)
- `.btn-secondary` - Secondary action button (white with border)
- `.badge-success` - Green success badge
- `.badge-warning` - Amber warning badge
- `.badge-error` - Red error badge
- `.badge-info` - Blue info badge
- `.input-field` - Styled input field

**Animations:**
- `.fade-in` - Fade in animation
- `.slide-up` - Slide up animation
- `.scale-in` - Scale in animation
- `.card-hover` - Hover effect for cards

### Routing Structure

```
/login              - Login page
/register           - Registration page
/oauth/callback     - OAuth callback handler

/citizen            - Citizen dashboard (protected)
  /citizen/         - Family profile
  /citizen/suvidha  - Scheme portal
  /citizen/applications - Application tracking
  /citizen/wallet   - Benefit wallet

/admin              - Admin dashboard (protected)
  /admin/           - Overview & KPIs
  /admin/duplicates - Duplicate review
  /admin/verifications - Family verification
  /admin/audit      - Audit logs
  /admin/simulator  - Life event simulator
```

### State Management

Uses **Zustand** for client-side state:
- Authentication state (token, user info, role)
- Session persistence via localStorage

### API Client

Centralized API client in `utils/api.ts`:
- Base URL: `http://localhost:5000/api/v1`
- Automatic JWT token injection from localStorage
- GET and POST methods with error handling

---

## Key Features & Workflows

### 1. Family Registration Workflow

**Citizen Flow:**
1. Citizen creates account (username/password or Google OAuth)
2. Citizen fills family declaration form:
   - Address details (district, taluka, village/ward)
   - Household type
   - Member details (name, DOB, gender, relationship)
   - Family attributes (caste, income, house status, etc.)
3. System creates Family record with status `PENDING_VERIFICATION`
4. System creates Member records
5. System creates FamilyMembership records
6. System creates FamilyAttribute records with `verification_status: PENDING`
7. Citizen redirected to dashboard showing "Pending Verification"

### 2. Family Verification Workflow

**Admin Flow:**
1. Admin views pending verification queue (`/admin/verifications`)
2. Admin selects a family to review
3. Admin verifies individual attributes:
   - Cross-check with source department data
   - Mark each属性 as `VERIFIED` or `REJECTED`
4. When all attributes verified, system auto-updates family status to `VERIFIED`
5. Audit log entry created for verification action
6. Citizen dashboard now shows "Verified" status

### 3. Eligibility Evaluation Workflow

**Automatic Trigger:**
1. Family status changes to `VERIFIED`
2. System triggers eligibility engine
3. For each active scheme:
   - Fetch family attributes
   - Apply scheme-specific rules
   - Generate eligibility result
   - Cache result in EligibilityResult table
4. Citizen can view eligible schemes in Suvidha Portal

### 4. Benefit Disbursement Workflow

**DBT Integration:**
1. Citizen applies for scheme through Suvidha Portal
2. Admin reviews application
3. If approved, create Benefit record with status `SANCTIONED`
4. System integrates with PFMS (Public Financial Management System)
5. Benefit status changes to `ACTIVE`
6. Payment reference generated
7. Citizen can view disbursement in Benefit Wallet

### 5. Duplicate Detection Workflow

**Automatic Trigger:**
1. New family registered
2. Deduplication engine scans existing records
3. Compares member names and DOB
4. Calculates confidence score for potential matches
5. If confidence > threshold, flags for review
6. Admin reviews in Duplicate Review page
7. Admin decides to:
   - Merge records
   - Mark as separate families
8. Audit log entry created

### 6. Life Event Processing Workflow

**Event Types:**
- **Birth**: New member added, per-capita limits recalculated
- **Death**: Member marked deceased, pension benefits stopped
- **Marriage**: Family split initiated, memberships updated
- **Migration**: Address updated, ward-level rules reapplied

**Flow:**
1. Event reported (citizen or admin)
2. LifeEvent record created with status `REPORTED`
3. Admin verifies event with evidence
4. Status changes to `VERIFIED`
5. System processes event:
   - Updates member/family records
   - Triggers eligibility recalculation
   - Updates benefit status if needed
6. Status changes to `PROCESSED`
7. Audit log entry created

### 7. Audit Logging Workflow

**Automatic Trigger:**
All administrative actions trigger audit log creation:
- Family verification
- Attribute updates
- Duplicate resolution
- Life event processing
- User access to sensitive data

**Audit Log Entry:**
- Actor ID and role
- Action performed
- Entity affected
- Fields accessed
- Purpose
- Timestamp

---

## Technology Stack

### Backend
| Component | Technology | Purpose |
|-----------|-----------|---------|
| Runtime | Node.js 18+ | JavaScript runtime |
| Language | TypeScript | Type safety |
| Framework | Express.js | Web framework |
| ORM | Prisma | Database abstraction |
| Database | SQLite (dev) / PostgreSQL (prod) | Data persistence |
| Authentication | JWT + Passport.js | User authentication |
| OAuth | Google OAuth 2.0 | Third-party login |
| Password Hashing | bcryptjs | Secure password storage |

### Frontend
| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | React 19 | UI framework |
| Language | TypeScript | Type safety |
| Build Tool | Vite | Fast development server |
| Routing | React Router DOM v7 | Client-side routing |
| Styling | TailwindCSS | Utility-first CSS |
| State Management | Zustand | Client state |
| HTTP Client | Axios | API requests |
| Icons | Lucide React | Icon library |
| Date Utilities | date-fns | Date formatting |

---

## Data Flow

### 1. Authentication Flow

```
User → Login Page
↓
POST /api/v1/auth/login
↓
Backend: Verify credentials
↓
Backend: Generate JWT token
↓
Response: { token, user }
↓
Frontend: Store token in localStorage
↓
Frontend: Redirect to dashboard
↓
Subsequent requests: Include Authorization: Bearer <token>
↓
Backend: Verify JWT, extract user info
↓
Backend: Process request
```

### 2. Family Registration Flow

```
Citizen → Registration Form
↓
POST /api/v1/families
↓
Backend: Create Family record
↓
Backend: Create Member records
↓
Backend: Create FamilyMembership records
↓
Backend: Create FamilyAttribute records
↓
Backend: Update User with family_id
↓
Response: Family created
↓
Citizen Dashboard: Show pending status
```

### 3. Eligibility Evaluation Flow

```
Family Verified
↓
Trigger: Eligibility Engine
↓
Fetch family attributes
↓
For each scheme:
  - Apply scheme rules
  - Generate eligibility result
  - Cache in EligibilityResult
↓
Citizen → Suvidha Portal
↓
GET /api/v1/families/:id
↓
Response: Family with eligibility results
↓
Display eligible schemes
```

### 4. Benefit Disbursement Flow

```
Citizen → Apply for Scheme
↓
POST /api/v1/suvidha/apply
↓
Admin Review
↓
If approved:
  - Create Benefit record (SANCTIONED)
  - Integrate with PFMS
  - Update to ACTIVE
  - Generate payment reference
↓
Citizen → Benefit Wallet
↓
GET /api/v1/families/:id
↓
Response: Family with benefits
↓
Display active benefits and payment history
```

---

## Security Considerations

### Authentication & Authorization
- **JWT Tokens**: 24-hour expiration, signed with secret
- **Password Hashing**: bcrypt with salt rounds
- **Role-Based Access Control**: Middleware enforces role permissions
- **OAuth**: Google OAuth for secure third-party login

### Data Protection
- **Environment Variables**: Sensitive data (JWT_SECRET, DB credentials) in .env
- **SQL Injection Prevention**: Prisma ORM parameterized queries
- **XSS Prevention**: React's built-in escaping
- **CORS**: Configured to allow only trusted origins

### Audit Trail
- All administrative actions logged
- Actor identification (user ID and role)
- Timestamp tracking
- Purpose documentation

### Data Privacy
- **PII Protection**: Personal identifiable information hashed/tokenized
- **Access Control**: Role-based access to sensitive data
- **Audit Logging**: Track who accessed what data and why

---

## Deployment Architecture

### Development Environment
```
Frontend: Vite dev server (localhost:5173)
Backend: Express server (localhost:5000)
Database: SQLite (local file)
```

### Production Environment

**Recommended Setup:**

```
Frontend: Vercel
  - Automatic deployments from Git
  - CDN for static assets
  - SSL certificates
  - Environment variables management

Backend: Render
  - Node.js runtime
  - PostgreSQL database
  - Automatic deployments from Git
  - Environment variables management
  - SSL certificates

Database: PostgreSQL (Render or Neon)
  - Managed PostgreSQL instance
  - Automatic backups
  - Connection pooling
```

**Alternative: Railway**
- All-in-one platform
- Frontend, backend, and database in one place
- Simplified deployment

### Environment Variables Required

**Backend:**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT signing
- `SESSION_SECRET` - Secret for session management
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GOOGLE_CALLBACK_URL` - OAuth callback URL

**Frontend:**
- `VITE_API_BASE_URL` - Backend API URL (for production)

---

## Scalability Considerations

### Database
- **Indexing**: Add indexes on frequently queried fields (family_id, member_id, scheme_id)
- **Connection Pooling**: Use PostgreSQL connection pooling
- **Read Replicas**: For read-heavy operations
- **Partitioning**: Partition large tables by date or region

### Backend
- **Caching**: Redis for caching eligibility results
- **Queue System**: Bull/BullMQ for async processing (life events, eligibility)
- **Load Balancing**: Multiple backend instances behind load balancer
- **Rate Limiting**: Prevent API abuse

### Frontend
- **Code Splitting**: Lazy load routes
- **CDN**: Serve static assets via CDN
- **Service Worker**: Offline support
- **Optimization**: Bundle size optimization

---

## Future Enhancements

### Planned Features
1. **Mobile App**: React Native mobile application
2. **SMS Integration**: SMS notifications for citizens
3. **Aadhaar Integration**: Aadhaar-based authentication
4. **Advanced Analytics**: Dashboard with charts and graphs
5. **Geospatial Features**: Map-based family location tracking
6. **Document Management**: Upload and verify supporting documents
7. **Workflow Engine**: Configurable approval workflows
8. **API Gateway**: Kong or AWS API Gateway for API management

### Technical Improvements
1. **Microservices Architecture**: Split into separate services
2. **Event-Driven Architecture**: Use message queues (RabbitMQ/Kafka)
3. **GraphQL**: Replace REST with GraphQL for flexible queries
4. **Containerization**: Docker and Kubernetes for orchestration
5. **CI/CD Pipeline**: GitHub Actions or GitLab CI
6. **Monitoring**: Prometheus and Grafana for monitoring
7. **Logging**: ELK stack for centralized logging

---

## Conclusion

Gujarat Kutumb ID is a comprehensive family registry and beneficiary management system designed to streamline government welfare scheme delivery. The architecture follows best practices for security, scalability, and maintainability, with clear separation of concerns between frontend, backend, and database layers.

The system uses modern technologies (React, Node.js, PostgreSQL, Prisma) and implements key features like family verification, eligibility evaluation, duplicate detection, and audit logging to ensure transparency and efficiency in benefit distribution.

The modular design allows for easy extension and integration with other government systems, making it a robust foundation for digital governance initiatives.
