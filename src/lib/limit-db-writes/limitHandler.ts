import { AppMessage } from "@/lib/message/define-messages";
import { getMessage } from "@/lib/message/get-message";
import { myPrisma } from "@/lib/utils/prisma";
import { mutateError } from "@/lib/server-actions/handleAction";
import { LIMIT_MAPPING, LimitField } from "./__internal__/schema-config";
import { APP_SETTINGS, getErrorMessage } from "@/lib/utils/utils";
/**
 * example usage : https://github.com/akhileshu/solo-to-squard/blob/78157c87753665ef98e33c7f0e05dce4554c5126/src/features/post/actions/postActions.ts#L112
 */
export async function checkLimit(
  userId: string,
  limitfield: LimitField,
  messageOnLimitReached: AppMessage
) {
  try {
    if (!APP_SETTINGS.isProd) return null; // Skip in dev
    const limitKey = LIMIT_MAPPING[limitfield];
    const userData = await myPrisma.user.findUnique({
      where: { id: userId },
      select: { [limitfield]: true },
    });

    if (
      userData &&
      Number(userData[limitfield]) >= APP_SETTINGS.limits[limitKey]
    ) {
      return mutateError(messageOnLimitReached);
    }

    return null;
  } catch (error) {
    console.log(getErrorMessage(error));
    return mutateError(getMessage("common", "LIMIT_CHECK_FAILED"));
  }
}

export async function incrementLimit(userId: string, field: LimitField) {
  try {
    if (!APP_SETTINGS.isProd) return;

    await myPrisma.user.update({
      where: { id: userId },
      data: { [field]: { increment: 1 } },
    });
  } catch (error) {
    console.log(getErrorMessage(error));
    return mutateError(getMessage("common", "LIMIT_CHECK_FAILED"));
  }
}
