
import { authMessages } from "@/lib/message/__internal__/auth";
import { commonMessages } from "@/lib/message/__internal__/common";
import { profileMessages } from "@/services/profile/message";

export const appMessages = {
  profile: profileMessages,
  auth: authMessages,
  common: commonMessages,
  /*
  post: postMessages,
  bookmark: bookmarkMessages,
  connection: connectionMessages,
  */
};
