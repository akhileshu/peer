import { z } from "zod";

export const scheduleMeetingSchema = z.object({
  inviteeEmail: z.string().email(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  summary: z.string().min(1).optional(),
  description: z.string().optional(),
});
