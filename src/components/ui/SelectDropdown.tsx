import { cn } from "@/lib/cn";

interface SelectDropdownProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function SelectDropdown({
  label,
  error,
  options,
  id,
  className,
  ...props
}: SelectDropdownProps) {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-bold text-ink uppercase tracking-wider font-body"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          "w-full bg-surface-raised border border-ink-muted/20 text-ink rounded-sm px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent font-body cursor-pointer transition-colors",
          error && "border-status-absent focus:ring-status-absent",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-status-absent text-xs font-semibold font-body animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
}
