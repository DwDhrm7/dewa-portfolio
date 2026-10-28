import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const STUDIO_COOKIE = "dd_studio_session";
export const STUDIO_SESSION_SECONDS = 60 * 60 * 24 * 7;

// Fails closed: with no password configured, nobody can sign in.
function secret(): string | null {
  const value = process.env.WRITER_STUDIO_PASSWORD;
  return value && value.length >= 8 ? value : null;
}

export function studioConfigured(): boolean {
  return secret() !== null;
}

const digest = (value: string) => createHmac("sha256", "dd-studio-compare").update(value).digest();

function safeEqual(a: Buffer, b: Buffer): boolean {
  return a.length === b.length && timingSafeEqual(a, b);
}

export function passwordMatches(input: string): boolean {
  const password = secret();
  return password !== null && safeEqual(digest(input), digest(password));
}

const sign = (expires: string, key: string) => createHmac("sha256", key).update(`studio:${expires}`).digest("hex");

/** "<expiry>.<signature>": expires on its own, and changing the password invalidates every session. */
export function createSessionToken(now = Date.now()): string | null {
  const key = secret();
  if (!key) return null;
  const expires = String(Math.floor(now / 1000) + STUDIO_SESSION_SECONDS);
  return `${expires}.${sign(expires, key)}`;
}

export function verifySessionToken(token: string | undefined, now = Date.now()): boolean {
  const key = secret();
  if (!key || !token) return false;
  const [expires, signature, ...rest] = token.split(".");
  if (!expires || !signature || rest.length > 0 || !/^\d+$/.test(expires)) return false;
  if (Number(expires) * 1000 < now) return false;
  return safeEqual(Buffer.from(signature), Buffer.from(sign(expires, key)));
}

export async function isStudioAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(STUDIO_COOKIE)?.value);
}

/**
 * CSRF guard for state-changing requests. SameSite=Strict already blocks cross-site cookies;
 * this also rejects a mismatching Origin, and requests that send none from a browser.
 */
export function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return req.headers.get("sec-fetch-site") === null; // non-browser clients (curl) send neither
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

// --- login throttling (per server instance; a shared store would be needed to enforce it across instances) ---
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const attempts = new Map<string, { count: number; resetAt: number }>();

export function clientKey(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";
}

export function loginBlockedFor(key: string, now = Date.now()): number {
  const entry = attempts.get(key);
  if (!entry || entry.resetAt <= now) return 0;
  return entry.count >= MAX_ATTEMPTS ? Math.ceil((entry.resetAt - now) / 1000) : 0;
}

export function recordLoginFailure(key: string, now = Date.now()): void {
  const entry = attempts.get(key);
  if (!entry || entry.resetAt <= now) {
    if (attempts.size > 5000) attempts.clear();
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    entry.count += 1;
  }
}

export function clearLoginFailures(key: string): void {
  attempts.delete(key);
}
