import { APP_SETTINGS } from "@/lib/utils/utils";
import { User } from "@prisma/client";

export type LimitField = keyof Pick<
  User,
  // @ts-expect-error Reason: below are test fields , doesnot exist on User model , replace as per requirement.
  "totalPostsCreated" | "totalPostsUpdated" | "totalBookmarksAdded"
>;
type LimitKey = keyof (typeof APP_SETTINGS)["limits"];

// type MessageCategory =keyof Pick<typeof appMessages, "post" | "bookmark">; // "post" | "bookmark"
export const LIMIT_MAPPING: Record<LimitField, LimitKey> = {
  totalPostsCreated: "POSTS_CREATE",
  totalPostsUpdated: "POSTS_UPDATE",
  totalBookmarksAdded: "MAX_BOOKMARKS",
};