import { authOptions } from "@/lib/auth/authOptions";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

/**
 * alternate way : return NextResponse.redirect(new URL("/dashboard", request.url));
 */
export function redirectTo(request: NextRequest, path: string): NextResponse {
  const url = request.nextUrl.clone();
  if (request.nextUrl.pathname === path) {
    // must exclude "/error" from nextjs middleware config paths
    url.pathname = "/error";
    url.searchParams.set("reason", "redirect-loop detected in middleware");
  } else url.pathname = path;
  return NextResponse.redirect(url);
}

/**
 * 
ref: middleware.getToken.error.doc.ts

https://stackoverflow.com/questions/77115912/how-the-get-the-nextauth-session-in-a-middleware

todo fix bug : token.isProfileSetupDone , currently this added field is unavailable in token , so it does not redirect
alternate solution :  Store isProfileSetupDone in a custom cookie at login.
Then read it directly in middleware using request.cookies.get("your-cookie-name").

seems this bug is inconsistent , now i am able to read latest token and redirect
 */
export async function getAuthToken(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    decode: authOptions.jwt?.decode,
  });
  return token;
}
