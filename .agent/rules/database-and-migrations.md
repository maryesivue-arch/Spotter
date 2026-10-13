---
trigger: glob
globs: prisma/**/*, src/server/db/**/*, src/server/dal/**/*
---

Rule: Edit only the schema.prisma file.Reason: Defines the database structure in one centralized place.Rule: Do not run database migration commands.Reason: The human must review and run all database changes.   Rule: Do not edit the seed script.Reason: The human owns test data creation.   Rule: Never write SQL that alters tables directly.