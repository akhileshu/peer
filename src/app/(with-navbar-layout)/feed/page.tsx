import Link from "next/link";
import { getServerUser } from "@/lib/auth/lib";
import { profile } from "@/services/profile";

export default async function Page() {
  const requestsResult = await profile.actions.getAll();
  const user = await getServerUser();

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">All Profiles</h1>
      {requestsResult.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
        <ul className="space-y-2">
          {requestsResult
            .filter((profile) => profile.id !== user.id)
            .map((profile) => (
              <li
                key={profile.id}
                className="border rounded p-3 hover:shadow transition"
              >
                <Link href={`/profile/${profile.id}`} className="block">
                  <p className="font-semibold">{profile.name || "Unnamed"}</p>
                  <p className="text-sm text-gray-500">
                    Domain: {profile.domain || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Skills: {profile.skills.join(", ") || "None"}
                  </p>
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
