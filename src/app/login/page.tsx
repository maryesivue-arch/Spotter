'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LegalViewer } from '@/lib/legal-viewer';

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'member' | 'join' | 'staff'>('member');

  // Form states
  const [memberNumber, setMemberNumber] = useState('');
  const [pin, setPin] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [staffEmail, setStaffEmail] = useState('');
  const [staffPassword, setStaffPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleMemberLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/member/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberNumber, pin }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'Login failed. Please check your details.');
      } else {
        setSuccess(`Welcome back, ${data.data.name}! Redirecting...`);
        setTimeout(() => router.push('/'), 1200);
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinCodeActivation = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/member/first-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberNumber, joinCode, pin, consentAccepted }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'Failed to activate join code.');
      } else {
        setSuccess(`Welcome to Spotter, ${data.data.name}! PIN configured successfully.`);
        setTimeout(() => router.push('/'), 1200);
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/staff/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: staffEmail, password: staffPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'Invalid staff credentials.');
      } else {
        setSuccess(`Authenticated as ${data.data.name} (${data.data.role}).`);
        setTimeout(() => router.push('/'), 1200);
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="marketing-hero" style={{ minHeight: '100vh', padding: '24px 16px' }}>
      {/* Header */}
      <header className="max-w-content" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
          <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-on-surface)', letterSpacing: '-0.5px' }}>
            Spotter
          </span>
        </Link>
        <Link href="/" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '13px' }}>
          ← Back to Overview
        </Link>
      </header>

      {/* Main Login Card */}
      <main style={{ maxWidth: '440px', width: '100%', margin: '40px auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="spotter-card" style={{ padding: '32px' }}>
          {/* Segmented Controls */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            backgroundColor: 'var(--color-surface-container-high)',
            padding: '4px',
            borderRadius: '12px',
            marginBottom: '24px',
            gap: '4px',
          }}>
            <button
              type="button"
              onClick={() => { setTab('member'); setError(null); setSuccess(null); }}
              style={{
                padding: '8px 4px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                backgroundColor: tab === 'member' ? 'var(--color-surface-container-lowest)' : 'transparent',
                color: tab === 'member' ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                boxShadow: tab === 'member' ? 'var(--effect-soft-shadow)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              Member PIN
            </button>
            <button
              type="button"
              onClick={() => { setTab('join'); setError(null); setSuccess(null); }}
              style={{
                padding: '8px 4px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                backgroundColor: tab === 'join' ? 'var(--color-surface-container-lowest)' : 'transparent',
                color: tab === 'join' ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                boxShadow: tab === 'join' ? 'var(--effect-soft-shadow)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              First Login
            </button>
            <button
              type="button"
              onClick={() => { setTab('staff'); setError(null); setSuccess(null); }}
              style={{
                padding: '8px 4px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                backgroundColor: tab === 'staff' ? 'var(--color-surface-container-lowest)' : 'transparent',
                color: tab === 'staff' ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                boxShadow: tab === 'staff' ? 'var(--effect-soft-shadow)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              Staff Desk
            </button>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: '20px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
              {tab === 'member' && 'Member Login'}
              {tab === 'join' && 'First-Time Activation'}
              {tab === 'staff' && 'Desk Staff Access'}
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: '1.4' }}>
              {tab === 'member' && 'Enter your gym member number and 6-digit PIN.'}
              {tab === 'join' && 'Use your 8-character code from the front desk to set your PIN.'}
              {tab === 'staff' && 'Authorized gym staff and owner dashboard portal.'}
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div style={{
              backgroundColor: 'var(--color-error-container)',
              color: 'var(--color-on-error-container)',
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 500,
              marginBottom: '18px',
              border: '1px solid var(--color-error)',
            }}>
              {error}
            </div>
          )}

          {/* Success Banner */}
          {success && (
            <div style={{
              backgroundColor: 'var(--color-primary-container)',
              color: 'var(--color-on-primary-container)',
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '18px',
            }}>
              {success}
            </div>
          )}

          {/* Tab 1: Returning Member Form */}
          {tab === 'member' && (
            <form onSubmit={handleMemberLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
                  Member Number
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 1042"
                  value={memberNumber}
                  onChange={(e) => setMemberNumber(e.target.value)}
                  className="form-input"
                  autoFocus
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
                  6-Digit PIN
                </label>
                <input
                  type="password"
                  required
                  maxLength={6}
                  placeholder="••••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="form-input"
                  style={{ letterSpacing: '4px', fontSize: '18px' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '8px' }}
              >
                {loading ? 'Verifying...' : 'Sign In to Spotter'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setTab('join')}
                  style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                >
                  First time? Claim your Join Code →
                </button>
              </div>
            </form>
          )}

          {/* Tab 2: First Time Join Code Form */}
          {tab === 'join' && (
            <form onSubmit={handleJoinCodeActivation} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
                  Member Number
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 1042"
                  value={memberNumber}
                  onChange={(e) => setMemberNumber(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
                  8-Character Join Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={8}
                  placeholder="e.g. 7XKP9MWB"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  className="form-input"
                  style={{ letterSpacing: '2px', textTransform: 'uppercase' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
                  Choose 6-Digit PIN
                </label>
                <input
                  type="password"
                  required
                  maxLength={6}
                  placeholder="6 digits (not 4)"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="form-input"
                  style={{ letterSpacing: '4px' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '4px' }}>
                <input
                  type="checkbox"
                  id="consentCheckbox"
                  checked={consentAccepted}
                  onChange={(e) => setConsentAccepted(e.target.checked)}
                  style={{ marginTop: '3px', cursor: 'pointer', width: '16px', height: '16px' }}
                />
                <label htmlFor="consentCheckbox" style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', lineHeight: '1.4', cursor: 'pointer' }}>
                  I agree to gym record storage, private attendance logging, and embedding queries under gym data policy version 1.0.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !consentAccepted}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '8px' }}
              >
                {loading ? 'Activating...' : 'Activate & Sign In'}
              </button>
            </form>
          )}

          {/* Tab 3: Staff Login Form */}
          {tab === 'staff' && (
            <form onSubmit={handleStaffLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
                  Staff Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="desk@gym.local"
                  value={staffEmail}
                  onChange={(e) => setStaffEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={staffPassword}
                  onChange={(e) => setStaffPassword(e.target.value)}
                  className="form-input"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '8px' }}
              >
                {loading ? 'Authenticating...' : 'Sign In as Staff'}
              </button>
            </form>
          )}
        </div>

        {/* Security & Offline Notice */}
        <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-on-surface-variant)', lineHeight: '1.5' }}>
          <span>🔒 90-day device session token</span> • <span>Lagos Time (Africa/Lagos)</span>
          <br />
          <span>No SMS or unencrypted email login. PIN reset occurs at the front desk.</span>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px', fontSize: '12px', color: 'var(--color-outline)' }}>
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
        <span>Spotter Gym PWA • Approved Cards & Private Member Records</span>
        <div style={{ display: 'flex', gap: '12px' }}>
          <LegalViewer linkStyle={{ color: 'var(--color-outline)' }} />
        </div>
      </footer>
    </div>
  );
}
