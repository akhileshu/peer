"use client";

import { Components } from "@/components";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { useRouter } from "next/navigation";

const { Button } = Components.userInput;

export default function AuthStatus() {
  const { data: session } = useSession();
  if (session?.error === "RefreshTokenError") {
    signIn("google"); // Force sign in to obtain a new set of access and refresh tokens
    return;
  }
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
