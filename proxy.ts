import { Roles } from "@/contants/roles";
import { userService } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export const proxy = async (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;

  let isAuthenticated = false;
  let userRole: string | null = null;

  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    userRole = data.user.role;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isAdmin = userRole === Roles.admin;
  const isProvider = userRole === Roles.provider;
  const isUser = userRole === Roles.user;

  if (isAdmin) {
    if (
      pathName.startsWith("/dashboard") ||
      pathName.startsWith("/provider-dashboard")
    ) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  if (isProvider) {
    if (
      pathName.startsWith("/dashboard") ||
      pathName.startsWith("/admin-dashboard")
    ) {
      return NextResponse.redirect(new URL("/provider-dashboard", request.url));
    }
  }

  if (isUser) {
    if (
      pathName.startsWith("/admin-dashboard") ||
      pathName.startsWith("/provider-dashboard")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/provider-dashboard",
    "/provider-dashboard/:path*",
  ],
};
