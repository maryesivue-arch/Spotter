---
trigger: always_on
---

# git.md

Job: how the agent uses git. Nothing else.
Unmarked rules are general practice. [HUMAN TO FILL] marks a choice only you can make.

- You may run `git status`, `git diff` and `git log` without asking. Why: they change nothing.
- Work on a branch. Never work on the main branch. Why: main must stay the last version you reviewed.
- Branch name format: [HUMAN TO FILL]. Why: the agent cannot guess your naming habit.
- Commit only when the human's message says to commit. Push only when it says to push. Why: the human reviews each change before it is saved or shared.
- Before each commit, run `git status` and `git diff --staged`. Check that only the intended files are staged. Why: a stray file in a commit is hard to remove later.
- One purpose per commit. Why: a commit with one purpose can be undone alone.
- A schema change and its migration file go in the same commit. Why: one without the other breaks the history.
- Add files by name. Never run `git add -A` or `git add .`. Why: a blind add commits stray `.env` and build files.
- Keep `.gitignore` listing `.env` files, build output and dependency folders. Why: a committed file stays in history after you delete it. The rule against secrets is in secrets-and-config.md.
- Commit message style: [HUMAN TO FILL]. Say what changed and why, in plain English. Why: the history is how you find a change later.
- Never force push. Never rewrite history that was already pushed. Never delete a branch you did not create. Why: these destroy work that cannot be recovered.
- Never run `git reset --hard`, `git checkout .`, `git restore .` or `git clean -f`. Why: they destroy changes that were never committed.
- Never use `--no-verify` or any flag that skips a hook. Why: the hook is a check, and skipping it hides the failure.
- Do not commit while the done checklist in testing.md fails. Why: a failing commit wastes review time.
- On a merge or rebase conflict, stop and report. Why: a guessed resolution in money or private data code can hide a serious bug.
- Never merge your own pull request. Why: review is the human's gate.
- Merge style: [HUMAN TO FILL]. Why: it decides how history reads.
- A pull request description holds four things: what changed and why, the FR ids it covers, what the human must run (migrations, database tests), and anything you could not check. [PRD: requirement ids] Why: the human reviews from the description.