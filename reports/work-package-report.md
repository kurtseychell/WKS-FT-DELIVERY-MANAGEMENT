# Work Package Report — World Cup MVP Sportsbook Programme

> Generated: 2026-03-25 | Source: Confluence Architecture Space
> Parent Page: [Work Package List - World Cup MVP](https://foshtech.atlassian.net/wiki/spaces/Architectu/pages/1312129102)

---

## Summary Dashboard

| # | Work Package | Jira | Arch Status | Primary Domains | Risk/Notes |
|---|-------------|------|-------------|-----------------|------------|
| 1 | Central Offer Foundation | SA-66 | HANDED OVER | OFFERING, FEEDS, BETTING | Foundation dependency for most other WPs |
| 2 | Soccer World Cup Hub | SA-14 | DONE (Offering) | FEEDS, OFFERING, BETTING, DATA, PRESENTATION | Depends on SA-66; precedes SA-19 |
| 3 | Simple Parlay | SA-17 | READY FOR HANDOVER | BETTING, EXPERIENCE, INTEGRATION (PAM, WALLET) | Tech debt: DB schema refactor (SBK-2008), API decoupling (SBK-2056) |
| 4 | Settlement from Optic Odds | SA-22 | READY FOR HANDOVER | BETTING, INTEGRATION (OFFER, WALLET) | New wallet adapter; parlay grading complexity |
| 5 | Book & Player On/Off Switch | SA-21 | DONE | BETTING, WEBSITES (Kraken2, WCH) | Kill-switch scope changed to "disable microsite" not "suspend offer" |
| 6 | Bet Placement Controls | SA-20 | DRAFT | BETTING, WEBSITES, DATA | Depends on PAM + WES wallet integration from SA-17 |
| 7 | Bet Ticker | SA-25 | DONE | DATA PLATFORM, BETTING | No impact on Betting — Data Platform enrichment only |
| 8 | Real-Time Liability Reporting | SA-24 | DONE | DATA PLATFORM, BETTING | No impact on Betting — Data Platform enrichment only |
| 9 | Manual Resettlement & Void | SA-23 | READY TO HANDOVER | BETTING, EXPERIENCE/UI, DATA | New Bet Settlement API; wallet transaction traceability |
| 10 | Audit Trail | SA-28 | DONE | ALL DOMAINS | Cross-cutting concern; significant effort; Splunk/New Relic strategy unclear |
| 11 | Real-Time Odds & Market Display | SA-19 | DONE | WEBSITES | Primarily FE/UX; depends on SA-14, SA-27, SA-21 |
| 12 | My Bets (Punter Bet History) | SA-27 | DONE | BETTING, WEBSITES, DATA PLATFORM | New Bet Query Service (CQRS); MUST-HAVE |
| 13 | Bet History (Trader) | SA-26 | DONE | BETTING, WEBSITES | Shares backend with SA-27; Traders Hub UI NOT in MVP scope |
| 14 | SGP | SA-16 | DRAFT | BETTING, EXPERIENCE, OFFER | OpticOdds pricing API dependency; architecture incomplete |
| 15 | Mega Parlay | SA-18 | NO COVERAGE | BETTING, EXPERIENCE | Most complex bet type; performance risk from OpticOdds SGP Pricer calls |
| 16 | Feed Provider Health Checks | SA-71 | HAS COVERAGE | FEEDS | Critical for operational safety; out of scope: Offer/Betting suspension integration |
| 17 | Leftovers from WC Reduced Scope | — | N/A | — | Location Defaults; likely belongs in SA-20 |

---

## Architecture Status Summary

| Status | Count | Work Packages |
|--------|-------|--------------|
| HANDED OVER | 1 | SA-66 |
| READY FOR HANDOVER | 3 | SA-17, SA-22, SA-23 |
| DONE | 8 | SA-14, SA-21, SA-25, SA-24, SA-28, SA-19, SA-27, SA-26 |
| DRAFT | 2 | SA-20, SA-16 |
| NO COVERAGE | 1 | SA-18 |
| OTHER | 2 | SA-71 (has coverage), Leftovers (N/A) |

---

## Detailed Work Package Reports

---

### WP-01: Central Offer Foundation (SA-66)

**One-line scope:** Creates initial version of Central Offer and Brand Offer systems — defines the architecture foundation for the entire offer processing pipeline.

**Architecture Status:** HANDED OVER (2026-03-05)

**Objective:** Addresses the prototype delivered in the "HAPPY" phase where Central Offer and Brand Offer were omitted. Defines how the internal system processes offer and related metadata.

**Key Functionalities:**
1. Define Unified Offer Structure — single source of truth for all Offer Entities (HLE: M)
2. Process Unified Offer Entities — accept from Feeds, process through Offering, publish centrally (HLE: M)
3. Define Unified Offer Resolution Structure — independent from Offer Entities (HLE: M)
4. Process Unified Offer Resolution — accept from Feeds, drive through Offering (HLE: M)
5. Use Pulsar as primary communication approach (HLE: M)
6. Per-service persistent storage for reconciliation/error recovery (HLE: S)
7. Distributed cache for on-demand data availability (HLE: S, DEP: DevOps)
8. Adjusted communication model on betting side (HLE: XS, DEP: SA-17)

**New Components:**
- Offer Processor + DB (streaming via Pulsar, deployed per Central + per Brand in future)
- Offer Resolution + DB
- Offer Configuration + DB (complex business logic for visibility, templates, etc.)
- Offering Redis cache (Pulsar Sink Connector)
- Schema Registry (Avro/protobuf format TBD)
- New Pulsar topics with compacted messages

**Key Dependencies:**
- Feeds teams generate OpticOdds ID list and pass to Offer teams for DB loading
- Betting domain needs model update on interface (XS effort)

**Risks/Notes:**
- Significant refactoring vs original PoC required
- Configuration Service simplified/deferred for v1.55
- For WC scope, no Brand-level offering needed (all brands share same offer)

**Use Cases:** UC-02 (MUST), UC-16 (NICE TO HAVE)

---

### WP-02: Soccer World Cup Hub (SA-14)

**One-line scope:** Players can browse and bet on World Cup-focused soccer fixtures and markets as a coherent "hub" experience.

**Architecture Status:** DONE — Offering (2026-03-13)

**Prerequisites:** SA-66 (Central Offer Foundation) must precede this WP.
**Followed by:** SA-19 (Real-Time Odds & Market Display) — basic FE features delivered as part of this WP.

**Key Functionalities:**
| # | Feature | HLE | Notes |
|---|---------|-----|-------|
| 1 | Live odd updates | Offer: S | Only offer part (OpticOdds → Pulsar for Data team) |
| 2 | Market un/suspensions | Offer: S | Only offer part |
| 3 | OpticOdds feed health monitoring | TBD | Feed sending unhealthy status |
| 5 | Traceability (P99 < 5000ms) | Offer: S? | Performance testing needed |
| 6 | Day 0 data seeding | Offer: XS | OpticOdds integration cache for internal IDs |
| 7 | Market resulting | Offer: S | Offer updated on OpticOdds results |
| 8 | Market grading | — | Bets settled on graded results |
| 9 | Feed Resiliency | Offer: S | Continuation of SA-71 |
| 10 | Offer Reporting | — | Data to Data unit via Pulsar |
| 11 | Batch 1 markets | L (Feed) | feed-management work |
| 13 | Futures/Outrights | SHOULD HAVE | Extend domain model |
| 14 | Outcome Odds formats | Offer: 0 | Already completed |
| 15 | Prematch → Inplay | — | Feature flag: allowInPlayProcessing=false initially |

**Impacted Domains:**
- OFFERING: Minor changes (already covered by SA-66 foundation)
- FEEDS: Unifier integration with new architecture, feature flag for in-play
- BETTING: Integration with new Offering architecture + Offer Health Monitor
- DATA: Accept offering/resolution data for Splunk reports + Diffusion for FEs
- PRESENTATION: Adapt to new Offering architecture

**Use Cases:** UC-02 (MUST), UC-16 (NICE TO HAVE), UC-22 (MUST, Optic Odds tool), UC-24 (MUST, Optic Odds tool), UC-25 (MUST)

---

### WP-03: Simple Parlay (SA-17)

**One-line scope:** Players can build a multi-fixture parlay across World Cup matches, see the combined price, and place the bet.

**Architecture Status:** READY FOR HANDOVER (2026-02-12)

**Objective:** Extend prototype (which only supports Straights) to support Parlay bets and Straight+Parlay combinations.

**Key Functionalities:**
| Feature | Type | Description |
|---------|------|-------------|
| Compose Betslip | Modify | Recalculate combinations on selection changes |
| Compose Parlay | Create | Add/remove selections, system composes possible bets |
| Place Bet - Parlay | Create/Modify | New parlay eligibility checks |
| Place Bet - Debit funds | Create | WES wallet integration (OAT-1, OAT-19, OAT-33) |
| Offer Configuration for Betting | Create | Betting config shared with Offer domain |

**Out of Scope:**
- Aggregated limits validation per punter/outcome (→ SA-20)
- Punter-specific settings (pending PunterManagement evaluation)
- Configure Allowed BetTypes UI tool (subsequent WP)

**Impacted Components:**
- BETTING: Betslip Compilation (combinations, new errors), Betslip Lifecycle (clear operation), Betslip Placement (structure eligibility)
- EXPERIENCE: Betslip UI (display combinations, validation errors, lifecycle handling)
- INTEGRATION: PAM Adapter (NEW — JWT validation via Keycloak replacing PunterManagement), Wallet Adapter (NEW — WES integration replacing mocked wallet)
- SPECIAL: Refactor /tickets endpoint to /betslip resource

**Tech Debt Required:**
- SBK-2056: Decouple API and outbox publisher in BetPlacement Service
- SBK-2008: Refactor shared DB schema (placement + settlement) for volume + decoupling
- Potential gRPC upgrade for BetCompilation ↔ BetPlacement communication

**Post-Delivery Assessment (2026-03-11 from SA-15 Straight Bets):**
Several items partially done or pending that feed into this WP:
- Toggle suspend straight bets → partially done (appSettings)
- Toggle suspend per punter → partially done (hard-coded)
- Betslip settings per punter → pending
- Min/Max bet limits → pending
- JWT validation → pending
- Fixture/Market/Selection validation → partially done (pending FE error codes)
- WES wallet integration → pending
- Bet settlement for pre-game → partially done (pending wallet + resettlements)

**API Changes:**
- `[GET] /betslips/{id}/combinations` — include parlay combination + errors
- `[POST] /betslips/{id}/combinations/{cId}/winnings` — upgraded for parlay odds
- `[POST] /betslips/{id}/bets` — new validation errors
- `[DELETE] /betslips/{id}/legs` — NEW clear betslip endpoint
- WES: `[GET] /operation/{customerId}/balance`, `[POST] /operation`

---

### WP-04: Settlement from Optic Odds (SA-22)

**One-line scope:** Placed bets are graded using market results from OpticOdds and settled so punters can get and reuse their winnings.

**Architecture Status:** READY FOR HANDOVER (2026-02-24)

**Objective:** Complete settlement functionality: parlay grading, real wallet credits/refunds, resettlement from feed corrections.

**Key Functionalities:**
| # | Feature | Type | HLE |
|---|---------|------|-----|
| 1 | Parlay bets grading | Modify | M |
| 2 | Parlay recalculation on leg voided | Create | S |
| 3 | Credit funds on bet won | Create | M |
| 4 | Credit funds on bet voided | Create | S |
| 5 | Close transaction on bet lost | Create | S |
| 6 | Settlement wallet transaction reliability | Create | M |
| 7 | Resettlement from feed provider | Create | M |

**Out of Scope:**
- Punter account restrictions → PAM Wallet
- Manual legs grading/voiding → SA-23
- SGP/Mega-Parlay grading → depends on SA-16, SA-18
- Correction of odds on resettlement → lacks definition in feeds/offer

**New Components:**
- Offer Resolution consumer (replaces prototype OpticOdds Unifier integration)
- RolledBackLegsProcessor (NEW — handles rolled-back leg grading)
- WalletResultsProcessor (NEW — handles completed wallet operations)
- Wallet Adapter for WES integration

**Architecture:** C1/C2/C3 diagrams provided. Uses Apache Pulsar for Offer resolution events and Bet settlement events. HTTP/REST for wallet operations.

**Tech Debt:** SBK-2008 — same DB schema refactor as SA-17

---

### WP-05: Book & Player On/Off Switch (SA-21)

**One-line scope:** Traders/operators can instantly pause betting by brand or restrict specific players to manage incidents and risk.

**Architecture Status:** DONE (2026-03-15)

**Key Design Decision:** Latest agreed solution is to disable the **whole WCH microsite** at the website presentation level, NOT suspend sportsbook offer/betting as a whole. This primarily impacts Frontends and User Experience.

**Two Kill-Switch Types:**
1. **Disable/Re-enable World Cup Hub Microsite** — controlled via Kraken2 Operator Management
2. **Block/Unblock Punter betting** — controlled via Kraken2 Punter Management

**Architecture (Betting Risk Control Service):**
- NEW CQRS service consuming Pulsar events
- Reads Offering Configuration Changed Events + Punter Changed Events
- Maintains **Punter Risk Cache** (Redis) with:
  - Offering Configuration for Betting (temporary, refactored in next phase)
  - Punter Risk Profile
- Cache warm-up via PAM Login Events
- Bet Placement and Bet Compilation check against Punter Risk Cache

**Punter Risk Management Features (12 functionalities):**
1. Register Punter Risk Profile
2. Risk Assessment (IP, country, bet speed, frequency, fresh registration, syndicate, multi-account)
3. Assign/Manage Segments
4. Populate risk-related activity data
5. Lookup Punter Risk Profile
6-8. Manage risk activity/mitigation measure types
9. Execute risk mitigation measures
10-12. Blacklist management

**Impacted Domains:**
- BETTING: New Betting Risk Control Service + Punter Risk Cache (Redis)
- BETTING: Modify Bet Placement + Bet Compilation to integrate with cache
- WEBSITES: Modify WCH Microsite (consume Operator Management events)
- WEBSITES: Extend Punter Management UI + API + data model
- WEBSITES: Extend Operator Management UI + data model

**Use Cases:** UC-29, UC-30, UC-34

---

### WP-06: Bet Placement Controls (SA-20)

**One-line scope:** The book can operate safely by preventing bets outside allowed stake, payout, and odds bounds.

**Architecture Status:** DRAFT (2026-03-12)

**Objective:** Implement configurable constraints, limits, and thresholds evaluated during Betslip Compilation and Placement.

**Key Functionalities:**
| # | Feature | Type | HLE |
|---|---------|------|-----|
| 1 | Compile Betslip validations | Modify | S (BetEn) |
| 2 | Place Bet validations | Modify | (included in #1) |
| 3 | Manage Offering Configuration for Betting | Create | M (unknown effort for sections 3,4,5) |
| 4 | ~~Apply Changes of Offering Config~~ | ~~Create~~ | ~~M~~ (struck through) |
| 5 | ~~Manage Config Item Types~~ | ~~Create~~ | ~~L~~ (struck through) |

**Key Note:** BackOffice system NOT necessarily required for v1.55 scope. Required settings/limits can be directly absorbed by Betting system.

**Validations Required (from v1.55 scope):**
- Punter Account Active (valid JWT + eligible to place bets)
- Fixture, Market, Market Selection are Active (entityCoverage: "COVERED" AND status: "OPEN")
- Odds value is latest from feed
- All static limits (min stake, max stake for straights, max win for straights)

**Dependencies:**
- WES Wallet integration (from SA-17)
- PAM integration (from SA-17)

**Use Cases:** UC-05 (MUST), UC-06 (MUST); UC-07, UC-08, UC-09, UC-33 NOT required for v1.55

---

### WP-07: Bet Ticker (SA-25)

**One-line scope:** Traders/operators can monitor incoming betting activity live and investigate bet history for operational control.

**Architecture Status:** DONE (2026-03-17)

**Objective:** Real-time scrolling monitor of every bet attempt for risk management and trend identification.

**Key Functionalities:**
1. Display Accepted Bets (BHS-2.1)
2. Display Rejected Bets (BHS-2.1)
3. Display Settlement Events (BHS-2.1)
4. Retrieve immutable historical records per bet lifecycle stage (BHS-2.2)
5. Complete auditable view per Unique Bet Reference ID (BHS-3)
6. Multi-parameter filtering engine (BHS-4)
7. Bet events production (HLE: M — heavier on testing than dev)

**Architecture:**
- **Sportsbook produces Integration Events only** — no curation or enrichment
- **Data Platform** (Business Event Enricher) subscribes to Pulsar topics for offer updates, bet placement, and bet settlement
- Three data flow perspectives: Software, Medallion architecture, Kurt's point of view

**Impact:** No new impact on Offer, Betting Placement, or Betting Settlement services — they already publish to Pulsar.

**Use Case:** UC-28 (Risk Manager: View Bet Ticker)

---

### WP-08: Real-Time Liability Reporting (SA-24)

**One-line scope:** Traders/operators see real-time exposure by market, bet type, fixture, brand, and customer to manage risk during events.

**Architecture Status:** DONE (2026-03-17)

**Key Functionalities:**
1. Provide Liability Reports (RPT-03, RPT-04, RPT-05)
2. Include Liabilities Data in Bet Ticker

**Architecture:** Identical pattern to Bet Ticker — Sportsbook produces events, Data Platform enriches and aggregates. No impact on Betting domain expected.

**Use Case:** UC-27 (Risk Manager: Monitor Real-Time Liabilities)

---

### WP-09: Manual Resettlement & Void (SA-23)

**One-line scope:** Traders/operators can correct grading errors and void problematic bets to resolve disputes and keep operations credible.

**Architecture Status:** READY TO HANDOVER (2026-03-15)

**Key Functionalities:**
| # | Feature | HLE |
|---|---------|-----|
| 1 | Settle Bet on Demand (filtering interface) | M |
| 2 | Trigger Settlement on Demand (single leg) | M |
| 3 | Bulk Bet Settlement Preparation | — |
| 4 | Bulk Bet Settlement Execution | — |
| 5 | Manual Settlement Reason Type Management | — |
| 6 | Execute Settlement-related wallet transactions | S |

**New Components:**
- **Bet Settlement API** (NEW) — accepts leg, result, justification note, sends commands to Bet Settlement
- **Bet Management site** in Backoffice — UI for selecting bet legs, setting win/lost/void, adding justification

**Key Behaviors:**
- Manually settled legs are **locked** from subsequent automated resolution
- Resettled bets must rollback previous wallet operations before correction
- Settlement messages must be traceable to original settlement for reporting

**Integrations:**
- BackOffice → BetSettlement API (REST)
- BetSettlement API → BetSettlement Service (Pulsar command queue)
- BetSettlement API → Analytics System (Pulsar audit topic)

**Required Reports:** Manual Payout Volume, Goodwill Cost Analysis, Manual Settlement Audit

**Use Case:** UC-23 (Scheduler: Settle Bets Manually)

---

### WP-10: Audit Trail for Trader & System Actions (SA-28)

**One-line scope:** Operators can review who changed what (and why) to support investigations, compliance, and incident response.

**Architecture Status:** DONE (2026-03-18)

**Key Warning:** This is a **cross-cutting concern** for the whole platform. Effort is significant. Splunk vs New Relic positioning is unclear. Convergence path from WCH back to Futuro platform is undefined.

**Architecture Standards for Auditability:**
1. **Structured Logs** — JSON format with Timestamp, Environment, Application, Message, CorrelationId, LogLevel
2. **Cloud Events** — standard with mandatory properties + correlationid extension
3. **Auditable Actor** — Keycloak UserId or "System" in both logs and events
4. **System Action** — AuditSystemAction property in logs and events
5. **OpenTelemetry** — OTEL instrumentation for distributed traces and metrics (collector deployment is DevOps scope)

**Impact:** ALL domains, ALL components, ALL services must implement structured logging, cloud event metadata, and correlation.

**Use Case:** UC-32 (Chief Trader: View Comprehensive Audit Trail)

---

### WP-11: Real-Time Odds & Market Display (SA-19)

**One-line scope:** Players see up-to-date odds and market availability in near real-time during pre-match and live play.

**Architecture Status:** DONE (2026-03-15)

**Key Scope Decision:** v1.55 targets **PREMATCH only**. Live betting is optional due to aggressive time-to-market. Prematch has very limited pressure on "near real-time".

**Functionalities (all Modify):**
- Display Live Now / Offering Board
- Display Featured Matches
- Display Upcoming Events
- Display Fixture Details (prematch + in-play as nice-to-have)
- Display Outcomes with Odds (prematch + in-play as nice-to-have)

**Architecture:** All features realized by WEBSITES team. Diffusion platform supports near real-time FE updates.

**Impacted Domains:**
- WEBSITES: WCH Presentation (enable/disable from Operator Management), Offer Presentation, Betslip Presentation, My Bets Presentation
- OFFER: Blocker/awareness (SA-14)
- BETTING: Blocker/awareness (SA-27)
- WEBSITES (Punter Management): Blocker/awareness (SA-21)

**Use Cases:** UC-02, UC-03, UC-16

---

### WP-12: My Bets — Punter Bet History (SA-27)

**One-line scope:** Players can review their placed bets and statuses (open/settled/cancelled) and open details to understand outcomes and payouts.

**Architecture Status:** DONE (2026-03-12)

**Priority:** MUST-HAVE

**Key Functionalities:**
| # | Feature | Type | HLE |
|---|---------|------|-----|
| 1 | Serve Bet History for Punter | Create | S |
| 2 | Display Bet History for Punter | Create | — |
| 3 | Serve Detailed Bet History (by ticket ID/hash/token) | Create | S |
| 4 | Display Detailed History — Selected Bet | Create | — |
| 5 | Manage Bet History View (filtering, performance) | Create | S |

**Architecture (CQRS Pattern):**
- **Bet Query Service** (NEW) — consumes Pulsar events, builds two read models:
  - **Bet History** (settled, voided, cancelled — immutable)
  - **Active Bets** (logical deletes on settlement, regular cleaning job)
- **Bet Read Model Cluster** — storage for both projections
- **Checkpoints** component for at-least-once event processing
- **Bet Query API** — exposed interface for FE consumption
- **FE open point:** Active Bets and Bet History served as two separate responses; FE merges with two distinct lists

**Impacted Domains:**
- BETTING: Bet Query Service (Create), Bet Settlement (prerequisite)
- WEBSITES: My Bets Frontend (Create)
- DATA PLATFORM: Diffusion for live updates on active bets

**Use Cases:** UC-11 (MUST), UC-12

---

### WP-13: Bet History — Trader View (SA-26)

**One-line scope:** Traders/operators can investigate bet history for operational control and punter support.

**Architecture Status:** DONE (2026-03-15)

**Key Note:** This WP couples with SA-27 (My Bets). Backend is the **same** Bet Query Service — delivered once in SA-27. The difference is the **target frontend** for internal users (Traders Hub in Kraken 2). **Traders Hub UI was NOT in scope for MVP** — Bet History should be available via API only.

**Architecture:** Identical to SA-27 at the Bet Query Service level. Modify for internal user projections/read models if needed.

---

### WP-14: SGP — Build + Validate + Price + Place (SA-16)

**One-line scope:** Players can build a same-fixture SGP, receive eligibility feedback, see a correlated price, and place the bet.

**Architecture Status:** DRAFT (2026-03-04)

**Key Functionalities:**
- Compose Betslip (Modify) — include SGP combinations
- Compose SGP (Create) — same-game selections handling
- Handle SGP ineligibility (Create) — block invalid combinations
- Obtain SGP Pricing (Create) — from OpticOdds pricing API (synchronous)
- Update SGP Pricing (Create) — on leg odds updates
- Place Bet - SGP (Create/Modify) — BPS-17 through BPS-22
- Configure Settings for SGP BetType (Create) — Trader configuration

**Out of Scope:**
- ADS-14: OpticOdds doesn't push SGP price changes (synchronous API only)
- ADS-15: OpticOdds doesn't notify about SGP eligibility revocation
- ADS-16: Backend depends on Frontend for SGP leg status updates
- Aggregated limits → SA-20
- Master bet placement switch → SA-21

**Architecture:** C1/C2 diagrams exist but domain impact table is **empty** — architecture coverage incomplete.

---

### WP-15: Mega Parlay — Build + Price + Place (SA-18)

**One-line scope:** Players can combine SGPs with straight legs across World Cup fixtures, see the combined price, and place a single bet.

**Architecture Status:** NO COVERAGE (no date, no status)

**Key Risk:** Most complex bet type composition. **Performance issues likely** from repeated calls to OpticOdds SGP Pricer.

**Key Functionalities:**
- Compose Betslip / Mega Parlay (Modify/Create)
- Place Bet - MegaParlay (Create/Modify)
- Configure BetTypes for MegaParlay (Create)
- Offer Configuration for MegaParlay (Create)

**Out of Scope:** Aggregated limits → SA-20

**Architecture:** All sections marked as TODO checklists. No diagrams, no domain impact analysis, no integration details.

---

### WP-16: Feed Provider Health Checks and Monitoring (SA-71)

**One-line scope:** Monitoring and quality analysis of OpticOdds feed provider integration, covering functional and non-functional requirements.

**Architecture Status:** Has C1/C2 coverage (no formal status label)

**Key Functionalities:**
| Feature | HLE | Impact |
|---------|-----|--------|
| Detection of long queues (>1000 messages) | M | Feeds Integration |
| Internal communications monitoring | M | Feeds Integration |
| OpticOdds connection recovery (retries) | M | Feeds Integration |
| OpticOdds heartbeat management | M | Feeds Integration |
| OpticOdds data recovery (snapshot reload) | M | Feeds Integration |
| Connection downtime management (mark as "not covered") | M | Feeds Integration |
| Slow in-play updates (>2s → "not covered") | M | Feeds Integration |
| Slow prematch updates (>10s → "not covered") | M | Feeds Integration |
| Unrecoverable connection management | M | Feeds Integration |

**New Components:**
- **Health Watchdog** (NEW service) — monitors heartbeats, queue lengths, processing delays
- **Feed Recovery Service** (NEW — lift/shift from Unifier)
- Importer, Unifier modified to respond to health events

**Out of Scope (requires Offer + Betting work):**
- When fixture/market marked "not covered" → betting should be suspended
- Manual override of betting suspension
- Integration with existing UI (alerts/metrics need Offer domain data)

---

### WP-17: Leftovers from WC Reduced Scope

**Content:** Minimal — only references:
- Location Defaults (from v1.55 scope document and SA-21)
- Probably should be part of SA-20 (Bet Placement Controls)

---

## Dependency Graph

```
SA-66 (Central Offer Foundation)
 ├── SA-14 (Soccer World Cup Hub) ──── SA-19 (Real-Time Odds Display)
 │    └── SA-71 (Feed Health) feeds into SA-14
 │
SA-17 (Simple Parlay) ──┬── SA-22 (Settlement from Optic Odds)
 │                       ├── SA-20 (Bet Placement Controls)
 │                       └── SA-23 (Manual Resettlement & Void)
 │
SA-21 (Book & Player On/Off Switch) ── impacts SA-19, SA-20
 │
SA-27 (My Bets) ──── SA-26 (Bet History - Trader, shares backend)
 │                    └── SA-19 (depends on SA-27)
 │
SA-25 (Bet Ticker) ── parallel to SA-24 (Liability Reporting)
 │
SA-28 (Audit Trail) ── cross-cutting, all domains
 │
SA-16 (SGP) ──── SA-18 (Mega Parlay, depends on SGP)
 │               └── SA-22 (SGP settlement out of scope until SA-16 done)
 │
Leftovers ── likely → SA-20
```

## Contributor Labels (from parent page)

| Label | Team |
|-------|------|
| wch_cntrbtr_SBK | Sportsbook (FEED, OFFER, BETTING) |
| wch_cntrbtr_WBS | WebSites |
| wch_cntrbtr_DATA | Data Platform (Splunk-based reports) |
| wch_cntrbtr_PAM | PAM |
| wch_cntrbtr_WLT | Wallet |
| wch_cntrbtr_BO | BackOffice (Kraken 2 UI for internal users) |

---

## Key Risks & Observations for Delivery Managers

1. **SA-18 (Mega Parlay) has zero architecture coverage** — highest complexity, highest risk. Cannot be estimated or planned without architecture input.

2. **SA-16 (SGP) is still DRAFT** — domain impact table is empty. Architecture needs to complete this before handover to delivery.

3. **SA-20 (Bet Placement Controls) is DRAFT** — critical for operational safety (prevents bets outside bounds). Several functionalities struck through, unclear what's in/out.

4. **Tech debt SBK-2008** (shared DB schema refactor) blocks both SA-17 and SA-22 — this is a single-point-of-failure for the delivery pipeline.

5. **Splunk vs New Relic strategy is undefined** (noted in SA-28) — affects SA-25, SA-24, SA-28, and any operational tooling decisions.

6. **SA-71 (Feed Health) out of scope items are critical** — when feed marks entities as "not covered", betting should be suspended but that integration isn't scoped in any WP.

7. **WES Wallet integration** is a dependency for SA-17, SA-22, SA-23, SA-20 — any delay here cascades across 4 work packages.

8. **PAM integration** (JWT validation replacing PunterManagement) is a dependency for SA-17 and SA-20.

9. **SA-27 (My Bets) is MUST-HAVE** — new Bet Query Service (CQRS) is foundational for both punter and trader bet history.

10. **SA-21 kill-switch scope changed** from "suspend all markets" to "disable microsite" — significantly reduces backend impact but increases frontend work.
