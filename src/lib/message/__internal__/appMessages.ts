import { authMessages } from "@/lib/message/__internal__/auth";
import { commonMessages } from "@/lib/message/__internal__/common";
import { connectionRequestMessages } from "@/lib/message/__internal__/connectionRequest";
import { meetingMessages } from "@/lib/message/__internal__/meeting";
import { profileMessages } from "@/lib/message/__internal__/profile";

export const appMessages = {
  profile: profileMessages,
  auth: authMessages,
  common: commonMessages,
  connectionRequest: connectionRequestMessages,
  meeting: meetingMessages,
};
