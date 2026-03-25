# SCOPE WITH KURT — Sheet Analysis

> Source: Google Sheet "Delivery Sheet", tab "SCOPE WITH KURT"
> Captured: 2026-03-25

---

## What This Sheet Is

This is a **work breakdown by team and domain**, with numbered work items per team, dependencies between them, and colour-coded status. It is more granular than the FINAL-PLAN sheet — it breaks each domain's work into **specific numbered tasks** (e.g., FD-01, FD-02) rather than just mapping WPs to domains.

This is essentially the **ZOOM LEVEL 02/03 planning** — the order of work per domain with dependencies.

---

## Structure

Each domain has a block of rows containing:
- **Row 1:** Headers — PRODUCT, SOLUTIONS, TEAM LEAD, DOMAIN, MILESTONES, ITEM NO, then numbered columns (1-12)
- **Row 2:** Team info + domain name + work item descriptions
- **Row 3:** Work items with IDs (e.g., FD-01 through FD-10)
- **Row 4:** DEPENDENCIES row — shows which other items must complete first

### Colour Coding
- **Green cells** = in scope / active work
- **Orange cells** = key milestones or critical items
- **White cells** = planned but not yet started
- **Blue header** = CELL WITH SCOPE (label seen in legend area)

---

## Teams and Their Work Breakdown

### 1. EXTERNAL (3rd Parties)
- **Product:** Kurt / TQ
- **Solutions:** Matus
- **Team Lead:** Juan C.
- **Domain:** EXTERNAL — 3rd Parties

| ID | Item | Type |
|----|------|------|
| EX-01 | Optic Odd Feeds | Provider |
| EX-02 | Optic Odds SGP | Provider |
| EX-03 | StatScore | Provider |
| EX-04 | LVision | Provider |
| EX-05 | PAM System | Internal |
| EX-06 | BO KeyCloak | Internal |
| EX-07 | Site KeyCloak | Internal |
| EX-08 | Wallet System | Internal |
| EX-09 | Cashier System | Internal |
| EX-10 | Strapi / Site Tools | Internal |

**Key insight:** Lists ALL external and internal system dependencies in one place. PAM, Wallet, KeyCloak, Cashier are all "internal" but treated as external dependencies for the sportsbook team.

---

### 2. PRODUCT (Product Work)
- **Product:** Kurt
- **Team Lead:** Fede / Jesus

| ID | Item |
|----|------|
| PR-01 to PR-10 | Product work items |

**Scope:** Stakeholder Management, PRD Documents, Specification Documents, Clarifications with Devs / QAs

---

### 3. SOLUTIONS (Solutions Work)
- **Product:** Matus
- **Solutions:** Alberto

| ID | Item |
|----|------|
| SL-01 to SL-10 | Solutions work items |

**Scope:** Dissection of Product Docs, Solution Design, Software Design, High Level Planning / Estimates

---

### 4. FEEDS (Feeds Work)
- **Product:** JESUS & CO
- **Solutions:** ALBERTO
- **Team Lead:** Rodri

| ID | Item | Description |
|----|------|-------------|
| FD-01 | Optic Odds Feed Relay | OO Feed Integration |
| FD-02 | Optic Odds Feed Unifier | OO Feed Integration |
| FD-03 | Optic Odds Feed Health | Feed Health |
| FD-04 | **Optic Odds SGP Integration Service** | OO SGP Integration (orange — critical) |
| FD-05 | Optic Odds SGP Health | SGP Health |
| FD-06 | System Events for Health | System Events |
| FD-07 | Feed System Events | Feed System Events |
| FD-08 | SGP System Events | SGP System Events |
| FD-09 | Health BO API | Health BO API |
| FD-10 | Health BO UI | Health BO UI |

**Dependencies:**
- FD-01 depends on EX-01
- FD-02 depends on FD-01
- FD-03 depends on FD-02, EX-02
- FD-04 depends on FD-02
- FD-05 → FD-02
- FD-06 → FD-03
- FD-07 → FD-04
- FD-08 → FD-03
- FD-09 → FD-09

**Key insight:** FD-04 (Optic Odds SGP Integration Service) is highlighted orange — this is critical and maps to the SGP pricing dependency we identified in the WP analysis. Feeds must integrate the OpticOdds Co-Pilot before SGP can work.

---

### 5. FEEDS — WIDGETS WORK
- **Product:** HANN / LUKE
- **Solutions:** JOSH / TUAN
- **Team Lead:** Tuan Le

| ID | Item |
|----|------|
| WD-01 | STATSCORE Integration |
| WD-02 | LVision Integration |
| WD-03 | Widget Management Configuration |
| WD-04 | Widget Management BO UI |
| WD-05 | Statscore & LVision Health |
| WD-06 | Widget Management System Events |

**Scope:** Statscore integration (pre/live scores), LVision integration (streaming), Widget management. These are SHOULD HAVE features.

**Dependencies:** WD-01/02 depend on EX-03/04 (external providers)

---

### 6. OFFERING (Offering Work)
- **Product:** FEDE / VASSILIS
- **Solutions:** ALBERTO / PAVEL / VIT
- **Team Lead:** Ivan Del Porto

| ID | Item |
|----|------|
| OF-01 | Operator Management Hierarchy + Settings |
| OF-02 | Operator Management BO UI (orange — critical) |
| OF-03 | Consumption of Feed Events / Widget Events for Central Offer |
| OF-04 | Central Offer Rules with Operator Management & Health + Any Transformation (orange) |
| OF-05 | Central Offer System Events |
| OF-06 | Brand Offering Distribution Process / Rules |
| OF-07 | Brand Offering Distribution (Events + APIs) |
| OF-08 | Market Result Processing & Distribution |
| OF-09 | Statistics / Scoreboards / Incidents Stream & API |
| OF-10 | (empty) |

**Dependencies:** OF-01 depends on OF-07, OF-03 depends on FD-02/WD-03, OF-04 depends on OF-01/OF-04, etc.

**Key insight:** OF-02 (Operator Management BO UI) and OF-04 (Central Offer Rules) are highlighted — these are critical for the kill switch and offer configuration.

---

### 7. EXPERIENCE — MIDDLEWARE WORK
- **Product:** KIKE / MARMALEJO
- **Solutions:** DIEGO / MAXI / JOSH / ALBERTO
- **Team Lead:** ? + Costa Rica Team

| ID | Item |
|----|------|
| MW-01 | Consume Offering Distribution |
| MW-02 | Transformation Offering Distribution for Site |
| MW-03 | Middleware Configuration (Default Ordering, Default Offering ID, Market Group, Strapi Mapping, etc.) |
| MW-04 | Middleware System Events |
| MW-05 | Site BFF |
| MW-06 | Diffusion Stream / WebSocket Solution |
| MW-07 | Offering KeyCloak Validation |
| MW-08 | BEAT API / EVENTS |

**Dependencies:** MW-01 depends on OF-07, MW-03 depends on MW-02/MW-03, MW-06 depends on MW-02/MW-03

**Key insight:** This is the **middleware/BFF layer** between Offering and the Website frontend. Includes Diffusion/WebSocket (MW-06) — critical for real-time odds display. Also includes BEAT (analytics tracking).

---

### 8. WEBSITES — SITE WORK
- **Product:** KIKE / JP
- **Solutions:** MAXI
- **Team Lead:** MAXI NAVAS / GUILIANO

| ID | Item |
|----|------|
| SW-01 | Foundations of MicroSite (Venus) |
| SW-02 | Frontend Navigations (Menus / Routing / SEO) |
| SW-03 | Home Page / League Page + Widgets |
| SW-04 | Futures (Outrights) Page |
| SW-05 | Fixture Page + Widgets |
| SW-06 | Betslip Widget (green — active) |
| SW-07 | Bet History Page |
| SW-08 | Punter Settings Page OR Widget |
| SW-09 | Join / Login / Deposit Links (+ Auto Triggers) |
| SW-10 | Statistics / Scoreboards / Widgets |
| SW-11 | BEAT EVENTS |

**Dependencies:** SW-01 depends on EX-10 (Strapi), SW-02 depends on MW-05/MW-06, SW-06 depends on MW-5→BS-01/BP-01/EX-07

**Key insight:** SW-06 (Betslip Widget) is highlighted green — this is the core frontend component for bet placement. It depends on BS (compilation) + BP (placement) + EX-07 (KeyCloak). The "Venus" microsite framework (SW-01) is the foundation for everything.

---

### 9. PUNTER MANAGEMENT WORK
- **Product:** JUAN
- **Solutions:** JOSH / VIT
- **Team Lead:** YULEN / DRILLIND / RYAN

| ID | Item |
|----|------|
| PM-01 | Location Defaults |
| PM-02 | PAM Integration |
| PM-03 | Location Defaults UI |
| PM-04 | Location Defaults UI |
| PM-05 | Punter Management UI (green — critical) |
| PM-06 | Manage Punter Settings API inc. Site Punter Settings / Risk, Punter Settings, Punter Betslip Settings |
| PM-07 | Punter Management System Events |

**Dependencies:** PM-01 depends on EX-05, PM-05 depends on PM-04/OM-06, PM-06 depends on PM-04

**Key insight:** PM-05 (Punter Management UI) is green/highlighted — this is the Kraken tool for managing per-punter settings and risk profiles. Maps to WP 4 (Book & Player On/Off Switch).

---

### 10. BETTING — COMPILATION WORK
- **Product:** FEDE
- **Solutions:** JOSH / VIT
- **Team Lead:** YULEN / DRILLIND / RYAN

| ID | Item |
|----|------|
| BS-01 | Bet Compilation API (green) |
| BS-02 | Compilation Service (green) |
| BS-03 | Bet Compilation for SGP |
| BS-04 | Get Balance ???? |
| BS-05 | ?? Betslip Updates on Odds / Multiplication Need Changes |
| BS-06 | Bet Compilation System Events ??? |

**Dependencies:** BS-02 depends on BS-02 (self), BS-03 depends on BP-05/BP-06

**Key insight:** BS-01 and BS-02 are green — these are the core betslip compilation services (Add Line, compose combinations). BS-03 (SGP compilation) is separate. BS-04 (Get Balance ????) shows uncertainty about wallet balance retrieval approach.

---

### 11. BETTING — PLACEMENT WORK
- **Product:** FEDE
- **Solutions:** JOSH / VIT
- **Team Lead:** YULEN / DRILLIND / RYAN

| ID | Item |
|----|------|
| BP-01 | Bet Placement API + Validation with KeyCloak (green) |
| BP-02 | Bet Placement Validation of Offering |
| BP-03 | Bet Placement Validation of Punter / Operator Management |
| BP-04 | Bet Placement Validation of Risk Management |
| BP-05 | SGP Integration + Validation (orange — critical) |
| BP-06 | Wallet Adapter Integration (Debit / Balance) |
| BP-07 | Bet Placement System Events |
| BP-08 | Store Bets in a Bet Store |

**Dependencies:** BP-01 depends on EX-07, BP-02 depends on OF-07, BP-03 depends on PM-06, BP-05 depends on FD-04

**Key insight:** BP-05 (SGP Integration + Validation) is orange — depends on FD-04 (Optic Odds SGP Integration). BP-06 (Wallet Adapter) depends on EX-08. The placement flow has a clear validation chain: KeyCloak → Offering → Punter Mgmt → Risk → SGP → Wallet.

---

### 12. BETTING — RISK MANAGEMENT WORK
- **Product:** FEDE
- **Solutions:** JOSH / VIT
- **Team Lead:** YULEN / DRILLIND / RYAN

| ID | Item |
|----|------|
| RM-01 | Risk Management API |
| RM-02 | Risk Management Market Calculations |
| RM-03 | Risk Management Punter Calculations |
| RM-04 | Risk Management Bet Calculations |
| RM-05 | Risk Management Liabilities Calculations |
| RM-06 | Risk Management System Events |

**Dependencies:** RM-01 depends on RM-02/RM-04, RM-03 depends on BP-07/RM-05, RM-05 depends on BO-07

---

### 13. BETTING — GRADING & SETTLEMENT WORK
- **Product:** JUAN
- **Solutions:** JOSH / VIT
- **Team Lead:** YULEN / DRILLIND / RYAN

| ID | Item |
|----|------|
| BS-01 | Consume Settlement Distribution (from Offer) |
| BS-02 | Settlement Grading Process Bet Settlement |
| BS-03 | Process Leg Grading Logic |
| BS-04 | Support SGP Grading Logic |
| BS-05 | Settlement Tool Full API |
| BS-06 | Settlement Tool Search / Ordering / Filters |
| BS-07 | Settlement Tool Actions API |
| BS-08 | Settlement Tool UI (orange — critical) |
| BS-09 | Wallet Adapter Integration (Debit / Credit) |
| BS-10 | Settlement System Events |

**Dependencies:** BS-01 depends on OF-08, BS-03 depends on BS-02, BS-08 (Settlement Tool UI) is orange — critical operational tool

**Key insight:** BS-08 (Settlement Tool UI) is the Manual Settlement tool for traders — maps to WP 9. BS-04 (Support SGP Grading) depends on the SGP chain.

---

### 14. BETTING — BET HISTORY & RISK TOOLS WORK
- **Product:** JUAN
- **Solutions:** JOSH / VIT
- **Team Lead:** YULEN / DRILLIND / RYAN

| ID | Item |
|----|------|
| BH-01 | Site Bet History Pull / Push API |
| BH-02 | Site Bet History Search / Ordering / Filters |
| BH-03 | Betting Hub Pull / Push API |
| BH-04 | Betting Hub Search / Ordering / Filters |
| BH-05 | Betting Hub Actions API |
| BH-06 | Betting Hub Notifications & Alerts |
| BH-07 | Betting Hub UI |
| BH-08 | Betting Hub System Events |

**Key insight:** BH-01/02 = punter-facing bet history (WP 12 My Bets). BH-03-07 = trader-facing Betting Hub (WP 13 Bet History). BH-07 (Betting Hub UI) is the Traders Hub that was deferred to API-only in v1.55.

---

### 15. DATA — BUSINESS EVENTS
- **Product:** ALEX K / MARMOLEJO / JP
- **Solutions:** DIEGO
- **Team Lead:** David B / DRM

| ID | Item | Source |
|----|------|--------|
| DEH-01 | Optic Odds Feeds BE | RAW From Provider |
| DEH-02 | OO SGP BE | SGP Offers |
| DEH-03 | SS / LV Widget BE | Mapped Widgets |
| DEH-04 | Feed Health BE | Health Updates |
| DEH-05 | Offering BE | Offering Config Changes, Offering By Brands |
| DEH-06 | MW BE | Middleware Changes, Updates, Aggregations, Middleware Config Changes |
| DEH-07 | Punter Management BE | Punters New, Punter Changes, Punter Setting Changes |
| DEH-08 | Compilation / Placement / Risk BE | Add Lines, From which widgets |
| DEH-09 | Wallet / Settlement / Betting Hub BE | Settlement, System, Manual Settlement, From Wallet |
| DEH-10 | BEAT BE | From Frontend |

**Dependencies:** DEH-01 depends on FD-07, DEH-05 depends on OF-05, DEH-08 depends on BS-06/BP-07

**Key insight:** This maps out EVERY business event source that the Data Platform must consume. 10 event streams covering every domain. This is the most complete view of the data pipeline requirements I've seen.

---

### 16. DATA — RECONCILIATIONS
- **Product:** Same DATA team

| ID | Item |
|----|------|
| DER-01 | Feeds Rec |
| DER-02 | Offering Rec |
| DER-03 | Middleware Rec |
| DER-04 | BEAT Rec |
| DER-05 | Betting Rec |
| DER-06 | Wallet Rec |

**Key insight:** Data reconciliation across every boundary — Feeds, Offering, Middleware, BEAT, Betting, Wallet. This is the data integrity layer.

---

## Comparison with What We Already Know

### New Information from This Sheet

1. **Team assignments are much more specific** — not just "FEEDS" but specific people (Jesus, Alberto, Rodri for Feeds; Yulen/Drillind/Ryan for Betting; Maxi Navas/Guiliano for Websites). The FINAL-PLAN sheet only has domain-level assignments.

2. **The MIDDLEWARE / EXPERIENCE layer** (MW-01 to MW-08) is a distinct team (Kike/Marmalejo, Diego/Maxi/Josh/Alberto, Costa Rica team) that sits between Offering and Websites. This team handles:
   - BFF (Backend-for-Frontend)
   - Diffusion/WebSocket (real-time updates)
   - Offering transformation for the site
   - KeyCloak validation
   - BEAT analytics

   This team was not explicitly broken out in our FINAL-PLAN analysis.

3. **WIDGETS is a separate sub-team under FEEDS** (Hann/Luke, Josh/Tuan, Tuan Le) handling StatScore and LVision integrations — these are the SHOULD HAVE features (live scores, streaming).

4. **The dependency chain is much more granular** — e.g., BP-05 (SGP Validation) depends on FD-04 (OO SGP Integration) depends on EX-02 (Optic Odds SGP Provider). The FINAL-PLAN just says "BETTING depends on FEEDS for SGP".

5. **Punter Management is its own work stream** (PM-01 to PM-07) under Juan/Josh/Vit with the same dev team as Betting (Yulen/Drillind/Ryan). Includes Location Defaults, PAM Integration, and the Punter Management UI.

6. **Risk Management is a separate work stream from Placement** (RM-01 to RM-06) — not just "validation in BetPlacement" but a dedicated Risk Management API with market, punter, bet, and liability calculations.

7. **The "Venus" microsite framework** (SW-01) is the website foundation — the FINAL-PLAN just says "FRONTEND" but here we see it's specifically the Venus microsite with Strapi dependency.

8. **Business Events have 10 distinct sources** (DEH-01 to DEH-10) — every domain produces events that Data must consume. This is the most detailed view of what the Data Platform needs to ingest.

9. **Data Reconciliation** (DER-01 to DER-06) is explicitly scoped — reconciliation across Feeds, Offering, Middleware, BEAT, Betting, and Wallet. This wasn't visible in our WP analysis.

10. **Colour coding reveals critical path items:**
    - **Green:** Active/in-scope core items (BS-01/02 Compilation, BP-01 Placement, SW-06 Betslip Widget, PM-05 Punter Mgmt UI)
    - **Orange:** Critical dependencies (FD-04 SGP Integration, OF-02 Operator Mgmt UI, OF-04 Central Offer Rules, BP-05 SGP Validation, BS-08 Settlement Tool UI)

### Confirmed Information

- The SDLC funnel stages match: Product → Solutions → Team execution
- Dependency chains align: SA-66 → SA-14, SA-15 → SA-17 → SA-16 → SA-18
- External dependencies (PAM, Wallet, KeyCloak, OpticOdds) are the same blockers we identified
- Team leads match: Kurt (Product/FE), Matus (Solutions), Juan (Betting Product), Fede (Betting Delivery)

### Gaps This Sheet Fills

| What FINAL-PLAN Shows | What SCOPE WITH KURT Adds |
|----------------------|--------------------------|
| "FRONTEND needs WP 2, 6, 11" | SW-01 Venus foundation, SW-02 Navigation, SW-03 Home Page, SW-05 Fixture Page, SW-06 Betslip Widget — 11 specific items with dependencies |
| "BETTING needs WP 1, 3, 4, 5" | 4 separate work streams: Compilation (BS), Placement (BP), Risk Management (RM), Grading & Settlement (BS) — ~30 specific items |
| "DATA needs all WPs" | 10 business event sources (DEH-01 to DEH-10) + 6 reconciliation streams (DER-01 to DER-06) |
| "OFFER needs WP 2, 6" | 10 specific items (OF-01 to OF-10) with Operator Management hierarchy, Central Offer rules, Brand Offering distribution |
| "FEEDS needs WP 2, 6, 16" | Feed Relay, Unifier, Health, SGP Integration — plus separate Widgets sub-team for StatScore/LVision |
| No middleware layer | Complete MW layer (MW-01 to MW-08) with BFF, Diffusion, KeyCloak, BEAT |
