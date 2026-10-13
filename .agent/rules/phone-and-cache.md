---
trigger: glob
globs: (public/sw.js, src/app/(member)/**/*): Activates to enforce the 200 KB page weight limits and service worker cache logic for the frontend PWA.
---

# phone-and-cache.md

Job: the installable app, its weight and its offline cache. Nothing else.
Source: PRD 6J and 8. [ADDED] marks a rule beyond the PRD.
Check-in queue rules are in check-in.md. What a member may see is in access-states-and-tiers.md.

## The phone
- Members use cheap Android phones, small data bundles and unreliable power. Build an installable web app (PWA) with a web app manifest and a hand-written service worker. [PRD: A-19] Why: a plugin adds download weight.
- Text only. The only images are the 192 and 512 pixel home screen icons. They load once and are cached. Why: images cost data.
- Page weight: 200 KB or less on first load and 30 KB or less on later screens. The PRD marks this as untested (A-5). Measure transferred, compressed bytes from a production build, on the Ask screen. [ADDED] Confirm this method with the human. Why: without a method, the number cannot be checked.
- 90% of questions should be answered in under 3 seconds on a 3G connection (FR-69). Log server time for every question. Why: speed is a stated goal.
- Open the gateway's hosted payment page by redirect. Do not load the gateway's script inside Spotter. [PRD: FR-60] Why: the script adds download weight.

## Cache
- Cache the app shell and the cards the member may see. Never cache API responses that hold private data (security.md). Why: a shared phone must not leak records.
- Version the service worker cache name on every release. Delete old caches when the new worker activates. [ADDED] Why: otherwise members stay on an old app after a release.
- Each saved card set carries a `cacheValidUntil` date: the member's expiry plus the grace days. After it passes, delete cards the member may no longer see, even offline. Refresh the cache on every online open. Why: a lapsed member must not keep reading plans offline.
- Accepted risk: Premium plan text stays readable offline until the next online open, even if Premium ended in between. [PRD: A-24] Do not try to fix it.
- Offline, search saved cards by words, not meaning. Show the words-only message. Why: the embedding service needs a network.
- Logout clears the cached cards and the queued check-ins. Why: the next person on a shared phone must not see them.