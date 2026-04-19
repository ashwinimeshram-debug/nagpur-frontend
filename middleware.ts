// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token_cookie")?.value;

  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin";

  // 🔒 NOT LOGGED IN → BLOCK ADMIN PAGES
  if (isAdminRoute && !isLoginPage && !token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // 🔒 LOGGED IN → PREVENT LOGIN PAGE ACCESS
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};