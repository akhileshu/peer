"use server";

import {   FetchResponse,
  MutateResponse,
  fetchError,
  fetchErrorNotLoggedIn,
  fetchSuccess,
  handleFetchAction,
  handleMutateAction,
  mutateError,
  mutateErrorNotLoggedIn,
  mutateSuccess,
  parseFormData,  } from "@/lib/server-actions/handleAction";


import { getServerUser } from "@/lib/auth/lib";
import { myPrisma } from "@/lib/db/prisma";
import { getMessage } from "@/lib/message/lib/get-message";

import { createProjectSchema, editProjectSchema, deleteProjectSchema } from "../schemas";

import {
  checkLimit,
  incrementLimit,
} from "../../../lib/limit-db-writes/limitHandler";

export async function getProjects(): Promise<FetchResponse<unknown>> {
  return handleFetchAction(async () => {
    const projects = await myPrisma.project.findMany();
    return fetchSuccess(projects);
  });
}

export async function getProjectById(id: string): Promise<FetchResponse<unknown>> {
  return handleFetchAction(async () => {
    const project = await myPrisma.project.findUnique({
      where: { id },
    });
    return fetchSuccess(project);
  });
}

export async function createProject(_: unknown, formData: FormData): Promise<MutateResponse<undefined, typeof createProjectSchema>> {
  return handleMutateAction(async () => {
    const user = await getServerUser();
    if (!user) return mutateErrorNotLoggedIn;

    const { data, fieldErrors } = parseFormData(formData, createProjectSchema);
    if (fieldErrors) return mutateError(getMessage("project", "CREATE_ERROR"), fieldErrors);

    await myPrisma.project.create({ data: { ...data, userId: user.id } });
    return mutateSuccess(getMessage("project", "CREATE_SUCCESS"));
  });
}

export async function updateProject(_: unknown, formData: FormData): Promise<MutateResponse<undefined, typeof editProjectSchema>>  {
  return handleMutateAction(async () => {
    const user = await getServerUser();
    if (!user) return mutateErrorNotLoggedIn;

    const { data, fieldErrors } = parseFormData(formData, editProjectSchema);
    if (fieldErrors) return mutateError(getMessage("project", "UPDATE_ERROR"), fieldErrors);

    await myPrisma.project.update({ where: { id: data.id, userId: user.id }, data });
    return mutateSuccess(getMessage("project", "UPDATE_SUCCESS"));
  });
}

export async function deleteProject(_: unknown, formData: FormData): Promise<MutateResponse<undefined, typeof deleteProjectSchema>> {
  return handleMutateAction(async () => {
    const user = await getServerUser();
    if (!user) return mutateErrorNotLoggedIn;

    const { data, fieldErrors } = parseFormData(formData, deleteProjectSchema);
    if (fieldErrors) return mutateError(getMessage("project", "DELETE_ERROR"), fieldErrors);

    await myPrisma.project.delete({ where: { id: data.id, userId: user.id } });
    return mutateSuccess(getMessage("project", "DELETE_SUCCESS"));
  });
}
