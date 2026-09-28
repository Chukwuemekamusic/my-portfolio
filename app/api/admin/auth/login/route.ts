import { NextResponse, type NextRequest } from "next/server";
import {
  DEV_LOGIN,
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  createSessionToken,
  isDevLoginEnabled,
} from "@/lib/admin/session";

const OAUTH_STATE_COOKIE = "admin_oauth_state";

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;

  if (isDevLoginEnabled()) {
    const response = NextResponse.redirect(new URL("/admin", origin));
    response.cookies.set(SESSION_COOKIE, await createSessionToken(DEV_LOGIN), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
    });
    return response;
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "GITHUB_CLIENT_ID is not configured" },
      { status: 500 }
    );
  }

  const state = crypto.randomUUID();
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("redirect_uri", `${origin}/api/admin/auth/callback`);
  authorize.searchParams.set("scope", "read:user");
  authorize.searchParams.set("state", state);
  authorize.searchParams.set("allow_signup", "false");

  const response = NextResponse.redirect(authorize);
  response.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/admin/auth",
    maxAge: 600,
  });
  return response;
}
