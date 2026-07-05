import { AlertCircle, CheckCircle2, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export interface HomeStats {
  totalEmployees: number;
  attendanceRate: number;
  pendingLeaves: number;
  absentCount: number;
}

interface HomeStatsCardsProps {
  stats: HomeStats;
}

export function HomeStatsCards({ stats }: HomeStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="flex items-center gap-4.5">
        <div className="w-12 h-12 rounded-md bg-accent/10 text-accent flex items-center justify-center">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <div className="text-2xl font-display font-bold text-ink">
            {stats.totalEmployees}
          </div>
          <div className="text-xs text-ink-muted font-body font-medium">
            Total Employees
          </div>
        </div>
      </Card>

      <Card className="flex items-center gap-4.5">
        <div className="w-12 h-12 rounded-md bg-status-present/15 text-status-present flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <div className="text-2xl font-display font-bold text-ink">
            {stats.attendanceRate}%
          </div>
          <div className="text-xs text-ink-muted font-body font-medium flex items-center gap-1.5">
            Attendance Rate{" "}
            <Badge variant="present" className="ml-1.5 px-1 py-0 text-[10px]">
              On Track
            </Badge>
          </div>
        </div>
      </Card>

      <Card className="flex items-center gap-4.5">
        <div className="w-12 h-12 rounded-md bg-status-pending/15 text-status-pending flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <div className="text-2xl font-display font-bold text-ink">
            {stats.pendingLeaves}
          </div>
          <div className="text-xs text-ink-muted font-body font-medium flex items-center gap-1.5">
            Pending Leave Requests{" "}
            <Badge variant="pending" className="ml-1.5 px-1 py-0 text-[10px]">
              Urgent
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
