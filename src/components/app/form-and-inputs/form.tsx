import { cn } from "@/lib/utils";
import { FormHTMLAttributes, ReactNode } from "react";
import SubmitButton, { ButtonState } from "./button";

interface ConfirmationOptions {
  enabled: boolean;
  message?: string;
}

interface BaseFormProps extends FormHTMLAttributes<HTMLFormElement> {
  action: (payload: FormData) => void;
  children: ReactNode;
  confirmation?: ConfirmationOptions;
  variant?: "default" | "delete";
}

type FormProps = BaseFormProps &
  (
    | { submitVariant: "default"; submitProps: DefaultSubmitProps }
    | { submitVariant: "custom"; submitProps?: undefined }
  );
type DefaultSubmitProps = {
  label?: string;
  className?: string;
  isPending: boolean;
  buttonState: ButtonState;
};

export default function AppForm({
  action,
  children,
  confirmation = {
    enabled: false,
    message: "Are you sure you want to proceed?",
  },
  variant = "default",
  submitProps,
  submitVariant,
  onSubmit,
  ...props
}: FormProps) {
  return (
    <form
      onSubmit={(e) => {
        if (confirmation.enabled && !confirm(confirmation.message))
          e.preventDefault();
        else onSubmit?.(e);
      }}
      action={action}
      {...props}
    >
      {children}
      {submitVariant === "default" ? (
        <SubmitButton
          className={cn(
            { "text-red-500": variant === "delete" },
            submitProps.className
          )}
          {...submitProps.buttonState}
          isPending={submitProps.isPending}
          text={submitProps.label ?? "Submit"}
        />
      ) : null}
    </form>
  );
}
