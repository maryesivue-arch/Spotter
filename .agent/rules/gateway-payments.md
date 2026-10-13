---
trigger: always_on
---

# gateway-payments.md

Job: how a member's online payment is started and settled.
Source: PRD 6E and 8. [ADDED] marks a rule beyond the PRD.
Code goes in `src/server/pay` (initialize, settlePayment, verify). Tests go in `tests/pay`. Ledger lines are in ledger.md. Money units are in dates-and-money.md.

## Starting a payment
- The server sets the amount: the renewal price for the member's tier, or the member's balance. Ignore any amount sent by the phone. Why: the phone can be tampered with.
- A balance payment can be any amount from the minimum up to the balance. The minimum is a setting. The PRD assumes ₦1,000 (A-10). Why: tiny payments cost more in fees than they collect.
- The server creates a unique reference before it starts the gateway transaction. Statuses: pending, success, failed, abandoned. Why: the reference links the gateway's event to our record.
- Only one pending payment per member per purpose. Tapping Pay again returns the same payment. Why: it stops double charges.
- A pending payment becomes abandoned when the gateway says so, or when it is 30 minutes old and unpaid. A late success on an abandoned payment still settles. [PRD: A-37] Why: a closed checkout page must not block a retry.
- Apply the 30-minute change when the payment is read or when the member starts a new one. Add no scheduled job. [ADDED] Why: the PRD allows one daily job (FR-70), which is too slow. Confirm this.
- Until the gateway confirms, the member sees "pending" with the reference, and the balance does not change. Why: the money is not proven until the gateway says so.

## Confirming a payment (any gateway)
- Authenticate each notice before reading it, using the compare rule in security.md. Reject an unauthenticated notice and change nothing. Why: anyone can post to a public route.
- Store each event in `WebhookEvent` under a unique `eventKey`. A repeated event gets a success reply and stops. Why: gateways resend notices.
- Only a success event changes money. Store all other events and ignore them. Why: other events carry no proof of payment.
- Reply to the gateway as soon as the event is stored. Why: a slow reply makes the gateway resend.
- One function, `settlePayment(reference)`, settles a payment inside a transaction that locks the payment row. The notice, the member's return to the app and the check at app open all call it. Why: two paths must never both credit.
- Inside that function:
  - If the payment is already success, stop. An abandoned payment may become success. Why: repeats must change nothing.
  - If the amount or currency differs from our record, mark it failed, set `flagged` and stop. Why: a mismatch means tampering or a bug.
  - Otherwise write the lines. For a renewal: the charge, then the payment (its payment id is unique), then a renewal record with the new expiry and days late. For a balance payment: one payment line. Then mark success. Why: a unique payment id stops a second credit.
  - If the member has paid the same renewal period twice, record the second as a payment and set `flagged` as an overpayment. Why: the member's money is never lost, and staff decide what to do.
- A renewal extends expiry by the renewal length, counted from the later of the old expiry and the payment date. The length is a setting, which the PRD assumes is 30 days (A-9, Q-7). Why: renewing early loses no days, and renewing late does not backdate.
- Ignore a failure notice that arrives after success. Why: order is not guaranteed.
- Keep a notice with an unknown reference and show it on the owner reconcile screen. Why: it may be a real payment we lost track of.
- At app open, ask the gateway for the status of the member's pending payments, and set `lastCheckedAt`. Why: a notice can be missed, and the timestamp stops repeat calls.

## Open points
- Balance paid above the balance: if staff post a payment while a gateway payment is pending, the member can overpay a balance. The PRD only covers a renewal paid twice. Record the payment, set `flagged`, and ask.

## Flutterwave details not in the PRD: [HUMAN TO FILL]
- How a notice is authenticated, and which header carries it
- Event names
- The call that checks a payment's status
- Reference format limits
- Checkout method (the page weight rule is in phone-and-cache.md)
- The call that lists payouts, for the reconcile screen
- Test mode details
- Who pays the fee (Q-6 recommends the member)
- Amount units: confirm whether Flutterwave counts kobo or naira (see dates-and-money.md)

For reference only, the PRD states these for Paystack: an HMAC SHA512 signature of the raw body, a signature header, a `charge.success` event, and redirect checkout. Do not copy them for Flutterwave.