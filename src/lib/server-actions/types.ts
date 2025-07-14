/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppMessage } from "@/lib/message/define-messages";
import { FieldErrors } from "@/lib/server-actions/__internal__/types";
import { z } from "zod";

export type FetchResponse<T> =
  | {
      ok: true;
      data: NonNullable<T>;
      message: AppMessage | null;
    }
  | {
      ok: false;
      data: null;
      message: AppMessage;
    };

export type MutateResponse<T = any, S extends z.ZodType<any> = any> =
  | {
      ok: true;
      data: T | null;
      message: AppMessage;
      fieldErrors: null;
    }
  | {
      ok: false;
      data: null;
      message: AppMessage;
      fieldErrors: FieldErrors<S>;
    };
