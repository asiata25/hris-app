import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import TeamDirectory from "@/features/team/TeamDirectory";
import AttendanceDashboard from "@/features/attendance/AttendanceDashboard";
import LeaveDashboard from "@/features/leave/LeaveDashboard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Users, CheckCircle2, AlertCircle } from "lucide-react";
import { getEmployeesFromDb, getAttendanceFromDb } from "@/lib/mockDb";
import { useState, useEffect, useMemo } from "react";

// Reactive Home Dashboard component
function HomeDashboard() {
  const [employees] = useState(() => getEmployeesFromDb());
  const [attendance, setAttendance] = useState(() => getAttendanceFromDb());

  useEffect(() => {
    // Sync attendance state changes across screens
    const syncState = () => {
      setAttendance(getAttendanceFromDb());
    };
    window.addEventListener("storage", syncState);

    // Periodically sync in case other actions trigger updates within the same window
    const timer = setInterval(syncState, 1000);

    return () => {
      window.removeEventListener("storage", syncState);
      clearInterval(timer);
    };
  }, []);

  const stats = useMemo(() => {
    const activeEmployees = employees.filter((e) => e.status !== "inactive");
    const todayRecords = attendance.filter((r) => r.date === "2026-07-05");
    const presentCount = todayRecords.filter(
      (r) => r.status === "present",
    ).length;
    const leaveCount = todayRecords.filter(
      (r) => r.status === "pending",
    ).length;

    // Remaining active employees who haven't checked in yet today (like Johannes Kepler before check-in)
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
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-ink leading-tight">
          Welcome back, Johannes
        </h2>
        <p className="text-sm text-ink-muted mt-1 font-body">
          Here's a quick overview of today's team status and action items.
        </p>
      </div>

      {/* Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center gap-4.5">
          <div className="w-12 h-12 rounded-md bg-accent/10 text-accent flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-ink">
              {stats.totalEmployees}
            </div>
            <div className="text-xs text-ink-muted font-body font-medium">
              Total Employees
            </div>
          </div>
        </Card>

        <Card className="flex items-center gap-4.5">
          <div className="w-12 h-12 rounded-md bg-status-present/15 text-status-present flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-ink">
              {stats.attendanceRate}%
            </div>
            <div className="text-xs text-ink-muted font-body font-medium flex items-center gap-1.5">
              Attendance Rate{" "}
              <Badge variant="present" className="ml-1.5 px-1 py-0 text-[10px]">
                On Track
              </Badge>
            </div>
          </div>
        </Card>

        <Card className="flex items-center gap-4.5">
          <div className="w-12 h-12 rounded-md bg-status-pending/15 text-status-pending flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-ink">
              {stats.pendingLeaves}
            </div>
            <div className="text-xs text-ink-muted font-body font-medium flex items-center gap-1.5">
              Pending Leave Requests{" "}
              <Badge variant="pending" className="ml-1.5 px-1 py-0 text-[10px]">
                Urgent
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions & Elements Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Badge Showcase */}
        <Card className="space-y-4">
          <h3 className="font-display font-bold text-base text-ink">
            Attendance Statuses
          </h3>
          <p className="text-xs text-ink-muted font-body">
            Token-driven `Badge` components mapping opacity-muted status colors:
          </p>

          <ul className="space-y-3 pt-2 font-body text-sm text-ink">
            <li className="flex items-center justify-between">
              <span>Johannes Kepler</span>
              <Badge variant="present">Present</Badge>
            </li>
            <li className="flex items-center justify-between">
              <span>Arlene McCoy</span>
              <Badge variant="absent">Absent</Badge>
            </li>
            <li className="flex items-center justify-between">
              <span>Albert Flores</span>
              <Badge variant="pending">Pending</Badge>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <HomeDashboard />,
      },
      {
        path: "team",
        element: <TeamDirectory />,
      },
      {
        path: "attendance",
        element: <AttendanceDashboard />,
      },
      {
        path: "leave",
        element: <LeaveDashboard />,
      },
      {
        path: "*",
        element: (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-ink">
              Page Not Found
            </h2>
            <Card>
              <p className="text-ink-muted font-body text-sm">
                The requested URL path was not recognized. Please use the
                sidebar to navigate.
              </p>
            </Card>
          </div>
        ),
      },
    ],
  },
]);
