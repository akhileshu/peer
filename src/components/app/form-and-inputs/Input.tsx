import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";
import { FieldError } from "./__internal__/FieldError";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean;
  label?: string;
  fieldError?: string[];
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, fullWidth = false, label, id, fieldError, ...props }, ref) => {
    const inputId = id || props.name || "input-id";

    return (
      <div className={cn(fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "rounded-sm py-1 px-2 border border-blue-400 outline-none transition-all",
            "focus:border-2 focus:border-blue-400",
            fullWidth ? "w-full" : "w-sm",
            className
          )}
          {...props}
        />
        <FieldError errors={fieldError} />
      </div>
    );
  }
);

Input.displayName = "Input";
