import { NextRequest, NextResponse } from 'next/server';
import { authenticateMember } from '@/server/dal/member/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { memberNumber, pin } = body;

    const num = Number(memberNumber);
    if (!num || isNaN(num) || num <= 0) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid member number.' },
        { status: 400 }
      );
    }

    if (!pin || typeof pin !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'PIN is required.' },
        { status: 400 }
      );
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || undefined;

    const result = await authenticateMember(num, pin, ip, userAgent);

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error, waitSeconds: result.waitSeconds },
        { status: result.status }
      );
    }

    return NextResponse.json({
      ok: true,
      data: result.data,
    });
  } catch (err: unknown) {
    console.error('Member login error:', err);
    return NextResponse.json(
      { ok: false, error: 'An unexpected error occurred during login.' },
      { status: 500 }
    );
  }
}
