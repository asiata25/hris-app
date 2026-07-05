import { useEffect, useMemo, useState } from "react";
import { getAttendanceFromDb, getEmployeesFromDb } from "@/lib/mockDb";
import { PageHeader } from "@/components/ui/PageHeader";
import { AttendanceStatusList } from "./components/AttendanceStatusList";
import {
  HomeStatsCards,
  type HomeStats,
} from "./components/HomeStatsCards";

const TODAY_DATE = "2026-07-05";

export default function HomeDashboard() {
  const [employees] = useState(() => getEmployeesFromDb());
  const [attendance, setAttendance] = useState(() => getAttendanceFromDb());

  useEffect(() => {
    const syncState = () => {
      setAttendance(getAttendanceFromDb());
    };
    window.addEventListener("storage", syncState);

    const timer = setInterval(syncState, 1000);

    return () => {
      window.removeEventListener("storage", syncState);
      clearInterval(timer);
    };
  }, []);

  const stats = useMemo<HomeStats>(() => {
    const activeEmployees = employees.filter((e) => e.status !== "inactive");
    const todayRecords = attendance.filter((r) => r.date === TODAY_DATE);
    const presentCount = todayRecords.filter(
      (r) => r.status === "present",
    ).length;
    const leaveCount = todayRecords.filter(
      (r) => r.status === "pending",
    ).length;

    const activeCount = activeEmployees.length;
    const checkedInCount = todayRecords.length;
    const pendingCheckInCount = Math.max(0, activeCount - checkedInCount);

    const rate =
      activeCount > 0 ? Math.round((presentCount / activeCount) * 100) : 0;

    return {
      totalEmployees: employees.length,
      attendanceRate: rate,
      pendingLeaves: leaveCount,
      absentCount:
        todayRecords.filter((r) => r.status === "absent").length +
        pendingCheckInCount,
    };
  }, [employees, attendance]);

  return (
    <div className="space-y-6">
      <div>
        <PageHeader>Welcome back, Johannes</PageHeader>
        <p className="text-sm text-ink-muted mt-1 font-body">
          Here's a quick overview of today's team status and action items.
        </p>
      </div>

      <HomeStatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AttendanceStatusList />
        </div>
      </div>
    </div>
  );
}
