import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export function AppCard({
  title,
  children,
  className,
}: {
  title: ReactNode | string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("p-4 m-2 bg-white border-1 rounded-sm", className)}>
      <div className="mb-4">
        {React.isValidElement(title) ? (
          title
        ) : (
          <p className="font-semibold text-lg mb-1">{title}</p>
        )}
      </div>
      {children}
    </div>
  );
}
