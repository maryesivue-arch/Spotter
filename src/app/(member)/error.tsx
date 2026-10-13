'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function MemberError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Member route error:', error.digest || error.message);
  }, [error]);

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div className="spotter-card" style={{ maxWidth: '460px', width: '100%', textAlign: 'center', padding: '32px 24px' }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '14px',
          backgroundColor: 'var(--color-error-container)',
          color: 'var(--color-on-error-container)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          margin: '0 auto 14px auto',
        }}>
          ⚠️
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
          Unable to Load Records
        </h2>

        <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: 1.5, marginBottom: '20px' }}>
          There was a problem retrieving your records. Private data checks remain active.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            Retry
          </button>
          <Link href="/login" className="btn btn-outline" style={{ width: '100%' }}>
            Check Session / Login
          </Link>
        </div>
      </div>
    </div>
  );
}
