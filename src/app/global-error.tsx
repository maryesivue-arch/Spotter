'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        backgroundColor: '#f8f9ff',
        color: '#181c22',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          maxWidth: '480px',
          width: '90%',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #c2c6d6',
          boxShadow: '0 4px 16px rgba(24, 28, 34, 0.08)',
          padding: '32px 24px',
          textAlign: 'center',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#ffdad6',
            color: '#ba1a1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            margin: '0 auto 16px auto',
          }}>
            ⚠️
          </div>

          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 8px 0', color: '#181c22' }}>
            Application Error
          </h1>

          <p style={{ fontSize: '14px', color: '#424653', lineHeight: 1.5, margin: '0 0 20px 0' }}>
            Spotter encountered a fatal error while loading the base application layout.
          </p>

          {error.digest && (
            <div style={{
              padding: '6px 10px',
              backgroundColor: '#e9ecf8',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#424653',
              fontFamily: 'monospace',
              marginBottom: '20px',
            }}>
              Reference: {error.digest}
            </div>
          )}

          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: '12px 24px',
              borderRadius: '9999px',
              backgroundColor: '#0044e3',
              color: '#ffffff',
              border: 'none',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
