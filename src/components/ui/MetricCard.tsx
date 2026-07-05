import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  iconBgClass?: string;
  borderLeftClass?: string;
  badgeText?: string;
  badgeVariant?: "present" | "absent" | "pending";
}

export function MetricCard({
  title,
  value,
  subtext,
  icon,
  iconBgClass,
  borderLeftClass,
  badgeText,
  badgeVariant,
  className,
  ...props
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        "flex items-center justify-between shadow-sm relative overflow-hidden transition-all duration-200 hover:shadow-md",
        borderLeftClass,
        className
      )}
      {...props}
    >
      <div className="flex-1 space-y-1">
        <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
          {title}
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <h3 className="text-2xl md:text-3xl font-bold font-display text-ink tracking-tight">
            {value}
          </h3>
          {badgeText && badgeVariant && (
            <Badge variant={badgeVariant} className="px-1.5 py-0 text-[10px]">
              {badgeText}
            </Badge>
          )}
        </div>
        {subtext && (
          <p className="text-xs text-ink-muted font-body mt-1">{subtext}</p>
        )}
      </div>
      {icon && (
        <div
          className={cn(
            "w-12 h-12 rounded-md flex items-center justify-center shrink-0 ml-4",
            iconBgClass || "bg-accent/10 text-accent"
          )}
        >
          {icon}
        </div>
      )}
    </Card>
  );
}
