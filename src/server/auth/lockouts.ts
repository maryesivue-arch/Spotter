import { withAuth } from '../db/client';

export interface SlowdownStatus {
  allowed: boolean;
  waitRemainingSeconds?: number;
  reason?: string;
}

/**
 * Checks if a member login attempt is subject to a rate-limiting slowdown or desk reset requirement.
 */
export async function checkLoginSlowdown(subject: string, ip: string): Promise<SlowdownStatus> {
  const now = new Date();
  const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  return withAuth(async (tx) => {
    // 1. Check 24-hour failed attempts (hard cap of 20 requires desk reset)
    const failsLast24h = await tx.loginAttempt.count({
      where: {
        OR: [{ subject }, { ip }],
        success: false,
        createdAt: { gte: twentyFourHoursAgo },
      },
    });

    if (failsLast24h >= 20) {
      return {
        allowed: false,
        reason: 'Too many failed login attempts. Please visit the front desk for a PIN reset.',
      };
    }

    // 2. Check 15-minute window attempts
    const recentFails = await tx.loginAttempt.findMany({
      where: {
        OR: [{ subject }, { ip }],
        success: false,
        createdAt: { gte: fifteenMinutesAgo },
      },
      orderBy: { createdAt: 'desc' },
      take: 15,
    });

    const recentCount = recentFails.length;

    if (recentCount >= 10 && recentFails[0]) {
      // 10 failures in 15 mins -> 15 min wait from most recent failure
      const elapsedMs = now.getTime() - recentFails[0].createdAt.getTime();
      const requiredWaitMs = 15 * 60 * 1000;
      if (elapsedMs < requiredWaitMs) {
        const waitRemaining = Math.ceil((requiredWaitMs - elapsedMs) / 1000);
        return {
          allowed: false,
          waitRemainingSeconds: waitRemaining,
          reason: `Too many attempts. Please wait ${Math.ceil(waitRemaining / 60)} minutes before retrying.`,
        };
      }
    } else if (recentCount >= 5 && recentFails[0]) {
      // 5 failures in 15 mins -> 1 min wait from most recent failure
      const elapsedMs = now.getTime() - recentFails[0].createdAt.getTime();
      const requiredWaitMs = 60 * 1000;
      if (elapsedMs < requiredWaitMs) {
        const waitRemaining = Math.ceil((requiredWaitMs - elapsedMs) / 1000);
        return {
          allowed: false,
          waitRemainingSeconds: waitRemaining,
          reason: `Too many attempts. Please wait ${waitRemaining} seconds before retrying.`,
        };
      }
    }

    return { allowed: true };
  });
}

/**
 * Records a login attempt into the LoginAttempt table.
 */
export async function recordLoginAttempt(
  subject: string,
  ip: string,
  success: boolean
): Promise<void> {
  await withAuth(async (tx) => {
    await tx.loginAttempt.create({
      data: {
        subject,
        ip,
        success,
      },
    });
  });
}
