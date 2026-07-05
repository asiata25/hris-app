import { cn } from "@/lib/cn";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function InputField({
  label,
  error,
  id,
  className,
  ...props
}: InputFieldProps) {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-ink font-body"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full bg-surface border border-ink-muted/20 text-ink rounded-sm px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent placeholder-ink-muted/40 font-body transition-colors",
          error && "border-status-absent focus:ring-status-absent",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-status-absent text-xs font-semibold font-body animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
}
