import { myPrisma } from "@/lib/utils/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

/**
 * https://authjs.dev/guides/refresh-token-rotation#database-strategy
 */
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(myPrisma),
  providers: [
    GoogleProvider({
      allowDangerousEmailAccountLinking: true, //for error=OAuthAccountNotLinked :This lets users sign in with Google even if an existing user exists with that email, and NextAuth will auto-link it.
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar.events",
          // access_type: "offline",prompt: "consent" required for refresh token
          prompt: "consent", // select_account | consent
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      return "/feed"; // always redirect to /feed after login
    },
    async jwt({ token, user, account, trigger, session }) {
      const utils = {
        setTokenOnFirstLogin: () => {
          if (account && account.access_token && account.expires_at) {
            token.access_token = account.access_token;
            token.refresh_token = account.refresh_token;
            token.expires_at = account.expires_at;
            if (user) token.id = user.id;
          }
        },
        refreshExpiredToken: async () => {
          if (!token.refresh_token) return;
          try {
            const response = await fetch(
              "https://oauth2.googleapis.com/token",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                  client_id: process.env.GOOGLE_CLIENT_ID!,
                  client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                  grant_type: "refresh_token",
                  refresh_token: token.refresh_token,
                }),
              }
            );

            const refreshed = await response.json();

            if (!response.ok) throw refreshed;

            token.access_token = refreshed.access_token;
            token.expires_at = Math.floor(
              Date.now() / 1000 + refreshed.expires_in
            );
            token.refresh_token =
              refreshed.refresh_token ?? token.refresh_token;
          } catch (error) {
            console.error("🔴 Error refreshing access token", error);
            token.error = "RefreshTokenError";
          }
        },
        setUserInfoInToken: async () => {
          const dbUser = await myPrisma.user.findUnique({
            where: { id: token.id as string },
          });
          if (dbUser)
            token.isProfileSetupDone = dbUser.isProfileSetupDone ?? false;
        },
        getTokenStatus: () => {
          const isTokenValidOnSubsequentRequest =
            Date.now() < (token.expires_at ?? 0) * 1000;
          const shouldRefreshToken =
            !isTokenValidOnSubsequentRequest && !!token.refresh_token;
          return { isTokenValidOnSubsequentRequest, shouldRefreshToken };
        },
      };

      if (trigger === "update" && session.isProfileSetupDone !== undefined) {
        token.isProfileSetupDone = session.isProfileSetupDone;
        return token;
      }

      const { shouldRefreshToken, isTokenValidOnSubsequentRequest } =
        utils.getTokenStatus();
      if (account) utils.setTokenOnFirstLogin();
      else if (!isTokenValidOnSubsequentRequest && !shouldRefreshToken) {
        token.error = "TokenExpired";
        return token;
      } else if (shouldRefreshToken) await utils.refreshExpiredToken();

      await utils.setUserInfoInToken();

      return token;
    },

    async session({ session, token }) {
      function setSessionFromToken() {
        const { id, access_token, isProfileSetupDone, error } = token;
        // console.log({ token });
        session.user.id = id;
        session.accessToken = access_token;
        session.user.isProfileSetupDone = isProfileSetupDone;
        if (error) session.error = error;
      }
      setSessionFromToken();
      return session;
    },
  },
};
