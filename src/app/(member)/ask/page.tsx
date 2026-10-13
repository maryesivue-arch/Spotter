import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ask the Gym',
  description: 'Verified gym member app',
};

export default function AskGymPage() {
  return (
    <div className="marketing-hero" style={{ minHeight: '100dvh', padding: '24px 16px' }}>
      <header className="max-w-content" style={{ width: '100%', marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--color-surface-container-lowest)',
          padding: '12px 20px',
          borderRadius: '9999px',
          border: '1px solid var(--color-outline-variant)',
        }}>
          <Link href="/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 600, fontSize: '14px' }}>
            ← Back to Home
          </Link>
          <span className="badge badge-primary">
            💬 Ask the Gym
          </span>
        </div>
      </header>

      <main className="max-w-content" style={{ width: '100%', flex: 1, maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
            Ask the Gym
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: 1.5 }}>
            Answers come only from approved typed cards with confirmed dates. No answer comes from the internet and zero AI writes any text.
          </p>
        </div>

        <div className="spotter-card" style={{ marginBottom: '20px' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label htmlFor="question" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
                Type your question:
              </label>
              <textarea
                id="question"
                name="question"
                maxLength={300}
                rows={3}
                placeholder="e.g. What are Saturday opening hours? Are there spinning classes?"
                className="form-input"
                style={{ resize: 'none', lineHeight: 1.5 }}
              />
              <span style={{ display: 'block', fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '4px', textAlign: 'right' }}>
                Maximum 300 characters
              </span>
            </div>

            <button type="button" className="btn btn-primary" style={{ width: '100%' }}>
              Find Approved Card 🔍
            </button>
          </form>
        </div>

        {/* Notice of Gated Cards & Fallback */}
        <div className="spotter-card" style={{ backgroundColor: 'var(--color-surface-container-low)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
            How Answers Work
          </h3>
          <ul style={{ paddingLeft: '20px', fontSize: '13px', color: 'var(--color-on-surface-variant)', lineHeight: 1.6 }}>
            <li>Only approved typed cards are shown, with the date staff last confirmed them.</li>
            <li>If the question specifies a day or tier, cards must match that term.</li>
            <li>For medical, injury, or personal requests, the app will hand you directly to named desk staff.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
