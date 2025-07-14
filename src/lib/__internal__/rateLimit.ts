const RATE_LIMIT = 30; // Max requests per minute
const EXPIRY_TIME = 60 * 1000; // 1 minute
const requestMap = new Map<string, { count: number; timestamp: number }>();

export function rateLimit(ip: string): boolean {
  const now = Date.now();
  const requestInfo = requestMap.get(ip) || { count: 0, timestamp: now };

  if (now - requestInfo.timestamp > EXPIRY_TIME) {
    requestMap.set(ip, { count: 1, timestamp: now });
    return false; // Allowed
  }

  requestInfo.count += 1;
  requestMap.set(ip, requestInfo);

  return requestInfo.count > RATE_LIMIT; // Returns true if rate limit exceeded
}
