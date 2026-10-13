---
trigger: glob
globs: (**/.env*, next.config.ts): Activates to enforce mock values and prevent hardcoded key leaks when environment variables or configurations are edited.
---

Rule: Never hardcode api keys or passwords in the source code.

Reason: Prevents sensitive data from leaking into version control.

Rule: Read configuration only from environment variables.

Reason: Allows the app to run in different environments safely.

Rule: Use mock values for all tests.

Reason: Prevents tests from accidentally using live credentials.