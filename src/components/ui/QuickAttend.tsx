import { useEffect, useState } from "react";
import { Clock, Play, Square, Info } from "lucide-react";
import { useAttendance } from "@/hooks/useAttendance";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatDateLabel } from "@/utils/helpers";

export function QuickAttend() {
  const { checkInState, todayRecord, checkIn, checkOut } = useAttendance();
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const todayStr = "2026-07-05"; // Synchronized default date

  const statusConfig = {
    idle: {
      label: "Not Checked In Yet",
      dotClass: "bg-status-pending animate-pulse",
    },
    checked_in: {
      label: `Working (Checked In at ${todayRecord?.checkIn})`,
      dotClass: "bg-status-present animate-pulse",
    },
    checked_out: {
      label: `Shift Logged (Worked: ${todayRecord?.workHours})`,
      dotClass: "bg-ink-muted/50",
    },
  };

  const config = statusConfig[checkInState];

  return (
    <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-ink-muted/10 shadow-xs bg-surface-raised transition-all duration-200">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-accent/10 text-accent rounded-sm shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-ink font-display tracking-tight">
              {formatDateLabel(todayStr)}
            </span>
            <span className="text-xs font-bold text-accent font-mono">
              {formattedTime}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full shrink-0 ${config.dotClass}`} />
            <span className="text-xs text-ink-muted font-body leading-none">
              {config.label}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {checkInState === "idle" && (
          <Button
            variant="primary"
            onClick={checkIn}
            className="w-full sm:w-auto font-semibold px-4 py-1.5"
            size="sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Check In
          </Button>
        )}
        {checkInState === "checked_in" && (
          <Button
            variant="primary"
            onClick={checkOut}
            className="w-full sm:w-auto bg-status-absent hover:bg-status-absent/90 text-white border-none font-semibold px-4 py-1.5 shadow-sm shadow-status-absent/25"
            size="sm"
          >
            <Square className="w-3.5 h-3.5 fill-current" /> Check Out
          </Button>
        )}
        {checkInState === "checked_out" && (
          <div className="inline-flex items-center gap-1.5 bg-status-present/10 text-status-present border border-status-present/25 rounded-sm px-3.5 py-1.5 text-xs font-semibold select-none font-body">
            <Info className="w-3.5 h-3.5" /> Shift Completed
          </div>
        )}
      </div>
    </Card>
  );
}
