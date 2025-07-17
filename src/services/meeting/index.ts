import {
  getGoogleEventsAction,
  hasMeetingWithUserAction,
  scheduleMeeting,
} from "./actions";

export const meeting = {
  actions: {
    scheduleMeeting,
    hasMeetingWithUser: hasMeetingWithUserAction,
    getGoogleEvents: getGoogleEventsAction,
  }
};
