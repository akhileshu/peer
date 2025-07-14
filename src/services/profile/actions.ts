"use server";
import { getServerUser } from "@/lib/auth/lib";
import { myPrisma } from "@/lib/utils/prisma";
import { getMessage } from "@/lib/message/get-message";
import {
  fetchError,
  fetchSuccess,
  handleFetchAction,
  handleMutateAction,
  mutateError,
  mutateErrorNotLoggedIn,
  mutateSuccess,
} from "@/lib/server-actions/handleAction";
import { setupProfileSchema } from "./zodSchema";
import { User } from "@prisma/client";
import { FetchResponse, MutateResponse } from "@/lib/server-actions/types";

export async function setupProfile(
  _: unknown,
  formData: FormData
): Promise<MutateResponse<undefined, typeof setupProfileSchema>> {
  return handleMutateAction(async () => {
    const user = await getServerUser();
    if (!user) return mutateErrorNotLoggedIn;

    const parsedFormData = Object.fromEntries(formData.entries());
    const arrayKeys = ["intents", "matchPreferences", "preferredDays"];
    // todo: need to extract formdata modificaton logic into helper
    arrayKeys.forEach((key) => {
      // @ts-expect-error: FormData.getAll returns FormDataEntryValue[] which isn't assignable directly to parsedFormData
      parsedFormData[key] = formData.getAll(key);
    });
    // @ts-expect-error: FormData
    parsedFormData.prefersWeekends = formData.get("prefersWeekends") === "on";

    const { data, error } = setupProfileSchema.safeParse(parsedFormData);
    if (error)
      return mutateError(
        getMessage("profile", "INVALID_INPUT"),
        error.formErrors.fieldErrors
      );
    const {
      domain,
      endTime,
      intents,
      interests,
      matchPreferences,
      preferredDays,
      prefersWeekends,
      skills,
      startTime,
    } = data;
    await myPrisma.user.update({
      where: { id: user.id },
      data: {
        domain,
        skills,
        interests,
        intents,
        matchPreferences,
        isProfileSetupDone: true,
        availability: {
          upsert: {
            create: { startTime, endTime, preferredDays, prefersWeekends },
            update: { startTime, endTime, preferredDays, prefersWeekends },
          },
        },
      },
    });
    //   revalidatePath("/");
    //   redirect("/");
    return mutateSuccess(getMessage("profile", "PROFILE_UPDATED"));
  });
}

export async function getProfileById(
  userId: string
): Promise<FetchResponse<User>> {
  return handleFetchAction(async () => {
    const user = await myPrisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) return fetchError(getMessage("profile", "PROFILE_UPDATED"));
    return fetchSuccess(user);
  });
}

// Get all public profiles
export async function getAllProfiles() {
  return await myPrisma.user.findMany({
    where: { isProfileSetupDone: true },
    select: { id: true, name: true, domain: true, skills: true, image: true },
  });
}

// Update own profile
export async function updateProfile(data: any) {
  const user = await getServerUser();

  return await myPrisma.user.update({
    where: { id: user.id },
    data,
  });
}

/*
// Send connect request
export async function sendConnectRequest(toUserId: string) {
  const user = await getServerUser();

  return await myPrisma.connectionRequest.create({
    data: {
      fromUserId: user.id,
      toUserId,
    },
  });
}

// Accept/reject
export async function respondToConnectRequest(
  requestId: string,
  accepted: boolean
) {
  return await myPrisma.connectionRequest.update({
    where: { id: requestId },
    data: {
      status: accepted ? "ACCEPTED" : "REJECTED",
    },
  });
}

// Get connections
export async function getConnectionsList() {
  const user = await getServerUser();

  return await myPrisma.connectionRequest.findMany({
    where: {
      OR: [
        { fromUserId: user.id, status: "ACCEPTED" },
        { toUserId: user.id, status: "ACCEPTED" },
      ],
    },
    include: { fromUser: true, toUser: true },
  });
}

*/