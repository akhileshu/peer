import { z } from "zod";

export const updateFeatureSchema = z.object({
  // add more fields here
}).strict(); // Using strict() to prevent unknown properties

export type Feature = z.infer<typeof updateFeatureSchema>;

