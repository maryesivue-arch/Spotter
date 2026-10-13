---
trigger: glob
globs: (src/app/api/**/*, src/server/**/*)
---

# errors-and-logging.md

Job: shared API response shapes, error codes, and logging boundaries.
Source: PRD section 8, security.md, private-data.md.

## Shared Response Shapes
All API route handlers return consistent JSON structures:

- **Success response**:
  ```ts
  { ok: true, data: T }
  ```
- **Error response**:
  ```ts
  { ok: false, error: string, code?: string }
  ```

## HTTP Status Codes
- `400 Bad Request`: Input validation failed, malformed JSON, or missing required fields.
- `401 Unauthorized`: Missing or invalid session cookie.
- `403 Forbidden`: Authenticated user lacks permission (e.g. tier mismatch or CSRF origin failure).
- `404 Not Found`: Target entity not found.
- `429 Too Many Requests`: Rate limit or question cap reached.
- `500 Internal Server Error`: Unhandled server exception.

## Logging & Redaction Rules
- Never leak stack traces, database query errors, or internal IDs to API clients. Return a generic message in production.
- Never log private data, passwords, PINs, session tokens, or unredacted questions to application logs.
- Remove digit runs of 5 or more characters before logging any question text or client payload.
