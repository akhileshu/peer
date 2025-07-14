import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";

type LinkButtonProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode;
    className?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    disableUnderline?: boolean;
    disableTransition?: boolean;
  };

export function AppLink({
  href,
  children,
  className,
  leftIcon,
  rightIcon,
  disableUnderline = false,
  disableTransition = false,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-md inline-flex items-center gap-2 text-blue-600 font-medium relative transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        !disableUnderline &&
          "after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full",
        disableTransition && "after:transition-none",
        className
      )}
      {...props}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </Link>
  );
}
