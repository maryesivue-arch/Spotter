---
trigger: glob
description: Retrieved when the agent reasons about balances, charges, manual payments, or correction proposals.
globs: (src/app/owner/**/*, src/app/staff/**/*): Activates to enforce role separation, password prompts, and audit logging specifically on administrative routes.
---

# back-office-and-approvals.md

Job: what staff and owner screens show, and the approvals between them.
Source: PRD 6H, 6I and 8.
Ledger rules are in ledger.md. Accounts are in login-and-sessions.md. The code sheet is in check-in.md.

## Cards
- A card has a title, body, category, the tier that sees it, a visible-when-lapsed mark, a confirmed date and a review date 90 days later. Prices, and pause and cancel terms, are visible when lapsed. Why: a lapsed member needs them to renew.
- Every card gets 3 to 6 sample questions, including Pidgin. Every timetable card names its days in full. Why: the entity check in ask-pipeline.md depends on the days being in the text.
- Statuses: draft, pending approval, approved, rejected, archived. Only one approved version exists per card group. Why: members must never see two versions.
- Staff edits create a new draft. The live version stays until an owner-role user approves. Why: staff cannot change what members see alone.
- The owner screen lists cards past their review date. Why: stale cards are wrong answers.

## Staff screens
- Add a member: name, tier, expiry, opening balance and a source note. The app assigns the member number and the join code. Find a member by name or number. Why: the desk needs one place to start every request.
- Enter manual payments, propose corrections and post charges (ledger.md).
- Pending payments list: payments pending for more than 24 hours, flagged payments and overpayments. It is a query, not a scheduled job. Why: the PRD allows one daily job.
- Export a member's records as a file on request. Erase them only after owner approval. Ledger and payment lines are anonymised, never deleted. A lawyer must confirm this (R-6). Why: the gym may need the financial record.
- After erasure the member cannot log in and their name is removed. Open point: the PRD does not say what replaces the name. Ask.

## Owner screens
- Approve or reject cards and ledger corrections. Why: this is the second pair of eyes.
- Weekly check: the owner enters the cash counted, plus the transfer total from the bank statement and the POS total from the POS report. The screen shows ledger totals per method for the week and the differences. A confirmed check sets the records-checked date. Why: it is the only proof the ledger matches the money.
- Wrong-answer reports and unanswered questions, newest first. Why: the owner fixes cards from them.
- Weekly sample: 30 random answered questions from the last 7 days, with the answer shown. Staff mark each right or wrong. It should take about 15 minutes. [PRD: A-42] Why: the test set cannot prove accuracy on real questions.
- Usage counts: app opens, check-ins, questions, payments, balances unpaid for more than 30 days, and gateway fees paid. Build no other report. Why: the PRD's goals use only these.
- Reconcile: compare gateway payouts with the ledger by reference. Flag a payout line with no ledger entry. Show unknown references from payment notices. Why: it finds money the app lost track of.

## Audit log
- Record every staff and owner write: who, what, when, and the before and after values. Why: staff access to private records is broad by design, and this log is its protection.

## Not screens
The example phrases, medical words, Pidgin words and the test set are files the developer edits. The owner reviews them. Build no screens for them. Why: the PRD keeps version one small.