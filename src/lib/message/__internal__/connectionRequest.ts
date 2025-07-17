import { defineMessages } from "@/lib/message/define-messages";

export const connectionRequestMessages = defineMessages({
  REQUEST_SENT: { type: "success", text: "Connection request sent." },
  REQUEST_FAILED: { type: "error", text: "Failed to send connection request." },
  ACCEPT_SUCCESS: { type: "success", text: "Connection request accepted." },
  REJECT_SUCCESS: { type: "success", text: "Connection request rejected." },
  ACTION_FAILED: {
    type: "error",
    text: "Something went wrong. Please try again.",
  },
  ALREADY_CONNECTED: {
    type: "warning",
    text: "You are already connected with this user.",
  },
});
