import { prisma } from "@/server/db";
import { createAdminSessionToken, getRequestOrigin } from "@/server/admin";
import { hashPassword, verifyPassword } from "@/server/password";
import { adminCookieName } from "@/lib/adminSession";
import { NextResponse } from "next/server";

function redirectTo(origin: string, path: string) {
  return NextResponse.redirect(new URL(path, origin), 303);
}

export async function POST(req: Request) {
  const origin = await getRequestOrigin();

  const adminEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";
  const authSecret = process.env.AUTH_SECRET ?? "";
  if (!adminEmail || !adminPassword || !authSecret) {
    return redirectTo(origin, "/login?error=misconfigured");
  }

  const form = await req.formData();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const next = String(form.get("next") ?? "/admin");
  const safeNext = next.startsWith("/") ? next : "/admin";

  if (email !== adminEmail) {
    return redirectTo(origin, "/login?error=invalid");
  }

  const user =
    (await prisma.adminUser.findUnique({ where: { email: adminEmail } })) ??
    (await prisma.adminUser.create({
      data: {
        email: adminEmail,
        passwordHash: hashPassword(adminPassword),
      },
    }));

  if (!verifyPassword(password, user.passwordHash)) {
    return redirectTo(origin, "/login?error=invalid");
  }

  const token = await createAdminSessionToken({ adminUserId: user.id, email: user.email });
  const res = redirectTo(origin, safeNext);
  res.cookies.set(adminCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: origin.startsWith("https://"),
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
