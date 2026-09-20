# UI/UX Architecture

The design must reflect a **premium, modern, government-grade UI**. It should move away from generic CRUD tables to a polished, citizen-centric, and trustworthy interface.

## 1. Design Aesthetics & Core Principles
- **Trustworthy & Professional**: Clean layouts with strong visual hierarchy. High contrast for readability.
- **Modern & Vibrant**: Avoid plain red/blue. Use curated harmonious palettes (e.g. HSL tailored blues for primary actions, subtle gradients for backgrounds).
- **Dynamic & Responsive**: Glassmorphism elements for overlays, micro-animations on hover/click, and fully responsive layouts across mobile, tablet, and desktop.
- **Accessible (a11y)**: WCAG compliant colors, semantic HTML tags, robust keyboard navigation, and screen-reader support.

## 2. Design System Components
We will use a utility-first approach with **TailwindCSS** combined with headless UI components (e.g., Radix UI or Headless UI) to ensure high accessibility without sacrificing custom design.

### Typography
- **Primary Font**: `Inter` or `Outfit` for a modern, highly legible appearance.
- Clear typographic scale (H1 to H6) for structural hierarchy.

### Color Palette
- **Primary**: Slate/Navy Blue (Government trust) - e.g., `bg-slate-900` to `bg-blue-600`.
- **Accents**: Emerald Green for success/verified, Amber for warnings/pending.
- **Backgrounds**: Soft gray/off-white (`bg-slate-50`) to minimize eye strain.
- **Dark Mode**: Supported with deep charcoal backgrounds (`bg-gray-900`) and soft contrasting text.

### Visual Components
- **Cards**: Soft drop shadows, rounded corners (`rounded-2xl`), subtle borders.
- **Status Badges**: Used extensively to denote verification status (e.g. `Verified` in green, `Pending` in yellow).
- **Loading & Empty States**: Beautiful skeleton loaders for async data. Well-designed illustrations for empty states (e.g., "No duplicate cases found").

## 3. Key Dashboards

### Citizen Portal (Suvidha)
- **Welcome Screen**: Clean interface displaying "Define My Family" or "View Suvidha Profile".
- **Dynamic Profile Page**: A living profile showing family members, verified attributes, and a data-quality score. Include "Where did this information come from?" tooltips for transparency.
- **Suvidha Entitlement Dashboard**: Shows potentially available schemes using clean cards.
  - "Potentially Eligible" - Green checkmarks.
  - "Needs Action" - Amber warnings for missing documents.

### Government Officer Portal
- **KPI Dashboard**: Top-level metrics (Verified Families, Potentially Deprived, Duplicate Cases) presented in modern chart/stat card formats.
- **Data Table**: High-performance data grid with advanced filtering, sorting, and pagination.
- **Human-in-the-Loop Review**: Clean split-screen views for reviewing duplicate cases or life events (e.g., comparing old record vs new event).
- **Audit Trails**: Timeline-style UI showing who accessed what data and when.

## 4. Interaction Design
- Avoid full page reloads. Use optimistic UI updates.
- Micro-interactions: Buttons should have satisfying click states and hover transitions.
- "No Repeated Documents" Flow: In forms, pre-fill verified data and visually lock it to show citizens they don't need to re-enter it.
