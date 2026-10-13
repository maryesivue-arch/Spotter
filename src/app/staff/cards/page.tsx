import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Staff — Shared Cards',
  description: 'Verified gym member app',
};

export default function StaffCardsPage() {
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
          <Link href="/staff" style={{ textDecoration: 'none', color: 'var(--color-primary)', fontWeight: 600, fontSize: '14px' }}>
            ← Back to Staff Desk
          </Link>
          <span className="badge badge-primary">Shared Cards</span>
        </div>
      </header>

      <main className="max-w-content" style={{ width: '100%', flex: 1, maxWidth: '640px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
          Draft Shared Cards
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', marginBottom: '20px' }}>
          Draft or edit short typed cards. Changes stay in draft until an owner approves them.
        </p>

        <div className="spotter-card">
          <form style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label htmlFor="cardTitle" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Card Title:
              </label>
              <input id="cardTitle" type="text" placeholder="e.g. Weekend Access Hours" className="form-input" />
            </div>

            <div>
              <label htmlFor="cardBody" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Card Content:
              </label>
              <textarea id="cardBody" rows={4} placeholder="Type exact approved gym info..." className="form-input" style={{ resize: 'none' }} />
            </div>

            <button type="button" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>
              Submit for Owner Approval 📋
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
