import { lib } from "@/lib";
import { profile } from "@/services/profile";
import Link from "next/link";

export default async function Page() {
  let user;
  try {
    user = await lib.auth.getServerUser();
  } catch (err) {
    return (
      <p className="text-center text-red-500">
        Failed to fetch user session. Please log in again.
      </p>
    );
  }

  const profileResult = lib.actionHandler.checkFetchResult(
    await profile.actions.getAll(),
    "user profile's"
  );
  if (profileResult.failed) return profileResult.status;
  const { data: profiles } = profileResult.res;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">All Profiles</h1>
      {profiles.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
        <ul className="space-y-2">
          {profiles
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
