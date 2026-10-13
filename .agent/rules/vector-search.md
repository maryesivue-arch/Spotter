---
trigger: model_decision
description: Retrieved when implementing pgvector queries, cosine distance sorting, or exact search fallback limits.
---

# vector-search.md

Job: the vector side of the database and how it is searched.
Source: PRD sections 9 and 10.
Routing decisions are in ask-pipeline.md. Re-embedding runs from `scripts/reembed.ts`.

## What is embedded
- Three kinds of text only: the body of an approved card, the sample questions of a card, and the example phrases for private intents and risky topics. All are public text with no member data. Why: vectors cannot be access-controlled per member.
- **Private records are never embedded and never searched by meaning.** The design makes it impossible:
  - The only vector column is `SearchVector.embedding`.
  - `SearchVector` links only to `SharedCard` and `IntentExample`. A database check requires exactly one of them.
  - The embedding function accepts only a card input and an example input. A private row does not fit them.
  - A test fails if a vector column appears in any other table.

## Embedding
- Read the model name and size from the settings record (`embeddingModel`, `embeddingDims`). The PRD defaults are `gemini-embedding-001` and 768. Why: a model change then needs no code change.
- Normalise each vector to length 1 in code. Why: scores from different texts then compare fairly.
- Use one task type for every text: cards, sample questions, examples and typed questions. The PRD names it "semantic similarity". Confirm the exact API string (expected `SEMANTIC_SIMILARITY`) in the embedding docs. Why: scores from different task types are not on the same scale, so one threshold would mean two things.
- Free limits as the PRD reports them from one secondary source: 100 requests a minute, 30,000 tokens a minute, 1,000 requests a day (A-12). Verify them on launch day.

## Prisma and the vector column
- Declare it as `Unsupported("vector(768)")`. Prisma cannot read or write it, so every insert and similarity query uses raw SQL (`$queryRaw`, `$executeRaw`) with parameters. The relations to `SharedCard` and `IntentExample` still work.
- The PRD schema enables the extension with `extensions = [vector]` and the `postgresqlExtensions` preview feature. This is written for Prisma 6.

## When vectors are made
- Approving a card embeds its body and each sample question in the same request. If the embedding service fails, the card is still approved and marked `needsEmbedding`. Word search finds it until it is embedded. Why: a timetable change must never wait for an outside service.
- A new approved version archives the old one. Its vectors are removed by cascade. Why: old text must not match.
- Every vector row stores its model and size. Queries compare only rows with the current model name. If the model or size changes, the human runs `scripts/reembed.ts`. Why: vectors from two models cannot be compared.
- Embed intent and risky examples once, from the seed script. Why: they change rarely.

## Searching
- Search only approved cards. Return overdue cards with a flag for the review date. Why: a draft must never answer a member.
- No vector index in version one. About 400 vectors are scanned exactly. Add an HNSW index (cosine) only past roughly 10,000 rows, and ask first. Why: an approximate index gains no speed here and can miss the true nearest match.
- The card fetch query applies the tier rule (access-states-and-tiers.md). The body is null when the member may not see it. The title still returns. A Basic member sees the title of a Premium card, never its text. The PRD accepts this. Why: the screen needs a title for the Premium message.

Router query (`$1` question vector, `$2` current model name). This is the PRD query.

```sql
SELECT sv.kind, sv."cardId", ie.intent, ie.kind AS example_kind,
       1 - (sv.embedding <=> $1::vector) AS score
FROM "SearchVector" sv
LEFT JOIN "SharedCard" c ON c.id = sv."cardId"
LEFT JOIN "IntentExample" ie ON ie.id = sv."intentExampleId"
WHERE sv.model = $2
  AND (c.id IS NULL OR c.status = 'APPROVED')
ORDER BY sv.embedding <=> $1::vector
LIMIT 5;
```

Proposed router query (use only after the human approves). It collapses to the best row per target before the limit. Untested. Why: the PRD query can return five rows of one card, which hides a close private intent from the tie check.

```sql
SELECT * FROM (
  SELECT DISTINCT ON (target) *
  FROM (
    SELECT sv.kind, sv."cardId", ie.intent, ie.kind AS example_kind,
           COALESCE(sv."cardId", ie.intent::text || ':' || ie.kind::text) AS target,
           1 - (sv.embedding <=> $1::vector) AS score
    FROM "SearchVector" sv
    LEFT JOIN "SharedCard" c ON c.id = sv."cardId"
    LEFT JOIN "IntentExample" ie ON ie.id = sv."intentExampleId"
    WHERE sv.model = $2
      AND (c.id IS NULL OR c.status = 'APPROVED')
  ) s
  ORDER BY target, score DESC
) best
ORDER BY score DESC
LIMIT 5;
```

Card fetch (`$3` tiers the member may see, `$4` true when not lapsed):

```sql
WITH scored AS (
  SELECT c.id AS card_id, c.title, c.category, c."tierRequired",
         c."confirmedOn", c."reviewBy",
         CASE WHEN c."tierRequired" = ANY($3::"Tier"[])
                   AND ($4 OR c."visibleWhenLapsed")
              THEN c.body END AS body,
         1 - (sv.embedding <=> $1::vector) AS score
  FROM "SearchVector" sv
  JOIN "SharedCard" c ON c.id = sv."cardId"
  WHERE c.status = 'APPROVED' AND sv.model = $2
)
SELECT * FROM (
  SELECT DISTINCT ON (card_id) *
  FROM scored
  ORDER BY card_id, score DESC
) best
ORDER BY score DESC
LIMIT 3;
```

Insert (card body; example rows use `"intentExampleId"` instead of `"cardId"`; `$5` model and `$6` size come from settings):

```sql
INSERT INTO "SearchVector"
  (id, kind, "cardId", "sourceText", model, dims, embedding)
VALUES ($1, 'CARD_BODY', $2, $3, $5, $6, $4::vector);
```

Word search index, for the words-only fallback:

```sql
CREATE INDEX shared_card_fts ON "SharedCard"
  USING gin (to_tsvector('simple', title || ' ' || body));
```

## Tests
- Write the router query and the card fetch as integration tests on seeded data. The human runs them. Why: the parameter casts have never been run.

## Open point
- The PRD says an owner "retry" re-embeds a card marked `needsEmbedding`, but not how the retry starts. Ask.