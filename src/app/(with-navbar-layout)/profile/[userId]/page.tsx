import AppImg from "@/components/app/AppImg";
import { AppLink } from "@/components/app/link";
import { lib } from "@/lib";
import { meeting } from "@/services/meeting";
import { ScheduleMeetingDialog } from "@/services/meeting/components/ScheduleMeetingButton";
import { profile } from "@/services/profile";

type Params = Promise<{ userId: string }>;
const {
  actionHandler: { checkFetchResult },
} = lib;

export default async function Page({ params }: { params: Params }) {
  const { userId } = await params;

  const profileResult = checkFetchResult(
    await profile.actions.getById(userId),
    "user profile"
  );
  if (profileResult.failed) return profileResult.status;
  const { data: user } = profileResult.res;

  if (!user.email) return null;

  const isHavingMeetingResult = checkFetchResult(
    await meeting.actions.hasMeetingWithUser(user.email),
    "do you have meetings with this user"
  );
  if (isHavingMeetingResult.failed) return isHavingMeetingResult.status;

  return (
    <div className="p-6 max-w-xl space-y-4">
      <UserProfileDetails profileResponse={profileResult.res} />
      {isHavingMeetingResult.res.data && (
        <AppLink href={`/meetings?with=${user.id}`}>
          ✅ You have meetings with {user.name}
        </AppLink>
      )}
      <ScheduleMeetingDialog userEmail={user.email} />
    </div>
  );
}

export function UserProfileDetails({
  profileResponse,
}: {
  profileResponse: Awaited<ReturnType<typeof profile.actions.getById>>;
}) {
  const profileResult = checkFetchResult(profileResponse, "user profile");
  if (profileResult.failed) return profileResult.status;
  const { data: user } = profileResult.res;

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">{user.name || "Unnamed User"}</h1>
      <p className="text-gray-600">Email: {user.email || "N/A"}</p>
      <AppImg width={100} src={user.image} />
      <p>
        <strong>Domain:</strong> {user.domain || "N/A"}
      </p>
      <p>
        <strong>Skills:</strong> {user.skills.join(", ") || "None"}
      </p>
      <p>
        <strong>Interests:</strong> {user.interests.join(", ") || "None"}
      </p>
      <p>
        <strong>Intents:</strong> {user.intents.join(", ") || "None"}
      </p>
      <p>
        <strong>Match Preferences:</strong>{" "}
        {user.matchPreferences.join(", ") || "None"}
      </p>
      <p>
        <strong>Profile Setup:</strong>{" "}
        {user.isProfileSetupDone ? "Completed" : "Incomplete"}
      </p>
    </div>
  );
}
