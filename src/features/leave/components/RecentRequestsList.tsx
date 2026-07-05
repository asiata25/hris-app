import type { LeaveRequest } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface RecentRequestsListProps {
  requests: LeaveRequest[];
  formatDateRange: (startStr: string, endStr: string) => string;
}

export function RecentRequestsList({
  requests,
  formatDateRange,
}: RecentRequestsListProps) {
  if (requests.length === 0) {
    return (
      <Card className="py-8 text-center bg-surface-raised border border-dashed border-ink-muted/15 rounded-sm">
        <p className="text-sm text-ink-muted font-body">No requests yet</p>
      </Card>
    );
  }

  return (
    <div className="bg-surface-raised rounded-md border border-ink-muted/10 text-ink font-body transition-all duration-200 shadow-sm overflow-hidden divide-y divide-ink-muted/10 animate-fadeIn">
      {requests.map((req) => (
        <div
          key={req.id}
          className="flex items-center justify-between p-4.5 hover:bg-surface/30 transition-colors"
        >
          <div className="space-y-0.5">
            <span className="text-sm font-semibold text-ink font-body block capitalize">
              {req.leaveType} Leave
            </span>
            <span className="text-xs text-ink-muted font-body block">
              {formatDateRange(req.startDate, req.endDate)}
            </span>
          </div>
          <Badge
            variant={
              req.status === "approved"
                ? "present"
                : req.status === "rejected"
                  ? "absent"
                  : "pending"
            }
          >
            {req.status}
          </Badge>
        </div>
      ))}
    </div>
  );
}
