import { Card } from "@/components/ui/Card";
import type { LeaveBalance } from "@/types";
import { cn } from "@/lib/cn";

interface LeaveSummaryCardsProps {
  balances: LeaveBalance[];
}

export function LeaveSummaryCards({ balances }: LeaveSummaryCardsProps) {
  // Config for styles per leave type
  const config = {
    annual: {
      name: "Annual Leave",
      barColor: "bg-accent",
      textColor: "text-accent",
    },
    sick: {
      name: "Sick Leave",
      barColor: "bg-status-absent",
      textColor: "text-status-absent",
    },
    unpaid: {
      name: "Unpaid Leave",
      barColor: "bg-ink-muted",
      textColor: "text-ink-muted",
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {balances.map((balance) => {
        const typeConfig = config[balance.leaveType] || {
          name: balance.leaveType.charAt(0).toUpperCase() + balance.leaveType.slice(1) + " Leave",
          barColor: "bg-accent",
          textColor: "text-accent",
        };

        const remaining = Math.max(0, balance.allocated - balance.used);
        const progressPercentage = balance.allocated > 0
          ? Math.min(100, Math.round((balance.used / balance.allocated) * 100))
          : 0;

        return (
          <Card key={balance.leaveType} className="flex flex-col justify-between space-y-4">
            <div>
              <h3 className="font-display font-bold text-base text-ink tracking-tight">
                {typeConfig.name}
              </h3>
              <p className="text-sm font-semibold text-ink mt-1 font-body">
                {balance.used} of {balance.allocated} days used
              </p>
              <p className="text-xs text-ink-muted font-body mt-0.5">
                {remaining} days remaining
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="w-full h-2 rounded-full bg-ink-muted/10 overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-500 ease-out", typeConfig.barColor)}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold text-ink-muted uppercase tracking-wider font-body">
                <span>Used: {progressPercentage}%</span>
                <span>Remaining: {100 - progressPercentage}%</span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
