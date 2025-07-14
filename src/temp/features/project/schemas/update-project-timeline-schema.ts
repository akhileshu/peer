import { z } from "zod";

export const updateProjectTimelineSchema = z.object({
  // add more fields here
}).strict(); // Using strict() to prevent unknown properties

export type ProjectTimeline = z.infer<typeof updateProjectTimelineSchema>;

