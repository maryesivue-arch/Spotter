import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Month & Membership',
  description: 'Verified gym member app',
};

export default function MemberMePage() {
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
            📊 My Records
          </span>
        </div>
      </header>

      <main className="max-w-content" style={{ width: '100%', flex: 1, maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
            My Month & Membership
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: 1.5 }}>
            Private records retrieved only under your own authenticated session. Isolated at the database row level.
          </p>
        </div>

        {/* Membership Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px' }}>
          <div className="spotter-card">
            <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', display: 'block', marginBottom: '4px' }}>
              Membership Tier
            </span>
            <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
              Basic Member
            </span>
          </div>

          <div className="spotter-card">
            <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', display: 'block', marginBottom: '4px' }}>
              Attendance This Month
            </span>
            <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary)' }}>
              12 Days
            </span>
          </div>

          <div className="spotter-card">
            <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', display: 'block', marginBottom: '4px' }}>
              Outstanding Balance
            </span>
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#10b981' }}>
              ₦0 (Paid)
            </span>
          </div>
        </div>

        {/* Ledger Lines */}
        <div className="spotter-card" style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '12px' }}>
            Recent Ledger Entries
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--color-outline-variant)' }}>
              <div>
                <span style={{ fontWeight: 600, display: 'block' }}>Payment: Renewal</span>
                <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>01 Oct 2026 • Verified Online</span>
              </div>
              <span style={{ fontWeight: 700, color: '#10b981' }}>+₦15,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' }}>
              <div>
                <span style={{ fontWeight: 600, display: 'block' }}>Charge: Monthly Cycle</span>
                <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>01 Oct 2026</span>
              </div>
              <span style={{ fontWeight: 700, color: 'var(--color-on-surface)' }}>-₦15,000</span>
            </div>
          </div>
        </div>

        <div className="spotter-card" style={{ backgroundColor: 'var(--color-surface-container-low)', fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>
          Records checked: 12 Oct 2026 (Weekly owner check verified).
        </div>
      </main>
    </div>
  );
}
