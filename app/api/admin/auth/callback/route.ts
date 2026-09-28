import { NextResponse, type NextRequest } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  createSessionToken,
  isAllowedAdmin,
} from "@/lib/admin/session";

const OAUTH_STATE_COOKIE = "admin_oauth_state";

function fail(origin: string, reason: string) {
  const url = new URL("/admin/login", origin);
  url.searchParams.set("error", reason);
  const response = NextResponse.redirect(url);
  response.cookies.delete({ name: OAUTH_STATE_COOKIE, path: "/api/admin/auth" });
  return response;
}

export async function GET(request: NextRequest) {
  const { origin, searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const expectedState = request.cookies.get(OAUTH_STATE_COOKIE)?.value;

  if (!code || !state || !expectedState || state !== expectedState) {
    return fail(origin, "state");
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${origin}/api/admin/auth/callback`,
    }),
    cache: "no-store",
  });
  const tokenJson = (await tokenRes.json()) as { access_token?: string };
  if (!tokenJson.access_token) return fail(origin, "token");

  const userRes = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokenJson.access_token}`,
      Accept: "application/vnd.github+json",
    },
    cache: "no-store",
  });
  if (!userRes.ok) return fail(origin, "user");
  const user = (await userRes.json()) as { login?: string };

  if (!user.login || !isAllowedAdmin(user.login)) {
    return fail(origin, "forbidden");
  }

  const response = NextResponse.redirect(new URL("/admin", origin));
  response.cookies.set(SESSION_COOKIE, await createSessionToken(user.login), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  response.cookies.delete({ name: OAUTH_STATE_COOKIE, path: "/api/admin/auth" });
  return response;
}
