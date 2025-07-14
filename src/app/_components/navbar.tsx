"use client";

import { Components } from "@/components";
import AuthStatus from "@/lib/auth/__internal__/auth-status";

const { Link, HoverDropdown } = Components;

export default function Navbar() {
  return (
    <nav className="w-full p-1 flex justify-between items-center border-b">
      <Link title="Go to homepage" className="font-bold text-lg" href={"/"}>
        MyApp
      </Link>
      {/* <Link href={getInternalHref("post", "create")}>Create Post</Link> */}
      {/* <Search /> */}

      <div className="flex gap-4">
        <HoverDropdown ariaLabel="Connections Menu" trigger="Connections">
          <ul className="min-w-56 p-2 text-sm space-y-1">
            <Link
              title="Find new people to connect with"
              href="/connections/recommendations"
            >
              Explore Connections
            </Link>
            <Link href="/connections">My Connections</Link>
            <Link href="/connections/requests">connection requests</Link>
          </ul>
        </HoverDropdown>

        <Link href="/notifications">Notifications</Link>
        {/* <SendTestNotificationButton/> */}
      </div>

      <AuthStatus />
    </nav>
  );
}
