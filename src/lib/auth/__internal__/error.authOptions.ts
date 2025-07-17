/**
 * Module not found: Can't resolve 'child_process'
./node_modules/google-auth-library/build/src/auth/googleauth.js (17:25)

Module not found: Can't resolve 'child_process'
  15 | Object.defineProperty(exports, "__esModule", { value: true });
  16 | exports.GoogleAuth = exports.GoogleAuthExceptionMessages = void 0;
> 17 | const child_process_1 = require("child_process");
 */
/*
import { myPrisma } from "@/lib/utils/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { google } from "googleapis";

async function refreshAccessToken(refreshToken: string) {
  try {
    const client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    // Set the refresh token in credentials
    client.setCredentials({ refresh_token: refreshToken });

    // This triggers automatic refresh if needed
    const { token: accessToken } = await client.getAccessToken();

    const creds = client.credentials;

    return {
      accessToken,
      accessTokenExpires: Date.now() + (creds.expiry_date ?? 3600_000),
      refreshToken: creds.refresh_token ?? refreshToken, // keep existing if not returned
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return null;
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(myPrisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar.events",
          prompt: "consent", // ensures refresh_token on every login
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // Triggered manually (optional field sync)
      if (trigger === "update" && session.isProfileSetupDone !== undefined) {
        token.isProfileSetupDone = session.isProfileSetupDone;
        return token;
      }

      // On initial sign-in
      if (account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.accessTokenExpires = Date.now() + account.expires_at! * 1000;
      }

      // If token is expired and we have refresh_token -> refresh
      if (
        token.accessTokenExpires &&
        Date.now() >= token.accessTokenExpires &&
        token.refresh_token
      ) {
        const refreshed = await refreshAccessToken(
          token.refresh_token as string
        );
        if (refreshed) {
          token.access_token = refreshed.accessToken;
          token.accessTokenExpires = refreshed.accessTokenExpires;
          token.refresh_token = refreshed.refreshToken;
        }
      }

      // Attach user.id and profile setup status
      if (user) token.id = user.id;
      if (token.id) {
        const dbUser = await myPrisma.user.findUnique({
          where: { id: token.id as string },
        });
        if (dbUser)
          token.isProfileSetupDone = dbUser.isProfileSetupDone ?? false;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) session.user.id = token.id as string;
      if (session && token.access_token)
        session.accessToken = token.access_token;
      if (session.user && token.isProfileSetupDone !== undefined)
        session.user.isProfileSetupDone = token.isProfileSetupDone as boolean;
      return session;
    },
  },
};

*/