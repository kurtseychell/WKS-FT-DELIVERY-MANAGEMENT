# Sportsbook Programme — World Cup MVP Delivery Plan

## Leadership Briefing | March 2026

---

## Slide 1: What We're Building

A new sportsbook platform for the FIFA World Cup 2026.

**Target:** 4 brands, pre-match betting on all World Cup fixtures, with full operational tooling.

**Key dates:**
- Soft Launch: April 1, 2026
- Go-Live: May 1, 2026
- World Cup Kick-Off: Mid-June 2026

**Scope (v1.55):** Soccer only. Pre-match only. USD only. en-US only. Web (desktop + mobile responsive). No native apps.

---

## Slide 2: How We've Structured the Delivery

The programme is organized into **4 Deliverables** — each one is a demoable increment of business value.

| # | Deliverable | What the Stakeholder Sees |
|---|-----------|--------------------------|
| 1 | **Central Offering Foundation** | Punter opens the sportsbook and browses World Cup fixtures with live odds |
| 2 | **Betslip Core & Placement Flow** | Punter builds a bet, places it, gets validated. Operator controls limits and kill switch |
| 3 | **My Bets & Real Data Connection** | Punter sees bet history. Bets settle from real results. Real money moves |
| 4 | **Operation Control & Visibility** | Traders manage the book via Kraken. Splunk dashboards show full operational picture |

Each deliverable cuts across **8 domain teams** — the work isn't sequential per team, it's parallel per deliverable.

---

## Slide 3: The 16 Work Packages

Each deliverable is broken into Work Packages (WPs) — scoped, architecture-reviewed units of work.

| # | Work Package | What It Delivers |
|---|-------------|-----------------|
| 1 | Simple Parlay | Punter can combine bets from different matches into one |
| 2 | Soccer World Cup Hub | The World Cup landing page — fixtures, groups, markets |
| 3 | Settlement from Optic Odds | Bets grade and settle automatically from real match results |
| 4 | Book & Player On/Off Switch | Emergency kill switch + per-punter blocking |
| 5 | Bet Placement Controls | Stake limits, payout caps, odds validation |
| 6 | Central Offer Foundation | Our internal offer system — we own the data, not the feed provider |
| 7 | Bet Ticker | Live scrolling feed of every bet for traders |
| 8 | Real-Time Liability Reporting | Real-time book exposure by market and fixture |
| 9 | Manual Resettlement & Void | Traders correct grading errors and void bad bets |
| 10 | Audit Trail | Who changed what, when, why — compliance and accountability |
| 11 | Real-Time Odds & Market Display | Odds update live on screen, suspended markets show clearly |
| 12 | My Bets (Punter History) | Punter checks their active and settled bets anytime |
| 13 | Bet History (Trader) | Traders investigate any punter's betting activity |
| 14 | SGP (Same Game Parlay) | Punter combines selections from the same match |
| 15 | Mega Parlay | SGPs + straights combined across matches — the premium bet type |
| 16 | Feed Provider Health | Detect when OpticOdds is unhealthy, protect punters from stale data |

---

## Slide 4: Work Package Status (Live from Jira — 25 March 2026)

17 Work Packages tracked. Here is the real status from Jira filter 14555:

| # | Jira | Work Package | Jira Status | Priority | Contributing Teams |
|---|------|-------------|-------------|----------|-------------------|
| — | SA-15 | Straight Bet (Build + Price + Place) | **POST-DELIVERY ASSESSMENT** | Medium | SBK, WBS |
| 6 | SA-66 | Central Offer Foundation | **IN DELIVERY** | **High** | SBK |
| 2 | SA-14 | Soccer World Cup Hub | **IN DELIVERY** | Medium | DATA, SBK, WBS |
| 1 | SA-17 | Simple Parlay (Build + Price + Place) | **IN DELIVERY** | Medium | SBK, WBS, WLT |
| 3 | SA-22 | Settlement from Optic Odds | **IN DELIVERY** | Medium | SBK, WLT |
| 5 | SA-20 | Bet Placement Controls | **IN DELIVERY** | Medium | SBK, WBS |
| 7 | SA-25 | Bet Ticker | **IN DELIVERY** | Medium | DATA, SBK |
| 8 | SA-24 | Real-Time Liability Reporting | **IN DELIVERY** | Medium | DATA, SBK |
| 13 | SA-26 | Bet History | **IN DELIVERY** | Medium | BO, DATA, SBK |
| 12 | SA-27 | My Bets (Punter Bet History) | **IN DELIVERY** | Medium | SBK, WBS |
| 16 | SA-71 | Feed Provider Health Checks | **IN DELIVERY** | Medium | SBK |
| 11 | SA-19 | Real-Time Odds & Market Display | **READY FOR HANDOVER** | Medium | SBK, WBS |
| 4 | SA-21 | Book & Player On/Off Switch | **READY FOR HANDOVER** | Medium | BO, DATA, PAM, SBK, WBS |
| 9 | SA-23 | Manual Resettlement & Void | **READY FOR HANDOVER** | Medium | BO, DATA, SBK |
| 10 | SA-28 | Audit Trail for Trader & System Actions | **READY FOR HANDOVER** | Medium | SBK |
| 14 | SA-16 | SGP (Build + Validate + Price + Place) | **SCOPE VALIDATION** | Medium | SBK, WBS |
| 15 | SA-18 | Mega Parlay (Build + Price + Place) | **SCOPE VALIDATION** | Medium | SBK, WBS |

### Status Summary

| Jira Status | Count | What It Means |
|-------------|-------|--------------|
| **Post-Delivery Assessment** | 1 | Straight Bet — delivered, being reviewed |
| **In Delivery** | 11 | Active development and testing |
| **Ready for Handover** | 4 | Architecture done, waiting for delivery teams to pick up |
| **Scope Validation** | 2 | SGP and Mega Parlay — scope still being agreed |

### Key Observations
- **11 of 17 WPs are In Delivery** — the programme is active and moving
- **Straight Bet (SA-15) is complete** — the prototype foundation is done
- **SGP and Mega Parlay are still in Scope Validation** — these are the two most complex bet types and cannot be planned until scope is locked
- **Only SA-66 (Central Offer Foundation) is High priority** — all others are Medium
- **4 WPs are Ready for Handover** but not yet In Delivery — these need delivery team capacity to pick up

### Contributor Team Coverage (from Jira labels)

| Team Label | WP Count | What They Cover |
|-----------|----------|----------------|
| SBK (Sportsbook) | 17 | Every WP — this is the core team |
| WBS (WebSites) | 9 | Frontend-facing WPs — hub, betslip, odds display, bet types |
| DATA | 5 | Ticker, liability, bet history, book switch, WC hub |
| BO (BackOffice) | 3 | Bet history, book switch, manual resettlement |
| WLT (Wallet) | 2 | Simple Parlay and Settlement — money movement |
| PAM | 1 | Book & Player On/Off Switch — authentication/punter management |

**Gap:** DATA label only appears on 5 WPs in Jira, but the FINAL-PLAN sheet assigns DATA work across all 4 deliverables (28 WP-domain assignments). The Jira labels may need updating to reflect actual Data team involvement.

---

## Slide 5: Deliverable 1 — Central Offering Foundation

> **Demo:** Punter opens the sportsbook, sees World Cup fixtures, browses markets, odds update in real-time.

### What each team delivers and why:

| Team | Work | Business Need |
|------|------|--------------|
| **FEEDS** | WP 2, 6, 11, 16 | World Cup data must flow from OpticOdds into our system. No feed = no sportsbook. Feed health monitoring protects us from stale data |
| **OFFER** | WP 2, 6, 11, 16 | We must own our offer — not be a pass-through of OpticOdds. Central Offer gives us control, future provider flexibility |
| **FRONTEND** | WP 2, 6, 11, 16 | Punter needs the WC Hub landing page, structured navigation, real-time odds movement, suspended market indicators |
| **DATA** | WP 2, 6, 11, 16 | Traders need odds line history in Splunk. Data pipeline feeds Diffusion for real-time frontend updates |
| **BETTING** | WP 11, 16 | SGP prices must refresh when odds change. Betting must stop accepting bets when the feed is down |
| **SPLUNK** | RAW: WP 2, 6, 16 | Raw offer events and feed health dashboard — first line of defense for traders |

---

## Slide 6: Deliverable 2 — Betslip Core & Placement Flow

> **Demo:** Punter builds a betslip (straight + parlay + SGP), places a bet, gets validated against limits. Operator controls who can bet and at what limits.

### What each team delivers and why:

| Team | Work | Business Need |
|------|------|--------------|
| **FRONTEND** | WP 1, 4, 5, 14, 15 | Punter sees combined odds, potential winnings, clear error messages. Kill switch makes the site go dark instantly |
| **BETTING** | WP 1, 4, 5, 7, 8, 13, 14, 15, 16 | The core upgrade from prototype — parlay + SGP + Mega Parlay betting, limit enforcement, kill switch enforcement, real wallet + auth integration |
| **OFFER** | WP 4, 5, 14, 15 | Business defines the rules — limits, allowed bet types, SGP/Mega Parlay configurations |
| **DATA** | WP 1, 4, 5, 7, 8, 13, 14, 15, 16 | Every bet attempt flows into reporting. Bet Ticker and Liability dashboards start working. Rejected bets analysis |
| **SPLUNK** | RAW: WP 1, 16 | Raw bet placement events — first multi-leg bets in the system. Feed health operational monitoring |

---

## Slide 7: Deliverable 3 — My Bets & Real Data Connection

> **Demo:** Punter sees bet history updating live. Bets settle automatically from real results. Traders can manually correct errors. Real money moves through wallets.

### What each team delivers and why:

| Team | Work | Business Need |
|------|------|--------------|
| **FRONTEND** | WP 3, 12 | Punter sees "Pending → Won/Lost" on their bets. My Bets screen — the core punter experience for transparency |
| **BETTING** | WP 3, 7, 8, 9, 12, 13, 14, 15 | This is where the business makes or loses money. Real grading, real wallet credits/debits, resettlement, manual corrections. Plus bet history for punter and trader |
| **FEEDS** | WP 3 | Match results flow from OpticOdds — without results, no bets settle |
| **OFFER** | WP 3 | Results flow through our offer resolution — we own the grading, not the feed provider |
| **DATA** | WP 3, 7, 8, 9, 12, 13 | Settlement data feeds P&L reports. Liability positions update as results come in. Manual settlement audit trail. Live push updates for My Bets |
| **SPLUNK** | RAW: WP 3, 12 | Settlement audit trail — every grading decision, every wallet transaction. My Bets pipeline health monitoring |

---

## Slide 8: Deliverable 4 — Operation Control & Visibility

> **Demo:** Operator manages the book from Kraken backoffice. Splunk shows comprehensive operational dashboards — feed health, bet ticker, liability, audit trail, bet history.

### What each team delivers and why:

| Team | Work | Business Need |
|------|------|--------------|
| **BACKOFFICE** | WP 4, 5, 9, 10 | Kraken tools — kill switch, limit configuration, manual settlement with justification, full audit trail |
| **BETTING** | WP 4, 5, 7, 9, 10, 13 | Kill switch blocks the API (not just UI). Limits enforced at placement. Manual settlement engine. Audit records for every action |
| **OFFER** | WP 4, 5 | Operator Management holds the master switch and limit configuration — the source of truth for what's allowed |
| **DATA** | WP 4, 5, 7, 8, 9, 10, 11, 13, 16 | All operational dashboards built here — Bet Ticker, Liability, Audit Trail, Odds History, Feed Health, Rejected Bets |
| **SPLUNK** | BUSINESS: WP 4-5, 7-11, 13-16 | The trader's operational cockpit — every dashboard they need to run the book on game day |

---

## Slide 9: Domain Team Workload Overview

How many WPs each team touches across all 4 deliverables:

| Domain | Deliv 1 | Deliv 2 | Deliv 3 | Deliv 4 | Total WP Assignments |
|--------|---------|---------|---------|---------|---------------------|
| FEEDS | 4 | 1 | 1 | 1 | 7 |
| OFFER | 4 | 4 | 1 | 2 | 11 |
| FRONTEND | 4 | 5 | 2 | — | 11 |
| BETTING | 2 | 9 | 8 | 6 | 25 |
| DATA | 4 | 9 | 6 | 9 | 28 |
| BACKOFFICE | — | — | — | 4 | 4 |
| SPLUNK | 3 | 2 | 2 | 12 | 19 |

**Betting and Data are the most loaded teams.** Betting touches the most WPs in Deliverables 2 and 3 (the core betting engine work). Data touches everything because every event needs reporting.

---

## Slide 10: Key Dependencies & Risks

### Critical Path Dependencies

| Dependency | Blocks | Impact |
|-----------|--------|--------|
| **Central Offer Foundation (WP 6)** | WP 2 (WC Hub), WP 11 (RT Odds), and everything downstream | Foundation for the entire offer pipeline. Must land first |
| **WES Wallet Integration** | WP 1 (Parlay), WP 3 (Settlement), WP 9 (Manual Resettle), WP 5 (Controls) | Real money can't move without wallet. Blocks 4 WPs |
| **PAM Integration** (auth) | WP 1 (Parlay), WP 5 (Controls) | JWT validation for punter identity. Blocks 2 WPs |
| **Simple Parlay (WP 1)** | WP 14 (SGP), WP 15 (Mega Parlay) | Parlay foundation must exist before SGP/Mega can build on it |
| **SGP (WP 14)** | WP 15 (Mega Parlay) | SGP must work before it can be combined into Mega Parlays |

### Top Risks

| # | Risk | Severity | Mitigation |
|---|------|----------|------------|
| 1 | **Mega Parlay has zero architecture coverage** — most complex bet type, cannot be estimated | High | Architecture team must prioritize SA-18 |
| 2 | **SGP architecture is still draft** — domain impact analysis empty | High | Architecture team must complete SA-16 |
| 3 | **Shared DB schema refactor (SBK-2008)** — tech debt blocking both Simple Parlay and Settlement | High | Must be addressed early in Deliverable 2 |
| 4 | **Splunk vs New Relic strategy undefined** — affects all reporting and audit WPs | Medium | Decision needed from platform leadership |
| 5 | **Feed Health → Betting suspension not scoped** — when feed goes unhealthy, who suspends betting? | Medium | Cross-domain ownership must be assigned |

---

## Slide 11: What's In vs Out of v1.55

### In Scope (MUST)
- Pre-match betting on World Cup fixtures
- Straight, Simple Parlay, SGP, Mega Parlay bet types
- Real settlement from OpticOdds results
- Operator controls (kill switch, limits, manual settlement)
- Bet Ticker, Liability, Audit Trail in Splunk
- Web desktop + mobile responsive
- 4 brands, USD, en-US

### Reduced / Deferred
- **In-Play betting** — SHOULD HAVE, not guaranteed
- **Futures betting** — SHOULD HAVE, straights only
- **Traders Hub UI** (Bet History for traders) — API only, no UI for MVP
- **Fractional odds format** — SHOULD HAVE

### Out of Scope (v1.7+)
- Multi-currency, multi-language
- Cash out
- Native mobile apps
- Custom markets
- Dynamic margin management
- Per-punter value factors

---

## Slide 12: Planning Framework

We plan at 4 zoom levels:

| Level | What It Answers | Status |
|-------|----------------|--------|
| **ZOOM LEVEL 01** | What to demo, what work per domain | Done — this presentation |
| **ZOOM LEVEL 02** | What order per domain, T-shirt estimates, dependencies | Next — DMs to fill in |
| **ZOOM LEVEL 03** | Milestones, demo dates, estimation per big feature | Pending |
| **ZOOM LEVEL 04** | Story points in sprints, detailed JIRA plan | Pending |

### Next Steps
1. Architecture team completes coverage for SGP (SA-16) and Mega Parlay (SA-18)
2. DMs fill in delivery order and T-shirt estimates per domain (ZOOM LEVEL 02)
3. Platform leadership decides Splunk vs New Relic strategy
4. WES Wallet and PAM integration timelines confirmed with those teams
5. Milestone dates set for each deliverable demo (ZOOM LEVEL 03)

---

## Appendix A: WP-to-Jira Mapping

| Sheet # | Work Package | Jira | Architecture Status |
|---------|-------------|------|-------------------|
| 1 | Simple Parlay (Build + Price + Place) | SA-17 | Ready for Handover |
| 2 | Soccer World Cup Hub (Soccer-first offering) | SA-14 | Done |
| 3 | Settlement from Optic Odds | SA-22 | Ready for Handover |
| 4 | Book & Player On/Off Switch | SA-21 | Done |
| 5 | Bet Placement Controls (Limits + Max Payout + Max Odds) | SA-20 | Draft |
| 6 | Central Offer Foundation | SA-66 | Handed Over |
| 7 | Bet Ticker | SA-25 | Done |
| 8 | Real-Time Liability Reporting | SA-24 | Done |
| 9 | Manual Resettlement & Void | SA-23 | Ready to Handover |
| 10 | Audit Trail for Trader & System Actions | SA-28 | Done |
| 11 | Real-Time Odds & Market Display | SA-19 | Done |
| 12 | My Bets (Punter Bet History) | SA-27 | Done |
| 13 | Bet History (Trader) | SA-26 | Done |
| 14 | SGP (Build + Validate + Price + Place) | SA-16 | Draft |
| 15 | Mega Parlay (Build + Price + Place) | SA-18 | No Coverage |
| 16 | Feed Provider Health Checks and Monitoring | SA-71 | Has Coverage |

## Appendix B: Domain Team Leads

| Domain | Lead |
|--------|------|
| FE | Kurt / Fede |
| FEEDS | Matus / Arch Lead |
| OFFER | Juan / Ceci |
| BETTING | Dev Manager BE / Jul / Data |
| DATA | Jose Marmolejo / Kurt |
| SITE | e.moreno |
| Feeds (Integration) | Edu Ortega |
| Offering (Product) | Vassilis Iliopoulos |
| Betting (Product) | Juan Ballesta |

## Appendix C: Key Performance Targets

| Metric | Target |
|--------|--------|
| Odds latency (provider → punter screen) | 500ms max |
| Feed throughput | 1,000 messages/second |
| Bet placement throughput | 5,000 bets/minute |
| Settlement processing | All bets settled within 200 seconds of result |
| Uptime | 99.9% (43 min downtime/month max) |
| Load testing | Mandatory at 150% peak (75K active users, 7.5K bets/min) |
