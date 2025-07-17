import { defineMessages } from "@/lib/message/define-messages";

export const meetingMessages = defineMessages({
  FETCH_FAILED: { type: "error", text: "Could not fetch meeting events." },
  CHECK_FAILED: { type: "error", text: "Could not verify meeting." },
  CREATE_SUCCESS: { type: "success", text: "Meeting created successfully." },
  CREATE_FAILED: { type: "error", text: "Failed to create meeting." },
  UPDATE_SUCCESS: { type: "success", text: "Meeting updated successfully." },
  UPDATE_FAILED: { type: "error", text: "Failed to update meeting." },
  DELETE_SUCCESS: { type: "success", text: "Meeting deleted successfully." },
  DELETE_FAILED: { type: "error", text: "Failed to delete meeting." },
  AUTH_REQUIRED: {
    type: "warning",
    text: "Google Calendar access required. Please connect your account.",
  },
});
