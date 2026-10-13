import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Check In',
  description: 'Verified gym member app',
};

export default function CheckInPage() {
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
            ⏱️ Daily Check-in
          </span>
        </div>
      </header>

      <main className="max-w-content" style={{ width: '100%', flex: 1, maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
            Daily Check-in
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: 1.5 }}>
            Type the 5-digit code displayed at the front desk. One check-in per member per Lagos day.
          </p>
        </div>

        <div className="spotter-card" style={{ marginBottom: '20px' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label htmlFor="code" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
                Code of the Day:
              </label>
              <input
                id="code"
                name="code"
                type="text"
                pattern="[0-9]*"
                maxLength={5}
                placeholder="•••••"
                className="form-input"
                style={{ textAlign: 'center', fontSize: '28px', letterSpacing: '8px', fontWeight: 700 }}
              />
            </div>

            <button type="button" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
              Confirm Check-in ⏱️
            </button>
          </form>
        </div>

        <div className="spotter-card" style={{ backgroundColor: 'var(--color-surface-container-low)', textAlign: 'center', padding: '16px' }}>
          <span style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
            📶 Weak signal? Check-ins made offline are automatically saved on your phone and sent safely upon reconnect.
          </span>
        </div>
      </main>
    </div>
  );
}
