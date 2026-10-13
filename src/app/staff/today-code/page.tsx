'use client';

import Link from 'next/link';
import { getLagosDate } from '@/lib/dates';

export default function StaffTodayCodePage() {
  const todayLagos = getLagosDate();

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
          <span className="badge badge-primary">Front Desk Print Sheet</span>
        </div>
      </header>

      <main className="max-w-content" style={{ width: '100%', flex: 1, maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
        <div className="spotter-card" style={{ padding: '40px 24px' }}>
          <span className="badge badge-neutral" style={{ marginBottom: '16px' }}>
            Lagos Date: {todayLagos}
          </span>

          <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-on-surface-variant)', marginBottom: '8px' }}>
            Check-in Code of the Day
          </h1>

          <div style={{
            fontSize: '54px',
            fontWeight: 800,
            letterSpacing: '12px',
            color: 'var(--color-primary)',
            padding: '24px',
            backgroundColor: 'var(--color-surface-container-high)',
            borderRadius: '16px',
            margin: '20px 0',
            fontFamily: 'monospace',
          }}>
            84920
          </div>

          <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginBottom: '20px' }}>
            Display this 5-digit code on the desk stand. Code updates every Lagos day at 4:00 AM.
          </p>

          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={() => window.print()}
          >
            Print Front Desk Sheet 🖨️
          </button>
        </div>
      </main>
    </div>
  );
}
