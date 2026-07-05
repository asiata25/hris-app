import type { AttendanceRecord } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface PersonalHistoryTableProps {
  personalRecords: AttendanceRecord[];
  isLoading: boolean;
  todayDate: string;
}

export function PersonalHistoryTable({
  personalRecords,
  isLoading,
  todayDate,
}: PersonalHistoryTableProps) {
  return (
    <Card className="overflow-hidden p-0 border border-ink-muted/10 shadow-sm">
      {isLoading ? (
        <div className="p-12 text-center text-sm font-body text-ink-muted flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-accent/25 border-t-accent animate-spin" />
          <span>Loading your records...</span>
        </div>
      ) : personalRecords.length === 0 ? (
        <div className="p-16 text-center text-ink-muted font-body">
          <p className="text-base font-semibold">No attendance logs</p>
          <p className="text-xs text-ink-muted/70 mt-1">
            Start checking in to view your logs here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-ink-muted/10 text-xs font-semibold text-ink-muted uppercase tracking-wider">
                <th className="py-4.5 px-6 font-display">Date</th>
                <th className="py-4.5 px-6 font-display text-center">Status</th>
                <th className="py-4.5 px-6 font-display">Check In</th>
                <th className="py-4.5 px-6 font-display">Check Out</th>
                <th className="py-4.5 px-6 font-display text-right">Work Hours</th>
                <th className="py-4.5 px-6 font-display text-right">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-muted/10 text-sm font-body">
              {personalRecords.map((rec) => (
                <tr
                  key={rec.id}
                  className="hover:bg-surface/30 transition-colors"
                >
                  <td className="py-4 px-6 font-medium text-ink">
                    {new Date(
                      rec.date.split("-").map(Number)[0],
                      rec.date.split("-").map(Number)[1] - 1,
                      rec.date.split("-").map(Number)[2],
                    ).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {rec.date === todayDate && (
                      <span className="ml-2 bg-accent/10 text-accent border border-accent/25 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                        TODAY
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Badge variant={rec.status}>
                      {rec.status === "present"
                        ? "Present"
                        : rec.status === "absent"
                          ? "Absent"
                          : "On Leave"}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-ink font-medium">
                    {rec.checkIn || "—"}
                  </td>
                  <td className="py-4 px-6 text-ink font-medium">
                    {rec.checkOut || "—"}
                  </td>
                  <td className="py-4 px-6 text-right text-accent font-semibold">
                    {rec.workHours || "—"}
                  </td>
                  <td className="py-4 px-6 text-right text-xs text-ink-muted">
                    {rec.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
