---
trigger: model_decision
description: Retrieved when building the offline IndexedDB queue, 48-hour sync validation, or daily code logic.
---

# check-in.md

Job: the code of the day and the check-in rules, online and offline.
Source: PRD 6C and 8.
Who may check in is in access-states-and-tiers.md. Days and times are in dates-and-money.md. The phone's storage and cache are in phone-and-cache.md. Code creation runs from the daily job (retention-and-backups.md).

## Code of the day
- The code is 5 random digits from a cryptographic random source, new each Lagos day. [ADDED] Why: a guessable code defeats the check.
- Codes exist 14 days ahead. Staff print a 7-day code sheet each week, with one strip per day. Whoever opens the gym puts up today's strip. The staff screen also shows today's code (Q-18). Why: the gym opens before the desk does.

## Rules
- One check-in per member per Lagos day. Each check-in has a `clientId` made on the phone, which is unique. Why: a retry must never create a second check-in.
- A check-in shows days this month and the counted-since note (member-messages.md).

## Offline check-in
- The phone stores `{clientId, code, clientTime}` in IndexedDB. It sends the queue on app open, on the browser's online event, and with Background Sync when the browser supports it. Why: it must work on any Android phone.
- The server rejects a check-in whose time is more than 48 hours old or more than 10 minutes in the future. [PRD: A-23] Why: it limits backdating.
- The server finds the Lagos day from `clientTime` with the dates module, and checks the typed code against that day's code. Why: a phone in another time zone must not change the day.
- A valid check-in is saved as sent late. An invalid or too old one is rejected, the member is told, and a rejected-check-in event is recorded. Why: the owner can see abuse.
- Store both the phone's time and the server's time. Why: a phone with a wrong clock explains a rejection.

## Accepted risks (log them, do not block)
- A code can be photographed and shared, so a member can check in from home.
- A wrong phone clock can backdate a check-in by at most two days, and it still needs that day's valid code. Watch for check-ins at odd hours.