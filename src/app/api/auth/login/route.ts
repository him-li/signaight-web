import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/auth";
import { SERVER_URL } from "@/constants";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const form = new URLSearchParams({
    username: body.email ?? "",
    password: body.password ?? "",
  });
  const upstream = await fetch(`${SERVER_URL}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form,
    cache: "no-store",
  });
  const data = await upstream.json();
  if (!upstream.ok) return NextResponse.json(data, { status: upstream.status });
  const response = NextResponse.json({ user: data.user });
  response.cookies.set(SESSION_COOKIE_NAME, data.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 10,
  });
  return response;
}
