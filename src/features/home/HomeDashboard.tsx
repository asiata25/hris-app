import { useMemo } from "react";
import { Link } from "react-router";
import { getEmployeesFromDb, getAnnouncementsFromDb } from "@/lib/mockDb";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { useAttendance } from "@/hooks/useAttendance";
import { QuickAttend } from "@/components/ui/QuickAttend";
import { DashboardCharts } from "./components/DashboardCharts";
import { AttendanceStatusList } from "./components/AttendanceStatusList";
import {
  HomeStatsCards,
  type HomeStats,
} from "./components/HomeStatsCards";
import { formatDateLabel } from "@/utils/helpers";

const TODAY_DATE = "2026-07-05";

export default function HomeDashboard() {
  const { attendance } = useAttendance();
  const employees = useMemo(() => getEmployeesFromDb(), []);

  // Fetch top 2 latest announcements
  const latestAnnouncements = useMemo(() => {
    return getAnnouncementsFromDb()
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 2);
  }, []);

  // Derive stats dynamically from live attendance hook
  const stats = useMemo<HomeStats>(() => {
    const activeEmployees = employees.filter((e) => e.status !== "inactive");
    const todayRecords = attendance.filter((r) => r.date === TODAY_DATE);
    const presentCount = todayRecords.filter(
      (r) => r.status === "present"
    ).length;
    const leaveCount = todayRecords.filter(
      (r) => r.status === "pending"
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
    <div className="space-y-6 animate-fadeIn">
      {/* Header Area with Quick Attend Action */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <PageHeader>Welcome back, Johannes</PageHeader>
          <p className="text-sm text-ink-muted font-body">
            Here's a quick overview of today's team status and action items.
          </p>
        </div>
        <div className="w-full lg:max-w-md">
          <QuickAttend />
        </div>
      </div>

      {/* Overview Stat Cards */}
      <HomeStatsCards stats={stats} />

      {/* Main Grid: Charts left, List right (same height) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Charts */}
        <div className="lg:col-span-2">
          <DashboardCharts />
        </div>

        {/* Real-time Attendance Statuses */}
        <div>
          <AttendanceStatusList />
        </div>
      </div>

      {/* Announcements Feed Preview (Full Row) */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-ink-muted/10 pb-3">
          <div>
            <SectionHeader>Latest Announcements</SectionHeader>
            <p className="text-xs text-ink-muted font-body mt-0.5">
              Stay updated with company events.
            </p>
          </div>
          <Link
            to="/announcements"
            className="text-xs font-semibold text-accent hover:underline font-body shrink-0 cursor-pointer"
          >
            View All
          </Link>
        </div>

        <div className="space-y-4">
          {latestAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className="space-y-1.5 border-b border-ink-muted/5 last:border-0 last:pb-0 pb-3 font-body"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                  {ann.category}
                </span>
                <span className="text-[10px] text-ink-muted font-mono">
                  {formatDateLabel(ann.date)}
                </span>
              </div>
              <Link
                to={`/announcements/${ann.id}`}
                className="text-sm font-semibold text-ink hover:text-accent font-display block leading-snug transition-colors duration-150 cursor-pointer"
              >
                {ann.title}
              </Link>
              <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">
                {ann.body}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
