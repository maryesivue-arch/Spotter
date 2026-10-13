import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Staff — Pending Payments',
  description: 'Verified gym member app',
};

export default function StaffPendingPage() {
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
          <span className="badge badge-primary">Pending Payments</span>
        </div>
      </header>

      <main className="max-w-content" style={{ width: '100%', flex: 1, maxWidth: '640px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
          Pending Payments List
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', marginBottom: '20px' }}>
          Online gateway transactions started and awaiting settlement notification.
        </p>

        <div className="spotter-card" style={{ textAlign: 'center', padding: '36px 20px' }}>
          <span style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>⏳</span>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '4px' }}>
            No Pending Transactions
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
            All initialized gateway payments have settled or expired past 30 minutes.
          </p>
        </div>
      </main>
    </div>
  );
}
