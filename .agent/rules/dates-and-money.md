---
trigger: model_decision
description: Retrieved for tasks involving kobo currency math or Lagos timezone boundary calculations.
---

# dates-and-money.md

Job: how money and time are stored and computed. Nothing else.
Source: PRD sections 6 and 8. [ADDED] marks a rule beyond the PRD.

## Money
- Money is whole numbers of kobo. Never use decimals or floating point. [PRD] Why: they cause rounding errors.
- Parse and format money in one module, `src/lib/money`. Show naira with a thousands separator, for example "₦5,000". Why: one display rule everywhere.
- Never do arithmetic on a formatted string. [ADDED] Why: "₦5,000" is text, not a number.
- Convert to and from the gateway's units in one function in the payment module, and nowhere else. [ADDED] Why: Paystack counts kobo, and Flutterwave may count naira. A missed conversion charges 100 times too much or too little. Confirm the units in the Flutterwave docs.
- Open point: the PRD schema stores amounts as a 32-bit integer. The largest value is 2,147,483,647 kobo, about ₦21.4 million. One member never reaches it. A total across many members can. Ask the human how to widen it before writing any such total.

## Time
- Business logic uses Lagos time (Africa/Lagos) only. [PRD] Why: the members and the desk are in Lagos, and the server may run elsewhere.
- One module, `src/lib/dates`, answers "what Lagos day is it" and "which Lagos month does this belong to". No other code computes a day or month. [ADDED] Why: the once-a-day check-in, access states, month questions and the weekly check must all agree.
- A time belongs to the Lagos day it falls in after the day boundary is applied. A month is the set of those days. [ADDED] Why: a check-in at 2am must land on the same day in every report.
- The day boundary: the PRD assumes a day runs from 4am to 4am (A-22, Q-14). The owner has not confirmed it. Keep it inside the dates module. Ask before coding it.
- An expiry date is a date with no time. Compare dates, not timestamps. [ADDED] Why: a timestamp comparison can put a member in the wrong state for a few hours.
- Open point: the PRD says "weekly" for the cash check and the code sheet but never says which day a week starts. Ask. Put the answer in this module.