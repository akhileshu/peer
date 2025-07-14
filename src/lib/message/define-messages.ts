export type ToastMessageType = "error" | "warning" | "success" | "info";
type AdditionalMessageType = "validation" | "server" | "not_found" | "conflict";
type MessageType = ToastMessageType | AdditionalMessageType;

export type AppMessage = {
  type: MessageType;
  text: string;
};

export function defineMessages<const T extends Record<string, AppMessage>>(
  messages: T
) {
  return messages;
}

