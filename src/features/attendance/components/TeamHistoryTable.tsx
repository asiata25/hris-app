import { useState } from "react";
import type { Employee, AttendanceRecord } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Search, Building2, Calendar } from "lucide-react";
import { cn } from "@/lib/cn";
import { WEEK_1_DATES, WEEK_2_DATES } from "@/lib/mockDb";
import { formatDateLabel, getAvatarBg } from "@/utils/helpers";

interface TeamHistoryTableProps {
  employees: Employee[];
  attendance: AttendanceRecord[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedDept: string;
  setSelectedDept: (dept: string) => void;
  departments: string[];
  isLoading: boolean;
}

export function TeamHistoryTable({
  employees,
  attendance,
  searchQuery,
  setSearchQuery,
  selectedDept,
  setSelectedDept,
  departments,
  isLoading,
}: TeamHistoryTableProps) {
  const [selectedWeek, setSelectedWeek] = useState<"week1" | "week2">("week2");
  const weekDates = selectedWeek === "week2" ? WEEK_2_DATES : WEEK_1_DATES;

  // Helper to extract weekday
  const getDayName = (dateStr: string): string => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Filters bar */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between bg-surface-raised p-4 rounded-md border border-ink-muted/10 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
          <input
            type="text"
            placeholder="Search employees by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9.5 pr-4 py-2 border border-ink-muted/20 rounded-md bg-surface text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-accent font-body"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Week Selector Dropdown */}
          <div className="relative flex items-center gap-2">
            <Calendar className="w-4 h-4 text-ink-muted" />
            <select
              value={selectedWeek}
              onChange={(e) =>
                setSelectedWeek(e.target.value as "week1" | "week2")
              }
              className="border border-ink-muted/20 rounded-md bg-surface px-3 py-2 text-sm text-ink focus:outline-none focus:border-accent font-body min-w-52.5 cursor-pointer"
            >
              <option value="week2">Jun 29 – Jul 05, 2026 (Weekly)</option>
              <option value="week1">Jun 22 – Jun 28, 2026 (Weekly)</option>
            </select>
          </div>

          <div className="relative flex items-center gap-2">
            <Building2 className="w-4 h-4 text-ink-muted" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="border border-ink-muted/20 rounded-md bg-surface px-3 py-2 text-sm text-ink focus:outline-none focus:border-accent font-body min-w-37.5 cursor-pointer"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {(searchQuery || selectedDept) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedDept("");
              }}
              className="text-accent hover:bg-accent/5 font-semibold"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Team History Table Grid */}
      <Card className="overflow-hidden p-0 border border-ink-muted/10 shadow-sm">
        {isLoading ? (
          <div className="p-12 text-center text-sm font-body text-ink-muted flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-accent/25 border-t-accent animate-spin" />
            <span>Loading team history records...</span>
          </div>
        ) : employees.length === 0 ? (
          <div className="p-16 text-center text-ink-muted font-body">
            <p className="text-base font-semibold">No employees found</p>
            <p className="text-xs text-ink-muted/70 mt-1">
              Try adjusting your filters or search queries.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface border-b border-ink-muted/10 text-xs font-semibold text-ink-muted uppercase tracking-wider">
                  <th className="py-4.5 px-6 font-display min-w-50">
                    Employee
                  </th>
                  {weekDates.map((date) => (
                    <th
                      key={date}
                      className="py-4.5 px-4 text-center font-display min-w-25"
                      title={formatDateLabel(date)}
                    >
                      {getDayName(date)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-muted/10 text-sm">
                {employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-surface/30 transition-colors"
                  >
                    <td className="py-4 px-6 flex items-center gap-3">
                      {/* Initials Avatar */}
                      <div
                        className={cn(
                          "w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border select-none",
                          getAvatarBg(emp.name),
                        )}
                      >
                        {emp.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-ink leading-snug">
                          {emp.name}
                        </div>
                        <div className="text-xs text-ink-muted leading-tight mt-0.5">
                          {emp.department} • {emp.role}
                        </div>
                      </div>
                    </td>

                    {weekDates.map((date) => {
                      const record = attendance.find(
                        (r) => r.employeeId === emp.id && r.date === date,
                      );

                      return (
                        <td key={date} className="py-4 px-4 text-center">
                          {record ? (
                            <Badge variant={record.status} title={record.notes}>
                              {record.status === "present"
                                ? "Present"
                                : record.status === "absent"
                                  ? "Absent"
                                  : "On Leave"}
                            </Badge>
                          ) : (
                            <Badge
                              variant="pending"
                              className="bg-ink-muted/10 text-ink-muted/60 border-none font-medium text-[10px]"
                              title="No check-in record logged yet"
                            >
                              Not In
                            </Badge>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
