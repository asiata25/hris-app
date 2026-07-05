import { cn } from "@/lib/cn";

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function DatePicker({
  label,
  error,
  id,
  className,
  ...props
}: DatePickerProps) {
  return (
    <div className="space-y-1 w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-medium text-ink-muted font-body mb-1"
        >
          {label}
        </label>
      )}
      <input
        type="date"
        id={id}
        className={cn(
          "w-full bg-surface-raised border border-ink-muted/20 text-ink rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent font-body transition-colors",
          error && "border-status-absent focus:ring-status-absent",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-status-absent text-xs font-semibold font-body mt-1 animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
}
