---
name: add-private-intent
description: Use when you build or change one of the six private question intents in Spotter: attendance count, attendance dates, expiry, tier, balance or payment history.
---

# Add a private intent

## Before you start

You need the name of one intent. Work on one intent at a time.

## Steps

1. Find the intent's sentence in `.agent/rules/member-messages.md`.
   - Check: you can quote the sentence template.
   - If it is missing, stop. Ask the human to supply the wording. Do nothing else for this intent.

2. Check for open decisions.
   - Read FR-22 to FR-28 in PRD section 6.
   - For attendance count and attendance dates, read the day rules in `.agent/rules/dates-and-money.md`.
   - Check: you can state whether the day boundary is decided. If it is not, stop and ask the human.

3. Write the data function in `src/server/dal/member`, in a file named for the intent.
   - Use the context pattern in `.agent/rules/private-data.md`.
   - Check: the first parameter is `ctx`, and the function returns the member's rows.

4. Write the answer builder in `src/server/ask`.
   - It is a pure function. It takes the rows, and a month where the intent needs one.
   - It returns the sentence, the ledger or record entries to show underneath, the records-checked date and the warning flag.
   - Take the content of a private answer from `.agent/rules/ask-pipeline.md`.
   - Check: the file imports nothing from the database layer.

5. Add the intent to the keyword fallback in `src/server/ask`.
   - Take the keyword list from `.agent/rules/ask-pipeline.md`.
   - If no listed keyword fits the intent, stop and ask the human which word to use.
   - Check: a fallback test routes a sample question to this intent.

6. Write the tests.
   - Test the builder with fake rows. Use the FR-24 pattern: for 11 check-ins in July, the sentence reads as the template says.
   - Add the data function to the two-member test in `tests/isolation/`.
   - Run the builder tests. They need no database.
   - Check: the builder tests pass, and you saw the result.

7. Write the handoff note for the human.
   - List the example phrases the human must add to the seed script for this intent.
   - List the tests the human must run: the isolation test, and the seed run that embeds the new phrases.
   - Check: the note names each phrase and each command.

## Report

End with these four items:
- Files created or changed, one line each.
- Commands you ran, each marked pass or fail.
- The handoff note from step 7.
- Assumptions, under the heading "Assumptions" (AGENTS.md step 7).