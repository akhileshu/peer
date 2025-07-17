/*

   * error - (middleware)/node_modules/oidc-token-hash/lib/shake256.js (3:0) @ <unknown>
    error - Cannot read properties of undefined (reading 'substr')
    - occured when using lib.auth.authOptions insted of authOptions directly
    - reason : accessing a runtime-composed object (lib) in middleware
   * https://stackoverflow.com/questions/73588525/why-am-i-getting-this-error-when-using-next-js-middleware

export async function getAuthToken(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    decode: authOptions.jwt?.decode,
  });
  return token;
}

const token = await getAuthToken(request);

========== more details ========

decode: lib.auth.authOptions.jwt?.decode

You’re accessing a runtime-composed object (lib) in middleware. But middleware in Next.js:

Runs in an Edge runtime (not Node.js fully)
Loads only ES modules, with strict bundling
Does not support everything that normal server functions do

Middleware code is bundled separately.
lib is a composed object; if anything in the chain is not serializable or edge-compatible, it breaks.
Importing only authOptions directly avoids loading extra code (like myPrisma, DB functions, etc.) not supported in middleware.

So inside middleware, your lib.auth.authOptions.jwt?.decode becomes undefined, or it points to a partial/incomplete function (e.g., it may miss substr() internally — hence the error).

| Access Pattern                             | Middleware Safe? | Notes                                     |
| ------------------------------------------ | ---------------- | ----------------------------------------- |
| `lib.auth.authOptions.jwt?.decode`         | ❌ No             | Breaks in Edge, causes `undefined.substr` |
| `import { authOptions } from "@/lib/auth"` | ✅ Yes            | Loads only needed code safely             |












*/
