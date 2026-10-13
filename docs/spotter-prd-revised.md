# Spotter: Product Requirements Document, Version 1 (Revision 2)

Free-plan limits quoted in this document were checked while it was written (October 2026). Treat every limit as something to verify again on launch day.

**Revision 2.** This version applies the corrections from a full review. The appendix at the end lists each lapse and the change made. Requirement IDs FR-61 and above were added in review. They sit inside their groups, so the numbering is not in reading order.

## Contents

1. Product Summary
2. Problem
3. Goals
4. Users and Personas
5. Scope
6. Functional Requirements
7. AI and AI Related Tools and Solutions
8. Technical Architecture, with a Prisma Data Model
9. Vector Database Architecture and Design
10. Vector Database Model
11. Business Model
12. Success Metrics
13. Risks
14. Open Questions

The assumptions list, the totals and the review appendix are at the end.

---

## 1. Product Summary

Spotter is a small installable web app that a gym gives to its members. It answers questions only from two places: the gym's own approved typed cards, and the asking member's own records. No answer comes from the internet and no AI writes any answer. The app does send the text of a question to one outside embedding service so it can match the question to a card, and it uses Paystack for payments. Members check in, pay their subscription through Paystack, and see their own attendance and balance. When the records hold no answer, Spotter says so and hands the member to a named staff member. Version one sends no messages and follows up with nobody. It collects attendance, expiry and question data so version two can add reminders and follow ups.

The five features:

1. **Ask the gym.** The member types a question. Spotter shows the best matching approved card, as typed, with its confirmed date.
2. **Check in.** The member types the code of the day. Spotter records the visit and shows days trained this month.
3. **My month and my membership.** The member asks about their own visits, tier, expiry or balance. Plain code answers from their own record, with the ledger entries shown underneath.
4. **Pay.** The member pays a renewal or a balance. The balance changes only when Paystack's server confirms.
5. **Get a person.** Spotter shows the named staff member and opens a WhatsApp chat with the question typed in. A "wrong or unclear" button sits under every answer.

---

## 2. Problem

**The scene.** The gym has 400 members and one paper timetable behind a desk that closes at 8pm. Two staff share the desk, one at a time. A member asks whether she still owes for July. The officer has no ledger in front of her, so she guesses. The member paid ₦10,000 of ₦15,000. The gym later waives the missing ₦5,000 because nobody can prove it either way.

**What it costs.** All figures below are guesses until the desk tally is done. Each one is marked.

| Cost | Estimate | Basis |
|---|---|---|
| Desk questions per day | 60 [A-1] | Guess. Count it with a paper tally for two weeks before launch. |
| Desk time on questions | 90 minutes per day | 60 questions at 1.5 minutes each [A-2] |
| Monthly subscription income | about ₦7.2 million | 400 members, 80% Basic at ₦15,000, 20% Premium at ₦30,000 [A-3] |
| Money owed at any time, not collected | about ₦40,000 lost per month | 8% of members owe about ₦5,000 each, and a quarter of that is never collected [A-4] |
| Trust | Not measurable yet | Each guessed answer is a chance for a member to leave and tell others. |

**Why the desk process fails.**
1. The only copy of the timetable and rules is on a wall, and the desk closes at 8pm. Members train after work.
2. The officer answers from memory. Memory is wrong some of the time.
3. Money and attendance records are not in front of the officer, so two of the five common questions cannot be answered at all.
4. There is no record of what members asked, so the gym never learns what is confusing.

**A hole in the idea, stated plainly.** The idea assumes the private records exist somewhere to be typed in. If balances live only in one person's head, day one has no balances. That is open question Q-1 in section 14.

**A second hole.** The idea says a member can "owe" for July, but feature 4 is a prepaid renewal. It never says how a balance arises. Section 6K fixes the ledger rules, and open question Q-17 asks the owner which billing model the gym uses.

**Measurement gate.** Do not quote a price and do not sign the gym until the desk tally and a count of unpaid balances are done. Every guessed figure above is then replaced by the measured one.

---

## 3. Goals

Every goal is measured from data the app collects. Because rollout is staged over about 8 weeks (section 5), full targets are measured 60 days after the last cohort is invited. Section 12 gives separate pilot gates for the first 30 members.

| ID | Goal | Target |
|---|---|---|
| G-1 | Fewer questions at the desk | Down at least 50% from the measured baseline, once every member has been invited for 60 days |
| G-2 | Members open the app regularly | 50% of active members open it on 6 or more days a month. An active member checked in at least once in the last 30 days. |
| G-3 | Renewals paid in the app | 30% of renewals |
| G-4 | Answers are trusted | Fewer than 2 in 100 answers get a "wrong or unclear" tap, and the weekly staff sample finds fewer than 2 in 100 wrong |
| G-5 | No private record leaks | No cross-member read found. Isolation tests pass on every release and the monthly audit log check finds none. Tests show known paths are closed. They cannot prove zero. |
| G-6 | Records stay true | 0 naira unexplained difference in the weekly cash check for 4 weeks in a row |
| G-7 | Works on a cheap phone and small data | First load 200 KB or less transferred. Later screens 30 KB or less. [A-5] |
| G-8 | Less money left uncollected | Total balances unpaid for more than 30 days fall by at least 50% from the measured baseline |

**Non-goals.** Version one will not do any of these:
- Class booking, push messages, workout logging, trainer chat, PDF receipts, self-service pause or cancel, family accounts, leaderboards.
- Send any message, reminder or follow up.
- Score or predict who will leave.
- Nudge anyone, personalise training advice, or apply discounts automatically.
- Answer anything from the internet.
- Hold anyone's money.
- Give staff or the owner a member-facing role.

---

## 4. Users and Personas

**The member: Tunde, 29.** He works shifts at a logistics firm, is a Basic member at ₦15,000 a month, and has a cheap Android phone with 2 GB of memory. He keeps mobile data off most of the day and buys small bundles. He trains four times a week and opens the app about 16 times a month. Thirteen or fourteen of those opens are check-ins. Two or three are questions. After checking in he sees "days this month: 9". That count is his reason to open it when he has no question.

**Honest hole:** if check-in has no reward, he stops checking in by week three. The idea offers only the count. The owner must decide on a small reward, such as a free guest day at 12 visits in a month (open question Q-10). That would be a gym policy, not an automated message.

**Range check.** An average member trains fewer days than Tunde. Use his 16 opens as the top of the range, not the middle. Members who have no smartphone, or who prefer to talk to a person, keep using the desk. Spotter does not replace it.

**The desk staff: Ngozi.** She works the desk and is the named fallback. She is **not a user of the member app.** She uses staff screens in the same web app, behind a separate login, to:
- add members and create join codes
- enter cash payments
- draft cards
- see pending payments
- show today's check-in code

**The owner: Mr. Bello.** He is **not a user of the member app.** He uses owner screens to:
- approve cards
- approve ledger corrections
- see wrong-answer reports and unanswered questions
- see usage counts
- reconcile Paystack payouts against the ledger
- run the weekly cash check

*The names are examples, not research.* The brief said staff are not users, but staff and owner obviously use screens. The accurate statement is that they are not users of the member app and are never shown to members except as the named fallback.

---

## 5. Scope

### In scope for version one
- The five member features in section 1.
- Staff screens and owner screens listed in section 4. They are inputs, not features.
- Installable web app (PWA), which means a website that installs to the home screen and works with a weak connection.
- Silent data collection listed below.

**Not screens in version one.** The intent example phrases, the medical word list, the Pidgin word table and the test set are files the developer edits. The owner reviews them. They are not screens.

### Out of scope
Everything in the non-goals list in section 3.

### What version one collects for version two
- Every question typed: time, route taken (gym card, private record, or no answer), card matched, match score.
- Every "wrong" tap and every handoff tap.
- Every check-in with time and whether it was sent late.
- Every app open.
- Every payment attempt and outcome, including abandoned ones.
- Expiry dates, renewal dates and days late for each renewal.
- Tier changes.
- Questions asked in the 30 days before a member stopped paying.

### Day one launch plan

| When | What |
|---|---|
| 2 weeks before | Staff tally desk questions on paper. This is the baseline for G-1. |
| 1 week before | Staff type about 40 cards from the wall timetable and rule sheet. Owner approves them. Staff write a 250 question test set (see section 7). |
| 1 week before | Staff type in 30 members from whatever the gym has, each with a source note. The pilot is a mix: 10 regulars, 10 occasional members and 10 Premium members. Attendance starts at zero. |
| Launch day | The 30 pilot members receive join codes at the desk. The app says "counted since [launch date]". |
| Weeks 1 to 4 | Weekly cash check. Owner reads wrong-answer reports every week. |
| Weeks 5 to 8 | If every pilot gate in section 12 passes, widen: week 5 adds 100 (130 total), week 6 adds 100 (230), week 7 adds 100 (330), week 8 adds 70 (400). [A-6] |

### Pre-launch gates

No real member logs in until all six are done and written down.

| Gate | What must be true |
|---|---|
| 1 | The desk tally and the count of unpaid balances are done (section 2) |
| 2 | The app host's free plan is confirmed to allow commercial use (Q-8, section 8) |
| 3 | The Paystack live account is verified and has paid out a test amount to the gym's bank account (Q-2, Q-20) |
| 4 | Google's free tier terms for the embedding service are read and the decision is recorded (section 7) |
| 5 | A backup restore into a scratch database has worked (section 8) |
| 6 | The isolation tests are green (section 8) |

---

## 6. Functional Requirements

Format: each requirement has a short description, an acceptance test, and the records it reads from. IDs FR-61 and above were added in review. "Lagos time" means the Africa/Lagos time zone. All money is stored in kobo (whole numbers) so there are no rounding errors.

### 6A. Login and membership (member app)

| ID | Requirement | Acceptance test | Reads from |
|---|---|---|---|
| FR-1 | Staff creates a member with name, tier, expiry date, opening balance and a source note. The app assigns a member number. | Given a staff login, when staff saves a new member, then the member exists and the opening balance is a ledger entry with the source note. | Member, LedgerEntry |
| FR-2 | The app makes a join code of 8 random characters. It leaves out 0, O, 1 and I. It is single use and expires in 48 hours. Only a hash of the code is stored. | Given a code used once, when it is used again, then it is refused. Given a code older than 48 hours, then it is refused. | JoinCode |
| FR-3 | First login: the member types member number and join code, then sets a **6 digit** PIN. [A-7] | Given a valid code, when the member sets a PIN of 6 digits, then a session starts. Given a PIN of 4 digits, then it is refused. | JoinCode, Member |
| FR-4 | Later logins use member number and PIN. The session lasts 90 days and can be revoked. | Given a revoked session, when the member opens the app, then the login screen shows. | Session |
| FR-5 | Failed PINs slow the login down instead of locking it: 5 failures in 15 minutes means a 1 minute wait, 10 means 15 minutes. A device that holds a valid session is never slowed. After 20 failures in 24 hours the member needs a staff reset. Counts are kept per member number and per IP address. [A-41] | Given 10 wrong PINs sent for member 42 from one address, when member 42 opens the app on their own phone with a valid session, then they are not blocked. | LoginAttempt |
| FR-6 | Staff can reset a member: it issues a new join code and revokes all sessions. PIN recovery is at the desk only. There is no recovery after the desk closes. [accepted, R-13] | Given a reset, when the old session is used, then it is rejected. | Session, JoinCode |
| FR-7 | First login shows a plain consent screen. The app stores the consent with the time and the wording version. | Given a member who has not consented, when they try to continue, then they cannot see any record. | ConsentRecord |
| FR-61 | A logged in member can change their PIN (old PIN, then a new 6 digit PIN) and can log out. Logout clears the queued check-ins and the cached cards. | Given a logout, then the cached cards are gone. | Member, Session |

**Hole in the idea:** the brief says "PIN of 4 to 6 digits". A 4 digit PIN has only 10,000 combinations, and member numbers are easy to guess. The smallest fix is a 6 digit PIN, lockouts, and a long session so the PIN is rarely typed. This is [A-7].

### 6B. Ask the gym (feature 1)

| ID | Requirement | Acceptance test | Reads from |
|---|---|---|---|
| FR-8 | One text box. Up to 300 characters. Before the question goes to any outside service, spaces and commas between digits are removed, then every run of 5 or more digits is replaced by [number]. This is best effort. A member can still type a name or an amount in words, and the consent screen says so. | Given "my balance is 15,000", when sent for matching, then the text sent contains [number]. | QuestionLog |
| FR-9 | Routing order: (1) a short whole word list for medical and body topics only (injury, pregnant, supplement, diet, medication, weight loss), (2) one embedding and a vector match across cards, private intents and risky example phrases, (3) result. Requests for refunds, discounts, waivers and disputes, and questions about staff matters, are caught by risky example phrases, not by the word list, so a question like "what is the refund policy" can still reach an approved card. A question about a staff member is answered only if an approved card states it, such as the trainer named on the timetable. | Given "what is your refund policy" and a pause and cancel card that states it, then the card shows. Given "give me a refund", then the refusal shows. Given "can I train with a knee injury", then the refusal shows. | RiskyTerm, SearchVector, IntentExample |
| FR-10 | A shared answer shows the card text exactly as typed, its "confirmed on" date, and nothing else. No AI wording. | Given a matched timetable card, when answered, then the text equals the approved card text. | SharedCard |
| FR-11 | A card past its review date still shows, with "not confirmed recently, ask the desk". | Given a card reviewed 100 days ago, when matched, then the note shows. | SharedCard |
| FR-12 | If the best score is under the threshold, the app says "I don't have that on record" and shows the named person. | Given "who won the match last night", when asked, then the silent message shows. | SearchVector, GymSetting |
| FR-13 | Tier gating happens in the server query. A Basic member asking about training plans sees "Training plans are part of Premium" and gets none of the plan text. | Given a Basic member, when a plan question is matched, then the response body contains no plan text. | SharedCard, Member |
| FR-14 | If the two best matches score within 0.03 of each other, show both, each labeled. This covers two cards, and also one card and one private answer. [A-15] | Given "how much is the monthly fee" where a price card and the balance intent score within 0.03, then both show. | SearchVector |
| FR-15 | Offline, the app searches the cards saved on the phone by words, not meaning, and says so. Each saved card set carries a `cacheValidUntil` date equal to the member's expiry plus the grace days. After that date the app deletes cards the member may no longer see, even offline, and refreshes the cache on every online open. | Given a lapsed member whose cache date has passed, when the app opens offline, then the Premium plan cards are cleared. | Phone cache |
| FR-66 | Entity check. After a card wins, plain code reads day names (Monday to Sunday), tier names (Basic, Premium) and class names in the question. If the question names one and the card text does not contain it, the card is not shown as the answer. The app tries the next card that does contain it, or says "I don't have that on record". Each timetable card must name its days in full. | Given "what time is Sunday class" and only a card named "Saturday classes" scoring 0.85, then the silent message shows. | SharedCard, SearchVector |
| FR-68 | When the embedding service is down or over its daily cap, plain keyword rules route the six private intents (for example owe, balance, paid, expire, days, attended). Shared questions use Postgres word search over approved cards. The app shows "Searching by words only right now". | Given the embedding service is unreachable and the question "do I owe", then the balance answer still shows. | SharedCard, Member |

### 6C. Check in (feature 2)

| ID | Requirement | Acceptance test | Reads from |
|---|---|---|---|
| FR-16 | The code of the day is 5 random digits, new each Lagos day. Codes are made 14 days ahead. Staff print a 7 day code sheet each week from the staff screen, with one strip per day. Whoever opens the gym tears off or shows today's strip on the wall. The staff screen also shows today's code. [Q-18] | Given the gym opens at 5am with no desk staff, when a member looks at the wall, then today's code is there. | DailyCode |
| FR-17 | The member types the code. One check-in per member per Lagos day. | Given a second check-in the same day, when sent, then it is refused with "Already checked in today". | CheckIn, DailyCode |
| FR-18 | After check-in the app shows "days this month: N" and "counted since [launch date]". | Given 9 check-ins this month, when the member checks in, then "9" shows. | CheckIn |
| FR-19 | Offline, the phone stores the typed code and the time. On reconnect it sends them. The server checks the code against the code for that stored date. A valid one is saved as "sent late". An invalid one is rejected and the member is told. | Given an offline check-in with a wrong code, when synced, then it is rejected and shown as "not counted". | CheckIn, DailyCode |
| FR-20 | Queued check-ins older than 48 hours are rejected. | Given a check-in queued 3 days ago, when synced, then it is rejected. | CheckIn |
| FR-21 | A lapsed member cannot check in. | Given a lapsed member, when they enter a valid code, then they see "Your membership has ended, pay to continue". | Member |

**Holes in the idea, stated plainly.** The code on the wall can be photographed and sent on WhatsApp, so a member can check in from home. The phone cannot verify the code while offline, so offline check-ins are only provisional until sync. A phone with a wrong clock can backdate a check-in by at most two days, and it still needs a valid code for that day. The smallest fix is a code that changes every day and rejection on sync. Accept the remaining cheating risk in version one and watch for check-ins that cluster at odd hours. (Accepted risk.)

### 6D. My month and my membership (feature 3)

**Private records are fetched by the exact member ID taken from the session. They are never searched by meaning. They are never searched across members. They are never guessed at.**

| ID | Requirement | Acceptance test | Reads from |
|---|---|---|---|
| FR-22 | Six private intents only: attendance count, attendance dates, expiry, tier, balance, payment history. | Given "what is my shoe size", when asked, then the silent message shows. | IntentExample |
| FR-23 | Month words ("July", "this month", "last month") are read by plain code. If no month is named, the app uses this month and says so. | Given "days in July" on 4 October, when answered, then July of this year is used. | CheckIn |
| FR-24 | Answers are fixed sentences filled from the record. No AI writes them. | Given 11 July check-ins, then the sentence is "You checked in 11 days in July." | CheckIn |
| FR-25 | The balance is the sum of ledger entries in kobo. The ledger entries are shown underneath. | Given charge 15,000, payment 10,000, then "You owe ₦5,000" and both entries show. | LedgerEntry |
| FR-26 | The app never says "you owe nothing" without a record. No entries at all gives "No payment record found, ask the desk." A zero balance with entries shows the last payment. | Given a new member with no entries, then "No payment record found" shows. | LedgerEntry |
| FR-27 | Every private answer shows "records checked on [date]", using the gym's `ledgerConfirmedThrough` date. If that date is more than 9 days old, a warning shows. This date means the weekly totals matched. It does not mean every member's balance was verified. | Given a checked date 11 days ago, then the warning shows. | GymSetting |
| FR-28 | A private question when not logged in shows the login screen and no data. | Given no session, when asked "do I owe", then no record is returned. | Session |

**Hole in the idea:** "last confirmed" is undefined. A member who has not paid in 30 days has an old last ledger entry, but the balance may still be right. The smallest fix is one gym-wide date set by the owner's weekly check (FR-52), and that is the date shown here, under the honest name "records checked". [A-8]

### 6E. Pay (feature 4)

| ID | Requirement | Acceptance test | Reads from |
|---|---|---|---|
| FR-29 | The server decides the amount: the renewal price for the tier, or the member's balance. The phone cannot set it. | Given a changed amount in the request, then the server ignores it. | Member, LedgerEntry |
| FR-30 | The server creates a unique reference and a pending Payment, then starts the Paystack transaction. | Given a tap on Pay, then one pending Payment exists with a unique reference. | Payment |
| FR-31 | Only one pending payment per member per purpose, enforced by a partial unique index. A pending payment becomes ABANDONED when Paystack reports it abandoned, or when it is 30 minutes old and unpaid, so the member can start again. A late success on an ABANDONED payment still settles. [A-37] | Given a pending payment older than 30 minutes with no payment at Paystack, when the member taps Pay, then the old one is marked ABANDONED and a new one starts. | Payment |
| FR-32 | The webhook checks the Paystack signature before anything else. Unsigned or wrong requests are dropped. | Given a wrong signature, then nothing changes. | Payment |
| FR-33 | A confirmed payment writes its ledger lines once and updates expiry once. A renewal writes a CHARGE for the price and then the PAYMENT, so the net is zero. A balance payment writes one PAYMENT line. The same webhook sent twice changes nothing the second time. | Given the same event twice, then there is one set of ledger lines. Given a renewal of 1,500,000 kobo, then the ledger shows +1,500,000 and -1,500,000. | Payment, LedgerEntry |
| FR-34 | When the member returns, or opens the app, the app asks Paystack for the status of any pending reference. | Given a pending payment confirmed on Paystack, when the app opens, then it shows confirmed. | Payment |
| FR-35 | A renewal extends expiry by 30 days from the later of the old expiry and the payment date. [A-9] | Given expiry 1 Oct and payment 28 Sept, then new expiry is 31 Oct. | Member |
| FR-36 | A balance payment can be any amount from ₦1,000 up to the balance. [A-10] | Given a balance of ₦5,000 and a payment of ₦6,000, then it is refused. | LedgerEntry |
| FR-37 | Pending payments older than 24 hours show on the staff list with their reference. This is a query, not a scheduled job. | Given a 25 hour old pending payment, then it shows. | Payment |

### 6F. Get a person (feature 5)

| ID | Requirement | Acceptance test | Reads from |
|---|---|---|---|
| FR-38 | The named staff member, their desk hours and the gym WhatsApp number come from one settings record. | Given a changed name, then the app shows it. | GymSetting |
| FR-39 | The button is a `wa.me` link with the question typed in. The member taps send. The app sends nothing. The tap is logged. | Given a tap, then the link opens and one handoff event is stored. | QuestionLog |
| FR-40 | A "wrong or unclear" button sits under every answer. One tap saves the question, the answer shown and the record or card used. | Given a tap, then a WrongReport exists. | WrongReport |

### 6G. Access states (applies to everything above)

| ID | Requirement | Acceptance test | Reads from |
|---|---|---|---|
| FR-41 | State is computed from expiry and the current Lagos time, never stored. | Given expiry 1 Oct and now 3 Oct, then the state is Grace. | Member |
| FR-42 | The states below apply. | See the table. | Member |
| FR-43 | A confirmed payment restores access the moment the webhook is processed. | Given a lapsed member who pays, then access returns without staff action. | Payment |
| FR-44 | A Premium member whose premium expires loses plans that day. | Given a Premium expiry yesterday, then plan cards are not returned. | Member |
| FR-45 | Private history is never deleted when someone stops paying. | Given a lapsed member, then every earlier record still shows. | all private tables |

| State | When | Sees | Can check in |
|---|---|---|---|
| Active | Today is on or before expiry | Everything their tier allows | Yes |
| Grace | 1 to 7 days after expiry (assumed, [A-11]) | Everything their tier allows, plus a renewal banner | Yes |
| Lapsed | More than 7 days after expiry | Prices, pause and cancel terms, Pay button, all own records | No |

### 6H. Staff screens (inputs)

| ID | Requirement | Acceptance test | Reads from |
|---|---|---|---|
| FR-46 | Staff enter a manual payment with a method (cash, bank transfer or POS) and a reference: the receipt book number for cash, the transfer reference for a transfer, the slip number for POS. A reference is unique within its method. [A-35] | Given a repeated receipt number for cash, then it is refused. | LedgerEntry |
| FR-47 | Staff draft or edit a card. An edit creates a new draft. The live version stays until an owner-role user approves. The gym may have up to two owner-role accounts, the owner and one named deputy, so approval is not blocked by one person's absence. [A-38] | Given an edit, then members still see the old text until an owner-role user approves. Given two owner-role accounts, then either one can approve. | SharedCard |
| FR-48 | Staff propose a correcting ledger entry with a reason. It does not apply until the owner approves. | Given a proposal, then the balance is unchanged. | LedgerEntry |
| FR-49 | Staff see the pending payments list and today's code. | Given a pending payment, then it shows with its reference. | Payment, DailyCode |
| FR-63 | Staff find a member by name or member number. | Given "Ada", then members named Ada show. | Member |
| FR-64 | Staff and owner use individual accounts with email and password, 12 hour sessions, and slowed logins after failures. Owner actions that change money or cards ask for the password again. | Given an owner approval, then the password is asked again. | StaffUser, Session |

### 6I. Owner screens (inputs)

| ID | Requirement | Acceptance test | Reads from |
|---|---|---|---|
| FR-50 | The owner approves or rejects cards. An approved card is embedded in the same request. If the embedding service fails, the card is still approved and marked `needsEmbedding`. Word search finds it until the owner's retry succeeds. [A-27] | Given an approval while the embedding service is down, then the card is live and word search finds it. | SharedCard, SearchVector |
| FR-51 | The owner approves or rejects ledger corrections. Each is logged with names. | Given an approval, then a new ledger entry exists and the old one is untouched. | LedgerEntry, AuditLog |
| FR-52 | The weekly check: the owner enters cash counted, and a total per method for transfers and POS taken from the bank statement and the POS report. The screen shows ledger totals per method for the week and the differences. A confirmed check sets `ledgerConfirmedThrough`. | Given matching totals for all three methods, when confirmed, then the date updates. | LedgerEntry, GymSetting |
| FR-53 | The owner sees wrong reports and unanswered questions, newest first. | Given a wrong tap, then it shows within a minute. | WrongReport, QuestionLog |
| FR-54 | The owner sees usage counts (opens, check-ins, questions, payments), the total of balances unpaid for more than 30 days, and the Paystack fees paid. | Given 3 check-ins today, then the count is 3. | CheckIn, QuestionLog, LedgerEntry, Payment |
| FR-55 | The owner reconciles Paystack payouts against the ledger by reference. | Given a payout line with no ledger entry, then it is flagged. | Payment, LedgerEntry |
| FR-56 | Overdue cards are listed. | Given a card past its review date, then it shows. | SharedCard |
| FR-71 | Weekly sample screen: it shows 30 random answered questions from the last 7 days with the answer shown. Staff mark each right or wrong. The result feeds the metric in section 12. | Given 30 marked answers, then the sample score shows. | QuestionLog |

### 6J. Data and phone

| ID | Requirement | Acceptance test | Reads from |
|---|---|---|---|
| FR-57 | Every staff and owner write is recorded in an audit log with who, what and when. | Given a card edit, then an AuditLog row exists. | AuditLog |
| FR-58 | Every item in the "collects for version two" list is saved. | Given an app open, then an event row exists. | AppEvent, QuestionLog |
| FR-59 | The app installs to the home screen and caches its shell and the member's tier cards. | Given no connection, then the shell and cached cards open. | Phone cache |
| FR-60 | Text only. No photos or illustrations. The only image files are the 192 and 512 pixel home screen icons the phone needs to install the app. They load once and are cached. Page weight stays inside G-7. Paystack checkout opens by redirect to Paystack's hosted page, not by loading Paystack's pop-up script inside Spotter. | Given a first load, then transfer is 200 KB or less. | None |
| FR-62 | On a member's request, staff export that member's records as a file, and delete them after owner approval. Ledger and payment lines are anonymised, not deleted, if the law requires the gym to keep financial records. A lawyer confirms (R-6). | Given a deletion request approved by the owner, then the member can no longer log in and their name is removed. | Member, AuditLog |
| FR-69 | Speed. 90% of questions are answered in under 3 seconds on a 3G connection. Server time is logged for every question. | Given a week of questions, then the 90th percentile is under 3 seconds. | QuestionLog |
| FR-70 | One daily scheduled job: it runs `SELECT 1`, makes the next 14 days of check-in codes, and deletes old rows (section 8, Retention and clean up). | Given a run, then 14 days of codes exist and rows older than the limits are gone. | DailyCode, LoginAttempt, Session |

### 6K. Ledger and charges (added in review)

The ledger has two kinds of line: charges (positive) and payments (negative). The balance is the sum.

| ID | Requirement | Acceptance test | Reads from |
|---|---|---|---|
| FR-65 | Charges come from three sources only: (a) a renewal checkout, where the app writes the charge and the payment together, (b) a charge posted by staff with a reason and their name, (c) the opening balance typed on day one. The app never creates a charge on its own and never bills monthly. [A-36] | Given no staff action and no checkout, when a month passes, then no new charge appears. | LedgerEntry |
| FR-67 | Staff post a charge with an amount and a reason (for example a carried over balance or a session pack). The member sees the reason. Every staff-posted charge appears on the owner's weekly list. | Given a posted charge of 500,000 kobo with the reason "July balance", then the member's balance rises by that amount and the owner list shows it. | LedgerEntry, AuditLog |

---

## 7. AI and AI Related Tools and Solutions

### Where AI is used, and where it is not

**Your split is right, and I would go one step further.** Version one uses **no AI that writes text.** The only AI is an embedding model. An embedding turns a sentence into a list of numbers so that sentences with similar meaning land close together. The app uses it to match a loose question to the right approved card.

| Part | Uses AI? | How it works |
|---|---|---|
| Matching a question to a gym card | Yes, embeddings | The card text is shown exactly as typed. |
| Deciding whether a question is private, risky or shared | Partly | Plain word lists first. Then the same embedding compared with short example phrases. |
| Answering a private question | **No** | Plain code reads the member's own rows and fills a fixed sentence. |
| Money answers | **No** | Plain code sums the ledger in kobo. |
| Wording any answer | **No** | The shared card is shown as written. |

**One change to your design.** The brief says AI only matches cards. But the app must also tell "do I owe" from "what is the price", and "can I train with a knee injury" from "can I bring my sister". I use short example phrases for those. They are public text that staff write, such as "how many days did I come in July". They contain no member data. They sit in their own table and are compared with the same question vector.

**Private records are never embedded and never searched by meaning.** The question is compared with example phrases, not with any member's records.

### Free tools

| Tool | Use | Free limit | Cost |
|---|---|---|---|
| Google Gemini `gemini-embedding-001` | Embeds cards, example phrases and questions | One source reports the free tier allows 100 requests a minute, 30,000 tokens a minute and 1,000 requests a day. Verify on launch day. [A-12] | ₦0 |
| Output size | 768 numbers per vector | Google recommends 3072, 1536 or 768 output dimensions for the best results. 768 is the smallest of those, so it uses the least storage. | ₦0 |
| Plain code | Routing, month parsing, templates, redaction | None | ₦0 |
| Postgres full text search | Backup if the embedding service is down or over its limit | None | ₦0 |

**Volume check.** Even at 400 members asking 5 questions a month, that is about 70 a day. That is inside a 1,000 a day free limit. The app also caps each member at 30 questions a day and the whole gym at 800 a day. Above that, the app falls back to word search over cards and says so. [A-13]

**A hole to know about.** Free tiers of AI services often allow the provider to use submitted text. Members' questions would go to Google. The app strips long digit strings first (FR-8), the consent screen says it plainly, and no private records are sent. A member can still type their own name or balance into a question. **Launch gate: read Google's current free tier terms and write down the decision before any real member uses the app.** If they are not acceptable, the fallback is a small embedding model run on the app's own server. That is heavier and may not fit a free host. [A-14]

### How a question is routed

1. **Clean.** Trim, cap at 300 characters, remove digit strings of 5 or more.
2. **Medical word list.** Plain code checks whole words for medical and body topics only: injury, injured, pregnant, pregnancy, supplement, diet, medication, weight loss. A hit shows the refusal and the named person. No match is run. Money decisions (refund, discount, waive, dispute) and staff matters are caught in step 5 by risky example phrases, so a policy question can still reach an approved card.
3. **Embed once.** One call to the embedding service.
4. **Compare** that single vector with three sets: card vectors, private intent example vectors, risky intent example vectors.
5. **Decide.**
   - Best score under the threshold: silent.
   - Best is a risky example: refusal.
   - Best is a private intent: private route.
   - The two best matches are within 0.03 and are on different routes (for example a card and a private intent): show both, each labeled. [A-15]
   - Best is a card: run the entity check (FR-66), then the tier check, then show it.
6. **Log** the route, score and card or intent matched.

**When the embedding service is down or over its cap.** Plain keyword rules route the six private intents, shared questions use Postgres word search, and the app says "Searching by words only right now" (FR-68).

**Two intents in one question** ("do I owe and what time is Saturday class") get the top one only. The app adds "Ask one thing at a time" when two different routes both score above the threshold.

### The similarity threshold

- **Start value: 0.72.** [A-16] This is a guess. Cosine similarity, the score that says how close two vectors are, depends on the model. It must be tuned.
- **How to set it.** Staff write a test set of 250 questions from the desk tally, in English and in Pidgin: 100 with a correct card (including 30 near-miss pairs such as Saturday and Sunday, or Basic and Premium hours), 50 private questions, 30 risky questions and 70 with no answer, such as football scores. Label each one. Run all 250 at thresholds from 0.60 to 0.85 in steps of 0.01. [A-43]
- **Pick the threshold** where at least 98% of answered questions are correct and at least 90% of out-of-scope questions are silent. If no threshold does both, raise it. A silent answer costs a handoff. A wrong answer costs trust. A test set this size cannot prove 98%, so treat it as a starting aim and keep measuring with the weekly staff sample (FR-71).
- **Re-run the test set** whenever a card changes or the embedding model changes.

### Pidgin and mixed English

The embedding model supports over 100 languages, but Nigerian Pidgin is thinly covered. Two fixes:
1. Each card carries 3 to 6 **sample questions** typed by staff, including Pidgin ("wetin be Saturday class time"). Each sample question gets its own vector, linked to its card.
2. A small plain word table maps common Pidgin words ("wetin", "abeg", "wen") to English before embedding. Staff can extend it.

Answers stay in the simple English of the card. Yoruba and Igbo are not in version one. [A-17]

### Prompt injection

A prompt injection is text that tries to give instructions to an AI. In version one it cannot work, because **no generative model ever reads the question.** The question is only turned into numbers and compared. It is never placed in a prompt, never run as code, and is shown back as plain escaped text. Question text is length capped. **If version two adds a model that writes text, this protection ends and must be redesigned.** Note this in the version two plan.

---

## 8. Technical Architecture, with a Prisma Data Model

### Hosting choice and free limits

I recommend **Supabase free for the database, used only as plain PostgreSQL**, and **Vercel Hobby for the Next.js app**. Do not use Supabase Auth or its client libraries. Login, sessions and all data access go through Prisma, so the locked stack holds.

| Option | Free limit found | What happens at the limit | Fits Spotter? |
|---|---|---|---|
| Supabase free (recommended) | 500 MB database, 5 GB egress, and projects pause after one week of idle time | The project pauses and needs a manual restart | Yes. 400 members need under 50 MB in year one [A-28]. A daily health ping prevents the pause. |
| Neon free (fallback) | 100 compute unit hours and 0.5 GB per project, with pgvector available. Free compute suspends after five minutes of inactivity. | Compute stops until next month when the 100 hours run out | Risky. My estimate: a gym used from 5am to 9pm keeps the smallest compute (0.25 unit) awake about 16 hours a day. That is about 120 unit hours a month, above the 100 limit. [A-20] |
| Vercel Hobby (app host) | Free for personal use. I believe commercial use is not allowed on this plan. Verify. | Account can be suspended | **Open question Q-8.** The gym pays you, so this is probably commercial use. |

Both databases support pgvector, the PostgreSQL extension that stores and compares vectors. Everything below works on either.

**Host gate (build gate, not a later question).** The app host's free plan must allow commercial use. I believe Vercel Hobby does not, because the gym pays the developer. Read the host's terms before building. If Hobby is not allowed, check a free plan that allows commercial use (Netlify's free plan is the first to check) or use the paid cost in section 11. [A-20]

**Region and speed.** Pick the database region nearest Nigeria that the free plan offers (verify the list) and set the app's function region to the same area. Target: 90% of questions answered in under 3 seconds on 3G (FR-69). [A-40]

[A-20] Hosting limits are as found today. Re-check on launch day. A daily scheduled call on the free app host is allowed.

### Components

| Component | Job |
|---|---|
| Next.js App Router app | Member pages, staff pages (`/staff`), owner pages (`/owner`), and route handlers for the API |
| PostgreSQL with pgvector | All records and all vectors |
| Prisma | Every normal query. Vector queries use raw SQL through Prisma. |
| Data access layer (DAL) | The only code allowed to talk to the database. Every private query needs the member ID from the session. |
| Gemini embedding API | Turns text into vectors. The only outside AI service. |
| Paystack | Hosted checkout, status check, signed webhook, transaction list for the owner reconcile screen |
| Service worker (hand written) | Caches the app shell and the member's allowed cards. Queues offline check-ins. [A-19] |
| Daily scheduled job | One scheduled call that runs `SELECT 1` (keeps the free database awake), makes the next 14 days of check-in codes, and deletes old rows |

[A-19] A small hand written service worker beats a PWA plugin for page weight.

### Request flow for each feature

**1. Ask the gym.** Phone sends the question to `POST /api/ask`. Server checks the session, caps the rate, cleans the text, checks the risky word list, embeds the question once, runs the router query (section 10, query 1), applies the threshold, then returns either a card (with gating done in SQL), a private intent label, a refusal, or the silent message. It writes a QuestionLog row.

**2. Check in.** Phone sends `{clientId, code, clientTime}` to `POST /api/checkin`. Server derives the Lagos day, loads the code for that day, compares, then inserts a CheckIn. A unique rule on member and day blocks a second one. Offline, the same payload waits in the phone's IndexedDB (a small database inside the browser) and is sent on the next open or when the connection returns.

**3. My month and my membership.** Phone sends the question to `POST /api/ask`. If the router says "private intent", the server calls a DAL function such as `getBalance(ctx)`, where `ctx` carries the member ID from the session. Plain code sums the ledger and fills a fixed sentence. **No vector search touches private records.**

**4. Pay.** `POST /api/pay` creates a pending Payment with a unique reference and returns the Paystack checkout address. Paystack calls `POST /api/paystack/webhook` when money lands. The app also checks pending references when it opens (`GET /api/pay/status`).

**5. Get a person.** The phone builds a `wa.me` link from the settings record and the typed question. The tap calls `POST /api/events` to log the handoff. The app sends no message.

### Session and login

- **Members:** member number and a 6 digit PIN. The PIN is hashed with argon2id (a slow, safe hashing method). The server makes a 32 byte random session token, stores only its SHA-256 hash, and sets it in an HttpOnly, Secure, SameSite=Lax cookie. Sessions last 90 days and can be revoked.
- **Staff and owner:** individual email and password accounts, argon2id, 12 hour sessions. Owner actions that change money or cards ask for the password again. [A-33]
- **Slowdowns:** table `LoginAttempt`. Failed PINs slow the login down (FR-5). A device with a valid session is never slowed. Counts apply per member number and per IP address.
- **Origin check:** every POST route checks that the `Origin` header matches the app's own address, on top of SameSite cookies.
- **No SMS, no email for members.**

### The data access layer and how it protects private records

**Rule: every private record query requires the member ID from the session.** Three layers enforce it.

**Layer 1: types.** Only `requireMemberSession()` can create a `MemberCtx`. Every DAL function for private data takes `ctx: MemberCtx` as its first argument and puts `ctx.memberId` in the query. There is no function that takes a member ID from the request body.

```ts
// src/server/dal/member/ledger.ts
import { withMember } from "@/server/db/with-member";
import type { MemberCtx } from "@/server/auth/ctx";

export async function getLedger(ctx: MemberCtx) {
  return withMember(ctx, (tx) =>
    tx.ledgerEntry.findMany({
      where: { memberId: ctx.memberId },
      orderBy: { occurredAt: "asc" },
    })
  );
}
```

**Layer 2: database rules.** Row level security (RLS) is a PostgreSQL feature that hides rows from a query unless a rule allows them. Prisma connects as one role, so RLS only helps if it is set up carefully:
1. Create a role `spotter_app` that is not the table owner and has no `BYPASSRLS`.
2. Turn on `ENABLE` and `FORCE ROW LEVEL SECURITY` on every private table.
3. `withMember` opens a Prisma transaction and runs `SELECT set_config('app.member_id', $1, true)`. The `true` means "for this transaction only", so it is safe with the connection pooler.
4. The policy allows a row only when the row's member ID matches that setting. If no setting exists, no rows return.

```sql
CREATE ROLE spotter_app LOGIN PASSWORD '...';
GRANT USAGE ON SCHEMA public TO spotter_app;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO spotter_app;
REVOKE UPDATE, DELETE ON "LedgerEntry", "AuditLog", "CheckIn" FROM spotter_app;

ALTER TABLE "LedgerEntry" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "LedgerEntry" FORCE ROW LEVEL SECURITY;
CREATE POLICY ledger_member ON "LedgerEntry"
  USING (
    "memberId" = current_setting('app.member_id', true)
    OR current_setting('app.actor', true) IN ('staff', 'owner')
  );
-- Repeat for Member, JoinCode, Session, CheckIn, Payment, Renewal,
-- LedgerCorrection, QuestionLog, WrongReport, ConsentRecord, TierChange,
-- AppEvent. Every table that holds one person's data gets a policy.

CREATE FUNCTION forbid_change() RETURNS trigger AS $$
BEGIN RAISE EXCEPTION 'LedgerEntry is append only'; END $$ LANGUAGE plpgsql;
CREATE TRIGGER ledger_no_change BEFORE UPDATE OR DELETE ON "LedgerEntry"
  FOR EACH ROW EXECUTE FUNCTION forbid_change();
```

**The login path.** Before login there is no member ID, so a policy that matches a member ID would return nothing. Login code runs inside `withAuth`, which sets `app.actor = 'auth'`. A narrow policy lets that actor read only the Member, JoinCode, Session and LoginAttempt rows it needs (a lookup by member number or token hash) and write only to Session, LoginAttempt and the PIN fields of Member. Staff and owner routes run inside `withStaff`, which sets `app.actor` to `staff` or `owner` from their own session. The isolation tests cover all three actors.

Be clear about what this protects. It catches a forgotten `where` clause and any query with no member set. It does **not** protect against code that sets the wrong member ID. Layer 1 and the tests cover that.

**Layer 3: tests that run on every change.**
1. **Two member test.** Seed members A and B. Call every DAL function with A's context. Assert no returned row belongs to B.
2. **No context test.** Run a raw `SELECT * FROM "LedgerEntry"` as `spotter_app` with no member set. Assert zero rows.
3. **Wrong ID test.** Send B's IDs in every URL and body to every `/api/member/*` route while logged in as A. Assert 404 or 403.
4. **Import ban.** An ESLint rule bans importing the raw Prisma client anywhere outside `src/server/db` and `src/server/dal`.
5. **Route guard test.** A test reads every file under `app/api/member` and fails if a handler does not call `requireMemberSession()` first.

### Payment webhook design

A webhook is a message that Paystack's server sends to ours when a payment changes. Rules, in order:

1. Read the raw body as text. Compute HMAC SHA512 (a signature check) with the Paystack secret key. Compare to the `x-paystack-signature` header using a timing safe compare. Wrong signature: return 401 and stop.
2. Insert a `WebhookEvent` row with a unique key made from event name, reference and Paystack ID. **If the insert hits the unique rule, this is a duplicate. Return 200 and stop.**
3. Only `charge.success` changes money. Other events are stored and ignored.
4. Run `settlePayment(reference)` in one transaction. It locks the Payment row (`SELECT ... FOR UPDATE`).
   - Status is already SUCCESS: stop. A payment marked ABANDONED can still become SUCCESS if Paystack later reports success.
   - Amount or currency does not match our Payment row: mark it FAILED with a flag, show on the staff list, stop.
   - Otherwise write the ledger lines in the same transaction. For a renewal: a CHARGE for the price, then a PAYMENT (negative, `paymentId` unique), then a Renewal row and the new expiry. For a balance payment: one PAYMENT line. Mark SUCCESS. If the same member has paid the same renewal period twice, record the second as a payment and flag it for staff as an overpayment.
5. Return 200 fast.

**Out of order and duplicates.** SUCCESS is final. A late `charge.failed` after success is ignored. Unknown references are stored and appear on the owner reconcile screen. The member return path and the app-open check call the same `settlePayment` function, so webhook and check can never both credit.

### Offline queue design

- Store: IndexedDB table `pendingCheckIns` with `{clientId (uuid), code, clientTime}`.
- Flush: on app open, on the browser `online` event, and on Background Sync where the phone supports it.
- Server: `clientId` is unique, so a retry never creates a second check-in. The server rejects a `clientTime` more than 48 hours old or more than 10 minutes in the future. [A-23] It checks the code against the code stored for that Lagos day.
- The member sees each queued item as "waiting", "counted (sent late)" or "not counted: wrong code".
- Logout clears the queue and the cached cards.
- A phone with a wrong clock can cause rejects. The server stores both times.
- Cached Premium plan text stays readable offline until the next online open, even if premium has since ended. Accept this. [A-24]

### Retention and clean up

The daily job deletes: `LoginAttempt` rows older than 30 days, expired or revoked sessions older than 30 days, expired join codes older than 30 days, and `WebhookEvent` payloads older than 12 months (the key stays). It blanks `QuestionLog.textRedacted` after 12 months and keeps the route, card and score. Ledger, check-in, payment and renewal rows follow Q-12. [A-31]

### Prisma schema

The schema is written for Prisma 6. If your AI coding tool installs Prisma 7, the connection URLs move into `prisma.config.ts`. [A-18] Money is whole kobo. Charges are positive, payments are negative, and the balance is the sum.

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")  // pooled connection, used by the app
  directUrl  = env("DIRECT_URL")    // direct connection, used by migrations
  extensions = [vector]
}

enum Tier             { BASIC PREMIUM }
enum StaffRole        { STAFF OWNER }
enum CardStatus       { DRAFT PENDING_APPROVAL APPROVED REJECTED ARCHIVED }
enum CardCategory     { TIMETABLE PRICES RULES ACCESS_HOURS GUEST_POLICY PAUSE_CANCEL TRAINING_PLAN TRAINER_GUIDANCE }
enum LedgerKind       { OPENING_BALANCE CHARGE PAYMENT_MANUAL PAYMENT_GATEWAY CORRECTION }
enum PaymentMethod    { CASH TRANSFER POS }
enum PaymentPurpose   { RENEWAL BALANCE }
enum PaymentStatus    { PENDING SUCCESS FAILED ABANDONED }
enum CorrectionStatus { PROPOSED APPROVED REJECTED }
enum RouteTaken       { SHARED_CARD PRIVATE_INTENT RISKY SILENT RATE_LIMITED WORD_SEARCH }
enum PrivateIntent    { ATTENDANCE_COUNT ATTENDANCE_DATES EXPIRY TIER BALANCE PAYMENT_HISTORY }
enum ExampleKind      { PRIVATE_INTENT RISKY }
enum VectorKind       { CARD_BODY CARD_SAMPLE_QUESTION INTENT_EXAMPLE }

// One row only (id = 1). One gym per deployment. [A-32]
model GymSetting {
  id                     Int       @id @default(1)
  gymName                String
  fallbackName           String
  fallbackWhatsapp       String    // digits with country code, no plus sign
  deskHoursText          String
  basicPriceKobo         Int
  premiumPriceKobo       Int
  renewalDays            Int       @default(30)
  graceDays              Int       @default(7)
  launchDate             DateTime  @db.Date
  ledgerConfirmedThrough DateTime? @db.Date
  similarityThreshold    Float     @default(0.72)
  tieMargin              Float     @default(0.03)
  memberDailyQuestionCap Int       @default(30)
  gymDailyEmbedCap       Int       @default(800)
  embeddingModel         String    @default("gemini-embedding-001")
  embeddingDims          Int       @default(768)
  updatedAt              DateTime  @updatedAt
}

model StaffUser {
  id           String    @id @default(cuid())
  email        String    @unique
  name         String
  passwordHash String
  role         StaffRole
  active       Boolean   @default(true)
  failedLogins Int       @default(0)
  lockedUntil  DateTime?
  createdAt    DateTime  @default(now())
  sessions     Session[]
  members      Member[]
}

model Member {
  id            String    @id @default(cuid())
  memberNumber  Int       @unique @default(autoincrement())
  name          String
  tier          Tier
  expiresAt     DateTime  @db.Date
  pinHash       String?
  failedPins    Int       @default(0)
  lockedUntil   DateTime?
  deactivatedAt DateTime?
  createdById   String
  createdBy     StaffUser @relation(fields: [createdById], references: [id])
  createdAt     DateTime  @default(now())

  joinCodes   JoinCode[]
  sessions    Session[]
  consents    ConsentRecord[]
  checkIns    CheckIn[]
  ledger      LedgerEntry[]
  corrections LedgerCorrection[]
  payments    Payment[]
  renewals    Renewal[]
  tierChanges TierChange[]
  questions   QuestionLog[]
  reports     WrongReport[]
  events      AppEvent[]

  @@index([expiresAt])
}

model JoinCode {
  id          String    @id @default(cuid())
  memberId    String
  member      Member    @relation(fields: [memberId], references: [id])
  codeHash    String    @unique
  expiresAt   DateTime
  usedAt      DateTime?
  createdById String    // StaffUser.id
  createdAt   DateTime  @default(now())
  @@index([memberId])
}

// Exactly one of memberId or staffUserId is set (CHECK constraint added in SQL).
model Session {
  id          String     @id @default(cuid())
  tokenHash   String     @unique
  memberId    String?
  member      Member?    @relation(fields: [memberId], references: [id])
  staffUserId String?
  staffUser   StaffUser? @relation(fields: [staffUserId], references: [id])
  expiresAt   DateTime
  revokedAt   DateTime?
  userAgent   String?
  createdAt   DateTime   @default(now())
}

model LoginAttempt {
  id         String   @id @default(cuid())
  subject    String   // "member:123" or "staff:email"
  ip         String
  success    Boolean
  createdAt  DateTime @default(now())
  @@index([subject, createdAt])
  @@index([ip, createdAt])
}

model ConsentRecord {
  id         String   @id @default(cuid())
  memberId   String
  member     Member   @relation(fields: [memberId], references: [id])
  version    String
  acceptedAt DateTime @default(now())
  @@index([memberId])
}

model DailyCode {
  localDate DateTime @id @db.Date  // Lagos day, made 14 days ahead
  code      String
  createdAt DateTime @default(now())
}

model CheckIn {
  id           String   @id @default(cuid())
  clientId     String   @unique   // uuid made on the phone
  memberId     String
  member       Member   @relation(fields: [memberId], references: [id])
  localDate    DateTime @db.Date
  clientTime   DateTime
  receivedAt   DateTime @default(now())
  sentLate     Boolean  @default(false)
  @@unique([memberId, localDate])
  @@index([localDate])
}

// Append only. Updates and deletes are blocked by a trigger.
model LedgerEntry {
  id             String     @id @default(cuid())
  memberId       String
  member         Member     @relation(fields: [memberId], references: [id])
  kind           LedgerKind
  amountKobo     Int        // charge positive, payment negative
  occurredAt     DateTime
  sourceNote     String?    // e.g. "ledger page 12"
  method         PaymentMethod?
  externalRef    String?    // receipt book number, transfer reference or POS slip number
  paymentId      String?    @unique
  correctsId     String?
  reason         String?
  createdById    String?    // StaffUser.id, null for gateway entries
  approvedById   String?    // StaffUser.id, for corrections
  createdAt      DateTime   @default(now())
  @@unique([method, externalRef])
  @@index([memberId, occurredAt])
}

model LedgerCorrection {
  id               String           @id @default(cuid())
  memberId         String
  member           Member           @relation(fields: [memberId], references: [id])
  amountKobo       Int
  reason           String
  proposedById     String
  status           CorrectionStatus @default(PROPOSED)
  decidedById      String?
  decidedAt        DateTime?
  resultingEntryId String?
  createdAt        DateTime         @default(now())
}

model Payment {
  id             String         @id @default(cuid())
  reference      String         @unique
  memberId       String
  member         Member         @relation(fields: [memberId], references: [id])
  purpose        PaymentPurpose
  amountKobo     Int
  status         PaymentStatus  @default(PENDING)
  flagged        Boolean        @default(false)
  initializedAt  DateTime       @default(now())
  confirmedAt    DateTime?
  lastCheckedAt  DateTime?
  @@index([status, initializedAt])
  @@index([memberId])
}

model WebhookEvent {
  id          String    @id @default(cuid())
  eventKey    String    @unique
  event       String
  reference   String?
  payload     Json
  receivedAt  DateTime  @default(now())
  processedAt DateTime?
  outcome     String?
}

model Renewal {
  id               String   @id @default(cuid())
  memberId         String
  member           Member   @relation(fields: [memberId], references: [id])
  previousExpiresAt DateTime @db.Date
  newExpiresAt     DateTime @db.Date
  paidAt           DateTime
  daysLate         Int
  viaGateway       Boolean
  ledgerEntryId    String   @unique
  @@index([memberId])
}

model TierChange {
  id          String   @id @default(cuid())
  memberId    String
  member      Member   @relation(fields: [memberId], references: [id])
  fromTier    Tier
  toTier      Tier
  changedAt   DateTime @default(now())
  changedById String?
}

// Each edit makes a new row in the same group. One APPROVED row per group
// (partial unique index added in SQL).
model SharedCard {
  id                String       @id @default(cuid())
  groupId           String
  version           Int
  title             String
  body              String
  category          CardCategory
  tierRequired      Tier         @default(BASIC)
  visibleWhenLapsed Boolean      @default(false)
  status            CardStatus   @default(DRAFT)
  needsEmbedding    Boolean      @default(false)
  confirmedOn       DateTime?    @db.Date
  reviewBy          DateTime?    @db.Date
  draftedById       String
  approvedById      String?
  approvedAt        DateTime?
  createdAt         DateTime     @default(now())

  samples CardSampleQuestion[]
  vectors SearchVector[]

  @@unique([groupId, version])
  @@index([status, tierRequired])
}

model CardSampleQuestion {
  id     String     @id @default(cuid())
  cardId String
  card   SharedCard @relation(fields: [cardId], references: [id], onDelete: Cascade)
  text   String
}

// Public phrases written by staff. They contain no member data.
model IntentExample {
  id      String         @id @default(cuid())
  kind    ExampleKind
  intent  PrivateIntent? // set when kind = PRIVATE_INTENT
  label   String?        // set when kind = RISKY, e.g. "medical"
  text    String
  vectors SearchVector[]
}

model RiskyTerm {
  id    String @id @default(cuid())
  term  String @unique
  label String
}

model PidginWord {
  id      String @id @default(cuid())
  pidgin  String @unique
  english String
}

// The only table with a vector column. Links only to a card or an example.
model SearchVector {
  id               String         @id @default(cuid())
  kind             VectorKind
  cardId           String?
  card             SharedCard?    @relation(fields: [cardId], references: [id], onDelete: Cascade)
  intentExampleId  String?
  intentExample    IntentExample? @relation(fields: [intentExampleId], references: [id], onDelete: Cascade)
  sourceText       String
  model            String
  dims             Int
  embedding        Unsupported("vector(768)")
  createdAt        DateTime       @default(now())
  @@index([cardId])
  @@index([model])
}

model QuestionLog {
  id              String        @id @default(cuid())
  memberId        String
  member          Member        @relation(fields: [memberId], references: [id])
  askedAt         DateTime      @default(now())
  textRedacted    String
  route           RouteTaken
  matchedCardId   String?
  matchedIntent   PrivateIntent?
  score           Float?
  secondScore     Float?
  thresholdUsed   Float?
  accessState     String        // ACTIVE, GRACE or LAPSED at ask time
  handoffTappedAt DateTime?
  latencyMs       Int?
  @@index([memberId, askedAt])
  @@index([route, askedAt])
}

model WrongReport {
  id            String    @id @default(cuid())
  memberId      String
  member        Member    @relation(fields: [memberId], references: [id])
  questionLogId String?
  answerShown   String
  recordRef     String    // card id or "ledger:<entry ids>"
  createdAt     DateTime  @default(now())
  reviewedAt    DateTime?
  reviewedById  String?
  note          String?
}

model AppEvent {
  id        String   @id @default(cuid())
  memberId  String?
  member    Member?  @relation(fields: [memberId], references: [id])
  type      String   // APP_OPEN, CHECKIN_REJECTED, PAYMENT_ABANDONED, ...
  meta      Json?
  createdAt DateTime @default(now())
  @@index([type, createdAt])
  @@index([memberId, createdAt])
}

model AuditLog {
  id        String   @id @default(cuid())
  actorId   String   // StaffUser.id
  action    String
  entity    String
  entityId  String
  before    Json?
  after     Json?
  createdAt DateTime @default(now())
  @@index([entity, entityId])
}
```

**SQL that Prisma does not generate.** Add these in a hand written migration:

```sql
ALTER TABLE "Session" ADD CONSTRAINT session_one_owner
  CHECK (("memberId" IS NOT NULL)::int + ("staffUserId" IS NOT NULL)::int = 1);

CREATE UNIQUE INDEX one_live_card_per_group
  ON "SharedCard" ("groupId") WHERE status = 'APPROVED';

ALTER TABLE "SearchVector" ADD CONSTRAINT vector_one_source
  CHECK (("cardId" IS NOT NULL)::int + ("intentExampleId" IS NOT NULL)::int = 1);

-- One pending payment per member per purpose (FR-31)
CREATE UNIQUE INDEX one_pending_per_purpose
  ON "Payment" ("memberId", purpose) WHERE status = 'PENDING';

-- Word search fallback (FR-68). 'simple' works for English and Pidgin.
CREATE INDEX shared_card_fts ON "SharedCard"
  USING gin (to_tsvector('simple', title || ' ' || body));
```

### Folder structure

```
spotter/
  prisma/
    schema.prisma
    migrations/           # includes hand written SQL for RLS, triggers, checks
    seed.ts               # settings, cards, intent examples, risky terms
  public/
    manifest.webmanifest
    sw.js                 # service worker, hand written
  src/
    app/
      (member)/           # login, home, ask, checkin, pay, me
      staff/              # members, cash, cards, pending, today-code
      owner/              # approvals, reports, usage, reconcile, cash-check
      api/
        member/...        # all call requireMemberSession()
        staff/...         # all call requireStaffSession()
        paystack/webhook/route.ts
        health/route.ts
    server/
      db/                 # prisma client, withMember, withStaff
      dal/member/         # the only code that reads private records
      dal/staff/
      auth/               # sessions, pin, lockouts, ctx types
      ask/                # clean, risky, route, embed, templates
      pay/                # initialize, settlePayment, verify
      embeddings/         # gemini client, normalise, embedCard
    lib/                  # dates (Lagos), money (kobo), redact
  tests/
    isolation/            # two member, no context, wrong id, route guard
    ask/                  # test set runner and threshold report
    pay/                  # webhook duplicate, out of order, amount mismatch
  scripts/
    reembed.ts
    restore-test.ts
  .github/
    workflows/backup.yml   # nightly encrypted pg_dump
```

### Deployment plan

1. Create the Supabase project. Create the `spotter_app` role. Keep the direct connection for migrations and the pooled connection (port 6543, transaction mode) for the app.
2. Run `prisma migrate deploy` from a laptop using `DIRECT_URL`.
3. Deploy to the host chosen at the host gate (Vercel Hobby only if its terms allow commercial use). Set `DATABASE_URL`, `DIRECT_URL`, `GEMINI_API_KEY`, `PAYSTACK_SECRET_KEY`, `SESSION_SECRET`.
4. Use Paystack test keys and the test webhook address until launch day. Test mode is free.
5. Add one daily scheduled call to `/api/health`. It also makes the next 14 days of codes and runs the clean up.
6. Free plans may have no automatic backups. [A-21] Run a **nightly** encrypted `pg_dump` from a scheduled GitHub Actions job on a private repository. Use the database's IPv4 session pooler connection string, because Actions runners often lack IPv6. Keep 30 days of dumps. Test a restore into a scratch database before launch and every quarter. The owner also gets a monthly CSV copy of the ledger. Worst case loss is one day of entries, so staff keep the paper receipt book as the second record. [A-39]
7. No custom domain in version one. The app uses the host's free address. Check that Paystack accepts it for go-live (Q-20). If Paystack requires a domain, a domain costs money and breaks the free rule, so the owner decides.

---

## 9. Vector Database Architecture and Design

**What is embedded.** Only three kinds of text:
1. The body of each approved shared card.
2. Sample questions that staff write for each card (including Pidgin).
3. Short example phrases for the six private intents and for risky topics.

**Private records are never embedded and never searched by meaning.** Nothing in Member, CheckIn, LedgerEntry, Payment, Renewal, QuestionLog or any other private table is ever turned into a vector. A private question is compared with example phrases, never with anyone's data.

**Why this is impossible and not just discouraged.**
1. No private table has a vector column. The only vector column is `SearchVector.embedding`.
2. `SearchVector` has foreign keys only to `SharedCard` and `IntentExample`. A database check makes exactly one of them required (section 8 SQL). A row cannot point at a member record.
3. The embedding function in code accepts only two input types, `CardInput` and `ExampleInput`. A private row type does not fit them, so the compiler rejects it.
4. A CI test reads the schema and fails if a vector column appears anywhere else.

**Model and size.** `gemini-embedding-001` at 768 numbers per vector. Google says it recommends 3072, 1536 or 768 dimensions for the best results, and 768 is the cheapest to store. Normalise each vector to length 1 in code before saving, so that cosine similarity is a simple dot product. [A-25] Use ONE task type for every text (cards, sample questions, example phrases and typed questions): the semantic similarity task type. Then every score sits on the same scale and one threshold means the same thing. Verify the exact name in the embedding docs. [A-25]

**When vectors are made.**
- When the owner approves a card, the same request embeds the body and each sample question. **If the embedding service fails, the card is still approved and marked `needsEmbedding`.** Word search finds it until the owner's retry succeeds. A timetable change is never blocked by an outside service. [A-27]
- A new approved version archives the old one. The old vectors are deleted by cascade.
- If the model or size changes, run `scripts/reembed.ts`. Every vector row stores `model` and `dims`. Queries only compare vectors with the current model name.
- Intent examples and risky examples are embedded once, from the seed script.

**Index.** There are about 400 vectors. An exact scan across 400 rows takes a few milliseconds. An approximate index (HNSW) gives no speed gain here and can miss the true nearest match. The threshold depends on exact scores, so **version one creates no vector index and uses exact search.** [A-26] Add an HNSW index only if the table grows past roughly 10,000 rows. The SQL is in section 10.

**Query flow.**
1. Clean the question (section 7). Embed once.
2. **Router query** over all vectors (section 10, query 1). It returns the top 5 across cards, private intents and risky examples.
3. Apply the rules in section 7: threshold, private wins ties within 0.03, show two cards if both pass and are within 0.03.
4. If a card wins, run the **card fetch** (section 10, query 2). Gating happens here, in SQL.

**Tier filtering at query time.** The card fetch always scores every approved card, then returns the body only if the member's tier and state allow it. Otherwise the body is `NULL` and the app shows "Training plans are part of Premium". This lets a Basic member learn that plans exist, but they receive no plan text. A Basic member does see the title of a Premium card, for example "Leg day plan, weeks 1 to 4". That is accepted.

| Member state | Cards whose body is returned |
|---|---|
| Active or Grace, Basic | `tierRequired = BASIC` |
| Active or Grace, Premium | all approved |
| Lapsed | only `visibleWhenLapsed = true` (prices, pause and cancel terms) |

**Unapproved and overdue cards.** Only `status = APPROVED` rows are searched. Drafts, pending and rejected cards are never returned. Overdue cards are returned, with the flag `reviewBy < today`.

**Threshold and fallback.** Start at 0.72 and tune with the 250 question test set (section 7). If nothing passes, show the silent message and the named person. If the embedding service is down or over its cap, search cards by words with PostgreSQL full text search and show "Searching by words only right now". [A-13]

---

## 10. Vector Database Model

### Tables and SQL

Prisma creates `SearchVector` with a `vector(768)` column from the `Unsupported("vector(768)")` field and enables the extension from the `extensions = [vector]` line. Prisma cannot read or write that column, so **every insert and every similarity query uses raw SQL** through `prisma.$queryRaw` and `prisma.$executeRaw`. The relations to `SharedCard` and `IntentExample` still work for normal queries.

```sql
-- Created by the Prisma migration (shown here for clarity)
CREATE EXTENSION IF NOT EXISTS vector;

-- "SearchVector" columns:
--   id text PK, kind "VectorKind", "cardId" text NULL, "intentExampleId" text NULL,
--   "sourceText" text, model text, dims int, embedding vector(768) NOT NULL,
--   "createdAt" timestamp
-- Check: exactly one of "cardId" and "intentExampleId" is set.

-- Insert (raw SQL, because Prisma cannot write vector columns)
INSERT INTO "SearchVector"
  (id, kind, "cardId", "sourceText", model, dims, embedding)
VALUES
  ($1, 'CARD_BODY', $2, $3, 'gemini-embedding-001', 768, $4::vector);

-- Version one: NO vector index (exact search). Create this only past ~10,000 rows.
-- CREATE INDEX search_vector_hnsw
--   ON "SearchVector" USING hnsw (embedding vector_cosine_ops);
```

### Sample rows

Vectors are shown shortened. Real rows hold 768 numbers.

**SharedCard**

| id | groupId | title | category | tierRequired | status | confirmedOn | reviewBy |
|---|---|---|---|---|---|---|---|
| c_sat | g_sat | Saturday classes | TIMETABLE | BASIC | APPROVED | 2026-09-28 | 2026-12-27 |
| c_leg | g_leg | Leg day plan, weeks 1 to 4 | TRAINING_PLAN | PREMIUM | APPROVED | 2026-09-20 | 2026-12-19 |

**SearchVector**

| kind | cardId | intentExampleId | sourceText | embedding |
|---|---|---|---|---|
| CARD_BODY | c_sat | null | Saturday classes: 8:00 Zumba, 10:00 Spin... | [0.012, -0.044, ...] |
| CARD_SAMPLE_QUESTION | c_sat | null | wetin be Saturday class time | [0.020, -0.039, ...] |
| CARD_BODY | c_leg | null | Leg day plan: squats 4x8... | [-0.031, 0.007, ...] |
| INTENT_EXAMPLE | null | i_bal1 | do I still owe for July | [0.044, 0.016, ...] |

**IntentExample** row `i_bal1`: `kind = PRIVATE_INTENT`, `intent = BALANCE`, `text = "do I still owe for July"`. This is public text staff wrote. It is not a member's record.

### Three example queries

The scores below are illustrations of the expected shape. They are not measured. Replace them with real numbers when the test set runs. Write these three queries as integration tests against seeded data before building on them, so the raw SQL parameter casts are proven.

**Query 1. The router: top matches across every vector.** `$1` is the question vector, `$2` is the current model name.

```sql
SELECT sv.kind, sv."cardId", ie.intent, ie.kind AS example_kind,
       1 - (sv.embedding <=> $1::vector) AS score
FROM "SearchVector" sv
LEFT JOIN "SharedCard" c ON c.id = sv."cardId"
LEFT JOIN "IntentExample" ie ON ie.id = sv."intentExampleId"
WHERE sv.model = $2
  AND (c.id IS NULL OR c.status = 'APPROVED')
ORDER BY sv.embedding <=> $1::vector
LIMIT 5;
```

*Question: "what time is saturday class".* Expected: first row is `CARD_SAMPLE_QUESTION` for `c_sat` at about 0.88, second is `CARD_BODY` for `c_sat` at about 0.81, then a lower scoring access hours card. The best score is above 0.72 and it is a card, so route = SHARED_CARD.
*Question: "who won the match last night".* Expected: best score about 0.40. Below the threshold, so route = SILENT.

**Query 2. Card fetch, with tier and state gating in SQL.** `$3` is the list of tiers the member may see, `$4` is true when the member is not lapsed.

```sql
WITH scored AS (
  SELECT c.id AS card_id, c.title, c.category, c."tierRequired",
         c."confirmedOn", c."reviewBy",
         CASE WHEN c."tierRequired" = ANY($3::"Tier"[])
                   AND ($4 OR c."visibleWhenLapsed")
              THEN c.body END AS body,
         1 - (sv.embedding <=> $1::vector) AS score
  FROM "SearchVector" sv
  JOIN "SharedCard" c ON c.id = sv."cardId"
  WHERE c.status = 'APPROVED' AND sv.model = $2
)
SELECT * FROM (
  SELECT DISTINCT ON (card_id) *
  FROM scored
  ORDER BY card_id, score DESC
) best
ORDER BY score DESC
LIMIT 3;
```

*A Basic member asks "give me a leg day plan".* Expected: top row is `c_leg` at about 0.84, `body` is `NULL` because the card needs Premium. The app shows "Training plans are part of Premium" and nothing from the plan.

**Query 3. A private answer. This is plain SQL with no vectors.** It runs only after the router returns `BALANCE`, and it uses the member ID from the session.

```sql
-- Runs inside withMember(ctx): set_config('app.member_id', <session member>, true)
SELECT id, kind, "amountKobo", "occurredAt", "sourceNote", method, "externalRef"
FROM "LedgerEntry"
WHERE "memberId" = $1          -- ctx.memberId, never from the request body
ORDER BY "occurredAt" ASC;
```

*Question: "do I still owe for July", member A.* Expected: the router matches `i_bal1` at about 0.90 with intent BALANCE, so route = PRIVATE_INTENT. This query returns A's entries only: charge 1,500,000 kobo, payment of -1,000,000 kobo. Code sums them to 500,000 kobo and fills the sentence "You owe ₦5,000." Both entries show underneath. Member B's rows are not visible to this query even if the `WHERE` clause were removed, because of row level security.

---

## 11. Business Model

**The brief does not say who pays whom.** There are two money flows and they must not be mixed up:
1. **Members pay the gym** through Paystack, or in cash, transfer or POS at the desk. The money goes straight to the gym. The app holds none of it.
2. **The gym pays you** for Spotter. This section is about that flow.

### Options for what the gym pays you

| Option | Gym pays | Per year for a 400 member gym | Good | Bad |
|---|---|---|---|---|
| A. Flat monthly fee | ₦30,000 a month | ₦360,000 | Easy to explain and budget | You earn the same if the gym grows |
| B. Per active member | ₦100 per active member a month. 400 members is ₦40,000 | ₦480,000 | Grows with the gym | The gym argues about what counts as "active" |
| C. Setup plus monthly | ₦100,000 once, then ₦20,000 a month | ₦340,000 in year one | Pays you for the typing and import work | Lower monthly income |

All prices are my suggestions, not market research. [A-30]

**Recommendation: Option C, with a free 30 member pilot.** Version one needs real setup work: typing about 40 cards, building the test set, importing records. The setup fee pays for it. Offer the 30 pilot members free for four weeks and start charging only when the pilot gates in section 12 pass.

**Another hole in the idea.** The design has one gym per deployment (`GymSetting` has one row). A second gym needs a second copy. That is fine for a pilot. It is not yet a scalable business. [A-32]

### Does it pay for itself? Net value for the gym, per month

Every benefit figure is a guess until the gate in section 2 replaces it with a measured one. [A-4]

| Line | Gym absorbs the Paystack fee | Member pays the Paystack fee |
|---|---|---|
| Recovered unpaid balances | +₦40,000 | +₦40,000 |
| Paystack fees (30% of renewals paid in the app) | -₦44,400 | ₦0 |
| Spotter monthly fee (Option C) | -₦20,000 | -₦20,000 |
| **Net per month** | **-₦24,400** | **+₦20,000** |

Not counted as cash: about 45 desk hours a month freed [A-1, A-2], fewer disputes, and the cost of staff time spent on guessing.

**Recommendation: the member pays the gateway fee.** Add the fee to the amount charged. On a ₦15,000 renewal that is ₦325, about 2.2%. Cash, transfer and POS at the desk cost the member nothing extra. Check Paystack's own documentation for how to pass charges to customers, and tell members in writing. The gym should absorb the fee only if measured recovery stays above about ₦65,000 a month. That is Q-6.

### Gateway cost, worked out

120 renewals a month is 30% of 400 members. With 80% Basic at ₦15,000 and 20% Premium at ₦30,000, that is 96 renewals at ₦325 and 24 at ₦550. That is ₦31,200 plus ₦13,200, or ₦44,400. At 60% the figure doubles. Paystack has a free test mode. The live local rate is 1.5% plus ₦100, capped at ₦2,000, and the ₦100 is waived under ₦2,500. A chargeback costs ₦2,500. A ₦50 stamp duty may apply to withdrawals of ₦10,000 or more. Verify all of this before launch.

### Hosting and tool costs, three scenarios

| Scenario | What is paid | Per month | Basis |
|---|---|---|---|
| A. All free | Nothing | ₦0 | Free plans that allow commercial use, within the limits in section 8 |
| B. Paid database only | Supabase Pro at $25 | about ₦37,500 | [A-29] |
| C. Paid database and paid app host | Supabase Pro at $25, Vercel Pro at about $20 | about ₦67,500 | [A-29] |

Embeddings, the WhatsApp link and SMS cost ₦0. No SMS is used.

**Pricing clause.** If scenario B or C becomes necessary, the monthly fee rises by the exact extra cost plus 20%, agreed in writing before signing. That would be about ₦65,000 a month for B and about ₦101,000 for C. **At scenario C the product does not pay for itself for a gym this size.** That is why the host gate in section 8 comes before building, and why you must choose a free host whose terms allow commercial use.

### Where the free tiers could run out

| Risk | What breaks | Fallback |
|---|---|---|
| Neon compute hours (if used) | Database stops until next month | Pay by use, about $0.106 per compute unit hour. Verify. |
| Supabase pause after a quiet week | App fails | The daily job prevents it. Pro never pauses. |
| Supabase 500 MB limit | Writes fail | Not close: expected under 50 MB in year one |
| Gemini free tier | Matching falls back to word search | Paid tier is billed by token. Verify. |
| App host terms | Account suspended | Host gate in section 8 |

---

## 12. Success Metrics

Targets are my guesses. [A-34] All numbers come from data version one already collects. There are two gates because the rollout is staged. The pilot gate is read at day 30 with 30 members. The full rollout gate is read 60 days after the last cohort is invited (section 5).

**Pilot gate rule:** widen from 30 members only if rows 4, 5, 7, 8 and 13 all pass.

| # | Metric | How measured | Pilot gate (day 30, 30 members) | Full rollout | If missed |
|---|---|---|---|---|---|
| 1 | Desk questions per day | Paper tally, same method as the baseline | Not measured (30 of 400 members) | Down at least 50% from baseline | Read the top 20 silent questions. Write cards for them. |
| 2 | Active members opening on 6 or more days a month | Distinct days with `APP_OPEN` or a check-in, per active member | 50% | 50% | Decide on the check-in reward (Q-10). Check the code is easy to find. |
| 3 | Renewals paid in the app | Renewals with `viaGateway = true` divided by all renewals | 15% | 30% | Check pay flow drop-off: pending and abandoned payments. |
| 4 | "Wrong or unclear" tap rate | WrongReport count divided by answers shown | under 4% | under 2% | Read every report that week. A low rate alone proves little, so read it with row 5. |
| 5 | Sampled answers correct | Weekly staff sample of 30 answers (FR-71), about 15 minutes | 95% | 98% | Retune the threshold. Add sample questions. Fix cards. |
| 6 | "I don't have that on record" rate | Questions with route SILENT divided by all questions | 25% or less | 15% or less | Each silent question is a card to write. |
| 7 | Weekly check difference | Owner's totals minus ledger totals, per method (FR-52) | 0 in 3 of 4 weeks | 0 for 4 weeks in a row | Name the missing entries. Retrain on same day entry. |
| 8 | Cross-member read events | Isolation tests plus the monthly audit log check | 0 | 0 | Stop the pilot and fix before anything else. |
| 9 | Join code to first login within 48 hours | JoinCode `usedAt` divided by codes issued | 80% | 85% | Hand codes out at the desk and watch the first login. |
| 10 | Pending payments older than 24 hours | Count on the staff list | 3 or fewer a week | 1 or fewer a week | Check the webhook address and signature setup. |
| 11 | Balances unpaid for more than 30 days (₦) | FR-54 owner screen | Not measured | Down at least 50% from baseline | Check staff-posted charges and same day entry. |
| 12 | Net money result for the gym per month | Recovered balances, minus Paystack fees the gym pays, minus the Spotter fee | Not measured | ₦0 or better | Move the gateway fee to the member. Review pricing. |
| 13 | Answer time | 90th percentile of `latencyMs` | under 3 seconds | under 3 seconds | Check region, cold starts and embedding latency. |
| 14 | Check-ins rejected for a wrong code or too late | `CHECKIN_REJECTED` events divided by check-in attempts | under 5% | under 3% | Check the code sheet routine (Q-18). |

---

## 13. Risks

Ordered by severity, not likelihood.

**R-1. One member sees another member's record.**
- Cause: a missing member filter, a guessed login, a leaked join code, a lost phone, or a shared phone.
- Cost: loss of trust in the gym, possible breach under the Nigeria Data Protection Act 2023, and the end of the pilot.
- Prevent: the three layers in section 8 (including the login path policy), 6 digit PIN, login slowdowns, hashed codes, no member ID taken from a request, staff reset that revokes all sessions.
- Detect: the isolation tests on every change, security events when a request's ID does not match the session, and the monthly audit.

**R-2. A wrong money answer from a stale balance.**
- Cause: a payment not typed in (cash, transfer or POS), a wrong opening balance, or a wrong staff-posted charge.
- Cost: lost revenue when the app says "you owe nothing", or an angry member when it says "you owe ₦15,000" wrongly.
- Prevent: the append only ledger, the charge rules in FR-65, same day manual entry with a reference, the "records checked" date and 9 day warning, plain code and fixed sentences, no "owe nothing" without a record.
- Detect: the weekly check per method, "wrong" taps on money answers, the weekly staff sample.

**R-3. The records quietly go stale because staff stop updating them.**
- Cause: upkeep is a chore with no named owner.
- Cost: the app slowly becomes wrong and nobody notices. This is the most likely risk.
- Prevent: name one person for card upkeep and one for manual payment entry (Q-16), the overdue card list, the weekly check.
- Detect: overdue card count, weekly check differences, a rising "wrong" rate.

**R-4. A staff or owner account is taken over or misused.**
- Cause: a shared desk login, a weak password, or a bad actor inside the gym. Staff can write to every ledger.
- Cost: false balances or free memberships.
- Prevent: individual logins (FR-64), password again for owner actions, corrections only by proposal and owner approval, the owner's weekly list of staff-posted charges, audit log on every write.
- Detect: weekly review of the audit log, especially corrections, charges and manual payments.

**R-5. Paystack money and ledger disagree.**
- Cause: webhook missed, duplicated or out of order, an amount mismatch, or a double payment.
- Cost: a member who paid shows as owing, or is credited twice.
- Prevent: signature check, unique event keys, the shared `settlePayment` function, amount check, the member return check, overpayment flag.
- Detect: the staff pending list and the owner reconcile screen (FR-55).

**R-6. Data protection law.**
- Cause: attendance and payment history are personal data. The database and the embedding service may sit outside Nigeria.
- Cost: regulator action and loss of trust.
- Prevent: the consent screen, a privacy notice, one named person to handle deletion requests (FR-62), digit redaction before sending text out, the retention rules in section 8 and Q-12.
- Detect: a legal review before launch. **A lawyer must check this section, including consent wording, transfers out of Nigeria, whether the gym must register with the regulator, how long financial records must be kept against a deletion request, and the time limit for reporting a breach, which I understand to be 72 hours.** I am not a lawyer.

**R-7. The Paystack account is frozen or fails verification.**
- Cause: incomplete business documents, a name mismatch with the bank account, or a dispute flag.
- Cost: every in-app payment stops on the same day. Members fall back to the desk.
- Prevent: register under the gym's legal name before launch (Q-2), complete verification before the pilot (gate 3), keep manual payment entry working at all times.
- Detect: a test payout to the gym's bank account before launch, and a check of the Paystack dashboard each week.

**R-8. Data loss.**
- Cause: free plans may have no automatic backups, and a developer mistake can drop data.
- Cost: the ledger is gone. That is a financial record.
- Prevent: the nightly encrypted dump, a quarterly restore test, the append only ledger, a migration review step, and the paper receipt book kept as the second record.
- Detect: a restore test before launch, and an alert when the nightly job fails.

**R-9. Free plan outage or suspension.**
- Cause: database pause, compute hours used up, a host that bans commercial use, or the embedding limit.
- Cost: the app is down while members try to check in and pay.
- Prevent: the host gate, the daily job, the word search fallback, and the paid scenarios in section 11.
- Detect: an uptime check and the daily job result.

**R-10. A confident wrong match.**
- Cause: a card that is out of date, or a question that scores above the threshold but means something else, such as the wrong day.
- Cost: a member turns up for a class that moved or does not exist.
- Prevent: the entity check (FR-66), the threshold test set with near-miss pairs, the "confirmed on" date on every answer, review dates, and showing two answers when close.
- Detect: "wrong" taps and the weekly staff sample.

**R-11. The merchant account belongs to the wrong person.**
- Cause: the Paystack account is under an owner's personal name or a former partner (Q-2).
- Cost: payouts blocked or disputed. The gym's income is tied to a person.
- Prevent: register under the gym's legal name and bank account before launch.
- Detect: confirm the account name matches the settlement account during test mode.

**R-12. Check-ins mean nothing.**
- Cause: the code is shared on WhatsApp, offline check-ins cannot be verified at once, there is no reward, or nobody puts the code up before the desk opens.
- Cost: attendance numbers are wrong, so "how many days did I come" is wrong, and version two is built on bad data.
- Prevent: a daily code on a printed 7 day sheet, one check-in per day, sync checks, a small reward (Q-10).
- Detect: check-ins at odd hours, many check-ins in one minute, the "sent late" and rejected rates.

**R-13. A lost or shared phone, and PIN recovery after hours.**
- Cause: a 90 day session stays signed in on a lost phone. A member who forgets the PIN after 8pm cannot get a reset until the desk opens.
- Cost: a stranger sees a member's balance and history, or a member cannot check in for a night.
- Prevent: staff reset revokes every session (FR-6), the member can change the PIN and log out (FR-61), sessions can be revoked on request.
- Detect: repeated login failures per member and the reset count each month.

**R-14. The developer is unavailable.**
- Cause: one person builds and runs everything, and nobody else knows the setup.
- Cost: nobody can fix a webhook, a restore or a pause while the gym depends on the app.
- Prevent: a one page run book (hosts, keys, restore steps), keys held by the owner, and a named backup contact.
- Detect: the owner can follow the run book without help once a quarter.

**R-15. The embedding service changes its terms or limits.**
- Cause: free tier changes without notice.
- Cost: matching degrades or member questions are used in ways the gym did not agree to.
- Prevent: the launch gate on terms, model name and size stored per vector, the `reembed` script, the word search fallback.
- Detect: error rate on the embedding call and the daily cap counter.

---

## 14. Open Questions

Each is marked ASK (only you can answer), ASSUME (a default exists) or RECOMMEND (the idea points the wrong way).

| ID | Label | Question and what I did about it |
|---|---|---|
| Q-1 | ASK | Which private records exist today in written form: tier, expiry, payments, balances, attendance? I assume attendance does not exist. If balances live only in someone's head, day one has no balances, and the opening ledger must be built by confirming each member's balance at the desk. |
| Q-2 | ASK | Whose name and bank account will the gateway account use, and who holds the login? I need this before any live payment. |
| Q-3 | ASK | How many days of grace after expiry? I used 7. [A-11] |
| Q-4 | ASK | What numbers would make you say it was worth it? I used the gates in section 12. |
| Q-5 | ASK | Who is the named fallback person, and is there a gym WhatsApp number read after 8pm? Default: the app shows the desk hours, so a member messaging at 9pm sees "back at 6am". |
| Q-6 | ASK | Does the gym absorb the Paystack fee or add it to the member's price? **My recommendation: the member pays it.** If the gym absorbs it, the net value is about -₦24,400 a month (section 11). |
| Q-7 | ASK | How long does one renewal last, and what are the exact prices? I used 30 days, ₦15,000 and ₦30,000. [A-3, A-9] |
| Q-8 | RECOMMEND | This is a build gate. Pick an app host whose free plan allows commercial use. I believe Vercel Hobby does not. Verify before building. At the worst paid scenario the product does not pay for itself (section 11). |
| Q-9 | ASK | Does the gym have a door or card system that decides who can enter and when? The app only quotes the access hours card. It cannot see the door system. The two must always match, or the app will contradict the door. |
| Q-10 | ASK | Will the owner give a small reward for regular check-ins, such as a free guest day at 12 visits in a month? Without a reason to check in, the attendance count is unreliable. |
| Q-11 | ASSUME | One gym per copy of the app. Reason: it halves the build and fits the pilot. [A-32] |
| Q-12 | ASSUME | Keep private history for 24 months after a member's last activity, then delete or anonymise. Question text is blanked after 12 months. Reason: long enough for disputes. A lawyer must confirm. [A-31] |
| Q-13 | RECOMMEND | Do not rely on the free database's own backups. Use the nightly encrypted dump and test a restore (section 8). The ledger is a financial record. |
| Q-14 | ASSUME | The check-in day runs from 4am to 4am Lagos time, so a late night session counts as one day. Reason: it avoids a split at midnight. [A-22] |
| Q-15 | RECOMMEND | Give every staff member their own login. Two staff share the desk, and a shared login hides who made a money entry. |
| Q-16 | ASK | Who is the one named person for card upkeep, and who is the one for same day manual payment entry? If nobody owns the job, risk R-3 will happen. |
| Q-17 | ASK | Does the gym bill monthly (so balances build up) or sell prepaid renewals only? Default: prepaid. A balance arises only from the opening balance and staff-posted charges (FR-65). |
| Q-18 | ASK | Who puts up today's check-in code strip when the gym opens before the desk does? Default: whoever opens the gym tears off today's strip from the printed 7 day sheet. |
| Q-19 | ASK | Who is the deputy owner-role account that can approve cards when the owner is away? Default: one named senior staff member. [A-38] |
| Q-20 | ASK | Will Paystack accept the free host address for live go-live, or does it need a domain of the gym's own? If a domain is required, it costs money and breaks the free rule, so the owner decides. |
| Q-21 | ASK | Which payment channels does the gym accept besides Paystack: cash, bank transfer, POS? Default: all three, entered by staff with a method and a reference. [A-35] |
| Q-22 | ASSUME | An "active member" is one who checked in at least once in the last 30 days. Reason: it is measurable from the data and ignores members who left in practice. |
| Q-23 | ASSUME | Members who have no smartphone, or who prefer people, keep using the desk. Spotter does not replace it. Reason: the brief makes the app the member's choice. |

---

## Assumptions, in one place

| ID | Assumption | Reason |
|---|---|---|
| A-1 | 60 desk questions a day | Guess. The desk tally replaces it. |
| A-2 | Each question takes 1.5 minutes | Guess |
| A-3 | 80% Basic at ₦15,000, 20% Premium at ₦30,000 | Prices come from the brief's example. The mix is a guess. |
| A-4 | 8% of members owe about ₦5,000 and a quarter is never collected, about ₦40,000 a month | Guess |
| A-5 | Page weight targets: 200 KB first load, 30 KB later screens | Realistic for Next.js with no images, but untested |
| A-6 | Roll out in four steps: 100, 100, 100 and 70 members in weeks 5 to 8 | Keeps support load small and ends the rollout at week 8 |
| A-7 | Member PIN is 6 digits, not 4 to 6 | 4 digits has only 10,000 combinations |
| A-8 | "Records checked" is one gym wide date set by the owner's weekly check, and it warns after 9 days | The brief does not define "last confirmed". The 9 days leave room for a late check. |
| A-9 | A renewal lasts 30 days from the later of old expiry and payment date | Not in the brief |
| A-10 | Balance payments run from ₦1,000 up to the balance | Avoids tiny payments that cost more in fees |
| A-11 | Grace is 7 days | Stated in the brief as an assumption |
| A-12 | Gemini free limits are 100 requests a minute, 30,000 tokens a minute, 1,000 a day | From one secondary source. Verify on launch day. |
| A-13 | Member cap of 30 questions a day, gym cap of 800 a day, then word search | Stay under the free daily limit |
| A-14 | Free tier terms of the embedding service are acceptable, with digit strings removed first | **Launch gate.** Read the terms and record the decision. If not acceptable, run a small model on our own server. |
| A-15 | Show both answers when the two best matches are on different routes and within 0.03. Two cards also show if both pass and are within 0.03 | Showing both avoids a wrong answer type and never gives a guess |
| A-16 | Starting threshold 0.72 | Guess, tuned with the test set |
| A-17 | English and typed Pidgin only | Yoruba and Igbo are not in version one |
| A-18 | Schema written for Prisma 6 | Prisma 7 moves connection settings to a config file |
| A-19 | Hand written service worker | Smaller than a plugin |
| A-20 | Hosting limits are as found today. A daily scheduled call is allowed on the free app host. Neon would use about 120 compute hours a month for this gym | My estimate, verify |
| A-21 | The free database may have no automatic backups | Verify |
| A-22 | The check-in day runs from 4am to 4am Lagos time | Avoids a midnight split |
| A-23 | Offline check-ins are accepted up to 48 hours old and no more than 10 minutes in the future | Limits cheating and phone clock errors |
| A-24 | Cached Premium plans stay readable offline until the next online open | Accept for version one |
| A-25 | Vectors are normalised in code. One task type (semantic similarity) is used for every text | One scale for every score means one threshold works. Verify the name in the embedding docs. |
| A-26 | No vector index in version one | About 400 vectors, so exact search is fast and exact |
| A-27 | A failed embedding call does not block card approval. The card is marked `needsEmbedding` and found by word search | A timetable change must never wait for an outside service |
| A-28 | Year one database size under 50 MB | About 77,000 check-ins, 24,000 questions and 400 vectors |
| A-29 | ₦1,500 to the dollar | For paid fallback figures only. Check the rate. |
| A-30 | Prices of ₦100,000 setup and ₦15,000 a month, and the other options | My suggestions |
| A-31 | Private history is kept 24 months after last activity. Question text is blanked after 12 months | Needs a lawyer's view |
| A-32 | One gym per deployment | Simplest for version one |
| A-33 | Individual staff logins, 12 hour sessions, password again for owner actions | Matches Q-15 |
| A-34 | The silent rate, sampled correctness, desk question and other metric targets are guesses | Retune after the pilot |
| A-35 | Staff enter three manual payment methods (cash, bank transfer, POS), each with a reference unique within its method | Nigerian gyms get all three. The brief only named cash. |
| A-36 | Staff-posted charges need no owner approval but appear on the owner's weekly list | Charges are rare and visible to the member, and approval would slow the desk |
| A-37 | A pending payment is marked ABANDONED after 30 minutes unpaid | Lets a member retry. A late success still settles. |
| A-38 | The gym has up to two owner-role accounts | Approval must not depend on one person |
| A-39 | A nightly encrypted dump can run on GitHub Actions within the free private repository minutes, using the IPv4 session pooler | Verify before launch. Without it, the backup plan fails. |
| A-40 | The free database plan offers a region near Nigeria and the app host can run functions in the same area | Verify. Distance adds delay on every question. |
| A-41 | PIN slowdowns: 5 failures in 15 minutes gives 1 minute, 10 gives 15 minutes, 20 in 24 hours needs a staff reset | A balance between guessing and lockout by strangers |
| A-42 | The weekly staff sample of 30 answers takes about 15 minutes | Keeps the check realistic for a busy desk |
| A-43 | A 250 question test set is the minimum for tuning, and it still cannot prove 98% | Larger than the first plan, and re-checked by the weekly sample |

---

## Totals

- **Functional requirements:** 71 (FR-1 to FR-71)
- **Risks:** 15 (R-1 to R-15)
- **Assumptions:** 43 (A-1 to A-43)
- **Open questions:** 23 (Q-1 to Q-23)
  - **ASK:** 15 (Q-1, Q-2, Q-3, Q-4, Q-5, Q-6, Q-7, Q-9, Q-10, Q-16, Q-17, Q-18, Q-19, Q-20, Q-21)
  - **ASSUME:** 5 (Q-11, Q-12, Q-14, Q-22, Q-23)
  - **RECOMMEND:** 3 (Q-8, Q-13, Q-15)

---

## Appendix. What changed in Revision 2

Each lapse found in review, with where it was fixed.

| # | Severity | Lapse | Fixed in |
|---|---|---|---|
| 1 | Critical | The ledger had no charges, so renewals made a negative balance | 6K (FR-65, FR-67), FR-33, 8 (webhook), Q-17 |
| 2 | Critical | Embeddings cannot tell Saturday from Sunday | FR-66, 7 |
| 3 | Critical | Row level security missed Member, JoinCode, LedgerCorrection and the login path | 8 |
| 4 | Critical | Host commercial terms were a late question and the paid case costs more than the fee | 5 (gate 2), 8 (host gate), 11, Q-8 |
| 5 | High | The product lost money for the gym if it absorbed Paystack fees | 11, Q-6 |
| 6 | High | Only cash was modeled | FR-46, FR-52, 8 (schema), A-35, Q-21 |
| 7 | High | The check-in code could not be posted before the desk opened | FR-16, Q-18 |
| 8 | High | Goals and metrics ignored the staged rollout | 3, 5, 12 |
| 9 | High | Mixed task types and a small test set | 7, 9, A-25, A-43 |
| 10 | High | The risky word list blocked policy questions | FR-9, 7 |
| 11 | High | Weekly manual backups | 8 (deployment), R-8, Q-13, A-39 |
| 12 | High | PIN lockout let anyone block a member | FR-5, 8, A-41 |
| 13 | High | A pending payment blocked retries | FR-31, 8 (SQL, webhook), A-37 |
| 14 | Medium | "Last confirmed" overclaimed | FR-27, A-8 |
| 15 | Medium | Owner approval blocked urgent changes | FR-47, A-38, Q-19 |
| 16 | Medium | The offline cache kept gated content | FR-15 |
| 17 | Medium | Missing requirements | FR-61 to FR-64, FR-70 |
| 18 | Medium | Weak metrics and no money metric | 12, FR-71, FR-54 |
| 19 | Medium | Embedding failure blocked approval and private routing | FR-50, FR-68, 7, 9, A-27 |
| 20 | Medium | "Private wins" gave wrong answer types | FR-14, 7, A-15 |
| 21 | Medium | Pilot of regulars inflated results | 5 |
| 22 | Medium | Persona and G-2 expected too much | 3, 4, G-2 |
| 23 | Medium | The summary said the app never uses the internet | 1 |
| 24 | Medium | Page weight, Paystack script and PWA icons | FR-60 |
| 25 | Medium | No region or speed target | 8, FR-69, A-40 |
| 26 | Medium | Paystack go-live on a free address was unchecked | 5 (gate 3), 8, Q-20 |
| 27 | Medium | No clean up or retention | 8 (retention), FR-70, A-31 |
| 28 | Low | Digit redaction missed "15,000" | FR-8 |
| 29 | Low | No origin check on POST routes | 8 |
| 30 | Low | G-1 was absolute and G-5 claimed a proof | 3 |
| 31 | Low | The developer was a single point of failure | R-14 |
| 32 | Low | Accepted risks were undocumented, and sample scores were invented | FR-16 note, 9, 10 |
