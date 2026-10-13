---
trigger: always_on
---

Rule: Limit questions to 300 characters.Reason: Prevents abuse of the embedding service.   Rule: Replace any string of five or more digits with a placeholder word.Reason: Stops personal phone numbers or amounts from reaching external AI models.   Rule: Check questions against a medical word list before embedding.Reason: Stops the app from giving dangerous health advice.   Rule: Verify that card text includes the day, tier, or class named in the question.Reason: Prevents the app from serving a Saturday card for a Sunday question.   Rule: Use PostgreSQL full text search if the embedding service fails.Reason: Keeps the app working during vendor outages.  