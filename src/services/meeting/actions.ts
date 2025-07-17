"use server";
import { getServerUser } from "@/lib/auth/lib";
import { getMessage } from "@/lib/message/get-message";
import {
  fetchSuccess,
  handleFetchAction,
  handleMutateAction,
  mutateError,
  mutateErrorNotLoggedIn,
  mutateSuccess,
} from "@/lib/server-actions/handleAction";
import { scheduleMeetingSchema } from "./zodSchema";
import { FetchResponse, MutateResponse } from "@/lib/server-actions/types";
import { createMeetEvent, getGoogleEvents, hasMeetingWithUser } from "@/services/meeting/lib";
import { calendar_v3 } from "googleapis";

export async function scheduleMeeting(
  _: unknown,
  formData: FormData
){
  async function method(): Promise<
    MutateResponse<undefined, typeof scheduleMeetingSchema>
  > { 
    const user = await getServerUser();
  if (!user) return mutateErrorNotLoggedIn;

  let parsedFormData = Object.fromEntries(formData.entries());
  if (
    typeof parsedFormData.startTime === "string" &&
    typeof parsedFormData.endTime === "string"
  ) {
    parsedFormData.startTime = new Date(parsedFormData.startTime).toISOString();
    parsedFormData.endTime = new Date(parsedFormData.endTime).toISOString();
  }

  const { data, error } = scheduleMeetingSchema.safeParse(parsedFormData);
  if (error)
    return mutateError(
      getMessage("profile", "INVALID_INPUT"),
      error.formErrors.fieldErrors
    );

  const { inviteeEmail, startTime, endTime, summary, description } = data;

  await createMeetEvent({
    summary,
    description,
    startTime,
    endTime,
    attendees: [inviteeEmail],
  });
  return mutateSuccess(getMessage("meeting", "CREATE_SUCCESS"));
}
  return handleMutateAction(
    method,
    getMessage("meeting", "CREATE_FAILED").text
  );
}


export async function getGoogleEventsAction() {
  async function method(): Promise<
    FetchResponse<calendar_v3.Schema$Event[]>
  > {
    const events = await getGoogleEvents();
    return fetchSuccess(events);
  }

  return handleFetchAction(method, getMessage("meeting", "FETCH_FAILED").text);
}

export async function hasMeetingWithUserAction(
  targetEmail: string
) {
  async function method(): Promise<FetchResponse<boolean>> {
    const hasMeeting = await hasMeetingWithUser(targetEmail);
    return fetchSuccess(hasMeeting);
  }

  return handleFetchAction(method, getMessage("meeting", "CHECK_FAILED").text);
}
