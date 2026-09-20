# Database Architecture

The MVP will use a relational database (PostgreSQL) to handle the complex relationships between families, members, schemes, and rules.

## Core Schema

### 1. Families & Members
```sql
CREATE TABLE families (
    family_id VARCHAR(50) PRIMARY KEY,
    status VARCHAR(20), -- ACTIVE, PENDING_VERIFICATION, SPLIT
    address_id UUID,
    district VARCHAR(100),
    taluka VARCHAR(100),
    village_or_ward VARCHAR(100),
    household_type VARCHAR(50),
    creation_date TIMESTAMP,
    last_verified_date TIMESTAMP,
    verification_status VARCHAR(20)
);

CREATE TABLE members (
    member_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255),
    date_of_birth DATE,
    gender VARCHAR(20),
    life_status VARCHAR(20), -- ALIVE, DECEASED
    contact_reference VARCHAR(255),
    identity_reference VARCHAR(255)
);

CREATE TABLE family_memberships (
    id UUID PRIMARY KEY,
    family_id VARCHAR(50) REFERENCES families(family_id),
    member_id VARCHAR(50) REFERENCES members(member_id),
    relationship VARCHAR(50), -- HEAD, SPOUSE, CHILD, etc.
    membership_start_date DATE,
    membership_end_date DATE, -- NULL if current
    residency_status VARCHAR(20),
    source VARCHAR(50),
    verification_status VARCHAR(20)
);
```

### 2. Attributes & Provenance
```sql
CREATE TABLE family_attributes (
    id UUID PRIMARY KEY,
    family_id VARCHAR(50) REFERENCES families(family_id),
    attribute_key VARCHAR(50), -- CASTE, BPL, HOUSE_STATUS, INCOME
    attribute_value JSONB,
    source_department VARCHAR(100),
    source_record_id VARCHAR(100),
    confidence_score DECIMAL,
    verification_status VARCHAR(20),
    effective_date DATE,
    last_updated TIMESTAMP
);
```

### 3. Schemes & Eligibility Rules
```sql
CREATE TABLE schemes (
    scheme_id VARCHAR(50) PRIMARY KEY,
    department VARCHAR(100),
    name VARCHAR(255),
    description TEXT,
    status VARCHAR(20)
);

CREATE TABLE scheme_rule_versions (
    rule_id UUID PRIMARY KEY,
    scheme_id VARCHAR(50) REFERENCES schemes(scheme_id),
    version VARCHAR(20),
    effective_from DATE,
    conditions JSONB -- e.g. [{"field": "member.age", "operator": ">=", "value": 60}]
);

CREATE TABLE eligibility_results (
    id UUID PRIMARY KEY,
    family_id VARCHAR(50),
    member_id VARCHAR(50), -- NULL if family-level scheme
    scheme_id VARCHAR(50),
    status VARCHAR(20), -- ELIGIBLE, INELIGIBLE, NEEDS_REVIEW
    reasons JSONB,
    calculated_at TIMESTAMP
);
```

### 4. Benefits & Index
```sql
CREATE TABLE benefits (
    benefit_id UUID PRIMARY KEY,
    family_id VARCHAR(50),
    member_id VARCHAR(50),
    scheme_id VARCHAR(50),
    department VARCHAR(100),
    benefit_status VARCHAR(20), -- ACTIVE, SANCTIONED, STOPPED
    start_date DATE,
    end_date DATE,
    amount DECIMAL,
    payment_reference VARCHAR(100)
);
```

### 5. Life Events & Operations
```sql
CREATE TABLE life_events (
    event_id UUID PRIMARY KEY,
    event_type VARCHAR(50), -- BIRTH, DEATH, MARRIAGE, MIGRATION
    family_id VARCHAR(50),
    member_id VARCHAR(50),
    event_date DATE,
    status VARCHAR(20), -- REPORTED, VERIFIED, PROCESSED
    evidence_reference VARCHAR(255),
    created_at TIMESTAMP
);

CREATE TABLE audit_logs (
    log_id UUID PRIMARY KEY,
    actor_id VARCHAR(100),
    actor_role VARCHAR(50),
    action VARCHAR(100),
    entity_type VARCHAR(50),
    entity_id VARCHAR(100),
    fields_accessed JSONB,
    purpose VARCHAR(255),
    timestamp TIMESTAMP
);
```

## Data Requirements for MVP
We need seeds generating 500-2,000 synthetic families. This includes explicit edge cases such as duplicate records, split families, and households eligible for benefits they aren't currently receiving.
