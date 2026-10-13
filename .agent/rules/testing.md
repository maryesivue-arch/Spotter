---
trigger: model_decision
description: Read when writing, changing or deciding to write a test
---

Rule: Write automated tests for every new feature.Reason: Proves the code works before it reaches users.Rule: Never connect to a real database in tests.Reason: Keeps tests fast and prevents data corruption.   Rule: Name the tests the human must run.Reason: The agent cannot run tests that require a database.   Rule: Place tests in their specific feature folders.Reason: Keeps the test directory organized by domain.