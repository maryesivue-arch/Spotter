import { withAuth } from '@/server/db/client';
import { verifySecret } from '@/server/auth/pin';
import { createStaffSession } from '@/server/auth/session';

export interface StaffAuthResultSuccess {
  ok: true;
  data: {
    email: string;
    name: string;
    role: 'STAFF' | 'OWNER';
  };
}

export interface StaffAuthResultError {
  ok: false;
  error: string;
  status: number;
}

export type StaffAuthResult = StaffAuthResultSuccess | StaffAuthResultError;

/**
 * Authenticates staff or owner by email and password.
 */
export async function authenticateStaff(
  email: string,
  password: string,
  userAgent?: string
): Promise<StaffAuthResult> {
  const cleanEmail = email.trim().toLowerCase();

  const staffUser = await withAuth(async (tx) => {
    return tx.staffUser.findUnique({
      where: { email: cleanEmail },
    });
  });

  if (!staffUser || !staffUser.active) {
    return {
      ok: false,
      error: 'Invalid staff credentials.',
      status: 401,
    };
  }

  const matches = await verifySecret(password, staffUser.passwordHash);
  if (!matches) {
    return {
      ok: false,
      error: 'Invalid staff credentials.',
      status: 401,
    };
  }

  await createStaffSession(staffUser.id, userAgent);

  return {
    ok: true,
    data: {
      email: staffUser.email,
      name: staffUser.name,
      role: staffUser.role,
    },
  };
}
