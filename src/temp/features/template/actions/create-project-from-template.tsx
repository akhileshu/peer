"use server";

import {
  FetchResponse,
  MutateResponse,
  fetchSuccess,
  fetchError,
  handleFetchAction,
  handleMutateAction,
  mutateSuccess,
  mutateError,
  mutateErrorNotLoggedIn,
} from "@/lib/server-actions/handleAction";

import { getServerUser } from "@/lib/auth/lib";
import { myPrisma } from "@/lib/db/prisma";
import { getMessage } from "@/lib/message/lib/get-message";

// This is a create operation
export async function createProjectFromTemplate(): Promise<MutateResponse<unknown>> {
  return handleMutateAction(async () => {
    const user = await getServerUser();
    if (!user) return mutateErrorNotLoggedIn;

    // TODO: Implement logic for createProjectFromTemplate

    return mutateSuccess("CreateProjectFromTemplate success");
  });
}
