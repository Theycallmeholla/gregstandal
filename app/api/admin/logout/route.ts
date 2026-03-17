import { adminCookieName } from "@/lib/adminSession";
import { getRequestOrigin } from "@/server/admin";
import { NextResponse } from "next/server";

export async function POST() {
  const origin = getRequestOrigin();
  const res = NextResponse.redirect(new URL("/login", origin), 303);
  res.cookies.set(adminCookieName(), "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}

