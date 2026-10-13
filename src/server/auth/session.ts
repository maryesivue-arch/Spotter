import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '../db/client';
import { generateSessionToken, hashSessionToken } from './pin';
import { MemberCtx, StaffCtx } from './types';

export const SESSION_COOKIE_NAME = 'spotter_session';

const MEMBER_SESSION_DURATION_MS = 90 * 24 * 60 * 60 * 1000; // 90 days
const STAFF_SESSION_DURATION_MS = 12 * 60 * 60 * 1000; // 12 hours

/**
 * Creates a new 90-day session for a verified member and sets the HttpOnly cookie.
 */
export async function createMemberSession(
  memberId: string,
  userAgent?: string
): Promise<string> {
  const { rawToken, tokenHash } = generateSessionToken();
  const expiresAt = new Date(Date.now() + MEMBER_SESSION_DURATION_MS);

  await withAuth(async (tx) => {
    await tx.session.create({
      data: {
        tokenHash,
        memberId,
        expiresAt,
        userAgent,
      },
    });
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, rawToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });

  return rawToken;
}

/**
 * Creates a new 12-hour session for a staff/owner account and sets the HttpOnly cookie.
 */
export async function createStaffSession(
  staffUserId: string,
  userAgent?: string
): Promise<string> {
  const { rawToken, tokenHash } = generateSessionToken();
  const expiresAt = new Date(Date.now() + STAFF_SESSION_DURATION_MS);

  await withAuth(async (tx) => {
    await tx.session.create({
      data: {
        tokenHash,
        staffUserId,
        expiresAt,
        userAgent,
      },
    });
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, rawToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });

  return rawToken;
}

/**
 * Retrieves the active session token from cookieStore or incoming NextRequest.
 */
export async function getSessionToken(req?: NextRequest): Promise<string | null> {
  if (req) {
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (token) return token;
  }
  try {
    const cookieStore = await cookies();
    return cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;
  } catch {
    return null;
  }
}

/**
 * Enforces member authentication. Returns MemberCtx or throws an error/returns null.
 */
export async function requireMemberSession(req?: NextRequest): Promise<MemberCtx> {
  const rawToken = await getSessionToken(req);
  if (!rawToken) {
    throw new Error('UNAUTHORIZED: No active member session cookie.');
  }

  const tokenHash = hashSessionToken(rawToken);
  const now = new Date();

  const session = await withAuth(async (tx) => {
    return tx.session.findUnique({
      where: { tokenHash },
      include: { member: true },
    });
  });

  if (
    !session ||
    session.revokedAt ||
    session.expiresAt <= now ||
    !session.member ||
    session.member.deactivatedAt
  ) {
    throw new Error('UNAUTHORIZED: Member session is invalid or has expired.');
  }

  return {
    memberId: session.member.id,
    memberNumber: session.member.memberNumber,
    name: session.member.name,
    tier: session.member.tier,
    expiresAt: session.member.expiresAt,
  };
}

/**
 * Enforces staff/owner authentication. Returns StaffCtx or throws.
 */
export async function requireStaffSession(req?: NextRequest): Promise<StaffCtx> {
  const rawToken = await getSessionToken(req);
  if (!rawToken) {
    throw new Error('UNAUTHORIZED: No active staff session cookie.');
  }

  const tokenHash = hashSessionToken(rawToken);
  const now = new Date();

  const session = await withAuth(async (tx) => {
    return tx.session.findUnique({
      where: { tokenHash },
      include: { staffUser: true },
    });
  });

  if (
    !session ||
    session.revokedAt ||
    session.expiresAt <= now ||
    !session.staffUser ||
    !session.staffUser.active
  ) {
    throw new Error('UNAUTHORIZED: Staff session is invalid or has expired.');
  }

  return {
    staffUserId: session.staffUser.id,
    email: session.staffUser.email,
    name: session.staffUser.name,
    role: session.staffUser.role,
  };
}

/**
 * Revokes the current session and clears the session cookie.
 */
export async function revokeCurrentSession(req?: NextRequest): Promise<void> {
  const rawToken = await getSessionToken(req);
  if (rawToken) {
    const tokenHash = hashSessionToken(rawToken);
    await withAuth(async (tx) => {
      await tx.session.updateMany({
        where: { tokenHash },
        data: { revokedAt: new Date() },
      });
    });
  }

  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch {
    // Pass if outside request context
  }
}
