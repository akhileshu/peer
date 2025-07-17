/*

? export async function setupProfile(
  _: unknown,
  formData: FormData
): Promise<MutateResponse<undefined, typeof setupProfileSchema>> {
  async function method(): Promise<
    MutateResponse<undefined, typeof setupProfileSchema>
  > {
    const user = await getServerUser();
    if (!user) return mutateErrorNotLoggedIn;

    const parsedFormData = Object.fromEntries(formData.entries());
    const arrayKeys = ["intents", "matchPreferences", "preferredDays"];

    // TODO: move to helper
    arrayKeys.forEach((key) => {
      // @ts-expect-error
      parsedFormData[key] = formData.getAll(key);
    });
    // @ts-expect-error
    parsedFormData.prefersWeekends = formData.get("prefersWeekends") === "on";

    const { data, error } = setupProfileSchema.safeParse(parsedFormData);
    if (error) {
      return mutateError(
        getMessage("profile", "INVALID_INPUT"),
        error.formErrors.fieldErrors
      );
    }

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

    return mutateSuccess(getMessage("profile", "PROFILE_UPDATED"));
  }

  return handleMutateAction(
    method,
    getMessage("profile", "PROFILE_UPDATE_FAILED").text
  );
}


? export async function getProfileById(
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

? export async function getProfileByIdV2(
  userId: string
) {
  async function method(): Promise<FetchResponse<User>> {
    const user = await myPrisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) return fetchError(getMessage("profile", "PROFILE_UPDATED"));
    return fetchSuccess(user);
  }
  return handleFetchAction(method, getMessage("profile", "PROFILE_NOT_FOUND").text);
}

? old pattern before checkFetchResult fn
  const profileResult = await profile.actions.getById(userId);
  const statusMessage = renderStatusMessage(profileResult, "cardTitle");
  if (statusMessage || !profileResult.ok) return statusMessage;
  const { data: user } = profileResult;
  
? new

  const profileResult = checkFetchResult(
    await profile.actions.getById(userId),
    "user profile"
  );
  if (profileResult.failed) return profileResult.status;
  const { data: user } = profileResult.res;

*/