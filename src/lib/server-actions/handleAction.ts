/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppMessage } from "@/lib/message/define-messages";
import { getMessage } from "@/lib/message/get-message";
import { Prisma } from "@prisma/client";
import { z, ZodSchema } from "zod";
import {
  FetchResponse,
  MutateResponse,
} from "@/lib/server-actions/types";
import { getErrorMessage } from "@/lib/utils/utils";
import { FieldErrors } from "@/lib/server-actions/__internal__/types";

export const fetchSuccess = <T>(
  data: NonNullable<T>,
  message?: AppMessage
): FetchResponse<T> => ({
  ok: true,
  data,
  message: message ?? null,
});

export const fetchError = (message: AppMessage): FetchResponse<null> => ({
  ok: false,
  data: null,
  message,
});

export async function handleFetchAction<T>(
  fn: () => Promise<FetchResponse<T>>,
  fallbackErrorMessage = "We couldn’t load the data. Please refresh and try again."
): Promise<FetchResponse<T>> {
  try {
    return await fn();
  } catch (error) {
    console.log(getErrorMessage(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2001":
          return fetchError({
            type: "not_found",
            text: "The requested record was not found.",
          });
        case "P2025":
          return fetchError({
            type: "not_found",
            text: "Record not found. It might have been deleted.",
          });
        default:
          return fetchError({
            type: "error",
            text: `Database error: ${error.message}`,
          });
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      return fetchError({
        type: "validation",
        text: "Invalid query parameters. Please check your request.",
      });
    } else if (error instanceof Prisma.PrismaClientInitializationError) {
      return fetchError({
        type: "server",
        text: "Database connection issue. Please try again later.",
      });
    } else if (error instanceof Prisma.PrismaClientRustPanicError) {
      return fetchError({
        type: "server",
        text: "Unexpected database crash. Please try again later.",
      });
    }

    return fetchError({ type: "error", text: fallbackErrorMessage });
  }
}

export const mutateSuccess = <T>(
  message: AppMessage,
  data?: T
): MutateResponse<T> => ({
  ok: true,
  data: data ?? null,
  message,
  fieldErrors: null,
});

export const mutateError = <S extends z.ZodType<any> = any>(
  message: AppMessage,
  fieldErrors?: FieldErrors<S>
): MutateResponse<null, S> => ({
  ok: false,
  message,
  data: null,
  fieldErrors: fieldErrors ?? null,
});

export async function handleMutateAction<T, S extends z.ZodType<any>>(
  fn: () => Promise<MutateResponse<T, S>>,
  fallbackErrorMessage = "Something went wrong while submitting. Please try again."
): Promise<MutateResponse<T, S>> {
  try {
    return await fn();
  } catch (error) {
    console.log(getErrorMessage(error));
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      switch (error.code) {
        case "P2002":
          return mutateError<S>({
            type: "conflict",
            text: "Duplicate entry. Please use a unique value.",
          });
        case "P2025":
          return mutateError<S>({
            type: "not_found",
            text: "Record not found. It might have been deleted.",
          });
        default:
          return mutateError<S>({
            type: "error",
            text: `Database error: ${error.message}`,
          });
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      return mutateError<S>({
        type: "validation",
        text: "Invalid data. Please check your input.",
      });
    } else if (error instanceof Prisma.PrismaClientInitializationError) {
      return mutateError<S>({
        type: "server",
        text: "Database connection issue. Please try again later.",
      });
    } else if (error instanceof Prisma.PrismaClientRustPanicError) {
      return mutateError<S>({
        type: "server",
        text: "Unexpected database crash. Please try again later.",
      });
    }
    return mutateError<S>({ type: "error", text: fallbackErrorMessage });
  }
}

export const getFormValues = (formData: FormData) =>
  Object.fromEntries(formData.entries());

export const parseFormData = <T>(formData: FormData, schema: ZodSchema<T>) => {
  const { data, error } = schema.safeParse(getFormValues(formData));
  if (error) return { data: null, fieldErrors: error.formErrors.fieldErrors };
  return { data, fieldErrors: null };
};

const notLoggedInMessage = getMessage("auth", "NOT_LOGGED_IN");

export const fetchErrorNotLoggedIn = fetchError(notLoggedInMessage);
export const mutateErrorNotLoggedIn = mutateError(notLoggedInMessage);

export const initialState = {
  ok: false,
  data: null,
  fieldErrors: null,
  message: getMessage("common", "DEFAULT_MESSAGE"),
};
