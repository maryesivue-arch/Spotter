---
trigger: always_on
---

# private-data.md

Job: keep one member's records from reaching anyone else.
Source: PRD section 8. [ADDED] marks a rule beyond the PRD.
Login and PIN rules are in login-and-sessions.md. The audit log is in back-office-and-approvals.md.

Private tables: Member, JoinCode, Session, LoginAttempt, CheckIn, Payment, Renewal, LedgerEntry, LedgerCorrection, QuestionLog, WrongReport, ConsentRecord, TierChange, AppEvent.
- If this list differs from the row level security list in PRD section 8, the PRD wins. Report the difference. Why: a missing table has no protection.
- Any new table that holds one person's data joins this list. If you are unsure whether a table does, ask. Do not add row rules to shared tables (cards, vectors, settings). [ADDED] Why: row rules on shared data break search for everyone.

## Layer 1: code
- Only `requireMemberSession()` creates a `MemberCtx`. Why: one entry point is easy to audit.
- Every member data function takes `ctx` first and puts `ctx.memberId` in its query. Why: a missing filter then shows in every function.
- No function takes a member ID from the body, URL or query string. Why: the caller controls those values.
- Member routes use `src/server/dal/member`. Staff and owner routes use `src/server/dal/staff` with their own session. Totals across members are computed only in `dal/staff`. Why: broad access stays in one place.
- Only `src/server/db` and `src/server/dal` may import the Prisma client. A lint rule fails the build otherwise. Why: it stops queries that skip the checks.
- Raw SQL on a private table runs only inside `withMember`, `withStaff` or `withAuth`. [ADDED] Why: outside them the setting is missing, so the query returns nothing or runs with the wrong rights.
- Login has no member ID yet. Login code runs inside `withAuth`, which sets the actor to `auth`. That actor may read only the rows it needs, by member number or token hash. It may write only Session and LoginAttempt rows, plus the PIN hash and lockout fields on Member. Why: login must work without opening the whole table.

## Layer 2: database
- The app connects as role `spotter_app`: not the table owner, no `BYPASSRLS`. Why: owners and `BYPASSRLS` roles ignore row rules.
- Enable and FORCE row level security on every private table. Why: FORCE applies the rule to the table owner too.
- `withMember` opens a transaction and runs `set_config('app.member_id', id, true)`. Why: a setting limited to the transaction cannot leak to another request through the connection pooler.
- Policy: allow a row when its member ID equals `current_setting('app.member_id', true)`, or when `app.actor` is `staff` or `owner`. Always pass `true` as the second argument. Why: it returns null when unset, so the policy returns zero rows. Without it, PostgreSQL raises an error.
- `withStaff` sets the actor from the staff or owner session. Staff access is broad by design. Why: staff must read any member. The audit log is the protection.
- Revoke UPDATE and DELETE on LedgerEntry, AuditLog and CheckIn from `spotter_app`, and add a trigger on LedgerEntry that blocks them. Why: the app role must not be able to change history, even by mistake. The business rule is in ledger.md.
- Draft the role, grants, policies and trigger as text. See database-and-migrations.md. Why: the human runs them.

## Layer 3: tests in `tests/isolation/` (the human runs them)
- Two members: seed A and B, call every member data function as A, and assert no row of B's returns. Why: this catches a missing filter in code.
- No context: a raw select on LedgerEntry as `spotter_app` with no setting returns zero rows. Why: this proves the database fails closed.
- Wrong ID: logged in as A, send B's ids in every URL and body to every `/api/member` route. Expect 403 or 404. Why: this proves the server ignores supplied ids.
- Route guard: fail if a handler under `app/api/member` does not call `requireMemberSession()` first. Apply the same test to staff routes with `requireStaffSession()`. Why: a new route cannot skip the check unnoticed.
- Import ban: prove the lint rule fails on a forbidden import. Why: a rule that never fails protects nothing.