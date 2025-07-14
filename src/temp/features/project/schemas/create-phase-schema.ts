import { z } from "zod";

export const createPhaseSchema = z.object({
  // add more fields here
}).strict(); // Using strict() to prevent unknown properties

export type Phase = z.infer<typeof createPhaseSchema>;

