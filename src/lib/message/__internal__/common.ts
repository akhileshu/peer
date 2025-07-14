import { defineMessages } from "@/lib/message/define-messages";

export const commonMessages = defineMessages({
  FETCH_FAILED: { type: "error", text: "Failed to load data." },
  EMPTY_STATE: { type: "info", text: "Nothing to display yet." },
  DEFAULT_MESSAGE: { type: "info", text: "No message available." },
  LIMIT_CHECK_FAILED: {
    type: "error",
    text: "Something went wrong while verifying limits.",
  },
});
