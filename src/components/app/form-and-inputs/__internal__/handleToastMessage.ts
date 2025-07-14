"use client";
import { AppMessage, ToastMessageType } from "@/lib/message/define-messages";
import { getMessage } from "@/lib/message/get-message";
import { toast } from "sonner";

const isToastMessageType = (type: string): type is ToastMessageType => {
  const allowedTypes: ToastMessageType[] = [
    "error",
    "warning",
    "success",
    "info",
  ];
  return allowedTypes.includes(type as ToastMessageType);
};

export const handleToastMessage = (message?: AppMessage) => {
  // idea : pass more params like ok , etc , and handle non ToastMessageType messages accordingly
  if (!message || message === getMessage("common","DEFAULT_MESSAGE")) return;

  if (!isToastMessageType(message.type)) {
    toast.info("An event occurred: " + message.text);
    return;
  }

  const toastMap: Record<ToastMessageType, (msg: string) => void> = {
    error: toast.error,
    warning: toast.warning,
    success: toast.success,
    info: toast.info,
  };

  toastMap[message.type]?.(message.text);
};
