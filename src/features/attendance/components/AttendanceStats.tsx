import { UserCheck, UserX, CalendarDays } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface AttendanceStatsProps {
  stats: {
    present: number;
    absent: number;
    leave: number;
  };
}

export function AttendanceStats({ stats }: AttendanceStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Present Card */}
      <Card className="border-l-4 border-status-present bg-surface-raised flex items-center justify-between shadow-sm">
        <div>
          <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
            Present Today
          </span>
          <h3 className="text-3xl font-bold font-display text-ink mt-1.5">
            {stats.present}
          </h3>
          <p className="text-xs text-ink-muted mt-1 font-body">
            On-site or remote check-ins
          </p>
        </div>
        <div className="w-12 h-12 rounded-md bg-status-present/15 text-status-present flex items-center justify-center">
          <UserCheck className="w-6 h-6" />
        </div>
      </Card>

      {/* Absent Card */}
      <Card className="border-l-4 border-status-absent bg-surface-raised flex items-center justify-between shadow-sm">
        <div>
          <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
            Absent Today
          </span>
          <h3 className="text-3xl font-bold font-display text-ink mt-1.5">
            {stats.absent}
          </h3>
          <p className="text-xs text-ink-muted mt-1 font-body">
            Unexcused or not checked in
          </p>
        </div>
        <div className="w-12 h-12 rounded-md bg-status-absent/15 text-status-absent flex items-center justify-center">
          <UserX className="w-6 h-6" />
        </div>
      </Card>

      {/* On Leave Card */}
      <Card className="border-l-4 border-status-pending bg-surface-raised flex items-center justify-between shadow-sm">
        <div>
          <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
            On Leave / Sick
          </span>
          <h3 className="text-3xl font-bold font-display text-ink mt-1.5">
            {stats.leave}
          </h3>
          <p className="text-xs text-ink-muted mt-1 font-body">
            Approved time off
          </p>
        </div>
        <div className="w-12 h-12 rounded-md bg-status-pending/15 text-status-pending flex items-center justify-center">
          <CalendarDays className="w-6 h-6" />
        </div>
      </Card>
    </div>
  );
}
