const COOKIE_NAME = "lp_admin";

type AdminSessionPayload = {
  sub: string; // adminUserId
  email: string;
  iat: number; // epoch seconds
  exp: number; // epoch seconds
};

function b64UrlEncode(bytes: Uint8Array) {
  const str =
    typeof Buffer !== "undefined"
      ? Buffer.from(bytes).toString("base64")
      : btoa(String.fromCharCode(...Array.from(bytes)));
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function b64UrlDecode(str: string) {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/") + pad;
  if (typeof Buffer !== "undefined") return new Uint8Array(Buffer.from(b64, "base64"));
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function hmacSha256(key: string, message: string) {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(message));
  return new Uint8Array(sig);
}

export function adminCookieName() {
  return COOKIE_NAME;
}

export async function signAdminSession(payload: AdminSessionPayload, secret: string) {
  const json = JSON.stringify(payload);
  const payloadB64 = b64UrlEncode(new TextEncoder().encode(json));
  const sigBytes = await hmacSha256(secret, payloadB64);
  const sigB64 = b64UrlEncode(sigBytes);
  return `${payloadB64}.${sigB64}`;
}

export async function verifyAdminSession(token: string, secret: string): Promise<AdminSessionPayload | null> {
  const [payloadB64, sigB64] = token.split(".");
  if (!payloadB64 || !sigB64) return null;

  const expectedSig = await hmacSha256(secret, payloadB64);
  const gotSig = b64UrlDecode(sigB64);
  if (!constantTimeEqual(expectedSig, gotSig)) return null;

  let payload: AdminSessionPayload;
  try {
    payload = JSON.parse(new TextDecoder().decode(b64UrlDecode(payloadB64))) as AdminSessionPayload;
  } catch {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  if (!payload?.sub || !payload?.email || typeof payload.exp !== "number") return null;
  if (payload.exp <= now) return null;
  return payload;
}
