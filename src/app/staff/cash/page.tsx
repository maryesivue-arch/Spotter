import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Staff — Manual Payment Entry',
  description: 'Verified gym member app',
};

export default function StaffCashPage() {
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
          <span className="badge badge-primary">Manual Payments</span>
        </div>
      </header>

      <main className="max-w-content" style={{ width: '100%', flex: 1, maxWidth: '640px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
          Enter Manual Payment
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', marginBottom: '20px' }}>
          Record in-person payments (Cash, Bank Transfer, or POS) with reference codes.
        </p>

        <div className="spotter-card">
          <form style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label htmlFor="memberId" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Member Number:
              </label>
              <input id="memberId" type="text" placeholder="e.g. 10045" className="form-input" />
            </div>

            <div>
              <label htmlFor="method" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Payment Method:
              </label>
              <select id="method" className="form-input">
                <option value="CASH">Cash</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="POS">POS Terminal</option>
              </select>
            </div>

            <div>
              <label htmlFor="amount" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Amount (Naira):
              </label>
              <input id="amount" type="number" placeholder="15000" className="form-input" />
            </div>

            <button type="button" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>
              Post Payment Entry 💵
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
