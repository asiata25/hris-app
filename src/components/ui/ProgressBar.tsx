import { cn } from "@/lib/cn";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  used: number;
  allocated: number;
  barColorClass?: string;
  showPercentageLabels?: boolean;
}

export function ProgressBar({
  used,
  allocated,
  barColorClass = "bg-accent",
  showPercentageLabels = true,
  className,
  ...props
}: ProgressBarProps) {
  const progressPercentage =
    allocated > 0 ? Math.min(100, Math.round((used / allocated) * 100)) : 0;

  return (
    <div className={cn("space-y-1.5 w-full", className)} {...props}>
      <div className="w-full h-2 rounded-full bg-ink-muted/10 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            barColorClass
          )}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      {showPercentageLabels && (
        <div className="flex justify-between items-center text-[10px] font-bold text-ink-muted uppercase tracking-wider font-body select-none">
          <span>Used: {progressPercentage}%</span>
          <span>Remaining: {100 - progressPercentage}%</span>
        </div>
      )}
    </div>
  );
}
