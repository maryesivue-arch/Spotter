import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalViewer } from '@/lib/legal-viewer';
import { HeaderNav } from '@/lib/header-nav';

export const metadata: Metadata = {
  title: 'Spotter — Everything on record. Nothing guessed.',
  description: 'Verified gym member app',
  keywords: [
    'Spotter',
    'gym member app',
    'gym check-in Lagos',
    'gym timetable',
    'attendance ledger',
    'Nigeria gym PWA',
  ],
  authors: [{ name: 'Spotter' }],
  creator: 'Spotter',
  publisher: 'Spotter',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Spotter — Everything on record. Nothing guessed.',
    description: 'Verified gym member app',
    url: '/',
    siteName: 'Spotter',
    locale: 'en_NG',
    type: 'website',
    images: [
      {
        url: '/icon.svg',
        width: 512,
        height: 512,
        alt: 'Spotter Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Spotter — Everything on record. Nothing guessed.',
    description: 'Verified gym member app',
    images: ['/icon.svg'],
  },
};

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
          borderRadius: '12px',
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
          <HeaderNav />
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-content" aria-label="Hero" style={{
        width: '100%',
        paddingTop: '48px',
        paddingBottom: '60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
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
      </section>

      {/* Features Section */}
      <section id="features" aria-label="Features" className="max-w-content" style={{
        width: '100%',
        paddingTop: '20px',
        paddingBottom: '72px',
      }}>
        <div style={{ textAlign: 'left', maxWidth: '780px', margin: '0 0 36px 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <div className="badge badge-primary">
              ⚡ Features
            </div>
          </div>
          <h2 style={{
            fontSize: 'clamp(26px, 3.8vw, 38px)',
            fontWeight: 800,
            color: 'var(--color-on-surface)',
            letterSpacing: '-0.8px',
            marginBottom: '12px',
            textAlign: 'left',
          }}>
            Four things Spotter does. Nothing more.
          </h2>
          <p style={{
            fontSize: 'clamp(15px, 1.8vw, 17px)',
            color: 'var(--color-on-surface-variant)',
            lineHeight: 1.6,
            textAlign: 'left',
          }}>
            Spotter focuses strictly on the essentials. No bloated tracking, no unnecessary notifications—just the five tools members actually need to manage their gym access.
          </p>
        </div>

        {/* Responsive Bento Grid (2 columns on tablet, 3 columns on desktop) */}
        <div className="bento-grid">
          {/* 1. Ask the Gym (spans 2 columns on desktop) */}
          <div className="bento-card bento-col-span-2">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
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
                }}>
                  💬
                </div>
                <span className="badge badge-primary" style={{ fontSize: '12px' }}>
                  Approved Cards
                </span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                Ask the Gym
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--color-on-surface-variant)', lineHeight: 1.55 }}>
                Timetables, rules, and prices answered only from owner-approved typed cards with confirmed dates.
              </p>
            </div>

            <div style={{
              marginTop: '24px',
              padding: '14px 18px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-surface-container-low)',
              border: '1px solid var(--color-outline-variant)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)' }}>
                  📋 Verified Card Match
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
                  Confirmed: Yesterday • Tier Gated
                </span>
              </div>
              <span style={{ fontSize: '13px', color: 'var(--color-on-surface)', fontStyle: 'italic' }}>
                &ldquo;Weekend Access: Saturdays 7:00 AM – 8:00 PM, Sundays 8:00 AM – 6:00 PM.&rdquo;
              </span>
            </div>
          </div>

          {/* 2. Daily Check-in (spans 1 column on desktop) */}
          <div className="bento-card bento-col-span-1">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
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
                }}>
                  ⏱️
                </div>
                <span className="badge badge-neutral" style={{ fontSize: '12px' }}>
                  Lagos Time
                </span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                Daily Check-in
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--color-on-surface-variant)', lineHeight: 1.55 }}>
                Type the 5-digit code of the day. Offline check-ins automatically queue and sync safely on reconnect.
              </p>
            </div>

            <div style={{
              marginTop: '24px',
              padding: '14px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-surface-container-low)',
              border: '1px solid var(--color-outline-variant)',
              textAlign: 'center',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '6px',
                fontFamily: 'monospace',
                fontSize: '16px',
                fontWeight: 700,
                color: 'var(--color-primary)',
                marginBottom: '4px',
              }}>
                <span style={{ padding: '3px 7px', background: 'var(--color-surface-container-lowest)', borderRadius: '6px', border: '1px solid var(--color-outline-variant)' }}>8</span>
                <span style={{ padding: '3px 7px', background: 'var(--color-surface-container-lowest)', borderRadius: '6px', border: '1px solid var(--color-outline-variant)' }}>4</span>
                <span style={{ padding: '3px 7px', background: 'var(--color-surface-container-lowest)', borderRadius: '6px', border: '1px solid var(--color-outline-variant)' }}>9</span>
                <span style={{ padding: '3px 7px', background: 'var(--color-surface-container-lowest)', borderRadius: '6px', border: '1px solid var(--color-outline-variant)' }}>2</span>
                <span style={{ padding: '3px 7px', background: 'var(--color-surface-container-lowest)', borderRadius: '6px', border: '1px solid var(--color-outline-variant)' }}>0</span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
                Offline Queue • Sync on Reconnect
              </span>
            </div>
          </div>

          {/* 3. My Month & Membership (spans 1 column on desktop) */}
          <div className="bento-card bento-col-span-1">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
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
                }}>
                  📊
                </div>
                <span className="badge badge-neutral" style={{ fontSize: '12px' }}>
                  RLS Protected
                </span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                My Month & Membership
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--color-on-surface-variant)', lineHeight: 1.55 }}>
                Attendance days, expiry, and balance verified in whole kobo. Strict database row security ensures zero cross-member data leaks.
              </p>
            </div>

            <div style={{
              marginTop: '24px',
              padding: '12px 14px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-surface-container-low)',
              border: '1px solid var(--color-outline-variant)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <span style={{ display: 'block', fontSize: '10px', color: 'var(--color-on-surface-variant)' }}>Attendance</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-on-surface)' }}>14 Days</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'block', fontSize: '10px', color: 'var(--color-on-surface-variant)' }}>Balance</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#10b981' }}>₦0 (Paid)</span>
              </div>
            </div>
          </div>

          {/* 4. Pay (spans 2 columns on desktop) */}
          <div className="bento-card bento-col-span-2">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
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
                }}>
                  💳
                </div>
                <span className="badge badge-primary" style={{ fontSize: '12px' }}>
                  Paystack Gateway
                </span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                Pay
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--color-on-surface-variant)', lineHeight: 1.55 }}>
                Pay renewals or balances directly through Paystack. Server-authoritative checkout ensures balances only change when confirmed.
              </p>
            </div>

            <div style={{
              marginTop: '24px',
              padding: '14px 18px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-surface-container-low)',
              border: '1px solid var(--color-outline-variant)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
            }}>
              <div>
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>Server-Set Amount</span>
                <span style={{ fontSize: '17px', fontWeight: 800, color: 'var(--color-primary)' }}>₦15,000 Renewal</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-on-surface)' }}>Webhook Confirmed Balance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy and Trust Section */}
      <section id="privacy" aria-label="Privacy and Trust" className="max-w-content" style={{
        width: '100%',
        paddingTop: '20px',
        paddingBottom: '80px',
      }}>
        {/* Section Heading & Subtext */}
        <div style={{ textAlign: 'left', maxWidth: '780px', margin: '0 0 40px 0' }}>
          <h2 style={{
            fontSize: 'clamp(26px, 3.8vw, 38px)',
            fontWeight: 800,
            color: 'var(--color-on-surface)',
            letterSpacing: '-0.8px',
            marginBottom: '12px',
          }}>
            Absolute Privacy. Zero Hallucination.
          </h2>
          <p style={{
            fontSize: 'clamp(15px, 1.8vw, 17px)',
            color: 'var(--color-on-surface-variant)',
            lineHeight: 1.6,
          }}>
            Spotter uses AI solely to route questions, never to write answers. Your members get exact, approved text, and their financial records remain strictly isolated.
          </p>
        </div>

        {/* Alternating Sub-Blocks */}
        <div>
          {/* Sub-block 1: No Generative Text (Text Left, Visual Right) */}
          <div className="privacy-row">
            <div className="privacy-content">
              <div className="badge badge-primary" style={{ marginBottom: '12px', fontSize: '12px' }}>
                📜 PRD Verified • Deterministic
              </div>
              <h3 style={{
                fontSize: 'clamp(22px, 3vw, 28px)',
                fontWeight: 700,
                color: 'var(--color-on-surface)',
                letterSpacing: '-0.5px',
                marginBottom: '12px',
              }}>
                No Generative Text
              </h3>
              <p style={{
                fontSize: '16px',
                color: 'var(--color-on-surface-variant)',
                lineHeight: 1.6,
                marginBottom: '20px',
              }}>
                Shared answers show the exact approved card text and a &ldquo;confirmed on&rdquo; date. No AI guesses policies.
              </p>
              <ul style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: 0,
              }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--color-on-surface)' }}>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>✓</span>
                  <span><strong>Owner-approved only:</strong> Only typed cards reviewed by the gym owner or management are ever displayed to members.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--color-on-surface)' }}>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>✓</span>
                  <span><strong>Confirmed date badge:</strong> Cards past their review date display an explicit &ldquo;not confirmed recently, ask the desk&rdquo; notice.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--color-on-surface)' }}>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>✓</span>
                  <span><strong>Silent on uncertainty:</strong> If records hold no exact answer, Spotter stays silent and hands off rather than guessing.</span>
                </li>
              </ul>
            </div>

            <div className="privacy-visual">
              <div className="privacy-visual-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--color-primary-container)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                    }}>
                      📋
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                        Approved Shared Card
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
                        Card ID: card_timetable_01
                      </span>
                    </div>
                  </div>
                  <span className="badge badge-primary" style={{ fontSize: '11px' }}>
                    Owner Approved
                  </span>
                </div>

                <div style={{
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-surface-container-low)',
                  border: '1px solid var(--color-outline-variant)',
                  marginBottom: '16px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '12px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>General Timetable & Access</span>
                    <span style={{ color: 'var(--color-on-surface-variant)' }}>Confirmed: Oct 12, 2026</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-on-surface)', lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
                    &ldquo;Gym opens 6:00 AM – 10:00 PM on weekdays. Public holidays run 8:00 AM – 4:00 PM. No admission without active membership or valid grace period.&rdquo;
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-surface-container-lowest)',
                  border: '1px dashed var(--color-outline-variant)',
                  fontSize: '12px',
                }}>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>● 100% Deterministic Text</span>
                  <span style={{ color: 'var(--color-on-surface-variant)' }}>Zero LLM Generation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-block 2: Strict Data Isolation (Visual Left, Text Right on Desktop) */}
          <div className="privacy-row privacy-row-reverse">
            <div className="privacy-content">
              <div className="badge badge-neutral" style={{ marginBottom: '12px', fontSize: '12px' }}>
                🛡️ PostgreSQL RLS • Security First
              </div>
              <h3 style={{
                fontSize: 'clamp(22px, 3vw, 28px)',
                fontWeight: 700,
                color: 'var(--color-on-surface)',
                letterSpacing: '-0.5px',
                marginBottom: '12px',
              }}>
                Strict Data Isolation
              </h3>
              <p style={{
                fontSize: '16px',
                color: 'var(--color-on-surface-variant)',
                lineHeight: 1.6,
                marginBottom: '20px',
              }}>
                Built with PostgreSQL Row Level Security. A member&apos;s private intents are fetched by exact session ID, never searched by meaning.
              </p>
              <ul style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: 0,
              }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--color-on-surface)' }}>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>✓</span>
                  <span><strong>Zero meaning-based matching:</strong> Attendance, expiry, and payment history are never embedded into vectors or matched by AI similarity.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--color-on-surface)' }}>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>✓</span>
                  <span><strong>Session-derived identity:</strong> Member ID is extracted exclusively from the authenticated session, never accepted from request parameters or URLs.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--color-on-surface)' }}>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>✓</span>
                  <span><strong>Database-enforced isolation:</strong> Row level security rules on PostgreSQL guarantee Member A cannot read Member B&apos;s records under any circumstance.</span>
                </li>
              </ul>
            </div>

            <div className="privacy-visual">
              <div className="privacy-visual-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--color-secondary-container)',
                      color: 'var(--color-on-secondary-container)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                    }}>
                      🔒
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                        PostgreSQL Row Level Security
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
                        Role: spotter_app • FORCE RLS
                      </span>
                    </div>
                  </div>
                  <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
                    RLS Enforced
                  </span>
                </div>

                <div style={{
                  padding: '14px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-surface-container-high)',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: 'var(--color-on-surface)',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                }}>
                  <div style={{ color: 'var(--color-on-surface-variant)' }}>-- Isolated Transaction Context</div>
                  <div><span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>SET LOCAL</span> app.member_id = &apos;mem_89204&apos;;</div>
                  <div><span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>SELECT</span> balance, expiry <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>FROM</span> Member;</div>
                  <div style={{ color: '#10b981', marginTop: '6px' }}>&gt;&gt; Query result: 1 member row (isolated)</div>
                  <div style={{ color: 'var(--color-on-surface-variant)' }}>&gt;&gt; Cross-member leakage: 0 rows accessible</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  <div style={{ padding: '8px 10px', backgroundColor: 'var(--color-surface-container-low)', borderRadius: '8px', border: '1px solid var(--color-outline-variant)' }}>
                    <span style={{ display: 'block', fontSize: '10px', color: 'var(--color-on-surface-variant)' }}>Private Intent Matching</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)' }}>Exact Session ID</span>
                  </div>
                  <div style={{ padding: '8px 10px', backgroundColor: 'var(--color-surface-container-low)', borderRadius: '8px', border: '1px solid var(--color-outline-variant)' }}>
                    <span style={{ display: 'block', fontSize: '10px', color: 'var(--color-on-surface-variant)' }}>Cross-Member Leakage</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981' }}>Strict 0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-block 3: Built-in Fallbacks (Text Left, Visual Right) */}
          <div className="privacy-row">
            <div className="privacy-content">
              <div className="badge badge-primary" style={{ marginBottom: '12px', fontSize: '12px' }}>
                🤝 Human Escalation • Zero Guesses
              </div>
              <h3 style={{
                fontSize: 'clamp(22px, 3vw, 28px)',
                fontWeight: 700,
                color: 'var(--color-on-surface)',
                letterSpacing: '-0.5px',
                marginBottom: '12px',
              }}>
                Built-in Fallbacks
              </h3>
              <p style={{
                fontSize: '16px',
                color: 'var(--color-on-surface-variant)',
                lineHeight: 1.6,
                marginBottom: '20px',
              }}>
                If a question requires medical advice, refunds, or falls outside the gym&apos;s records, the app gracefully hands the member off to human desk staff.
              </p>
              <ul style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: 0,
              }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--color-on-surface)' }}>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>✓</span>
                  <span><strong>Automatic guardrails:</strong> Refuses questions on injury, pregnancy, diet, supplements, or medication and immediately refers to human staff.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--color-on-surface)' }}>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>✓</span>
                  <span><strong>One-tap WhatsApp link:</strong> Opens a pre-typed WhatsApp conversation directly with the on-duty staff member—the member reviews before sending.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--color-on-surface)' }}>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>✓</span>
                  <span><strong>Wrong or unclear report:</strong> A single tap allows members to flag any answer for human desk review.</span>
                </li>
              </ul>
            </div>

            <div className="privacy-visual">
              <div className="privacy-visual-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--color-primary-container)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                    }}>
                      🧑‍💼
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                        Named Staff Fallback
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
                        Duty Officer: Coach Tunde (Front Desk)
                      </span>
                    </div>
                  </div>
                  <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
                    Guardrail Triggered
                  </span>
                </div>

                <div style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-surface-container-high)',
                  border: '1px solid var(--color-outline-variant)',
                  marginBottom: '12px',
                }}>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-on-surface-variant)', marginBottom: '4px' }}>
                    Member Question:
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--color-on-surface)', fontStyle: 'italic' }}>
                    &ldquo;Can I get a refund or waiver for the two weeks I was out of town?&rdquo;
                  </span>
                </div>

                <div style={{
                  padding: '14px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-surface-container-low)',
                  border: '1px solid var(--color-outline-variant)',
                  marginBottom: '14px',
                }}>
                  <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '4px' }}>
                    🛡️ Protected Policy Boundary
                  </span>
                  <p style={{ fontSize: '12px', color: 'var(--color-on-surface)', margin: 0, lineHeight: 1.4 }}>
                    Spotter does not handle refund or dispute decisions automatically. Tapping below connects you with Coach Tunde.
                  </p>
                </div>

                <div style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-on-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '13px',
                  fontWeight: 600,
                }}>
                  <span>💬 Message Coach Tunde on WhatsApp</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
          <svg width="24" height="24" viewBox="0 0 32 32" role="img" aria-label="Spotter logo">
            <rect width="32" height="32" rx="8" fill="#0044e3" />
            <text
              x="50%"
              y="54%"
              fill="#ffffff"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontWeight="800"
              fontSize="20"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              S
            </text>
          </svg>
          <span style={{ fontWeight: 700, color: 'var(--color-on-surface)' }}>Spotter</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <LegalViewer linkStyle={{ color: 'var(--color-on-surface-variant)' }} />
          <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
            Staff Portal
          </Link>
        </div>
      </footer>
    </div>
  );
}
