# Gujarat Family ID — Hackathon Project Plan

## 0. Problem Statement

> **Introduction of Family ID in Gujarat to improve beneficiary management for various government schemes**

The problem statement is intentionally broad. The project should therefore be designed as a **real-world government digital public infrastructure problem**, not merely as a CRUD application for creating a family number.

The core idea is:

> **Create one trusted, continuously updated family/household identity layer that connects citizens with government departments and schemes, so that the government can identify eligible beneficiaries, reduce duplicate/ineligible benefits, discover deprived families, simplify applications, and keep beneficiary records updated as family circumstances change.**

The proposed solution should be designed around the principle:

**One Family → One Family ID → Multiple Members → Multiple Government Schemes → One continuously updated family profile**

The Family ID should be an **interoperability layer**, not a replacement for departmental databases.

---

# 1. What We Are Actually Building

## 1.1 Product vision

Build a **Gujarat Family Registry and Beneficiary Management Platform** with four major capabilities:

1. **Family Registry**
   - Create and maintain a verified family profile.
   - Give each household a stable Family ID.
   - Give each person a stable Member ID.
   - Maintain family-member relationships and their history.

2. **Dynamic Family Data**
   - Combine information from multiple government departments.
   - Allow citizens to define/confirm their own family.
   - Allow authorised departments to update the attributes they own.
   - Use periodic surveys and event-driven updates to keep information fresh.

3. **Smart Beneficiary Management**
   - Dynamically calculate deprivation/eligibility indicators.
   - Identify potentially eligible but unenrolled families.
   - Identify duplicate/incompatible benefits.
   - Reduce repetitive document submission.

4. **Suvidha — Citizen Benefit Access**
   - Automatically check which schemes a family/member may be eligible for.
   - Show the citizen the schemes they can apply for.
   - Reuse verified data already available in the Family Registry.
   - Avoid asking citizens to repeatedly submit documents that the government already possesses.

---

# 2. Why Family ID Is Required

Today, government schemes are often managed department-by-department.

A single family may have information spread across:

- Women & Child Development
- Food & Civil Supplies
- Health
- Tribal Welfare
- Social Security / Senior Citizen Pension
- Agriculture
- Education
- Revenue / Land Records
- Civil Registration
- Other welfare departments

This creates several problems:

### Problem 1 — Fragmented data

The same family may appear differently in different departmental databases.

### Problem 2 — Repeated documentation

Citizens may repeatedly submit:

- identity proof
- address proof
- income information
- caste/category documents
- family details
- land information
- bank information

even when government already has much of the information.

### Problem 3 — Missed beneficiaries

A citizen may be eligible for a scheme but never know about it or never apply.

### Problem 4 — Duplicate/incompatible benefits

The same person or family may receive overlapping benefits where scheme rules do not permit them.

### Problem 5 — Stale information

Families change continuously:

- births
- deaths
- marriages
- migration
- family splits
- children becoming adults
- changes in income
- changes in employment
- changes in land ownership
- changes in disability status

A static survey cannot reliably represent a continuously changing population.

---

# 3. Departments in the Proposed Gujarat Family ID Ecosystem

The initial hackathon model should focus on these departments:

| Department | Important family/member information |
|---|---|
| Women & Child Development | Children, women, maternal/child welfare, Anganwadi-related information |
| Food & Civil Supplies | Ration card, household composition, PDS entitlement |
| Health | Health-scheme coverage and relevant beneficiary status |
| Tribal Welfare | Tribal beneficiary and scheme information |
| Senior Citizen / Social Security Pensions | Age, pension status, relevant beneficiary information |
| Agriculture | Landholding, farmer information, agricultural scheme benefits |

Additional integrations can later include:

- Revenue / Land Records
- Civil Registration
- Education
- Disability / UDID
- Labour
- Rural Development
- Urban Local Bodies
- Employment
- Government employee databases
- Tax-related verification systems

---

# 4. Core Design Principle: Family ID Is Not a Replacement Database

The proposed system should **not copy every department's entire database into one giant database**.

Instead:

```text
                    +----------------------+
                    |    Gujarat Family    |
                    |       Registry       |
                    +----------+-----------+
                               |
              +----------------+----------------+
              |                |                |
              v                v                v
        WCD / Child       Food & Civil       Health
        Development       Supplies
              |                |                |
              +----------------+----------------+
                               |
                               v
                       Other Departments
```

The Family Registry stores the information required for:

- family identity
- member identity
- relationships
- household status
- selected family attributes
- verified references
- benefit links
- provenance
- eligibility calculations
- audit history

Departmental systems remain authoritative for the data they own.

---

# 5. Family ID vs Member ID

## Family ID

Represents the **current household/family unit for government service delivery**.

Example:

```text
Family ID: GJ-FAM-001245

Members:
    M001 → Father
    M002 → Mother
    M003 → Son
    M004 → Daughter
```

## Member ID

Every individual gets a stable Member ID.

Important:

> A Member ID should remain associated with the person even if the person changes household.

For example:

```text
Before marriage:

Family A
 └── M102 — Daughter

After marriage:

Family A
 └── M102 — Historical member

Family B
 └── M102 — Current member
```

This prevents the creation of a completely new identity whenever family membership changes.

---

# 6. Citizen Should Be Able to Define the Family

This is an important part of the proposed model.

The government can generate **candidate families** using existing datasets, but the citizen should be able to:

- create a family
- confirm family members
- add a member
- remove/flag a member
- correct relationship
- report family split
- report marriage
- report migration
- report death
- report incorrect information

### Citizen flow

```text
Citizen Login
      |
      v
Find Existing Person Profile
      |
      v
"Define My Family"
      |
      +---- Add existing members
      |
      +---- Add new member
      |
      +---- Define relationships
      |
      +---- Confirm address
      |
      v
Submit Family Definition
      |
      v
Verification / Matching
      |
      v
Family ID
```

The citizen's declaration should be treated as a **claim requiring verification where necessary**, rather than automatically becoming authoritative for every attribute.

---

# 7. How We Create the Initial Family Database

The system should not start from zero.

Use existing government data to create **candidate family profiles**.

## Candidate data sources

### 1. Food & Civil Supplies / PDS

Use:

- ration card
- ration-card members
- address
- household composition

This is one of the strongest starting points for identifying households.

### 2. Existing scheme beneficiaries

Use existing beneficiary databases from:

- pension
- scholarships
- health schemes
- women/child welfare
- tribal welfare
- agriculture
- disability schemes

### 3. Civil registration

Use:

- birth registration
- death registration
- marriage registration where available

This can help create/update family relationships.

### 4. Land records

Use landholding information as an **attribute/eligibility signal**, not as proof that all people listed against land belong to the same household.

### 5. Digital Gujarat / assisted service channels

Use existing citizen service infrastructure for:

- citizen confirmation
- correction
- assisted registration
- document/evidence submission where required

---

# 8. Three-Way Family Creation Model

The platform should support three routes.

## Route A — Government-generated candidate family

```text
Existing Government Data
        ↓
Candidate Family
        ↓
Citizen Confirmation
        ↓
Verification
        ↓
Family ID
```

## Route B — Citizen-created family

```text
Citizen
   ↓
Define Family
   ↓
Identity Verification
   ↓
Relationship Verification
   ↓
Family ID
```

## Route C — Assisted registration

For citizens who may not be comfortable with digital services:

```text
Citizen
   ↓
Jan Seva Kendra / e-Gram / Assisted Centre
   ↓
Operator enters information
   ↓
Verification
   ↓
Family ID
```

---

# 9. Family Attributes

The initial hackathon model should explicitly represent the following family-level attributes.

## Required family attributes

- Caste/category
- BPL status
- House status
- Toilet status
- Address
- Land holding
- Income
- Family composition

These should not necessarily all be stored as raw values in the central registry.

Where another government system is authoritative, the Family Registry should preferably store:

```text
Attribute
Source Department
Source Record ID
Value / Reference
Verification Status
Last Updated
Effective Date
```

Example:

```text
Land Holding
    ↓
Revenue/Land System
    ↓
Family Registry stores reference + verified value
```

This avoids creating multiple conflicting versions of the same truth.

---

# 10. Proposed Family Data Model

## Family

```text
Family
-----------------------------
family_id
status
address_id
district
taluka
village_or_ward
household_type
creation_date
last_verified_date
verification_status
```

## Member

```text
Member
-----------------------------
member_id
name
date_of_birth
gender
life_status
contact_reference
identity_reference
```

## Family Membership

```text
FamilyMembership
-----------------------------
family_id
member_id
relationship
membership_start_date
membership_end_date
residency_status
source
verification_status
```

This table is critical because it allows the system to represent:

- family split
- marriage
- migration
- temporary residence
- historical membership

without deleting history.

---

# 11. Family Attribute / Source Model

```text
Family
   |
   +---- Caste → authoritative source
   |
   +---- BPL → welfare/source system
   |
   +---- House status → survey / local verification
   |
   +---- Toilet status → relevant government source/survey
   |
   +---- Address → verified residence sources
   |
   +---- Land holding → land records
   |
   +---- Income → authorised income/tax/source
   |
   +---- Family composition → Family Registry + departmental sources
```

Every material attribute should have:

- source
- source record
- timestamp
- verification state
- confidence
- last updated date

---

# 12. Periodic Surveys

A key requirement is that the Family Registry should not depend only on real-time departmental events.

## Why surveys are required

Some attributes may not generate automatic events:

- house condition
- toilet status
- household income changes
- employment changes
- family composition errors
- asset changes
- migration
- deprivation indicators

Therefore the system should support **periodic family surveys**.

## Survey model

```text
Family Registry
      |
      v
Survey Due
      |
      v
Citizen Self-Survey
      |
      +------ OR ------+
      |                |
      v                v
Mobile/Web       Assisted Survey
                       |
                       v
                Local Verification
      |
      v
Attribute Updated
      |
      v
Eligibility Recalculated
```

### Survey frequency

The exact frequency should be determined through pilot/data-quality analysis rather than hard-coding one universal interval.

A possible hackathon design:

- Annual household review
- Event-based update whenever a major family event occurs
- More frequent verification for rapidly changing eligibility attributes

---

# 13. Dynamic Family Profile

The family profile should not be a static form.

It should be a **living profile**.

Example:

```text
Family ID: GJ-FAM-001245

Family Members: 5

Address:
Ahmedabad, Gujarat

Caste:
SC

BPL:
Yes

House:
Kuccha

Toilet:
No

Land:
0.5 acre

Monthly Income:
₹7,500

Last Verified:
15/08/2026

Data Quality:
92%

Pending Updates:
1
```

The system should also show:

```text
Where did this information come from?

Income → Citizen declaration → Pending verification
Land → Revenue → Verified
Members → PDS → Verified
Birth → Civil Registration → Verified
House status → Survey → Verified
```

This improves transparency and trust.

---

# 14. Dynamic Deprivation Identification

One of the most important features should be a **deprivation assessment engine**.

The system can dynamically calculate seven deprivation parameters to identify potentially deprived families.

## Seven deprivation parameters

### D1 — One-room / Kuccha house

Family lives in a one-room or kuccha house.

### D2 — Female-headed household

No adult male aged 16–59.

### D3 — SC/ST household

Household belongs to SC/ST category.

### D4 — Disabled member + no able-bodied adult

Family contains a disabled member and does not have an able-bodied adult.

### D5 — No literate adult above 25 years

No literate adult older than 25 exists in the family.

### D6 — Landless + casual manual labour income

Family is landless and primarily dependent on casual manual labour.

### D7 — No adult aged 16–59

There is no adult in the household between 16 and 59 years.

---

# 15. Deprivation Engine

The seven parameters should be calculated dynamically from verified family/member attributes.

```text
Family Data
    |
    +---- House status
    +---- Gender
    +---- Age
    +---- Caste
    +---- Disability
    +---- Literacy
    +---- Land holding
    +---- Occupation/income
    |
    v
Deprivation Rules Engine
    |
    +---- D1
    +---- D2
    +---- D3
    +---- D4
    +---- D5
    +---- D6
    +---- D7
    |
    v
Deprivation Profile
```

Example:

```text
Family F1001

D1 = TRUE
D2 = TRUE
D3 = TRUE
D4 = FALSE
D5 = TRUE
D6 = TRUE
D7 = FALSE

Deprivation Indicators = 5 / 7
```

Important:

> The deprivation score should be treated as an analytical/eligibility input. It should not automatically deny a benefit unless the relevant scheme's official rules explicitly require it.

---

# 16. Auto-Exclusion Parameters

The system should also support **exclusion criteria**.

The proposed model includes 10 auto-exclusion parameters:

1. Land > 5 acres
2. Income-tax payer / IT payee
3. Professional-tax payer / PT payee
4. Pucca house with 3 rooms
5. Government employee
6. Income > ₹10,000/month
7. Ownership/use of 2/3/4 wheeler
8. Kisan Credit Card limit > ₹50,000
9. Landline
10. Refrigerator

These should be represented as **rule inputs**, not hard-coded assumptions inside application code.

---

# 17. Eligibility Rule Engine

Instead of writing separate eligibility logic directly into every screen, create a configurable rules engine.

```text
                    Family Registry
                           |
                           v
                   Verified Attributes
                           |
               +-----------+-----------+
               |                       |
               v                       v
       Deprivation Rules       Exclusion Rules
               |                       |
               +-----------+-----------+
                           |
                           v
                  Scheme Eligibility
                           |
              +------------+------------+
              |            |            |
              v            v            v
           Eligible    Ineligible   Needs Review
```

Every result should include a reason.

Example:

```text
Scheme: Senior Citizen Pension

Result: Potentially Eligible

Reasons:
✓ Member age > required threshold
✓ Family income below scheme threshold
✓ No exclusion condition detected

Missing:
! Bank/payment information needs verification
```

---

# 18. Important: Rule Versioning

Government schemes can change.

Therefore:

```text
Scheme
    |
    +---- Rule Version 1
    |
    +---- Rule Version 2
    |
    +---- Rule Version 3
```

Example:

```text
Pension Scheme

Eligibility Rule:
Version: 2026.1
Effective From: 01/04/2026
```

This ensures that an old decision can still be explained later.

---

# 19. Suvidha Subsystem

The citizen-facing **Suvidha subsystem** is one of the major differentiators.

## Objective

> Citizens should not have to understand every government scheme. The system should understand their verified family profile and tell them what they may be entitled to.

### Current model

```text
Citizen
   ↓
Knows Scheme?
   ↓
Finds Form
   ↓
Collects Documents
   ↓
Submits
   ↓
Verification
```

### Proposed Suvidha model

```text
Family ID
   ↓
Verified Family Profile
   ↓
Eligibility Engine
   ↓
Applicable Schemes
   ↓
Citizen sees entitlements
   ↓
Citizen chooses scheme
   ↓
Application
   ↓
Reuse existing verified data
```

---

# 20. "No Repeated Documents" Principle

If the government already has verified information, the citizen should not be asked to submit the same information again.

Example:

```text
Family Registry

Caste Certificate → Verified
Income → Verified
Land → Verified
Address → Verified
Family Members → Verified
```

When applying for a scheme:

```text
Application
----------------------------
Name            → Auto-filled
Family Members  → Auto-filled
Address         → Auto-filled
Caste           → Verified
Income          → Verified
Land            → Verified

Additional documents:
Only documents genuinely required
and unavailable in government systems
```

This directly addresses citizen friction.

---

# 21. Suvidha Eligibility Dashboard

Citizen dashboard:

```text
--------------------------------------------------
                SUVIDHA
--------------------------------------------------

Your Family ID: GJ-FAM-001245

Potentially Available Schemes

1. Senior Citizen Pension
   ✓ Member appears eligible
   [Apply]

2. Scholarship
   ✓ Student appears eligible
   [Apply]

3. PDS Benefit
   ✓ Family appears eligible
   [View Details]

4. Housing Assistance
   ⚠ Additional verification required
   [Check]

--------------------------------------------------
Documents already available:
✓ Address
✓ Caste
✓ Income
✓ Family composition
✓ Land information

Documents required from you:
1. Bank verification
--------------------------------------------------
```

---

# 22. Government Officer Dashboard

The government side should not simply show CRUD records.

It should provide actionable intelligence.

## Dashboard KPIs

```text
Total Families
        ↓
Verified Families
        ↓
Families Pending Verification
        ↓
Potentially Deprived Families
        ↓
Eligible But Not Enrolled
        ↓
Duplicate Cases
        ↓
Benefit Conflicts
        ↓
Pending Corrections
```

### Example

```text
Ahmedabad

Families: 12,40,000

Verified: 11,75,000

Pending verification: 65,000

Potentially deprived: 2,10,000

Eligible but not enrolled:
  Pension → 12,450
  Scholarship → 8,210
  Housing → 4,900

Duplicate cases:
  3,120

Pending citizen corrections:
  5,430
```

---

# 23. Benefit Index

The Family Registry should maintain a **central benefit index**.

It should not necessarily copy the complete transaction history of every department.

Instead, departments publish minimum benefit-status information.

Example:

```text
Family ID
Member ID
Scheme ID
Department
Benefit Status
Start Date
End Date
Amount
Payment Reference
```

This lets the government answer:

> Which schemes is this family already receiving?

---

# 24. Government Questions the Platform Should Answer

### Question 1

**Which members are already receiving government benefits?**

```text
Family ID
    ↓
Benefit Index
    ↓
Member + Scheme + Department
```

### Question 2

**Which eligible families are not receiving a scheme?**

```text
All Families
    ↓
Eligibility Rules
    ↓
Eligible
    ↓
Remove Already Enrolled
    ↓
Eligible But Not Enrolled
```

### Question 3

**Are there duplicate/incompatible benefits?**

```text
Active Benefits
      ↓
Compatibility Rules
      ↓
Potential Conflict
      ↓
Human Review
```

### Question 4

**What changed after a family member died?**

```text
Death Event
    ↓
Family Registry
    ↓
Affected Family
    ↓
Affected Schemes
    ↓
Department Notifications
    ↓
Review / Scheme-specific action
```

---

# 25. DBT Portal

The solution should include a **DBT Portal** as a payment/status integration layer.

The hackathon architecture can demonstrate integration with:

- State IFMS / Khajane-equivalent state financial system
- PFMS for central schemes
- Banking/payment infrastructure
- Aadhaar-enabled payment mechanisms where legally and operationally applicable

The supplied project concept proposes:

> **All payments via AEPS, integrated with Khajane (state IFMS), PFMS (central IFMS), and SBI.**

For the hackathon, represent this as a **proposed integration architecture / assumption to validate with the relevant Gujarat payment architecture**, rather than claiming that every government payment must technically use AEPS.

### DBT flow

```text
Eligibility
    ↓
Scheme Department
    ↓
Benefit Sanction
    ↓
DBT Portal
    ↓
State IFMS / Central IFMS
    ↓
Payment Infrastructure
    ↓
Beneficiary Bank Account / Aadhaar-enabled route where applicable
    ↓
Payment Status
    ↓
Family Benefit Index
```

---

# 26. Department Data Update Model

Different departments should update the information they own.

Example:

```text
Women & Child Development
        ↓
Child / women-related attributes

Food & Civil Supplies
        ↓
Ration card / PDS composition

Health
        ↓
Relevant health scheme coverage

Tribal Welfare
        ↓
Tribal scheme attributes

Social Security
        ↓
Pension status

Agriculture
        ↓
Farmer / land-linked scheme attributes
```

The Family Registry receives:

```text
Data
+
Source
+
Source Record ID
+
Timestamp
+
Verification Status
```

---

# 27. Source-of-Truth Model

The department responsible for an attribute remains its authoritative owner.

| Attribute | Potential authoritative source |
|---|---|
| Birth/death | Civil Registration |
| Ration composition | Food & Civil Supplies |
| Land | Revenue/Land Records |
| Education | Education system |
| Disability | Authorised disability/UDID source |
| Pension status | Social Security/Pension department |
| Farmer/land-linked benefit | Agriculture + land references |
| Family declaration | Citizen + verification workflow |
| House/toilet status | Survey/local verification |
| Income | Authorised income/tax/welfare source |

The central Family Registry should maintain a **source-of-truth map**.

---

# 28. Event-Driven Updates

The Family Registry should react to important events.

```text
Birth
  ↓
Create candidate member
  ↓
Link to family
  ↓
Recalculate affected schemes
```

```text
Death
  ↓
Mark death-reported
  ↓
Identify affected benefits
  ↓
Notify relevant departments
  ↓
Human-safe verification
```

```text
Marriage
  ↓
Family membership change
  ↓
Possible family split/merge
  ↓
Recalculate eligibility
```

```text
Migration
  ↓
Update residence
  ↓
Update jurisdiction
  ↓
Check portability of benefits
```

---

# 29. Family Split and Merge

This is a critical real-world feature.

## Example: marriage

Before:

```text
Family A
 ├── Father
 ├── Mother
 └── Daughter
```

After marriage:

```text
Family A
 ├── Father
 └── Mother

Family B
 ├── Husband
 └── Daughter
```

The daughter's Member ID remains stable.

The system records:

```text
Previous Family → Family A
Current Family → Family B
Effective Date → ...
Reason → Marriage
Evidence → ...
```

Never simply delete the old relationship.

---

# 30. Duplicate Detection

The system should identify three different cases:

### 1. Duplicate person

Same person appears multiple times.

### 2. Duplicate family

Same household appears under multiple Family IDs.

### 3. Legitimate multi-context relationship

A person may legitimately have different family contexts due to:

- migration
- temporary residence
- marriage
- student residence
- family separation

Therefore:

> **Not every match is fraud.**

---

# 31. Deduplication Pipeline

```text
New / Updated Record
        ↓
Exact Matching
        ↓
Probabilistic Matching
        ↓
Relationship Consistency
        ↓
Household Consistency
        |
        +---- Clear duplicate
        |          ↓
        |     Merge proposal
        |
        +---- Possible duplicate
        |          ↓
        |     Citizen/local review
        |
        +---- Legitimate relationship
                   ↓
             Keep contexts
```

Possible matching attributes:

- tokenised identity reference
- name
- Gujarati/English name variants
- date of birth
- gender
- parent/spouse name
- mobile
- address
- existing department IDs

---

# 32. Human-in-the-Loop Principle

Automated systems should **assist government officials**, not silently make irreversible welfare decisions.

For example:

```text
Algorithm
   ↓
"Possible duplicate"
   ↓
Citizen notified
   ↓
Officer review
   ↓
Decision
   ↓
Audit log
```

For benefit-impacting actions:

```text
Automated detection
       ≠
Automatic cancellation
```

The platform should provide:

- reason code
- evidence source
- correction request
- appeal
- audit trail

---

# 33. Privacy and Security

The Family Registry contains highly sensitive information.

The design should follow:

- data minimisation
- purpose limitation
- role-based access
- field-level access
- encryption
- tokenisation
- audit logging
- data provenance
- correction mechanisms
- retention rules
- controlled API access

Do not centrally store unnecessary information such as:

- Aadhaar biometrics
- fingerprints
- iris data
- passwords
- OTPs
- unrestricted medical history
- political information

Use authorised references/tokens where required.

---

# 34. Department-Level Data Access

A department should receive only the information required for its purpose.

Example:

### Scholarship department

Can access:

- member identity
- education
- relevant category
- income indicator
- family information required by scheme

Should not automatically receive:

- complete medical history
- unrelated land details
- unrelated family benefits

This is implemented through **purpose-based APIs and field-level authorization**.

---

# 35. API Architecture

Recommended core APIs:

```text
POST /families
GET  /families/{id}

POST /families/{id}/members
PATCH /families/{id}/members/{memberId}

POST /events/birth
POST /events/death
POST /events/marriage
POST /events/migration

GET /schemes
GET /schemes/{schemeId}/eligibility/{id}

GET /families/{id}/benefits
POST /benefits

POST /duplicate-cases
POST /corrections

GET /families/{id}/deprivation
GET /families/{id}/exclusions
```

All APIs should pass through:

```text
API Gateway
    ↓
Authentication
    ↓
Authorization
    ↓
Purpose Validation
    ↓
Rate Limiting
    ↓
Audit Logging
    ↓
Service
```

---

# 36. Proposed Technical Architecture

```text
                         CITIZENS
                            |
              +-------------+-------------+
              |                           |
        Web / Mobile                 Assisted Centre
              |                           |
              +-------------+-------------+
                            |
                            v
                     API Gateway
                            |
        +-------------------+-------------------+
        |                   |                   |
        v                   v                   v
 Family Service       Member Service      Survey Service
        |                   |                   |
        +-------------------+-------------------+
                            |
                            v
                    Family Registry DB
                            |
        +-------------------+-------------------+
        |                   |                   |
        v                   v                   v
 Eligibility Engine   Deprivation Engine   Duplicate Engine
        |                   |                   |
        +-------------------+-------------------+
                            |
                            v
                      Suvidha Service
                            |
             +--------------+--------------+
             |                             |
             v                             v
      Citizen Dashboard             Officer Dashboard


Departments
     |
     v
Integration/API Layer
     |
     +---- WCD
     +---- Food & Civil Supplies
     +---- Health
     +---- Tribal Welfare
     +---- Pension
     +---- Agriculture
     +---- Revenue
     +---- Civil Registration
     |
     v
Event / Integration Layer
     |
     v
Family Registry
```

---

# 37. Suggested Technology Stack for Hackathon

The technology should remain simple enough to build quickly.

## Frontend

- React
- TypeScript
- Vite
- Tailwind / component library

## Backend

- Node.js
- Express / NestJS

## Database

- PostgreSQL

Reason:

The core Family Registry is highly relational:

- family
- member
- relationship
- scheme
- eligibility rule
- benefit
- survey
- event
- correction
- audit

A relational database is therefore appropriate for the MVP.

## Optional

- Redis for caching
- Message queue/event bus for event processing
- Object storage for supporting documents
- Search engine for officer search at scale

---

# 38. Database Tables for the MVP

```text
families
members
family_memberships
family_attributes
attribute_sources

departments
schemes
scheme_rules
scheme_rule_versions

eligibility_results
deprivation_results
exclusion_results

benefits
benefit_events

surveys
survey_responses

life_events
duplicate_cases
correction_requests

audit_logs
notifications
```

---

# 39. Important Data Relationships

```text
Family
  |
  +----< FamilyMembership >---- Member
  |
  +----< FamilyAttribute
  |
  +----< Benefit
  |
  +----< Survey
  |
  +----< LifeEvent
  |
  +----< Correction
```

And:

```text
Member
  |
  +----< FamilyMembership
  |
  +----< Benefits
  |
  +----< Eligibility
  |
  +----< LifeEvents
```

---

# 40. Scheme Rule Representation

Do not hard-code every scheme.

Represent rules as configurable data.

Example:

```json
{
  "scheme": "senior_citizen_pension",
  "version": "2026.1",
  "conditions": [
    {
      "field": "member.age",
      "operator": ">=",
      "value": 60
    },
    {
      "field": "family.income",
      "operator": "<=",
      "value": 10000
    }
  ]
}
```

For a hackathon prototype, the exact rules should be clearly marked as **demo rules** unless sourced from official scheme documents.

---

# 41. End-to-End Example

Consider:

```text
Family ID: F1001

Members:
1. Ramesh — 62
2. Sita — 57
3. Ravi — 24
4. Priya — 20

Family attributes:
Caste = SC
BPL = Yes
House = Kuccha
Toilet = No
Land = 0.5 acre
Income = ₹7,500/month
```

The engine calculates:

```text
D1 One-room/Kuccha           → TRUE
D2 Female-headed             → FALSE
D3 SC/ST                     → TRUE
D4 Disabled + no adult      → FALSE
D5 No literate adult >25    → depends on member education
D6 Landless + labour        → FALSE
D7 No adult 16–59           → FALSE
```

Then exclusion rules are evaluated.

```text
Exclusions:
Land > 5 acres              → FALSE
IT payer                    → FALSE
PT payer                    → FALSE
Pucca 3-room house          → FALSE
Government employee         → FALSE
Income > ₹10k               → FALSE
Vehicle condition           → ...
KCC > ₹50k                  → ...
Landline                    → ...
Refrigerator                → ...
```

Then:

```text
                 Family Profile
                       |
                       v
              Deprivation Engine
                       |
                       v
               Exclusion Engine
                       |
                       v
              Scheme Rule Engine
                       |
             +---------+---------+
             |                   |
             v                   v
      Potentially Eligible    Not Eligible
             |
             v
           Suvidha
             |
             v
       Citizen Application
```

---

# 42. Life Event Example — Death

Suppose Ramesh dies.

```text
Civil Registration
       |
       v
Death Event
       |
       v
Family Registry
       |
       +---- Member status updated
       |
       +---- Family composition updated
       |
       +---- Affected benefits identified
       |
       +---- Pension department notified
       |
       +---- Eligibility recalculated
       |
       v
Citizen/Department Review
```

The system should not blindly cancel benefits solely because an automated match occurred.

---

# 43. Life Event Example — Marriage

```text
Marriage registered
        |
        v
Member identified
        |
        v
Existing family membership found
        |
        v
Citizen confirms new household
        |
        v
Membership history updated
        |
        v
Eligibility recalculated
```

---

# 44. Periodic Survey + Dynamic Updates

The strongest design is **hybrid**.

```text
              FAMILY REGISTRY
                     |
       +-------------+-------------+
       |                           |
       v                           v
Event-driven updates        Periodic surveys
       |                           |
Birth/death/marriage         House condition
Migration                    Toilet
PDS changes                  Income
Education                    Employment
Disability                   Family composition
       |                           |
       +-------------+-------------+
                     |
                     v
             Verified Profile
                     |
                     v
          Eligibility Recalculation
```

---

# 45. Key Hackathon Innovation

The project should not be pitched simply as:

> "We created a Family ID."

That is too narrow.

The stronger pitch is:

> **"We created a dynamic family intelligence and beneficiary management layer for Gujarat."**

The Family ID is the foundation.

The actual value comes from:

### 1. Citizen-defined family

Citizens can see and confirm who belongs to their household.

### 2. Dynamic family profile

Information continuously changes through events, department updates, and surveys.

### 3. Deprivation engine

The system can identify potentially deprived households.

### 4. Exclusion engine

The system can apply scheme-defined exclusion conditions.

### 5. Suvidha

Citizens can discover benefits without knowing which scheme to search for.

### 6. Benefit index

Government can see the family's benefit footprint.

### 7. Event-driven beneficiary management

Birth, death, marriage, migration etc. trigger relevant updates.

### 8. Human-in-the-loop

Automated systems identify cases; humans/citizens resolve disputed cases.

### 9. Data provenance

Every important attribute has a source.

### 10. Privacy-aware interoperability

Departments exchange only required information.

---

# 46. Hackathon MVP

Do NOT attempt to build the entire Gujarat government ecosystem.

Build a convincing vertical slice.

## MVP should contain

### Module 1 — Citizen onboarding

- Login
- Find/create family
- Add members
- Define relationships
- Confirm address
- Generate Family ID

### Module 2 — Family profile

- Family attributes
- Member list
- Verification status
- Data source
- Last updated time

### Module 3 — Dynamic family events

Demonstrate:

- birth
- death
- marriage
- migration

### Module 4 — Deprivation engine

Implement all 7 parameters.

### Module 5 — Auto-exclusion engine

Implement all 10 parameters.

### Module 6 — Scheme eligibility

Implement 3–5 representative schemes using clearly labelled demo/officially sourced rules.

### Module 7 — Suvidha

Show:

```text
"You may be eligible for..."
```

and allow the citizen to apply.

### Module 8 — Benefit wallet

Show:

```text
Family
 ↓
All current benefits
 ↓
Department
 ↓
Amount/status
```

### Module 9 — Officer dashboard

Show:

- total families
- verified families
- potentially deprived families
- eligible but not enrolled
- duplicate cases
- benefit conflicts
- pending corrections

### Module 10 — Audit & privacy

Show:

```text
Who accessed what?
Why?
When?
Which fields?
```

---

# 47. Demo Dataset

Create approximately:

**500–2,000 synthetic Gujarat families**

Include:

- urban families
- rural families
- tribal families
- SC/ST families
- BPL families
- non-BPL families
- elderly families
- women-headed households
- disabled-member households
- landless families
- agricultural families
- joint families
- migrated families

Create intentional edge cases:

```text
Duplicate Person
Duplicate Family
Marriage
Death
Birth
Family Split
Migration
Missing Data
Conflicting Data
Eligible but not enrolled
Already receiving benefit
```

This will make the demo much stronger than showing only perfect records.

---

# 48. Hackathon Demo Story

The demo should follow one family from beginning to end.

## Scene 1 — Family creation

Citizen logs in.

```text
"We found a possible family using existing government data."

Family members appear.

Citizen confirms/corrects them.

Family ID generated.
```

## Scene 2 — Family profile

Show:

- members
- caste
- BPL
- income
- land
- house
- toilet
- sources

## Scene 3 — Deprivation

System calculates:

```text
7 deprivation indicators
```

Show exactly why each indicator is TRUE/FALSE.

## Scene 4 — Exclusions

System evaluates:

```text
10 exclusion criteria
```

## Scene 5 — Suvidha

System says:

```text
Based on your verified profile,
you may be eligible for:

Pension
Scholarship
PDS-related benefit
Housing support
...
```

## Scene 6 — No repeated documents

Show:

```text
Already verified:
✓ Income
✓ Address
✓ Caste
✓ Family composition
✓ Land

Only additional information required:
...
```

## Scene 7 — Government view

Officer opens dashboard and sees:

```text
Eligible but not enrolled
Potentially deprived
Duplicate cases
Benefit conflicts
```

## Scene 8 — Life event

Simulate a birth/death/marriage.

Show the family profile automatically changing.

## Scene 9 — Audit

Show:

```text
Food & Civil Supplies accessed:
ration-related fields

Agriculture accessed:
land-related fields

Health accessed:
health-scheme coverage

No department accessed unrelated data.
```

This gives the judges a complete story.

---

# 49. Implementation Roadmap

## Phase 0 — Understand the problem

Before coding:

1. Identify target users.
2. Identify departments.
3. Identify schemes.
4. Identify family attributes.
5. Identify existing data sources.
6. Define Family ID.
7. Define Member ID.
8. Define family lifecycle.
9. Define privacy rules.
10. Define MVP.

---

## Phase 1 — Build the data model

Create:

```text
Family
Member
FamilyMembership
FamilyAttribute
Department
Scheme
SchemeRule
EligibilityResult
Benefit
LifeEvent
Survey
DuplicateCase
CorrectionRequest
AuditLog
```

---

## Phase 2 — Build citizen flow

```text
Login
 ↓
Find/Create Family
 ↓
Add/Confirm Members
 ↓
Confirm Attributes
 ↓
Submit
 ↓
Family ID
```

---

## Phase 3 — Build dynamic family profile

Implement:

- attributes
- source
- verification
- timestamps
- corrections

---

## Phase 4 — Build rule engines

Implement:

```text
Deprivation Engine
        +
Exclusion Engine
        +
Scheme Eligibility Engine
```

---

## Phase 5 — Build Suvidha

Implement:

```text
Family Profile
       ↓
Eligibility Engine
       ↓
Applicable Schemes
       ↓
Apply
```

---

## Phase 6 — Build Benefit Index

Implement:

```text
Department
   ↓
Benefit Event
   ↓
Benefit Index
   ↓
Family Benefit Wallet
```

---

## Phase 7 — Build Officer Dashboard

Show:

- coverage
- deprivation
- eligibility
- duplicates
- benefit conflicts
- pending corrections
- survey completion

---

## Phase 8 — Add event simulation

Build buttons/APIs:

```text
Simulate Birth
Simulate Death
Simulate Marriage
Simulate Migration
```

Demonstrate dynamic recalculation.

---

# 50. What We Should NOT Build for the Hackathon

Avoid spending most of the hackathon on:

- actual Aadhaar authentication
- actual banking integration
- real PFMS integration
- real IFMS integration
- live government databases
- real personal data
- production-grade biometric infrastructure
- complete implementation of every government scheme

Instead:

> **Mock external systems through clean APIs and realistic synthetic data.**

Demonstrate how the real integration would work.

---

# 51. What Judges Should See as the Architecture

The architecture should communicate:

```text
                    CITIZEN
                       |
                       v
               FAMILY REGISTRY
                       |
       +---------------+---------------+
       |               |               |
       v               v               v
   Family Data    Life Events     Surveys
       |               |               |
       +---------------+---------------+
                       |
                       v
              VERIFIED FAMILY PROFILE
                       |
       +---------------+---------------+
       |               |               |
       v               v               v
 Deprivation      Exclusion       Eligibility
   Engine           Engine          Engine
       |               |               |
       +---------------+---------------+
                       |
                       v
                    SUVIDHA
                       |
                       v
                 BENEFIT ACCESS
                       |
                       v
              DEPARTMENTAL SYSTEMS
                       |
                       v
                DBT / PAYMENT
```

---

# 52. Success Metrics

The project should be evaluated using measurable outcomes.

## Family Registry

- % families successfully registered
- % members with verified relationships
- % profiles recently verified
- correction turnaround time

## Data Quality

- duplicate detection rate
- false-positive duplicate rate
- stale-record rate
- missing attribute rate

## Beneficiary Management

- eligible-but-not-enrolled families discovered
- duplicate/incompatible benefits detected
- benefit records updated after life events

## Citizen Experience

- average registration time
- number of repeated documents avoided
- application completion rate
- number of corrections resolved

## Governance

- department API usage
- unauthorized access attempts
- audit coverage
- field-level access compliance

---

# 53. Key Real-World Challenges to Address

The system must explicitly handle:

### Joint families

One household may contain multiple sub-families.

### Migrants

A person's permanent/original family may differ from their current residence.

### Women after marriage

Do not automatically delete the member from the natal family without confirmation.

### Homeless / undocumented households

The system should have a route that does not depend exclusively on ration cards.

### Newborns

Birth should create a candidate member.

### Death

Death events should update the profile and trigger scheme-specific workflows.

### Incorrect government data

Citizens need correction mechanisms.

### Conflicting department data

The source-of-truth framework decides which system is authoritative for each attribute.

---

# 54. Privacy-by-Design Architecture

```text
Department Request
       |
       v
Purpose Validation
       |
       v
Role Validation
       |
       v
Field-Level Policy
       |
       v
Minimum Required Data
       |
       v
API Response
       |
       v
Audit Log
```

Example:

```text
Agriculture asks:
"Does member own eligible agricultural land?"

Return:
YES/NO + authorised reference

Do NOT automatically return:
entire health profile
complete family benefit history
unrelated personal information
```

---

# 55. Final Proposed System

The final solution can be named something like:

> **Gujarat Kutumb ID / Gujarat Family ID — Dynamic Family & Beneficiary Management Platform**

The system has six major layers:

```text
1. FAMILY IDENTITY
   Family + Member + Relationships

2. FAMILY DATA
   Caste + BPL + House + Toilet + Address
   + Land + Income + Family Composition

3. DYNAMIC DATA
   Department updates + Events + Periodic Surveys

4. INTELLIGENCE
   Deprivation + Exclusion + Eligibility
   + Duplicate Detection

5. SUVIDHA
   Citizen entitlement discovery
   + simplified application
   + document reuse

6. BENEFIT MANAGEMENT
   Benefit Index + DBT status
   + Department integration
   + Audit
```

---

# 56. Core Differentiator

The project should be presented as:

> **A dynamic, citizen-confirmed Family Registry that converts fragmented departmental data into a continuously updated family profile and uses that profile to proactively identify deprivation, calculate scheme eligibility, simplify applications, prevent duplicate benefits, and improve delivery.**

The Family ID itself is only the identifier.

The real product is the **dynamic beneficiary-management ecosystem built around it**.

---

# 57. Immediate Build Order

When development starts, follow this exact order:

```text
STEP 1
Define Family + Member + Membership data model

        ↓

STEP 2
Create synthetic Gujarat dataset

        ↓

STEP 3
Build citizen family creation/confirmation

        ↓

STEP 4
Generate Family ID + Member IDs

        ↓

STEP 5
Build family profile

        ↓

STEP 6
Add family attributes and source/provenance

        ↓

STEP 7
Implement 7 deprivation parameters

        ↓

STEP 8
Implement 10 exclusion parameters

        ↓

STEP 9
Implement configurable scheme rules

        ↓

STEP 10
Build Suvidha eligibility dashboard

        ↓

STEP 11
Build benefit index

        ↓

STEP 12
Build officer dashboard

        ↓

STEP 13
Add life-event simulation

        ↓

STEP 14
Add duplicate detection

        ↓

STEP 15
Add periodic survey workflow

        ↓

STEP 16
Add privacy/audit dashboard

        ↓

STEP 17
Connect all modules into one end-to-end demo

        ↓

STEP 18
Prepare architecture + problem/solution story
```

---

# 58. The One End-to-End Flow We Must Be Able to Demonstrate

```text
Citizen
  |
  | defines/confirms family
  v
Family ID
  |
  | family + member data
  v
Dynamic Family Profile
  |
  +---- Department Data
  |
  +---- Periodic Survey
  |
  +---- Life Events
  |
  v
Verified Data
  |
  +-------------------+
  |                   |
  v                   v
Deprivation        Exclusion
Engine              Engine
  |                   |
  +---------+---------+
            |
            v
      Eligibility Engine
            |
            v
         Suvidha
            |
            v
    Eligible Schemes
            |
            v
       Citizen Applies
            |
            v
   Department Sanctions
            |
            v
      DBT / Payment
            |
            v
      Benefit Index
            |
            v
 Family + Government Dashboards
```

---

# 59. Final Hackathon Objective

The objective is **not** to build a database containing every Gujarati citizen.

The objective is to demonstrate a technically credible system that answers:

> **"If Gujarat had a trusted Family ID, how would it actually improve the complete lifecycle of government-benefit delivery?"**

The prototype must prove five things:

1. **We can construct and maintain a family identity.**
2. **We can keep family information dynamically updated.**
3. **We can identify deprivation and scheme eligibility.**
4. **We can proactively connect citizens to benefits through Suvidha.**
5. **We can give government a consolidated, auditable beneficiary-management view without creating an uncontrolled central data dump.**

That is the core product story for the hackathon.
