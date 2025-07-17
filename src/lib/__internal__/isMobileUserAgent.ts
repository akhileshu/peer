import { NextRequest } from "next/server";

export function isMobileUserAgent(request: NextRequest): boolean {
  const userAgent=request.headers.get("user-agent");
  if (!userAgent) return false;
  return /mobile|android|iphone|ipad/i.test(userAgent);
}
