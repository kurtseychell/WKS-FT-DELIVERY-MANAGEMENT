# WHY Matrix — Business / Demo Perspective

> For each WP in a domain under a deliverable: **what business need does it serve and what do we demo?**

---

## DELIVERABLE 1: Central Offering Foundation

> **Demo:** Punter opens the sportsbook, sees World Cup fixtures with live odds, can browse markets.

---

### FRONTEND

| WP | Business WHY |
|----|-------------|
| 2 - Soccer WC Hub | Punter needs a dedicated World Cup landing page to discover matches, view groups, and start betting |
| 6 - Central Offer Foundation | Punter sees a structured, navigable offering — sports, tournaments, fixtures, markets — not raw feed data |
| 11 - RT Odds & Market Display | Punter sees odds move in real-time and knows when a market is suspended — builds trust in the platform |
| 16 - Feed Provider Health | When the feed goes down, punter sees markets gracefully suspended rather than stale/wrong odds |

### FEEDS

| WP | Business WHY |
|----|-------------|
| 2 - Soccer WC Hub | Platform needs World Cup fixtures, odds, and results flowing in from OpticOdds — no feed, no sportsbook |
| 6 - Central Offer Foundation | Platform needs richer data — more markets, fixture metadata, statistics — to offer a competitive product |
| 11 - RT Odds & Market Display | Odds must reach the punter fast enough to bet confidently — stale odds = bad bets or lost trust |
| 16 - Feed Provider Health | Platform must detect when OpticOdds is unhealthy and protect punters from betting on stale data |

### OFFER

| WP | Business WHY |
|----|-------------|
| 2 - Soccer WC Hub | The offering must be our own — not just a pass-through of OpticOdds. We own the offer, we control what punters see |
| 6 - Central Offer Foundation | Foundation for managing our offer independently — future ability to add providers, brands, and custom configurations |
| 11 - RT Odds & Market Display | Odds changes must flow through our offer pipeline to reach punters — we need to control the last mile |
| 16 - Feed Provider Health | When feed is unhealthy, our offer must react — suspend affected markets to protect the business from exposure |

### BETTING

| WP | Business WHY |
|----|-------------|
| 11 - RT Odds & Market Display | When odds change, SGP prices need to refresh — punter must always see an accurate combined price |
| 16 - Feed Provider Health | If the feed is down, betting must stop accepting bets on affected events — protects the book from blind exposure |

### DATA

| WP | Business WHY |
|----|-------------|
| 2 - Soccer WC Hub | Traders need to see offer data in Splunk — what fixtures are live, what markets are available, odds history |
| 6 - Central Offer Foundation | The data pipeline needs our unified offer model to build reports — line history, offer health, operational dashboards |
| 11 - RT Odds & Market Display | Data feeds the real-time display layer (Diffusion) — punter's screen updates depend on this pipeline |
| 16 - Feed Provider Health | Ops team needs visibility into feed health — alerts when OpticOdds degrades, so traders can react |

### SPLUNK — RAW REPORT

| WP | Business WHY |
|----|-------------|
| 2 - Soccer WC Hub | Traders need raw offer event history — what changed, when, for how long. Line history for odds monitoring |
| 6 - Central Offer Foundation | Ops visibility into offer processing — are we keeping up, are there errors, is data consistent? |
| 16 - Feed Provider Health | Feed health dashboard — connection status, queue depths, latency alerts. First line of defense for traders |

---

## DELIVERABLE 2: Betslip Core & Placement Flow

> **Demo:** Punter builds a betslip, places a bet (straight + parlay), gets validated against rules and limits. Operator can control who can bet and what limits apply.

---

### FRONTEND

| WP | Business WHY |
|----|-------------|
| 1 - Simple Parlay | Punter can combine selections from different matches into one bet and see combined odds + potential winnings |
| 4 - Book & Player On/Off Switch | When operator flips the kill switch, the site goes dark immediately — punter sees a clear "unavailable" state |
| 5 - Bet Placement Controls | Punter sees their max stake before placing, gets clear error messages if they exceed limits — no guessing |
| 14 - SGP | Punter can combine multiple selections from the same match (e.g., goalscorer + result) and see if the combo is allowed |
| 15 - Mega Parlay | Punter can mix SGPs with straight legs across matches — the most complex and exciting bet type we offer |

### OFFER

| WP | Business WHY |
|----|-------------|
| 4 - Book & Player On/Off Switch | Operator needs a master switch to shut down the hub and per-offering controls to disable specific bet types |
| 5 - Bet Placement Controls | Business defines the limits — min/max stake, max payout, max legs — that protect the book from excessive exposure |
| 14 - SGP | Offer must provide SGP configuration — which markets can combine, how many legs allowed |
| 15 - Mega Parlay | Offer must define rules for complex parlays — max SGPs per parlay, eligible market combinations |

### BETTING

| WP | Business WHY |
|----|-------------|
| 1 - Simple Parlay | Platform can accept parlay bets — not just straights. This is the core upgrade from the prototype |
| 4 - Book & Player On/Off Switch | Betting must respect the kill switch — if the operator says stop, no bets get through. Risk management essential |
| 5 - Bet Placement Controls | Every bet must be validated against limits before acceptance — protects the business from unbounded risk |
| 7 - Bet Ticker | Every bet placed (or rejected) must appear in the trader's live feed — operational visibility from day one |
| 8 - RT Liability Reporting | As bets come in, the book's exposure grows — traders need to see this in real-time to manage risk |
| 13 - Bet History | Traders and support staff need to look up any bet by any punter — dispute resolution, fraud investigation |
| 14 - SGP | Platform can accept same-game parlays — correlated pricing from OpticOdds, eligibility validation |
| 15 - Mega Parlay | Platform can accept the most complex bet type — SGPs combined with straights across fixtures |
| 16 - Feed Provider Health | Betting must know when the feed is unreliable and stop accepting bets on affected events |

### DATA

| WP | Business WHY |
|----|-------------|
| 1 - Simple Parlay | New bet type means new data flowing into reports — parlay bets need to appear in ticker and liability views |
| 4 - Book & Player On/Off Switch | Audit trail — when was the switch flipped, by whom, how many bets were affected |
| 5 - Bet Placement Controls | Rejected bets dashboard — how many bets are hitting limits, which limits, is the config right? |
| 7 - Bet Ticker | Core data product for traders — live scrolling feed of every bet attempt with full match/market context |
| 8 - RT Liability Reporting | Core data product for risk managers — real-time exposure by market, fixture, and punter |
| 13 - Bet History | Data infrastructure for bet lookup — active bets and historical bets available for querying |
| 14 - SGP | SGP bets must appear in all reports — ticker, liability, P&L — with their correlated odds and leg details |
| 15 - Mega Parlay | Most complex bet type must be fully visible in all reporting — liability tracking is critical here |
| 16 - Feed Provider Health | Feed health metrics in Splunk — traders and ops need to know the data quality they're operating on |

### SPLUNK — RAW REPORT

| WP | Business WHY |
|----|-------------|
| 1 - Simple Parlay | First multi-leg bet events in the system — raw placement data for analysis and reconciliation |
| 16 - Feed Provider Health | Feed health raw events — connection drops, slow updates, queue backlogs. Operational early warning system |

---

## DELIVERABLE 3: My Bets & Real Data Connection

> **Demo:** Punter sees their bet history (pending + settled). Bets settle automatically from real results. Traders can manually correct settlements. Real money moves.

---

### FRONTEND

| WP | Business WHY |
|----|-------------|
| 3 - Settlement from Optic Odds | Punter sees their bet go from "Pending" to "Won" or "Lost" — the moment of truth. Settlement must be visible |
| 12 - My Bets | Punter can check "My Bets" anytime — see active bets, settled bets, filter by status. Core punter experience |

### FEEDS

| WP | Business WHY |
|----|-------------|
| 3 - Settlement from Optic Odds | Match results come from OpticOdds — without results flowing through feeds, no bets can settle |

### OFFER

| WP | Business WHY |
|----|-------------|
| 3 - Settlement from Optic Odds | Results must flow through our offer resolution system — we own the grading, not the feed provider |

### BETTING

| WP | Business WHY |
|----|-------------|
| 3 - Settlement from Optic Odds | Bets get graded and settled with real money — won bets are credited, lost bets close, void bets refund. This is where the business makes or loses money |
| 7 - Bet Ticker | Settlement events appear in the ticker — traders see results flowing through in real-time |
| 8 - RT Liability Reporting | When bets settle, exposure is released — liability views must update in real-time as results come in |
| 9 - Manual Resettlement & Void | Traders can override incorrect results — void a bad market, correct a grading error. Credibility of the platform depends on this |
| 12 - My Bets (Punter) | Punter's bet history must update live — "just settled" bets appear without page refresh. Transparency builds trust |
| 13 - Bet History | Traders can investigate any bet's full lifecycle — placement through settlement, including resettlements |
| 14 - SGP | SGP bets need settlement logic — when legs within the same game resolve, the SGP grades accordingly |
| 15 - Mega Parlay | Complex parlays with SGP legs need correct grading — partial voids, leg-by-leg resolution |

### DATA

| WP | Business WHY |
|----|-------------|
| 3 - Settlement from Optic Odds | Settlement data feeds P&L reports — this is where the business knows if it's winning or losing |
| 7 - Bet Ticker | Settlement events in the ticker — complete bet lifecycle visibility for traders |
| 8 - RT Liability Reporting | Settled bets release exposure — liability dashboards must reflect the book's true position after results |
| 9 - Manual Resettlement & Void | Manual settlement audit — how much was paid out manually, goodwill costs, who approved what |
| 12 - My Bets | Real-time push updates for punter's My Bets screen — "your bet just won" without refreshing |
| 13 - Bet History | Trader-facing bet lookup with settlement details — support tickets, dispute resolution |

### SPLUNK — RAW REPORT

| WP | Business WHY |
|----|-------------|
| 3 - Settlement from Optic Odds | Raw settlement events — every grading decision, every wallet transaction, every resettlement. The financial audit trail |
| 12 - My Bets | Bet lifecycle events — operational monitoring that the punter experience pipeline is healthy |

---

## DELIVERABLE 4: Operation Control & Visibility

> **Demo:** Operator manages settings in Kraken (operator config, punter management, manual settlement tool). Splunk shows comprehensive dashboards — feed health, bet ticker, liability, audit trail, bet history.

---

### BACKOFFICE

| WP | Business WHY |
|----|-------------|
| 4 - Book & Player On/Off Switch | Operator can shut down the sportsbook in an emergency and block suspicious punters — risk management from the backoffice |
| 5 - Bet Placement Controls | Operator can configure stake limits, payout limits, and bet type rules — control the book's risk appetite |
| 9 - Manual Resettlement & Void | Traders can settle/void individual bet legs from a UI — search for bets, apply corrections, add justification. Dispute resolution tool |
| 10 - Audit Trail | Every action by every trader is logged and searchable — who changed what, when, why. Compliance and accountability |

### OFFER

| WP | Business WHY |
|----|-------------|
| 4 - Book & Player On/Off Switch | Operator Management holds the master switch and bet type toggles — the configuration that controls what's available |
| 5 - Bet Placement Controls | Business limits are defined at the offering level — these values are what the book operates on |

### BETTING

| WP | Business WHY |
|----|-------------|
| 4 - Book & Player On/Off Switch | Kill switch must actually stop bets — not just hide the UI but block the API too. Belt and braces |
| 5 - Bet Placement Controls | Limits must be enforced at bet placement — the last line of defense before money moves |
| 7 - Bet Ticker | Bet events must carry all the data traders need — complete bet details for live monitoring |
| 9 - Manual Resettlement & Void | Settlement engine must accept manual corrections, lock manually-graded legs, and handle wallet reversals correctly |
| 10 - Audit Trail | Every betting action produces an audit record — placement, grading, settlement, manual overrides. Full traceability |
| 13 - Bet History | Trader bet lookup API — the backend for the backoffice bet investigation tool |

### DATA

| WP | Business WHY |
|----|-------------|
| 4 - Book & Player On/Off Switch | Track operator actions — when switches were flipped, impact on betting volume. Operational intelligence |
| 5 - Bet Placement Controls | Rejected bets analysis — which limits are being hit most, is the configuration optimal? |
| 7 - Bet Ticker | The live bet ticker dashboard — traders' primary tool for watching the book in real-time |
| 8 - RT Liability Reporting | The liability dashboard — traders' primary tool for managing exposure during live events |
| 9 - Manual Resettlement & Void | Manual settlement reports — payout volumes, goodwill costs, correction patterns. Finance needs this |
| 10 - Audit Trail | All system/trader actions searchable in one place — the compliance and investigation tool |
| 11 - RT Odds & Market Display | Odds line history and feed latency monitoring — are we meeting our SLAs? |
| 13 - Bet History | Trader bet investigation in Splunk — deep dive into any punter's betting activity |

### SPLUNK — BUSINESS REPORT

| WP | Business WHY |
|----|-------------|
| 4 - Book & Player On/Off Switch | Operator action log — switch activations, punter blocks, with who/when/why |
| 5 - Bet Placement Controls | Rejection analysis dashboard — limits violations by type, trends, operational tuning insights |
| 7 - Bet Ticker | **The Bet Ticker** — live scrolling view of every bet, the trader's primary operational screen |
| 8 - RT Liability Reporting | **The Liability Dashboard** — real-time exposure, worst-case payouts, drill-down by market |
| 9 - Manual Resettlement & Void | Settlement audit dashboard — manual payouts, goodwill costs, who approved corrections |
| 10 - Audit Trail | **The Audit Trail** — comprehensive who/what/when/why for every system and trader action |
| 11 - RT Odds & Market Display | Odds line history — tick-level odds movements, feed health SLA monitoring |
| 13 - Bet History | Trader investigation tool — historical bet lookup, punter betting patterns, dispute support |
| 14 - SGP | SGP-specific reporting — eligibility rates, pricing accuracy, rejection patterns |
| 15 - Mega Parlay | Complex parlay reporting — most exotic bet type needs its own visibility for risk |
