import { adminCookieName, signAdminSession, verifyAdminSession } from "@/lib/adminSession";
import { cookies, headers } from "next/headers";

export type AdminIdentity = {
  adminUserId: string;
  email: string;
};

export async function getAdminIdentity(): Promise<AdminIdentity | null> {
  const token = (await cookies()).get(adminCookieName())?.value ?? null;
  if (!token) return null;
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;
  const payload = await verifyAdminSession(token, secret);
  if (!payload) return null;
  return { adminUserId: payload.sub, email: payload.email };
}

export async function createAdminSessionToken(identity: AdminIdentity) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("Missing AUTH_SECRET");
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 60 * 60 * 24 * 7; // 7 days
  return signAdminSession({ sub: identity.adminUserId, email: identity.email, iat: now, exp }, secret);
}

export async function getRequestOrigin() {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}
