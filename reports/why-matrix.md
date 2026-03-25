# WHY Matrix — Demo / Domain / Work Package

> For each WP assigned to a domain under a deliverable, this explains **WHY** that domain needs to contribute, backed by specific requirement IDs.

---

## DELIVERABLE 1: Central Offering Foundation

> **Demo Value:** Punter sees a sportsbook widget with all World Cup odds, can log in/out. Operator gets line history data.

---

### FRONTEND × WP 2 (Soccer World Cup Hub) — SA-14
**Why:** Punter needs to browse and bet on World Cup fixtures as a coherent hub experience. Frontend must build the dedicated WC landing page with featured matches, group standings, and tournament bracket.
> UC-02 (View & Navigate Offering — MUST), FE-004 (World Cup Hub — MUST), FE-001 (Web Desktop — MUST), FE-002 (Mobile Web — MUST)

### FRONTEND × WP 6 (Central Offer Foundation) — SA-66
**Why:** Frontend must consume the new unified offer structure from Pulsar/Diffusion to display offer data. The Offer Processor output feeds the presentation layer — FE needs to adapt to the new domain model and data contracts.
> UC-02 (View & Navigate Offering — MUST), MKT-005 (Real-Time Latency 500ms — MUST), INT-006 (Diffusion — MUST)

### FRONTEND × WP 11 (Real-Time Odds & Market Display) — SA-19
**Why:** Punter must see odds update in near real-time with movement indicators (green up, red down). Suspended markets must show visual indicators. This is the UX polish on top of the data foundation.
> MKT-005 (500ms latency — MUST), MKT-006 (Movement Indicators — MUST), MKT-012 (Market Suspension visual — MUST), MKT-001/002 (Decimal + American format — MUST), MKT-004 (Format Switch — MUST)

---

### FEEDS × WP 2 (Soccer World Cup Hub) — SA-14
**Why:** Feeds must integrate OpticOdds data into the new unified format, handle Batch 1 markets, seed Day 0 data, and manage the prematch→inplay transition. Feeds is the entry point for all offer data.
> INT-003 (OpticOdds Health — MUST), NFR-002 (1000 msgs/sec throughput — MUST), MKT-005 (500ms latency — MUST)

### FEEDS × WP 6 (Central Offer Foundation) — SA-66
**Why:** Feeds must publish offer entities and resolutions into the new unified Pulsar topics that Offer Processor consumes. The schema format, ID generation, and data seeding all originate in Feeds.
> NFR-002 (Feed Throughput — MUST), the entire offer pipeline starts at Feeds

### FEEDS × WP 11 (Real-Time Odds & Market Display) — SA-19
**Why:** Feeds delivers the raw odds updates from OpticOdds that ultimately reach the punter's screen. Feed latency directly impacts the 500ms end-to-end requirement.
> MKT-005 (500ms provider-to-UI — MUST), NFR-001 (Odds Latency — MUST)

---

### OFFER × WP 2 (Soccer World Cup Hub) — SA-14
**Why:** Offer Processor and Offer Resolution services must correctly process World Cup fixtures, markets, outcomes, and results from Feeds into the central offer. Minor changes expected on top of SA-66 foundation.
> UC-02 (View Offering — MUST), MKT-012 (Market Suspension — MUST), RPT-006 (Line History — MUST)

### OFFER × WP 6 (Central Offer Foundation) — SA-66
**Why:** This IS the Offer domain's foundational WP. Offer Processor, Offer Resolution, Offer Configuration, Redis cache, Schema Registry — all new services created here. Defines the unified domain model consumed by all other domains.
> UC-02 (MUST), all offer-related requirements depend on this foundation

### OFFER × WP 11 (Real-Time Odds & Market Display) — SA-19
**Why:** Offer must ensure odds updates are processed and published with minimal latency. The Offer Processor streaming pipeline must meet the 500ms P99 target. Only for SGP: when odds update, Betting must refetch SGP price from OpticOdds Co-Pilot.
> MKT-005 (500ms — MUST), NFR-001 (Odds Latency — MUST), INT-002 (SGP Pricing Refresh — MUST)

---

### BETTING × WP 11 (Real-Time Odds & Market Display) — SA-19
**Why:** Only impacted for SGP scenario — when odds update, Betting needs to refetch the correlated SGP price from OpticOdds Co-Pilot API. Also, Bet Compilation must validate that odds are current before placement.
> INT-002 (SGP Pricing Refresh — MUST), BET-009 (Odds Variance 1% — MUST)

---

### DATA × WP 2 (Soccer World Cup Hub) — SA-14
**Why:** Data Platform must accept offer and resolution data from Pulsar topics to populate Splunk reports and feed Diffusion for real-time FE updates. This is the reporting pipeline for offer events.
> RPT-006 (Line History — MUST), UC-25 (Monitor Odds Line History — MUST)

### DATA × WP 6 (Central Offer Foundation) — SA-66
**Why:** Data must consume the new unified offer topic schemas to build the reporting data layer. The Medallion architecture (Bronze→Silver→Gold) needs to align with the new Offer domain model.
> RPT-006 (Line History — MUST), all reporting depends on correct data ingestion from offer events

### DATA × WP 11 (Real-Time Odds & Market Display) — SA-19
**Why:** Data feeds the Diffusion layer that delivers real-time updates to frontend. Odds changes must flow through Data Platform to reach punter screens within 500ms.
> MKT-005 (500ms — MUST), INT-006 (Diffusion — MUST)

---

### SPLUNK × Deliverable 1: RAW REPORT
**WP 2 (Soccer WC Hub):** Raw offer events — fixture creation, market changes, odds movements, market suspensions. Source data for line history (RPT-006) and feed health monitoring (UC-26).
**WP 6 (Central Offer Foundation):** Raw offer processing events — Offer Processor throughput, error rates, schema validation. Operational visibility into the new offer pipeline.

---

## DELIVERABLE 2: Betslip Core & Placement Flow

> **Demo Value:** Punter can add selections, build a betslip, place a bet, with full validation against operator and punter rules/limits. Data team gets betting event source.

---

### FRONTEND × WP 1 (Simple Parlay) — SA-17
**Why:** Frontend must display parlay combinations in the betslip, handle new validation errors (max legs, incompatible selections), show combined odds, potential winnings, and support the "Clear Betslip" action.
> UC-08 (Place Simple Parlay — MUST), BSL-002 (Auto Bet Type Detection — MUST), BSL-005 (Potential Win Display — MUST), BET-008 (Return ALL Errors — MUST)

### FRONTEND × WP 4 (Book & Player On/Off Switch) — SA-21
**Why:** Frontend must react to the microsite kill-switch — when Operator Management disables the WCH Hub, the entire microsite must go dark. Also must handle punter-specific blocks gracefully.
> OPR-003 (Master Switch — MUST), UC-34 (Enable/Disable Bet Types — MUST), NFR-012 (Feature Controls — MUST)

### FRONTEND × WP 5 (Bet Placement Controls) — SA-20
**Why:** Frontend must display max stake per bet, validate inputs against limits in real-time, and show clear error messages when limits are breached (min bet, max bet, max win).
> UC-05 (View Max Stake Risk — MUST), BSL-004 (Stake Input validated — MUST), LIM-001/002/003/004 (All Limit validations — MUST), BET-008 (Return ALL Errors — MUST)

---

### OFFER × WP 4 (Book & Player On/Off Switch) — SA-21
**Why:** Operator Management (under Offer/Websites) must produce the Offering Configuration Changed Event that signals the kill-switch state. This event is consumed by both Websites and Betting Risk Control Service.
> OPR-003 (Master Switch — MUST), OPR-004 (Per-Offering Hub Switch — MUST), OPR-005 (Bet Type Toggles — MUST)

### OFFER × WP 5 (Bet Placement Controls) — SA-20
**Why:** Offer Configuration for Betting defines the limits and settings that Betting enforces — min stake, max stake, max win, max legs. This is shared responsibility between Offer and Betting domains.
> OPR-007 (Offering-Level Settings — MUST), LIM-001 through LIM-010 (All limits — MUST), UC-33 (Configure Offering Limits — MUST)

---

### BETTING × WP 1 (Simple Parlay) — SA-17
**Why:** Core Betting domain work — extend BetCompilation for parlay combinations, BetPlacement for parlay eligibility checks, integrate with real PAM (JWT) and WES (wallet). This replaces the prototype's straight-only capability.
> UC-08 (Place Simple Parlay — MUST), BET-003 (Simple Parlay Placement — MUST), BET-005 (Parlay Void Handling — MUST), INT-004 (WES Wallet — MUST), INT-005 (PAM Events — MUST), BET-013 (Bet ID Format — MUST)

### BETTING × WP 4 (Book & Player On/Off Switch) — SA-21
**Why:** New Betting Risk Control Service (CQRS) must be created. It consumes Operator/Punter Management events, maintains Punter Risk Cache (Redis), and Bet Placement/Compilation check against it before accepting bets.
> OPR-003 (Master Switch — MUST), UC-29 (Manage Punter Bet Types — MUST), UC-34 (Enable/Disable Bet Types — MUST), OPR-008 (Punter-Level Settings — MUST)

### BETTING × WP 5 (Bet Placement Controls) — SA-20
**Why:** BetCompilation and BetPlacement must enforce all limit validations — min bet ($1), max bet ($500 per bucket), max win ($5000), max legs (12), odds variance (1%), and return complete error lists.
> LIM-001 through LIM-006 (All — MUST), BET-008 (Return ALL Errors — MUST), BET-009 (Odds Variance — MUST), NFR-006 (Idempotent Placement — MUST)

### BETTING × WP 7 (Bet Ticker) — SA-25
**Why:** Betting services must produce structured integration events (bet placed, bet rejected) to Pulsar topics. No new development in Betting — events should already exist, but model/data consistency must be validated.
> RPT-001 (Bet Ticker: Bet Data — MUST), RPT-007 (Rejected Bets — MUST)

### BETTING × WP 8 (Real-Time Liability Reporting) — SA-24
**Why:** Same as WP 7 — Betting produces the raw bet events. Liability calculation happens in Data Platform, but the source data (stakes, odds, outcomes) must be complete and correct in Betting's Pulsar events.
> RPT-003 (Bet Ticker: Liability — MUST), RPT-004 (RT Liabilities Aggregation — MUST), RPT-005 (RT Liabilities Rollup — MUST)

### BETTING × WP 13 (Bet History) — SA-26
**Why:** Bet Query Service (CQRS) — the backend component that builds read models from Pulsar events — is shared between punter-facing My Bets (WP 12) and trader-facing Bet History (WP 13). The bet event data must support both views.
> UC-11 (View Bet History — MUST), UC-12 (Filter Bet History — MUST)

---

### DATA × WP 1 (Simple Parlay) — SA-17
**Why:** Data Platform must consume parlay bet placement events and enrich them for the Bet Ticker and liability dashboards. New bet type (parlay) means new event structures to process.
> RPT-001 (Bet Ticker: Bet Data — MUST)

### DATA × WP 4 (Book & Player On/Off Switch) — SA-21
**Why:** Data must capture kill-switch activation/deactivation events and punter blocking events for audit trail and operational dashboards.
> UC-32 (Audit Trail — MUST), RPT-010 (Punter Risk Report — MUST)

### DATA × WP 5 (Bet Placement Controls) — SA-20
**Why:** Data must consume BetRejected/BetFailed events produced when placements are rejected due to limit violations. These feed the Rejected Bets Report.
> RPT-007 (Rejected Bets Report — MUST)

### DATA × WP 7 (Bet Ticker) — SA-25
**Why:** This IS primarily a Data Platform WP. Business Event Enricher subscribes to Betting Pulsar topics, enriches raw events with offer context (sport hierarchy), and feeds Splunk dashboards.
> RPT-001/002/003 (All Bet Ticker requirements — MUST), UC-28 (View Bet Ticker — MUST)

### DATA × WP 8 (Real-Time Liability Reporting) — SA-24
**Why:** This IS primarily a Data Platform WP. Data aggregates bet events into real-time liability views — per outcome, per market, per fixture — with drill-down and worst-case rollup.
> RPT-004 (RT Liabilities Aggregation — MUST), RPT-005 (RT Liabilities Rollup — MUST), UC-27 (Monitor RT Liabilities — MUST)

### DATA × WP 13 (Bet History) — SA-26
**Why:** Data provides the Bet Read Model Cluster storage guidelines and potentially Diffusion support for live updates on active bets in the trader view.
> UC-28 (View Bet Ticker — MUST), the Data Platform provides infrastructure for read models

---

### SPLUNK × Deliverable 2: RAW REPORT
**WP 1 (Simple Parlay):** Raw bet placement events for parlay bets — betslip composition, placement attempts, acceptances, rejections with error codes. First bet type with multi-leg structure in events.

---

## DELIVERABLE 3: My Bets & Real Data Connection

> **Demo Value:** Punter sees bet history (pending bets, settlement status). Bets are settled from real OpticOdds results (auto + manual). Data team gets settlement source data.

---

### FRONTEND × WP 3 (Settlement from Optic Odds) — SA-22
**Why:** Frontend must display settlement status changes on active bets — won, lost, void, refunded. Must handle resettlement scenarios where a previously settled bet changes status.
> FE-003 (Bet History Punter — MUST), BET-011 (Settlement Cleanup — MUST)

---

### FEEDS × WP 3 (Settlement from Optic Odds) — SA-22
**Why:** Feeds originally provided market results to the prototype. Now the integration switches to Offer Resolution entities published via Pulsar — Feeds must ensure results flow correctly through the new unified pipeline.
> SET-001 (Auto Settlement Source — MUST), the resolution data originates from OpticOdds via Feeds

---

### OFFER × WP 3 (Settlement from Optic Odds) — SA-22
**Why:** Offer Resolution service processes market results from Feeds and publishes Central Offer Resolution events that Betting's settlement engine consumes. This is the bridge between feed results and bet grading.
> SET-001 (Auto Settlement Source — MUST), SET-004 (Resettlement Flow — MUST)

---

### BETTING × WP 3 (Settlement from Optic Odds) — SA-22
**Why:** Core settlement work — parlay grading logic, void leg handling (odds→1.0), real WES wallet integration for credits/refunds/closures, resettlement with rollback. New components: RolledBackLegsProcessor, WalletResultsProcessor.
> SET-001 (Auto Settlement — MUST), SET-004 (Resettlement — MUST), SET-006 (Wallet Adjustment — MUST), BET-005 (Parlay Void Handling — MUST), INT-004 (WES Wallet — MUST), NFR-004 (Settlement within 200s — MUST)

### BETTING × WP 7 (Bet Ticker) — SA-25
**Why:** Settlement events (BetSettled, BetResettled, BetVoided) must be produced to Pulsar for the Bet Ticker's settlement display. Validates that settlement lifecycle events have correct data.
> RPT-001 (Bet Ticker: Bet Data — MUST) — settlement events are a new lifecycle stage in the ticker

### BETTING × WP 8 (Real-Time Liability Reporting) — SA-24
**Why:** When bets are settled, liabilities must be released/adjusted in real-time. Settlement events trigger liability recalculation — settled legs remove exposure from active liability totals.
> RPT-004 (RT Liabilities — dynamic redistribution on leg settlement — MUST)

### BETTING × WP 9 (Manual Resettlement & Void) — SA-23
**Why:** New Bet Settlement API for traders to manually grade/void individual bet legs. Manually settled legs get locked from automated grading. Wallet transactions must be reversible and traceable.
> SET-002 (Manual Settlement Level — MUST), SET-003 (Manual Filter — MUST), SET-005 (Resettlement Reason — MUST), UC-23 (Settle Bets Manually — MUST)

### BETTING × WP 12 (My Bets / Punter Bet History) — SA-27
**Why:** New Bet Query Service (CQRS) consumes all betting lifecycle events from Pulsar and builds Active Bets + Bet History read models. Exposes Bet Query API for frontend. This is a MUST-HAVE for punters.
> UC-11 (View Bet History — MUST), UC-12 (Filter Bet History — MUST), FE-003 (Bet History Punter — MUST)

### BETTING × WP 13 (Bet History) — SA-26
**Why:** Same Bet Query Service backend as WP 12, but serving trader-facing views with extended filtering (by punter, fixture, outcome, etc.). API-only for MVP — no Traders Hub UI.
> SET-003 (Manual Filter capabilities — MUST), RPT-010 (Punter Risk Report needs bet data — MUST)

---

### DATA × WP 3 (Settlement from Optic Odds) — SA-22
**Why:** Data Platform must consume settlement events for Bet Ticker (settlement display), liability reporting (liability release), and P&L reports (payout tracking).
> RPT-008 (P&L Granularity — MUST), RPT-004 (RT Liabilities adjustment on settlement — MUST)

### DATA × WP 7 (Bet Ticker) — SA-25
**Why:** Settlement events add new lifecycle stages to the ticker. Data must enrich settlement events with offer context and display them alongside placement events.
> RPT-001 (Bet Ticker: Settlement Events — MUST)

### DATA × WP 8 (Real-Time Liability Reporting) — SA-24
**Why:** Settlement changes liability positions in real-time. Data must recalculate and redistribute liabilities when legs are settled, voided, or resettled.
> RPT-004/005 (RT Liabilities with dynamic redistribution — MUST)

### DATA × WP 9 (Manual Resettlement & Void) — SA-23
**Why:** Manual settlement audit events must flow to Data for the Manual Payout Volume report, Goodwill Cost Analysis, and Manual Settlement Audit trail.
> SET-005 (Resettlement Reason for audit — MUST), UC-32 (Audit Trail — MUST)

### DATA × WP 12 (My Bets) — SA-27
**Why:** Data Platform provides Diffusion support for live updates on active bets (e.g., "just settled" notifications pushed to punter's My Bets screen).
> FE-003 (Bet History — MUST), INT-006 (Diffusion — MUST)

### DATA × WP 13 (Bet History) — SA-26
**Why:** Data provides Bet Read Model Cluster infrastructure and potentially separate read models for trader-specific views (aggregations, risk patterns).
> RPT-010 (Punter Risk Report — MUST)

---

### SPLUNK × Deliverable 3: RAW REPORT
**WP 3 (Settlement from Optic Odds):** Raw settlement events — leg grading results, wallet transactions (credits, refunds, closures), resettlement events with before/after states.
**WP 12 (My Bets):** Raw bet lifecycle events consumed by Bet Query Service — serves as operational visibility into the CQRS pipeline health.

---

## DELIVERABLE 4: Operation Control & Visibility

> **Demo Value:** Operator can manage settings via Kraken (operator settings, punter settings, manual settlement). Splunk dashboards show feed health, line history, bet placements/rejections, bet history/settlement.

---

### BACKOFFICE × WP 4 (Book & Player On/Off Switch) — SA-21
**Why:** Kraken 2 Operator Management UI must be extended with the WCH Hub master switch. Punter Management UI must support new configuration fields for blocking/unblocking punters.
> OPR-003 (Master Switch — MUST), OPR-009 (Per-Punter Settings Management — MUST), UC-29 (Manage Punter Bet Types — MUST), UC-34 (Enable/Disable Bet Types — MUST)

### BACKOFFICE × WP 5 (Bet Placement Controls) — SA-20
**Why:** Kraken 2 must provide UI for configuring offering-level limits (min stake, max stake, max win, max legs) — though for v1.55, settings can be absorbed directly by Betting. UI is for future but data model matters now.
> UC-33 (Configure Offering Limits — MUST), OPR-007 (Offering-Level Settings — MUST)

### BACKOFFICE × WP 9 (Manual Resettlement & Void) — SA-23
**Why:** New Bet Management UI in Kraken Backoffice — traders select bet legs, set result (win/lost/void), add justification notes. Must show that a leg was manually modified and display the reason.
> SET-002 (Manual Settlement Level — MUST), SET-003 (Manual Filter — MUST), SET-005 (Resettlement Reason — MUST), UC-23 (Settle Bets Manually — MUST)

### BACKOFFICE × WP 10 (Audit Trail) — SA-28
**Why:** All Kraken Backoffice actions must produce audit events — who changed what, when, why. Structured logging with correlation IDs, Cloud Events with actor identity. Cross-cutting requirement for all backoffice tools.
> UC-32 (Comprehensive Audit Trail — MUST), NFR-007 (API Authentication & Audit — MUST)

---

### OFFER × WP 4 (Book & Player On/Off Switch) — SA-21
**Why:** Operator Management service must extend its data model and events to include the WCH Hub kill-switch configuration. Offering Configuration Changed Event is the signal consumed by Websites and Betting.
> OPR-003/004/005 (All operator switches — MUST)

### OFFER × WP 5 (Bet Placement Controls) — SA-20
**Why:** Offer Configuration for Betting holds the limits values that Betting enforces. Even if BackOffice UI is deferred for v1.55, the configuration data model and events must be defined.
> OPR-007 (Offering-Level Settings — MUST), LIM-001 through LIM-010 (All limits — MUST)

---

### BETTING × WP 4 (Book & Player On/Off Switch) — SA-21
**Why:** Betting Risk Control Service consumes operator/punter events and maintains Punter Risk Cache. Bet Placement checks this cache — both master switch AND per-punter eligibility must be true for bet to pass.
> OPR-003 (Master Switch — MUST), UC-34 (AND logic across all levels — MUST), OPR-008 (Punter-Level Settings — MUST)

### BETTING × WP 5 (Bet Placement Controls) — SA-20
**Why:** BetPlacement must enforce all limit validations at placement time. For v1.55 scope, only straight bet validations are required — static limits loaded from configuration.
> LIM-001/002/003/004 (Stake and Win limits — MUST), BET-009 (Odds Variance — MUST)

### BETTING × WP 7 (Bet Ticker) — SA-25
**Why:** Betting domain produces integration events to Pulsar. For operational visibility, the events must contain all required fields (bet data, punter data, liability data) for the Business Event Enricher.
> RPT-001/002/003 (Bet Ticker data fields — MUST)

### BETTING × WP 9 (Manual Resettlement & Void) — SA-23
**Why:** Bet Settlement API accepts manual grading commands. Bet Settlement engine applies leg locks, recalculates settled bets, adjusts wallet balances. Settlement messages traceable to original for reporting.
> SET-002 (Manual Settlement — MUST), SET-004 (Resettlement Flow — MUST), SET-006 (Wallet Adjustment — MUST)

### BETTING × WP 10 (Audit Trail) — SA-28
**Why:** All Betting services must implement structured logging with CorrelationId, Cloud Events with auditable actor and system action. OpenTelemetry instrumentation for distributed traces across the bet lifecycle.
> NFR-007 (API Auth & Audit — MUST), UC-32 (Audit Trail — MUST)

### BETTING × WP 13 (Bet History) — SA-26
**Why:** Bet Query Service API must support trader-level filtering (by punter, fixture, outcome, status, date range) for the Backoffice bet management workflow.
> SET-003 (Manual Filter — MUST)

---

### DATA × WP 4 (Book & Player On/Off Switch) — SA-21
**Why:** Data must capture operator configuration change events and punter status change events for audit reporting and risk dashboards.
> UC-32 (Audit Trail — MUST), RPT-010 (Punter Risk Report — MUST)

### DATA × WP 5 (Bet Placement Controls) — SA-20
**Why:** Data must consume BetRejected events (with limit violation reasons) for the Rejected Bets Report and risk analysis.
> RPT-007 (Rejected Bets Report — MUST)

### DATA × WP 7 (Bet Ticker) — SA-25
**Why:** Business Event Enricher is the core Data Platform component for this WP. Subscribes to bet placement + settlement + offer topics, enriches events with full sport hierarchy, publishes to Splunk.
> UC-28 (View Bet Ticker — MUST), RPT-001/002/003 (All ticker data — MUST)

### DATA × WP 8 (Real-Time Liability Reporting) — SA-24
**Why:** Data aggregates liability data from enriched bet events. Must support drill-down (Outcome→Market→Fixture→League→Sport) and worst-case rollup calculations.
> UC-27 (Monitor RT Liabilities — MUST), RPT-004/005 (Aggregation + Rollup — MUST)

### DATA × WP 9 (Manual Resettlement & Void) — SA-23
**Why:** Manual settlement audit events must be consumed for three specific reports: Manual Payout Volume, Goodwill Cost Analysis, Manual Settlement Audit.
> SET-005 (Resettlement Reason — MUST), RPT-008 (P&L Granularity — MUST)

### DATA × WP 10 (Audit Trail) — SA-28
**Why:** Data Platform is the destination for all audit data. Must ingest structured logs, Cloud Events, and OTEL telemetry from all services. Feeds Splunk dashboards and long-term audit storage.
> UC-32 (Audit Trail — MUST), NFR-007 (API Auth & Audit — MUST)

### DATA × WP 11 (Real-Time Odds & Market Display) — SA-19
**Why:** Data feeds Diffusion for real-time FE updates. Under Deliverable 4, this is about operational visibility — monitoring that the offer-to-display pipeline meets the 500ms SLA.
> MKT-005 (500ms latency — MUST), NFR-001 (Odds Latency — MUST)

### DATA × WP 13 (Bet History) — SA-26
**Why:** Data provides infrastructure for Bet Read Model Cluster and operational monitoring of the CQRS pipeline health.
> Operational monitoring for bet query pipeline

---

### SPLUNK × Deliverable 4: BUSINESS REPORT
**WP 4 (Book On/Off Switch):** Operator action reports — switch activations/deactivations, punter blocks/unblocks, with timestamps and actor identity.
**WP 5 (Bet Placement Controls):** Rejected bets dashboard — rejection reasons, limit violations by type, trends over time. RPT-007.
**WP 7 (Bet Ticker):** Real-time bet ticker dashboard — live scrolling monitor of all bet attempts with full hierarchy drill-down. UC-28, RPT-001/002/003.
**WP 8 (RT Liability Reporting):** Liability dashboard — real-time exposure by market/fixture/league with worst-case rollup. UC-27, RPT-004/005.
**WP 9 (Manual Resettlement):** Manual settlement audit dashboard — payout volumes, goodwill costs, settlement history with reasons. SET-005.
**WP 10 (Audit Trail):** Comprehensive audit trail dashboard — all system/trader actions with correlation IDs, before/after states, searchable. UC-32, NFR-007.
**WP 11 (RT Odds & Market Display):** Odds line history dashboard — tick-level odds history, feed health metrics, latency monitoring. RPT-006, UC-25, UC-26.
**WP 13 (Bet History):** Trader bet investigation dashboard — historical bet lookup by punter/fixture/market with full lifecycle detail. UC-28.

---

## Key Requirement References Used

| Req Category | Key IDs | Impact |
|---|---|---|
| Use Cases | UC-02, UC-05-12, UC-22-35 | Drive all domain assignments |
| Betting | BET-001 to BET-013 | Core placement + settlement logic |
| Limits | LIM-001 to LIM-010 | All MUST — drive WP 5 across domains |
| Settlement | SET-001 to SET-006 | All MUST — drive WPs 3, 9 |
| Reporting | RPT-001 to RPT-010 | Drive WPs 7, 8, 13 in Data/Splunk |
| Operator | OPR-001 to OPR-009 | Drive WPs 4, 5 in Backoffice/Offer |
| Integration | INT-001 to INT-010 | Cross-cutting — PAM, WES, Diffusion |
| Non-Functional | NFR-001 to NFR-012 | Performance + audit constraints |
