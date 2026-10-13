import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pay Membership',
  description: 'Verified gym member app',
};

export default function PayPage() {
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
            💳 Pay Membership
          </span>
        </div>
      </header>

      <main className="max-w-content" style={{ width: '100%', flex: 1, maxWidth: '520px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
            Membership Payment
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: 1.5 }}>
            Amounts are set by the server in whole kobo. Spotter never stores cards or handles your money directly.
          </p>
        </div>

        <div className="spotter-card" style={{ marginBottom: '20px' }}>
          <div style={{ borderBottom: '1px solid var(--color-outline-variant)', paddingBottom: '16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', display: 'block', marginBottom: '4px' }}>
              Renewal Due:
            </span>
            <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-primary)' }}>
              ₦15,000
            </span>
            <span style={{ display: 'block', fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '2px' }}>
              Standard 30-day renewal cycle
            </span>
          </div>

          <button type="button" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '16px' }}>
            Proceed to Gateway Checkout →
          </button>
        </div>

        <div className="spotter-card" style={{ backgroundColor: 'var(--color-surface-container-low)', fontSize: '13px', color: 'var(--color-on-surface-variant)', lineHeight: 1.5 }}>
          🔒 Checkout redirects to the licensed payment gateway. Your membership balance updates automatically once the gateway confirms payment.
        </div>
      </main>
    </div>
  );
}
