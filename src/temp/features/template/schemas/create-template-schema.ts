import { z } from "zod";

export const createTemplateSchema = z.object({
  // add more fields here
}).strict(); // Using strict() to prevent unknown properties

export type Template = z.infer<typeof createTemplateSchema>;

