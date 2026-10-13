import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Owner — Weekly Cash Check',
  description: 'Verified gym member app',
};

export default function OwnerCashCheckPage() {
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
          <span className="badge badge-primary">Weekly Audit</span>
        </div>
      </header>

      <main className="max-w-content" style={{ width: '100%', flex: 1, maxWidth: '640px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
          Weekly Cash, Transfer & POS Check
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', marginBottom: '20px' }}>
          Compare weekly totals per payment method with the immutable ledger. Sets the &apos;Records Checked&apos; date.
        </p>

        <div className="spotter-card" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--color-outline-variant)' }}>
              <span style={{ fontWeight: 600 }}>Cash Drawer Total</span>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>₦0</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--color-outline-variant)' }}>
              <span style={{ fontWeight: 600 }}>Bank Transfer Total</span>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>₦0</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 600 }}>POS Terminal Total</span>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>₦0</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
