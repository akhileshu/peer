import { authOptions } from "@/lib/auth/authOptions";
import { getServerUser } from "@/lib/auth/lib";
import { checkLimit, incrementLimit } from "@/lib/limit-db-writes/limitHandler";
import { defineMessages } from "@/lib/message/define-messages";
import { getMessage } from "@/lib/message/get-message";
import {
  fetchError,
  fetchSuccess,
  handleFetchAction,
  handleMutateAction,
  initialState,
  mutateError,
  mutateSuccess,
} from "@/lib/server-actions/handleAction";
import { getInternalHref } from "@/lib/utils/getInternalHref";
import { myPrisma } from "@/lib/utils/prisma";
import { revalidatePathAction } from "@/lib/utils/revalidate";

import { useQueryParamHandler } from "@/lib/utils/useQueryParamController";
import {
  APP_SETTINGS,
  formatDate,
  getErrorMessage,
  getPreviewText,
} from "@/lib/utils/utils";

export const lib = {
  auth: {
    authOptions,
    getServerUser,
  },
  db: {
    myPrisma,
    dbWriteLimitHandler: {
      checkLimit,
      incrementLimit,
    },
  },

  utils: {
    useQueryParamHandler,
    getInternalHref,
    getErrorMessage,
    formatDate,
    getPreviewText,
    revalidatePathAction,
  },
  config: {
    APP_SETTINGS,
  },
  messaging: {
    getMessage,
    defineMessages,
  },
  actionHandler: {
    fetchSuccess,
    fetchError,
    handleFetchAction,
    mutateSuccess,
    mutateError,
    handleMutateAction,
    initialState,
  },
} as const;
