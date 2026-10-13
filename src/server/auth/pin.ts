import crypto from 'node:crypto';

const SCRYPT_KEYLEN = 64;
const SCRYPT_OPTIONS: crypto.ScryptOptions = {
  N: 16384,
  r: 8,
  p: 1,
  maxmem: 32 * 1024 * 1024,
};

// Allowed alphabet for 8-char join codes: no 0, O, 1, I to prevent confusion on phone screens
const JOIN_CODE_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

/**
 * Validates a member PIN. Must be exactly 6 numeric digits.
 */
export function isValidPinFormat(pin: string): boolean {
  return /^\d{6}$/.test(pin.trim());
}

/**
 * Hashes a 6-digit PIN or staff password using memory-hard scrypt with a unique 16-byte salt.
 */
export async function hashSecret(secret: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.scrypt(secret, salt, SCRYPT_KEYLEN, SCRYPT_OPTIONS, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(`scrypt$${salt}$${derivedKey.toString('hex')}`);
    });
  });
}

/**
 * Verifies a PIN or password against a stored scrypt hash using timing-safe comparison.
 */
export async function verifySecret(secret: string, storedHash: string): Promise<boolean> {
  return new Promise((resolve) => {
    const parts = storedHash.split('$');
    if (parts.length !== 3 || parts[0] !== 'scrypt') {
      return resolve(false);
    }
    const salt = parts[1];
    const expectedKey = Buffer.from(parts[2], 'hex');

    crypto.scrypt(secret, salt, expectedKey.length, SCRYPT_OPTIONS, (err, derivedKey) => {
      if (err || derivedKey.length !== expectedKey.length) {
        return resolve(false);
      }
      try {
        const matches = crypto.timingSafeEqual(derivedKey, expectedKey);
        resolve(matches);
      } catch {
        resolve(false);
      }
    });
  });
}

/**
 * Generates an 8-character single-use join code excluding ambiguous characters (0, O, 1, I).
 */
export function generateJoinCode(): string {
  const bytes = crypto.randomBytes(8);
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += JOIN_CODE_ALPHABET[bytes[i] % JOIN_CODE_ALPHABET.length];
  }
  return code;
}

/**
 * Hashes a join code using SHA-256 for secure database lookup.
 */
export function hashJoinCode(rawCode: string): string {
  const clean = rawCode.trim().toUpperCase();
  return crypto.createHash('sha256').update(clean).digest('hex');
}

/**
 * Generates a 32-byte cryptographically secure session token and its SHA-256 hash.
 */
export function generateSessionToken(): { rawToken: string; tokenHash: string } {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  return { rawToken, tokenHash };
}

/**
 * Computes SHA-256 hash of an existing session token.
 */
export function hashSessionToken(rawToken: string): string {
  return crypto.createHash('sha256').update(rawToken.trim()).digest('hex');
}
