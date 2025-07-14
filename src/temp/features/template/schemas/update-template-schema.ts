import { z } from "zod";

export const updateTemplateSchema = z.object({
  // add more fields here
}).strict(); // Using strict() to prevent unknown properties

export type Template = z.infer<typeof updateTemplateSchema>;

