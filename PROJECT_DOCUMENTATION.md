# Gujarat Kutumb ID - Complete Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Business Requirements](#business-requirements)
3. [Functional Requirements](#functional-requirements)
4. [Non-Functional Requirements](#non-functional-requirements)
5. [System Architecture](#system-architecture)
6. [Database Design](#database-design)
7. [API Documentation](#api-documentation)
8. [Frontend Components](#frontend-components)
9. [Backend Components](#backend-components)
10. [Business Logic Engines](#business-logic-engines)
11. [Security Implementation](#security-implementation)
12. [Testing Strategy](#testing-strategy)
13. [Deployment Guide](#deployment-guide)
14. [Maintenance Guide](#maintenance-guide)
15. [Troubleshooting](#troubleshooting)
16. [Future Roadmap](#future-roadmap)

---

## Project Overview

### Purpose
Gujarat Kutumb ID is a digital platform designed to modernize the family registry and beneficiary management system for the Gujarat Government. The system aims to:

- Create a unified family registry with comprehensive demographic data
- Streamline the process of verifying family attributes
- Automate eligibility evaluation for government welfare schemes
- Enable efficient benefit disbursement through Direct Benefit Transfer (DBT)
- Prevent fraud through duplicate detection and audit logging
- Provide transparency through real-time status tracking

### Problem Statement
The existing manual system for family registration and benefit distribution suffers from:
- Duplicate records leading to fraud
- Manual verification processes causing delays
- Lack of real-time tracking for applications
- Inefficient eligibility evaluation
- No audit trail for administrative actions
- Poor citizen experience

### Solution
A digital platform that:
- Centralizes family data in a secure database
- Automates verification workflows
- Provides real-time status updates
- Evaluates eligibility automatically
- Detects duplicates using AI
- Maintains complete audit logs
- Offers a user-friendly interface

### Target Users
1. **Citizens**: Residents of Gujarat who need to register their families and apply for schemes
2. **Administrators**: Government officials who verify families, manage schemes, and audit actions

### Scope
The system covers:
- Family registration and member management
- Attribute verification workflow
- Scheme eligibility evaluation
- Benefit tracking and disbursement
- Duplicate detection and resolution
- Life event processing
- Audit logging and compliance

---

## Business Requirements

### BR-001: Family Registration
The system must allow citizens to register their families with:
- Address details (district, taluka, village/ward)
- Household type classification
- Member demographics (name, DOB, gender, relationship)
- Family attributes (caste, income, house status, etc.)

### BR-002: Family Verification
The system must provide a workflow for administrators to:
- Review pending family registrations
- Verify individual attributes
- Approve or reject families
- Track verification progress

### BR-003: Scheme Eligibility
The system must automatically evaluate eligibility for schemes based on:
- Family attributes
- Member demographics
- Scheme-specific rules

### BR-004: Benefit Management
The system must track:
- Active benefits for families
- Benefit disbursement history
- Payment references
- Benefit status changes

### BR-005: Duplicate Detection
The system must detect potential duplicate records using:
- Name matching
- Date of birth matching
- Confidence scoring
- Probabilistic algorithms

### BR-006: Audit Logging
The system must maintain an audit trail for:
- All administrative actions
- Data access
- Verification decisions
- Benefit changes

### BR-007: Life Event Processing
The system must process life events:
- Birth (new member addition)
- Death (member status update)
- Marriage (family split)
- Migration (address update)

### BR-008: User Authentication
The system must support:
- Username/password authentication
- Google OAuth integration
- Role-based access control
- Session management

---

## Functional Requirements

### FR-001: User Registration
- Users must be able to register with username and password
- System must validate unique usernames
- Passwords must be hashed using bcrypt
- Users must be assigned a role (CITIZEN or ADMIN)

### FR-002: User Login
- Users must be able to login with username/password
- System must generate JWT tokens on successful login
- Tokens must expire after 24 hours
- Failed attempts must be logged

### FR-003: Google OAuth
- Users must be able to login via Google OAuth
- System must handle OAuth callback
- System must create user if not exists
- System must generate JWT token after OAuth

### FR-004: Family Creation
- Citizens must be able to create family records
- System must generate unique family IDs
- System must validate required fields
- System must set initial status to PENDING_VERIFICATION

### FR-005: Member Addition
- Users must be able to add family members
- System must generate unique member IDs
- System must validate DOB and gender
- System must create membership records

### FR-006: Attribute Management
- Users must be able to add family attributes
- System must validate attribute keys
- System must track source department
- System must set initial verification status to PENDING

### FR-007: Family Search
- Administrators must be able to search families by ID
- System must return matching results
- System must include members and attributes
- System must limit results to 10

### FR-008: Family Verification
- Administrators must be able to verify families
- System must update family status to VERIFIED
- System must update verification timestamp
- System must create audit log entry

### FR-009: Attribute Verification
- Administrators must be able to verify individual attributes
- System must update attribute verification status
- System must track who verified and when
- System must auto-update family status if all attributes verified

### FR-010: Eligibility Evaluation
- System must evaluate eligibility for all schemes
- System must apply scheme-specific rules
- System must generate reasons for eligibility
- System must cache results

### FR-011: Scheme Discovery
- Citizens must be able to view available schemes
- System must show scheme details
- System must indicate eligibility status
- System must show application status

### FR-012: Scheme Application
- Citizens must be able to apply for schemes
- System must create application records
- System must track application status
- System must notify administrators

### FR-013: Benefit Tracking
- Citizens must be able to view active benefits
- System must show benefit details
- System must show payment history
- System must show payment references

### FR-014: Duplicate Detection
- System must scan for duplicates on family creation
- System must compare member names and DOB
- System must calculate confidence scores
- System must flag potential matches

### FR-015: Duplicate Resolution
- Administrators must be able to review duplicates
- System must show both records
- System must allow merge or separate decision
- System must create audit log entry

### FR-016: Life Event Reporting
- Users must be able to report life events
- System must validate event data
- System must create event records
- System must set initial status to REPORTED

### FR-017: Life Event Verification
- Administrators must be able to verify events
- System must update event status to VERIFIED
- System must process event effects
- System must create audit log entry

### FR-018: Audit Log Viewing
- Administrators must be able to view audit logs
- System must show actor, action, and timestamp
- System must show affected entity
- System must show purpose

### FR-019: Data Quality Score
- System must calculate data quality score
- Score must be based on verified attributes
- Score must be percentage (0-100)
- System must update score dynamically

### FR-020: Deprivation Index
- System must calculate deprivation index
- System must evaluate 7 SECC indicators
- System must determine deprivation status
- System must show indicator breakdown

---

## Non-Functional Requirements

### NFR-001: Performance
- API response time must be < 200ms for simple queries
- API response time must be < 500ms for complex queries
- Page load time must be < 3 seconds
- System must support 1000 concurrent users

### NFR-002: Scalability
- System must scale horizontally
- Database must support read replicas
- System must handle 10,000 families
- System must handle 100,000 members

### NFR-003: Availability
- System uptime must be > 99.5%
- System must have graceful degradation
- System must have backup and recovery
- System must have disaster recovery plan

### NFR-004: Security
- All passwords must be hashed
- All API endpoints must be authenticated
- All sensitive data must be encrypted
- System must prevent SQL injection
- System must prevent XSS attacks
- System must prevent CSRF attacks

### NFR-005: Usability
- Interface must be intuitive
- System must be mobile-responsive
- System must support multiple browsers
- System must have accessibility features

### NFR-006: Maintainability
- Code must be well-documented
- Code must follow best practices
- System must have automated tests
- System must have logging

### NFR-007: Compliance
- System must comply with data protection laws
- System must maintain audit logs
- System must have data retention policy
- System must have privacy policy

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  (React + TypeScript + TailwindCSS + Vite)                  │
│  - Citizen Dashboard                                         │
│  - Admin Dashboard                                           │
│  - Authentication Pages                                      │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTPS
                     │
┌────────────────────┴────────────────────────────────────────┐
│                      API Gateway                             │
│                  (Express.js + CORS)                          │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────────┐
│                    Backend Services                          │
│  - Authentication Service (JWT + Passport)                   │
│  - Family Service (CRUD + Verification)                      │
│  - Scheme Service (Eligibility + Application)                │
│  - Audit Service (Logging + Compliance)                      │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────────┐
│                   Business Logic Engines                      │
│  - Eligibility Engine                                        │
│  - Deduplication Engine                                      │
│  - Deprivation Engine                                        │
│  - Exclusion Engine                                          │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────────┐
│                    Data Access Layer                         │
│                   (Prisma ORM)                               │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────────┐
│                      Database                                 │
│              (PostgreSQL / SQLite)                           │
│  - Families, Members, Attributes                             │
│  - Schemes, Benefits, Eligibility                            │
│  - Audit Logs, Users                                         │
└─────────────────────────────────────────────────────────────┘
```

### Component Interactions

#### 1. Authentication Flow
```
User → Frontend → API Gateway → Auth Service → Database
                      ↓
                  JWT Token
                      ↓
                  Frontend (stored in localStorage)
```

#### 2. Family Registration Flow
```
Citizen → Frontend → API Gateway → Family Service → Database
                                    ↓
                            Deduplication Engine
                                    ↓
                            Audit Service
```

#### 3. Eligibility Evaluation Flow
```
Family Verified → Eligibility Engine → Scheme Rules → Database
                                           ↓
                                    Eligibility Result
                                           ↓
                                    Cache Result
```

#### 4. Benefit Disbursement Flow
```
Application → Admin Review → Benefit Service → Database
                                        ↓
                                    PFMS Integration
                                        ↓
                                    Payment Reference
```

---

## Database Design

### Entity Relationship Diagram

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│    User      │       │   Family         │       │   Member     │
├──────────────┤       ├──────────────────┤       ├──────────────┤
│ id (PK)      │       │ family_id (PK)   │       │ member_id(PK) │
│ username     │◄──────│ status           │       │ name         │
│ password_hash│       │ address          │       │ date_of_birth│
│ role         │       │ district         │       │ gender       │
│ family_id(FK)│       │ taluka           │       │ life_status  │
└──────────────┘       │ verification_    │       └──────────────┘
                       │ status           │              │
                       └────────┬─────────┘              │
                                │                         │
                                │                         │
                       ┌────────┴─────────┐              │
                       │                  │              │
              ┌────────▼────────┐ ┌──────▼──────┐       │
              │FamilyMembership│ │FamilyAttribute│       │
              ├────────────────┤ ├──────────────┤       │
              │ id (PK)        │ │ id (PK)      │       │
              │ family_id(FK)   │ │ family_id(FK) │       │
              │ member_id(FK)   │ │ attribute_key│       │
              │ relationship    │ │ attribute_   │       │
              │ membership_     │ │ value        │       │
              │ start_date      │ │ verification_│       │
              │ verification_   │ │ status       │       │
              │ status          │ └──────────────┘       │
              └────────────────┘                         │
                       │                                  │
                       │                                  │
                       │                         ┌────────▼────────┐
                       │                         │   Benefit       │
                       │                         ├────────────────┤
                       │                         │ benefit_id(PK)  │
                       │                         │ family_id(FK)   │
                       │                         │ member_id(FK)   │
                       │                         │ scheme_id(FK)   │
                       │                         │ benefit_status  │
                       │                         │ amount          │
                       │                         │ payment_ref     │
                       │                         └────────┬────────┘
                       │                                  │
                       │                         ┌────────▼────────┐
                       │                         │   Scheme        │
                       │                         ├────────────────┤
                       │                         │ scheme_id(PK)   │
                       │                         │ department      │
                       │                         │ name            │
                       │                         │ description     │
                       │                         │ status          │
                       │                         └────────────────┘
                       │
              ┌────────▼────────┐
              │   LifeEvent    │
              ├────────────────┤
              │ event_id(PK)  │
              │ event_type    │
              │ family_id(FK) │
              │ member_id(FK) │
              │ event_date    │
              │ status        │
              └────────────────┘
```

### Table Descriptions

#### User
Stores user authentication and role information.

**Columns:**
- `id`: UUID primary key
- `username`: Unique username
- `password_hash`: Bcrypt hashed password
- `role`: CITIZEN or ADMIN
- `family_id`: Foreign key to Family (for citizens)

**Indexes:**
- Unique index on username

#### Family
Stores household information.

**Columns:**
- `family_id`: String primary key (e.g., GJ-FAM-001245)
- `status`: ACTIVE, PENDING_VERIFICATION, SPLIT
- `address`: Full address
- `district`: District name
- `taluka`: Taluka name
- `village_or_ward`: Village or ward name
- `household_type`: KUCCHA, PUCCA, SEMI_PUCCA
- `creation_date`: Timestamp of creation
- `last_verified_date`: Timestamp of last verification
- `verification_status`: VERIFIED, PENDING, REJECTED

**Indexes:**
- Index on district
- Index on verification_status

#### Member
Stores individual person information.

**Columns:**
- `member_id`: String primary key (e.g., GJ-MEM-1001)
- `name`: Full name
- `date_of_birth`: Date of birth
- `gender`: MALE, FEMALE, OTHER
- `life_status`: ALIVE, DECEASED
- `contact_reference`: Contact information
- `identity_reference`: External ID reference

**Indexes:**
- Index on name (for search)
- Index on date_of_birth (for age calculation)

#### FamilyMembership
Many-to-many relationship between Family and Member.

**Columns:**
- `id`: UUID primary key
- `family_id`: Foreign key to Family
- `member_id`: Foreign key to Member
- `relationship`: HEAD, SPOUSE, SON, DAUGHTER, etc.
- `membership_start_date`: When membership started
- `membership_end_date`: When membership ended (nullable)
- `residency_status`: RESIDENT, NON_RESIDENT
- `source`: CITIZEN_DECLARATION, ADMIN_ENTRY, etc.
- `verification_status`: VERIFIED, PENDING, REJECTED

**Indexes:**
- Composite index on family_id and member_id
- Index on verification_status

#### FamilyAttribute
Key-value pairs for family characteristics.

**Columns:**
- `id`: UUID primary key
- `family_id`: Foreign key to Family
- `attribute_key`: CASTE, BPL, HOUSE_STATUS, INCOME, etc.
- `attribute_value`: String value
- `source_department`: Source department name
- `source_record_id`: External system reference
- `confidence_score`: Confidence (0-1)
- `verification_status`: VERIFIED, PENDING, REJECTED
- `effective_date`: When attribute became effective
- `last_updated`: Last update timestamp

**Indexes:**
- Composite index on family_id and attribute_key
- Index on verification_status

#### Scheme
Government welfare schemes.

**Columns:**
- `scheme_id`: String primary key (e.g., SCH_PENSION_01)
- `department`: Department name
- `name`: Scheme name
- `description`: Scheme description
- `status`: ACTIVE, INACTIVE

**Indexes:**
- Index on department
- Index on status

#### EligibilityResult
Cached eligibility evaluations.

**Columns:**
- `id`: UUID primary key
- `family_id`: Foreign key to Family
- `member_id`: Foreign key to Member (nullable)
- `scheme_id`: Foreign key to Scheme
- `status`: ELIGIBLE, INELIGIBLE, NEEDS_REVIEW
- `reasons`: JSON stringified reasons
- `calculated_at`: Calculation timestamp

**Indexes:**
- Composite index on family_id and scheme_id
- Index on calculated_at

#### Benefit
Active benefits and disbursements.

**Columns:**
- `benefit_id`: UUID primary key
- `family_id`: Foreign key to Family
- `member_id`: Foreign key to Member (nullable)
- `scheme_id`: Foreign key to Scheme
- `department`: Source department
- `benefit_status`: ACTIVE, SANCTIONED, STOPPED
- `start_date`: Benefit start date
- `end_date`: Benefit end date (nullable)
- `amount`: Benefit amount
- `payment_reference`: DBT reference

**Indexes:**
- Composite index on family_id and scheme_id
- Index on benefit_status

#### LifeEvent
Life events triggering recalculation.

**Columns:**
- `event_id`: UUID primary key
- `event_type`: BIRTH, DEATH, MARRIAGE, MIGRATION
- `family_id`: Foreign key to Family
- `member_id`: Foreign key to Member (nullable)
- `event_date`: When event occurred
- `status`: REPORTED, VERIFIED, PROCESSED
- `evidence_reference`: Supporting document
- `created_at`: Creation timestamp

**Indexes:**
- Composite index on family_id and event_type
- Index on status

#### AuditLog
Audit trail for all actions.

**Columns:**
- `log_id`: UUID primary key
- `actor_id`: User ID who performed action
- `actor_role`: Role of actor
- `action`: Action performed
- `entity_type`: Type of entity affected
- `entity_id`: ID of entity affected
- `fields_accessed`: JSON stringified field list
- `purpose`: Purpose of action
- `timestamp`: Action timestamp

**Indexes:**
- Index on actor_id
- Index on entity_type and entity_id
- Index on timestamp

---

## API Documentation

### Base URL
- Development: `http://localhost:5000/api/v1`
- Production: `https://your-backend.onrender.com/api/v1`

### Authentication
All endpoints (except login/register) require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

### Endpoints

#### POST /auth/login
Login with username and password.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "username": "admin",
    "role": "ADMIN",
    "family_id": null
  }
}
```

**Error (401 Unauthorized):**
```json
{
  "message": "Invalid credentials"
}
```

#### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "username": "newuser",
  "password": "password123",
  "role": "CITIZEN"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "username": "newuser",
    "role": "CITIZEN",
    "family_id": null
  }
}
```

**Error (400 Bad Request):**
```json
{
  "message": "Username already exists"
}
```

#### GET /auth/google
Initiate Google OAuth flow.

**Redirects to:** Google OAuth consent screen

#### GET /auth/google/callback
Handle Google OAuth callback.

**Redirects to:** Frontend with token in URL

#### GET /families/:id
Get family profile by ID.

**Response (200 OK):**
```json
{
  "family_id": "GJ-FAM-001245",
  "status": "VERIFIED",
  "address": "12, M.G. Road",
  "district": "Ahmedabad",
  "taluka": "City",
  "village_or_ward": "Ward 4",
  "household_type": "RURAL",
  "verification_status": "VERIFIED",
  "creation_date": "2024-01-01T00:00:00Z",
  "last_verified_date": "2024-01-15T00:00:00Z",
  "dataQuality": 100,
  "members": [
    {
      "id": "uuid",
      "family_id": "GJ-FAM-001245",
      "member_id": "GJ-MEM-1001",
      "relationship": "HEAD",
      "membership_start_date": "2010-01-01T00:00:00Z",
      "residency_status": "RESIDENT",
      "verification_status": "VERIFIED",
      "member": {
        "member_id": "GJ-MEM-1001",
        "name": "Ramesh Patel",
        "date_of_birth": "1964-05-10T00:00:00Z",
        "gender": "MALE",
        "life_status": "ALIVE"
      }
    }
  ],
  "attributes": [
    {
      "id": "uuid",
      "family_id": "GJ-FAM-001245",
      "attribute_key": "CASTE",
      "attribute_value": "SC",
      "source_department": "Social Welfare",
      "verification_status": "VERIFIED",
      "effective_date": "2024-01-01T00:00:00Z"
    }
  ],
  "benefits": [
    {
      "benefit_id": "uuid",
      "family_id": "GJ-FAM-001245",
      "scheme_id": "SCH_PENSION_01",
      "department": "Social Security",
      "benefit_status": "ACTIVE",
      "start_date": "2024-01-01T00:00:00Z",
      "amount": 3000,
      "payment_reference": "PFMS-UTR-901823",
      "scheme": {
        "scheme_id": "SCH_PENSION_01",
        "department": "Social Security",
        "name": "Senior Citizen Pension",
        "description": "Monthly pension for citizens above 60 years",
        "status": "ACTIVE"
      }
    }
  ]
}
```

**Error (404 Not Found):**
```json
{
  "message": "Family not found"
}
```

#### GET /families/search
Search families by ID.

**Query Parameters:**
- `query`: Family ID to search for

**Response (200 OK):**
```json
[
  {
    "family_id": "GJ-FAM-001245",
    "status": "VERIFIED",
    "address": "12, M.G. Road",
    "district": "Ahmedabad",
    "members": [...]
  }
]
```

#### POST /families
Create a new family.

**Request Body:**
```json
{
  "address": "45, Main Street",
  "district": "Surat",
  "taluka": "City",
  "village_or_ward": "Ward 9",
  "household_type": "PUCCA",
  "members": [
    {
      "name": "John Doe",
      "date_of_birth": "1980-01-01",
      "gender": "MALE",
      "relationship": "HEAD"
    }
  ],
  "attributes": [
    {
      "key": "CASTE",
      "value": "GENERAL",
      "source": "CITIZEN_DECLARATION"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "message": "Family created successfully",
  "family": {
    "family_id": "GJ-FAM-123456",
    "address": "45, Main Street",
    "status": "PENDING_VERIFICATION"
  }
}
```

**Error (400 Bad Request):**
```json
{
  "message": "Address and district are required"
}
```

#### POST /families/:id/verify
Verify or reject a family (Admin only).

**Request Body:**
```json
{
  "status": "VERIFIED"
}
```

**Response (200 OK):**
```json
{
  "message": "Family verified successfully",
  "family": {
    "family_id": "GJ-FAM-001245",
    "status": "VERIFIED",
    "verification_status": "VERIFIED",
    "last_verified_date": "2024-01-15T00:00:00Z"
  }
}
```

**Error (400 Bad Request):**
```json
{
  "message": "Invalid status"
}
```

**Error (403 Forbidden):**
```json
{
  "message": "Insufficient permissions"
}
```

---

## Frontend Components

### Component Hierarchy

```
App.tsx
├── Login.tsx
├── Register.tsx
├── OAuthCallback.tsx
├── ProtectedRoute.tsx
├── CitizenLayout.tsx
│   ├── CitizenDashboard.tsx
│   ├── SuvidhaPortal.tsx
│   ├── Applications.tsx
│   └── BenefitWallet.tsx
└── AdminLayout.tsx
    ├── AdminDashboard.tsx
    ├── FamilyVerification.tsx
    ├── DuplicateReview.tsx
    ├── AuditLogs.tsx
    └── LifeEventSimulator.tsx
```

### Page Components

#### Login.tsx
**Purpose:** User authentication page

**Features:**
- Username/password login form
- Google OAuth login button
- Form validation
- Error handling
- Link to registration page

**State:**
- `username`: string
- `password`: string
- `error`: string | null

**API Calls:**
- `POST /api/v1/auth/login`

#### Register.tsx
**Purpose:** User registration page

**Features:**
- Registration form
- Password confirmation
- Form validation
- Error handling
- Link to login page

**State:**
- `username`: string
- `password`: string
- `confirmPassword`: string
- `error`: string | null
- `loading`: boolean

**API Calls:**
- `POST /api/v1/auth/register`

#### CitizenDashboard.tsx
**Purpose:** Main citizen dashboard showing family profile

**Features:**
- Display family information
- Show verification status
- Display data quality score
- List family members
- Show family attributes
- Search functionality
- Responsive design

**State:**
- `family`: Family object
- `searchQuery`: string
- `searchResults`: Family[]
- `loading`: boolean

**API Calls:**
- `GET /api/v1/families/:id`
- `GET /api/v1/families/search`

#### SuvidhaPortal.tsx
**Purpose:** Scheme discovery and application portal

**Features:**
- Display available schemes
- Show eligibility status
- Scheme details
- Apply for schemes
- Filter by department
- Search schemes

**State:**
- `schemes`: Scheme[]
- `loading`: boolean

**API Calls:**
- `GET /api/v1/suvidha/schemes`
- `POST /api/v1/suvidha/apply`

#### Applications.tsx
**Purpose:** Track application status

**Features:**
- List all applications
- Show application status
- Display progress
- Show next steps
- Upload documents
- Filter by status

**State:**
- `applications`: Application[]

**API Calls:**
- `GET /api/v1/families/:id` (includes applications)

#### BenefitWallet.tsx
**Purpose:** View active benefits and payment history

**Features:**
- Display total DBT received
- List active benefits
- Show payment history
- Display payment references
- Filter by benefit type

**State:**
- `benefits`: Benefit[]

**API Calls:**
- `GET /api/v1/families/:id` (includes benefits)

#### AdminDashboard.tsx
**Purpose:** Admin overview with KPIs

**Features:**
- Display KPI cards
- Show verified families count
- Show pending verifications
- Show duplicate alerts
- Show recent life events
- Show deprivation targets

**State:**
- Uses mock data for KPIs

#### FamilyVerification.tsx
**Purpose:** Verify pending family registrations

**Features:**
- List pending families
- Show family details
- Verify individual attributes
- Approve/reject families
- Filter by status
- Search families

**State:**
- `families`: Family[]
- `selectedFamily`: Family | null
- `loading`: boolean

**API Calls:**
- `GET /api/v1/families/:id`
- `POST /api/v1/families/:id/verify`

#### DuplicateReview.tsx
**Purpose:** Review and resolve duplicate records

**Features:**
- List potential duplicates
- Show confidence scores
- Display both records
- Merge or separate decision
- Filter by status

**State:**
- `cases`: DuplicateCase[]

**API Calls:**
- Mock data for demonstration

#### AuditLogs.tsx
**Purpose:** View audit trail

**Features:**
- List all audit logs
- Filter by actor
- Filter by action
- Filter by date range
- Show log details

**State:**
- `logs`: AuditLog[]
- `loading`: boolean

**API Calls:**
- `GET /api/v1/audit/logs` (to be implemented)

#### LifeEventSimulator.tsx
**Purpose:** Simulate life events for testing

**Features:**
- Trigger birth event
- Trigger death event
- Trigger marriage event
- Trigger migration event
- Show event processing log
- Display engine status

**State:**
- `log`: string[]

**API Calls:**
- Mock simulation for demonstration

### Layout Components

#### CitizenLayout.tsx
**Purpose:** Layout wrapper for citizen pages

**Features:**
- Navigation sidebar
- Header with user info
- Active route highlighting
- Logout functionality
- Responsive design

#### AdminLayout.tsx
**Purpose:** Layout wrapper for admin pages

**Features:**
- Navigation sidebar
- Header with user info
- Active route highlighting
- Logout functionality
- Dark theme
- Responsive design

#### ProtectedRoute.tsx
**Purpose:** Route guard for authenticated routes

**Features:**
- Check authentication status
- Verify user role
- Redirect to login if not authenticated
- Redirect to unauthorized page if wrong role

---

## Backend Components

### Application Structure

```
src/
├── app.ts                 # Express app setup
├── middleware/
│   ├── auth.ts           # JWT authentication
│   └── passport.ts       # OAuth configuration
├── routes/
│   ├── auth.ts           # Auth endpoints
│   ├── family.ts         # Family endpoints
│   └── suvidha.ts        # Suvidha endpoints
└── engines/
    ├── eligibility.ts     # Eligibility evaluation
    ├── deduplication.ts  # Duplicate detection
    ├── deprivation.ts    # Deprivation calculation
    └── exclusion.ts      # Exclusion rules
```

### Middleware

#### auth.ts
**Purpose:** Authentication and authorization middleware

**Functions:**
- `authenticate`: Verifies JWT token and extracts user info
- `requireRole`: Checks if user has required role

**Usage:**
```typescript
router.get('/protected', authenticate, requireRole(['ADMIN']), handler)
```

#### passport.ts
**Purpose:** Passport.js OAuth configuration

**Features:**
- Google OAuth strategy
- User serialization/deserialization
- Session management

### Routes

#### auth.ts
**Purpose:** Authentication endpoints

**Endpoints:**
- `POST /login`: User login
- `POST /register`: User registration
- `GET /google`: Google OAuth initiation
- `GET /google/callback`: OAuth callback

#### family.ts
**Purpose:** Family management endpoints

**Endpoints:**
- `GET /:id`: Get family profile
- `GET /search`: Search families
- `POST /`: Create family
- `POST /:id/verify`: Verify family

#### suvidha.ts
**Purpose:** Suvidha portal endpoints

**Endpoints:**
- `GET /schemes`: Get available schemes
- `POST /apply`: Apply for scheme

---

## Business Logic Engines

### Eligibility Engine

**Location:** `backend/src/engines/eligibility.ts`

**Purpose:** Evaluate family eligibility for government schemes

**Input:**
- Family object with attributes and members
- Scheme object with rules

**Output:**
```typescript
{
  isEligible: boolean,
  reasons: string[]
}
```

**Scheme Rules:**

#### SCH_PENSION_01 (Senior Citizen Pension)
- Must have at least one member aged 60+
- Family income must be ≤ 10,000

#### SCH_PDS_01 (Antyodaya Anna Yojana)
- Family must be BPL (Below Poverty Line)

#### SCH_HOUSING_01 (Housing Assistance)
- House status must be KUCCHA
- Family must be BPL

#### SCH_SCHOLAR_01 (Pre-Matric Scholarship)
- Caste must be SC or ST
- Member must be student

**Algorithm:**
1. Extract family attributes into key-value map
2. Parse income as float
3. Apply scheme-specific rules
4. Generate eligibility reasons
5. Return result

### Deduplication Engine

**Location:** `backend/src/engines/deduplication.ts`

**Purpose:** Detect duplicate family records

**Input:**
- New family object
- Array of new members

**Output:**
```typescript
[
  {
    existing_family_id: string,
    confidence_score: number,
    reason: string
  }
]
```

**Algorithm:**
1. Fetch all existing families with members
2. For each existing family:
   - Compare member names (case-insensitive)
   - Compare member dates of birth
   - Count exact matches
3. Calculate confidence: (matches / total members) * 100
4. Return families with matches > 0

**Confidence Levels:**
- 100%: All members match
- 75-99%: High confidence
- 50-74%: Medium confidence
- 25-49%: Low confidence
- <25%: Very low confidence

### Deprivation Engine

**Location:** `backend/src/engines/deprivation.ts`

**Purpose:** Calculate SECC deprivation index

**Input:**
- Family object with attributes and members

**Output:**
```typescript
{
  score: number,
  indicators: {
    d1: boolean,
    d2: boolean,
    d3: boolean,
    d4: boolean,
    d5: boolean,
    d6: boolean,
    d7: boolean
  },
  isDeprived: boolean
}
```

**Indicators:**

#### D1: Housing Condition
- House status is KUCCHA

#### D2: Female-headed Household
- No adult males (age 16-59)

#### D3: Social Group
- Caste is SC or ST

#### D4: Disability
- Disabled member with no able-bodied adult

#### D5: Literacy
- No literate adult above 25

#### D6: Landholding
- Landholding is 0 acres

#### D7: No Able-bodied Adults
- No adults (age 16-59)

**Deprivation Threshold:**
- Score ≥ 3: Deprived
- Score < 3: Not deprived

### Exclusion Engine

**Location:** `backend/src/engines/exclusion.ts`

**Purpose:** Apply exclusion rules for scheme eligibility

**Input:**
- Family object
- Scheme object

**Output:**
```typescript
{
  isExcluded: boolean,
  reasons: string[]
}
```

**Exclusion Rules:**
- Government employee in family
- Income tax payer
- Owns motor vehicle
- Owns refrigerator
- Owns landline phone

---

## Security Implementation

### Authentication

#### JWT Token Structure
```typescript
{
  userId: string,
  username: string,
  role: string,
  familyId?: string,
  iat: number,
  exp: number
}
```

#### Token Generation
- Secret: `JWT_SECRET` from environment
- Expiration: 24 hours
- Algorithm: HS256

#### Password Hashing
- Algorithm: bcrypt
- Salt rounds: 10
- Storage: password_hash field in User table

### Authorization

#### Role-Based Access Control
- **CITIZEN**: Can view own family, apply for schemes
- **ADMIN**: Can verify families, review duplicates, view audit logs

#### Middleware Implementation
```typescript
export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.role || !roles.includes(req.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' })
    }
    next()
  }
}
```

### Data Protection

#### Sensitive Data
- Passwords: Hashed with bcrypt
- Personal information: Stored in database
- Audit logs: Track all access

#### Encryption
- At rest: Database encryption (PostgreSQL)
- In transit: HTTPS/TLS
- Tokens: JWT with signature

### Audit Logging

#### Logged Actions
- User login/logout
- Family verification
- Attribute updates
- Duplicate resolution
- Life event processing
- Benefit changes

#### Log Structure
```typescript
{
  log_id: string,
  actor_id: string,
  actor_role: string,
  action: string,
  entity_type: string,
  entity_id: string,
  fields_accessed: string,
  purpose: string,
  timestamp: Date
}
```

---

## Testing Strategy

### Unit Testing

#### Backend
- Test each business logic engine
- Test authentication middleware
- Test route handlers
- Test database operations

#### Frontend
- Test component rendering
- Test state management
- Test API calls
- Test form validation

### Integration Testing

#### API Testing
- Test all endpoints
- Test authentication flow
- Test error handling
- Test data persistence

#### Database Testing
- Test CRUD operations
- Test relationships
- Test constraints
- Test migrations

### End-to-End Testing

#### User Flows
- Test registration flow
- Test login flow
- Test family registration
- Test verification workflow
- Test scheme application
- Test benefit viewing

### Test Data

#### Seed Data
- 2 families
- 8 members
- 12 attributes
- 4 schemes
- 2 users (admin, citizen)

---

## Deployment Guide

### Prerequisites
- Node.js 18+
- PostgreSQL (production)
- Git
- GitHub account
- Vercel account (for frontend)
- Render account (for backend)

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@host:port/database
PORT=5000
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-backend.onrender.com/api/v1/auth/google/callback
```

#### Frontend (.env)
```env
VITE_API_BASE_URL=https://your-backend.onrender.com/api/v1
```

### Deployment Steps

#### 1. Database Setup
1. Create PostgreSQL instance on Render or Neon
2. Get connection string
3. Update DATABASE_URL in .env
4. Run migrations: `npx prisma migrate deploy`
5. Seed database: `npx prisma db seed`

#### 2. Backend Deployment
1. Push code to GitHub
2. Create new web service on Render
3. Connect GitHub repository
4. Configure:
   - Root directory: `backend`
   - Build command: `npm install && npx prisma generate`
   - Start command: `npm start`
5. Add environment variables
6. Deploy

#### 3. Frontend Deployment
1. Push code to GitHub
2. Import repository in Vercel
3. Configure:
   - Framework: Vite
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add environment variables
5. Deploy

#### 4. CORS Configuration
Update backend CORS to allow frontend domain:
```typescript
app.use(cors({
  origin: ['https://your-frontend.vercel.app'],
  credentials: true
}))
```

#### 5. OAuth Configuration
Update Google OAuth callback URL:
- Go to Google Cloud Console
- Update authorized redirect URIs
- Add production callback URL

---

## Maintenance Guide

### Database Maintenance

#### Backups
- Enable automatic backups on PostgreSQL
- Schedule daily backups
- Retain backups for 30 days

#### Migrations
- Create migration for schema changes
- Test migration on staging
- Apply to production during low traffic

#### Performance
- Monitor query performance
- Add indexes as needed
- Archive old audit logs
- Clean up expired tokens

### Application Maintenance

#### Updates
- Monitor security vulnerabilities
- Update dependencies regularly
- Test updates in staging first
- Schedule maintenance windows

#### Monitoring
- Monitor application uptime
- Monitor error rates
- Monitor API response times
- Set up alerts for failures

#### Logging
- Centralize logs (ELK stack)
- Monitor error logs
- Monitor access logs
- Set up log rotation

### Security Maintenance

#### Token Management
- Rotate JWT secrets periodically
- Monitor token usage
- Implement token revocation
- Set appropriate expiration

#### Access Control
- Review user permissions regularly
- Remove inactive users
- Audit admin access
- Implement MFA for admins

---

## Troubleshooting

### Common Issues

#### Issue: Database Connection Failed
**Solution:**
- Check DATABASE_URL is correct
- Verify PostgreSQL is running
- Check network connectivity
- Verify credentials

#### Issue: JWT Token Expired
**Solution:**
- Refresh token from frontend
- Check JWT_SECRET is consistent
- Verify token expiration time
- Implement token refresh logic

#### Issue: CORS Errors
**Solution:**
- Verify CORS configuration
- Check frontend URL is allowed
- Verify credentials flag
- Check preflight requests

#### Issue: Build Failures
**Solution:**
- Check Node.js version
- Clear node_modules and reinstall
- Check for dependency conflicts
- Verify environment variables

#### Issue: Deployment Failures
**Solution:**
- Check build logs
- Verify environment variables
- Check database connection
- Verify API endpoints

### Debug Mode

#### Backend
```bash
cd backend
NODE_ENV=development npm run dev
```

#### Frontend
```bash
cd frontend
npm run dev
```

### Logs

#### Backend Logs
- Console output
- Application logs
- Error logs

#### Frontend Logs
- Browser console
- Network tab
- React DevTools

---

## Future Roadmap

### Phase 1: Enhanced Features
- [ ] Mobile app (React Native)
- [ ] SMS notifications
- [ ] Email notifications
- [ ] Document upload
- [ ] Document verification

### Phase 2: Integrations
- [ ] Aadhaar authentication
- [ ] PFMS integration
- [ ] Civil registry integration
- [ ] Bank account linking
- [ ] UPI payments

### Phase 3: Advanced Analytics
- [ ] Dashboard with charts
- [ ] Predictive analytics
- [ ] Fraud detection ML
- [ ] Trend analysis
- [ ] Reporting module

### Phase 4: Scalability
- [ ] Microservices architecture
- [ ] Event-driven architecture
- [ ] GraphQL API
- [ ] Redis caching
- [ ] Load balancing

### Phase 5: Compliance
- [ ] Data localization
- [ ] Privacy by design
- [ ] GDPR compliance
- [ ] Security audit
- [ ] Penetration testing

---

## Conclusion

Gujarat Kutumb ID is a comprehensive family registry and beneficiary management system designed to modernize welfare scheme delivery. The system provides a complete solution from family registration to benefit disbursement, with built-in features for verification, eligibility evaluation, duplicate detection, and audit logging.

The architecture follows best practices for security, scalability, and maintainability, with clear separation of concerns between frontend, backend, and database layers. The modular design allows for easy extension and integration with other government systems.

This documentation provides a complete reference for understanding, deploying, and maintaining the system. For technical architecture details, refer to [ARCHITECTURE.md](ARCHITECTURE.md).

---

**Version:** 1.0.0  
**Last Updated:** September 2026  
**Maintained by:** MSESTAG Team
