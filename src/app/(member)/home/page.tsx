import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Verified gym member app',
};

export default function MemberHomePage() {
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
          boxShadow: 'var(--effect-soft-shadow)',
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
              fontSize: '18px',
            }}>
              S
            </div>
            <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-on-surface)' }}>
              Spotter
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-primary">
              Member App
            </span>
            <Link href="/login" className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '13px' }}>
              Switch Account
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-content" style={{ width: '100%', flex: 1 }}>
        <div style={{ marginBottom: '28px' }}>
          <div className="badge badge-neutral" style={{ marginBottom: '10px' }}>
            📍 Lagos Gym • Operating on Lagos Time
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '6px', letterSpacing: '-0.5px' }}>
            Welcome to Spotter
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--color-on-surface-variant)', lineHeight: 1.5 }}>
            Access approved gym cards, record check-ins, view your attendance ledger, and verify payments.
          </p>
        </div>

        {/* Core Member Action Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}>
          {/* 1. Daily Check-in */}
          <Link href="/checkin" style={{ textDecoration: 'none' }} className="spotter-card spotter-card-interactive">
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-secondary-container)',
              color: 'var(--color-on-secondary-container)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              marginBottom: '14px',
            }}>
              ⏱️
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
              Daily Check-in
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: 1.4 }}>
              Enter the 5-digit code of the day. Offline check-ins queue automatically.
            </p>
          </Link>

          {/* 2. Ask the Gym */}
          <Link href="/ask" style={{ textDecoration: 'none' }} className="spotter-card spotter-card-interactive">
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-primary-container)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              marginBottom: '14px',
            }}>
              💬
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
              Ask the Gym
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: 1.4 }}>
              Timetables, rules, and prices answered only from approved typed cards.
            </p>
          </Link>

          {/* 3. My Month & Membership */}
          <Link href="/me" style={{ textDecoration: 'none' }} className="spotter-card spotter-card-interactive">
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-surface-container-high)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              marginBottom: '14px',
            }}>
              📊
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
              My Month & Records
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: 1.4 }}>
              Attendance history, tier status, expiry date, and verified ledger balance.
            </p>
          </Link>

          {/* 4. Pay Renewal or Balance */}
          <Link href="/pay" style={{ textDecoration: 'none' }} className="spotter-card spotter-card-interactive">
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-primary-container)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              marginBottom: '14px',
            }}>
              💳
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
              Pay Membership
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: 1.4 }}>
              Pay renewal or outstanding balance securely through the payment gateway.
            </p>
          </Link>
        </div>

        {/* Fallback Person Section */}
        <div className="spotter-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '4px' }}>
              Need personal assistance?
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
              When records hold no answer, speak directly with named desk staff on WhatsApp.
            </p>
          </div>
          <a
            href="https://wa.me/2348000000000?text=Hello%20Spotter%20Desk%20Staff"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ fontSize: '14px', padding: '10px 20px' }}
          >
            Chat with Desk Staff 💬
          </a>
        </div>
      </main>
    </div>
  );
}
