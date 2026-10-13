import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Owner Portal',
  description: 'Verified gym member app',
};

export default function OwnerPortalPage() {
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
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
            }}>
              S
            </div>
            <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-on-surface)' }}>
              Spotter Owner Desk
            </span>
          </Link>

          <Link href="/login" className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '13px' }}>
            Owner Login
          </Link>
        </div>
      </header>

      <main className="max-w-content" style={{ width: '100%', flex: 1 }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
            Gym Owner Dashboard
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--color-on-surface-variant)' }}>
            Authoritative owner controls: card approvals, ledger correction approvals, and financial reconciliations.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <Link href="/owner/approvals" className="spotter-card spotter-card-interactive" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚖️</div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '4px' }}>
              Pending Approvals
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              Approve or reject shared cards and proposed ledger corrections.
            </p>
          </Link>

          <Link href="/owner/cash-check" className="spotter-card spotter-card-interactive" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔍</div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '4px' }}>
              Weekly Cash Check
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              Compare cash, bank transfer, and POS weekly totals with the ledger.
            </p>
          </Link>

          <Link href="/owner/reconcile" className="spotter-card spotter-card-interactive" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🏦</div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '4px' }}>
              Gateway Reconcile
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              Reconcile Flutterwave / payment gateway payouts against ledger payments.
            </p>
          </Link>

          <Link href="/owner/reports" className="spotter-card spotter-card-interactive" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>📈</div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '4px' }}>
              Reports & Quality
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              Inspect member wrong-answer reports and unanswered questions.
            </p>
          </Link>

          <Link href="/owner/usage" className="spotter-card spotter-card-interactive" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>📊</div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '4px' }}>
              Usage Counts
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              Check-in volume, active member counts, and card query statistics (FR-54).
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
