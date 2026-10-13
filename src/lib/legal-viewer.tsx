'use client';

import { useState } from 'react';

const overlay: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 50,
  backgroundColor: 'var(--color-surface)',
  overflowY: 'auto',
};

const overlayInner: React.CSSProperties = {
  maxWidth: '760px',
  margin: '0 auto',
  padding: '32px 20px 96px',
  lineHeight: 1.65,
  fontSize: '15px',
};

const backBtn: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  color: 'var(--color-primary)',
  fontWeight: 600,
  fontSize: '14px',
  fontFamily: 'inherit',
};

const h2: React.CSSProperties = {
  fontSize: '19px',
  fontWeight: 700,
  color: 'var(--color-on-surface)',
  margin: '32px 0 10px',
};

const p: React.CSSProperties = {
  color: 'var(--color-on-surface-variant)',
  margin: '10px 0',
};

const ul: React.CSSProperties = {
  color: 'var(--color-on-surface-variant)',
  margin: '10px 0 10px 22px',
};

const draft: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--color-on-surface-variant)',
  backgroundColor: 'var(--color-primary-container)',
  border: '1px solid var(--color-outline-variant)',
  borderRadius: '12px',
  padding: '12px 16px',
  marginTop: '24px',
};

const title: React.CSSProperties = {
  fontSize: 'clamp(28px, 4vw, 38px)',
  fontWeight: 800,
  letterSpacing: '-1px',
  marginTop: '20px',
};

const draftNotice =
  'This notice is a draft prepared from the Spotter product requirements and has not been reviewed by a lawyer. A qualified Nigerian lawyer must confirm the wording before it is relied on.';

function PrivacyContent() {
  return (
    <>
      <h1 style={title}>Privacy Policy</h1>
      <p style={{ ...p, fontSize: '13px' }}>Last updated: [DATE]</p>

      <div style={draft}>{draftNotice}</div>

      <h2 style={h2}>1. Who we are</h2>
      <p style={p}>
        Spotter is a member app operated for <strong>[Gym legal name]</strong> (&quot;the gym&quot;, &quot;we&quot;,
        &quot;us&quot;). The app is provided to members of the gym. The gym is the data controller for the personal data
        described here. Our contact details are at the end of this notice.
      </p>
      <p style={p}>
        This notice explains what we collect in the Spotter app, why we collect it, and the rights you have under the
        laws of the Federal Republic of Nigeria, including the <strong>Nigeria Data Protection Act 2023</strong> (the
        &quot;NDPA&quot;) and the right to privacy of the person and home guaranteed by section 37 of the Constitution
        of the Federal Republic of Nigeria 1999.
      </p>

      <h2 style={h2}>2. What we collect</h2>
      <p style={p}>
        Spotter is designed to collect as little as possible. We only hold what the app needs to answer your own
        questions and to run check-in, membership and payments.
      </p>
      <ul style={ul}>
        <li>
          <strong>Membership details:</strong> your name, the member number the desk assigns you, your tier (Basic or
          Premium), and your membership expiry date.
        </li>
        <li>
          <strong>Login details:</strong> a one-time join code (stored only as a hash) and a 6-digit PIN (stored only as
          a hash). We do not use SMS or phone/email login, and we never store the PIN itself.
        </li>
        <li>
          <strong>Your private records:</strong> your check-in history, payment history, ledger entries and balance,
          renewals, staff-posted charges, and any tier changes.
        </li>
        <li>
          <strong>Questions and feedback:</strong> the text you type into the Ask box (at most 300 characters), how the
          question was routed, the card or record used, the match score, &quot;wrong or unclear&quot; reports, and taps
          on the hand-off (WhatsApp) button.
        </li>
        <li>
          <strong>Consent record:</strong> that you accepted the consent screen, the time, and the version of the wording
          you accepted.
        </li>
        <li>
          <strong>Security and usage data:</strong> login attempts (to slow down guessing), session records, and counts
          of app opens, check-ins, questions and payments. These counts are the usage figures the gym sees.
        </li>
      </ul>
      <p style={p}>
        The app never collects photos, and the only image files are the home-screen install icons. It does not ask for
        your email, your phone number, or your location.
      </p>

      <h2 style={h2}>3. How we use your data</h2>
      <ul style={ul}>
        <li>
          <strong>To answer your questions</strong> from the gym&apos;s approved typed cards and your own records only.
          A question is never answered from another member&apos;s record.
        </li>
        <li>
          <strong>To run check-in</strong> and count your attendance.
        </li>
        <li>
          <strong>To run payments</strong> for renewals and balances through our payment gateway, and to show your
          ledger and balance.
        </li>
        <li>
          <strong>To hand you to a named staff member</strong> when the records hold no answer.
        </li>
        <li>
          <strong>To keep the service secure</strong> — detecting wrong PINs, fraud, and misuse.
        </li>
        <li>
          <strong>To measure and improve the service</strong> — for example the counts and payment figures the gym
          reviews, and the weekly sample of answered questions.
        </li>
        <li>
          <strong>To meet legal duties</strong>, such as keeping financial records.
        </li>
      </ul>

      <h2 style={h2}>4. What we do not do</h2>
      <ul style={ul}>
        <li>No answer comes from the internet, and no AI writes any answer. Private answers are fixed sentences filled by plain code.</li>
        <li>We do not sell, rent or trade your personal data.</li>
        <li>We do not use your data for advertising.</li>
        <li>We do not match your question against another member&apos;s records or embed your private records.</li>
        <li>We do not hold your money. Payments are handled by the payment gateway.</li>
      </ul>

      <h2 style={h2}>5. AI and embeddings</h2>
      <p style={p}>
        The app uses an embedding service only to turn a question into a list of numbers, so a loose question can be
        matched to the right approved card. Before any question leaves the app, spaces and commas between digits are
        removed and every run of five or more digits is replaced with a placeholder, as a best-effort measure. No
        private record (such as your balance or attendance history) is ever sent to the embedding service, and the
        embedding service does not write any text you see.
      </p>

      <h2 style={h2}>6. Who we share it with</h2>
      <ul style={ul}>
        <li>
          <strong>Our payment gateway (Flutterwave).</strong> When you pay, the gateway&apos;s own hosted page collects
          your payment details. We receive only the confirmation needed to update your ledger. We do not hold your card
          details.
        </li>
        <li>
          <strong>Our embedding provider.</strong> It receives your question text after the digit redaction described
          above, and returns only a vector.
        </li>
        <li>
          <strong>Our hosting and database providers.</strong> They store the app and its database. [HOST TO BE
          CONFIRMED.]
        </li>
        <li>
          <strong>Gym staff and owner accounts.</strong> Staff can see member records as part of running the gym, and
          every staff write is logged. Owner accounts approve cards and ledger corrections.
        </li>
        <li>
          <strong>Law enforcement or regulators</strong>, where the law requires it, or to protect rights, safety and the
          security of the service.
        </li>
      </ul>
      <p style={p}>
        Some of these providers may process data outside Nigeria. Where personal data is transferred out of Nigeria, we
        rely on the safeguards and conditions set out in the NDPA, and we will make those safeguards available on
        request.
      </p>

      <h2 style={h2}>7. Our lawful bases under the NDPA</h2>
      <p style={p}>We process your personal data on these bases:</p>
      <ul style={ul}>
        <li>
          <strong>Consent</strong> — for the consent screen and for sending redacted question text to the embedding
          service. You can withdraw consent; the app then cannot answer shared questions by meaning.
        </li>
        <li>
          <strong>Performance of a contract</strong> — to provide the membership service, including check-in, payments
          and your records.
        </li>
        <li>
          <strong>Legitimate interests</strong> — to keep the service secure, prevent fraud and misuse, and measure and
          improve the service, balanced against your rights.
        </li>
        <li>
          <strong>Legal obligation</strong> — to keep financial records and to respond to lawful requests.
        </li>
      </ul>

      <h2 style={h2}>8. Your rights under Nigerian law</h2>
      <p style={p}>
        Under the NDPA you have the right to be informed, to access your personal data, to have inaccurate data
        corrected, to have data erased or blocked, to restrict or object to processing, to data portability, to withdraw
        consent, and to lodge a complaint with the <strong>Nigeria Data Protection Commission (NDPC)</strong>.
      </p>
      <p style={p}>In Spotter you can exercise these rights as follows:</p>
      <ul style={ul}>
        <li>
          <strong>Access and portability:</strong> ask the desk to export your records as a file.
        </li>
        <li>
          <strong>Correction:</strong> ask the desk; corrections to the ledger are proposed by staff and approved by an
          owner-role account, and the original line is never changed.
        </li>
        <li>
          <strong>Erasure:</strong> ask the desk to delete your records. Deletion needs owner approval. Because the law
          requires the gym to keep financial records, ledger and payment lines may be anonymised instead of deleted.
          Once your records are deleted you can no longer log in.
        </li>
        <li>
          <strong>Security and PIN:</strong> a staff reset at the desk revokes all your sessions; you can change your
          PIN or log out in the app.
        </li>
      </ul>

      <h2 style={h2}>9. How long we keep it</h2>
      <ul style={ul}>
        <li>Login attempts: deleted after 30 days.</li>
        <li>Expired or revoked sessions and expired join codes: deleted 30 days after they end.</li>
        <li>Payment confirmation payloads: deleted after 12 months; the reference that blocks a repeated confirmation is kept.</li>
        <li>Question text: blanked after 12 months; the route, card and score are kept for tuning.</li>
        <li>
          Ledger, check-in, payment and renewal rows: kept for 24 months after your last activity, then deleted or
          anonymised. (This period is a default awaiting legal confirmation; stopping payment does not start the clock.)
          Financial lines may be anonymised rather than deleted to meet record-keeping duties.
        </li>
        <li>Encrypted backups are kept for up to 30 days.</li>
      </ul>

      <h2 style={h2}>10. How we protect it</h2>
      <p style={p}>
        Your records are protected by a database that hides rows unless the query carries your own member session; join
        codes and PINs are hashed; sessions can be revoked; staff writes are logged in an audit log; and backups are
        encrypted. A simulated member cannot read another member&apos;s rows, and this is tested.
      </p>

      <h2 style={h2}>11. Children</h2>
      <p style={p}>
        Spotter is for gym members. Where a member is a minor, we handle their data in line with the NDPA and the
        gym&apos;s rules, and a parent or guardian should contact the desk to exercise the rights above.
      </p>

      <h2 style={h2}>12. If there is a data breach</h2>
      <p style={p}>
        If a breach affects your personal data, we will notify the NDPC and the people affected where the NDPA requires
        it. We will follow the reporting deadline set by the NDPA and by the gym&apos;s legal advice.
      </p>

      <h2 style={h2}>13. Changes to this notice</h2>
      <p style={p}>
        We may update this notice. When we do, we change the date at the top, and material changes will be shown to
        members in the app.
      </p>

      <h2 style={h2}>14. Contact</h2>
      <p style={p}>
        Data controller: <strong>[Gym legal name]</strong>, <strong>[address]</strong>.
        <br />
        Data Protection Officer / privacy contact: <strong>[name]</strong>, <strong>[email]</strong>,{' '}
        <strong>[phone]</strong>.
        <br />
        You also have the right to complain to the Nigeria Data Protection Commission (NDPC).
      </p>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <h1 style={title}>Terms of Service</h1>
      <p style={{ ...p, fontSize: '13px' }}>Last updated: [DATE]</p>

      <div style={draft}>{draftNotice}</div>

      <h2 style={h2}>1. These terms</h2>
      <p style={p}>
        These terms govern your use of the Spotter member app operated for <strong>[Gym legal name]</strong>{' '}
        (&quot;the gym&quot;, &quot;we&quot;, &quot;us&quot;). By using Spotter you agree to these terms. If you do not
        agree, do not use the app.
      </p>

      <h2 style={h2}>2. Who can use it</h2>
      <p style={p}>
        Spotter is for current members of the gym and is created for you by gym staff at the desk. You need the member
        number and join code the desk gives you, then you set a 6-digit PIN. The app is your choice; the desk remains
        available to members who prefer it.
      </p>

      <h2 style={h2}>3. What the service does</h2>
      <ul style={ul}>
        <li>
          <strong>Answers from records only.</strong> Spotter answers from the gym&apos;s owner-approved typed cards and
          your own records. It never answers from the internet, and no AI writes the text you see.
        </li>
        <li>
          <strong>It will say it does not know.</strong> When no approved card or record answers your question, the app
          says so and shows a named staff member. It never guesses.
        </li>
        <li>
          <strong>Some questions are refused.</strong> For your safety, questions about injury, pregnancy, supplements,
          diet, weight loss and medication, and requests for refunds, discounts, waivers or disputes, are refused and
          handed to staff.
        </li>
        <li>
          <strong>No professional advice.</strong> Spotter does not give medical, legal, financial or training advice.
          Cards describe gym rules, prices, timetables and policies only.
        </li>
        <li>
          <strong>Check-in and payments.</strong> You can check in with the code of the day (one check-in per day) and
          pay a renewal or balance through the payment gateway.
        </li>
      </ul>

      <h2 style={h2}>4. Your account and security</h2>
      <ul style={ul}>
        <li>Keep your PIN secret. You are responsible for activity under your login.</li>
        <li>The join code is single-use and expires. It is stored only as a hash.</li>
        <li>A session lasts up to 90 days and can be revoked. Logging out clears cached cards and any queued check-ins on the phone.</li>
        <li>If you lose your phone or forget your PIN, ask the desk. A staff reset revokes all your sessions; the app has no SMS or email recovery.</li>
      </ul>

      <h2 style={h2}>5. Acceptable use</h2>
      <ul style={ul}>
        <li>Do not share your login, PIN or the daily check-in code, or use the app to check in for someone else.</li>
        <li>Do not try to access another member&apos;s records, or interfere with, disrupt or probe the app or its database.</li>
        <li>Do not use the app for anything unlawful.</li>
      </ul>

      <h2 style={h2}>6. Payments</h2>
      <ul style={ul}>
        <li>The server sets the amount (the renewal price for your tier, or your balance). The phone cannot change it.</li>
        <li>Payments are processed by our payment gateway through its own hosted page. Spotter never holds your money.</li>
        <li>Each payment has a unique reference. Your balance changes only when the gateway confirms the payment, and a repeated confirmation changes nothing.</li>
        <li>A renewal writes the charge and the payment together, so a renewal leaves your balance as it was.</li>
        <li>Refunds are not handled in the app. Refund and dispute requests go to the desk.</li>
      </ul>

      <h2 style={h2}>7. Membership and access states</h2>
      <p style={p}>
        Your access is set by your expiry date. While you are active or within the grace period, you can check in and
        see what your tier allows. After the grace period your membership is lapsed: you can see prices, terms, your own
        records and the pay button, but you cannot check in. A Premium member loses plan cards when Premium expires.
        Your private history is never deleted just because you stopped paying.
      </p>

      <h2 style={h2}>8. Intellectual property</h2>
      <p style={p}>
        The app, its design and the gym&apos;s approved card text belong to the gym and its licensors. These terms do
        not grant you any rights in them beyond using the app as a member.
      </p>

      <h2 style={h2}>9. Availability and changes</h2>
      <p style={p}>
        We aim to keep Spotter available, but it may be unavailable during maintenance, outages or when a third-party
        service such as the payment gateway or the embedding service is down. When the embedding service is
        unavailable, the app falls back to searching cards by words. We may change or withdraw features.
      </p>

      <h2 style={h2}>10. Disclaimers</h2>
      <p style={p}>
        The app is provided on an &quot;as is&quot; and &quot;as available&quot; basis. To the extent permitted by
        Nigerian law, the gym makes no warranty that the app will be uninterrupted, error-free, or that every record is
        up to date. Card answers show the date they were last confirmed; when that date is old, the app says so.
      </p>

      <h2 style={h2}>11. Limitation of liability</h2>
      <p style={p}>
        To the extent permitted by Nigerian law, the gym is not liable for indirect or consequential losses arising from
        your use of the app. Nothing in these terms limits any liability that cannot be limited by law, or your rights
        under the Nigeria Data Protection Act 2023 or other applicable law.
      </p>

      <h2 style={h2}>12. Suspension and termination</h2>
      <p style={p}>
        We may suspend or end your access if you break these terms, if the gym or the law requires it, or if your
        membership ends. Your private records are handled as described in the Privacy Policy.
      </p>

      <h2 style={h2}>13. Governing law</h2>
      <p style={p}>
        These terms are governed by the laws of the Federal Republic of Nigeria, and the courts of Nigeria have
        jurisdiction over any dispute, without affecting any right you have to complain to a regulator.
      </p>

      <h2 style={h2}>14. Changes to these terms</h2>
      <p style={p}>
        We may update these terms. When we do, we change the date at the top, and material changes will be shown to
        members in the app.
      </p>

      <h2 style={h2}>15. Contact</h2>
      <p style={p}>
        <strong>[Gym legal name]</strong>
        <br />
        <strong>[address]</strong>
        <br />
        <strong>[email]</strong> — <strong>[phone]</strong>
      </p>
    </>
  );
}

function legalLinkStyle(linkStyle?: React.CSSProperties): React.CSSProperties {
  return {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    font: 'inherit',
    textDecoration: 'none',
    ...linkStyle,
  };
}

export function LegalViewer({ linkStyle }: { linkStyle?: React.CSSProperties }) {
  const [open, setOpen] = useState<null | 'privacy' | 'terms'>(null);

  return (
    <>
      <button type="button" className="legal-link" onClick={() => setOpen('privacy')} style={legalLinkStyle(linkStyle)}>
        Privacy Policy
      </button>
      <button type="button" className="legal-link" onClick={() => setOpen('terms')} style={legalLinkStyle(linkStyle)}>
        Terms of Service
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
          style={overlay}
        >
          <div style={overlayInner}>
            <button type="button" onClick={() => setOpen(null)} style={backBtn}>
              Back to Spotter
            </button>
            {open === 'privacy' ? <PrivacyContent /> : <TermsContent />}
          </div>
        </div>
      )}
    </>
  );
}
