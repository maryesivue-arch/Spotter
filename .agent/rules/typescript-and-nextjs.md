---
trigger: glob
globs: (src/app/api/**/*, src/server/**/*)
---

# typescript-and-nextjs.md

Job: standards for TypeScript code and Next.js App Router handlers.
Source: AGENTS.md and PRD section 8.

## TypeScript Standards
- TypeScript in strict mode (`"strict": true` in `tsconfig.json`).
- Avoid `any`. Use strict domain types and discriminated unions.
- DAL functions and pure domain builders must have explicit return type signatures.

## Route Handler Structure
- Authenticated routes run dynamically: `export const dynamic = 'force-dynamic'`.
- Member routes call `requireMemberSession(req)` first.
- Staff/owner routes call `requireStaffSession(req)` first.
- Handlers do only four things:
  1. Authenticate via the session guard.
  2. Parse and validate the incoming request body/parameters.
  3. Call the appropriate DAL or domain function passing the authenticated `ctx`.
  4. Return a structured JSON response via `NextResponse.json(...)`.
- Handlers contain no SQL, no direct database queries, and no raw business logic.

## Client vs Server Boundaries
- Code in `src/server/` must never be imported into client components or client bundles.
- Only code in `src/server/db` and `src/server/dal` may import the Prisma client.
