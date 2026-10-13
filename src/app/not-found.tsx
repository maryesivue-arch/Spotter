import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      backgroundColor: 'var(--color-surface)',
    }}>
      <div className="spotter-card" style={{ maxWidth: '480px', width: '100%', textAlign: 'center', padding: '36px 28px' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          backgroundColor: 'var(--color-primary-container)',
          color: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          margin: '0 auto 16px auto',
        }}>
          🔍
        </div>

        <div className="badge badge-neutral" style={{ marginBottom: '12px' }}>
          Error 404
        </div>

        <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
          Not on Record
        </h1>

        <p style={{ fontSize: '15px', color: 'var(--color-on-surface-variant)', lineHeight: 1.5, marginBottom: '24px' }}>
          The page or record you requested does not exist or has been moved. No answer is guessed from the internet.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link href="/" className="btn btn-primary" style={{ width: '100%' }}>
            Return to Home
          </Link>
          <Link href="/login" className="btn btn-outline" style={{ width: '100%' }}>
            Go to Member Login
          </Link>
        </div>

        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-outline-variant)', fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
          Need assistance? Speak with the named desk staff.
        </div>
      </div>
    </div>
  );
}
