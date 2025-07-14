import { z } from "zod";

export const setupProfileSchema = z.object({
  domain: z.enum([
    "Frontend",
    "Backend",
    "DevOps",
    "Fullstack",
    "Mobile",
    "Data",
  ]),
  skills: z
    .string()
    .min(1)
    .transform((val) =>
      val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    ),
  interests: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : []
    ),
  intents: z
    .array(z.enum(["Learn", "Collaborate", "ContributeOrMentor", "GetHelp"]))
    .min(1, "Select at least one intent"),
  matchPreferences: z
    .array(z.enum(["SimilarInterest", "SimilarLevel", "SharedGoals"]))
    .optional()
    .default([]),

  preferredDays: z
    .array(
      z.enum([
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ])
    )
    .optional()
    .default([]),

  startTime: z
    .string()
    .regex(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/, "Invalid start time"),
  endTime: z
    .string()
    .regex(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/, "Invalid end time"),
  prefersWeekends: z.boolean().optional().default(false),
});
