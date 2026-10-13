---
trigger: model_decision
description: Retrieved when the agent reasons about balances, charges, manual payments, or correction proposals.
---

# ledger.md

Job: what a ledger line is, and how lines are added by staff.
Source: PRD 6K and 8. [ADDED] marks a rule beyond the PRD.
Money units are in dates-and-money.md. Gateway payments are in gateway-payments.md. Database blocks on edits are in private-data.md.

## Lines
- Charges are positive and payments are negative. The balance is the sum of a member's lines. There is no balance column. [ADDED] Why: a stored balance can drift from the lines.
- Line kinds: opening balance, charge, manual payment, gateway payment, correction. Use the schema's names. Why: a fixed list lets reports and history group lines.
- Never edit or delete a line. A mistake gets a correction line. Why: the ledger is the proof of what happened.

## Charges
- Charges come from three sources only: a renewal checkout, a staff-posted charge with a reason, and the opening balance. The app never creates a charge on its own and never bills monthly. Why: otherwise balances build up that nobody agreed to.
- A staff-posted charge needs an amount, a reason and the staff name. The member sees the reason. It appears on the owner's weekly list. It needs no owner approval. Why: it is rare and visible.
- The opening balance is created when staff add a member, with a source note such as "ledger page 12". Why: day one comes from old records.

## Corrections
- Staff propose a correction with an amount and a reason. Nothing changes until an owner-role user approves it. Approval writes a new correction line that points at the original, with both names. Why: no one person should change money alone.

## Manual payments
- Staff enter cash, bank transfer and POS payments the same day. Why: the weekly check compares each day's entries with the money.
- Each needs a reference: the receipt book number, the transfer reference or the slip number. A reference is unique within its method. Why: the unique reference catches double entry.
- The three methods are a PRD default awaiting the owner (Q-21). Confirm before coding them.

## Open points
- Cash renewals: this file and gateway-payments.md only cover how a gateway renewal extends expiry. I found no PRD rule for a cash renewal. Ask before building it.
- Corrections: the PRD does not say the proposer and the approver must differ. If the deputy proposes and approves their own correction, one person changed money alone. Ask.