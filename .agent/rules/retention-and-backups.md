---
trigger: model_decision
description: Retrieved when building the daily scheduled cron jobs or deletion routines.
---

# retention-and-backups.md

Job: what is deleted, when, and how data is backed up.
Source: PRD section 8. [PRD] marks a rule from the PRD. [ADDED] marks a rule beyond the PRD.
The agent writes the scripts and workflow files. The human runs them.

## Daily job
One scheduled call a day does these things. [PRD: FR-70]
- Run `SELECT 1`. Why: a free database may pause when idle. Verify the rule on the chosen host (hosting is undecided, Q-8).
- Make check-in codes so that 14 days ahead always exist (check-in.md).
- Delete login attempts older than 30 days.
- Delete sessions and join codes that expired or were revoked more than 30 days ago.
- Apply the retention rules below.

Job rules:
- The route that starts the job needs a secret in a header, checked with the timing-safe compare in security.md. [ADDED] Name of the secret: [HUMAN TO FILL]. Why: otherwise anyone can trigger the job.
- The job must be safe to run twice in one day. [ADDED] Why: schedulers retry.

## Retention
- Payment notice payloads older than 12 months are deleted. The event key stays. Why: the key blocks repeats, and the payload is personal data.
- Question text is blanked after 12 months. The route, card and score stay. Why: tuning needs the scores, not the words.
- Ledger, check-in, payment and renewal rows are kept 24 months after the member's last activity. This is a default awaiting a lawyer (A-31, Q-12). Why: long enough for disputes.
- Open points. The PRD says "delete or anonymise" and does not pick one. It does not define "last activity". Do not write the deletion until the human decides both. Stopping payment does not start the clock.
- Erasure requests follow back-office-and-approvals.md.

## Backups
- Take a nightly encrypted `pg_dump` from a scheduled GitHub Actions job on a private repository (`.github/workflows/backup.yml`). Use the database's IPv4 session pooler connection, because the runners may lack IPv6. Keep 30 days of dumps. Verify the free minutes and the connection before launch (A-39). Why: a free database may have no automatic backups (A-21).
- Alert when the nightly job fails. Why: a silent failure leaves no backup for weeks.
- The encryption key lives in the repository's secrets, never in code. Where a second copy of the key is kept is [HUMAN TO FILL]. Why: a dump without its key cannot be restored.
- Restore a dump into a scratch database before launch and every quarter, using `scripts/restore-test.ts`. Why: a backup that was never restored is not proven.
- The owner gets a monthly CSV copy of the ledger. Why: it is a copy outside the app.
- Keep the paper receipt book as the second record. The worst case is losing one day of entries.
- Open point: an erased member's data stays in dumps for up to 30 days. Ask the lawyer (R-6).