import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Staff — Members & Join Codes',
  description: 'Verified gym member app',
};

export default function StaffMembersPage() {
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
          <span className="badge badge-primary">Staff Operations</span>
        </div>
      </header>

      <main className="max-w-content" style={{ width: '100%', flex: 1, maxWidth: '640px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
          Members & Join Codes
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', marginBottom: '20px' }}>
          Add a member and create an 8-character single-use join code at the desk.
        </p>

        <div className="spotter-card">
          <form style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label htmlFor="memberNumber" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Member Number:
              </label>
              <input id="memberNumber" type="text" placeholder="e.g. 10045" className="form-input" />
            </div>

            <div>
              <label htmlFor="tier" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Membership Tier:
              </label>
              <select id="tier" className="form-input">
                <option value="BASIC">Basic Member</option>
                <option value="PREMIUM">Premium Member</option>
              </select>
            </div>

            <button type="button" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>
              Create Member & Generate Join Code
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
