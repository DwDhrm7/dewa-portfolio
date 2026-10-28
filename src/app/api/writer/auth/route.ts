import { NextRequest, NextResponse } from "next/server";
import {
  STUDIO_COOKIE,
  STUDIO_SESSION_SECONDS,
  clearLoginFailures,
  clientKey,
  createSessionToken,
  isSameOrigin,
  isStudioAuthenticated,
  loginBlockedFor,
  passwordMatches,
  recordLoginFailure,
  studioConfigured,
} from "@/lib/studioAuth";

const noStore = { "Cache-Control": "no-store" };

export async function GET() {
  return NextResponse.json(
    { authenticated: await isStudioAuthenticated(), configured: studioConfigured() },
    { headers: noStore }
  );
}

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ authenticated: false, error: "Permintaan ditolak." }, { status: 403, headers: noStore });
  }

  const key = clientKey(req);
  const wait = loginBlockedFor(key);
  if (wait > 0) {
    return NextResponse.json(
      { authenticated: false, error: "Terlalu banyak percobaan. Coba lagi nanti." },
      { status: 429, headers: { ...noStore, "Retry-After": String(wait) } }
    );
  }

  const body: unknown = await req.json().catch(() => null);
  const password = typeof (body as { password?: unknown } | null)?.password === "string"
    ? (body as { password: string }).password.slice(0, 200)
    : "";
  const token = createSessionToken();

  if (!token || !passwordMatches(password)) {
    recordLoginFailure(key);
    await new Promise((resolve) => setTimeout(resolve, 600));
    return NextResponse.json({ authenticated: false }, { status: 401, headers: noStore });
  }

  clearLoginFailures(key);
  const res = NextResponse.json({ authenticated: true }, { headers: noStore });
  res.cookies.set(STUDIO_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: STUDIO_SESSION_SECONDS,
  });
  return res;
}

export async function DELETE(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ authenticated: false }, { status: 403, headers: noStore });
  }
  const res = NextResponse.json({ authenticated: false }, { headers: noStore });
  res.cookies.delete(STUDIO_COOKIE);
  return res;
}
