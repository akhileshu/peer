export function isMobileUserAgent(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return /mobile|android|iphone|ipad/i.test(userAgent);
}
