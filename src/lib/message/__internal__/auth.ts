import { defineMessages } from "@/lib/message/define-messages";

export const authMessages = defineMessages({
  LOGIN_SUCCESS: { type: "success", text: "Logged in successfully!" },
  LOGIN_FAILED: { type: "error", text: "Invalid credentials." },
  SESSION_EXPIRED: {
    type: "warning",
    text: "Session expired. Please login again.",
  },
  NOT_LOGGED_IN: {
    type: "warning",
    text: "You are not logged in. Please log in to continue.",
  },
});
