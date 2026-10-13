---
trigger: model_decision
description: Retrieved when formatting fixed sentence templates and records-checked warnings for the frontend.
---

# member-messages.md

Job: the exact words shown to members. Nothing else.
Source: PRD unless marked.

Rules:
- Use the exact wording below. Never reword, shorten or translate it. Why: answers are fixed sentences by design.
- Keep every message in one module. Why: one place to change a word.
- If a situation is not listed, ask. Do not write new wording. Why: the PRD gives no wording for it.
- Messages are English only. Money is shown in naira. Why: the PRD sets one language for answers.
- Text in {braces} is filled from data. Everything else is fixed.

| Situation | Exact wording |
|---|---|
| Nothing answers the question (the no-answer message) | "I don't have that on record", with the named person and the WhatsApp button |
| Card past its review date | "not confirmed recently, ask the desk" |
| Basic member asks for a training plan | "Training plans are part of Premium" |
| Second check-in on the same day | "Already checked in today" |
| Lapsed member tries to check in | "Your membership has ended, pay to continue" |
| Embedding service unavailable | "Searching by words only right now" |
| No ledger lines at all | "No payment record found, ask the desk" |
| Two different questions at once | "Ask one thing at a time" |
| Records label under private answers | "records checked on {date}" |
| Attendance start note | "counted since {launch date}" |
| Offline check-in states | "waiting", "counted (sent late)", "not counted: wrong code" |
| Payment status | "pending" with its reference, then "confirmed" |
| Attendance sentence | "You checked in {n} days in {month}." |
| Balance sentence | "You owe {amount}." |
| After the desk closes | the desk hours text from the settings, for example "back at 6am" |
| Answer feedback button | "wrong or unclear" |

The two sentences above are PRD examples ("11 days in July", "₦5,000"). Use them as templates.

Ask before using any wording not in the table. This includes two lines from the refined idea file that the PRD does not confirm: "No record before [launch date]" and "renew by [date]". The PRD says only "renewal banner" for the grace state.

The PRD gives no wording for any of these. Ask for all of it:
- the refusal for risky questions
- the warning for old records
- sentences for expiry, tier, attendance dates and payment history
- the gate message for trainer guidance
- login failure and join code errors
- the consent screen text (a lawyer must check it, R-6)
- the message after a staff reset
- what the member sees above the daily question cap