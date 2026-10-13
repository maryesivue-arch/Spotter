import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Desk Staff Portal',
  description: 'Verified gym member app',
};

export default function StaffPortalPage() {
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
              Spotter Staff Desk
            </span>
          </Link>

          <Link href="/login" className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '13px' }}>
            Staff Login
          </Link>
        </div>
      </header>

      <main className="max-w-content" style={{ width: '100%', flex: 1 }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
            Desk Staff Operations
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--color-on-surface-variant)' }}>
            Daily desk actions: add members, log manual payments, inspect pending transactions, and print check-in codes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <Link href="/staff/members" className="spotter-card spotter-card-interactive" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>👥</div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '4px' }}>
              Members & Join Codes
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              Add a new member, find records, and create single-use join codes.
            </p>
          </Link>

          <Link href="/staff/cash" className="spotter-card spotter-card-interactive" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>💵</div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '4px' }}>
              Manual Payment Entry
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              Record cash, bank transfer, or POS payments with receipt references.
            </p>
          </Link>

          <Link href="/staff/cards" className="spotter-card spotter-card-interactive" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>📋</div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '4px' }}>
              Shared Cards
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              Draft or edit approved gym cards for timetables, rules, and prices.
            </p>
          </Link>

          <Link href="/staff/pending" className="spotter-card spotter-card-interactive" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '4px' }}>
              Pending Payments
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              Inspect gateway transactions awaiting webhook confirmation.
            </p>
          </Link>

          <Link href="/staff/today-code" className="spotter-card spotter-card-interactive" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🖨️</div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '4px' }}>
              Today&apos;s Check-in Code
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              Print or display the 5-digit code of the day for members at the desk.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
