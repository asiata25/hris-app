import { useEffect, useState, useMemo } from "react";
import {
  Clock,
  UserCheck,
  UserX,
  CalendarDays,
  Search,
  Building2,
  Play,
  Square,
  RefreshCw,
  Info,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  getEmployeesFromDb,
  getAttendanceFromDb,
  checkInUser,
  checkOutUser,
  resetDb,
  CURRENT_USER_ID,
  PAST_DATES,
} from "@/lib/mockDb";
import type { AttendanceRecord, Employee } from "@/types";
import { cn } from "@/lib/cn";

export default function AttendanceDashboard() {
  const [viewMode, setViewMode] = useState<"team" | "personal">("team");
  const [employees] = useState<Employee[]>(() => getEmployeesFromDb());
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() =>
    getAttendanceFromDb(),
  );

  // Filter States (Team View)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fake short loading skeleton on mount/tab change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [viewMode]);

  // Today's Date Configuration
  const TODAY_DATE = "2026-07-05";

  // Helper: Format current time as HH:MM AM/PM
  const formatCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  };

  // Helper: Calculate work hours between HH:MM AM/PM strings
  const calculateWorkHours = (inTime: string, outTime: string) => {
    try {
      const parseTime = (str: string) => {
        const [time, modifier] = str.split(" ");
        let [hours, minutes] = time.split(":").map(Number);
        if (modifier === "PM" && hours < 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;
        return hours * 60 + minutes;
      };

      const diff = parseTime(outTime) - parseTime(inTime);
      if (diff <= 0) return "8h 30m";
      const h = Math.floor(diff / 60);
      const m = diff % 60;
      return `${h}h ${m}m`;
    } catch (e) {
      return "8h 30m";
    }
  };

  // Current User's Attendance status for today
  const currentUserTodayRecord = useMemo(() => {
    return attendance.find(
      (r) => r.employeeId === CURRENT_USER_ID && r.date === TODAY_DATE,
    );
  }, [attendance]);

  const checkInState = useMemo(() => {
    if (!currentUserTodayRecord) return "idle"; // not checked in
    if (currentUserTodayRecord.checkIn && !currentUserTodayRecord.checkOut)
      return "checked_in";
    return "checked_out";
  }, [currentUserTodayRecord]);

  // Handle Check-in Action
  const handleCheckIn = () => {
    const checkInTime = formatCurrentTime();
    checkInUser(TODAY_DATE, checkInTime);
    setAttendance(getAttendanceFromDb());
  };

  // Handle Check-out Action
  const handleCheckOut = () => {
    if (!currentUserTodayRecord?.checkIn) return;
    const checkOutTime = formatCurrentTime();
    const workHours = calculateWorkHours(
      currentUserTodayRecord.checkIn,
      checkOutTime,
    );
    checkOutUser(TODAY_DATE, checkOutTime, workHours);
    setAttendance(getAttendanceFromDb());
  };

  // Reset db helper for demo purposes
  const handleResetDb = () => {
    resetDb();
    setAttendance(getAttendanceFromDb());
  };

  // Unique departments for filter dropdown
  const departments = useMemo(() => {
    return Array.from(new Set(employees.map((e) => e.department))).sort();
  }, [employees]);

  // Today's team statistics metrics (aggregates across all active/seeded records)
  const stats = useMemo(() => {
    const todayRecords = attendance.filter((r) => r.date === TODAY_DATE);
    const presentCount = todayRecords.filter(
      (r) => r.status === "present",
    ).length;
    const absentCount = todayRecords.filter(
      (r) => r.status === "absent",
    ).length;
    const leaveCount = todayRecords.filter(
      (r) => r.status === "pending",
    ).length;

    // Remaining active employees who haven't checked in yet today (like Johannes Kepler before check-in)
    const activeEmployeesCount = employees.filter(
      (e) => e.status !== "inactive",
    ).length;
    const checkedInCount = todayRecords.length;
    const pendingCheckInCount = Math.max(
      0,
      activeEmployeesCount - checkedInCount,
    );

    return {
      present: presentCount,
      absent: absentCount + pendingCheckInCount, // Count unchecked active employees as absent/not in yet
      leave: leaveCount,
      total: employees.length,
    };
  }, [attendance, employees]);

  // Filtered employees for the Team History table
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      // Name Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        if (!emp.name.toLowerCase().includes(query)) return false;
      }
      // Department filter
      if (selectedDept && emp.department !== selectedDept) return false;
      return true;
    });
  }, [employees, searchQuery, selectedDept]);

  // Personal 14-day history records for Johannes Kepler
  const personalRecords = useMemo(() => {
    return attendance
      .filter((r) => r.employeeId === CURRENT_USER_ID)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [attendance]);

  // Format date display (e.g. "2026-07-05" -> "Sun, Jul 5")
  const formatDateLabel = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Helper for initials avatar background
  const getAvatarBg = (name: string) => {
    const hash = name
      .split("")
      .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const colors = [
      "bg-accent/15 text-accent border-accent/20",
      "bg-status-present/15 text-status-present border-status-present/20",
      "bg-status-pending/15 text-status-pending border-status-pending/20",
      "bg-status-absent/15 text-status-absent border-status-absent/20",
    ];
    return colors[hash % colors.length];
  };

  return (
    <div className="space-y-6">
      {/* View Header with Mode Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-ink tracking-tight">
            Attendance Panel
          </h2>
          <p className="text-sm text-ink-muted mt-1 font-body">
            {viewMode === "team"
              ? "Monitor company attendance metrics and weekly logs."
              : "Track your check-in time and personal work hour history."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Demo Reset Database Button */}
          <button
            onClick={handleResetDb}
            title="Reset Database to Default Seed Data"
            className="p-2 border border-ink-muted/15 text-ink-muted hover:text-ink hover:bg-surface-raised rounded-md transition-all duration-200 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Toggle Tab Buttons */}
          <div className="flex bg-surface-raised p-1 rounded-md border border-ink-muted/10 shadow-sm">
            <button
              onClick={() => setViewMode("team")}
              className={cn(
                "px-4 py-1.5 rounded-sm text-xs font-semibold font-body transition-all duration-200 cursor-pointer",
                viewMode === "team"
                  ? "bg-accent text-white shadow-md shadow-accent/20"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              Team Dashboard
            </button>
            <button
              onClick={() => setViewMode("personal")}
              className={cn(
                "px-4 py-1.5 rounded-sm text-xs font-semibold font-body transition-all duration-200 cursor-pointer",
                viewMode === "personal"
                  ? "bg-accent text-white shadow-md shadow-accent/20"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              My Attendance
            </button>
          </div>
        </div>
      </div>

      {/* TODAY ZONE: At-a-glance stats cards */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-ink-muted">
          Today's Overview
        </div>

        {viewMode === "team" ? (
          /* Team View Stats Row */
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
        ) : (
          /* Personal View Check-In Console & Stats */
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
                    {checkInState === "checked_in" &&
                      "You are currently Checked In!"}
                    {checkInState === "checked_out" &&
                      "Workday completed successfully."}
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
                      onClick={handleCheckIn}
                      className="w-full md:w-auto font-semibold"
                    >
                      <Play className="w-4 h-4 fill-white" /> Check In
                    </Button>
                  )}
                  {checkInState === "checked_in" && (
                    <Button
                      variant="primary"
                      onClick={handleCheckOut}
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

              {/* Optional timeline indicators */}
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
        )}
      </div>

      {/* HISTORY ZONE: Detailed logs table */}
      <div className="space-y-4 pt-2">
        <div className="text-xs font-bold uppercase tracking-wider text-ink-muted">
          Recent History Logs
        </div>

        {viewMode === "team" ? (
          /* Team View History Zone */
          <div className="space-y-4">
            {/* Filters bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between bg-surface-raised p-4 rounded-md border border-ink-muted/10 shadow-sm">
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
              ) : filteredEmployees.length === 0 ? (
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
                        {PAST_DATES.map((date) => (
                          <th
                            key={date}
                            className="py-4.5 px-4 text-center font-display min-w-25"
                          >
                            {formatDateLabel(date)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-muted/10 text-sm">
                      {filteredEmployees.map((emp) => (
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

                          {PAST_DATES.map((date) => {
                            const record = attendance.find(
                              (r) => r.employeeId === emp.id && r.date === date,
                            );

                            return (
                              <td key={date} className="py-4 px-4 text-center">
                                {record ? (
                                  <Badge
                                    variant={record.status}
                                    title={record.notes}
                                  >
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
                                    title="No check-in record logged yet today"
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
        ) : (
          /* Personal View History Zone */
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
                      <th className="py-4.5 px-6 font-display text-center">
                        Status
                      </th>
                      <th className="py-4.5 px-6 font-display">Check In</th>
                      <th className="py-4.5 px-6 font-display">Check Out</th>
                      <th className="py-4.5 px-6 font-display text-right">
                        Work Hours
                      </th>
                      <th className="py-4.5 px-6 font-display text-right">
                        Notes
                      </th>
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
                          {rec.date === TODAY_DATE && (
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
        )}
      </div>
    </div>
  );
}
