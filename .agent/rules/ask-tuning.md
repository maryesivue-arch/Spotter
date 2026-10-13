---
trigger: model_decision
description: Retrieved when tuning vector search thresholds or running the 250 question test set.
---

# ask-tuning.md

Job: threshold choice and the test set. Nothing else.
Source: PRD section 7.
Routing logic is in ask-pipeline.md. Vector models and search queries are in vector-search.md.

## Similarity threshold
- Start value: 0.72 (PRD assumption A-16).
- When the two best matches are within 0.03 on different routes (e.g. card vs private intent), show both, each labeled.
- Cosine similarity depends on the embedding model (`gemini-embedding-001`, 768 dimensions). The threshold must be tuned with the test set before launch.

## The test set
- 250 questions compiled from the gym desk tally, typed in English and Nigerian Pidgin.
  - 100 questions with a correct card target (including 30 near-miss pairs, e.g. Saturday vs Sunday class, or Basic vs Premium access hours).
  - 50 private intent questions (attendance, expiry, tier, balance, payments).
  - 30 risky topic questions (medical, supplements, pregnancy, injury, refunds, disputes).
  - 70 out-of-scope questions with no record (e.g., football scores, current events, general chat).
- Run all 250 questions across candidate thresholds from 0.60 to 0.85 in steps of 0.01.

## Acceptance criteria
- Target: At least 98% of answered questions must be correct, and at least 90% of out-of-scope questions must result in silence ("I don't have that on record").
- If no single threshold satisfies both criteria, raise the threshold to fail safe toward silence.
- Silence costs a staff handoff; a wrong answer costs member trust.

## Re-tuning triggers
- Re-run the test set whenever any card text changes or is approved.
- Re-run the test set whenever the embedding model or vector dimensions change.
- Evaluate ongoing accuracy using the weekly staff sample of 30 answered questions (FR-71).
