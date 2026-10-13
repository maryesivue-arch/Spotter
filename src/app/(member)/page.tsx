import Link from 'next/link';

export default function MarketingPage() {
  return (
    <div className="marketing-hero">
      {/* Top Navigation */}
      <header className="max-w-content" style={{ width: '100%', paddingTop: '20px', paddingBottom: '20px' }}>
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--color-surface-container-lowest)',
          padding: '12px 24px',
          borderRadius: '9999px',
          border: '1px solid var(--color-outline-variant)',
          boxShadow: 'var(--effect-soft-shadow)',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '19px',
              boxShadow: '0 2px 8px rgba(0, 68, 227, 0.3)',
            }}>
              S
            </div>
            <div>
              <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-on-surface)', letterSpacing: '-0.5px' }}>
                Spotter
              </span>
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-primary)', fontWeight: 600, marginTop: '-2px' }}>
                GYM PWA
              </span>
            </div>
          </div>

          {/* Quick Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="badge badge-neutral" style={{ display: 'none' }}>
              📍 Lagos, Nigeria
            </span>
            <Link href="/login" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '14px' }}>
              Member Login →
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-content" style={{
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '20px',
        paddingBottom: '20px',
      }}>
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          {/* Top Pill */}
          <div className="badge badge-primary">
            <span>🛡️</span>
            <span>Approved Gym Cards • Private Records • Zero AI Hallucination</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 54px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            color: 'var(--color-on-surface)',
          }}>
            Everything on record.{' '}
            <span style={{ color: 'var(--color-primary)' }}>
              Nothing guessed.
            </span>
          </h1>

          {/* Subtitle from AGENTS.md */}
          <p style={{
            fontSize: 'clamp(16px, 2vw, 19px)',
            color: 'var(--color-on-surface-variant)',
            lineHeight: 1.5,
            maxWidth: '680px',
          }}>
            It answers questions only from the gym&apos;s approved typed cards and the asking member&apos;s own records, lets members check in and pay, and hands them to a named staff member when the records hold no answer.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' }}>
            <Link href="/login" className="btn btn-primary" style={{ fontSize: '16px', padding: '14px 28px' }}>
              Log In with PIN
            </Link>
            <Link href="/login" className="btn btn-outline" style={{ fontSize: '16px', padding: '14px 28px' }}>
              First-Time Join Code
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid (The Core Pillars) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginTop: '36px',
        }}>
          {/* Pillar 1 */}
          <div className="spotter-card spotter-card-interactive">
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-primary-container)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              marginBottom: '12px',
            }}>
              💬
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
              Ask the Gym
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: 1.4 }}>
              Timetables, rules, and prices answered only from owner-approved typed cards with confirmed dates.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="spotter-card spotter-card-interactive">
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-secondary-container)',
              color: 'var(--color-on-secondary-container)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              marginBottom: '12px',
            }}>
              ⏱️
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
              Daily Check-in
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: 1.4 }}>
              Type the 5-digit code of the day. Offline check-ins automatically queue and sync safely on reconnect.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="spotter-card spotter-card-interactive">
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-surface-container-high)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              marginBottom: '12px',
            }}>
              📊
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
              My Month & Ledger
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: 1.4 }}>
              Attendance days and balance verified in whole kobo. Strict database row security ensures zero cross-member data leaks.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="spotter-card spotter-card-interactive">
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-primary-container)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              marginBottom: '12px',
            }}>
              👤
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
              Get a Person
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: 1.4 }}>
              When no record exists, the app never invents an answer—it hands you directly to named desk staff on WhatsApp.
            </p>
          </div>
        </div>
      </main>

      {/* Footer / System Status */}
      <footer className="max-w-content" style={{
        width: '100%',
        paddingTop: '16px',
        paddingBottom: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        borderTop: '1px solid var(--color-outline-variant)',
        fontSize: '12px',
        color: 'var(--color-on-surface-variant)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
          <span>Operating on Lagos Time (Africa/Lagos)</span>
          <span>•</span>
          <span>PostgreSQL pgvector</span>
        </div>

        <div>
          <span>Text-only PWA • Small data bundles • </span>
          <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
            Staff Portal
          </Link>
        </div>
      </footer>
    </div>
  );
}
