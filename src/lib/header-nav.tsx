'use client';

import { useState } from 'react';
import Link from 'next/link';

export function HeaderNav() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Link
        href="/login"
        className="btn btn-primary header-login-desktop"
        style={{ padding: '8px 20px', fontSize: '14px', whiteSpace: 'nowrap' }}
      >
        Member Login →
      </Link>

      <button
        type="button"
        className="btn btn-primary header-menu-toggle"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        style={{ padding: '9px 14px' }}
      >
        <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true" style={{ display: 'block' }}>
          <line x1="0.5" y1="1" x2="17.5" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="0.5" y1="7" x2="17.5" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="0.5" y1="13" x2="17.5" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <div className={open ? 'header-slider header-slider-open' : 'header-slider'}>
        <button
          type="button"
          className="btn btn-primary"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          style={{ padding: '8px' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style={{ display: 'block' }}>
            <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <Link
          href="/login"
          className="btn btn-primary"
          style={{ fontSize: '14px', padding: '10px 20px', whiteSpace: 'nowrap' }}
          onClick={() => setOpen(false)}
        >
          Member Login →
        </Link>
      </div>
    </div>
  );
}