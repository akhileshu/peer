import { z } from "zod";

export const createProjectSchema = z.object({
  // add more fields here
}).strict(); // Using strict() to prevent unknown properties

export type Project = z.infer<typeof createProjectSchema>;

