/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

// we will follow - Using null Instead of a Conditional Property

type AllKeys<T> = T extends z.ZodType<any, any, any> ? keyof z.infer<T> : never;
export type FieldErrors<S extends z.ZodType<any>> =
  | {
      [P in AllKeys<S>]?: string[];
    }
  | null;
