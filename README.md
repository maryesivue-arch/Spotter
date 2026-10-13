# Spotter

Spotter is a small installable web app (a PWA) that a gym gives to its members. It answers questions only from the gym's approved typed cards and the asking member's own records, lets members check in and pay, and hands them to a named staff member when the records hold no answer. No answer comes from the internet and no AI writes any answer.

## What it does (MVP)

Member features (PRD section 1):

- **Ask the gym** — matches a question to an approved shared card by meaning (embeddings), with a plain word-search fallback. Cards show exactly as typed with their confirmed date.
- **Check in** — types the code of the day. One check-in per member per Lagos day. Offline check-ins queue on the phone and sync later as "sent late".
- **My month / my membership** — attendance count, attendance dates, expiry, tier and balance, answered only from the member's own records.
- **Pay** — renewal or balance paid through the payment gateway. The server sets the amount; the app never holds money.
- **Get a person** — when records hold no answer, shows a named staff member and opens a WhatsApp link with the question pre-filled.

Staff and owner screens (inputs, not features) cover member/join-code creation, manual payments, card drafting, the weekly cash check, card and ledger-correction approval, usage counts, gateway reconciliation and the check-in code sheet.

## Principles

- **Private records stay private.** Member routes take the member ID only from the session. Row-level security on the database, three layers of protection, isolation tests.
- **No invented answers.** When nothing on record answers, the app says so and shows a named person. It never guesses.
- **Money is whole kobo.** The ledger is append-only; corrections are new lines proposed by staff and approved by an owner-role account.
- **Text only.** Members use cheap Android phones on small data bundles. Pages are text-first; the only images are the install icons.
- **Tiers gate on the server.** A Basic member never receives Premium card text.

## Stack

- Next.js (App Router), TypeScript, Prisma
- PostgreSQL with pgvector
- Gemini free tier (embeddings only — no private record is ever sent)
- Flutterwave (payment gateway; hosted checkout page)
- Hand-written service worker + web app manifest (PWA, installable)

## Getting started

Requires Node.js and PostgreSQL (with pgvector).

1. Install dependencies

   ```bash
   npm install
   ```

2. Configure environment — copy `.env.example` to `.env` and fill in values:

   ```bash
   cp .env.example .env
   ```

   - `DATABASE_URL` / `DIRECT_URL` — PostgreSQL connections (pooled / direct)
   - `SESSION_SECRET` — a 32-byte random secret
   - `GEMINI_API_KEY` — Gemini embedding key
   - `FLUTTERWAVE_SECRET_KEY` / `FLUTTERWAVE_WEBHOOK_SECRET` — gateway credentials

3. Generate the Prisma client:

   ```bash
   npx prisma generate
   ```

4. Migrate the database. Migrations are human-owned — run the `prisma/migrations` and the seed yourself:

   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. Start the dev server:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build (regenerates route types) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint over the src tree |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Run local tests (no database) |

## Tests

Tests you write here are run by a human, never by this agent, because they need a database or are destructive:

- `tests/isolation/` — prove member A cannot read member B's rows, DB rows fail closed, and routes require a session.
- `tests/ask/`, `tests/pay/` — matching and payment-settling logic.

Anything that connects to a database must be run by you.

## Project structure

```
prisma/            schema.prisma, migrations/ and seed.ts (human-owned)
public/            manifest.webmanifest, sw.js
src/app/
  (member)/        login, home, ask, checkin, pay, me
  staff/           members, cash, cards, pending, today-code
  owner/           approvals, reports, usage, reconcile, cash-check
  api/             member/staff route handlers, auth, health
src/server/
  db/              prisma client (only here and in dal may import it)
  dal/member/      member data access
  dal/staff/       staff and owner data access
  auth/            sessions, pin, lockouts
  ask/             clean, risky, route, embed, templates
  pay/             initialize, settlePayment, verify
  embeddings/      embedding client, normalise, embedCard
src/lib/           dates, money, redact, shared UI (legal-viewer, header-nav)
tests/             isolation/, ask/, pay/
scripts/           reembed.ts, restore-test.ts
.agent/rules/      detailed rules (private-data, ledger, payments, check-in, …)
```

## Rules of engagement

- Read the relevant PRD section (`docs/spotter-prd-revised.md`) before changing anything.
- The detailed rules live in `.agent/rules/*.md`. They are human-owned and cannot be edited by the agent.
- Databases are off-limits to the agent: no migrations, seeds or queries.
- Every private table in the schema must have a row-level security rule; a change to private data is not done until the isolation test passes.
- One change at a time; verify with `npm run lint` and `npm run typecheck`.
- Ask before adding any package or any hosted service; use only free tools.

## Privacy & terms

Members see the Privacy Policy and Terms of Service as in-app views (see `src/lib/legal-viewer.tsx`), not separate routes. The drafts reference the Nigeria Data Protection Act 2023 and still await review by a qualified Nigerian lawyer before launch.