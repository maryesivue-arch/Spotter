/**
 * Spotter Money & Currency Library
 * Rules: .agent/rules/dates-and-money.md
 * - All amounts are strictly integer kobo (1 Naira = 100 kobo).
 * - Never use floating point or decimals for currency arithmetic.
 * - Format Naira with thousands separators (e.g. "₦5,000").
 * - Never do arithmetic on a formatted string.
 */

/**
 * Formats whole kobo into a display string in Naira with commas.
 * e.g. 500000 kobo -> "₦5,000"
 * e.g. 500050 kobo -> "₦5,000.50" (if partial kobo present)
 */
export function formatKobo(kobo: number): string {
  if (!Number.isInteger(kobo)) {
    throw new TypeError(`Expected integer kobo, received ${kobo}`);
  }

  const isNegative = kobo < 0;
  const absKobo = Math.abs(kobo);
  const wholeNaira = Math.floor(absKobo / 100);
  const remainderKobo = absKobo % 100;

  const formattedNaira = wholeNaira.toLocaleString('en-NG');

  let result = remainderKobo > 0
    ? `₦${formattedNaira}.${String(remainderKobo).padStart(2, '0')}`
    : `₦${formattedNaira}`;

  if (isNegative) {
    result = `-${result}`;
  }

  return result;
}

/**
 * Converts integer Naira into integer kobo.
 */
export function nairaToKobo(naira: number): number {
  if (!Number.isInteger(naira)) {
    throw new TypeError(`Expected integer naira, received ${naira}`);
  }
  return naira * 100;
}

/**
 * Extracts whole Naira from integer kobo (truncated).
 */
export function koboToWholeNaira(kobo: number): number {
  if (!Number.isInteger(kobo)) {
    throw new TypeError(`Expected integer kobo, received ${kobo}`);
  }
  return Math.floor(kobo / 100);
}

/**
 * Adds two kobo amounts safely ensuring integer arithmetic.
 */
export function addKobo(a: number, b: number): number {
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    throw new TypeError('addKobo arguments must be integers');
  }
  return a + b;
}

/**
 * Subtracts two kobo amounts safely ensuring integer arithmetic.
 */
export function subtractKobo(a: number, b: number): number {
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    throw new TypeError('subtractKobo arguments must be integers');
  }
  return a - b;
}
