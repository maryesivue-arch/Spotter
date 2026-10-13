import { withAuth } from '@/server/db/client';
import { checkLoginSlowdown, recordLoginAttempt } from '@/server/auth/lockouts';
import { hashJoinCode, hashSecret, isValidPinFormat, verifySecret } from '@/server/auth/pin';
import { createMemberSession } from '@/server/auth/session';

export interface AuthResultSuccess {
  ok: true;
  data: {
    memberNumber: number;
    name: string;
    tier: 'BASIC' | 'PREMIUM';
  };
}

export interface AuthResultError {
  ok: false;
  error: string;
  status: number;
  waitSeconds?: number;
}

export type AuthResult = AuthResultSuccess | AuthResultError;

/**
 * Authenticates a returning member using member number and 6-digit PIN.
 */
export async function authenticateMember(
  memberNumber: number,
  pin: string,
  ip: string,
  userAgent?: string
): Promise<AuthResult> {
  const subject = `member:${memberNumber}`;

  // 1. Slowdown & brute-force check
  const slowdown = await checkLoginSlowdown(subject, ip);
  if (!slowdown.allowed) {
    return {
      ok: false,
      error: slowdown.reason || 'Too many failed login attempts.',
      status: 429,
      waitSeconds: slowdown.waitRemainingSeconds,
    };
  }

  // 2. Member lookup
  const member = await withAuth(async (tx) => {
    return tx.member.findUnique({
      where: { memberNumber },
    });
  });

  if (!member || !member.pinHash || member.deactivatedAt) {
    await recordLoginAttempt(subject, ip, false);
    return {
      ok: false,
      error: 'Invalid member number or PIN.',
      status: 401,
    };
  }

  // 3. Timing-safe PIN verification
  const matches = await verifySecret(pin, member.pinHash);
  if (!matches) {
    await recordLoginAttempt(subject, ip, false);
    await withAuth(async (tx) => {
      await tx.member.update({
        where: { id: member.id },
        data: { failedPins: { increment: 1 } },
      });
    });
    return {
      ok: false,
      error: 'Invalid member number or PIN.',
      status: 401,
    };
  }

  // 4. Reset counter and establish 90-day session
  await recordLoginAttempt(subject, ip, true);
  await withAuth(async (tx) => {
    await tx.member.update({
      where: { id: member.id },
      data: { failedPins: 0 },
    });
  });

  await createMemberSession(member.id, userAgent);

  return {
    ok: true,
    data: {
      memberNumber: member.memberNumber,
      name: member.name,
      tier: member.tier,
    },
  };
}

/**
 * Activates a new member account using their single-use 8-character join code and sets their PIN.
 */
export async function activateMemberWithJoinCode(
  memberNumber: number,
  joinCode: string,
  pin: string,
  consentAccepted: boolean,
  userAgent?: string
): Promise<AuthResult> {
  if (!isValidPinFormat(pin)) {
    return {
      ok: false,
      error: 'PIN must be exactly 6 digits (4-digit PINs are refused).',
      status: 400,
    };
  }

  if (!consentAccepted) {
    return {
      ok: false,
      error: 'You must accept the gym data consent to complete registration.',
      status: 400,
    };
  }

  const codeHash = hashJoinCode(joinCode);
  const now = new Date();

  const result = await withAuth(async (tx) => {
    const activeCode = await tx.joinCode.findFirst({
      where: {
        codeHash,
        usedAt: null,
        expiresAt: { gt: now },
        member: { memberNumber },
      },
      include: { member: true },
    });

    if (!activeCode || !activeCode.member) {
      return { error: 'Invalid, expired, or already used join code.' };
    }

    const member = activeCode.member;
    const pinHash = await hashSecret(pin);

    // Save consent version 1.0
    await tx.consentRecord.create({
      data: {
        memberId: member.id,
        version: '1.0',
        acceptedAt: now,
      },
    });

    // Mark join code as used
    await tx.joinCode.update({
      where: { id: activeCode.id },
      data: { usedAt: now },
    });

    // Update member's PIN
    await tx.member.update({
      where: { id: member.id },
      data: {
        pinHash,
        failedPins: 0,
      },
    });

    return { member };
  });

  if ('error' in result && result.error) {
    return {
      ok: false,
      error: result.error,
      status: 400,
    };
  }

  if (!('member' in result) || !result.member) {
    return {
      ok: false,
      error: 'Member account not found for this join code.',
      status: 400,
    };
  }

  await createMemberSession(result.member.id, userAgent);

  return {
    ok: true,
    data: {
      memberNumber: result.member.memberNumber,
      name: result.member.name,
      tier: result.member.tier,
    },
  };
}
