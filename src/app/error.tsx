'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, log without leaking sensitive state
    console.error('Unhandled app error:', error.digest || error.message);
  }, [error]);

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      backgroundColor: 'var(--color-surface)',
    }}>
      <div className="spotter-card" style={{ maxWidth: '500px', width: '100%', textAlign: 'center', padding: '36px 28px' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          backgroundColor: 'var(--color-error-container)',
          color: 'var(--color-on-error-container)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          margin: '0 auto 16px auto',
        }}>
          ⚠️
        </div>

        <div className="badge badge-neutral" style={{ marginBottom: '12px' }}>
          System Notice
        </div>

        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
          Temporary System Issue
        </h1>

        <p style={{ fontSize: '15px', color: 'var(--color-on-surface-variant)', lineHeight: 1.5, marginBottom: '20px' }}>
          An unexpected issue occurred while rendering this view. Your session and stored records remain safe.
        </p>

        {error.digest && (
          <div style={{
            padding: '8px 12px',
            backgroundColor: 'var(--color-surface-container-high)',
            borderRadius: '8px',
            fontSize: '12px',
            color: 'var(--color-on-surface-variant)',
            fontFamily: 'monospace',
            marginBottom: '24px',
            wordBreak: 'break-all',
          }}>
            Reference: {error.digest}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            Try Again
          </button>
          <Link href="/" className="btn btn-outline" style={{ width: '100%' }}>
            Return to Home
          </Link>
        </div>

        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-outline-variant)', fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
          Persistent issue? Hand your question to the named desk staff.
        </div>
      </div>
    </div>
  );
}
