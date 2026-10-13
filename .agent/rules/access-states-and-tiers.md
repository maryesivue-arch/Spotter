---
trigger: model_decision
description: Retrieved when implementing server-side gating for Basic vs. Premium cards or computing grace periods.
---

# access-states-and-tiers.md

Job: what a member may see and do in each state and tier. Nothing else.
Source: PRD 6G and 8.
Login is in login-and-sessions.md. The cache rule for offline is in phone-and-cache.md.

## Access states
- Compute the state from the expiry date and Lagos time (dates-and-money.md). Never store it. Why: a stored state goes stale.

| State | When | Sees | Check-in |
|---|---|---|---|
| Active | On or before expiry | Everything their tier allows | Yes |
| Grace | 1 to `graceDays` days after expiry | Everything their tier allows, plus a renewal banner | Yes |
| Lapsed | After grace | Prices, pause and cancel terms, the Pay button, all own records. Plans and timetable are hidden. | No |

- `graceDays` is a setting. The PRD assumes 7 and the owner has not confirmed it (Q-3). Why: the owner decides the gym's policy.
- A confirmed payment restores access at once, with no staff step. Why: a member who has paid must not wait for the desk.
- Never delete private history when a member stops paying. Why: they need it to see what they owe.

## Tiers
- Basic sees timetable, prices, rules, access hours, guest policy, and pause and cancel terms. Premium also sees written training plans and trainer guidance.
- Enforce this on the server in the card fetch query (vector-search.md). Never enforce it by hiding things on the screen. Why: a hidden element is still in the page.
- Record every tier change with the time and who made it. Why: version two needs it.

## Open point
- FR-44 says a Premium member whose premium expires loses plans that day. The grace row says "everything their tier allows". They conflict during the grace days. Until the human decides, withhold plan cards from the day after expiry. Why: it fails on the safe side. Ask.