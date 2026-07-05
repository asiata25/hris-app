import { AlertCircle, CheckCircle2, Users } from "lucide-react";
import { MetricCard } from "@/components/ui/MetricCard";

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
      <MetricCard
        title="Total Employees"
        value={stats.totalEmployees}
        subtext="Registered workforce members"
        icon={<Users className="w-6 h-6" />}
      />

      <MetricCard
        title="Attendance Rate"
        value={`${stats.attendanceRate}%`}
        subtext="Check-ins recorded today"
        badgeText="On Track"
        badgeVariant="present"
        icon={<CheckCircle2 className="w-6 h-6" />}
        iconBgClass="bg-status-present/15 text-status-present"
      />

      <MetricCard
        title="Pending Leave Requests"
        value={stats.pendingLeaves}
        subtext="Awaiting review approvals"
        badgeText="Urgent"
        badgeVariant="pending"
        icon={<AlertCircle className="w-6 h-6" />}
        iconBgClass="bg-status-pending/15 text-status-pending"
      />
    </div>
  );
}
