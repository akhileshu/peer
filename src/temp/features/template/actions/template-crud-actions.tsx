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

import { createTemplateSchema, editTemplateSchema, deleteTemplateSchema } from "../schemas";

import {
  checkLimit,
  incrementLimit,
} from "../../../lib/limit-db-writes/limitHandler";

export async function getTemplates(): Promise<FetchResponse<unknown>> {
  return handleFetchAction(async () => {
    const templates = await myPrisma.template.findMany();
    return fetchSuccess(templates);
  });
}

export async function getTemplateById(id: string): Promise<FetchResponse<unknown>> {
  return handleFetchAction(async () => {
    const template = await myPrisma.template.findUnique({
      where: { id },
    });
    return fetchSuccess(template);
  });
}

export async function createTemplate(_: unknown, formData: FormData): Promise<MutateResponse<undefined, typeof createTemplateSchema>> {
  return handleMutateAction(async () => {
    const user = await getServerUser();
    if (!user) return mutateErrorNotLoggedIn;

    const { data, fieldErrors } = parseFormData(formData, createTemplateSchema);
    if (fieldErrors) return mutateError(getMessage("template", "CREATE_ERROR"), fieldErrors);

    await myPrisma.template.create({ data: { ...data, userId: user.id } });
    return mutateSuccess(getMessage("template", "CREATE_SUCCESS"));
  });
}

export async function updateTemplate(_: unknown, formData: FormData): Promise<MutateResponse<undefined, typeof editTemplateSchema>>  {
  return handleMutateAction(async () => {
    const user = await getServerUser();
    if (!user) return mutateErrorNotLoggedIn;

    const { data, fieldErrors } = parseFormData(formData, editTemplateSchema);
    if (fieldErrors) return mutateError(getMessage("template", "UPDATE_ERROR"), fieldErrors);

    await myPrisma.template.update({ where: { id: data.id, userId: user.id }, data });
    return mutateSuccess(getMessage("template", "UPDATE_SUCCESS"));
  });
}

export async function deleteTemplate(_: unknown, formData: FormData): Promise<MutateResponse<undefined, typeof deleteTemplateSchema>> {
  return handleMutateAction(async () => {
    const user = await getServerUser();
    if (!user) return mutateErrorNotLoggedIn;

    const { data, fieldErrors } = parseFormData(formData, deleteTemplateSchema);
    if (fieldErrors) return mutateError(getMessage("template", "DELETE_ERROR"), fieldErrors);

    await myPrisma.template.delete({ where: { id: data.id, userId: user.id } });
    return mutateSuccess(getMessage("template", "DELETE_SUCCESS"));
  });
}
