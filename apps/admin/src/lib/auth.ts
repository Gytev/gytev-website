/**
 * Session admin signée HMAC-SHA256, sans dépendance externe.
 * Format du token : "<expiration_ms>.<hmac_hex(expiration)>"
 * Compatible Edge Runtime (Web Crypto uniquement) → utilisable dans le middleware.
 */

export const SESSION_COOKIE = "gytev_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 jours

const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function hmac(payload: string): Promise<string | null> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return toHex(signature);
}

/** Comparaison en temps constant de deux chaînes hexadécimales. */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function isAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_SESSION_SECRET && process.env.ADMIN_PASSWORD);
}

export async function createSessionToken(): Promise<string> {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const signature = await hmac(String(expiresAt));
  if (!signature) throw new Error("ADMIN_SESSION_SECRET manquant");
  return `${expiresAt}.${signature}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token || !process.env.ADMIN_SESSION_SECRET) return false;
  const [expiresAt, signature] = token.split(".");
  const expires = Number(expiresAt);
  if (!expires || Number.isNaN(expires) || expires < Date.now() || !signature) return false;
  const expected = await hmac(String(expires));
  return Boolean(expected && constantTimeEqual(signature, expected));
}

/** Vérifie le mot de passe saisi contre ADMIN_PASSWORD (temps constant). */
export async function verifyPassword(candidate: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(candidate));
  const reference = await crypto.subtle.digest("SHA-256", encoder.encode(expected));
  return constantTimeEqual(toHex(digest), toHex(reference));
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
  maxAge: SESSION_TTL_MS / 1000,
} as const;
