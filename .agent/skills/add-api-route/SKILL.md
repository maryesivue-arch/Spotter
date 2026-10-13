---
name: add-api-route
description: Use when you add or change a member, staff or owner API route and its data function in Spotter. Do not use for the payment webhook route or the health route.
---

# Add an API route

## Before you start

You need the FR ids for the route. You need to know if the route is a member route, a staff route or an owner route. If either is missing, ask the human.

## Steps

1. Open the FR rows in PRD section 6.
   - List the tables in the "Reads from" column.
   - Copy the acceptance test.
   - Check: you can name the tables and the test.
   - If the FR depends on an open decision, follow AGENTS.md step 8 and stop.

2. Pick the variant.
   - Member route: use `requireMemberSession()` and the folder `src/server/dal/member`.
   - Staff or owner route: use `requireStaffSession()` and the folder `src/server/dal/staff`.
   - Check: you can state the guard and the folder in one sentence.

3. Write the data function first.
   - For a member route, follow the context pattern in `.agent/rules/private-data.md`.
   - For a staff or owner write, run it inside `withStaff`. Add the audit entry described in `.agent/rules/back-office-and-approvals.md`.
   - Check: the file is in the folder from step 2. For a member function, the first parameter is `ctx`.

4. Write the route handler.
   - Member routes go under `src/app/api/member`.
   - Staff and owner routes go under `src/app/api/staff`. The folder map has no owner API folder.
   - Take the handler's shape from `.agent/rules/typescript-and-nextjs.md`.
   - Take the guard and session rules from `.agent/rules/private-data.md`.
   - Check: the handler only calls the guard, parses input, calls the data function and returns the result.

5. Add input checks and error responses.
   - Use `.agent/rules/security.md` for the input checks.
   - Use `.agent/rules/errors-and-logging.md` for the error shape and the logger.
   - Check: each input field has a check. Each error path returns the shared error shape.

6. If this is an owner action that changes money or cards, add the password re-ask described in `.agent/rules/login-and-sessions.md`. Skip this step for other routes.
   - Check: the route reads the re-ask result before it writes.

7. Write the FR's acceptance test.
   - Follow `.agent/rules/testing.md` for naming.
   - Put it in `tests/isolation/`, `tests/ask/` or `tests/pay/`, whichever matches the FR's area.
   - If the area has no folder, ask the human where the test goes.
   - For a member route, open the wrong-ID test and the route-guard test in `tests/isolation/`. Confirm that they cover this route. If either lists routes by hand, add this route.
   - Check: the test file exists, and its name holds the FR id.

8. Run the checks that `.agent/rules/commands.md` allows. Complete the done list in `.agent/rules/testing.md`.
   - Check: type check and lint pass, and you saw each result.

## Report

End with these four items:
- Files created or changed, one line each.
- Commands you ran, each marked pass or fail.
- Tests the human must run because they need a database.
- Assumptions, under the heading "Assumptions" (AGENTS.md step 7).