import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { LeaveRequest, Employee } from "@/types";
import { calculateDateDiff } from "@/lib/mockDb";

interface LeaveRequestDetailsModalProps {
  request: LeaveRequest | null;
  employee: Employee;
  onClose: () => void;
  onApprove: () => void;
  onDecline: () => void;
}

export function LeaveRequestDetailsModal({
  request,
  employee,
  onClose,
  onApprove,
  onDecline,
}: LeaveRequestDetailsModalProps) {
  if (!request) return null;

  const initials = employee.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const totalDays = calculateDateDiff(request.startDate, request.endDate);

  const formatDateRange = (startStr: string, endStr: string) => {
    const start = new Date(startStr + "T00:00:00");
    const end = new Date(endStr + "T00:00:00");

    const startMonth = start.toLocaleDateString("en-US", { month: "short" });
    const startDay = start.getDate();

    const endMonth = end.toLocaleDateString("en-US", { month: "short" });
    const endDay = end.getDate();

    if (startStr === endStr) {
      return `${startMonth} ${startDay}`;
    }

    return `${startMonth} ${startDay} – ${endMonth} ${endDay}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-surface-raised border border-ink-muted/15 rounded-md p-6 max-w-md w-full shadow-2xl relative space-y-5 animate-scaleUp text-ink"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-ink-muted hover:text-ink hover:bg-surface transition-colors cursor-pointer"
          title="Close Dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header: Employee Details */}
        <div className="flex items-center gap-4.5 pt-2">
          <div className="w-12 h-12 rounded-full bg-accent/15 text-accent flex items-center justify-center font-bold text-sm border border-accent/20">
            {initials}
          </div>
          <div>
            <h4 className="font-display font-bold text-lg text-ink leading-tight">
              {employee.name}
            </h4>
            <p className="text-xs text-ink-muted mt-0.5 font-body">
              {employee.role} • {employee.department}
            </p>
          </div>
        </div>

        <hr className="border-ink-muted/10" />

        {/* Modal Body: Leave details */}
        <div className="space-y-4 text-sm font-body">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block font-body">
                Leave Category
              </span>
              <span className="font-semibold text-ink mt-1 block capitalize font-body">
                {request.leaveType} Leave
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block font-body">
                Duration
              </span>
              <span className="font-semibold text-ink mt-1 block font-body">
                {totalDays} {totalDays === 1 ? "day" : "days"}
              </span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block font-body">
              Requested Period
            </span>
            <span className="font-semibold text-ink mt-1 block font-body">
              {formatDateRange(request.startDate, request.endDate)}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block font-body">
              Reason
            </span>
            <div className="mt-1.5 p-3.5 bg-surface border border-ink-muted/10 rounded-sm italic text-ink/90 text-xs leading-relaxed font-body">
              "{request.reason}"
            </div>
          </div>
        </div>

        <hr className="border-ink-muted/10" />

        {/* Modal Footer: Action Buttons */}
        <div className="flex items-center gap-3 font-body">
          {request.status === "pending" ? (
            <>
              <Button
                onClick={onDecline}
                variant="secondary"
                className="flex-1 border-status-absent/30 text-status-absent hover:bg-status-absent/5 hover:border-status-absent/50 cursor-pointer h-10 font-semibold text-sm"
              >
                Decline
              </Button>
              <Button
                onClick={onApprove}
                variant="primary"
                className="flex-1 bg-status-present hover:bg-status-present/90 border-transparent shadow-sm shadow-status-present/20 cursor-pointer h-10 font-semibold text-sm text-white"
              >
                Approve
              </Button>
            </>
          ) : (
            <div className="w-full flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className="text-ink-muted">Status:</span>
                <Badge
                  variant={
                    request.status === "approved"
                      ? "present"
                      : "absent"
                  }
                >
                  {request.status}
                </Badge>
              </div>
              <Button
                onClick={onClose}
                variant="secondary"
                className="w-full h-10 font-semibold cursor-pointer text-sm"
              >
                Close Details
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
