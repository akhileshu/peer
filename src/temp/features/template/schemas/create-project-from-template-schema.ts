import { z } from "zod";

export const createProjectFromTemplateSchema = z.object({
  // add more fields here
}).strict(); // Using strict() to prevent unknown properties

export type ProjectFromTemplate = z.infer<typeof createProjectFromTemplateSchema>;

