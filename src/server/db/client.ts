import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * Executes a database operation within a transaction scoped to a specific member ID.
 * Sets the PostgreSQL local session variable `app.member_id` for Row-Level Security.
 */
export async function withMember<T>(
  memberId: string,
  fn: (tx: Parameters<Parameters<typeof prisma.$transaction>[0]>[0]) => Promise<T>
): Promise<T> {
  return prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe(
      `SELECT set_config('app.member_id', $1, true)`,
      memberId
    );
    return fn(tx);
  });
}

/**
 * Executes a database operation within a transaction scoped to a staff or owner actor.
 * Sets the PostgreSQL local session variable `app.actor` to 'staff' or 'owner'.
 */
export async function withStaff<T>(
  actor: 'staff' | 'owner',
  fn: (tx: Parameters<Parameters<typeof prisma.$transaction>[0]>[0]) => Promise<T>
): Promise<T> {
  return prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe(
      `SELECT set_config('app.actor', $1, true)`,
      actor
    );
    return fn(tx);
  });
}

/**
 * Executes an authentication operation within a transaction scoped to actor 'auth'.
 */
export async function withAuth<T>(
  fn: (tx: Parameters<Parameters<typeof prisma.$transaction>[0]>[0]) => Promise<T>
): Promise<T> {
  return prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe(
      `SELECT set_config('app.actor', 'auth', true)`
    );
    return fn(tx);
  });
}
