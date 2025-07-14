import { appMessages } from "./__internal__/appMessages";

type AppMessages = typeof appMessages;

export function getMessage<
  C extends keyof AppMessages,
  K extends keyof AppMessages[C]
>(category: C, key: K) {
  return appMessages[category][key];
}
