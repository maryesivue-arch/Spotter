import { NextRequest, NextResponse } from 'next/server';
import { authenticateStaff } from '@/server/dal/staff/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const userAgent = req.headers.get('user-agent') || undefined;
    const result = await authenticateStaff(email, password, userAgent);

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json({
      ok: true,
      data: result.data,
    });
  } catch (err: unknown) {
    console.error('Staff login error:', err);
    return NextResponse.json(
      { ok: false, error: 'An unexpected error occurred during staff login.' },
      { status: 500 }
    );
  }
}
