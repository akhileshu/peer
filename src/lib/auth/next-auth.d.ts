// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Auth } from "googleapis";
import NextAuth from "next-auth";

type AuthError = "RefreshTokenError" | "TokenExpired";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      isProfileSetupDone: boolean;
    };
    accessToken?: string;
    error?: AuthError;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    access_token: string;
    expires_at: number;
    refresh_token?: string;
    error?: AuthError;
    isProfileSetupDone: boolean;
  }
}
