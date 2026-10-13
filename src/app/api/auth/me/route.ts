import { NextRequest, NextResponse } from 'next/server';
import { requireMemberSession, requireStaffSession } from '@/server/auth/session';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    try {
      const member = await requireMemberSession(req);
      return NextResponse.json({
        ok: true,
        type: 'member',
        user: member,
      });
    } catch {
      // Not a member, try staff
    }

    try {
      const staff = await requireStaffSession(req);
      return NextResponse.json({
        ok: true,
        type: 'staff',
        user: staff,
      });
    } catch {
      // Not staff either
    }

    return NextResponse.json(
      { ok: false, error: 'Unauthenticated' },
      { status: 401 }
    );
  } catch (err: unknown) {
    console.error('Session me error:', err);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
