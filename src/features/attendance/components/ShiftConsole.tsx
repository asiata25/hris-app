import { Clock, Play, Square, Info } from "lucide-react";
import type { AttendanceRecord } from "@/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface ShiftConsoleProps {
  checkInState: "idle" | "checked_in" | "checked_out";
  currentUserTodayRecord?: AttendanceRecord;
  onCheckIn: () => void;
  onCheckOut: () => void;
}

export function ShiftConsole({
  checkInState,
  currentUserTodayRecord,
  onCheckIn,
  onCheckOut,
}: ShiftConsoleProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Interactive Check-In/Check-Out Console */}
      <Card className="lg:col-span-2 bg-surface-raised border border-ink-muted/10 flex flex-col justify-between p-6 relative overflow-hidden shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-accent uppercase tracking-wide flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Live Shift Console
            </span>
            <h3 className="text-lg font-bold font-display text-ink mt-1">
              {checkInState === "idle" && "Ready to start your workday?"}
              {checkInState === "checked_in" && "You are currently Checked In!"}
              {checkInState === "checked_out" && "Workday completed successfully."}
            </h3>
            <p className="text-xs text-ink-muted font-body">
              {checkInState === "idle" &&
                "Check in to record your attendance for Sunday, July 5, 2026."}
              {checkInState === "checked_in" &&
                `Logged check-in at ${currentUserTodayRecord?.checkIn}. Please check out at shift end.`}
              {checkInState === "checked_out" &&
                `Checked out at ${currentUserTodayRecord?.checkOut} (Worked: ${currentUserTodayRecord?.workHours}).`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {checkInState === "idle" && (
              <Button
                variant="primary"
                onClick={onCheckIn}
                className="w-full md:w-auto font-semibold"
              >
                <Play className="w-4 h-4 fill-white" /> Check In
              </Button>
            )}
            {checkInState === "checked_in" && (
              <Button
                variant="primary"
                onClick={onCheckOut}
                className="w-full md:w-auto bg-status-absent hover:bg-status-absent/90 text-white border-none font-semibold"
              >
                <Square className="w-4 h-4 fill-white" /> Check Out
              </Button>
            )}
            {checkInState === "checked_out" && (
              <div className="inline-flex items-center gap-2 bg-status-present/15 text-status-present border border-status-present/20 rounded-md px-4 py-2 text-sm font-semibold select-none font-body">
                <Info className="w-4 h-4" /> Shift Logged
              </div>
            )}
          </div>
        </div>

        {/* Timeline indicators */}
        {checkInState !== "idle" && (
          <div className="border-t border-ink-muted/10 mt-6 pt-4 flex items-center gap-8 text-xs font-body text-ink-muted">
            <div>
              <span className="font-semibold text-ink-muted block uppercase tracking-wide">
                Check-In
              </span>
              <span className="text-ink font-medium mt-0.5 block">
                {currentUserTodayRecord?.checkIn}
              </span>
            </div>
            {currentUserTodayRecord?.checkOut && (
              <div>
                <span className="font-semibold text-ink-muted block uppercase tracking-wide">
                  Check-Out
                </span>
                <span className="text-ink font-medium mt-0.5 block">
                  {currentUserTodayRecord?.checkOut}
                </span>
              </div>
            )}
            {currentUserTodayRecord?.workHours && (
              <div>
                <span className="font-semibold text-ink-muted block uppercase tracking-wide">
                  Total Hours
                </span>
                <span className="text-accent font-semibold mt-0.5 block">
                  {currentUserTodayRecord?.workHours}
                </span>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Trailing summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
        <Card className="flex flex-col justify-center p-5 shadow-sm">
          <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
            Present Days
          </span>
          <div className="text-2xl font-bold font-display text-ink mt-1">
            12 Days
          </div>
          <p className="text-[10px] text-ink-muted mt-1.5">
            For this calendar month
          </p>
        </Card>

        <Card className="flex flex-col justify-center p-5 shadow-sm">
          <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
            Leaves Taken
          </span>
          <div className="text-2xl font-bold font-display text-ink mt-1">
            1 Day
          </div>
          <p className="text-[10px] text-ink-muted mt-1.5">
            Approved sick/casual leave
          </p>
        </Card>
      </div>
    </div>
  );
}
