"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

// ✅ Issue:
// we are not getting custom added properties in session 
// reason and fix : we were not passing authOptions for SessionProvider


export default function AuthSessionProvider({
  children,
  session,
}: {
  children: ReactNode;
  session?: Session | null | undefined;
}) {
  
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
