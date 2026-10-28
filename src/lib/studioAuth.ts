import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const STUDIO_COOKIE = "dd_studio_session";
export const STUDIO_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

// Fails closed: with no password configured, nobody can sign in.
function studioPassword(): string | null {
  const value = process.env.WRITER_STUDIO_PASSWORD;
  return value && value.length > 0 ? value : null;
}

function digest(value: string): Buffer {
  return createHmac("sha256", "dd-studio-compare").update(value).digest();
}

export function passwordMatches(input: string): boolean {
  const password = studioPassword();
  if (!password) return false;
  return timingSafeEqual(digest(input), digest(password));
}

// Derived from the password, so changing the password signs every session out.
export function sessionToken(): string | null {
  const password = studioPassword();
  if (!password) return null;
  return createHmac("sha256", password).update("writer-studio-session-v1").digest("hex");
}

export async function isStudioAuthenticated(): Promise<boolean> {
  const expected = sessionToken();
  if (!expected) return false;
  const store = await cookies();
  const actual = store.get(STUDIO_COOKIE)?.value;
  if (!actual || actual.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}
