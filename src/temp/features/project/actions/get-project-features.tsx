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

// This is a read operation
export async function getProjectFeatures(): Promise<FetchResponse<unknown>> {
  return handleFetchAction(async () => {
    const user = await getServerUser();
    if (!user) return fetchError("Not logged in");

    // TODO: Implement logic for getProjectFeatures

    return fetchSuccess({ result: "TODO: replace with real data" });
  });
}
