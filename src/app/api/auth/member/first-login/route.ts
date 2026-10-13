import { NextRequest, NextResponse } from 'next/server';
import { activateMemberWithJoinCode } from '@/server/dal/member/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { memberNumber, joinCode, pin, consentAccepted } = body;

    const num = Number(memberNumber);
    if (!num || isNaN(num) || num <= 0) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid member number.' },
        { status: 400 }
      );
    }

    if (!joinCode || typeof joinCode !== 'string' || joinCode.trim().length !== 8) {
      return NextResponse.json(
        { ok: false, error: 'Join code must be 8 characters long.' },
        { status: 400 }
      );
    }

    if (!pin || typeof pin !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'PIN is required.' },
        { status: 400 }
      );
    }

    const userAgent = req.headers.get('user-agent') || undefined;

    const result = await activateMemberWithJoinCode(
      num,
      joinCode,
      pin,
      Boolean(consentAccepted),
      userAgent
    );

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
    console.error('First login error:', err);
    return NextResponse.json(
      { ok: false, error: 'An unexpected error occurred during registration.' },
      { status: 500 }
    );
  }
}
