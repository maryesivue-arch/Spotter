import Link from 'next/link';

export default function MemberNotFound() {
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
          backgroundColor: 'var(--color-primary-container)',
          color: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          margin: '0 auto 14px auto',
        }}>
          📋
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
          Record Not Found
        </h2>

        <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: 1.5, marginBottom: '20px' }}>
          This record or feature does not exist on your member account.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link href="/" className="btn btn-primary" style={{ width: '100%' }}>
            Return to Overview
          </Link>
          <Link href="/login" className="btn btn-outline" style={{ width: '100%' }}>
            Switch Account / Desk Login
          </Link>
        </div>
      </div>
    </div>
  );
}
