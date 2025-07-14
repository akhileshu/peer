"use server";
import { getServerUser } from "@/lib/auth/lib";
import { getMessage } from "@/lib/message/get-message";
import {
  handleMutateAction,
  mutateError,
  mutateErrorNotLoggedIn,
  mutateSuccess,
} from "@/lib/server-actions/handleAction";
import { scheduleMeetingSchema } from "./zodSchema";
import { MutateResponse } from "@/lib/server-actions/types";
import { createMeetEvent } from "@/services/meeting/lib";

export async function scheduleMeeting(
  _: unknown,
  formData: FormData
): Promise<MutateResponse<undefined, typeof scheduleMeetingSchema>> {
  return handleMutateAction(async () => {
    const user = await getServerUser();
    if (!user) return mutateErrorNotLoggedIn;

    let parsedFormData = Object.fromEntries(formData.entries());
    if (
      typeof parsedFormData.startTime === "string" &&
      typeof parsedFormData.endTime === "string"
    ) {
      parsedFormData.startTime = new Date(
        parsedFormData.startTime
      ).toISOString();
      parsedFormData.endTime = new Date(parsedFormData.endTime).toISOString();
    }

    const { data, error } = scheduleMeetingSchema.safeParse(parsedFormData);
    if (error)
      return mutateError(
        getMessage("profile", "INVALID_INPUT"),
        error.formErrors.fieldErrors
      );

    const { inviteeEmail, startTime, endTime, summary, description } = data;

    try {
      await createMeetEvent({
        summary,
        description,
        startTime,
        endTime,
        attendees: [inviteeEmail], // can add `user.email` as well
      });

      return mutateSuccess(getMessage("profile", "PROFILE_UPDATED"));
    } catch (err) {
      console.error("Google Meet creation failed:", err);
      return mutateError(getMessage("profile", "PROFILE_UPDATED"));
    }
  });
}
