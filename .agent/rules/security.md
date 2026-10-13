---
trigger: always_on
---

Rule: Validate the HTTP Origin header on every POST route.Reason: Blocks cross site request forgery attacks.   Rule: Set all cookies to HttpOnly and SameSite Lax.Reason: Protects session tokens from malicious scripts.   Rule: Use a timing safe compare function for signatures.Reason: Stops attackers from guessing hashes by measuring response times.   Rule: Apply rate limiting to all public routes.Reason: Prevents abuse and protects server resources. 