import { z } from "zod";

export const updatePhaseSchema = z.object({
  // add more fields here
}).strict(); // Using strict() to prevent unknown properties

export type Phase = z.infer<typeof updatePhaseSchema>;

