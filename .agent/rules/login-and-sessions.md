---
trigger: model_decision
description: Retrieved when handling 6-digit PIN hashing, 8-character join codes, or session lockout tables.
---

# login-and-sessions.md

Job: how people prove who they are and stay logged in. Nothing else.
Source: PRD 6A and 8. [ADDED] marks a rule beyond the PRD.
Cookie flags and the Origin check are in security.md. What a logged-in member may see is in access-states-and-tiers.md. Data isolation is in private-data.md.

## Join codes
- A code is 8 random characters. Leave out 0, O, 1 and I. It is single use and expires in 48 hours. Why: look-alike characters cause typing errors.
- Store only the code's hash. Show the code once, to the staff member who creates it. [ADDED] Why: a database leak then gives away no codes.

## First login
- The member types member number and join code, then sets a 6 digit PIN. A 4 digit PIN is refused. [PRD: A-7] Why: 4 digits has only 10,000 combinations.
- A consent screen comes first. Store the consent with the time and the wording version. The member sees no record until they accept. The wording needs a lawyer (R-6). Why: personal data law.

## Passwords and sessions
- Hash PINs and staff passwords with argon2id. Why: it is slow on purpose, which resists guessing.
- Later member logins use member number and PIN. One login is one member. There is no email or phone login and no SMS. Why: SMS costs money.
- A session token is 32 random bytes. Store only its SHA-256 hash. Why: a leaked table then holds no usable tokens.
- Member sessions last 90 days and can be revoked. Staff and owner sessions last 12 hours. Why: members rarely retype a PIN on their own phone, but desk sessions should expire.
- Staff and owner each have their own email and password. There is no shared desk login. Owner actions that change money or cards ask for the password again. The gym may have up to two owner-role accounts: the owner and one named deputy (Q-19). Why: a shared login hides who made a money entry.
- A member can change their PIN (old PIN, then a new 6 digit PIN) and can log out. Why: a PIN someone saw must be replaceable without the desk.

## Failed member logins
- Slow the login: 5 failures in 15 minutes means a 1 minute wait. 10 failures means 15 minutes. 20 failures in 24 hours needs a staff reset. Count per member number and per IP address. A device with a valid session is never slowed. [PRD: FR-5, A-41] Why: a lockout would let a stranger who knows a member number block that member.
- A reset is a staff action at the desk. It issues a new join code and revokes all sessions. There is no recovery after the desk closes. Why: it is the only identity check available.
- A login failure never says which part was wrong (security.md).

## Open points
- The PRD does not say the window for "10 failures". Assume the same 15 minutes. Ask.
- Many members share one IP address on the gym wifi or one mobile network. A strict per-IP slowdown could slow them all. Ask for a higher per-IP limit.
- The schema has `failedLogins` and `lockedUntil` on `StaffUser` and `lockedUntil` on `Member`. No requirement says when they are used. Do not lock any account until the human states the rule.