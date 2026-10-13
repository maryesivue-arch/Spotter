/**
 * Spotter Data Redaction Library
 * Rules: .agent/rules/ask-pipeline.md, .agent/rules/errors-and-logging.md
 * - Replace any string of five or more digits with a placeholder word.
 * - Stops personal phone numbers or amounts from reaching external AI models or leaking in logs.
 */

export const DIGIT_REDACTION_PLACEHOLDER = '[NUMBER]';

/**
 * Replaces any sequence of 5 or more digits with a redaction placeholder.
 */
export function redactDigits(
  text: string,
  placeholder: string = DIGIT_REDACTION_PLACEHOLDER
): string {
  if (!text || typeof text !== 'string') {
    return '';
  }
  return text.replace(/\d{5,}/g, placeholder);
}

/**
 * Sanitizes an arbitrary payload for safe logging without leaking digits or tokens.
 */
export function sanitizeForLogs(data: unknown): unknown {
  if (typeof data === 'string') {
    return redactDigits(data);
  }
  if (Array.isArray(data)) {
    return data.map((item) => sanitizeForLogs(item));
  }
  if (data !== null && typeof data === 'object') {
    const copy: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(data)) {
      const lowerKey = key.toLowerCase();
      if (
        lowerKey.includes('pin') ||
        lowerKey.includes('token') ||
        lowerKey.includes('password') ||
        lowerKey.includes('secret')
      ) {
        copy[key] = '[REDACTED_SECRET]';
      } else {
        copy[key] = sanitizeForLogs(val);
      }
    }
    return copy;
  }
  return data;
}
