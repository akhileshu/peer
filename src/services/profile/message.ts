import { defineMessages } from "@/lib/message/define-messages";

export const profileMessages = defineMessages({
  PROFILE_CREATED: {
    type: "success",
    text: "Profile created successfully!",
  },
  PROFILE_UPDATED: {
    type: "success",
    text: "Profile updated successfully!",
  },
  PROFILE_NOT_FOUND: {
    type: "error",
    text: "Profile not found.",
  },
  UNAUTHORIZED_ACCESS: {
    type: "error",
    text: "You are not authorized to perform this action.",
  },
  CONNECT_REQUEST_SENT: {
    type: "success",
    text: "Connection request sent.",
  },
  CONNECT_ALREADY_EXISTS: {
    type: "warning",
    text: "You have already sent a request or are already connected.",
  },
  CONNECT_ACCEPTED: {
    type: "success",
    text: "Connection accepted.",
  },
  CONNECT_REJECTED: {
    type: "info",
    text: "Connection request rejected.",
  },
  INVALID_INPUT: {
    type: "error",
    text: "Invalid input data. Please check and try again.",
  },
});
