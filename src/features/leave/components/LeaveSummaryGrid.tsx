import type { LeaveBalance } from "@/types";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface LeaveSummaryGridProps {
  balances: LeaveBalance[];
}

export function LeaveSummaryGrid({ balances }: LeaveSummaryGridProps) {
  const config = {
    annual: {
      name: "Annual Leave",
      barColor: "bg-accent",
    },
    sick: {
      name: "Sick Leave",
      barColor: "bg-status-absent",
    },
    unpaid: {
      name: "Unpaid Leave",
      barColor: "bg-ink-muted",
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
      {balances.map((balance) => {
        const typeConfig = config[balance.leaveType] || {
          name:
            balance.leaveType.charAt(0).toUpperCase() +
            balance.leaveType.slice(1) +
            " Leave",
          barColor: "bg-accent",
        };

        const remaining = Math.max(0, balance.allocated - balance.used);

        return (
          <Card
            key={balance.leaveType}
            className="flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
          >
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

            <ProgressBar
              used={balance.used}
              allocated={balance.allocated}
              barColorClass={typeConfig.barColor}
            />
          </Card>
        );
      })}
    </div>
  );
}
