// Single public profile view

import { Components } from "@/components";
import { ScheduleMeetingDialog } from "@/services/meeting/components/ScheduleMeetingButton";
import { hasMeetingWithUser } from "@/services/meeting/lib";
import { profile } from "@/services/profile";


type Params = Promise<{ userId: string }>;

export default async function Page({ params }: { params: Params }) {
  const { userId } = await params;
  const profileResult = await profile.actions.getById(userId);
  const statusMessage =  Components.utils.renderStatusMessage(profileResult, "cardTitle");
  if (statusMessage || !profileResult.ok) return statusMessage;

  const { data: user } = profileResult;
  if(!user.email) return null;
  const isHavingMeeting = await hasMeetingWithUser(user.email);

  return (
    <div className="p-6 max-w-xl space-y-4">
      <UserProfileDetails profileResult={profileResult} />
      {isHavingMeeting && (
        <Components.Link href={`/meetings?with=${user.id}`}>
          ✅ You have meetings with {user.name}
        </Components.Link>
      )}
      <ScheduleMeetingDialog userEmail={user.email} />
    </div>
  );
}

export function UserProfileDetails({
  profileResult,
}: {
  profileResult: Awaited<ReturnType<typeof profile.actions.getById>>;
}) {
  const statusMessage = Components.utils.renderStatusMessage(
    profileResult,
    "cardTitle"
  );
  if (statusMessage || !profileResult.ok) return statusMessage;

  const { data: user } = profileResult;
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">{user.name || "Unnamed User"}</h1>
      <p className="text-gray-600">Email: {user.email || "N/A"}</p>
      <Components.Image width={100} src={user.image} />
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
