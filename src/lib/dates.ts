/**
 * Spotter Date & Lagos Timezone Library
 * Rules: .agent/rules/dates-and-money.md
 * - Lagos time (Africa/Lagos) only.
 * - Assumes 4am day boundary (PRD A-22, Q-14).
 * - Expiry dates are date-only strings (YYYY-MM-DD), compared without timestamps.
 */

export const LAGOS_TIMEZONE = 'Africa/Lagos';
export const DAY_BOUNDARY_HOUR = 4; // 4:00 AM Lagos time

/**
 * Returns current Date in Lagos timezone representation.
 */
export function getLagosNow(): Date {
  const now = new Date();
  const lagosString = now.toLocaleString('en-US', { timeZone: LAGOS_TIMEZONE });
  return new Date(lagosString);
}

/**
 * Computes the effective Lagos business date string (YYYY-MM-DD).
 * If the current Lagos time is before 4:00 AM, it belongs to the previous calendar day.
 */
export function getLagosDate(date: Date = new Date()): string {
  // Format the date into parts in Africa/Lagos
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: LAGOS_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const partMap: Record<string, string> = {};
  for (const p of parts) {
    partMap[p.type] = p.value;
  }

  let year = parseInt(partMap.year, 10);
  let month = parseInt(partMap.month, 10);
  let day = parseInt(partMap.day, 10);
  const hour = parseInt(partMap.hour, 10);

  // Apply 4am boundary: before 4am belongs to the previous business day
  if (hour < DAY_BOUNDARY_HOUR) {
    const calendarDate = new Date(Date.UTC(year, month - 1, day));
    calendarDate.setUTCDate(calendarDate.getUTCDate() - 1);
    year = calendarDate.getUTCFullYear();
    month = calendarDate.getUTCMonth() + 1;
    day = calendarDate.getUTCDate();
  }

  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

/**
 * Computes the effective Lagos business month string (YYYY-MM).
 */
export function getLagosMonth(date: Date = new Date()): string {
  const lagosDate = getLagosDate(date);
  return lagosDate.slice(0, 7);
}

/**
 * Checks if a target date (YYYY-MM-DD) is strictly before the reference Lagos date.
 */
export function isDatePast(targetDateStr: string, referenceDate: Date = new Date()): boolean {
  const currentLagosDate = getLagosDate(referenceDate);
  return targetDateStr < currentLagosDate;
}

/**
 * Computes difference in calendar days between two YYYY-MM-DD date strings (a - b).
 */
export function diffDays(dateA: string, dateB: string): number {
  const [yA, mA, dA] = dateA.split('-').map(Number);
  const [yB, mB, dB] = dateB.split('-').map(Number);
  const utcA = Date.UTC(yA, mA - 1, dA);
  const utcB = Date.UTC(yB, mB - 1, dB);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((utcA - utcB) / msPerDay);
}

/**
 * Adds integer days to a YYYY-MM-DD date string.
 */
export function addDays(dateStr: string, days: number): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);

  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Formats a YYYY-MM-DD date into friendly text (e.g. "12 Oct 2026").
 */
export function formatDateDisplay(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
