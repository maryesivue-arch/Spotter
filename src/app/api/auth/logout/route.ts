import { NextRequest, NextResponse } from 'next/server';
import { revokeCurrentSession } from '@/server/auth/session';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    await revokeCurrentSession(req);
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error('Logout error:', err);
    return NextResponse.json(
      { ok: false, error: 'Failed to revoke session.' },
      { status: 500 }
    );
  }
}
