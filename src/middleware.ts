import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "./lib/__internal__/rateLimit";
import { authOptions } from "./lib/auth/authOptions";
import { isMobileUserAgent } from "@/lib/__internal__/isMobileUserAgent";

/**
 *
 * https://stackoverflow.com/questions/77115912/how-the-get-the-nextauth-session-in-a-middleware
 *
 */
export async function middleware(request: NextRequest) {
  const isMaintenance = process.env.MAINTENANCE_MODE === "true";
  const url = new URL(request.url);

  // Prevent redirect loop for the maintenance page itself
  if (isMaintenance && url.pathname !== "/maintenance") {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }
  const ip = request.headers.get("x-forwarded-for") || "local";

  if (process.env.NODE_ENV === "production" && rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const userAgent = request.headers.get("user-agent");

  if (isMobileUserAgent(userAgent) && url.pathname !== "/mobile-warning") {
    return NextResponse.redirect(new URL("/mobile-warning", request.url));
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    decode: authOptions.jwt?.decode,
  });
  // console.log({token});
  const pathname = request.nextUrl.pathname;

  // todo fix bug : token.isProfileSetupDone , currently this added field is unavailable in token , so it does not redirect
  // alternate solution :  Store isProfileSetupDone in a custom cookie at login.
  // Then read it directly in middleware using request.cookies.get("your-cookie-name").

  // seems this bug is inconsistent , now i am able to read latest token and redirect
  if (
    token &&
    token.isProfileSetupDone === false &&
    pathname !== "/profile/setup"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/profile/setup";
    return NextResponse.redirect(url);
  } else if (pathname === "/profile/setup" && token?.isProfileSetupDone) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname === "/profile/setup" && token && token.isProfileSetupDone) {
    // return NextResponse.redirect(new URL("/dashboard", request.url));
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
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
