import { Badge } from "@/components/ui/Badge";

export type Severity = "low" | "medium" | "high" | "critical";

interface SeverityConfig {
  label: string;
  variant: "present" | "absent" | "pending";
  desc: string;
}

interface SeveritySelectorProps {
  severity: Severity;
  onChange: (level: Severity) => void;
  configs: Record<Severity, SeverityConfig>;
}

export function SeveritySelector({
  severity,
  onChange,
  configs,
}: SeveritySelectorProps) {
  return (
    <div className="space-y-1.5 animate-fadeIn">
      <label className="text-xs font-semibold text-ink block mb-2 select-none">
        Severity Level
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(Object.keys(configs) as Severity[]).map((level) => {
          const cfg = configs[level];
          const isSelected = severity === level;
          return (
            <button
              key={level}
              type="button"
              onClick={() => onChange(level)}
              className={`p-3 rounded-sm border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                isSelected
                  ? "bg-accent/5 border-accent shadow-sm"
                  : "bg-surface-raised border-ink-muted/15 hover:bg-surface/50"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold text-ink uppercase tracking-wide">
                  {cfg.label}
                </span>
                <Badge variant={cfg.variant}>
                  {level === "low" || level === "medium"
                    ? "Standard"
                    : "Priority"}
                </Badge>
              </div>
              <span className="text-[11px] text-ink-muted leading-tight">
                {cfg.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
