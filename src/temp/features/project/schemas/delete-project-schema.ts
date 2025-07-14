import { z } from "zod";

export const deleteProjectSchema = z.object({
  // add more fields here
}).strict(); // Using strict() to prevent unknown properties

export type Project = z.infer<typeof deleteProjectSchema>;

