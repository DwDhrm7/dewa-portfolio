import { NextRequest, NextResponse } from "next/server";
import {
  STUDIO_COOKIE,
  STUDIO_SESSION_MAX_AGE,
  isStudioAuthenticated,
  passwordMatches,
  sessionToken,
} from "@/lib/studioAuth";

export async function GET() {
  return NextResponse.json({ authenticated: await isStudioAuthenticated() });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const password = typeof body?.password === "string" ? body.password : "";
  const token = sessionToken();

  if (!token || !passwordMatches(password)) {
    // Slow down guessing a little.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const res = NextResponse.json({ authenticated: true });
  res.cookies.set(STUDIO_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: STUDIO_SESSION_MAX_AGE,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ authenticated: false });
  res.cookies.delete(STUDIO_COOKIE);
  return res;
}
