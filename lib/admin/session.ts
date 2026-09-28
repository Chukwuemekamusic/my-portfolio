// Signed admin session cookie. Uses Web Crypto only so it runs in both the
// Edge middleware and Node route handlers / server actions.

export const SESSION_COOKIE = "admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export type AdminSession = { login: string; exp: number };

const encoder = new TextEncoder();

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(input: string): Uint8Array {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4));
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be set (at least 32 characters)");
  }
  return secret;
}

async function hmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSessionToken(login: string): Promise<string> {
  const session: AdminSession = {
    login,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const payload = base64UrlEncode(encoder.encode(JSON.stringify(session)));
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(), encoder.encode(payload));
  return `${payload}.${base64UrlEncode(new Uint8Array(sig))}`;
}

export async function verifySessionToken(
  token: string | undefined
): Promise<AdminSession | null> {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  try {
    const valid = await crypto.subtle.verify(
      "HMAC",
      await hmacKey(),
      base64UrlDecode(sig),
      encoder.encode(payload)
    );
    if (!valid) return null;
    const session = JSON.parse(
      new TextDecoder().decode(base64UrlDecode(payload))
    ) as AdminSession;
    if (session.exp < Math.floor(Date.now() / 1000)) return null;
    // Re-check the allowlist so rotating ADMIN_GITHUB_USERNAME revokes old sessions.
    if (!isAllowedAdmin(session.login)) return null;
    return session;
  } catch {
    return null;
  }
}

/** Local dev without a GitHub OAuth app: allow a one-click login. Never in production. */
export function isDevLoginEnabled(): boolean {
  return (
    process.env.NODE_ENV === "development" && !process.env.GITHUB_CLIENT_ID
  );
}

export const DEV_LOGIN = "local-dev";

export function isAllowedAdmin(login: string): boolean {
  if (login === DEV_LOGIN) return isDevLoginEnabled();
  const allowed = process.env.ADMIN_GITHUB_USERNAME;
  return !!allowed && allowed.toLowerCase() === login.toLowerCase();
}
