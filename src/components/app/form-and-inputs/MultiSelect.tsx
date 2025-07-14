import { useState } from "react";
import { SelectOption } from "./Select";
import { FieldError } from "./__internal__/FieldError";
import { cn } from "@/lib/utils";

type MultiSelectProps = {
  label?: string;
  value?: string[];
  name: string;
  options: SelectOption[];
  className?: string;
  fieldError?: string[];
};

export function MultiSelect({
  label,
  name,
  options,
  className,
  fieldError,
  value,
}: MultiSelectProps) {
  const [selected, setSelected] = useState<string[]>(value || []);
  const [open, setOpen] = useState(false);

  const toggleSelect = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const removeValue = (value: string) => {
    setSelected((prev) => prev.filter((v) => v !== value));
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="text-sm font-medium block">{label}</label>}

      {/* Pills */}
      <div className="flex flex-wrap gap-2">
        {selected.map((value) => (
          <div
            key={value}
            className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm flex items-center gap-1"
          >
            {value}
            <button
              type="button"
              onClick={() => removeValue(value)}
              className="text-blue-600 hover:text-red-600 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="text-sm text-blue-600 hover:underline"
      >
        {open ? "Hide options" : "Select options"}
      </button>

      {/* Options list */}
      {open && (
        <div className="flex flex-wrap gap-2 border rounded p-2">
          {options.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => toggleSelect(opt.value)}
              className={cn(
                "px-3 py-1 border rounded-full text-sm",
                selected.includes(opt.value)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "border-gray-400 hover:border-blue-400"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Hidden input for form submit */}
      <input type="hidden" name={name} value={selected.join(",")} />
      <FieldError errors={fieldError} />
    </div>
  );
}
