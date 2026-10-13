---
trigger: always_on
---

# commands.md

Job: which commands the agent may run. Nothing else.
Unmarked rules are general practice. [HUMAN TO FILL] marks a choice only you can make.
Git commands are in git.md. Database commands are in database-and-migrations.md.

- Package manager: [HUMAN TO FILL]. Use only that one. Why: two managers make two lockfiles and different versions.
- Run without asking: type check, lint, tests that do not connect to a database, and `prisma generate`, `prisma validate` and `prisma format`. Exact commands: [HUMAN TO FILL]. Why: these need no database or network, and they are the proof of the work.
- Run `build` only if it needs no `DATABASE_URL`, no secret and no live service. Otherwise do not run it. Give the human the command. Why: a build that connects can touch real data.
- Never run any other Prisma command. This includes `migrate`, `db push`, `db pull`, `db execute`, `studio` and the seed. The human runs them. Why: the agent never touches the database.
- Never run `scripts/reembed.ts` or `scripts/restore-test.ts`. Write them, and give the human the command. Why: they use the database and the network.
- Never start a development server. Why: it needs the database and the network.
- Ask first, every time:
  - installing, upgrading or removing any package, including any change of a major version
  - any command that uses the network
  - any script that writes outside the repository
  Why: each can change the machine, the lockfile or the data. Major versions break working code.
- When you ask to add a package, state: name, version, why, whether it ships to the browser, and what it adds to the download. [PRD: page weight limit] Why: members have small data bundles.
- Never run: sudo, a download piped into a shell, or a command that prints secrets (`cat .env`, `env`, `printenv`). Why: these are irreversible or leak data.
- Never run `rm -r` or `rm -rf` on anything except `.next`. Why: a wrong path deletes work that cannot be recovered.
- Never add a flag that skips a check or hides an error to get past a failure. Why: the flag hides the problem instead of fixing it.