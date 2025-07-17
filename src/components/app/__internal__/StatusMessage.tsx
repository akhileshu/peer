import { AppMessage } from "@/lib/message/define-messages";
import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import { AppCard } from "../card";
import { ReactNode } from "react";

export function StatusMessage({
  className,
  message,
  cardTitle,
}: {
  className?: string;
  message: AppMessage;
  cardTitle?: ReactNode | string;
}) {
  const InfoCard = (
    <div
      className={cn(
        "flex items-center gap-2 p-3 border border-blue-200 bg-blue-50 text-blue-800 rounded-md text-sm",
        className
      )}
    >
      <InfoIcon size={18} />
      <span>{message.text}</span>
    </div>
  );
  return cardTitle ? <AppCard title={cardTitle}>{InfoCard}</AppCard> : InfoCard;
}
