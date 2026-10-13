import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Owner — Usage Counts',
  description: 'Verified gym member app',
};

export default function OwnerUsagePage() {
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
          <Link href="/owner" style={{ textDecoration: 'none', color: 'var(--color-primary)', fontWeight: 600, fontSize: '14px' }}>
            ← Back to Owner Desk
          </Link>
          <span className="badge badge-primary">FR-54 Usage</span>
        </div>
      </header>

      <main className="max-w-content" style={{ width: '100%', flex: 1, maxWidth: '640px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
          Gym Usage Metrics (FR-54)
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', marginBottom: '20px' }}>
          Strictly the usage items authorized by PRD requirement FR-54. No third-party analytics or invasive tracking.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          <div className="spotter-card">
            <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', display: 'block', marginBottom: '4px' }}>
              Active Members
            </span>
            <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-primary)' }}>
              1
            </span>
          </div>

          <div className="spotter-card">
            <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', display: 'block', marginBottom: '4px' }}>
              Today&apos;s Check-ins
            </span>
            <span style={{ fontSize: '24px', fontWeight: 700, color: '#10b981' }}>
              0
            </span>
          </div>

          <div className="spotter-card">
            <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', display: 'block', marginBottom: '4px' }}>
              Questions Asked
            </span>
            <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
              0
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
