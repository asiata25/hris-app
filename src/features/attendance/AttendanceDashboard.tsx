import { useEffect, useState, useMemo } from "react";
import { RefreshCw } from "lucide-react";
import {
  getEmployeesFromDb,
  resetDb,
  CURRENT_USER_ID,
} from "@/lib/mockDb";
import type { Employee } from "@/types";
import { cn } from "@/lib/cn";
import { PageHeader } from "@/components/ui/PageHeader";
import { AttendanceStats } from "./components/AttendanceStats";
import { LiveShiftConsole } from "./components/LiveShiftConsole";
import { TeamHistoryTable } from "./components/TeamHistoryTable";
import { PersonalHistoryTable } from "./components/PersonalHistoryTable";
import { useAttendance } from "@/hooks/useAttendance";

export default function AttendanceDashboard() {
  const [viewMode, setViewMode] = useState<"team" | "personal">("personal");
  const [employees] = useState<Employee[]>(() => getEmployeesFromDb());
  const {
    attendance,
    todayRecord: currentUserTodayRecord,
    checkInState,
    checkIn: handleCheckIn,
    checkOut: handleCheckOut,
    triggerUpdate,
  } = useAttendance();

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

  // Reset db helper for demo purposes
  const handleResetDb = () => {
    resetDb();
    triggerUpdate();
  };

  // Unique departments for filter dropdown
  const departments = useMemo(() => {
    return Array.from(new Set(employees.map((e) => e.department))).sort();
  }, [employees]);

  // Today's team statistics metrics (aggregates across all active/seeded records)
  const stats = useMemo(() => {
    const todayRecords = attendance.filter((r) => r.date === TODAY_DATE);
    const presentCount = todayRecords.filter(
      (r) => r.status === "present"
    ).length;
    const absentCount = todayRecords.filter(
      (r) => r.status === "absent"
    ).length;
    const leaveCount = todayRecords.filter(
      (r) => r.status === "pending"
    ).length;

    // Remaining active employees who haven't checked in yet today
    const activeEmployeesCount = employees.filter(
      (e) => e.status !== "inactive"
    ).length;
    const checkedInCount = todayRecords.length;
    const pendingCheckInCount = Math.max(
      0,
      activeEmployeesCount - checkedInCount
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

  return (
    <div className="space-y-6">
      {/* View Header with Mode Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <PageHeader>Attendance Panel</PageHeader>
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
                  : "text-ink-muted hover:text-ink"
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
                  : "text-ink-muted hover:text-ink"
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
          <AttendanceStats stats={stats} />
        ) : (
          <LiveShiftConsole
            checkInState={checkInState}
            currentUserTodayRecord={currentUserTodayRecord}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
          />
        )}
      </div>

      {/* HISTORY ZONE: Detailed logs table */}
      <div className="space-y-4 pt-2">
        <div className="text-xs font-bold uppercase tracking-wider text-ink-muted">
          Recent History Logs
        </div>

        {viewMode === "team" ? (
          <TeamHistoryTable
            employees={filteredEmployees}
            attendance={attendance}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedDept={selectedDept}
            setSelectedDept={setSelectedDept}
            departments={departments}
            isLoading={isLoading}
          />
        ) : (
          <PersonalHistoryTable
            personalRecords={personalRecords}
            isLoading={isLoading}
            todayDate={TODAY_DATE}
          />
        )}
      </div>
    </div>
  );
}
