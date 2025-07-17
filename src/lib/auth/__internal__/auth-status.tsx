"use client";

import { Components } from "@/components";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const { Button } = Components.userInput;

export default function AuthStatus() {
  const { data: session } = useSession();

  useEffect(() => {
    const shouldForceLogin = !session?.user?.id ||
      session?.error === "TokenExpired" ||
      session?.error === "RefreshTokenError"
    if (shouldForceLogin) {
      toast.error(
        `${
          session?.error || "You are not Logged In"
        }. Redirecting you to sign in again.`
      );
      setTimeout(() => {
        signIn("google");
      }, 2000);
    }
  }, [session]);

  return (
    <div>
      {session ? (
        <div className="flex gap-1 items-center">
          <Components.Link
            title="my profile"
            disableTransition
            disableUnderline
            href={"/profile"}
          >
            <Image
              alt="user-img"
              src={session.user.image}
              width={40}
              height={40}
              className="aspect-square rounded-full"
            />
          </Components.Link>
          <LogoutButton />
        </div>
      ) : (
        <Button disabled={false} onClick={() => signIn("google")}>
          Sign In with Google
        </Button>
      )}
    </div>
  );
}

function LogoutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await signOut({ redirect: false });
    router.refresh(); // Clear client-side cache and re-render
  }

  return (
    <Button disabled={false} onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}

function PopupBeforeForceLogin() {
  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded shadow">
      Session expired. Re-authenticating...
    </div>
  );
}
