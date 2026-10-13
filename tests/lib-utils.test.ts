import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  getLagosDate,
  getLagosMonth,
  addDays,
  diffDays,
  isDatePast,
  formatDateDisplay,
  LAGOS_TIMEZONE,
  DAY_BOUNDARY_HOUR,
} from '../src/lib/dates.ts';
import {
  formatKobo,
  nairaToKobo,
  koboToWholeNaira,
  addKobo,
  subtractKobo,
} from '../src/lib/money.ts';
import {
  redactDigits,
  sanitizeForLogs,
  DIGIT_REDACTION_PLACEHOLDER,
} from '../src/lib/redact.ts';

describe('src/lib/dates - Lagos Timezone & 4am Day Boundary', () => {
  it('correctly reports Lagos timezone constant and 4am boundary', () => {
    assert.equal(LAGOS_TIMEZONE, 'Africa/Lagos');
    assert.equal(DAY_BOUNDARY_HOUR, 4);
  });

  it('computes previous calendar day before 4:00 AM Lagos time', () => {
    // 2026-10-13 02:30:00 UTC = 03:30:00 Lagos (UTC+1), before 4:00 AM
    const earlyMorning = new Date('2026-10-13T02:30:00Z');
    const lagosDay = getLagosDate(earlyMorning);
    assert.equal(lagosDay, '2026-10-12');
  });

  it('computes current calendar day at or after 4:00 AM Lagos time', () => {
    // 2026-10-13 03:00:00 UTC = 04:00:00 Lagos (UTC+1), at 4:00 AM
    const morning = new Date('2026-10-13T03:00:00Z');
    const lagosDay = getLagosDate(morning);
    assert.equal(lagosDay, '2026-10-13');
  });

  it('adds calendar days correctly without timezone drift', () => {
    assert.equal(addDays('2026-10-13', 30), '2026-11-12');
    assert.equal(addDays('2026-12-30', 2), '2027-01-01');
  });

  it('computes calendar day differences accurately', () => {
    assert.equal(diffDays('2026-10-20', '2026-10-13'), 7);
    assert.equal(diffDays('2026-10-10', '2026-10-13'), -3);
  });

  it('evaluates date comparison without timestamps', () => {
    const fixedNow = new Date('2026-10-13T12:00:00Z');
    assert.equal(isDatePast('2026-10-12', fixedNow), true);
    assert.equal(isDatePast('2026-10-13', fixedNow), false);
    assert.equal(isDatePast('2026-10-14', fixedNow), false);
  });

  it('formats display dates nicely', () => {
    assert.equal(formatDateDisplay('2026-10-13'), '13 Oct 2026');
  });
});

describe('src/lib/money - Integer Kobo Arithmetic & Naira Formatting', () => {
  it('formats whole Naira with thousands separator', () => {
    assert.equal(formatKobo(500000), '₦5,000');
    assert.equal(formatKobo(15000000), '₦150,000');
    assert.equal(formatKobo(0), '₦0');
  });

  it('formats fractional kobo accurately when present', () => {
    assert.equal(formatKobo(500050), '₦5,000.50');
    assert.equal(formatKobo(75), '₦0.75');
  });

  it('formats negative balances accurately', () => {
    assert.equal(formatKobo(-250000), '-₦2,500');
  });

  it('rejects floating-point kobo amounts', () => {
    assert.throws(() => formatKobo(1234.5), TypeError);
    assert.throws(() => addKobo(100.5, 200), TypeError);
  });

  it('converts Naira to kobo and back safely', () => {
    assert.equal(nairaToKobo(5000), 500000);
    assert.equal(koboToWholeNaira(500099), 5000);
  });

  it('performs exact integer addition and subtraction', () => {
    assert.equal(addKobo(500000, 250000), 750000);
    assert.equal(subtractKobo(500000, 200000), 300000);
  });
});

describe('src/lib/redact - 5+ Digit Redaction & Log Sanitization', () => {
  it('replaces 5 or more consecutive digits with placeholder', () => {
    assert.equal(
      redactDigits('My phone number is 08012345678 and account is 12345'),
      `My phone number is ${DIGIT_REDACTION_PLACEHOLDER} and account is ${DIGIT_REDACTION_PLACEHOLDER}`
    );
  });

  it('preserves short digit sequences (under 5 digits)', () => {
    assert.equal(redactDigits('Room 104 at 9am, pin code is 1234'), 'Room 104 at 9am, pin code is 1234');
  });

  it('sanitizes objects and redacts PINs/tokens in logs', () => {
    const raw = {
      memberNumber: '10045',
      pin: '123456',
      notes: 'Called 08099887766 regarding membership',
      nested: { token: 'secret-xyz' },
    };

    const sanitized = sanitizeForLogs(raw) as any;
    assert.equal(sanitized.pin, '[REDACTED_SECRET]');
    assert.equal(sanitized.memberNumber, '[NUMBER]');
    assert.equal(sanitized.notes, `Called ${DIGIT_REDACTION_PLACEHOLDER} regarding membership`);
    assert.equal(sanitized.nested.token, '[REDACTED_SECRET]');
  });
});
