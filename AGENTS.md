# spotter

## Description
Spotter is a small installable web app (a PWA) that a gym gives to its members.
It answers questions only from the gym's approved typed cards and the asking member's own records, lets members check in and pay, and hands them to a named staff member when the records hold no answer.
No answer comes from the internet and no AI writes any answer.

## Who uses it
- Member: the only user of the member app. Owns private records. Has a tier, Basic or Premium.
- Desk staff: not a user of the member app. Uses staff screens. Members see staff only as the named fallback person.
- Owner: not a user of the member app. Uses owner screens to approve cards and ledger corrections. The PRD allows up to two owner-role accounts.
- Staff and owner screens are in this same Next.js app under staff and owner. They use individual email and password accounts. Owner actions that change money or cards ask for the password again. Session rules are in the login-and-sessions rules file.

## One thing the agent must do well
Keep private records private.
- Member routes take the member ID only from the member's own session. Login looks up a member by member number and nothing else. Staff and owner routes reach other members' records only through the staff data access code, using the staff or owner session.
- No private record is ever embedded or matched by meaning. A member's question is never answered from another member's record. Owner screens may total amounts and counts across members through the staff data access code.
- Private records are the member's tier, expiry date, check-in history, payment history, ledger and balance. They also include the member's name, typed questions, wrong-answer reports, consent records and sessions. Every table that holds one person's data follows the private-data rules file.
- Only code in src/server/db and src/server/dal may import the Prisma client.
- A change that touches private records is not finished until a test shows member A cannot read member B's rows, and every table holding one person's data has a database row rule. The human runs the test.

## Defined scope for the MVP
The MVP has the five member features in PRD section 1. Ask before adding any other member feature.
1. Ask the gym. Shows the best matching approved shared card as typed, with its confirmed date.
   - Only approved cards are shown.
   - If the two best matches are close, show both, each labeled.
   - A card past its review date still shows with the note "not confirmed recently, ask the desk".
   - If the question names a day, a tier or a class, the card shown must contain that word. If it does not, treat the question as silent or show another card that does.
   - If the best match needs Premium and the member is Basic, show only the card title and a message that it is part of Premium. Never send the card text.
2. Check in. The member types the code of the day. One check-in per member per day.
   - A day is a Lagos time day. The PRD assumes it runs from 4am to 4am and the owner has not confirmed this (Q-14). Ask before coding the boundary.
   - Offline check-ins are queued on the phone. On sync the server checks the typed code against the code for the date the phone stored. A valid check-in is saved as sent late. An invalid or too old check-in is rejected and the member is told.
3. My month and my membership. The member asks about own attendance, tier, expiry or balance.
   - Answer only attendance count, attendance dates, expiry, tier, balance and payment history. Anything else is silent.
   - Plain code fills a fixed sentence and shows the ledger entries underneath.
   - Every private answer shows the records-checked date and a warning when that date is old.
4. Pay. The member pays a renewal or balance through the payment gateway. The app never holds money.
   - The server sets the amount, never the phone. Each payment has a unique reference.
   - The balance changes only when the gateway's server confirms the payment. A repeated confirmation changes nothing.
   - A renewal writes a charge and a payment together.
5. Get a person. Shows the named staff member and opens a WhatsApp link with the question typed in. The member taps send. The app sends nothing. A "wrong or unclear" button sits under every answer.

Rules for all five:
- Tier gating happens on the server when records are fetched, not by hiding things on the screen.
- When no approved card or own record answers, the app says "I don't have that on record" and shows the named person. It never guesses.
- Refuse and show the named person for: injury, pregnancy, supplement, diet, weight loss and medication questions; requests for refunds, discounts, waivers or dispute handling; questions about other members; staff matters not on an approved card; any private question when the member is not logged in.
- Money answers are written by plain code. The app never says "you owe nothing" without a payment record to show.
- When the embedding service is down or over its limit, route private questions by keyword rules, search cards by words, and tell the member "Searching by words only right now".
- Members use cheap Android phones on small data bundles. Pages are text only, and the install icons are the only images. Shared cards are cached on the phone. Page weight limits are in the phone-and-cache rules file.
- Login uses no SMS. Staff create the member and a single-use join code at the desk. The member then sets a PIN.
- After the first login, a member logs in with member number and PIN. Failed PINs slow the login down and never block a device that holds a valid session. PIN reset is a staff action at the desk and revokes all sessions. Members have no email or phone login.
- Charges come only from a renewal checkout, a staff-posted charge with a reason, or the opening balance. The app never creates a charge on its own and never bills monthly.

Staff screens (inputs, not features):
- add a member and create a join code
- enter a manual payment (cash, bank transfer or POS). This is a PRD default awaiting the owner (Q-21).
- draft or edit shared cards
- see the pending payments list
- print the check-in code sheet
- find a member
- propose a correcting ledger line with a reason. It changes nothing until an owner-role user approves it.
- post a charge
- export a member's records as a file on request. Erasure needs owner approval. Ledger and payment lines are anonymised and never deleted. A lawyer confirms this rule (PRD R-6).

Owner screens (inputs, not features):
- approve or reject shared cards
- approve or reject ledger corrections
- run the weekly check of cash, transfer and POS totals
- see wrong-answer reports and unanswered questions
- see usage counts. They are the items in FR-54. Build no other report.
- reconcile gateway payouts against the ledger
- review the weekly sample of answered questions

Record only the items listed in PRD section 5 for version two. Add no other tracking.

## Not in scope for the MVP
- Class booking, push messages, workout logging, trainer chat, PDF receipts, self-service pause or cancel, family accounts, leaderboards.
- Sending any message or reminder, following up with anyone, scoring or predicting who will leave, nudging anyone, personalising training advice, applying discounts automatically.
- Agents, reminders and follow ups. They wait for version two.
- Any answer from the internet.
- Any AI that writes text.
- Holding anyone's money.
- Yoruba and Igbo.
- More than one gym per deployment (PRD assumption A-32).
- Screens for example phrases, medical words, Pidgin words and the test set. The developer edits these as files.

## Stack
- Next.js (App Router), TypeScript and Prisma
- PostgreSQL, with pgvector for vector data
- Gemini free tier, used only to turn text into vectors for matching. Before a question goes to the embedding service, long digit runs are removed. No private record is ever sent. Do not launch until the human has read the free tier terms and recorded a decision.
- Flutterwave for payments. The PRD names Paystack. Treat Flutterwave as fixed.
  - These PRD payment rules hold for any gateway: the server sets the amount, the reference is unique, the confirmation notice is authenticated before it changes anything, and repeated notices change nothing.
  - Event names, signature method, fee figures, checkout method and the payout list call are Paystack specific. Ask before writing them for Flutterwave.
- Use only free tools. The payment gateway's live fees are the only paid item. Ask before using any hosted service.
- Hosting for the app and the database is not decided (PRD section 14, Q-8). Do not pick one.

## Folder map
This is the PRD section 8 structure. Build the folders in this map as tasks need them. Do not add folders that are not in the map without asking.
```
prisma/            schema.prisma (you may edit it), migrations/ and seed.ts (human-owned)
public/            manifest.webmanifest, sw.js
src/app/
  (member)/        login, home, ask, checkin, pay, me
  staff/           members, cash, cards, pending, today-code
  owner/           approvals, reports, usage, reconcile, cash-check
  api/
    member/        every route calls requireMemberSession() first
    staff/         every route calls requireStaffSession() first
    (payment webhook route: folder name undecided, ask before creating)
    health/route.ts
src/server/
  db/              prisma client, withMember, withStaff
  dal/member/      serves member routes
  dal/staff/       serves staff and owner routes
  auth/            sessions, pin, lockouts, ctx types
  ask/             clean, risky, route, embed, templates
  pay/             initialize, settlePayment, verify
  embeddings/      embedding client, normalise, embedCard
src/lib/           dates, money, redact
tests/             isolation/, ask/, pay/ (you write them, the human runs them)
scripts/           reembed.ts, restore-test.ts
.github/workflows/ backup.yml
```

## How to work in this codebase
1. Read the PRD section that covers the task before changing anything.
2. Make one change at a time. Report it before starting the next.
3. Next.js, TypeScript and Prisma need no question. Ask before adding any other package, including a Gemini or Flutterwave client library.
4. Never touch the database. Do not run migrations, seeds, queries or any command that connects to a database.
5. You may edit prisma/schema.prisma. Do not create migration files or edit the seed script without asking. Never write SQL that updates or deletes ledger, payment or check-in rows.
6. Write the tests. Do not run any test that connects to a database. Say which tests the human must run.
7. List your assumptions at the end of every response under the heading "Assumptions". Write "None" if there are none.
8. Stop and ask when the PRD is silent. The PRD is silent when no section, requirement or assumption states the behavior, data rule, payment rule or access rule. Choosing names or style where the PRD states no behavior is not silence.
9. Before a task, check that the rules files it needs exist. If one is missing, name it and stop.

## Where the detailed rules live
The PRD is `spotter-prd-revised.md`, at `docs/spotter-prd-revised.md`.
The schema comes from the PRD section 8 schema block and lives in `prisma/`. SQL, model names, vector size and thresholds live in the rules files below. Prices, renewal length and grace days are owner settings. Do not hard code them.

The PRD does not name these rules files. The names were chosen for this AGENTS.md. The human writes them from the PRD sections shown. The agent does not write or edit them.

| File | Holds | PRD source |
|---|---|---|
| `.agent/rules/private-data.md` | member ID from the session, row level security, isolation tests | section 8 |
| `.agent/rules/ledger.md` | ledger lines, charges, corrections, manual payments | 6K, 8 |
| `.agent/rules/gateway-payments.md` | starting and settling a gateway payment, webhook handling | 6E, 8 |
| `.agent/rules/dates-and-money.md` | money in kobo, Lagos time, the day boundary | 6, 8 |
| `.agent/rules/access-states-and-tiers.md` | active, grace and lapsed states, tiers | 6G, 8 |
| `.agent/rules/check-in.md` | code of the day, the offline queue | 6C, 8 |
| `.agent/rules/phone-and-cache.md` | installable app, page weight, the card cache | 6J, 8 |
| `.agent/rules/vector-search.md` | what is embedded, router and card queries, tier gating in SQL | 9, 10 |
| `.agent/rules/ask-tuning.md` | threshold choice and the test set | 7 |
| `.agent/rules/retention-and-backups.md` | clean up, retention, backups | section 8 |
| `.agent/rules/commands.md` | which commands the agent may run | general practice |
| `.agent/rules/git.md` | how the agent uses git | general practice |

These rules files exist but are empty. Other rules reference them. The human writes them.
- `.agent/rules/login-and-sessions.md` (join codes, sessions, staff and owner accounts) — sections 6A, 6H
- `.agent/rules/back-office-and-approvals.md` (approvals, corrections, the weekly check, the audit log) — sections 6H, 6I
- `.agent/rules/member-messages.md` (fixed sentences for private answers) — section 6D

Other rules reference these files, but they do not exist yet. Name them and stop (rule 9) until the human writes them: `security.md`, `database-and-migrations.md`, `secrets-and-config.md`, `testing.md`, `ask-pipeline.md`.

Other PRD parts: requirements are FR-1 to FR-71 in section 6. Success metrics are in section 12. Risks are in section 13. Open owner questions are in section 14.

## Definitions
- Tier: Basic or Premium. Basic sees the timetable, prices, rules, access hours, guest policy, and pause and cancel terms. Premium sees those plus written training plans and trainer guidance.
- Record: data the app answers from. There are two kinds, shared and private.
- Shared record (card): short typed text, the same for everyone, gated by tier. It may be searched by meaning. A card edit is a new draft. The live version stays until an owner-role user approves. If embedding fails at approval, the card is still approved and found by word search until embedded.
- Approved: an owner-role user approved the card. Only approved cards are shown. Confirmed date: the date staff last confirmed the card.
- Private record: belongs to one member. Fetched by exact member ID from the session. Never searched by meaning.
- Member ID: the internal identifier held in the session. Member number: the number staff give the member for login. Private queries use the member ID.
- Chunk: the PRD does not define this word. Use "card". Ask before using "chunk".
- Ledger: charge lines and payment lines. The balance is their sum. Lines are never edited. A mistake gets a new correcting line. Store and add all money as whole numbers in the smallest currency unit. Never use floating point for money.
- Manual payment: a payment staff enter with a method (cash, bank transfer or POS) and a reference. Pending payment: started and not yet confirmed by the gateway.
- Weekly check: the owner compares weekly totals per payment method with the ledger. Records checked: the date the weekly check last passed.
- Code of the day: the check-in code. It changes each Lagos day.
- Sent late: a check-in made offline and sent afterwards.
- Wrong-answer report: one tap that saves the question, the answer and the record used.
- Join code: single-use code that staff give a new member for the first login. It expires.
- Access states: computed from the expiry date and the current Lagos time. Never stored.
  - Active: paid through the expiry date. Sees everything the tier allows.
  - Grace: days after expiry. Sees everything the tier allows, sees a renewal banner, and can still check in. The owner sets the number of days (Q-3). Read it from a setting.
  - Lapsed: after grace. Sees prices, terms, the pay button and own records. Cannot check in.
  - A Premium member loses plan cards on the day Premium expires. A confirmed payment restores access at once. Private history is never deleted when a member stops paying.
- Named fallback: the staff member the app shows when the records are silent. Silent: no approved card or own record answers the question.
- Embedding: a list of numbers that represents a sentence so similar meanings sit close together.
- Webhook: a server-to-server notice from the payment gateway.
- Row level security: a PostgreSQL feature that hides rows from a query unless a rule allows them.
- PWA: a website that installs to the home screen and works with a weak connection.