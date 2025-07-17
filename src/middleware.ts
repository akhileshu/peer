import { isMobileUserAgent } from "@/lib/__internal__/isMobileUserAgent";
import { getAuthToken, redirectTo } from "@/lib/__internal__/middleware-utils";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "./lib/__internal__/rateLimit";

export async function middleware(request: NextRequest) {
  const isMaintenance = process.env.MAINTENANCE_MODE === "true";
  const { pathname } = request.nextUrl;

  if (isMaintenance && pathname !== "/maintenance")
    return redirectTo(request, "/maintenance");

  if (process.env.NODE_ENV === "production" && rateLimit(request)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  if (isMobileUserAgent(request) && pathname !== "/mobile-warning") {
    return redirectTo(request, "/mobile-warning");
  }

  const token = await getAuthToken(request);

  if (!token?.isProfileSetupDone && pathname !== "/profile/setup") {
    return redirectTo(request, "/profile/setup");
  } else if (pathname === "/profile/setup" && token?.isProfileSetupDone) {
    return redirectTo(request, "/dashboard");
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|error).*)",
  ],
};
