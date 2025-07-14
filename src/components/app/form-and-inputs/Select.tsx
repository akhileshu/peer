import { cn } from "@/lib/utils";
import { FieldError } from "./__internal__/FieldError";

export type SelectOption = { label: string; value: string };

type SelectProps = {
  label?: string;
  value?: string;
  name: string;
  options: SelectOption[];
  className?: string;
  fieldError?: string[];
};

export function Select({
  label,
  name,
  options,
  className,
  fieldError,
  value,
}: SelectProps) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <select
        defaultValue={value ?? ""}
        name={name}
        className={cn(
          "rounded-sm py-1 px-2 border border-blue-400 outline-none transition-all w-full",
          "focus:border-2 focus:border-blue-400",
          className
        )}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <FieldError errors={fieldError} />
    </div>
  );
}
